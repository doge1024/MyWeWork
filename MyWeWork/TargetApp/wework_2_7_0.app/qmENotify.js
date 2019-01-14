/**
 * created by flyhuang 
 * js通知浏览器的入口集合
 */
var __useIframe = false; // 临时解决iOS11必显crash的问题；
(function(){

var __callbacks = {};
var __iframe;

QMail.NativeNotifier = {
    validateMessages : {
        'setWebViewOffsetFromJS'       : true,
        'adjustContentSizeToFitFromJs' : true,
        'tapAudioFromJs' : true,
        'setWebViewScaleFromJS'    : true,
        'attachmentsChangedFromJs' : true,
        'domContentLoadedFromJs'   : true,
        'domSubtreeModifiedFromJs' : true,
        'longPressImageFromJs'     : true,
        'longPressViewerFromJs'    : true,
        'pasteFromJs'              : true,
        'getWebViewOffsetFromJS'   : true,
        'startEdit'                : true,
        'selectionChange'          : true,
        'ioslog'                   : true
    },
    notify: function(method, args, timeout) {

        if(this.validateMessages[method]) {
            var argsStr = [];

            for(var key in args) {
                argsStr.push(key + '=' + encodeURIComponent(args[key]));
            }

            var argsStr = method + '?' + argsStr.join('&');
            var self = this;

            timeout = typeof(timeout) === 'number' ? parseInt(timeout,10) : 0;
            //延迟处理
            if(timeout == 0) {
                this._postMessageToNative(argsStr);
            } else {
                window.setTimeout(function() {
                    self._postMessageToNative(argsStr);
                }, timeout || 0);
            }
        } else {
            QMail.Debug.warn('this notify method is not validate: ' + method);
        }
    },
    notifyWithResponse : function(method, args, callback) {

        var randomId = new Date().getTime();

        __callbacks[randomId] = callback;

        args['__callback'] = randomId;

        this.notify(method, args, 0);
    },
    excuteCallback : function(callbackId) {

        var callback = __callbacks[callbackId];

        if(typeof(callback) == 'function') {
            var params = [].slice.apply(arguments);
            callback && callback.apply(window , params.slice(1));
            delete __callbacks[callbackId];
        }
    },
    _postMessageToNative : function(url) {
        url = QMail.config.notifyName + '://' + url;
        // window.location.href = url;
        QMail.Debug.log('_postMessageToNative use iframe:' + __iframe);
        if(!__iframe && __useIframe) {
            //这里用一个隐藏的div包住所有iframe，防止添加删除时造成页面渲染
            __iframe =document.createElement("div");
            __iframe.setAttribute("hidden", true);
            document.documentElement.appendChild(__iframe);
        }
        var iframe = document.createElement("IFRAME");
        //设置width,height，否则会有闪动
        iframe.width = 0;
        iframe.height = 0;
        iframe.setAttribute("src", url);
         if(__useIframe){
            __iframe.appendChild(iframe);
            __iframe.removeChild(iframe);
         }else{
             document.documentElement.appendChild(iframe);
             iframe.parentNode.removeChild(iframe);
         }
 
        iframe = null;
    }
};

})();

