(function () {
    var a = "ios-upload-image";
    QMail.AttachmentManager.prototype.queryAllAttachmentsElements = function () {
        var c = QMail.CONST.QM_INSERT_AUDIO_CLASSNAME;
        var h = QMail.CONST.QM_INSERT_NATIVE_AUDIO_CLASSNAME;
        var g = QMail.Viewer.instance.editor;
        var e = g.rootElement.querySelectorAll("." + a);
        var d = g.rootElement.querySelectorAll("." + QMail.CONST.QM_INSERT_IMAGE_CLASS_NAME);
        var f = g.rootElement.querySelectorAll("." + c);
        var i = g.rootElement.querySelectorAll("." + h);
        e = [].slice.apply(e);
        d = [].slice.apply(d);
        f = [].slice.apply(f);
        i = [].slice.apply(i);
        f = i.concat(f);
        var b = e.concat(d.concat(f));
        return b
    };
    QMail.AttachmentManager.prototype.queryAllUnresolvedAttachmentsElements = function () {
        var g = QMail.Viewer.instance.editor;
        var f = g.rootElement.querySelectorAll("." + a);
        var e = g.rootElement.querySelectorAll("." + QMail.CONST.QM_INSERT_IMAGE_CLASS_NAME);
        var d = this;
        f = [].slice.apply(f);
        e = [].slice.apply(e);
        var c = QMail.BusiUtil.getAllAudioElements();
        var b = f.concat(e.concat(c));
        return QMail.Util.uniqueArray(b)
    };
    QMail.AttachmentManager.prototype.normailizeAudioElement = function (b) {
        b.removeClass(QMail.CONST.QM_INSERT_NATIVE_AUDIO_CLASSNAME);
        b.removeClass("ios-upload-audio");
        b.addClass(QMail.CONST.QM_INSERT_AUDIO_CLASSNAME)
    };
    QMail.AttachmentManager.prototype.getAttachmentFromElement = function (c) {
        var b = QMail.CONST.QM_INSERT_AUDIO_CLASSNAME;
        var d = QMail.CONST.QM_INSERT_NATIVE_AUDIO_CLASSNAME;
        if (c) {
            var e = c.nodeName.toUpperCase();
            if (e == "IMG") {
                return {
                    filePath: c.getAttribute("src"),
                    fileSize: 0,
                    fileName: c.getAttribute("title"),
                    fileType: QMail.AttachmentManager.IMAGE_TYPE
                }
            } else {
                if (c.hasClass(b) || c.hasClass(d) || c.hasClass("ios-upload-audio")) {
                    return {
                        filePath: c.getAttribute("src"),
                        fileSize: c.getAttribute("qmsize"),
                        fileName: c.getAttribute("qmtitle"),
                        fileType: QMail.AttachmentManager.AUDIO_TYPE,
                        duration: c.getAttribute("qmduration")
                    }
                }
            }
        }
        return {
            fileType: QMail.AttachmentManager.KNOWN_TYPE
        }
    };
    QMail.AttachmentManager.prototype.addAttachInfoToElement = function (d, c, e) {
        var b = QMail.CONST.QM_INSERT_AUDIO_CLASSNAME;
        var f = QMail.CONST.QM_INSERT_NATIVE_AUDIO_CLASSNAME;
        if (c) {
            c.setAttribute("src", d.filePath);
            if (d.fileType == QMail.AttachmentManager.IMAGE_TYPE) {
                c.addClass(QMail.CONST.QM_INSERT_IMAGE_CLASS_NAME);
            } else {
                if (d.fileType == QMail.AttachmentManager.AUDIO_TYPE) {
                    c.addClass(QMail.CONST.QM_INSERT_AUDIO_CLASSNAME);
                }
            }
            c.setAttribute("controls", true);
            c.setAttribute("preload", "metadata");
            c.setAttribute("qmtitle", d.fileName);
            c.setAttribute("qmsize", d.fileSize);
            if (d.fileType == QMail.AttachmentManager.AUDIO_TYPE) {
                c.setAttribute("qmduration", d.duration)
            }
            e = typeof (e) == "boolean" ? e : true;
            if (e) {
                if (d.fileType == QMail.AttachmentManager.IMAGE_TYPE && d.nodeId) {
                    c.setAttribute("id", d.nodeId);
                } else {
                    c.setAttribute("id", d.filePath);
                }
            }
        }
    };
    QMail.AttachmentManager.prototype.restoreAttachmentsToElements = function (h) {
        var f = QMail.Viewer.instance.editor;
        var g = this.queryAllAttachmentsElements();
        var b = this;
        f.igoresChange(true);
        for (var e = 0; e < g.length; e++) {
            var d = g[e];
            var c = this.getAttachmentFromElement(d);
            if (b.isAudioAttachment(c.fileType)) {
                var j = document.createElement("audio");
                j = d.replace(j);
                this.addAttachInfoToElement(c, j, false);
                j.addClass(QMail.CONST.QM_INSERT_NATIVE_AUDIO_CLASSNAME);
                j.removeClass(QMail.CONST.QM_INSERT_AUDIO_CLASSNAME);
                if (h && h == "composeMail") {
                    j.setAttribute("hidden", "true")
                }
            }
        }
        f.igoresChange(false)
    }
})();