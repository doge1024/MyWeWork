var getSubject = function() {

	var titleWrapper = document.querySelector('.mh_title');
	if(titleWrapper && titleWrapper.querySelector('h3')) {
		return titleWrapper.querySelector('h3').innerHTML;
	} else {
		var contentElem = document.querySelector('#appReadPageContent');
		if(contentElem) {
			return contentElem.innerText;
		} else {
			return '';
		}
	}
}

var getFirstImage =  function() {
	var imgs = document.getElementsByTagName("img");
	if(imgs && imgs.length>0) {
		return imgs[0].src;
	}
    return "";
}


var getContent = function() {

	var contentElem = document.querySelector('#appReadPageContent');
	if(contentElem) {
		return contentElem.innerHTML;
	} else {
		return document.body.innerHTML;
	}
}

//添加用户touch事件
if(window.qmTouchHandler) {
	window.qmTouchHandler.addLongPressImageHandler();
}

