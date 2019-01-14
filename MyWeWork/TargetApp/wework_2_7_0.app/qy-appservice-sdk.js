/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(1);

	var _qyInterface = __webpack_require__(5);

	var _qyInterface2 = _interopRequireDefault(_qyInterface);

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _Utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_qyInterface2.default.canIUse = _index.canIUse;
	_qyInterface2.default.version = {
	    updateTime: "2018.11.06 16:00:00",
	    info: "",
	    version: _config2.default.SDKVersion
	};
	_qyInterface2.default.isWxLoginSupport = true;

	if ((0, _Utils.getPlatform)() != 'android') {
	    delete _qyInterface2.default.getNFCReaderState;
	    delete _qyInterface2.default.startNFCReader;
	    delete _qyInterface2.default.stopNFCReader;
	}

	wx.qy = _qyInterface2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.canIUse = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _api = __webpack_require__(2);

	var _api2 = _interopRequireDefault(_api);

	var _Utils = __webpack_require__(3);

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var keysOfAPI = Object.keys(_api2.default);

	/*
	 * 从 obj 中找出符合条件的 version 列表
	 */
	var getValidVersions = function getValidVersions(SDKVersion, name, obj) {
	  if (!name) {
	    return [];
	  }

	  var keys = Object.keys(obj);
	  var index = keys.indexOf(name);

	  if (index === -1) {
	    return [];
	  } else {
	    var item = obj[keys[index]];

	    var validVersions = Object.keys(item).filter(function (currentVersion) {
	      return (0, _Utils.compareVersion)(currentVersion, SDKVersion) <= 0 && comparePlatForm(item[currentVersion]);
	    });

	    return validVersions;
	  }
	};

	var comparePlatForm = function comparePlatForm() {
	  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	  var platform = (0, _Utils.getPlatform)();
	  var result = true;

	  for (var i = 0; i < config.length; i++) {
	    if (config[i].platform) {
	      result = config[i].platform.indexOf(platform) > -1;
	    }
	  }

	  return result;
	};

	// 指定合法版本号，从列表返回符合条件的子项目
	var getValidItemsWithSpecificVersions = function getValidItemsWithSpecificVersions(validVersions, list, key) {
	  var ret = undefined;
	  for (var i = 0; i < validVersions.length; i++) {
	    var currentVersion = list[validVersions[i]];

	    for (var j = 0; j < currentVersion.length; j++) {
	      var currentProperty = currentVersion[j];

	      if (typeof currentProperty === 'string' && currentProperty === key) {
	        if (ret === undefined) {
	          ret = [];
	        }
	        break;
	      } else if ((typeof currentProperty === 'undefined' ? 'undefined' : _typeof(currentProperty)) === 'object' && currentProperty.hasOwnProperty(key)) {
	        if (typeof ret === 'undefined') {
	          ret = currentProperty[key];
	        } else {
	          ret = ret.concat(currentProperty[key]);
	        }
	        break;
	      }
	    }
	  }

	  return ret;
	};

	/*
	 * 从 list 中找到一个 key 是否存在，数组的每一项是一个字符串或一个 Object，并返回其值
	 *
	 *"list": [
	 *  "duration",
	 *  {
	 *    "timingFunction": [
	 *      "linear",
	 *      "ease",
	 *      "ease-in",
	 *      "ease-in-out",
	 *      "ease-out",
	 *      "step-start",
	 *      "step-end"
	 *    ]
	 *  },
	 *  "delay",
	 *  "transformOrigin"
	 *]
	 */
	var getValidItem = function getValidItem(list, key) {
	  for (var i = 0; i < list.length; i++) {
	    if (typeof list[i] === 'string' && list[i] === key) {
	      return [];
	    } else if (_typeof(list[i]) === 'object' && list[i].hasOwnProperty(key)) {
	      return list[i][key];
	    }
	  }
	  return undefined;
	};

	// 返回一个组件支持的某个属性
	var getValidProperty = function getValidProperty(validVersions, component, property) {
	  return getValidItemsWithSpecificVersions(validVersions, component, property);
	};

	// 返回一个接口支持的参数
	var getValidArg = function getValidArg(validVersions, API, arg) {
	  return getValidItemsWithSpecificVersions(validVersions, API, arg);
	};

	var checkAPIs = function checkAPIs(SDKVersion, name, arg, property, value) {
	  var validVersions = void 0;
	  var validArgs = void 0;
	  var validProperties = void 0;
	  var validValues = void 0;

	  validVersions = getValidVersions(SDKVersion, name, _api2.default);
	  if (validVersions.length === 0) {
	    return false;
	  }

	  // 有 arg，检查 arg
	  if (arg) {
	    var API = _api2.default[name];
	    validArgs = getValidArg(validVersions, API, arg);
	    if (typeof validArgs === 'undefined') {
	      return false;
	    }
	  }

	  // 有 property，检查 property
	  if (property) {
	    validProperties = getValidItem(validArgs, property);
	    if (typeof validProperties === 'undefined') {
	      return false;
	    }
	  }

	  // 有 value，检查 value
	  if (value) {
	    validValues = getValidItem(validProperties, value);
	    if (typeof validValues === 'undefined') {
	      return false;
	    }
	  }

	  return true;
	};

	var canIUse = function canIUse() {
	  var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var customVersion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config2.default.SDKVersion;

	  if (typeof schema !== 'string') {
	    throw new _Utils.AppServiceSdkKnownError('canIUse: schema should be an object');
	  }

	  var parts = schema.split('.');

	  if (checkAPIs.apply(undefined, [customVersion].concat(_toConsumableArray(parts)))) {
	    return true;
	  }

	  return false;
	};

	exports.canIUse = canIUse;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = { "login": { "1.0.0": [{ "success": ["code"] }] }, "wwReport": { "1.0.0": [{ "object": ["logId", "key", "value"] }] }, "chooseWxworkContact": { "1.0.0": [{ "object": ["selected_vid", "type", "max_num"] }, { "success": ["type", "contacts"] }] }, "showUserProfile": { "1.0.0": [{ "object": ["vid"] }] }, "getEnterpriseUserInfo": { "1.0.0": [{ "object": ["timeout"] }, { "success": ["userInfo", "rawData", "signature", "encryptedData", "iv"] }] }, "getAvatar": { "1.0.0": [{ "object": ["timeout"] }, { "success": ["avatar"] }] }, "getCorpList": { "1.0.0": [{ "success": ["infos"] }] }, "getDepartmentList": { "1.0.0": [{ "success": ["data"] }] }, "getDepartmentUserList": { "1.0.0": [{ "success": ["data"] }] }, "postNotification": { "1.0.0": [{ "object": ["name", "data"] }] }, "wwLog": { "1.0.0": [{ "object": ["level", "message"] }] }, "selectConvAndAction": { "1.0.0": [{ "object": ["actionType", "forbidCreateNew", "forbidSingleConv", "WeworkWelcomeHongbaoId", "WeworkWelcomeHongbaoWish"] }] }, "sendMessageToWX": { "1.0.0": [{ "object": ["text", "scene", "title", "description", "thumbImage", "media_message"] }] }, "chooseWxworkVisibleRange": { "1.0.0": [{ "object": ["range"] }] }, "wwOpenUrlScheme": { "1.0.0": [{ "object": ["urlScheme"] }] }, "getQrCode": { "1.0.0": [{ "object": ["timeout"] }, { "success": ["qrCode"] }] }, "getMobile": { "1.0.0": [{ "object": ["timeout"] }, { "success": ["encryptedData", "iv"] }] }, "getEmail": { "1.0.0": [{ "object": ["timeout"] }, { "success": ["encryptedData", "iv"] }] }, "selectEnterpriseContact": { "1.0.0": [{ "object": ["fromDepartmentId", "mode", "type", "selectedDepartmentIds", "selectedUserIds"] }, { "success": ["departmentList", "userList"] }] }, "openEnterpriseChat": { "1.0.0": [{ "object": ["useridlist", "userIds", "chatname", "groupName", "openIds", "externalUserIds"] }] }, "selectExternalContact": { "1.0.0": [{ "object": ["filterType"] }, { "success": ["userIds"] }] }, "openUserProfile": { "1.0.0": [{ "object": ["type", "userid"] }] }, "sendMessageToConv": { "1.0.0": [{ "object": ["imageUrl", "title", "path"] }] }, "updateForwardButton": { "1.0.0": [{ "object": ["enable"] }] }, "checkAppShareMessageEnable": { "1.0.0": [{ "object": ["title", "path"] }] }, "checkSession": { "1.0.0": [] }, "authorize": { "1.0.0": [{ "object": ["scope"] }] }, "getUserInfo": { "1.0.0": [{ "success": ["userInfo", "rawData", "signature", "encryptedData", "iv"] }, { "object": ["withCredentials", "lang", "timeout"] }] }, "openWechatMiniProgram": { "1.0.0": [{ "object": ["userName", "path", "type"] }] }, "getCurExternalContact": { "1.0.0": [{ "success": ["userId"] }] }, "getSetting": { "1.0.0": [{ "success": ["authSetting"] }] }, "getSystemInfo": { "1.0.0": [{ "success": ["version"] }] }, "bioassayAuthentication": { "1.0.0": [{ "success": ["code"], "object": ["name", "idcard"] }] }, "chooseAttach": { "1.0.0": [{ "success": ["tempFilePaths"], "object": ["count", "sizeType", "sourceType", "tempFiles"] }] }, "requestPayment": { "1.0.0": [{ "object": ["timeStamp", "nonceStr", "package", "signType", "paySign"] }] }, "shareAppMessageEx": { "1.0.0": [{ "object": ["title", "imageUrl", "path", "selectedUserIds", "selectedExternalUserIds"] }] }, "idcardVerify": { "1.0.0": [{ "object": ["name", "idcard"] }] }, "getNFCReaderState": { "1.0.0": [{ "platform": ["android"] }] }, "stopNFCReader": { "1.1.0": [{ "platform": ["android"] }] }, "startNFCReader": { "1.1.0": [{ "platform": ["android"] }] }, "onNFCReadMessage": { "1.1.0": [{ "callback": ["messageType", "data"] }, { "platform": ["android"] }] }, "queryCurrHWOpenTalk": { "1.2.0": [] }, "enterHWOpenTalk": { "1.2.0": [{ "object": ["code", "ticket"] }] }, "openEnterpriseContact": { "1.2.0": [{ "object": ["departmentId"] }] }, "startWecast": { "1.2.0": [{}] } };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.surroundByTryCatchFactory = surroundByTryCatchFactory;
	exports.getDataType = getDataType;
	exports.isObject = isObject;
	exports.paramCheck = paramCheck;
	exports.getRealRoute = getRealRoute;
	exports.getPlatform = getPlatform;
	exports.urlEncodeFormData = urlEncodeFormData;
	exports.addQueryStringToUrl = addQueryStringToUrl;
	exports.validateUrl = validateUrl;
	exports.assign = assign;
	exports.encodeUrlQuery = encodeUrlQuery;
	exports.transWxmlToHtml = transWxmlToHtml;
	exports.removeHtmlSuffixFromUrl = removeHtmlSuffixFromUrl;
	exports.extend = extend;
	exports.arrayBufferToBase64 = arrayBufferToBase64;
	exports.base64ToArrayBuffer = base64ToArrayBuffer;
	exports.blobToArrayBuffer = blobToArrayBuffer;
	exports.convertObjectValueToString = convertObjectValueToString;
	exports.guid = guid;
	exports.checkClientVersion = checkClientVersion;
	exports.renameProperty = renameProperty;
	exports.compareVersion = compareVersion;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function surroundByTryCatchFactory(fn, extend) {
	  // if (getPlatform() === 'devtools') {
	  //   return fn
	  // }

	  // 测试时不能把异常捕获，不然测试框架无法抛出正确的异常信息
	  if (__wxConfig.karmaTest === true) {
	    return fn;
	  }
	  return function () {
	    try {
	      return fn.apply(fn, arguments);
	    } catch (e) {
	      if (Object.prototype.toString.apply(e) === "[object Error]") {
	        if (e.type == "AppServiceSdkKnownError") {
	          //已知错误，不上报，直接往上层抛
	          throw e;
	        } else {
	          Reporter.errorReport({
	            key: "appServiceSDKScriptError",
	            error: e,
	            extend: extend
	          });
	        }
	      }
	    }
	  };
	}

	function _anyTypeToString(data) {
	  var dataType = Object.prototype.toString.call(data).split(' ')[1].split(']')[0];
	  if (dataType == 'Array' || dataType == 'Object') {
	    try {
	      data = JSON.stringify(data);
	    } catch (e) {
	      e.type = 'AppServiceSdkKnownError';
	      throw e;
	    }
	  } else if (dataType == 'String' || dataType == 'Number' || dataType == 'Boolean') {
	    data = data.toString();
	  } else if (dataType == 'Date') {
	    data = data.getTime().toString();
	  } else if (dataType == 'Undefined') {
	    data = 'undefined';
	  } else if (dataType == 'Null') {
	    data = 'null';
	  } else {
	    data = '';
	  }
	  return { data: data, dataType: dataType };
	}

	var anyTypeToString = exports.anyTypeToString = surroundByTryCatchFactory(_anyTypeToString, 'anyTypeToString');

	function _stringToAnyType(data, dataType) {
	  if (dataType == 'String') {
	    data = data;
	  } else if (dataType == 'Array' || dataType == 'Object') {
	    data = JSON.parse(data);
	  } else if (dataType == 'Number') {
	    data = parseFloat(data);
	  } else if (dataType == 'Boolean') {
	    data = data == 'true';
	  } else if (dataType == 'Date') {
	    data = new Date(parseInt(data));
	  } else if (dataType == 'Undefined') {
	    data = undefined;
	  } else if (dataType == 'Null') {
	    data = null;
	  } else {
	    data = '';
	  }
	  return data;
	}

	var stringToAnyType = exports.stringToAnyType = surroundByTryCatchFactory(_stringToAnyType, 'stringToAnyType');

	function getDataType(data) {
	  return Object.prototype.toString.call(data).split(' ')[1].split(']')[0];
	}

	function isObject(object) {
	  return getDataType(object) === 'Object';
	}

	/**
	必填参数的类型校验
	*/
	function paramCheck(value, expect) {
	  var dept = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "parameter";

	  var type = getDataType(expect);
	  var valueType = getDataType(value);
	  if (valueType != type) {
	    return dept + " should be " + type + " instead of " + valueType + ";";
	  }
	  result = "";
	  switch (type) {
	    case "Object":
	      for (var key in expect) {
	        result += paramCheck(value[key], expect[key], dept + "." + key);
	      }
	      break;
	    case "Array":
	      if (value.length < expect.length) {
	        return dept + " should have at least " + expect.length + " item;";
	      }
	      for (var i = 0; i < expect.length; ++i) {
	        result += paramCheck(value[i], expect[i], dept + "[" + i + "]");
	      }
	      break;
	    default:
	      break;
	  }
	  return result;
	}

	function getRealRoute(lastRoute, relativeRoute) {
	  var needTrans = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	  //console.log('relativeRoute', relativeRoute)
	  if (needTrans) {
	    relativeRoute = transWxmlToHtml(relativeRoute);
	  }

	  if (relativeRoute.indexOf('/') === 0) {
	    // 如果相对路径是 / 开头，则直接返回
	    return relativeRoute.substr(1);
	  } else if (relativeRoute.indexOf('./') === 0) {
	    // 如果是以 ./ 开头，则把 ./ 去掉
	    return getRealRoute(lastRoute, relativeRoute.substr(2), false);
	  } else {
	    // 计算具体路径
	    var relativeRouteParts = relativeRoute.split('/');
	    var i, len;
	    for (i = 0, len = relativeRouteParts.length; i < len; i++) {
	      if (relativeRouteParts[i] !== '..') {
	        break;
	      }
	    }
	    relativeRouteParts.splice(0, i);
	    var relativeRoute = relativeRouteParts.join('/');

	    var lastRouteParts = lastRoute.length > 0 ? lastRoute.split('/') : [];
	    lastRouteParts.splice(lastRouteParts.length - i - 1, i + 1);

	    var finalRouteParts = lastRouteParts.concat(relativeRouteParts);
	    var finalRoute = finalRouteParts.join('/');

	    return finalRoute;
	  }
	}

	function getPlatform() {
	  if (typeof window !== 'undefined' && window.navigator) {
	    // 有 UA ，可能是 devtools 或旧的 Android
	    if (window.navigator.userAgent.indexOf('appservice') > -1) {
	      return 'devtools';
	    } else if (window.navigator.userAgent.toLowerCase().indexOf('android') > -1) {
	      return 'android';
	    } else {
	      return '';
	    }
	  } else {
	    // 没有 UA ，可能是 iOS 或新的 Android
	    if (__wxConfig.platform === 'android') {
	      return 'android';
	    } else if (__wxConfig.platform === 'devtools') {
	      return 'devtools';
	    } else {
	      return 'ios';
	    }
	  }
	}

	function urlEncodeFormData(data) {
	  var needEncode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  if ((typeof data === "undefined" ? "undefined" : _typeof(data)) !== 'object') {
	    return data;
	  }
	  var dataArray = [];

	  for (var k in data) {
	    if (data.hasOwnProperty(k)) {
	      if (needEncode) {
	        try {
	          dataArray.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k]));
	        } catch (e) {
	          dataArray.push(k + "=" + data[k]);
	        }
	      } else {
	        dataArray.push(k + "=" + data[k]);
	      }
	    }
	  }
	  return dataArray.join('&');
	}

	function addQueryStringToUrl(url, data) {
	  if (typeof url === 'string' && (typeof data === "undefined" ? "undefined" : _typeof(data)) === 'object' && Object.keys(data).length > 0) {
	    var parts = url.split('?');
	    var path = parts[0];
	    var query = (parts[1] || '').split('&').reduce(function (pre, cur) {
	      if (typeof cur === 'string' && cur.length > 0) {
	        var _parts = cur.split('=');
	        var key = _parts[0];
	        var value = _parts[1];
	        pre[key] = value;
	      }
	      return pre;
	    }, {});

	    // 把 data 中的数据 encodeURIComponent
	    var encodedData = Object.keys(data).reduce(function (ret, key) {
	      if (_typeof(data[key]) === 'object') {
	        ret[encodeURIComponent(key)] = encodeURIComponent(JSON.stringify(data[key]));
	      } else {
	        ret[encodeURIComponent(key)] = encodeURIComponent(data[key]);
	      }
	      return ret;
	    }, {});

	    return path + '?' + urlEncodeFormData(assign(query, encodedData));
	  } else {
	    return url;
	  }
	}

	function validateUrl(url) {
	  return (/^(http|https):\/\/.*/i.test(url)
	  );
	}

	function assign() {
	  for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
	    objects[_key] = arguments[_key];
	  }

	  return objects.reduce(function (pre, cur) {
	    for (var key in cur) {
	      pre[key] = cur[key];
	    }
	    return pre;
	  }, {});
	}

	function encodeUrlQuery(url) {
	  if (typeof url === 'string') {
	    var parts = url.split('?');
	    var path = parts[0];
	    var query = (parts[1] || '').split('&').reduce(function (pre, cur) {
	      if (typeof cur === 'string' && cur.length > 0) {
	        var _parts2 = cur.split('=');
	        var key = _parts2[0];
	        var value = _parts2[1];
	        pre[key] = value;
	      }
	      return pre;
	    }, {});
	    var queryArray = [];
	    for (var k in query) {
	      if (query.hasOwnProperty(k)) {
	        queryArray.push(k + "=" + encodeURIComponent(query[k]));
	      }
	    }
	    if (queryArray.length > 0) {
	      return path + "?" + queryArray.join('&');
	    } else {
	      return url;
	    }
	  } else {
	    return url;
	  }
	}

	function transWxmlToHtml(url) {
	  if (typeof url !== 'string') {
	    return url;
	    //throw new AppServiceSdkKnownError('invalid url:' + url)
	  } else {
	    var path = url.split('?')[0];
	    var query = url.split('?')[1];

	    //if (path.lastIndexOf('wxml') === path.length - 4) {
	    //path = path.substring(0, path.length - 4) + 'html'
	    //}

	    // 调用时不写后缀名，直接在后面加 .html 后缀
	    path += '.html';
	    if (typeof query !== 'undefined') {
	      return path + "?" + query;
	    } else {
	      return path;
	    }
	  }
	}

	function removeHtmlSuffixFromUrl(url) {
	  if (typeof url === 'string') {
	    if (url.indexOf('?') !== -1) {
	      return url.replace(/\.html\?/, '?');
	    } else {
	      return url.replace(/\.html$/, '');
	    }
	  } else {
	    return url;
	  }
	}

	//AppServiceSdk 已知错误类型

	var AppServiceSdkKnownError = exports.AppServiceSdkKnownError = function (_Error) {
	  _inherits(AppServiceSdkKnownError, _Error);

	  function AppServiceSdkKnownError(msg) {
	    _classCallCheck(this, AppServiceSdkKnownError);

	    var _this = _possibleConstructorReturn(this, (AppServiceSdkKnownError.__proto__ || Object.getPrototypeOf(AppServiceSdkKnownError)).call(this, "APP-SERVICE-SDK:" + msg));

	    _this.type = "AppServiceSdkKnownError";
	    return _this;
	  }

	  return AppServiceSdkKnownError;
	}(Error);

	function extend(to, from) {
	  for (var key in from) {
	    to[key] = from[key];
	  }
	  return to;
	}

	// src: https://github.com/davidchambers/Base64.js/blob/master/base64.js
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var btoa = btoa || function (input) {
	  var str = String(input);
	  var output = '';
	  for (var block, charCode, idx = 0, map = chars; str.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new Error('"btoa" failed');
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	};
	var atob = atob || function (input) {
	  var str = String(input).replace(/=+$/, '');
	  var output = '';
	  if (str.length % 4 === 1) {
	    throw new Error('"atob" failed');
	  }
	  for (var bc = 0, bs, buffer, idx = 0; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
	    buffer = chars.indexOf(buffer);
	  }
	  return output;
	};

	function arrayBufferToBase64(buffer) {
	  var binaryString = '';
	  var bytes = new Uint8Array(buffer);
	  var len = bytes.byteLength;
	  for (var i = 0; i < len; i++) {
	    binaryString += String.fromCharCode(bytes[i]);
	  }
	  return btoa(binaryString);
	}

	function base64ToArrayBuffer(base64) {
	  var binaryString = atob(base64);
	  var len = binaryString.length;
	  var bytes = new Uint8Array(len);
	  for (var i = 0; i < len; i++) {
	    bytes[i] = binaryString.charCodeAt(i);
	  }
	  return bytes.buffer;
	}

	// 这个接口不应该在 iOS 被调用，iOS JSCore 没有 Blob 和 FileReader
	function blobToArrayBuffer(blob, callback) {
	  var fileReader = new FileReader();
	  fileReader.onload = function () {
	    callback(this.result);
	  };
	  fileReader.readAsArrayBuffer(blob);
	}

	// 把一个 Object 中的 value 都转换成 String 类型
	function convertObjectValueToString(object) {
	  return Object.keys(object).reduce(function (ret, key) {
	    if (typeof object[key] === 'string') {
	      ret[key] = object[key];
	    } else if (typeof object[key] === 'number') {
	      ret[key] = object[key] + '';
	    } else {
	      ret[key] = Object.prototype.toString.apply(object[key]);
	    }
	    return ret;
	  }, {});
	}
	function guid() {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	    var r = Math.random() * 16 | 0,
	        v = c == 'x' ? r : r & 0x3 | 0x8;
	    return v.toString(16);
	  });
	}

	var clientVersion = __wxConfig.clientVersion || 1;

	//检查是否大于某个版本，输入参数是上一个发布版本
	function checkClientVersion(ios, android) {
	  var platform = getPlatform();
	  switch (platform) {
	    case 'devtools':
	      {
	        return true;
	      }
	    case 'ios':
	      {
	        return clientVersion > ios;
	      }
	    case 'android':
	      {
	        return clientVersion > android;
	      }
	  }
	  return false;
	}

	function renameProperty(object, oldName, newName) {
	  if (isObject(object) === false || oldName == newName) {
	    return;
	  }
	  if (object.hasOwnProperty(oldName)) {
	    object[newName] = object[oldName];
	    delete object[oldName];
	  }
	}

	function compareVersion(v1, v2) {
	  v1 = v1.split('.');
	  v2 = v2.split('.');
	  var len = Math.max(v1.length, v2.length);

	  while (v1.length < len) {
	    v1.push('0');
	  }
	  while (v2.length < len) {
	    v2.push('0');
	  }

	  for (var i = 0; i < len; i++) {
	    var num1 = parseInt(v1[i]);
	    var num2 = parseInt(v2[i]);

	    if (num1 > num2) {
	      return 1;
	    } else if (num1 < num2) {
	      return -1;
	    }
	  }

	  return 0;
	}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  "SDKVersion": "1.2.0"
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseMethods = __webpack_require__(6);

	var login = function login() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__login', args, {});
	};

	var wwReport = function wwReport() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__wwReport', args, {});
	};

	var chooseWxworkContact = function chooseWxworkContact() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__chooseWxworkContact', args, {});
	};

	var showUserProfile = function showUserProfile() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__showUserProfile', args, {});
	};

	var getCorpList = function getCorpList() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__getCorpList', args, {});
	};

	var getDepartmentList = function getDepartmentList() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__getDepartmentList', args, {});
	};

	var getDepartmentUserList = function getDepartmentUserList() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__getDepartmentUserList', args, {});
	};

	var postNotification = function postNotification() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__postNotification', args, {});
	};

	var wwLog = function wwLog() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__wwLog', args, {});
	};

	var selectConvAndAction = function selectConvAndAction() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__selectConvAndAction', args, {});
	};

	var sendMessageToWX = function sendMessageToWX() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__sendMessageToWX', args, {});
	};

	var chooseWxworkVisibleRange = function chooseWxworkVisibleRange() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__chooseWxworkVisibleRange', args, {});
	};

	var wwOpenUrlScheme = function wwOpenUrlScheme() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__wwOpenUrlScheme', args, {});
	};

	var openEnterpriseChat = function openEnterpriseChat() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__openEnterpriseChat', args, {});
	};

	var selectEnterpriseContact = function selectEnterpriseContact() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__selectEnterpriseContact', args, {});
	};

	var selectExternalContact = function selectExternalContact() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__selectExternalContact', args, {});
	};

	var openUserProfile = function openUserProfile() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__openUserProfile', args, {});
	};

	var getEnterpriseUserInfo = function getEnterpriseUserInfo() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__getEnterpriseUserInfo', args, {});
	};

	var getMobile = function getMobile() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__getMobile', args, {});
	};

	var getEmail = function getEmail() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__getEmail', args, {});
	};

	var getAvatar = function getAvatar() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__getAvatar', args, {});
	};

	var getQrCode = function getQrCode() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__getQrCode', args, {});
	};

	var sendMessageToConv = function sendMessageToConv() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__sendMessageToConv', args, {});
	};

	var updateForwardButton = function updateForwardButton() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__updateForwardButton', args, {});
	};

	var checkAppShareMessageEnable = function checkAppShareMessageEnable() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__checkAppShareMessageEnable', args, {});
	};

	var checkSession = function checkSession() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__checkSession', args, {});
	};

	var authorize = function authorize() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__authorize', args, {});
	};

	var getUserInfo = function getUserInfo() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__getUserInfo', args, {});
	};

	var openWechatMiniProgram = function openWechatMiniProgram() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__openWechatMiniProgram', args, {});
	};

	var getCurExternalContact = function getCurExternalContact() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__getCurExternalContact', args, {});
	};

	var getSetting = function getSetting() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__getSetting', args, {});
	};

	var getSystemInfo = function getSystemInfo() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__getSystemInfo', args, {});
	};

	var bioassayAuthentication = function bioassayAuthentication() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__bioassayAuthentication', args, {});
	};

	var chooseAttach = function chooseAttach() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__chooseAttach', args, {});
	};

	var requestPayment = function requestPayment() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__requestPayment', args, {});
	};

	var shareAppMessageEx = function shareAppMessageEx() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__shareAppMessageEx', args, {});
	};

	var idcardVerify = function idcardVerify() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__idcardVerify', args, {});
	};

	var openEnterpriseContact = function openEnterpriseContact() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__openEnterpriseContact', args, {});
	};

	var chooseInvoice = function chooseInvoice() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__chooseInvoice', args, {});
	};

	var getNFCReaderState = function getNFCReaderState() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__getNFCReaderState', args, {});
	};

	var startNFCReader = function startNFCReader() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__startNFCReader', args, {});
	};

	var stopNFCReader = function stopNFCReader() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__stopNFCReader', args, {});
	};

	var queryCurrHWOpenTalk = function queryCurrHWOpenTalk() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__queryCurrHWOpenTalk', args, {});
	};

	var enterHWOpenTalk = function enterHWOpenTalk() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__enterHWOpenTalk', args, {});
	};

	var startWecast = function startWecast() {
	  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _BaseMethods.invokeMethod)('qy__startWecast', args, {});
	};

	exports.default = {
	  login: login,
	  wwLog: wwLog,
	  wwReport: wwReport,
	  getMobile: getMobile,
	  getEmail: getEmail,
	  getQrCode: getQrCode,
	  getAvatar: getAvatar,
	  authorize: authorize,
	  getUserInfo: getUserInfo,
	  checkSession: checkSession,
	  getCorpList: getCorpList,
	  getSetting: getSetting,
	  chooseAttach: chooseAttach,
	  getSystemInfo: getSystemInfo,
	  updateForwardButton: updateForwardButton,
	  sendMessageToConv: sendMessageToConv,
	  openUserProfile: openUserProfile,
	  wwOpenUrlScheme: wwOpenUrlScheme,
	  sendMessageToWX: sendMessageToWX,
	  showUserProfile: showUserProfile,
	  postNotification: postNotification,
	  getEnterpriseUserInfo: getEnterpriseUserInfo,
	  selectExternalContact: selectExternalContact,
	  chooseWxworkContact: chooseWxworkContact,
	  getDepartmentList: getDepartmentList,
	  openEnterpriseChat: openEnterpriseChat,
	  selectConvAndAction: selectConvAndAction,
	  selectEnterpriseContact: selectEnterpriseContact,
	  getDepartmentUserList: getDepartmentUserList,
	  getCurExternalContact: getCurExternalContact,
	  openWechatMiniProgram: openWechatMiniProgram,
	  chooseWxworkVisibleRange: chooseWxworkVisibleRange,
	  checkAppShareMessageEnable: checkAppShareMessageEnable,
	  bioassayAuthentication: bioassayAuthentication,
	  requestPayment: requestPayment,
	  shareAppMessageEx: shareAppMessageEx,
	  idcardVerify: idcardVerify,
	  openEnterpriseContact: openEnterpriseContact,
	  // chooseInvoice,
	  getNFCReaderState: getNFCReaderState,
	  startNFCReader: startNFCReader,
	  stopNFCReader: stopNFCReader,
	  enterHWOpenTalk: enterHWOpenTalk,
	  queryCurrHWOpenTalk: queryCurrHWOpenTalk,
	  startWecast: startWecast
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.invoke = invoke;
	exports.on = on;
	exports.publish = publish;
	exports.subscribe = subscribe;
	exports.invokeMethod = invokeMethod;
	exports.onMethod = onMethod;
	exports.noop = noop;
	exports.beforeInvoke = beforeInvoke;
	exports.beforeInvokeFail = beforeInvokeFail;
	exports.checkUrlInConfig = checkUrlInConfig;

	var _Utils = __webpack_require__(3);

	function invoke(name, args, callback) {
	  WeixinJSBridge.invoke.apply(WeixinJSBridge, arguments);
	}

	function on() {
	  WeixinJSBridge.on.apply(WeixinJSBridge, arguments);
	}

	function publish() {
	  //eventName,data,webviewIds
	  var args = Array.prototype.slice.call(arguments);
	  args[1] = {
	    data: args[1],
	    options: {
	      timestamp: Date.now()
	    }
	  };
	  WeixinJSBridge.publish.apply(WeixinJSBridge, args);
	}

	function subscribe() {
	  //eventName callback
	  var args = Array.prototype.slice.call(arguments);
	  var callback = args[1];
	  args[1] = function (_ref, webviewIds) {
	    var data = _ref.data,
	        options = _ref.options;
	    var ext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    var startTime = options && options.timestamp || 0;
	    var endTime = Date.now();
	    if (typeof callback == "function") {
	      callback(data, webviewIds);
	    }

	    /* Reporter.speedReport({
	      key : 'webview2AppService',
	      data : data || {} ,
	      timeMark : {
	        startTime : startTime,
	        endTime : endTime,
	        nativeTime : ext.nativeTime || 0
	      }
	    })*/
	  };
	  WeixinJSBridge.subscribe.apply(WeixinJSBridge, args);
	}

	function invokeMethod(name) {
	  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var _ext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  // 复制一个 args，不修改传入的 args
	  args = (0, _Utils.assign)({}, args);

	  var callbacks = {};
	  for (var key in args) {
	    if (typeof args[key] === 'function') {
	      // 测试时不能把异常捕获，不然测试框架无法抛出正确的异常信息
	      if (__wxConfig.karmaTest === true) {
	        callbacks[key] = args[key];
	      } else {
	        // callbacks[key] = Reporter.surroundThirdByTryCatch(args[key], `at api ${name} ${key} callback function`)
	        callbacks[key] = args[key];
	      }
	      delete args[key];
	    }
	  }

	  var ext = {};
	  for (var _key in _ext) {
	    if (typeof _ext[_key] === 'function') {
	      ext[_key] = (0, _Utils.surroundByTryCatchFactory)(_ext[_key], 'at api ' + name + ' ' + _key + ' callback function');
	    }
	  }

	  invoke(name, args, function (res) {
	    res.errMsg = res.errMsg || name + ':ok';

	    res.errMsg = res.errMsg.replace('__', '.');
	    name = name.replace('__', '.');

	    console.log('invoke result:%s,%s', name, res.errMsg);

	    var success = res.errMsg.indexOf(name + ':ok') === 0;
	    var cancel = res.errMsg.indexOf(name + ':cancel') === 0;
	    var fail = res.errMsg.indexOf(name + ':fail') === 0;

	    typeof ext.beforeAll === 'function' && ext.beforeAll(res);
	    if (success) {
	      typeof ext.beforeSuccess === 'function' && ext.beforeSuccess(res);
	      typeof callbacks.success === 'function' && callbacks.success(res);
	      typeof ext.afterSuccess === 'function' && ext.afterSuccess(res);
	    } else if (cancel) {
	      res.errMsg = res.errMsg.replace(name + ':cancel', name + ':fail cancel');
	      typeof callbacks.fail === 'function' && callbacks.fail(res);

	      typeof ext.beforeCancel === 'function' && ext.beforeCancel(res);
	      typeof callbacks.cancel === 'function' && callbacks.cancel(res);
	      typeof ext.afterCancel === 'function' && ext.afterCancel(res);
	    } else if (fail) {
	      typeof ext.beforeFail === 'function' && ext.beforeFail(res);
	      typeof callbacks.fail === 'function' && callbacks.fail(res);

	      var reportFail = true;
	      if (typeof ext.afterFail === 'function') {
	        reportFail = ext.afterFail(res);
	      }
	      if (reportFail !== false) {
	        // Reporter.reportIDKey({key:`${name}_fail`})
	      }
	    }
	    typeof callbacks.complete === 'function' && callbacks.complete(res);
	    typeof ext.afterAll === 'function' && ext.afterAll(res);
	  });
	  // Reporter.reportIDKey({key:name});
	}

	function onMethod(eventName, callback) {
	  on(eventName, (0, _Utils.surroundByTryCatchFactory)(callback, 'at api ' + eventName + ' callback function'));
	}

	function noop() {}

	function beforeInvoke(name, args, paramFormat) {
	  var msg = (0, _Utils.paramCheck)(args, paramFormat);
	  if (msg) {
	    beforeInvokeFail(name, args, 'parameter error: ' + msg);
	    return false;
	  }
	  return true;
	}

	function beforeInvokeFail(name) {
	  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	  var errMsg = name + ':fail ' + msg;
	  console.error(errMsg);
	  // const fail = Reporter.surroundThirdByTryCatch(args.fail || noop, `at api ${name} fail callback function`)
	  var fail = args.fail || noop;
	  //const complete = Reporter.surroundThirdByTryCatch(args.complete || noop, `at api ${name} complete callback function`)
	  var complete = args.complete || noop;

	  fail({ errMsg: errMsg });
	  complete({ errMsg: errMsg });
	}

	function checkUrlInConfig(name, url, args) {
	  var path = url.replace(/\.html\?.*|\.html$/, '');
	  if (__wxConfig.pages.indexOf(path) === -1) {
	    beforeInvokeFail(name, args, 'url "' + (0, _Utils.removeHtmlSuffixFromUrl)(url) + '" is not in app.json');
	    return false;
	  }
	  return true;
	}

/***/ })
/******/ ]);