window.configuration = JSON.parse(document.getElementById('readmailconfiguration').innerHTML) || {};

HTMLElement.prototype.addLongPressEventListener = function(callback, capture) {
    if (typeof callback != 'function') {
        return;
    }
    var timeout;
    var self = this;
    this.addEventListener("touchstart", function(e){
        if (e.touches && e.touches.length > 1) {
            clearTimeout(timeout);
            return;
        }
        timeout = setTimeout(function(){
            callback && callback.call(self, e);
        }, 500);
    }, false);
    this.addEventListener("touchmove", function(e) {
        timeout && clearTimeout(timeout);
    }, false);
    this.addEventListener("touchend", function(e) {
        timeout && clearTimeout(timeout);
    }, false);
};

var callNative = function(url) {
    var newIframe = document.createElement('iframe');
    newIframe.style.display = 'none';
    newIframe.src = url;
    document.documentElement.appendChild(newIframe);
    document.documentElement.removeChild(newIframe);
}

var changeFontSize = function(){
    var mailcontent = document.getElementById('mailcontent');
    var nodeArray = Array.prototype.slice.call(mailcontent.querySelectorAll('*'));
    nodeArray.push(mailcontent);
    var exception = Array.prototype.slice.call(document.getElementById('mailcontent').querySelectorAll('.wework_tablewrapper, .wework_tablewrapper *'));
    nodeArray = nodeArray.filter(function(e){ return exception.indexOf(e) == -1; });
    var sizeArray = nodeArray.map(function(e){return parseFloat(window.getComputedStyle(e).fontSize);});
    if (false) {
        var fontAdjust = window.configuration.fontAdjust || 0;
        nodeArray.forEach(function(e,i){
            if (!e.tagName) return;
            var computedStyle = window.getComputedStyle(e);
            e.style.fontSize = (sizeArray[i] + fontAdjust) + 'px';
            if (e.style.lineHeight && e.style.lineHeight.slice(-1) != '%') {
                e.style.lineHeight = parseFloat(computedStyle.lineHeight) + fontAdjust + 'px';
            }
            if (e.style.height && e.style.height.slice(-1) != '%') {
                e.style.height = parseFloat(computedStyle.height) + fontAdjust + 'px';
            }
        });
    } else {
        var averageFont = window.configuration.averageFont || 17;
        var validFont = sizeArray.filter(function(e) { return e >= 8 && e <= 64; });
        var fontFactor = averageFont / (validFont.reduce(function(a, b) { return a + b; }, 0) / validFont.length);
        nodeArray.forEach(function(e,i){
            if (!e.tagName) return;
            var computedStyle = window.getComputedStyle(e);
            e.style.fontSize = (sizeArray[i] * fontFactor) + 'px';
            if (e.style.lineHeight && e.style.lineHeight.slice(-1) != '%') {
                e.style.lineHeight = parseFloat(computedStyle.lineHeight) * fontFactor + 'px';
            }
            if (e.style.height && e.style.height.slice(-1) != '%') {
                e.style.height = parseFloat(computedStyle.height) * fontFactor + 'px';
            }
        });
    }
};

var registerLongPressHandler = function(){
    var elems = Array.prototype.slice.call(document.getElementsByTagName('img'));
    elems.forEach(function(e){
        if (e.getAttribute('longPressEventListenerRegistered')) return;
        e.setAttribute('longPressEventListenerRegistered', true);
        e.addLongPressEventListener(function(){
            window.getSelection().empty();
            callNative('readmail://imglongpress?url=' + encodeURIComponent(e.src));
        });
    });
    callNative('readmail://imgcount?n=' + elems.length);
    elems = Array.prototype.slice.call(document.getElementsByTagName('a'));
    elems.forEach(function(e){
        if (e.getAttribute('longPressEventListenerRegistered')) return;
        e.setAttribute('longPressEventListenerRegistered', true);
        if (e.href.toLowerCase().indexOf("mailto:") == 0 || e.href.toLowerCase().indexOf("tel:") == 0 || e.href.toLowerCase().indexOf("sms:") == 0) {
            e.style.webkitTouchCallout = 'none';
        }
        e.addLongPressEventListener(function(){
            window.getSelection().empty();
            callNative('readmail://linklongpress?url=' + encodeURIComponent(e.href));
        });
    });
};

var preloadImages = function(){
    var elems = Array.prototype.slice.call(document.getElementsByTagName('img'));
    var count = elems.length;
    elems.forEach(function(e){
        if (!e.complete || (typeof e.naturalWidth !== "undefined" && e.naturalWidth === 0)) {
            var placeholder = document.createElement('div');
            placeholder.className = 'readmail_preloader_placeholder';
            e.parentNode.insertBefore(placeholder,e);
            e.className = (e.className || '') + ' readmail_preloader_img';
            var resumefunc = function(){
                e.className = e.className.replace(/readmail_preloader_img/, '');
                placeholder.parentNode.removeChild(placeholder);
            };
            var completefunc = function(){
                --count;
                if (count == 0) {
                    fixScale();
                }
            };
            e.addEventListener('load', function(){
                resumefunc();
                completefunc();
            }, false);
            e.addEventListener('error', function(){
                completefunc();
            }, false);
        }
    });
};

var fixStyle = function() {
    /* 这段逻辑主要是保护以下场景：
     某些邮件内同时存在多种类型的内容：写死很长的宽度的标签、表格、图片，并且这些内容都比较宽。
     对于这种情况，我们不希望它出现横向滚动，也不希望按照浏览器默认的缩放行为，把整封邮件都缩得很小。
     所以这时我们会把表格、图片的宽度都缩放到和屏幕宽度一致（表格用transform，图片用max-width）。
     但做了这些操作之后发现body的宽度还是很宽：因为存在一些写死宽度的标签（例如width:1000px的div）。
     所以目前的策略就是把div的宽度强制设为auto。
     
     至于为什么这里用"img"和"table img"作为判断条件，是因为这种情况一般都出现在广告邮件。广告邮件的特点是存在大量的图片，并且用table控制图片的布局。
     所以就用下面这种if条件进行猜测，不准确但能覆盖常见场景。
     code by william, comment by molice
     */
    var imgs = document.getElementsByTagName("img");
    var imgstable =  document.querySelectorAll("table img");
    if(imgstable.length <= imgs.length/2) {
        var firstDiv =  document.querySelectorAll("#mailcontent > div");
        for (var i = 0; i < firstDiv.length; i ++) {
            if (!firstDiv[i].classList.contains('wework_tablewrapper')) {
                firstDiv[i].className += " selfdiv";
            }
        }
        var firstP =  document.querySelectorAll("#mailcontent > p");
        for (var j = 0; j < firstP.length; j ++) {
            firstP[j].className += " selfdiv";
        }
    }
}

var fixScale = function() {
    var fixMaxScale = 2.0;
    var imgStyleArray = new Array;
    var imgOrgWidthArray = new Array;
    var imgs = document.getElementsByTagName("img");
    var screenWidth = window.configuration.screenWidth;
    for (var i = 0; i < imgs.length; i ++) {
        imgOrgWidthArray.push(imgs[i].scrollWidth);
        if(imgs[i].clientWidth>screenWidth) {
            var scaleImage = (screenWidth/(imgs[i].clientWidth))*2;
            if (scaleImage>fixMaxScale) {
                fixMaxScale = scaleImage;
            }
        }
        imgs[i].style.maxWidth = "1px";
        imgs[i].style.height = "auto";
        imgs[i].style.maxHeight = "none";
    }
    var imgstable = document.querySelectorAll("table img");
    for (var i = 0; i < imgstable.length; i ++) {
        imgstable[i].style.maxWidth = "none";
        imgstable[i].style.height = "";
        imgstable[i].style.maxHeight = "none";
    }
    
    for (var i = 0; i < imgs.length; i ++) {
        if(getComputedStyle(imgs[i])["maxWidth"] != "none"){
            if(imgOrgWidthArray[i]>50) {
                var textPadding = 0;
                if(imgs[i].parentNode) {
                    textPadding = parseInt(getComputedStyle(imgs[i].parentNode)["padding-left"]);
                }
                var textIndent = parseInt(getComputedStyle(imgs[i])["text-indent"]);
                imgs[i].style.marginLeft = "-" + (textIndent + textPadding) +"px";
            }
        }
    }
    
    fixTableScale();
    
    var documentScrollWidth = document.body.scrollWidth;
    var viewport = document.querySelector('meta[name=viewport]');
    if (documentScrollWidth > screenWidth) {
        for (var i = 0; i < imgs.length; i ++) {
            imgs[i].style.maxWidth = "none";
            imgs[i].style.height = "";
            imgs[i].style.maxHeight = "none";
        }
        var scale = screenWidth / (document.body.scrollWidth + 16);
        callNative('readmail://savescale?' + scale);
        viewport.content = "initial-scale=" + scale + ", user-scalable=yes, maximum-scale=2.0";
    } else {
        for (var i = 0; i < imgs.length; i ++) {
            imgs[i].style.maxWidth ='100%';
        }
        for (var i = 0; i < imgstable.length; i ++) {
            imgstable[i].style.maxWidth = "none";
        }
        if(fixMaxScale>10.0){
            fixMaxScale  = 10.0;
        }
        callNative('readmail://savescale?1');
        viewport.content = "initial-scale=1, user-scalable=yes, maximum-scale="+fixMaxScale;
    }
}

var fixTableScale = function() {
    var tablewrappers = document.querySelectorAll('.wework_tablewrapper');
    var exception = Array.prototype.slice.call(document.querySelectorAll('.wework_tablewrapper .wework_tablewrapper'));
    for (var i = 0; i < tablewrappers.length; ++i) {
        var tablewrapper = tablewrappers[i];
        if (exception.indexOf(tablewrapper) != -1) continue;
        var table = tablewrapper.querySelector('table');
        if (table) {
            var scale = tablewrapper.clientWidth / table.scrollWidth;
            if (scale < 1) {
                tablewrapper.style.transform = 'scale(' + scale + ')';
                tablewrapper.style.transformOrigin = '0 0';
                tablewrapper.style.height = table.scrollHeight * scale + 'px';
                tablewrapper.style.overflow = 'visible';
            }
        }
    }
}

var customDataDetectorResult = function() {
    document.removeEventListener('DOMSubtreeModified', customDataDetectorResult);
    registerLongPressHandler();
    document.addEventListener('DOMSubtreeModified', customDataDetectorResult, false);
}

function $(id) { return document.getElementById(id) }
var _oDomContent,
_oDomContainer,
_bIsHide = true,
_nStartPoint,
_nContentHeight,
_nStartHeight,
_nTrueHeight,
_nTimer;
var hideSpace =function(){
    $("mailFoldSpace").style.height = '0px';
}

onloadGetHeight = function(){
    /*fly帮忙添加的可以准确获取页面高度的方法*/
    var scrollHeightOrg = document.body.offsetHeight + 32;
    var style = document.createElement('style');
    style.textContent = ' div { height: auto !important; }';
    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
    var scrollHeight = document.body.offsetHeight + 32;
    style.parentNode.removeChild(style);
    if(scrollHeightOrg>scrollHeight)
        {/*如果原来的scrollHeightOrg值比改变布局后的大，就按改变布局之前的值*/
            scrollHeight = scrollHeightOrg;
        }
    return scrollHeight;
}

var showMailFoldWrap = function(){
    $('mailFoldWrap').style.display = 'block';
    if(!_nTrueHeight) {
        _nTrueHeight = $('mailFoldWrap').offsetHeight;
    }
}

var foldAnimation = function(height) {
    _oDomContent = $("mail_fold_toggle");
    _oDomContainer = $("mailFoldWrap");
    if(_nTrueHeight>0){
        _nContentHeight = _nTrueHeight;
    }else{
        _nContentHeight = $("mail_fold").offsetHeight;
    }
    if (height>0){
        _nStartPoint = height;
    }else{
        _nStartPoint = _nContentHeight;
    }

    if(_nContentHeight > _nStartPoint)
        {
        _nContentHeight = _nStartPoint;
        }
    if(_bIsHide){
        //$("mailFoldSpace").style.height = '0px';
        _oDomContent.innerHTML = '隐藏引用<span class="mail_fold_toggle_open">↑</span>';
        _oDomContainer.style.height = '';
        $('mail_fold').style.display = 'block';
        //_nStartHeight = 0;
    }else{
        $("mailFoldSpace").style.height = '0px';
        _oDomContent.innerHTML = '显示引用<span class="mail_fold_toggle_close">↓</span>';
        _oDomContainer.style.height = '0';
        $('mail_fold').style.display = 'none';
        window.location.href = 'qmfoldtogglehidefinish:';
        //_nStartHeight = _nContentHeight;
    }
    _bIsHide = !_bIsHide;
}

var setupFlderToggle = function() {
    if(document.getElementById('mail_fold_toggle')){
        document.getElementById('mail_fold_toggle').addEventListener('click', function () {
                                               _nTimer && clearTimeout(_nTimer);
                                               if(_bIsHide){
                                               window.location.href = 'qmfoldtoggleshow:'+ _nTrueHeight;
                                               
                                               }else{
                                               window.location.href = 'qmfoldtogglehide:'+ _nTrueHeight;
                                               }
                                               
                                               }
                                               );
    }
}

var onDOMReady = function(){
    // registerLongPressHandler(); this is called in customDataDetectorResult
    customDataDetectorResult();   

    var mailContent = document.getElementById('mailcontent');
    if(mailcontent && mailcontent.innerHTML){
        //正文内容大于1024*1024，1m，不做changeFontSize，用原来的fontsize,太耗内存了
        if(mailcontent.innerHTML.length < 1048576) {
            changeFontSize();
        }
    }
    fixStyle();
    fixScale();
    preloadImages();
    setupFlderToggle();
    document.body.style.visibility = '';
};

document.addEventListener('DOMContentLoaded', onDOMReady, false);
