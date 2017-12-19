(function () {
    QMail.Editor.prototype._createAudioElement = function (b) {
        var a = document.createElement(QMail.CONST.QM_INSERTED_AUDIO_TAG_NAME);
        a.addClass(QMail.CONST.QM_INSERT_AUDIO_CLASSNAME);
        a.addClass(QMail.CONST.QM_INSERT_AUDIO_END_CLASSNAME);
        a.setAttribute("id", b.filePath);
        QMail.AttachmentManager.shareInstance.addAttachInfoToElement(b, a);
        return a
    };
    QMail.Editor.prototype.shouldEnterFocusWhenTap = function (f) {
        var a = this;
        var c = new Date().getTime();
        if (f.target.isCheckboxElement()) {
            if (Math.abs(c - a._lastTapTime) > 1000 && a.isFocus) {
                var d = f.target;
                var b = d.getAttribute("checked");
                if (b) {
                    d.checked = false;
                    d.setAttribute("checked", "")
                } else {
                    d.checked = true;
                    d.setAttribute("checked", "checked")
                }
            }
            a._lastTapTime = new Date().getTime();
            return false
        } else {
            if (f.target.nodeName.toUpperCase() == "A" || f.target.getParentElementByName("A")) {
                return false
            }
        }
        a._lastTapTime = new Date().getTime();
        return true
    };
    QMail.Editor.prototype.insertImage = function (d, g) {
        var c = this;
        this.igoresChange(true);
        var a = this._createImageElement(d, g);
        var b = this.insertElement(a);
        if (b) {
            if (b) {
                if (g.width <= 0 || g.height <= 0) {
                    var e = new Image();
                    e.onload = function () {
                        var i = e.width;
                        var h = e.height;
                        b.style.minWidth = "";
                        b.style.minHeight = "";
                        c.editor.scrollToCaret(250);
                        QMail.NativeNotifier.notify("adjustContentSizeToFitFromJs")
                    };
                    e.src = g.src
                } else {
                    this.scrollToCaret(0);
                    setTimeout(function () {
                        QMail.NativeNotifier.notify("adjustContentSizeToFitFromJs")
                    }, 500)
                } if (g && g.isEmotion) {
                    QMail.Viewer.viewport.adjustImg(b, g.width, g.height)
                } else {
                    var f = new QMail.UIAttachment(b, d);
                    QMail.AttachmentManager.shareInstance.addAttachment(f)
                }
            }
            this.setCaretAfterElement(b);
            this.storeCurrentSelection();
            this.scrollToCaret(500)
        }
        this.igoresChange(false);
        return b
    };
    QMail.Editor.prototype.markPasteImageSaved = function (e, a) {
        for (var d = 0; d < a.length; d++) {
            var c = a[d];
            var b = e[d];
            var f = document.getElementById(b);
            if (f) {
                f.setAttribute("src", c.filePath);
                f.removeAttribute("id")
            }
        }
    }
})();