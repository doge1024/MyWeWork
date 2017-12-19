/*
 * 在全局暴露一个 NativeGlobal 对象
 * 设计文档：http://git.code.oa.com/wxweb/game-design/blob/master/global/NativeGlobal/README.md
 */
(function() {

NativeGlobal = {}
var g = NativeGlobal

// The 'ej' object provides some basic info and utility functions
var ej = new Ejecta.GlobalUtils()

// 把全局暴露的 __wxConfig 挪到 NativeGlobal
g.__wxConfig = __wxConfig

// TODO Reporter-SDK 里面会用到这个全局变量，不能直接移除
// __wxConfig = undefined

// 补充 __wxConfig 的属性
g.__wxConfig.devicePixelRatio = ej.devicePixelRatio
g.__wxConfig.screenWidth = ej.screenWidth
g.__wxConfig.screenHeight = ej.screenHeight

 g.log = function (str) { ej.log(str) }
 
 g.setTimeout = function (cb, t) { return ej.setTimeout(cb, t || 0) }
 g.setInterval = function(cb, t){ return ej.setInterval(cb, t || 0) }
 g.clearTimeout = function(id){ return ej.clearTimeout(id) }
 g.clearInterval = function(id){ return ej.clearInterval(id) }

g.requestAnimationFrame = function(cb){ return ej.requestAnimationFrame(cb) }
g.cancelAnimationFrame = function(id){ return ej.cancelAnimationFrame(id) }
g.setPreferredFramesPerSecond = function(fps){ return ej.setPreferredFramesPerSecond(fps) }
g.loadFont = function(path){ return ej.loadFont(path) }
g.encodeArrayBuffer = function(str, code){ return ej.encodeArrayBuffer(str, code) }
g.decodeArrayBuffer = function(buffer, code){ return ej.decodeArrayBuffer(buffer, code) }
g.performanceNow = function(){ return ej.performanceNow() }

g.registerFrameIdPtr = function (w,r) { ej.registerFrameIdPtr(w,r) }
 
// TODO 临时暴露到全局以解决 Reporter 错误
setTimeout = g.setTimeout

var screenCanvas = new Ejecta.Canvas()
var hasScreenCanvas = false
g.Canvas = function () {
  if (hasScreenCanvas) {
    return new Ejecta.Canvas()
  } else {
    hasScreenCanvas = true
    return screenCanvas
  }
}
g.Image = Ejecta.Image
g.Audio = Ejecta.Audio
g.XMLHttpRequest = Ejecta.HttpRequest
g.WebSocket = Ejecta.WebSocket
 g.XMLReader = Ejecta.XMLReader
 g.FileReader = Ejecta.FileReader
 g.Iconv = Ejecta.Iconv

g.EventHandler = {}
g.EventHandler.ontouchstart = g.EventHandler.ontouchend = g.EventHandler.ontouchmove = null

var touchInput = new Ejecta.TouchInput(screenCanvas)
var touchEventNames = ['ontouchstart', 'ontouchmove', 'ontouchend', 'ontouchcancel']
touchEventNames.forEach(function (touchEventName) {
  touchInput[touchEventName] = function (touches, changedTouches, timestamp) {
    if (typeof g.EventHandler[touchEventName] === 'function') {
      var event = {
        type: touchEventName,
        touches: JSON.parse(JSON.stringify(touches)),
        changedTouches: JSON.parse(JSON.stringify(changedTouches)),
        timestamp: timestamp
      }
      g.EventHandler[touchEventName].call(g, event)
    }
  }
})

})();
