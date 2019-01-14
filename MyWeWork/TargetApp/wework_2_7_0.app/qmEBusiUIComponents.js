(function () {
    var a = {
        playing: 1,
        ending: 2,
        loading: 3
    };
    QMail.UIAttachment = function (c, b) {
        this.init.apply(this, [].slice.apply(arguments))
    };
    QMail.Util.subclass(QMail.UIAttachment, QMail.UIView);
    QMail.UIAttachment.prototype.getUuid = function () {
        return "qmattach_" + new Date().getTime() + "_" + Math.floor(Math.random() * 1000)
    };
    QMail.UIAttachment.prototype._styleSheetNode = null;
    QMail.UIAttachment.prototype.init = function (c, b) {
        if (c) {
            this.__defineGetter__("uuid", this.getUuid);
            this.__defineGetter__("styleSheetNode", this.getStyleSheetNode);
            this.element = c;
            this.attachInfo = b;
            QMail.UIAttachment.__super__.init.apply(this, [].slice.apply(arguments));
            var d = this.uuid;
            this.attachId = d;
            this.element.setAttachId(d);
            this.bindEvents()
        } else {
            QMail.Debug.err("missing element on create UIAudioAttachment")
        }
    };
    QMail.UIAttachment.prototype.bindEvents = function () {
        var b = this;
        this.element.onclick = function () {
            b.onclick && b.onclick()
        }
    };
    QMail.UIAttachment.prototype.destroy = function () {
        if (this.element) {
            this.element.onclick = null
        }
        this.element = null;
        this._styleSheetNode && this._styleSheetNode.remove();
        this._styleSheetNode = null;
        QMail.UIAttachment.__super__.destroy.apply(this, [].slice.apply(arguments))
    };
    QMail.UIAttachment.prototype.getStyleSheetNode = function () {
        if (!this._styleSheetNode) {
            var b = document.getElementsByTagName("head")[0],
                c = document.createElement("style");
            c.type = "text/css";
            b.appendChild(c);
            this._styleSheetNode = c
        }
        return this._styleSheetNode
    };
    QMail.UIAttachment.prototype.renderToElement = function (d) {
        try {
            var b = QMail.UIManager.shareInstance.canvas;
            var h = this.makeImageData();
            var c = "." + this.attachId + " { background-image:url(" + h + "); }";
            var f = this.styleSheetNode;
            if (f.styleSheet) {
                f.styleSheet.cssText = c
            } else {
                f.removeAllChilds();
                f.appendChild(document.createTextNode(c))
            }
            d.addClass(this.attachId);
            d.setAttribute("role", "button");
            d.style.width = b.style.width;
            d.style.height = b.style.height;
            d.style["background-color"] = "white";
            d.style["background-position"] = "0 0";
            d.style["background-repeat"] = "no-repeat";
            d.style["background-size"] = "cover"
        } catch (g) {
            QMail.Debug.err("renderToElement error:" + g.message)
        }
    };
    QMail.UIAudioAttachment = function (c, b) {
        this.init.apply(this, [].slice.apply(arguments))
    };
    QMail.Util.subclass(QMail.UIAudioAttachment, QMail.UIAttachment);
    QMail.UIAudioAttachment.prototype.playEndImageUrl = "icon_recorder_play@2x.png";
    QMail.UIAudioAttachment.prototype.playIngImageUrl = "icon_recorder_playing@2x.png";
    QMail.UIAudioAttachment.prototype.playLoadingImageUrl = "icon_recorder_loading@2x.gif";
    QMail.UIManager.shareInstance.registerImages(QMail.UIAudioAttachment.prototype.playEndImageUrl);
    QMail.UIManager.shareInstance.registerImages(QMail.UIAudioAttachment.prototype.playIngImageUrl);
    QMail.UIManager.shareInstance.registerImages(QMail.UIAudioAttachment.prototype.playLoadingImageUrl);
    QMail.UIAudioAttachment.prototype.DEFAULT_WIDTH = 284;
    QMail.UIAudioAttachment.prototype.DEFAULT_HEIGHT = 60;
    QMail.UIAudioAttachment.prototype._fileSize = "";
    QMail.UIAudioAttachment.prototype._fileName = "";
    QMail.UIAudioAttachment.prototype.status = a.ending;
    QMail.UIAudioAttachment.prototype.filenameContextAttributes = {
        font: "normal 15px Helvetica",
        fillStyle: "#5f5f5f",
        textAlign: "left",
        textBaseline: "top"
    };
    QMail.UIAudioAttachment.prototype.filenamePlayingContextAttributes = {
        font: "normal 15px Helvetica",
        fillStyle: "#a6a6a6",
        textAlign: "left",
        textBaseline: "top"
    };
    QMail.UIAudioAttachment.prototype.filesizeContextAttributes = {
        font: "normal 13px Helvetica",
        fillStyle: "#848484",
        textAlign: "left",
        textBaseline: "top"
    };
    QMail.UIAudioAttachment.prototype.filesizePlayingContextAttributes = {
        font: "normal 13px Helvetica",
        fillStyle: "#b4b4b4",
        textAlign: "left",
        textBaseline: "top"
    };
    QMail.UIAudioAttachment.prototype.playingGradientColorTop = {
        begin: "#fff",
        end: "#fff"
    };
    QMail.UIAudioAttachment.prototype.endGradientColorTop = {
        begin: "#fff",
        end: "#fff"
    };
    QMail.UIAudioAttachment.prototype.init = function () {
        var b = QMail.UIAudioAttachment.__super__.init.apply(this, [].slice.apply(arguments));
        this.__defineGetter__("fileSize", this.getFileSize);
        this.__defineGetter__("fileName", this.getFileName);
        this.__defineSetter__("fileSize", this.setFileSize);
        this.__defineSetter__("fileName", this.setFileName);
        this.initView();
        this.fileName = this.attachInfo.fileName;
        this.fileSize = this.attachInfo.fileSize
    };
    QMail.UIAudioAttachment.prototype.destroy = function () {
        QMail.UIAudioAttachment.__super__.destroy.apply(this, [].slice.apply(arguments))
    };
    QMail.UIAudioAttachment.prototype.getFileSize = function () {
        return this._fileSize
    };
    QMail.UIAudioAttachment.prototype.setFileSize = function (b) {
        this._fileSize = b;
        this.labelFileSize.text = b
    };
    QMail.UIAudioAttachment.prototype.getFileName = function () {
        return this._fileName
    };
    QMail.UIAudioAttachment.prototype.setFileName = function (b) {
        this._fileName = b;
        this.labelFileName.text = b
    };
    QMail.UIAudioAttachment.prototype.initView = function () {
        this.frame = new Frame(0, 0, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT);
        var g = new QMail.UIImageView();
        var k = 30;
        var l = 30;
        var c = 10;
        var h = 10;
        var m = (this.DEFAULT_HEIGHT - l) / 2;
        g.frame = new Frame(c, m, k, l);
        g.image = new QMail.UIImage.imageNamed(this.playEndImageUrl);
        this.imgView = g;
        var f = new QMail.UILabel();
        var b = 5;
        var e = this.DEFAULT_WIDTH - c * 2 - h - k;
        var i = 15;
        var j = 13;
        var n = this.DEFAULT_HEIGHT - (b + i + j);
        n = n / 2;
        f.frame = new Frame(c + k + h, n, e, i);
        f.text = this.fileSize;
        f.contextAttribute = this.filenameContextAttributes;
        this.labelFileName = f;
        var d = new QMail.UILabel();
        d.frame = new Frame(c + k + h, n + i + b, e, j);
        d.text = this.fileName;
        d.contextAttribute = this.filesizeContextAttributes;
        this.labelFileSize = d;
        this.addSubview(g);
        this.addSubview(f);
        this.addSubview(d)
    };
    QMail.UIAudioAttachment.prototype.showPlaying = function () {
        if (this.element) {
            this.status = a.playing;
            this.imgView.image = new QMail.UIImage.imageNamed(this.playIngImageUrl);
            this.labelFileSize.contextAttribute = this.filesizePlayingContextAttributes;
            this.labelFileName.contextAttribute = this.filenamePlayingContextAttributes;
            this.renderToElement(this.element)
        }
    };
    QMail.UIAudioAttachment.prototype.showEnding = function () {
        if (this.element) {
            this.status = a.ending;
            this.imgView.image = new QMail.UIImage.imageNamed(this.playEndImageUrl);
            this.labelFileSize.contextAttribute = this.filesizeContextAttributes;
            this.labelFileName.contextAttribute = this.filenameContextAttributes;
            this.renderToElement(this.element)
        }
    };
    QMail.UIAudioAttachment.prototype.drawRect = function () {
        QMail.UIAudioAttachment.__super__.drawRect.apply(this, [].slice.apply(arguments));
        if (this._drawRect) {
            var d = QMail.UIManager.shareInstance;
            d.saveContext();
            var c = d.context;
            c.rect(0, 0, this._drawRect.width, this._drawRect.height);
            var b = c.createLinearGradient(0, this._drawRect.height, 0, 0);
            var e, f;
            if (this.status == a.playing || this.status == a.loading) {
                e = this.playingGradientColorTop.begin;
                f = this.playingGradientColorTop.end
            } else {
                e = this.endGradientColorTop.begin;
                f = this.endGradientColorTop.end
            }
            b.addColorStop(0, e);
            b.addColorStop(1, f);
            c.fillStyle = b;
            c.fill();
            d.restoreContext()
        }
    };
    QMail.UIAudioAttachment.prototype.showLoding = function () {
        if (this.element) {
            this.status = a.loading;
            this.imgView.image = new QMail.UIImage.imageNamed(this.playLoadingImageUrl);
            this.labelFileSize.contextAttribute = this.filesizePlayingContextAttributes;
            this.labelFileName.contextAttribute = this.filenamePlayingContextAttributes;
            this.renderToElement(this.element)
        }
    };
    QMail.Events.mixTo(QMail.UIAudioAttachment)
})();