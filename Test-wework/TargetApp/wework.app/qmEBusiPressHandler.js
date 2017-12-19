 document.addEventListener('DOMSubtreeModified', modifyElement , false);

 function modifyElement() {
    document.removeEventListener('DOMSubtreeModified', modifyElement);
    var elements = document.getElementsByTagName('a');
    elements = [].slice.apply(elements);
    var calendarClickNotifyName = "calendarclick";
    for (var i =0; i < elements.length; ++i) {
        var element = elements[i];
        if (element.getAttribute("isAdd")){
            continue;
        }
        var href = element.href;
        /* url可以长按，其他不可以 */
        if (href.indexOf("x-apple-data-detectors") >= 0) {
            element.href = calendarClickNotifyName;
            element.addEventListener('click',clickItem,false);
            element.setAttribute('style', "-webkit-touch-callout:none");
        }else if (href.indexOf("mailto") >= 0 ||
            href.indexOf("tel") >= 0 ||
            href.indexOf("sms") >= 0 )
        {
            element.setAttribute('style', "-webkit-touch-callout:none");
        }
        element.setAttribute("isAdd", "1");
    }
    document.addEventListener('DOMSubtreeModified', modifyElement , false);
}

 function clickItem() {
    if (this.href.indexOf("calendarclick") >= 0) {
        var attrValue = this.getAttribute('x-apple-data-detectors-result');
        var attrType = this.getAttribute('x-apple-data-detectors-type');
        var sameElementArray = document.querySelectorAll('a[x-apple-data-detectors-result]');
        var otherElementArray = new Array();
        var str = "";
        for (var j = 0; j < sameElementArray.length; ++j) {
            var sameElement = sameElementArray[j];
            if(sameElement.getAttribute('x-apple-data-detectors-result') == attrValue && sameElement.getAttribute('x-apple-data-detectors-type') == attrType) {
                if ((sameElement + "").length == 0) {
                    /* 只有a标签，没有textcontent的element跳过 */
                    continue;
                }
                if (sameElement.textContent.length > 0) {
                    str = str + sameElement.textContent;
                    otherElementArray.push(sameElement);
                }
            }
        }
        var calendarClickNotifyName = "calendarclick:";
        for (var k = 0; k < otherElementArray.length; ++k) {
            var element = otherElementArray[k];
            element.href = calendarClickNotifyName + str;
        }
    }
}

