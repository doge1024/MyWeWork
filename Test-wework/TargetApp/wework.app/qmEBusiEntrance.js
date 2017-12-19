QMail.CONST.QM_INSERT_IMAGE_CLASS_NAME = "app-upload-image";
QMail.CONST.QM_INSERT_NATIVE_AUDIO_CLASSNAME = "app-upload-audio";
QMail.config.tapBodyToEnd = true;
QMail.Viewport.prototype.disableUserScale = function () {};
QMail.domReady(function () {
    if (QMail.config.entranceType == "mail") {
        var b = '<div id="QMLoading" class="qmEditorContentLoading"><p><span class="spin"></span><span>邮件加载中...</span></p></div>';
        b += '<div id="QMError" class="qmEditorContentError"><p>邮件加载失败</p></div>';
        var a = document.createElement("div");
        a.innerHTML = b;
        document.body.appendChild(a)
    }
    QMail.Util.filterArray = function (e, d) {
        for (var c = e.length - 1; c >= 0; c--) {
            if (d && d(e[c])) {
                e.splice(c, 1)
            }
        }
    };
    QMail.Util.uniqueArray = function (j) {
        var d = [];
        var h = {};
        for (var f = 0, c = j.length; f < c; f++) {
            var g = j[f];
            var e = g.filterId ? g.filterId : new Date().getTime() + f + Math.random() * 1000;
            if (!h.hasOwnProperty(e)) {
                g.filterId = e;
                h[e] = true;
                d.push(g)
            }
        }
        return d
    };
    document.getElementById(QMail.config.editorId).addEventListener("keyup", function () {
        QMail.NativeNotifier.notify("keyUp")
    }, false);
    QMail.BusiUtil = {
        getAllAudioElements: function () {
            var g = QMail.Viewer.instance.editor;
            var d = QMail.CONST.QM_INSERT_AUDIO_CLASSNAME;
            var h = QMail.CONST.QM_INSERT_NATIVE_AUDIO_CLASSNAME;
            var e = g.rootElement.getElementsByTagName("object");
            var f = g.rootElement.querySelectorAll("." + d);
            var i = g.rootElement.querySelectorAll("." + h);
            f = [].slice.apply(f);
            e = [].slice.apply(e);
            i = [].slice.apply(i);
            QMail.Util.filterArray(e, QMail.BusiUtil.audioFilter);
            var c = f.concat(e).concat(i);
            return QMail.Util.uniqueArray(c)
        }, audioFilter: function (c) {
            if (c.hasAttribute("qmtitle")) {
                return false
            } else {
                return true
            }
        }
    };
    if (window.currScale * 10 == 10 && shouldScaleToFix) {
        QMail.Viewer.viewport.on("beforeScaleTofix", function (c) {
            QMail.NativeNotifier.notify("setWebViewScaleFromJS", {
                scale: c
            });
            document.getElementById("QMEditor").removeClass("editordidload")
        });
        QMail.Viewer.viewport.shouldScaleToFix = true
    }
    QMail.Viewer.instance.showImageLoading = true;
    QMail.Viewer.instance.ready();
    QMail.Diffs.shareInstance.saveCurrentText();
    QMail.NativeNotifier.notify("domContentLoadedFromJs")
});