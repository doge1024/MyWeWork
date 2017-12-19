 (function () {
     window.qmTouchHandler = {
         addLongPressImageHandler: function () {
             var d = document.getElementsByTagName("IMG");
             d = [].slice.apply(d);
             var a = "qmimgclick";
             for (var b = 0; b < d.length; b++) {
                 var c = d[b];
                 c.addLongPressEventListener(function (k) {
                     var h = a + ":" + this.src;
                     var f = document.getElementsByTagName("IMG");
                     for (var j = 0; j < f.length; j++) {
                         if (f[j] != this) {
                             h = h + "&" + a + ":" + f[j].src
                         }
                     }
                     var g = this.hasTapElementWithTagName("a");
                     if (g && g.href) {
                         h = h + "&qmSrc:" + g.href
                     }
                     window.location.href = h
                 })
             }
         }
     }
 })();