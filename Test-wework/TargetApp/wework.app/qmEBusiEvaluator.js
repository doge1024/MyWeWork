(function () {
    QMail.evaluator = QMail.evaluator ? QMail.evaluator : {};
    var f = "ios-upload-image";
    var i = QMail.CONST.QM_INSERT_AUDIO_CLASSNAME;
    var d = QMail.CONST.QM_INSERT_IMAGE_CLASS_NAME;
    var h = {};
    var c = function () {
        var j = document.getElementsByClassName(i);
        return j.length
    };
    var b = function () {};
    var g = function (l) {
        var j = document.getElementsByClassName(l);
        var q = j.length;
        if (q <= 0) {
            return 0
        }
        var n = q;
        var s = /^\d+_(\d)+\..*$/;
        for (var o = 0; o < q; o++) {
            var m = j[o];
            var r = m.getAttribute("qmtitle");
            var k = s.exec(r);
            if (k == null || k.length < 2) {
                continue
            }
            var p = parseInt(k[1]);
            if (n < p) {
                n = p
            }
        }
        return n
    };
    QMail.evaluator.insertImage = function (k, n, l, j, i, s) {
        if (typeof(s) === 'undefined') s = 0;
        var m = {
            filePath: k,
            fileSize: s,
            fileName: n,
            fileType: QMail.AttachmentManager.IMAGE_TYPE,
            nodeId: i
        };
        QMail.evaluator.insertAttachment(m, {
            width: l,
            height: j
        })
    };
    QMail.evaluator.insertEmotion = function (k, o, l, j) {
        var n = QMail.Viewer.instance.editor;
        var m = {
            filePath: k,
            fileSize: 0,
            fileName: o,
            fileType: QMail.AttachmentManager.IMAGE_TYPE
        };
        n.focus();
        n.insertImage(m, {
            width: l,
            height: j,
            isEmotion: true
        })
    };
    QMail.evaluator.insertAudio = function (l, n, j, k) {
        var m = {
            filePath: l,
            fileSize: j,
            fileName: n,
            duration: k,
            fileType: QMail.AttachmentManager.AUDIO_TYPE
        };
        QMail.evaluator.insertAttachment(m)
    };
    QMail.evaluator.toggleLandscape = function (j) {};
    QMail.evaluator.startDownloadQMAudio = function (k) {
        b("startDownloadQMAudio: " + k);
        var j = document.getElementById(k);
        if (j && j.getAttachId()) {
            QMail.evaluator.loadAudio(j.getAttachId())
        }
    };
    QMail.evaluator.finishedDownloadQMAudio = function (l, j) {
        b("finishedDownloadQMAudio: " + l);
        var k = document.getElementById(l);
        if (k && k.getAttachId()) {
            QMail.evaluator.stopAudio(k.getAttachId())
        }
    };
    QMail.evaluator.startPlayQMAudio = function (k) {
        var j = document.getElementById(k);
        if (j && j.getAttachId()) {
            QMail.evaluator.playAudio(j.getAttachId())
        }
    };
    QMail.evaluator.finishedPlayQMAudio = function (k) {
        var j = document.getElementById(k);
        if (j && j.getAttachId()) {
            QMail.evaluator.stopAudio(j.getAttachId())
        }
    };
    QMail.evaluator.setAudiosVisibility = function (m) {
        b("setAudiosVisibility: " + m);
        var n = document.getElementsByClassName(audioClassName);
        var l = n.length;
        for (var j = 0; j < l; j++) {
            var k = n[j];
            if (m) {
                k.removeAttribute("controls");
                k.style.display = "none";
                k.style.visibility = "hidden";
                k.hidden = true
            } else {
                k.setAttribute("controls", true);
                k.style.display = "inline";
                k.style.visibility = "visible";
                k.hidden = false
            }
        }
    };
    QMail.evaluator.replaceAudioToQMAudio = function (j) {
        QMail.AttachmentManager.shareInstance.makeElementsToAttachments(j)
    };
    QMail.evaluator.replaceQMAudioToAudio = function (j) {
        QMail.AttachmentManager.shareInstance.restoreAttachmentsToElements(j)
    };
    QMail.evaluator.extractAudios = function (n) {
        var p = [];
        var k = document.getElementsByClassName(i);
        var o = k.length;
        for (var m = o - 1; m >= 0; m--) {
            var l = k[m];
            if (n) {
                l.style.display = "none"
            }
            var j = l.getAttribute("id");
            var q = l.getAttribute("qmtitle");
            var r = l.getAttribute("qmsize");
            p.push({
                src: j,
                title: q,
                size: r
            })
        }
        return JSON.stringify(p)
    };
    QMail.evaluator.extractAllMediaSrc = function () {
        var m = [];
        var p = QMail.BusiUtil.getAllAudioElements();
        var j = p.length;
        for (var n = j - 1; n >= 0; n--) {
            var q = p[n].getAttribute("id") || p[n].getAttribute("src");
            m.push(q)
        }
        var l = [];
        var o = QMail.Viewer.instance.editor;
        p = o.rootElement.getElementsByTagName("IMG");
        j = p.length;
        for (var n = j - 1; n >= 0; n--) {
            var q = p[n].getAttribute("src");
            l.push(q)
        }
        var k = {
            images: l,
            audios: m
        };
        return JSON.stringify(k)
    };
    QMail.evaluator.deleteQMAudio = function (k) {
        var j = document.getElementById(k);
        if (j) {
            j.parentNode.removeChild(j)
        }
    };
    QMail.evaluator.getThumbInfo = function () {
        var k = {};
        var l = document.getElementsByTagName("IMG");
        l = [].slice.apply(l);
        for (var j = 0; j < l.length; j++) {
            if (l[j].getAttribute("src")) {
                k.src = l[j].getAttribute("src");
                break
            }
        }
        k.imgcnt = l.length;
        k.audiocnt = c();
        return JSON.stringify(k)
    };
    QMail.evaluator.getQMImageMaxIndex = function () {
        return Math.max(g(d), g(f))
    };
    QMail.evaluator.getQMAudioMaxIndex = function () {
        return Math.max(g(i), g(QMail.CONST.QM_INSERT_NATIVE_AUDIO_CLASSNAME))
    };
    QMail.evaluator.fetchLastDeleteAttachmentsInfo = function () {
        var l = QMail.AttachmentManager.shareInstance.lastChangesAttachmentsInfo;
        var m = [];
        if (l) {
            var j = l.dels;
            for (var k = 0; k < j.length; k++) {
                m.push(j[k].filePath)
            }
        }
        return JSON.stringify(m)
    };
    QMail.evaluator.replaceImagesSrcs = function (m, exactly) {
        if (!m) {
            return;
        }
        var n = false;
        var j = document.getElementsByTagName("IMG");
        for (var l = 0; l < j.length; l++) {
            var o = j[l];
            var p = o.getAttribute("src");
            for (k in m) {
                if (exactly) {
                    if (k != p) {
                        continue;
                    }
                } else {
                    var loc = p.indexOf(k, p.length - k.length);
                    if (loc == -1) {
                        continue;
                    }
                }
                o.setAttribute("src", m[k]);
                n = true;
            }
        }
        if (n) {
            setTimeout(function () {
                QMail.NativeNotifier.notify("adjustContentSizeToFitFromJs")
            }, 1000)
        }
    };
    QMail.evaluator.getAllLocalImages = function () {
        var ret = new Array();
        var j = document.getElementsByTagName("IMG");
        if (!j) {
            return null;
        }
        for (var l = 0; l < j.length; l++) {
            var o = j[l];
            var s = o.src;
            if (s && (s.indexOf('file://') === 0 || s.indexOf('localhost') === 0)) {
                ret.push(s);
            }
        }
        return JSON.stringify(ret);
    };
    QMail.evaluator.reloadImages = function (m) {
        if (!m) {
            return;
        }
        var n = false;
        var images = document.getElementsByTagName("IMG");
        for (var i = 0; i < m.length; i++) {
            for (var j =0; j < images.length; j++) {
                var img = images[j];
                var imgID = img.getAttribute("id");
                if (imgID == m[i]) {
                    var src = img.getAttribute("src");
                    img.setAttribute("src", "");
                    img.setAttribute("src", src);
                    n = true;
                }
            }
        }
        if (n) {
            setTimeout(function () {
                QMail.NativeNotifier.notify("adjustContentSizeToFitFromJs")
            }, 1000)
        }
    };
    QMail.evaluator.checkDomModifiedWithId = function (j) {
        j = j ? j : "";
        var k = document.getElementById(j);
        if (k) {
            h[j] = false;
            k.addEventListener("DOMSubtreeModified", function () {
                h[j] = true
            }, false)
        }
    };
    QMail.evaluator.setDomModifiedWithId = function (j, l) {
        j = j ? j : "";
        var k = document.getElementById(j);
        if (k && l) {
            h[j] = l
        }
    };
    QMail.evaluator.isDomModifiedWithId = function (j) {
        return j && h[j] && typeof (h[j]) == "boolean" ? h[j] : false
    };
    QMail.evaluator.getHtmlWithDomId = function (j) {
        j = j ? j : "";
        var k = document.getElementById(j);
        return k && k.innerHTML ? k.innerHTML : ""
    };
    QMail.evaluator.getComposeContent = function (k, m) {
        k = k ? k : "";
        var o = QMail.Viewer.instance.editor;
        var n = document.getElementById(k);
        if (n && !this.isDomModifiedWithId(k) && m) {
            var l = o.getInnerHtml();
            var j = document.createElement("div");
            j.innerHTML = l;
            var p = j.querySelector("#" + k);
            p && p.remove();
            return j.innerHTML
        } else {
            return o.getInnerHtml()
        }
    };
    QMail.evaluator.changeSignText = function (k) {
        var j = document.querySelector(".mail-footer");
        if (j) {
            j.innerHTML = k
        }
    };
    var e = "QMLoading";
    var a = "QMError";
    QMail.evaluator.showLoadingContent = function () {
        var k = document.getElementById(e);
        var j = document.getElementById(a);
        k.addClass("show");
        j.removeClass("show")
    };
    QMail.evaluator.hideLoadingContent = function () {
        var j = document.getElementById(e);
        j.removeClass("show")
    };
    QMail.evaluator.showErrorContent = function () {
        var k = document.getElementById(e);
        var j = document.getElementById(a);
        j.addClass("show");
        k.removeClass("show")
    };
    QMail.evaluator.hideErrorContent = function () {
        var j = document.getElementById(a);
        j.removeClass("show")
    };
    QMail.evaluator.hideErrorAndLoading = function () {
        this.hideErrorContent();
        this.hideLoadingContent()
    };
    QMail.evaluator.completeContent = function (j, m) {
        j = j ? j : "";
        var l = QMail.Viewer.instance.editor;
        var k = document.getElementById(j);
        this.hideErrorAndLoading();
        if (k) {
            k.innerHTML = m
        }
    };
    QMail.evaluator.replaceImagesSrcWithDefault = function (o) {
        var n = document.getElementsByTagName("img");
        n = [].slice.apply(n);
        for (var l = 0; l < n.length; l++) {
            var m = n[l];
            var j = m.src;
            var k = m.style.border;
            if (j) {
                m.setAttribute("_src", j);
                m.setAttribute("_border", k);
                m.src = o;
                m.style.border = "1px solid #e6e6e6";
                m.style.minWidth = "10px";
                m.style.minHeight = "10px"
            }
        }
    };
    QMail.evaluator.restoreImagesSrcFromDefault = function () {
        var n = document.getElementsByTagName("img");
        n = [].slice.apply(n);
        for (var l = 0; l < n.length; l++) {
            var m = n[l];
            var j = m.getAttribute("_src");
            var k = m.getAttribute("_border");
            if (j) {
                m.src = j;
                m.border = k;
                m.removeAttribute("_src");
                m.removeAttribute("_border");
                m.style.minWidth = "0";
                m.style.minHeight = "0"
            }
        }
    };
    QMail.evaluator.getThumbUrl = function () {
        var j = document.getElementsByTagName("img");
        for (var l = 0; l < j.length; l++) {
            var k = j[l];
            if (k && k.src) {
                return k.src
            }
        }
    };
    QMail.evaluator.clearFoldeForReadMail = function () {
        var k = document.getElementById("mailFoldWrap");
        var l = document.getElementById("mail_fold_toggle");
        if (k && l) {
            var m = l.parentNode;
            if (m) {
                var j = m.parentNode;
                if (j) {
                    j.removeChild(m)
                }
            }
            k.style.display = "";
            k.setAttribute("id", "")
        }
    };
    QMail.evaluator.replaceImagesSrcWithErasion = function () {
        var n = QMail.Viewer.instance.editor;
        var o = n.rootElement.getElementsByTagName("IMG");
        o = [].slice.apply(o);
        for (var l = 0; l < o.length; l++) {
            var j = o[l];
            var m = j.getAttribute("src");
            if (m && m.indexOf("cid:") > -1) {
                var p = document.createElement("div");
                var k = l + 1;
                p.innerHTML = "原文图片";
                p.style.backgroundColor = "#f0f0f0";
                p.style.color = "#999";
                p.style.margin = "3px 0";
                p.style.padding = "0";
                p.style.width = "80px";
                p.style.lineHeight = "60px";
                p.style.textAlign = "center";
                p.style.fontSize = "0.7em";
                p.style.borderRadius = "4px";
                j.replace(p)
            }
        }
    };
    QMail.evaluator.replaceInlineImages = function () {
        var l = QMail.Viewer.instance.editor;
        var p = l.rootElement.getElementsByTagName("IMG");
        p = [].slice.apply(p);
        for (var j = 0; j < p.length; j++) {
            var o = p[j];
            var k = o.getAttribute("src");
            var n = k.substring(k.lastIndexOf("/") + 1);
            var m = o.getAttribute("qmtitle");
            if (m != n) {
                o.setAttribute("qmtitle", n)
            }
        }
    };
    QMail.evaluator.focusOnElement = function (i) {
        if (!i) {
            return;
        }
        var ele = document.getElementById(i);
        if (!ele) {
            return;
        }
        this.becomeFirstResponder();
        QMail.Viewer.instance.editor.setCaretAfterElement(ele);
        QMail.Viewer.instance.editor.storeCurrentSelection();
    };
    QMail.evaluator.unresolvedImagesForForwardMail = function () {
        var m = QMail.Viewer.instance.editor;
        var q = m.rootElement.getElementsByTagName("IMG");
        q = [].slice.apply(q);
        var j = [];
        for (var k = 0; k < q.length; k++) {
            var p = q[k];
            var l = p.getAttribute("src");
            var o = l.substring(l.lastIndexOf("/") + 1);
            var n = p.getAttribute("qmtitle");
            if (!n) {
                n = o
            }
            j.push({
                imgName: n,
                imgSrc: l
            })
        }
        return JSON.stringify(j)
    };
    QMail.evaluator.getNoteId = function () {
        return window.noteId
    };
    QMail.evaluator.changeBodyContentSize = function (j) {
        document.body.style.cssText = "font-size:" + j + "px !important;"
    }
    QMail.evaluator.getAttachmentsFromDOM = function () {
        var elems = [].slice.apply(document.querySelectorAll('.app-upload-image'));
        return JSON.stringify({
            "attachments" : elems.map(function(e){
                return {
                    "title" : e.getAttribute('qmtitle'),
                    "size" : parseInt(e.getAttribute('qmsize')),
                    "attachid" : e.getAttribute('attachid'),
                    "url" : e.getAttribute('src')
                };
            })
        });
    };
})();