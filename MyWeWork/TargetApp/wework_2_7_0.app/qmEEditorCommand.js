/**
 * created by flyhuang 
 * 扩展编辑器支持一些富文本编辑的功能
 */

QMail.Editor.prototype._formatState = null;
QMail.Editor.prototype.INDENT_MARGIN_WIDTH = 40;
QMail.Editor.prototype.INDENT_EDGE_MARGIN_WIDTH = 40;
QMail.Editor.prototype.INDENT_NOT_AT_MARGIN = 0;
QMail.Editor.prototype.INDENT_AT_LEFT_MARGIN = -1;
QMail.Editor.prototype.INDENT_AT_RIGHT_MARGIN = 1;

QMail.Editor.prototype.COMMANDS = {
	"bold": null,
	"italic": null,
	"underline": null,
	"strikeThrough": null,
	"backColor": null,
	"insertOrderedList": null,
	"insertUnorderedList": null,
	"formatBlock": null,
	"createLink": null,
	"unlink": null,
	"insertHTML": null,
	"indent": null,
	"outdent": null,
	"insertParagraph": null,
	"undo": null,
	"redo": null,
	"fontName": null,
	"fontSize": null,
	"foreColor": null,
    "justifycenter": null,
    "justifyleft": null
};

QMail.Editor.prototype.NOARG_COMMANDS = {
	"bold": null,
	"italic": null,
	"underline": null,
	"strikeThrough": null,
	"insertOrderedList": null,
	"insertUnorderedList": null,
	"unlink": null,
	"indent": null,
	"outdent": null,
	"undo": null,
	"redo": null,
    "justifycenter": null,
    "justifyleft": null
};

QMail.Editor.prototype.FONT_COLOR_CHANGING_COMMANDS = {
	"createLink": null,
	"unlink": null,
	"backColor": null
};

QMail.Editor.prototype.FONT_CHANGING_COMMANDS = {
	"formatBlock": null,
	"createLink": null,
	"unlink": null
};

QMail.Editor.prototype.FORMAT_BLOCK_STYLES = {
    "BLOCKQUOTE": "padding: 13px 14px; color: #959595; font-size: 16px; background-color: #F5F7FB; border-radius:4px; line-height: 1.4em; margin: 1em 2px;",
	"P": "margin: 0px; padding: 0px;"
};

QMail.Editor.prototype.FONT_FORMAT_COMMANDS = {
	"fontName": null,
	"fontSize": null,
	"foreColor": null,
	"backColor": null
};

QMail.Editor.prototype.FORMAT_COMMANDS = {
	"bold": null,
	"italic": null,
	"strikeThrough": null,
	"underline": null,
	"backColor": null
};

QMail.Editor.prototype.INDENT_NODE_ATTRS = {
	"BLOCKQUOTE": {
		"class": "webkit-indent-blockquote"
	}
};

QMail.Editor.prototype.INDENT_NODE_STYLES = {
	"BLOCKQUOTE": "margin: 0 0 0 40px; border: none; padding: 0px;"
};

QMail.Editor.prototype.queryCommandValue = function(commandName) {
	var queryFn = "query" + commandName.substring(0, 1).toUpperCase() + commandName.substring(1) + "Value";
	if (typeof this[queryFn] == 'function') {
		return this[queryFn]();
	} else {
		return document.queryCommandValue(commandName);
	}
};

QMail.Editor.prototype.queryCommandEnabled = function(commandName) {
	var queryFn = "query" + commandName.substring(0, 1).toUpperCase() + commandName.substring(1) + "Enabled";
	if (typeof this[queryFn] == 'function') {
		return this[queryFn]();
	} else {
		return document.queryCommandEnabled(commandName);
	}
};

QMail.Editor.prototype.executeCommands = function(commands) {
	void(0);
	if (!commands) {
		return;
	}
	var _commands = (commands instanceof Array) ? commands: [].concat(commands);
	if (_commands.length === 0) {
		void(0);
		return;
	}
	var editingStarted = this._hasEditingStarted;
	this._prepareToExecuteCommands();
	try {
		for (var i = 0; i < _commands.length; i++) {
			var commandObj = _commands[i];
			var command = commandObj.command;
			var value = commandObj.value;
			if (this.COMMANDS[command] === undefined) {
				void(0);
				continue;
			}

			this._executeCommand(command, value);
		}
	}
	catch(e) {
		void(0);
		throw e;
	}
	finally {
		this._finalizeCommandExecution();
	}
	if (!editingStarted) {
		this.stopEdit();
	}
};

QMail.Editor.prototype._prepareToExecuteCommands = function() {
	void(0);
	var editingStarted = this._hasEditingStarted;
	if (!editingStarted) {
		this.startEdit();
	}
};

QMail.Editor.prototype._finalizeCommandExecution = function() {
	void(0);
};

QMail.Editor.prototype.isCommandChangingFont = function(command) {
	if (this.FONT_CHANGING_COMMANDS[command] !== undefined) {
		return true;
	}
	return false;
};

QMail.Editor.prototype.isCommandChangingFontColor = function(command) {
	if (this.FONT_COLOR_CHANGING_COMMANDS[command] !== undefined) {
		return true;
	}
	return false;
};

QMail.Editor.prototype.getFontFormatState = function() {
	var state = {};
	for (var command in this.FONT_FORMAT_COMMANDS) {
		state[command] = this.queryCommandValue(command);
	}
	return state;
};

QMail.Editor.prototype.executeCommand = function(command, value) {
	void(0);
	var editingStarted = this._hasEditingStarted;
	this._prepareToExecuteCommands();
	var ret = false;
	try {
		ret = this._executeCommand(command, value);
	}
	catch(e) {
		void(0);
		throw e;
	}
	finally {
		this._finalizeCommandExecution();
	}
	if (!editingStarted) {
		this.stopEdit();
	}
	return ret;
};

QMail.Editor.prototype._executeCommand = function(command, value) {
	void(0);
	if (this.COMMANDS[command] === undefined) {
		void(0);
		return false;
	}
	var ret = false;
	var hasChanges = false;
	var commandChangesFont = this.isCommandChangingFont(command);
	var commandChangesFontColor = this.isCommandChangingFontColor(command);
	var fontState = null;
	if (!commandChangesFont || !commandChangesFontColor) {
		fontState = this.getFontFormatState();
		if (typeof fontState.fontName == 'string' && fontState.fontName.indexOf("-webkit-pictograph") > -1) {
			fontState.fontName = "";
			fontState.fontSize = "";
		}
	}
	try {
		if (typeof this[command] == 'function') {
			void(0);
			ret = this[command](value);
			hasChanges = true;
		} else {
            var currentValue = null;
            
            if(command =="fontSize"){
                currentValue = this._queryFontAttribute("fontSize");
                
            }else{
               currentValue = document.queryCommandValue(command);
            }
            
            if(command =="fontSize"){
                QMail.Debug.log("current fontSize:" + currentValue + " setValue:" + value);
            }
            
			if ("" + currentValue == "" + value) {
				void(0);
			}
			else {
				if (this.NOARG_COMMANDS[command] !== undefined) {
					void(0);
					ret = document.execCommand(command);
                }
                /*else if (typeof command == 'string' && command == 'fontSize')
                {
                    void(0);
                    execFontSize(parseInt(value) * 10, 'px');
                }*/else {
					void(0);
					ret = document.execCommand(command, false, value);
				}
				var sel = window.getSelection();
				var anchorNode = sel.anchorNode;
				if (anchorNode) {
					if (anchorNode.nodeType != Node.ELEMENT_NODE) {
						anchorNode = anchorNode.parentElement;
					}
					var newFormatBlockValue = ("" + value).toUpperCase();
					if (typeof this.FORMAT_BLOCK_STYLES[newFormatBlockValue] == 'string') {
						this.igoresChange(true);
						try {
//							anchorNode.style.cssText = this.FORMAT_BLOCK_STYLES[newFormatBlockValue];
						}
						finally {
							this.igoresChange(false);
						}
					}
                    
					hasChanges = true;
				}
			}
		}
	} catch(e) {
		void(0);
	} finally {
		if (hasChanges) {
			void(0);
			this._hasChanges = true;
		}
	}
	void(0);

	if (!commandChangesFont || !commandChangesFontColor) {
		var restoreCommands = null;
		if (commandChangesFont) {
			restoreCommands = this.FONT_COLOR_CHANGING_COMMANDS;
		} else if (commandChangesFontColor) {
			restoreCommands = this.FONT_CHANGING_COMMANDS;
		} else if(command == 'fontName' || command == 'fontSize' || command == 'foreColor') {
			restoreCommands = {}
			restoreCommands[command] = undefined;
		}
		this.setFontFormatState(fontState, restoreCommands);
	}
	if (ret && this._formatState && this._formatState[command] !== undefined) {
		void(0);
		this._formatState[command] = "" + value;
	}
};

QMail.Editor.prototype._removeFontIncludedInElement = function(titleTag){
    var focusNode = window.getSelection().focusNode;
    if (focusNode == null)
    	return

    // #1 找到对应的 element
    var hTag = this._getParentElementByTagName(focusNode, titleTag);
    if(hTag) {
        //console.log(hTag.innerHTML);
		this._removeFont(hTag);
        this._removeFontAttribute(hTag);
        //console.log(hTag.innerHTML);
    }

}

QMail.Editor.prototype._removeFontAttribute = function(node) {
    var self = QMail.Viewer.instance.editor;
    var bElements = node.querySelectorAll('b[style]');
    if(bElements.length > 0){
        for(var i = 0; i<bElements.length; i++){
            self.storeCurrentSelection();
            var b = bElements[i];
            b.removeAttribute("style");
            self.restoreSelection();
        }
    }

    var spans = node.querySelectorAll('span[style]');
    if(spans.length > 0){
        for(var i = 0; i<spans.length; i++){
            self.storeCurrentSelection();
            var span = spans[i];
            this.unwrap(span);
            self.restoreSelection();
        }
    }
}

QMail.Editor.prototype._removeFont = function(node) {
    var self = QMail.Viewer.instance.editor;
    var fontElement = node.querySelectorAll('font');
    if(fontElement.length > 0){
        for(var i = 0; i<fontElement.length; i++){
            self.storeCurrentSelection();
            var font = fontElement[i];
            this.unwrap(font);
            self.restoreSelection();
        }
    }
}

QMail.Editor.prototype._getParentElementByTagName = function (node, tagName) {
    /**
     * 寻找node的父元素且该父元素的标签名必须为tagName
	 * @type {element} node - 指定的element
     * @type {String} tagName － 指定的标签名
     */
    if (node == null) return null;

    var targetNodeName = tagName.toLowerCase();
    var targetNode = node.parentElement;
    while (targetNode && targetNode.tagName.toLowerCase() != targetNodeName) {
        targetNode = targetNode.parentElement;
    }
    return targetNode;
}


QMail.Editor.prototype.setFontFormatState = function(state, restrictCommandsObject) {
	if (!state) {
		return;
	}
	for (var command in this.FONT_FORMAT_COMMANDS) {
		if (restrictCommandsObject && restrictCommandsObject[command] === undefined) {
			continue;
		}
		var value = state[command];
		if (value) {
			var currentValue = this.queryCommandValue(command);
			if (value !== currentValue) {
				document.execCommand(command, false, value);
			}
		}
	}
};

QMail.Editor.prototype.insertOrderedList = function(value) {
	void(0);
	return this.insertList("ol", value);
};

QMail.Editor.prototype._getListElementFromNode = function(node) {
	void(0);
	if (node.nodeType != Node.ELEMENT_NODE) {
		node = node.parentElement;
	}
	do {
		if (node == this.rootElement || node.nodeName == "OL" || node.nodeName == "UL") {
			break;
		}
	} while (( node = node . parentElement ));
	if (node && (node.nodeName == "OL" || node.nodeName == "UL")) {
		return node;
	}
	return null;
};

QMail.Editor.prototype.insertUnorderedList = function(value) {
	void(0);
    var formatName = document.queryCommandValue('formatBlock');
    if (this.isHeading(formatName)) {
        this.formatBlock('div', false);
    }
	return this.insertList("ul", value);
};

QMail.Editor.prototype._getSelectedListElement = function() {
	void(0);
	var sel = window.getSelection();
	if (sel.anchorNode) {
		return this._getListElementFromNode(sel.anchorNode);
	}
	return null;
};

QMail.Editor.prototype._isSelectionSpanningEntireList = function() {
	void(0);
	var parentList = this._getSelectedListElement();
	if (!parentList) {
		return false;
	}
	var sel = window.getSelection();
	var baseNode = sel.baseNode;
	var extentNode = sel.extentNode;
	var firstLi = parentList.children[0];
	var lastLi = parentList.children[parentList.childElementCount - 1];
	var firstSelectedLi = this.getParentElement("li", baseNode);
	var lastSelectedLi = this.getParentElement("li", extentNode);
	if (firstSelectedLi == firstLi && lastSelectedLi == lastLi) {
		return true;
	}
	return false;
};

QMail.Editor.prototype.switchListType = function(listElement, tagName) {
	void(0);
	var sel = window.getSelection();
	var selectionCollapsed = sel.isCollapsed;
	var selectedListElement = listElement;
	var newListElement = selectedListElement.cloneNode().rename(tagName);
	newListElement.setAttributes(selectedListElement.attributes);
	var listItems = selectedListElement.querySelectorAll("li");
	var listItem;
	for (var l = 0; l < listItems.length; l++) {
		listItem = listItems[l];
		if (listItem.parentElement == selectedListElement) {
			newListElement.appendChild(listItem.cloneNode(true));
		}
	}
	var newListRange = document.createRange();
	newListRange.selectNodeContents(selectedListElement);
	sel.removeAllRanges();
	sel.addRange(newListRange);
	selectedListElement.insertAdjacentHTML("beforeBegin", "&nbsp;");
	selectedListElement.insertAdjacentHTML("afterEnd", "&nbsp;");
	var a = selectedListElement.previousSibling;
	var b = selectedListElement.nextSibling;
	if (!a || !b) {
		void(0);
	}
	else {
		sel.setBaseAndExtent(a, a.getParentIndex(), b, b.getParentIndex() + 1);
	}
	newListElement = this.insertElement(newListElement);
	if (!newListElement) {
		void(0);
		return false;
	}
	this._finalizeListInsertion(newListElement);
	if (!selectionCollapsed && newListElement) {
		newListRange = document.createRange();
		newListRange.selectNodeContents(newListElement);
		sel.removeAllRanges();
		sel.addRange(newListRange);
	}
	return true;
};

QMail.Editor.prototype.findBoundaryRanges = function(root, boundary, filter, max) {
	var ranges = [];
	var editorRoot = this.rootElement;
	var useFilter = (typeof filter == 'function') ? true: false;
	var i = document.createTreeWalker(root, NodeFilter.SHOW_TEXT + NodeFilter.SHOW_ELEMENT,
	function(node) {
		if (ranges.length > 0 && ranges[ranges.length - 1].intersectsNode(node)) {
			void(0);
			return NodeFilter.FILTER_REJECT;
		}
		if (useFilter) {
			var ret = filter(node);
			if (ret != NodeFilter.FILTER_ACCEPT) {
				return ret;
			}
		}
		if (node.isContentNode()) {
			void(0);
			return NodeFilter.FILTER_ACCEPT;
		}
		else {
			return NodeFilter.FILTER_SKIP;
		}
	},
	false);
	var n = null;
	var sel = window.getSelection();
	var baseNode = sel.baseNode;
	var baseOffset = sel.baseOffset;
	var extentNode = sel.extentNode;
	var extentOffset = sel.extentOffset;
	while ((n = i.nextNode())) {
		var r = document.createRange();
		if (n.nodeType == Node.TEXT_NODE) {
			r.selectNode(n);
		} else {
			r.setStart(n, 0);
			r.setEnd(n, n.childNodes.length);
		}
		sel.removeAllRanges();
		sel.addRange(r);
		if (boundary == "paragraphboundary") {
			sel.modify("extend", "backward", "lineboundary");
			sel.modify("extend", "forward", "lineboundary");
		}
		sel.modify("extend", "backward", boundary);
		sel.modify("extend", "forward", boundary);
		if (!sel.isCollapsed) {
			r = sel.getRangeAt(0);
			var startNode = (r.startContainer.nodeType == Node.ELEMENT_NODE) ? r.startContainer.childNodes[r.startOffset] : r.startContainer;
			if (ranges.length === 0 || startNode == editorRoot || !ranges[ranges.length - 1].intersectsNode(startNode)) {
				ranges.push(r);
			} else {
				void(0);
			}
		} else {
			ranges.push(r);
		}
		if (typeof max == 'number' && ranges.length >= max) {
			break;
		}
	}
	sel.setBaseAndExtent(baseNode, baseOffset, extentNode, extentOffset);
	return ranges;
};

QMail.Editor.prototype.insertList = function(tagName, value) {
	void(0);
	tagName = tagName.toUpperCase();
	var command = (tagName == "OL") ? "insertOrderedList": "insertUnorderedList";
	void(0);
	var currentValue = this.queryCommandValue(command);
	var listElement, listItems, ret, newListRange;
	void(0);
	void(0);
	var sel = window.getSelection();
	var self = this;
	var selectedListElement = null;
	if ("" + value == "false" && this._isSelectionSpanningEntireList() && (selectedListElement = this._getSelectedListElement()) && selectedListElement.tagName == tagName) {
		void(0);
		return this.outdent();
	}
	if ("" + value == "true" && this._isSelectionSpanningEntireList() && (selectedListElement = this._getSelectedListElement()) && selectedListElement.tagName != tagName) {
		void(0);
		return this.switchListType(selectedListElement, tagName);
	}
	var indentEnabled = this.queryIndentEnabled();

	function doViaExecCommand(_command) {
		void(0);
        var beforeSel = window.getSelection();
        var beforeParentType = null;
        var beforeBlockquoteNode = self.getParentElement("BLOCKQUOTE");
        var isExistBlockquote = false;
        if (beforeBlockquoteNode) isExistBlockquote = true;
        if (beforeSel) {
            var beforeNode = beforeSel.baseNode;
            if (beforeNode) {
                var beforeParent = beforeNode.parentElement;
                if (beforeParent) {
                    beforeParentType = beforeParent.nodeName;
                }
            }
        }

		var ret = document.execCommand(_command);

        var sel = window.getSelection();
        var n = sel.baseNode;
        var parentNode = n.parentElement;
        
        if (parentNode && parentNode.nodeName != beforeParentType && parentNode.nodeName == "SPAN") {
            parentNode.removeAttribute("style");
            var liElement = self.getParentElement("LI");
            if (liElement) {
                liElement.removeAttribute("style");
            }
        }
        
        var blockquoteNode = self.getParentElement("BLOCKQUOTE");
        if (blockquoteNode) {
            var color = parentNode.style.color;
            var background = parentNode.style.backgroundColor;
            if ((color != "" && color != "rgb(149, 149, 149)") || (background != "" && background != "rgb(245, 247, 251)")) {
                parentNode.removeAttribute("style");
            }
        } else {
            if (isExistBlockquote) {
                var color = parentNode.style.color;
                var background = parentNode.style.backgroundColor;
                if ((color && color == "rgb(149, 149, 149)") && (background  && background == "rgb(245, 247, 251)")) {
                    parentNode.removeAttribute("style");
                }
            }
        }
    
		return ret;
	}
    return doViaExecCommand(command);
};

QMail.Editor.prototype.indent = function() {
	void(0);
	var ret = false;
	this.igoresChange(true);
	try {
		var listElement = this._getSelectedListElement();
		var bq = null;
		if (!listElement) {
			bq = this.getParentElement("blockquote");
			if (bq && bq.className == "webkit-indent-blockquote") {
				void(0);
				var currentLeftMargin = parseInt(bq.style.marginLeft, 10);
				document.execCommand("indent");
				ret = document.execCommand("outdent");
				var bq2 = this.getParentElement("blockquote");
				if (bq2 != bq && bq2.parentElement == bq) {
					ret = document.execCommand("outdent");
					bq = this.getParentElement("blockquote");
				}
				else {
					bq = bq2;
				}
				if (bq) {
					if (isNaN(currentLeftMargin)) {
						currentLeftMargin = 0;
					}
					var newLeftMargin = currentLeftMargin + this.INDENT_MARGIN_WIDTH;
					bq.style.marginLeft = newLeftMargin + "px";
					return true;
				} else {
					return ret;
				}
			}
		}
		var sel = window.getSelection();
		var insertedElement = null;
		void(0);
		ret = document.execCommand("indent");
		if (!listElement) {
			void(0);
			if (!bq) {
				bq = this.getParentElement("blockquote");
			}
			if (!bq) {
				void(0);
				return ret;
			}
			if (this.INDENT_NODE_ATTRS["BLOCKQUOTE"] !== undefined) {
				for (var attrName in this.INDENT_NODE_ATTRS["BLOCKQUOTE"]) {
					bq.setAttribute(attrName, this.INDENT_NODE_ATTRS["BLOCKQUOTE"][attrName]);
				}
			}
			if (typeof this.INDENT_NODE_STYLES["BLOCKQUOTE"] == 'string') {
				bq.style.cssText = this.INDENT_NODE_STYLES["BLOCKQUOTE"];
			}
			insertedElement = bq;
		}
		else {
			void(0);
			var li;
			void(0);
			listElement = this._getSelectedListElement();
			insertedElement = listElement;
			var previousSibling = listElement.previousElementSibling;
			var nextSibling = listElement.nextElementSibling;
			this.storeCurrentSelection();
			if (nextSibling && nextSibling.nodeName == "LI" && nextSibling.style.listStyleType == "none" && nextSibling.childElementCount == 1 && nextSibling.children[0] && nextSibling.children[0].nodeName == listElement.nodeName) {
				var nextSiblingList = nextSibling.children[0];
				void(0);
				void(0);
				var nextSiblingChildren = nextSiblingList.children;
				while (nextSiblingChildren.length > 0) {
					var nxChild = nextSiblingChildren[0];
					nextSiblingList.removeChild(nxChild);
					listElement.appendChild(nxChild);
				}
				nextSibling.parentElement.removeChild(nextSibling);
			}
			else if (previousSibling && previousSibling.nodeName == "LI" && previousSibling.childElementCount > 0 && previousSibling.children[previousSibling.childElementCount - 1] && previousSibling.children[previousSibling.childElementCount - 1].nodeName == listElement.nodeName) {
				var previousSiblingList = previousSibling.children[previousSibling.childElementCount - 1];
				void(0);
				var listElementChildren = listElement.children;
				while (listElementChildren.length > 0) {
					var listElementChild = listElementChildren[0];
					previousSiblingList.appendChild(listElementChild);
				}
				listElement.parentElement.removeChild(listElement);
			}
			else if (previousSibling && previousSibling.nodeName == "LI") {
				void(0);
				listElement.parentElement.removeChild(listElement);
				previousSibling.appendChild(listElement);
			}
			else {
				void(0);
				li = document.createElement("li");
				li.style.listStyleType = "none";
				sel.collapseToStart();
				li = this.insertElement(li);
				li.parentElement.removeChild(li);
				listElement.insertAdjacentElement("beforeBegin", li);
				listElement.parentElement.removeChild(listElement);
				li.appendChild(listElement);
			}
			this.restoreSelection();
		}
		if (insertedElement) {
			this._onIndentationChange(insertedElement);
		}
		this.storeCurrentSelection();
	}
	finally {
		this.igoresChange(false);
	}
	return ret;
};

QMail.Editor.prototype.isSelectionInsideNestedList = function() {
	var sel = window.getSelection();
	var node = sel.baseNode;
	if (!node) {
		return false;
	}
	if (node.nodeType != Node.ELEMENT_NODE) {
		node = node.parentElement;
	}
	var found = [];
	do {
		if (node.nodeName == "UL" || node.nodeName == "OL") {
			found.push(node);
		}
		if (found.length == 2) {
			break;
		}
	} while (( node = node . parentElement ) != null);
	return found.length == 2;
};

/*
 * this return may be wrong , if you must use it , please checkout all scenes.
 */
QMail.Editor.prototype.outdent = function() {
	void(0);
	this.igoresChange(true);
	var ret = false;
	try {
		var isInsideNestedList = this.isSelectionInsideNestedList();
		var sel = window.getSelection();
		var baseNode = sel.baseNode;
		var bq, parentListItem;
		if (!isInsideNestedList) {
			bq = this.getParentElement("blockquote", baseNode);
			var currentLeftMargin = 0;
			if (bq && (currentLeftMargin = parseInt(bq.style.marginLeft, 10))) {
				if (currentLeftMargin == this.INDENT_MARGIN_WIDTH) {
					void(0);
					ret = document.execCommand("outdent");
					return ret;
				}
				void(0);
                // there is a problem in this method 'indent' is not opposite 'outdent'.But how can we get exec('outdent') ?
                // if outdent after indent somtetimes may be change another line.  -nick
                // document.execCommand("indent");
				// ret = document.execCommand("outdent");
                ret = this.queryOutdentEnabled();

                var bq2 = this.getParentElement("blockquote");
				if (bq2 != bq && bq2.parentElement == bq) {
					ret = document.execCommand("outdent");
					bq = this.getParentElement("blockquote");
				}
				else {
					bq = bq2;
				}
				if (bq) {
					if (isNaN(currentLeftMargin)) {
						currentLeftMargin = 0;
					}
					if (currentLeftMargin > this.INDENT_MARGIN_WIDTH) {
						void(0);
						var newLeftMargin = currentLeftMargin - this.INDENT_MARGIN_WIDTH;
						bq.style.marginLeft = newLeftMargin + "px";
						return true;
					}
				} else {
					return ret;
				}
			}
			if (!sel.isCollapsed) {
				var selectedRange = sel.getRangeAt(0);
				var commonAncestorElement = selectedRange.getCommonAncestorElement();
				if (commonAncestorElement) {
					var listElements = commonAncestorElement.querySelectorAll("ul, ol");
					if (listElements && listElements.length > 0) {
						for (var lx = 0; lx < listElements.length; lx++) {
							var listElement = listElements[lx];
							if (selectedRange.intersectsNode(listElement)) {
								parentListItem = this.getParentElement("li", listElement);
								if (parentListItem && selectedRange.intersectsNode(parentListItem)) {
									continue;
								}
								if (!this.outdentList(listElement)) {
									return false;
								}
							}
						}
						return true;
					}
				}
			}
		}
		var backgroundColor = null;
		if (baseNode && baseNode.nodeType != Node.ELEMENT_NODE && baseNode.parentElement) {
			baseNode = baseNode.parentElement;
		}
		if (baseNode && baseNode.nodeType == Node.ELEMENT_NODE) {
			backgroundColor = baseNode.style["backgroundColor"];
		}
		ret = document.execCommand("outdent");
		var changeContainer = sel.baseNode;
		if (changeContainer != Node.ELEMENT_NODE) {
			changeContainer = changeContainer.parentElement;
		}
		if (isInsideNestedList && ret) {
			void(0);
			parentListItem = sel.baseNode;
			var listItemCount = 0;
			do {
				if (parentListItem.nodeName == "LI") {
					if (listItemCount > 0) {
						break;
					} else {
						listItemCount++;
					}
				}
				parentListItem = parentListItem.parentElement;
			} while ( parentListItem && parentListItem != this . rootElement );
			if (parentListItem && parentListItem.nodeName == "LI") {
				var listRange = null;
				if (sel.rangeCount === 0) {
					listRange = document.createRange();
					listRange.selectNode(sel.baseNode);
				} else {
					listRange = sel.getRangeAt(0);
				}
				this.storeCurrentSelection();
				this.ignoreDOMSubtreeChanges(true);
				try {
					var listChildren = parentListItem.children,
					postListItemContainer, l, liChild, inRange = false;
					for (l = listChildren.length - 1; l >= 0; l--) {
						liChild = listChildren[l];
						void(0);
						if (liChild.nodeName == "LI" || liChild.nodeName == "OL" || liChild.nodeName == "UL") {
							if (liChild.nodeName == "LI" && listRange.intersectsNode(liChild)) {
								void(0);
								inRange = true;
								parentListItem.removeChild(liChild);
								parentListItem.insertAdjacentElement("afterEnd", liChild);
							} else if (!inRange) {
								if (!postListItemContainer) {
									void(0);
									postListItemContainer = parentListItem.cloneNode();
									parentListItem.insertAdjacentElement("afterEnd", postListItemContainer);
									postListItemContainer.appendChild(liChild);
								} else {
									void(0);
									postListItemContainer.insertBefore(liChild, postListItemContainer.children[0]);
								}
							} else {
								void(0);
								break;
							}
						}
					}
					if (parentListItem.childNodes.length === 0) {
						void(0);
						parentListItem.parentElement.removeChild(parentListItem);
					}
					this.restoreSelection();
					changeContainer = this._getSelectedListElement();
				}
				catch(e) {
					void(0);
				}
				finally {
					this.ignoreDOMSubtreeChanges(false);
				}
			}
		}
		if (backgroundColor) {
			document.execCommand("backColor", false, backgroundColor);
		}
		this.storeCurrentSelection();
		this._onIndentationChange(changeContainer);
	}
	finally {
		this.igoresChange(false);
	}
	return ret;
};

QMail.Editor.prototype._onIndentationChange = function(root) {
	void(0);
	var isItalic = document.queryCommandValue("italic");
	var backColor = document.queryCommandValue("backColor");
	var _formatState = this.getFormatState(true);
	_formatState["italic"] = isItalic;
	_formatState["backColor"] = backColor;
	this._setFormatState(_formatState);
};

QMail.Editor.prototype.getFormatState = function(force) {
	void(0);
	if (!this._formatState || force) {
		var formatCommand = null;
		var state = {};
		for (formatCommand in this.FORMAT_COMMANDS) {
			var formatValue = false;
			if (formatCommand == "backColor") {
				formatValue = this.queryBackColorValue();
			} else {
				formatValue = document.queryCommandValue(formatCommand);
			}
			state[formatCommand] = "" + formatValue;
		}
		this._formatState = state;
	}
	return this._formatState;
};

QMail.Editor.prototype._setFormatState = function(state) {
	void(0);
	var formatState = state;
	if (!formatState) {
		void(0);
		this._formatState = null;
		return;
	}
	for (var commandName in formatState) {
		var commandValue = formatState[commandName];
		var currentValue = document.queryCommandValue(commandName);
		if (commandValue == currentValue) {
			continue;
		}
		if (commandName == "backColor") {
			document.execCommand(commandName, false, commandValue);
		}
		else {
			document.execCommand(commandName);
		}
	}
	this._formatState = formatState;
};

QMail.Editor.prototype._resetFormatState = function _resetFormatState() {
	void(0);
	var formatState = this.getFormatState(true);
	for (var commandName in formatState) {
		if (commandName == "backColor") {
			if (document.execCommand(commandName, false, this.NO_BACK_COLOR)) {
				formatState[commandName] = this.NO_BACK_COLOR;
			}
		} else {
			var commandValue = formatState[commandName];
			if (commandValue == "true") {
				if (document.execCommand(commandName)) {
					formatState[commandName] = "false";
				}
			}
		}
	}
	this._formatState = formatState;
};

QMail.Editor.prototype.isHeading = function(formatName) {
    return ['h1','h2','h3','h4','h5','h6','H1','H2','H3','H4','H5','H6'].indexOf(formatName) >= 0;
}

QMail.Editor.prototype.formatBlock = function(value, preserveStyles) {
	void(0);
	value = ("" + value).toUpperCase();
    
    var self = this;
    
    function removeBlockQuote() {
        void(0);
        var ret = false;
        var blockquoteNode = self.getParentElement("BLOCKQUOTE");
        if (blockquoteNode) {
            var len = blockquoteNode.childNodes.length;
            var parentNode = blockquoteNode.parentElement;
            self.storeCurrentSelection();
            var newNode = document.createElement('div');
//            生成一个新的不带blcokquote标签的node
//            append会将原node的parenet remove该子节点，然后再append，所以这里要用while
            while (len > 0) {
                var childNode = blockquoteNode.childNodes[0];
                newNode.appendChild(childNode);
                len = blockquoteNode.childNodes.length;
            }
            blockquoteNode.replace(newNode);
            self.restoreSelection();
            ret = (self.getParentElement("BLOCKQUOTE") == null);
        }
        self.storeCurrentSelection();
        return ret;
    }
    
    var isUnOrderList = document.queryCommandState('insertUnorderedList');
    
    if (this.isHeading(value) && isUnOrderList) {
        document.execCommand("insertUnorderedList");
    }
    
	var currentValue = ("" + this.queryCommandValue("formatBlock")).toUpperCase();
    var parBlockQuote = this.getParentElement("BLOCKQUOTE");

    var sel = window.getSelection();
    var ret = false;
    
    if (parBlockQuote && (value =="BLOCKQUOTE")) {
        void(0);
        ret = removeBlockQuote();
        return ret;
    }
    
	if (value == currentValue) {
		void(0);
        return true;
	}
	if (sel.isCollapsed) {
		void(0);
		this._resetFormatState();
	}
    
	function execFormatBlock() {
		void(0);
		var _value = value.toUpperCase();
		var sel = window.getSelection();
		if (!sel.isCollapsed) {
			var r = sel.getRangeAt(0);
			var commonAncestorElement = null;
			if (r) {
				commonAncestorElement = r.getCommonAncestorElement();
			}
			if (commonAncestorElement) {
				commonAncestorElement.collapseNestedFormatNodes();
			}
			if (r) {
				sel.removeAllRanges();
				sel.addRange(r);
			}
		}
		if (!preserveStyles) {
			document.execCommand("removeFormat");
		}
		var ret = document.execCommand("formatBlock", false, value);
		if (ret) {
			var baseNode = self.getParentElement(value);
			void(0);
			if (baseNode) {
				if (self.FORMAT_BLOCK_STYLES[value]) {
					void(0);
//					baseNode.style.cssText = baseNode.style.cssText + self.FORMAT_BLOCK_STYLES[value];
				}
				var baseNodeParent = baseNode.parentElement;
				if (baseNodeParent.isBlockFormatNode() && baseNodeParent.childNodes.length == 1) {
					self.storeCurrentSelection();
					baseNodeParent.replace(baseNode);
					self.restoreSelection();
				}
			}
		}
		self.storeCurrentSelection();
		return ret;
	}
	function doFormatBlock() {
		void(0);
		if (sel.isCollapsed) {
			void(0);
			return execFormatBlock();
		}
		var r = sel.getRangeAt(0);
		var commonAncestorContainer = r.getCommonAncestorElement();
		if (!commonAncestorContainer) {
			void(0);
			return false;
		}
//		function selectionHasListItems() {
//			var listItems = commonAncestorContainer.querySelectorAll("li");
//			for (var i = 0; i < listItems.length; i++) {
//				if (r.intersectsNode(listItems[i])) {
//					return listItems.length;
//				}
//			}
//			return 0;
//		}
//		var liCount;
//		var lastLiCount;
//		while ((liCount = selectionHasListItems())) {
//			document.execCommand("outdent");
//			if (liCount === lastLiCount) {
//				break;
//			}
//			lastLiCount = liCount;
//		}
		sel.modify("extend", "forward", "paragraphboundary");
		sel.modify("extend", "backward", "paragraphboundary");
		ret = execFormatBlock();
	}
	void(0);
	var topFormattingElement = (currentValue) ? this.getParentElement(currentValue) : null;
	if (value.toUpperCase() == "BLOCKQUOTE") {
		void(0);
		self.formatBlock(this.NEW_LINE_NODE_NAME, preserveStyles);
		return execFormatBlock();
	}
//	while (document.queryCommandValue("insertUnorderedList") + "" == "true") {
//		void(0);
//		this.outdent();
//	}
//	while (document.queryCommandValue("insertOrderedList") + "" == "true") {
//		void(0);
//		this.outdent();
//	}
	ret = doFormatBlock();
    // h 要达到整行的效果，把里面的font， span的标签去掉
    if (value =="H2" || value =="H3" || value =="H1"){
        this._removeFontIncludedInElement(value);
    }
	this._setFormatState(true);
	return ret;
};

QMail.Editor.prototype._saveFormatState = function(force) {
	void(0);
	this._savedFormatState = this.getFormatState(force);
};

QMail.Editor.prototype._restoreSavedFormatState = function() {
	void(0);
	this._setFormatState(this._savedFormatState);
	this._savedFormatState = null;
};

QMail.Editor.prototype.insertCheckbox = function insertCheckbox(on) {
	void(0);
	var started = this._hasEditingStarted;
	if (!started) {
		this.startEdit();
	}
	this._saveFormatState();
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	if (on) {
		checkbox.setAttribute("checked", "checked");
	} else if (on === false) {
		checkbox.removeAttribute("checked");
	}
	var sel = window.getSelection();
	if (!sel.hasValidSelection()) {
		this.restoreSelectionIgnoringDOMChanges();
	}
	var parentElement = null;
	if (sel.isCollapsed && sel.baseNode.nodeName == "DIV" && sel.baseNode.textContent === "") {
		parentElement = sel.baseNode;
	}
	checkbox = this.insertElement(checkbox);
	if (!checkbox) {
		void(0);
		return;
	}
	if (parentElement && !parentElement.parentElement) {
		void(0);
		parentElement.innerHTML = "";
		checkbox.parentElement.replaceChild(parentElement, checkbox);
		parentElement.appendChild(checkbox);
	}

	this.setCaretAfterElement(checkbox);
    //保存当前光标用于下次插入
    this.storeCurrentSelection();
    this._restoreSavedFormatState();
    //添加完后调整滚动区域
    this.scrollToCaret(0);

	if (!started) {
		this.stopEdit();
	}
};

QMail.Editor.prototype.hasTextSelection = function() {
	void(0);
	var sel = window.getSelection();
	return (sel && !sel.isCollapsed);
};

QMail.Editor.prototype.restoreSelectionIgnoringDOMChanges = function() {
	void(0);
	this.igoresChange(true);
	try {
		this.restoreSelection();
	}
	finally {
		this.igoresChange(false);
	}
};

QMail.Editor.prototype.escapeHTML = function(str) {
	void(0);
	return str.replace(/</, "&lt;").replace(/>/, "&gt;");
};

QMail.Editor.prototype.applyHyperlink = function(href, title) {
	void(0);
	var editingStarted = this._hasEditingStarted;
	if (!editingStarted) {
		this.startEdit();
	}
	var hasTextSelection = this.hasTextSelection();

	if (!this.hasTextSelection() && this._currentSelection) {
		void(0);
		this.restoreSelectionIgnoringDOMChanges();
		hasTextSelection = !this._currentSelection.isCollapsed;
	}

	var anchor = this.getCurrentSelectionParentElementByTagName("a");
	//当光标在已经存在的链接里面或者选择了文字，如果用户填写了信息则修改链接地址
	//除了上面那种情况如果用户没有选中文字则创建链接，否则unlink
	if (href && title && (hasTextSelection || anchor)) {

		if(anchor && !hasTextSelection) {
			//@todo:光标选中当前链接
			var sel = window.getSelection();
			var r = document.createRange();
			r.selectNode(anchor);
			sel.removeAllRanges();
			sel.addRange(r);
			anchor.setAttribute('href',href);
		}

		this.executeCommands([{
			"command": "createLink",
			"value": href
		}]);
	} else if (href && title) {
		this.executeCommands([{
			"command": "insertHTML",
			"value": "<a href=\"" + href + "\">" + this.escapeHTML(title) + "</a>"
		}]);
	} else {
		var unlinked = false;
		if (hasTextSelection) {
			void(0);
			unlinked = this.executeCommands([{
				"command": "unlink",
				"value": null
			}]);
		} else {
			if (anchor) {
				void(0);
				var r = document.createRange();
				r.selectNode(anchor);
				var sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(r);
				unlinked = this.executeCommands([{
					"command": "unlink",
					"value": null
				}]);
			} else {
				unlinked = this.executeCommands([{
					"command": "unlink",
					"value": null
				}]);
			}
		}
	}
	this.storeCurrentSelection();
	if (!editingStarted) {
		this.stopEdit();
	}
};

QMail.Editor.prototype.resetHtmlToText = function() {
	this.igoresChange(true);
	this.rootElement.innerHTML = this.rootElement.textContent;
	this.setSelectionAtEnd();
	this.scrollToCaret(0 , QMail.Editor.scrollSourceEnum.resetHtml);
	this.igoresChange(false);
}

QMail.Editor.prototype.normalizeAdjacentTextNodes = function(textNode) {
	void(0);
	var sel = window.getSelection();
	var baseNode = (textNode) ? textNode: sel.baseNode;
	if (!baseNode || baseNode.nodeType != Node.TEXT_NODE) {
		void(0);
		return;
	}
	var prop = "previousSibling";
	var sib = baseNode;
	var strings = {
		"previousSibling": [],
		"nextSibling": []
	};
	this.igoresChange(true);
	try {

		while (sib) {
			sib = baseNode[prop];
			void(0);
			if (!sib || sib.nodeType != Node.TEXT_NODE) {
				if (prop == "previousSibling") {
					void(0);
					prop = "nextSibling";
					sib = baseNode;
					continue;
				}
				void(0);
				break;
			}
			strings[prop].push(sib.textContent);
			void(0);
			sib.parentElement.removeChild(sib);
		}
		strings["previousSibling"].reverse();
		var pfx = strings["previousSibling"].join("");
		var sfx = strings["nextSibling"].join("");
		void(0);
		var offset = sel.baseOffset;
		baseNode.textContent = pfx + baseNode.textContent + sfx;
		sel.setBaseAndExtent(baseNode, offset + pfx.length, baseNode, offset + pfx.length);
	}
	catch(e) {
		void(0);
		throw e;
	}
	finally {
		this.igoresChange(false);
	}
};

QMail.Editor.prototype.normalizeTextForElement = function(element, extraStyleAttrs) {
	void(0);
	if (element) {
		var styleAttr = null;
		if (extraStyleAttrs) {
			for (styleAttr in extraStyleAttrs) {
				element.style[styleAttr] = extraStyleAttrs[styleAttr];
			}
		}
		var children = element.getElementsByTagName("*");
		if (children && children.length > 0) {
			for (var c = 0; c < children.length; c++) {
				var child = children[c];
				if (child.style.fontSize) {
					child.style.fontSize = "";
				}
				if (child.style.lineHeight) {
					child.style.lineHeight = "";
				}
				if (extraStyleAttrs) {
					for (styleAttr in extraStyleAttrs) {
						child.style[styleAttr] = extraStyleAttrs[styleAttr];
					}
				}
			}
		}
	}
};

var execFontSize = function (size, unit) {
    var spanString = $('<span/>', {
                       'text': document.getSelection()
                       }).css('font-size', size + unit).prop('outerHTML');
    
    document.execCommand('insertHTML', false, spanString);
};

////////////////////begin qureyCommand ////////////////////////////////////////
QMail.Editor.prototype.getCurrentSelectionContainer = function() {
	void(0);
	var sel = window.getSelection();
	if (sel.rangeCount > 0) {
		var range = sel.getRangeAt(0);
		var container = range.commonAncestorContainer;
		if (container.nodeType != Node.ELEMENT_NODE) {
			container = container.parentElement;
		}
		return container;
	}
	return null;
};

QMail.Editor.prototype.queryFormatBlockEnabled = function() {
	var container = this.getCurrentSelectionContainer();
	return (container) ? true: false;
};

QMail.Editor.prototype.queryFontNameValue = function() {
	return this._queryFontAttribute("fontName");
};

QMail.Editor.prototype.queryFontSizeValue = function() {
	return this._queryFontAttribute("fontSize");
};

QMail.Editor.prototype.queryForeColorValue = function() {
	return this._queryFontAttribute("foreColor");
};

QMail.Editor.prototype.queryBackColorValue = function() {
	return this._queryFontAttribute("backColor");
};

//需要和qmEEditorJounal.css中保持一致
QMail.Editor.prototype.normalizePixToSize = function(pixValue){
    
    var sizeLevel = ["11px", "13px", "15px", "17px", "20px", "23px", "28px"];
    
    for(var i = 0; i < sizeLevel.length; i++){
        
        if(pixValue == sizeLevel[i]){
            
            return i+1;
        }
    }
    
    return "4";
};

QMail.Editor.prototype._queryFontAttribute = function(attribute) {
	var sel = window.getSelection();
	var firstNode, previousSibling;
	var baseNode = sel.baseNode;
	var baseOffset = sel.baseOffset;
	var extentNode = sel.extentNode;
	var extentOffset = sel.extentOffset;
	var isCollapsed = sel.isCollapsed;
	if (!baseNode || !extentNode) {
		return document.queryCommandValue(attribute);
	}
	firstNode = sel.getFirstNode();
	previousSibling = (firstNode) ? firstNode.previousSibling: null;
	var parentElement, computedStyle;
	var attributeValue = null;
	if (firstNode && firstNode.nodeType == Node.ELEMENT_NODE && firstNode.isCheckboxElement()) {
		parentElement = firstNode.parentElement;
	}
	else if (previousSibling && previousSibling.nodeType == Node.ELEMENT_NODE && previousSibling.isCheckboxElement()) {
		parentElement = previousSibling.parentElement;
	}
	if (parentElement != null) {
		if (attribute == "fontName") {
			computedStyle = window.getComputedStyle(parentElement);
			if (computedStyle) {
				attributeValue = computedStyle.getPropertyValue("font-family");
			}
		}
		else if (attribute == "fontSize") {
			attributeValue = parentElement.getFontSize();
		}
		else if (attribute == "foreColor") {
			computedStyle = window.getComputedStyle(parentElement);
			if (computedStyle) {
				attributeValue = computedStyle.getPropertyValue("color");
			}
		}
	}
    //firstNode.attribute.getFontSize();
    
    if(attributeValue == null && attribute == "fontSize" && firstNode){
        
        if(firstNode.nodeType == Node.TEXT_NODE){
            
            if(firstNode.nodeName.toLowerCase() == "font"){
                var size = firstNode.attributes['size'];
                attributeValue = size.value;
                
            }else if(firstNode.parentNode.nodeName.toLowerCase() == "font"){
                
                var size = firstNode.parentNode.attributes['size'];
                attributeValue = size.value;
            }else{
                var style = window.getComputedStyle(firstNode.parentNode, null).getPropertyValue('font-size');
                if(style){
                    attributeValue = this.normalizePixToSize(style);
                }
            }
        }else if(firstNode.nodeType == Node.ELEMENT_NODE){
            
            var style = window.getComputedStyle(firstNode.parentNode, null).getPropertyValue('font-size');
            if(style){
                attributeValue = this.normalizePixToSize(style);
            }
        }
    }
    
	if (attributeValue == null) {
		attributeValue = document.queryCommandValue(attribute);
	}
	return attributeValue;
};

QMail.Editor.prototype.getCurrentSelectionParentElementByTagName = function(tagName) {
	void(0);
	var sel = window.getSelection();
	if (!sel || !sel.anchorNode) {
		return null;
	}
	var p = sel.anchorNode;
	var _tagName = tagName.toUpperCase();
	while (p && (p.nodeType != Node.ELEMENT_NODE || p.nodeName != _tagName)) {
		p = p.parentElement;
	}
	return p;
};

QMail.Editor.prototype.queryUnlinkValue = function() {
	var value = null;
	var anchorNode = this.getCurrentSelectionParentElementByTagName("a");
	if (anchorNode) {
		value = anchorNode.href;
	}
	return value;
};

QMail.Editor.prototype._hasSelectionWithLists = function(tagName) {
	void(0);
	var sel = window.getSelection();
	if (sel.isCollapsed) {
		return false;
	}
	var r = sel.getRangeAt(0);
	if (!r) {
		return false;
	}
	var rangeAncestor = r.commonAncestorContainer;
	if (rangeAncestor.nodeType != Node.ELEMENT_NODE) {
		rangeAncestor = rangeAncestor.parentElement;
	}
	var selector = (tagName) ? tagName: "ul,ol";
	var lists = rangeAncestor.querySelectorAll(selector);
	if (lists && lists.length > 0) {
		for (var i = 0; i < lists.length; i++) {
			var list = lists[i];
			if (r.intersectsNode(list)) {
				return true;
			}
		}
	}
	return false;
};

QMail.Editor.prototype.queryInsertListEnabled = function(commandName) {
	var tagName;
	if (commandName == "insertUnorderedList") {
		tagName = "ul";
	}
	else if (commandName == "insertOrderedList") {
		tagName = "ol";
	}
	if (this._hasSelectionWithLists(tagName)) {
		return false;
	}
	return document.queryCommandEnabled(commandName);
};

QMail.Editor.prototype.queryInsertListValue = function(commandName) {
	var tagName;
	if (commandName == "insertUnorderedList") {
		tagName = "ul";
	}
	else if (commandName == "insertOrderedList") {
		tagName = "ol";
	}
	if (this._hasSelectionWithLists(tagName)) {
		return true;
	}
	var value = document.queryCommandValue(commandName);
	if ("" + value == "" + true) {
		var listNodeName = (commandName == "insertOrderedList") ? "OL": "UL";
		var listElement = this._getSelectedListElement();
		if (!listElement || listElement.nodeName != listNodeName) {
			value = "false";
		}
	}
	return value;
};

QMail.Editor.prototype.queryInsertOrderedListEnabled = function() {
	return this.queryInsertListEnabled("insertOrderedList");
};

QMail.Editor.prototype.queryInsertOrderedListValue = function() {
	return this.queryInsertListValue("insertOrderedList");
};

QMail.Editor.prototype.queryInsertUnorderedListEnabled = function() {
	return this.queryInsertListEnabled("insertUnorderedList");
};

QMail.Editor.prototype.queryInsertUnorderedListValue = function() {
	return this.queryInsertListValue("insertUnorderedList");
};

QMail.Editor.prototype.getParentElement = function(nodeName, startNode) {
	void(0);
	var baseNode = startNode;
	var targetNodeName = nodeName.toUpperCase();
	var sel = null;
	if (!baseNode) {
		sel = window.getSelection();
		if (sel && !sel.isCollapsed && sel.rangeCount > 0) {
			var r = sel.getRangeAt(0);
			baseNode = r.commonAncestorContainer;
		} else {
			baseNode = sel.baseNode;
		}
	}
	if (!baseNode) {
		return baseNode;
	}
	var targetNode = (baseNode.nodeType != Node.ELEMENT_NODE) ? baseNode.parentElement: baseNode;
	while (targetNode && targetNode.nodeName != targetNodeName && targetNode != this.rootElement) {
		targetNode = targetNode.parentElement;
	}
	if (targetNode && targetNode.nodeName == targetNodeName) {
		return targetNode;
	}
	return null;
};

QMail.Editor.prototype.queryIndentationEnabled = function(commandName) {
	var sel = window.getSelection();
	var baseNode = sel.baseNode;
	var commandEnabled = false;
	var baseNodeParent = null;
	var indentMargin = 0;
	if (!baseNode || baseNode == this.rootElement || (baseNode.nodeType == Node.TEXT_NODE && baseNode.parentElement == this.rootElement)) {
		commandEnabled = (commandName == "outdent") ? false: true;
	}
	else if ((baseNodeParent = this.getParentElement("li", baseNode)) || (baseNodeParent = this.getParentElement("blockquote", baseNode))) {
		indentMargin = this._isIndentedNodeAtMargin(baseNodeParent);
		if (commandName == "indent" && indentMargin == this.INDENT_AT_RIGHT_MARGIN) {
			commandEnabled = false;
		} else if (commandName == "outdent" && indentMargin == this.INDENT_AT_LEFT_MARGIN) {
			commandEnabled = false;
		} else {
			void(0);
			commandEnabled = true;
		}
	}
	else if (!sel.isCollapsed && this._isSelectionSpanningEntireList() && commandName == "outdent") {
		commandEnabled = true;
	}
	else {
		commandEnabled = (commandName == "outdent") ? false: true;
	}
	return commandEnabled;
};

QMail.Editor.prototype._isIndentedNodeAtMargin = function(node) {
	void(0);
	if (node.nodeType != Node.ELEMENT_NODE) {
		node = node.parentElement;
	}
	if (!node) {
		return false;
	}
	var nodeRect = node.getBoundingClientRect();
	var nodeRectLeft = 0;
	if (nodeRect) {
		nodeRectLeft = nodeRect.left;
	}
	var leftMargin = 0;
	var leftPadding = 0;
	var nodeStyle = window.getComputedStyle(node);
	if (nodeStyle) {
		leftPadding = parseInt(nodeStyle.getPropertyValue("padding-left"), 10);
		if (!leftPadding) {
			leftPadding = 0;
		}
	}
	var rootWidth = 0;
	var rootStyle = window.getComputedStyle(this.rootElement, '');
	if (rootStyle) {
		rootWidth = parseInt(rootStyle.getPropertyValue("width"), 10);
		if (!rootWidth) {
			rootWidth = 0;
		}
	}
	if ((leftPadding + nodeRectLeft + this.INDENT_EDGE_MARGIN_WIDTH) >= rootWidth) {
		return this.INDENT_AT_RIGHT_MARGIN;
	} else if (!nodeRectLeft) {
		return this.INDENT_AT_LEFT_MARGIN;
	} else {
		return this.INDENT_NOT_AT_MARGIN;
	}
};

QMail.Editor.prototype.queryIndentEnabled = function() {
	return this.queryIndentationEnabled("indent");
};

QMail.Editor.prototype.queryOutdentEnabled = function() {
	return this.queryIndentationEnabled("outdent");
};

QMail.Editor.prototype.queryBlockquoteValue = function() {
    var value = this.getParentElement("BLOCKQUOTE");
    return value ? "blockquote" : "";
}
////////////////////end qureyCommand ////////////////////////////////////////

document._execCommand = document.execCommand;

document.execCommand = function(command) {
	void(0);
	var shouldStopListeningToChanges = (command == "undo" || command == "redo") ? true: false;
	var ret;
	var editor = QMail.Viewer.instance.editor;

	if (shouldStopListeningToChanges && editor) {
		editor.igoresChange(true);
	}
	try {
		ret = document._execCommand.apply(document, arguments);
	}
	catch(e) {
		void(0);
		throw e;
	}
	finally {
		if (shouldStopListeningToChanges && editor) {
			editor.igoresChange(false);
		}
	}
	return ret;
};
