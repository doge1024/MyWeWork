if (document.getElementById('post-user')) {
    document.getElementById('post-user').setAttribute('class', '');
}
hideSomethingByid('js_view_source');
hideSomethingByid('copyright_info');
hideSomethingByid('copyright_logo');
hideSomethingByid('profileBt');
// 注入快文关键词订阅
initShareBar();

setTimeout(function () {
           hideSomethingByid('js_report_article3');
           }, 2000);

function hideSomethingByid(ele) {
    var dom = document.getElementById(ele);
    if (dom) {
        document.getElementById(ele).style.display = 'none';
    }
}

function initShareBar() {
    var creatorId = getUrlParam('creatorid') || getCookie('wwapp.link') && getUrlParam('creatorid', getCookie('wwapp.link')) || 0;
    
    var keyword = getUrlParam('keywords') || '';
    var userVid = getCookie('wwapp.vid') || localStorage.getItem('wwapp.vid') || 0;
    if (keyword && creatorId != userVid) {
        keyword = filterScript(decodeURIComponent(keyword));
        var activityBody = document.getElementById('activity-detail');
        var html = '<div style="position:fixed;bottom:0;left:0;width:100%;height:54px;line-height:54px;font-size:16px;color: #2D3034;text-align: left;border:1px solid #efefef;background: #fff;font-family: BlinkMacSystemFont, Helvetica, lucida Grande, PingFang SC, SCHeiti, Microsoft YaHei;"><span style="font-size:16px;color:#A2A2A4;padding-left:18px;">快文关键词：</span><span id="industry-keyword">' + keyword + '</span><a href="https://app.work.weixin.qq.com/wework_admin/industry_news?keyword=' + keyword + '" style="position:absolute;right:18px;top:12px;display:inline-block;height:32px;padding:0 12px;line-height:32px;background:#0082EF;border-radius: 3px;font-size: 14px;color: #FFFFFF;text-align:center;">我要订阅</a></div>';
        
        if (activityBody) {
            activityBody.insertAdjacentHTML('afterend', html);
        }
    }
}

if (window.wx && wx) {
    wx.onMenuShareAppMessage({
                             title: document.getElementById('activity-name') && document.getElementById('activity-name').innerText, // 分享标题
                             desc: document.getElementById('js_content') && document.getElementById('js_content').innerText.replace(/\n+/g, ' '), // 分享描述
                             link: location.href, // 分享链接
                             imgUrl: document.getElementsByTagName('img').length && document.getElementsByTagName('img')[1].getAttribute('data-src') || 'https://mmbiz.qpic.cn/mmbiz_jpg/UK5sWvrSqIVMicIwoyb5q4ayiaxCDibrcO4a3Ph6ohkjd3kAumZTBl1ic4o11shJHbLnwxE2nwNVYGyQRmvoklsjOQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1', // 分享图标
                             success: function () {
                             // 用户确认分享后执行的回调函数
                             },
                             cancel: function () {
                             // 用户取消分享后执行的回调函数
                             }
                             });
}

function filterScript(str) {
    str = str || '';
    str = str.replace(/<.*>/g, ''); // 过滤标签注入
    str = str.replace(/(java|vb|action)script/gi, ''); // 过滤脚本注入
    str = str.replace(/[\"\'][\s ]*([^=\"\'\s ]+[\s ]*=[\s ]*[\"\']?[^\"\']+[\"\']?)+/gi, ''); // 过滤HTML属性注入
                        return str;
                        }
                        
                        function getUrlParam(name, link) {
                        var url = link || location.href;
                        var theRequest = {};
                        if (url.indexOf('?') != -1) {
                        var str = url.split('?')[1];
                        var strs = str.split('&');
                        var i;
                        for (i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
                        }
                        }
                        return theRequest[name];
                        }
                        
                        function getCookie(name) {
                        var re = new RegExp('(?:^|;+|\\s+)' + name + '=([^;]*)');
                        var result = document.cookie.match(re);
                        
                        return (!result ? '' : result[1]);
                        }
