//     _WXJS.js
//     (c) 2010-2012 Thomas Fuchs
//     _WXJS.js may be freely distributed under the MIT license.
(function() {
    // if (window.WeixinJSBridge) {
    //     return;
    // };

    /* _WXJS v1.0rc1 - polyfill _WXJS event detect fx ajax form touch - _WXJSjs.com/license */
    ;
    (function(undefined) {
        if (String.prototype.trim === undefined) // fix for iOS 3.2
            String.prototype.trim = function() {
                return this.replace(/^\s+/, '').replace(/\s+$/, '')
            }

        // For iOS 3.x
        // from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
        if (Array.prototype.reduce === undefined)
            Array.prototype.reduce = function(fun) {
                if (this === void 0 || this === null) throw new TypeError()
                var t = Object(this),
                    len = t.length >>> 0,
                    k = 0,
                    accumulator
                if (typeof fun != 'function') throw new TypeError()
                if (len == 0 && arguments.length == 1) throw new TypeError()

                if (arguments.length >= 2)
                    accumulator = arguments[1]
                else
                    do {
                        if (k in t) {
                            accumulator = t[k++]
                            break
                        }
                        if (++k >= len) throw new TypeError()
                    } while (true)

                while (k < len) {
                    if (k in t) accumulator = fun.call(undefined, accumulator, t[k], k, t)
                    k++
                }
                return accumulator
            }

    })()
    var _WXJS = (function() {
        var undefined, key, $, classList, emptyArray = [],
            slice = emptyArray.slice,
            document = window.document,
            elementDisplay = {},
            classCache = {},
            getComputedStyle = document.defaultView.getComputedStyle,
            cssNumber = {
                'column-count': 1,
                'columns': 1,
                'font-weight': 1,
                'line-height': 1,
                'opacity': 1,
                'z-index': 1,
                'zoom': 1
            },
            fragmentRE = /^\s*<(\w+|!)[^>]*>/,

            // Used by `$._WXJS.init` to wrap elements, text/comment nodes, document,
            // and document fragment node types.
            elementTypes = [1, 3, 8, 9, 11],

            adjacencyOperators = ['after', 'prepend', 'before', 'append'],
            table = document.createElement('table'),
            tableRow = document.createElement('tr'),
            containers = {
                'tr': document.createElement('tbody'),
                'tbody': table,
                'thead': table,
                'tfoot': table,
                'td': tableRow,
                'th': tableRow,
                '*': document.createElement('div')
            },
            readyRE = /complete|loaded|interactive/,
            classSelectorRE = /^\.([\w-]+)$/,
            idSelectorRE = /^#([\w-]+)$/,
            tagSelectorRE = /^[\w-]+$/,
            toString = ({}).toString,
            _WXJS = {},
            camelize, uniq,
            tempParent = document.createElement('div')

        _WXJS.matches = function(element, selector) {
            if (!element || element.nodeType !== 1) return false
            var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                element.oMatchesSelector || element.matchesSelector
            if (matchesSelector) return matchesSelector.call(element, selector)
            // fall back to performing a selector:
            var match, parent = element.parentNode,
                temp = !parent
            if (temp)(parent = tempParent).appendChild(element)
            match = ~_WXJS.qsa(parent, selector).indexOf(element)
            temp && tempParent.removeChild(element)
            return match
        }

        function isFunction(value) {
            return toString.call(value) == "[object Function]"
        }

        function isObject(value) {
            return value instanceof Object
        }

        function isPlainObject(value) {
            var key, ctor
            if (toString.call(value) !== "[object Object]") return false
            ctor = (isFunction(value.constructor) && value.constructor.prototype)
            if (!ctor || !hasOwnProperty.call(ctor, 'isPrototypeOf')) return false
            for (key in value) {}
            return key === undefined || hasOwnProperty.call(value, key)
        }

        function isArray(value) {
            return value instanceof Array
        }

        function likeArray(obj) {
            return typeof obj.length == 'number'
        }

        function compact(array) {
            return array.filter(function(item) {
                return item !== undefined && item !== null
            })
        }

        function flatten(array) {
            return array.length > 0 ? [].concat.apply([], array) : array
        }
        camelize = function(str) {
            return str.replace(/-+(.)?/g, function(match, chr) {
                return chr ? chr.toUpperCase() : ''
            })
        }

        function dasherize(str) {
            return str.replace(/::/g, '/')
                .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
                .replace(/([a-z\d])([A-Z])/g, '$1_$2')
                .replace(/_/g, '-')
                .toLowerCase()
        }
        uniq = function(array) {
            return array.filter(function(item, idx) {
                return array.indexOf(item) == idx
            })
        }

        function classRE(name) {
            return name in classCache ?
                classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
        }

        function maybeAddPx(name, value) {
            return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
        }

        function defaultDisplay(nodeName) {
            var element, display
            if (!elementDisplay[nodeName]) {
                element = document.createElement(nodeName)
                document.body.appendChild(element)
                display = getComputedStyle(element, '').getPropertyValue("display")
                element.parentNode.removeChild(element)
                display == "none" && (display = "block")
                elementDisplay[nodeName] = display
            }
            return elementDisplay[nodeName]
        }

        // `$._WXJS.fragment` takes a html string and an optional tag name
        // to generate DOM nodes nodes from the given html string.
        // The generated DOM nodes are returned as an array.
        // This function can be overriden in plugins for example to make
        // it compatible with browsers that don't support the DOM fully.
        _WXJS.fragment = function(html, name) {
            if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
            if (!(name in containers)) name = '*'
            var container = containers[name]
            container.innerHTML = '' + html
            return $.each(slice.call(container.childNodes), function() {
                container.removeChild(this)
            })
        }

        // `$._WXJS.Z` swaps out the prototype of the given `dom` array
        // of nodes with `$.fn` and thus supplying all the _WXJS functions
        // to the array. Note that `__proto__` is not supported on Internet
        // Explorer. This method can be overriden in plugins.
        _WXJS.Z = function(dom, selector) {
            dom = dom || []
            dom.__proto__ = arguments.callee.prototype
            dom.selector = selector || ''
            return dom
        }

        // `$._WXJS.isZ` should return `true` if the given object is a _WXJS
        // collection. This method can be overriden in plugins.
        _WXJS.isZ = function(object) {
            return object instanceof _WXJS.Z
        }

        // `$._WXJS.init` is _WXJS's counterpart to jQuery's `$.fn.init` and
        // takes a CSS selector and an optional context (and handles various
        // special cases).
        // This method can be overriden in plugins.
        _WXJS.init = function(selector, context) {
            // If nothing given, return an empty _WXJS collection
            if (!selector) return _WXJS.Z()
            // If a function is given, call it when the DOM is ready
            else if (isFunction(selector)) return $(document).ready(selector)
            // If a _WXJS collection is given, juts return it
            else if (_WXJS.isZ(selector)) return selector
            else {
                var dom
                // normalize array if an array of nodes is given
                if (isArray(selector)) dom = compact(selector)
                // if a JavaScript object is given, return a copy of it
                // this is a somewhat peculiar option, but supported by
                // jQuery so we'll do it, too
                else if (isPlainObject(selector))
                    dom = [$.extend({}, selector)], selector = null
                // wrap stuff like `document` or `window`
                else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window)
                    dom = [selector], selector = null
                // If it's a html fragment, create nodes from it
                else if (fragmentRE.test(selector))
                    dom = _WXJS.fragment(selector.trim(), RegExp.$1), selector = null
                // If there's a context, create a collection on that context first, and select
                // nodes from there
                else if (context !== undefined) return $(context).find(selector)
                // And last but no least, if it's a CSS selector, use it to select nodes.
                else dom = _WXJS.qsa(document, selector)
                // create a new _WXJS collection from the nodes found
                return _WXJS.Z(dom, selector)
            }
        }

        // `$` will be the base `_WXJS` object. When calling this
        // function just call `$._WXJS.init, whichs makes the implementation
        // details of selecting nodes and creating _WXJS collections
        // patchable in plugins.
        $ = function(selector, context) {
            return _WXJS.init(selector, context)
        }

        // Copy all but undefined properties from one or more
        // objects to the `target` object.
        $.extend = function(target) {
            slice.call(arguments, 1).forEach(function(source) {
                for (key in source)
                    if (source[key] !== undefined)
                        target[key] = source[key]
            })
            return target
        }

        // `$._WXJS.qsa` is _WXJS's CSS selector implementation which
        // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
        // This method can be overriden in plugins.
        _WXJS.qsa = function(element, selector) {
            var found
            return (element === document && idSelectorRE.test(selector)) ?
                ((found = element.getElementById(RegExp.$1)) ? [found] : emptyArray) :
                (element.nodeType !== 1 && element.nodeType !== 9) ? emptyArray :
                slice.call(
                    classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) :
                    tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) :
                    element.querySelectorAll(selector)
                )
        }

        function filtered(nodes, selector) {
            return selector === undefined ? $(nodes) : $(nodes).filter(selector)
        }

        function funcArg(context, arg, idx, payload) {
            return isFunction(arg) ? arg.call(context, idx, payload) : arg
        }

        $.isFunction = isFunction
        $.isObject = isObject
        $.isArray = isArray
        $.isPlainObject = isPlainObject

        $.inArray = function(elem, array, i) {
            return emptyArray.indexOf.call(array, elem, i)
        }

        $.trim = function(str) {
            return str.trim()
        }

        // plugin compatibility
        $.uuid = 0

        $.map = function(elements, callback) {
            var value, values = [],
                i, key
            if (likeArray(elements))
                for (i = 0; i < elements.length; i++) {
                    value = callback(elements[i], i)
                    if (value != null) values.push(value)
                }
            else
                for (key in elements) {
                    value = callback(elements[key], key)
                    if (value != null) values.push(value)
                }
            return flatten(values)
        }

        $.each = function(elements, callback) {
            var i, key
            if (likeArray(elements)) {
                for (i = 0; i < elements.length; i++)
                    if (callback.call(elements[i], i, elements[i]) === false) return elements
            } else {
                for (key in elements)
                    if (callback.call(elements[key], key, elements[key]) === false) return elements
            }

            return elements
        }

        // Define methods that will be available on all
        // _WXJS collections
        $.fn = {
            // Because a collection acts like an array
            // copy over these useful array functions.
            forEach: emptyArray.forEach,
            reduce: emptyArray.reduce,
            push: emptyArray.push,
            indexOf: emptyArray.indexOf,
            concat: emptyArray.concat,

            // `map` and `slice` in the jQuery API work differently
            // from their array counterparts
            map: function(fn) {
                return $.map(this, function(el, i) {
                    return fn.call(el, i, el)
                })
            },
            slice: function() {
                return $(slice.apply(this, arguments))
            },

            ready: function(callback) {
                if (readyRE.test(document.readyState)) callback($)
                else document.addEventListener('DOMContentLoaded', function() {
                    callback($)
                }, false)
                return this
            },
            get: function(idx) {
                return idx === undefined ? slice.call(this) : this[idx]
            },
            toArray: function() {
                return this.get()
            },
            size: function() {
                return this.length
            },
            remove: function() {
                return this.each(function() {
                    if (this.parentNode != null)
                        this.parentNode.removeChild(this)
                })
            },
            each: function(callback) {
                this.forEach(function(el, idx) {
                    callback.call(el, idx, el)
                })
                return this
            },
            filter: function(selector) {
                return $([].filter.call(this, function(element) {
                    return _WXJS.matches(element, selector)
                }))
            },
            add: function(selector, context) {
                return $(uniq(this.concat($(selector, context))))
            },
            is: function(selector) {
                return this.length > 0 && _WXJS.matches(this[0], selector)
            },
            not: function(selector) {
                var nodes = []
                if (isFunction(selector) && selector.call !== undefined)
                    this.each(function(idx) {
                        if (!selector.call(this, idx)) nodes.push(this)
                    })
                else {
                    var excludes = typeof selector == 'string' ? this.filter(selector) :
                        (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
                    this.forEach(function(el) {
                        if (excludes.indexOf(el) < 0) nodes.push(el)
                    })
                }
                return $(nodes)
            },
            eq: function(idx) {
                return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1)
            },
            first: function() {
                var el = this[0]
                return el && !isObject(el) ? el : $(el)
            },
            last: function() {
                var el = this[this.length - 1]
                return el && !isObject(el) ? el : $(el)
            },
            find: function(selector) {
                var result
                if (this.length == 1) result = _WXJS.qsa(this[0], selector)
                else result = this.map(function() {
                    return _WXJS.qsa(this, selector)
                })
                return $(result)
            },
            closest: function(selector, context) {
                var node = this[0]
                while (node && !_WXJS.matches(node, selector))
                    node = node !== context && node !== document && node.parentNode
                return $(node)
            },
            parents: function(selector) {
                var ancestors = [],
                    nodes = this
                while (nodes.length > 0)
                    nodes = $.map(nodes, function(node) {
                        if ((node = node.parentNode) && node !== document && ancestors.indexOf(node) < 0) {
                            ancestors.push(node)
                            return node
                        }
                    })
                return filtered(ancestors, selector)
            },
            parent: function(selector) {
                return filtered(uniq(this.pluck('parentNode')), selector)
            },
            children: function(selector) {
                return filtered(this.map(function() {
                    return slice.call(this.children)
                }), selector)
            },
            siblings: function(selector) {
                return filtered(this.map(function(i, el) {
                    return slice.call(el.parentNode.children).filter(function(child) {
                        return child !== el
                    })
                }), selector)
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = ''
                })
            },
            // `pluck` is borrowed from Prototype.js
            pluck: function(property) {
                return this.map(function() {
                    return this[property]
                })
            },
            show: function() {
                return this.each(function() {
                    this.style.display == "none" && (this.style.display = null)
                    if (getComputedStyle(this, '').getPropertyValue("display") == "none")
                        this.style.display = defaultDisplay(this.nodeName)
                })
            },
            replaceWith: function(newContent) {
                return this.before(newContent).remove()
            },
            wrap: function(newContent) {
                return this.each(function() {
                    $(this).wrapAll($(newContent)[0].cloneNode(false))
                })
            },
            wrapAll: function(newContent) {
                if (this[0]) {
                    $(this[0]).before(newContent = $(newContent))
                    newContent.append(this)
                }
                return this
            },
            unwrap: function() {
                this.parent().each(function() {
                    $(this).replaceWith($(this).children())
                })
                return this
            },
            clone: function() {
                return $(this.map(function() {
                    return this.cloneNode(true)
                }))
            },
            hide: function() {
                return this.css("display", "none")
            },
            toggle: function(setting) {
                return (setting === undefined ? this.css("display") == "none" : setting) ? this.show() : this.hide()
            },
            prev: function() {
                return $(this.pluck('previousElementSibling'))
            },
            next: function() {
                return $(this.pluck('nextElementSibling'))
            },
            html: function(html) {
                return html === undefined ?
                    (this.length > 0 ? this[0].innerHTML : null) :
                    this.each(function(idx) {
                        var originHtml = this.innerHTML
                        $(this).empty().append(funcArg(this, html, idx, originHtml))
                    })
            },
            text: function(text) {
                return text === undefined ?
                    (this.length > 0 ? this[0].textContent : null) :
                    this.each(function() {
                        this.textContent = text
                    })
            },
            attr: function(name, value) {
                var result
                return (typeof name == 'string' && value === undefined) ?
                    (this.length == 0 || this[0].nodeType !== 1 ? undefined :
                        (name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
                        (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
                    ) :
                    this.each(function(idx) {
                        if (this.nodeType !== 1) return
                        if (isObject(name))
                            for (key in name) this.setAttribute(key, name[key])
                        else this.setAttribute(name, funcArg(this, value, idx, this.getAttribute(name)))
                    })
            },
            removeAttr: function(name) {
                return this.each(function() {
                    if (this.nodeType === 1) this.removeAttribute(name)
                })
            },
            prop: function(name, value) {
                return (value === undefined) ?
                    (this[0] ? this[0][name] : undefined) :
                    this.each(function(idx) {
                        this[name] = funcArg(this, value, idx, this[name])
                    })
            },
            data: function(name, value) {
                var data = this.attr('data-' + dasherize(name), value)
                return data !== null ? data : undefined
            },
            val: function(value) {
                return (value === undefined) ?
                    (this.length > 0 ? this[0].value : undefined) :
                    this.each(function(idx) {
                        this.value = funcArg(this, value, idx, this.value)
                    })
            },
            offset: function() {
                if (this.length == 0) return null
                var obj = this[0].getBoundingClientRect()
                return {
                    left: obj.left + window.pageXOffset,
                    top: obj.top + window.pageYOffset,
                    width: obj.width,
                    height: obj.height
                }
            },
            css: function(property, value) {
                if (value === undefined && typeof property == 'string')
                    return (
                        this.length == 0 ?
                        undefined :
                        this[0].style[camelize(property)] || getComputedStyle(this[0], '').getPropertyValue(property))

                var css = ''
                for (key in property)
                    if (typeof property[key] == 'string' && property[key] == '')
                        this.each(function() {
                            this.style.removeProperty(dasherize(key))
                        })
                else
                    css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'

                if (typeof property == 'string')
                    if (value == '')
                        this.each(function() {
                            this.style.removeProperty(dasherize(property))
                        })
                else
                    css = dasherize(property) + ":" + maybeAddPx(property, value)

                return this.each(function() {
                    this.style.cssText += ';' + css
                })
            },
            index: function(element) {
                return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(name) {
                if (this.length < 1) return false
                else return classRE(name).test(this[0].className)
            },
            addClass: function(name) {
                return this.each(function(idx) {
                    classList = []
                    var cls = this.className,
                        newName = funcArg(this, name, idx, cls)
                    newName.split(/\s+/g).forEach(function(klass) {
                        if (!$(this).hasClass(klass)) classList.push(klass)
                    }, this)
                    classList.length && (this.className += (cls ? " " : "") + classList.join(" "))
                })
            },
            removeClass: function(name) {
                return this.each(function(idx) {
                    if (name === undefined)
                        return this.className = ''
                    classList = this.className
                    funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass) {
                        classList = classList.replace(classRE(klass), " ")
                    })
                    this.className = classList.trim()
                })
            },
            toggleClass: function(name, when) {
                return this.each(function(idx) {
                    var newName = funcArg(this, name, idx, this.className);
                    (when === undefined ? !$(this).hasClass(newName) : when) ?
                    $(this).addClass(newName): $(this).removeClass(newName)
                })
            }
        }

        // Generate the `width` and `height` functions
        ;
        ['width', 'height'].forEach(function(dimension) {
            $.fn[dimension] = function(value) {
                var offset, Dimension = dimension.replace(/./, function(m) {
                    return m[0].toUpperCase()
                })
                if (value === undefined) return this[0] == window ? window['inner' + Dimension] :
                    this[0] == document ? document.documentElement['offset' + Dimension] :
                    (offset = this.offset()) && offset[dimension]
                else return this.each(function(idx) {
                    var el = $(this)
                    el.css(dimension, funcArg(this, value, idx, el[dimension]()))
                })
            }
        })

        function insert(operator, target, node) {
            var parent = (operator % 2) ? target : target.parentNode
            parent ? parent.insertBefore(node, !operator ? target.nextSibling : // after
                    operator == 1 ? parent.firstChild : // prepend
                    operator == 2 ? target : // before
                    null) : // append
                $(node).remove()
        }

        function traverseNode(node, fun) {
            fun(node)
            for (var key in node.childNodes) traverseNode(node.childNodes[key], fun)
        }

        // Generate the `after`, `prepend`, `before`, `append`,
        // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
        adjacencyOperators.forEach(function(key, operator) {
            $.fn[key] = function() {
                // arguments can be nodes, arrays of nodes, _WXJS objects and HTML strings
                var nodes = $.map(arguments, function(n) {
                    return isObject(n) ? n : _WXJS.fragment(n)
                })
                if (nodes.length < 1) return this
                var size = this.length,
                    copyByClone = size > 1,
                    inReverse = operator < 2

                return this.each(function(index, target) {
                    for (var i = 0; i < nodes.length; i++) {
                        var node = nodes[inReverse ? nodes.length - i - 1 : i]
                        traverseNode(node, function(node) {
                            if (node.nodeName != null && node.nodeName.toUpperCase() === 'SCRIPT' && (!node.type || node.type === 'text/javascript'))
                                window['eval'].call(window, node.innerHTML)
                        })
                        if (copyByClone && index < size - 1) node = node.cloneNode(true)
                        insert(operator, target, node)
                    }
                })
            }

            $.fn[(operator % 2) ? key + 'To' : 'insert' + (operator ? 'Before' : 'After')] = function(html) {
                $(html)[key](this)
                return this
            }
        })

        _WXJS.Z.prototype = $.fn

        // Export internal API functions in the `$._WXJS` namespace
        _WXJS.camelize = camelize
        _WXJS.uniq = uniq
        $._WXJS = _WXJS

        return $
    })()

    // If `$` is not yet defined, point it to `_WXJS`
    window._WXJS = _WXJS
    // '$' in window || (window.$ = _WXJS)
    ;
    (function($) {
        var $$ = $._WXJS.qsa,
            handlers = {},
            _zid = 1,
            specialEvents = {}

        specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

        function zid(element) {
            return element._zid || (element._zid = _zid++)
        }

        function findHandlers(element, event, fn, selector) {
            event = parse(event)
            if (event.ns) var matcher = matcherFor(event.ns)
            return (handlers[zid(element)] || []).filter(function(handler) {
                return handler &&
                    (!event.e || handler.e == event.e) &&
                    (!event.ns || matcher.test(handler.ns)) &&
                    (!fn || zid(handler.fn) === zid(fn)) &&
                    (!selector || handler.sel == selector)
            })
        }

        function parse(event) {
            var parts = ('' + event).split('.')
            return {
                e: parts[0],
                ns: parts.slice(1).sort().join(' ')
            }
        }

        function matcherFor(ns) {
            return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
        }

        function eachEvent(events, fn, iterator) {
            if ($.isObject(events)) $.each(events, iterator)
            else events.split(/\s/).forEach(function(type) {
                iterator(type, fn)
            })
        }

        function add(element, events, fn, selector, getDelegate, capture) {
            capture = !!capture
            var id = zid(element),
                set = (handlers[id] || (handlers[id] = []))
            eachEvent(events, fn, function(event, fn) {
                var delegate = getDelegate && getDelegate(fn, event),
                    callback = delegate || fn
                var proxyfn = function(event) {
                    var result = callback.apply(element, [event].concat(event.data))
                    if (result === false) event.preventDefault()
                    return result
                }
                var handler = $.extend(parse(event), {
                    fn: fn,
                    proxy: proxyfn,
                    sel: selector,
                    del: delegate,
                    i: set.length
                })
                set.push(handler)
                element.addEventListener(handler.e, proxyfn, capture)
            })
        }

        function remove(element, events, fn, selector) {
            var id = zid(element)
            eachEvent(events || '', fn, function(event, fn) {
                findHandlers(element, event, fn, selector).forEach(function(handler) {
                    delete handlers[id][handler.i]
                    element.removeEventListener(handler.e, handler.proxy, false)
                })
            })
        }

        $.event = {
            add: add,
            remove: remove
        }

        $.proxy = function(fn, context) {
            if ($.isFunction(fn)) {
                var proxyFn = function() {
                    return fn.apply(context, arguments)
                }
                proxyFn._zid = zid(fn)
                return proxyFn
            } else if (typeof context == 'string') {
                return $.proxy(fn[context], fn)
            } else {
                throw new TypeError("expected function")
            }
        }

        $.fn.bind = function(event, callback) {
            return this.each(function() {
                add(this, event, callback)
            })
        }
        $.fn.unbind = function(event, callback) {
            return this.each(function() {
                remove(this, event, callback)
            })
        }
        $.fn.one = function(event, callback) {
            return this.each(function(i, element) {
                add(this, event, callback, null, function(fn, type) {
                    return function() {
                        var result = fn.apply(element, arguments)
                        remove(element, type, fn)
                        return result
                    }
                })
            })
        }

        var returnTrue = function() {
                return true
            },
            returnFalse = function() {
                return false
            },
            eventMethods = {
                preventDefault: 'isDefaultPrevented',
                stopImmediatePropagation: 'isImmediatePropagationStopped',
                stopPropagation: 'isPropagationStopped'
            }

        function createProxy(event) {
            var proxy = $.extend({
                originalEvent: event
            }, event)
            $.each(eventMethods, function(name, predicate) {
                proxy[name] = function() {
                    this[predicate] = returnTrue
                    return event[name].apply(event, arguments)
                }
                proxy[predicate] = returnFalse
            })
            return proxy
        }

        // emulates the 'defaultPrevented' property for browsers that have none
        function fix(event) {
            if (!('defaultPrevented' in event)) {
                event.defaultPrevented = false
                var prevent = event.preventDefault
                event.preventDefault = function() {
                    this.defaultPrevented = true
                    prevent.call(this)
                }
            }
        }

        $.fn.delegate = function(selector, event, callback) {
            var capture = false
            if (event == 'blur' || event == 'focus') {
                if ($.iswebkit)
                    event = event == 'blur' ? 'focusout' : event == 'focus' ? 'focusin' : event
                else
                    capture = true
            }

            return this.each(function(i, element) {
                add(element, event, callback, selector, function(fn) {
                    return function(e) {
                        var evt, match = $(e.target).closest(selector, element).get(0)
                        if (match) {
                            evt = $.extend(createProxy(e), {
                                currentTarget: match,
                                liveFired: element
                            })
                            return fn.apply(match, [evt].concat([].slice.call(arguments, 1)))
                        }
                    }
                }, capture)
            })
        }
        $.fn.undelegate = function(selector, event, callback) {
            return this.each(function() {
                remove(this, event, callback, selector)
            })
        }

        $.fn.live = function(event, callback) {
            $(document.body).delegate(this.selector, event, callback)
            return this
        }
        $.fn.die = function(event, callback) {
            $(document.body).undelegate(this.selector, event, callback)
            return this
        }

        $.fn.on = function(event, selector, callback) {
            return selector == undefined || $.isFunction(selector) ?
                this.bind(event, selector) : this.delegate(selector, event, callback)
        }
        $.fn.off = function(event, selector, callback) {
            return selector == undefined || $.isFunction(selector) ?
                this.unbind(event, selector) : this.undelegate(selector, event, callback)
        }

        $.fn.trigger = function(event, data) {
            if (typeof event == 'string') event = $.Event(event)
            fix(event)
            event.data = data
            return this.each(function() {
                // items in the collection might not be DOM elements
                // (todo: possibly support events on plain old objects)
                if ('dispatchEvent' in this) this.dispatchEvent(event)
            })
        }

        // triggers event handlers on current element just as if an event occurred,
        // doesn't trigger an actual event, doesn't bubble
        $.fn.triggerHandler = function(event, data) {
            var e, result
            this.each(function(i, element) {
                e = createProxy(typeof event == 'string' ? $.Event(event) : event)
                e.data = data
                e.target = element
                $.each(findHandlers(element, event.type || event), function(i, handler) {
                    result = handler.proxy(e)
                    if (e.isImmediatePropagationStopped()) return false
                })
            })
            return result
        }

        // shortcut methods for `.bind(event, fn)` for each event type
        ;
        ('focusin focusout load resize scroll unload click dblclick ' +
            'mousedown mouseup mousemove mouseover mouseout ' +
            'change select keydown keypress keyup error').split(' ').forEach(function(event) {
            $.fn[event] = function(callback) {
                return this.bind(event, callback)
            }
        })

        ;
        ['focus', 'blur'].forEach(function(name) {
            $.fn[name] = function(callback) {
                if (callback) this.bind(name, callback)
                else if (this.length) try {
                    this.get(0)[name]()
                } catch (e) {}
                return this
            }
        })

        $.Event = function(type, props) {
            var event = document.createEvent(specialEvents[type] || 'Events'),
                bubbles = true
            if (props)
                for (var name in props)(name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
            event.initEvent(type, bubbles, true, null, null, null, null, null, null, null, null, null, null, null, null)
            return event
        }

    })(_WXJS);
    (function($) {
        function detect(ua) {
            var os = this.os = {},
                browser = this.browser = {},
                webkit = ua.match(/WebKit\/([\d.]+)/),
                android = ua.match(/(Android)\s+([\d.]+)/),
                ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
                iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
                webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
                touchpad = webos && ua.match(/TouchPad/),
                kindle = ua.match(/Kindle\/([\d.]+)/),
                silk = ua.match(/Silk\/([\d._]+)/),
                blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/)

            // todo clean this up with a better OS/browser
            // separation. we need to discern between multiple
            // browsers on android, and decide if kindle fire in
            // silk mode is android or not

            if (browser.webkit = !!webkit) browser.version = webkit[1]

            if (android) os.android = true, os.version = android[2]
            if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
            if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
            if (webos) os.webos = true, os.version = webos[2]
            if (touchpad) os.touchpad = true
            if (blackberry) os.blackberry = true, os.version = blackberry[2]
            if (kindle) os.kindle = true, os.version = kindle[1]
            if (silk) browser.silk = true, browser.version = silk[1]
            if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
        }

        detect.call($, navigator.userAgent)
        // make available to unit tests
        $.__detect = detect

    })(_WXJS)

    // sprintf
    var sprintf = (function() {
        function get_type(variable) {
            return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
        }

        function str_repeat(input, multiplier) {
            for (var output = []; multiplier > 0; output[--multiplier] = input) { /* do nothing */ }
            return output.join('');
        }

        var str_format = function() {
            if (!str_format.cache.hasOwnProperty(arguments[0])) {
                str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
            }
            return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
        };

        str_format.format = function(parse_tree, argv) {
            var cursor = 1,
                tree_length = parse_tree.length,
                node_type = '',
                arg, output = [],
                i, k, match, pad, pad_character, pad_length;
            for (i = 0; i < tree_length; i++) {
                node_type = get_type(parse_tree[i]);
                if (node_type === 'string') {
                    output.push(parse_tree[i]);
                } else if (node_type === 'array') {
                    match = parse_tree[i]; // convenience purposes only
                    if (match[2]) { // keyword argument
                        arg = argv[cursor];
                        for (k = 0; k < match[2].length; k++) {
                            if (!arg.hasOwnProperty(match[2][k])) {
                                throw (sprintf('[sprintf] property "%s" does not exist', match[2][k]));
                            }
                            arg = arg[match[2][k]];
                        }
                    } else if (match[1]) { // positional argument (explicit)
                        arg = argv[match[1]];
                    } else { // positional argument (implicit)
                        arg = argv[cursor++];
                    }

                    if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
                        throw (sprintf('[sprintf] expecting number but found %s', get_type(arg)));
                    }
                    switch (match[8]) {
                        case 'b':
                            arg = arg.toString(2);
                            break;
                        case 'c':
                            arg = String.fromCharCode(arg);
                            break;
                        case 'd':
                            arg = parseInt(arg, 10);
                            break;
                        case 'e':
                            arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
                            break;
                        case 'f':
                            arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
                            break;
                        case 'o':
                            arg = arg.toString(8);
                            break;
                        case 's':
                            arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg);
                            break;
                        case 'u':
                            arg = Math.abs(arg);
                            break;
                        case 'x':
                            arg = arg.toString(16);
                            break;
                        case 'X':
                            arg = arg.toString(16).toUpperCase();
                            break;
                    }
                    arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+' + arg : arg);
                    pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
                    pad_length = match[6] - String(arg).length;
                    pad = match[6] ? str_repeat(pad_character, pad_length) : '';
                    output.push(match[5] ? arg + pad : pad + arg);
                }
            }
            return output.join('');
        };

        str_format.cache = {};

        str_format.parse = function(fmt) {
            var _fmt = fmt,
                match = [],
                parse_tree = [],
                arg_names = 0;
            while (_fmt) {
                if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
                    parse_tree.push(match[0]);
                } else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
                    parse_tree.push('%');
                } else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
                    if (match[2]) {
                        arg_names |= 1;
                        var field_list = [],
                            replacement_field = match[2],
                            field_match = [];
                        if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                            field_list.push(field_match[1]);
                            while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                                    field_list.push(field_match[1]);
                                } else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                                    field_list.push(field_match[1]);
                                } else {
                                    throw ('[sprintf] huh?');
                                }
                            }
                        } else {
                            throw ('[sprintf] huh?');
                        }
                        match[2] = field_list;
                    } else {
                        arg_names |= 2;
                    }
                    if (arg_names === 3) {
                        throw ('[sprintf] mixing positional and named placeholders is not (yet) supported');
                    }
                    parse_tree.push(match);
                } else {
                    throw ('[sprintf] huh?');
                }
                _fmt = _fmt.substring(match[0].length);
            }
            return parse_tree;
        };

        return str_format;
    })();

    var vsprintf = function(fmt, argv) {
        argv.unshift(fmt);
        return sprintf.apply(null, argv);
    };

    // UTF8
    var UTF8 = {

        // public method for url encoding
        encode: function(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },

        // public method for url decoding
        decode: function(utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }

    };

    var HEX = {
        encode: function(str) {
            var r = "";
            var e = str.length;
            var c = 0;
            var h;
            while (c < e) {
                h = str.charCodeAt(c++).toString(16);
                while (h.length < 2) h = "0" + h;
                r += h;
            }
            return r.toUpperCase();
        },

        decode: function(str) {
            var r = "";
            var e = str.length;
            var s;
            while (e >= 0) {
                s = e - 2;
                r = String.fromCharCode("0x" + str.substring(s, e)) + r;
                e = s;
            }
            return r;
        }
    };

    var JSON;
    if (!JSON) {
        JSON = {};
    }

    (function() {
        'use strict';

        function f(n) {
            // Format integers to have at least two digits.
            return n < 10 ? '0' + n : n;
        }

        if (typeof Date.prototype.toJSON !== 'function') {

            Date.prototype.toJSON = function(key) {

                return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
            };

            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
                return this.valueOf();
            };
        }

        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = { // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            },
            rep;


        function quote(string) {

            // If the string contains no control characters, no quote characters, and no
            // backslash characters, then we can safely slap some quotes around it.
            // Otherwise we must also replace the offending characters with safe escape
            // sequences.
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
                var c = meta[a];
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }


        function str(key, holder) {

            // Produce a string from holder[key].
            var i, // The loop counter.
                k, // The member key.
                v, // The member value.
                length, mind = gap,
                partial, value = holder[key];

            // 有些网站如youku.com会重载了toJSON这个函数，然后返回了json转义的串，然后我们再转一次的时候就悲剧了。所以需要注掉下面这个逻辑。
            // Douglas Crockford一开始为什么要加这么个sb逻辑呢。 既然加了，那用了别人的方法应该直接return啊。又转一次那不是sb了吗？？？坑啊。

            // If the value has a toJSON method, call it to obtain a replacement value.           
            // if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            //     value = value.toJSON(key);
            // }

            // If we were called with a replacer function, then call the replacer to
            // obtain a replacement value.
            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }

            // What happens next depends on the value's type.
            switch (typeof value) {
                case 'string':
                    return quote(value);

                case 'number':

                    // JSON numbers must be finite. Encode non-finite numbers as null.
                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':

                    // If the value is a boolean or null, convert it to a string. Note:
                    // typeof null does not produce 'null'. The case is included here in
                    // the remote chance that this gets fixed someday.
                    return String(value);

                    // If the type is 'object', we might be dealing with an object or an array or
                    // null.
                case 'object':

                    // Due to a specification blunder in ECMAScript, typeof null is 'object',
                    // so watch out for that case.
                    if (!value) {
                        return 'null';
                    }

                    // Make an array to hold the partial results of stringifying this object value.
                    gap += indent;
                    partial = [];

                    // Is the value an array?
                    if (Object.prototype.toString.apply(value) === '[object Array]') {

                        // The value is an array. Stringify every element. Use null as a placeholder
                        // for non-JSON values.
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }

                        // Join all of the elements together, separated with commas, and wrap them in
                        // brackets.
                        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }

                    // If the replacer is an array, use it to select the members to be stringified.
                    if (rep && typeof rep === 'object') {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            if (typeof rep[i] === 'string') {
                                k = rep[i];
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    } else {

                        // Otherwise, iterate through all of the keys in the object.
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }

                    // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.
                    v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        }

        // If the JSON object does not yet have a stringify method, give it one.
        if (typeof JSON.stringify !== 'function') {
            JSON.stringify = function(value, replacer, space) {

                // The stringify method takes a value and an optional replacer, and an optional
                // space parameter, and returns a JSON text. The replacer can be a function
                // that can replace values, or an array of strings that will select the keys.
                // A default replacer method can be provided. Use of the space parameter can
                // produce text that is more easily readable.
                var i;
                gap = '';
                indent = '';

                // If the space parameter is a number, make an indent string containing that
                // many spaces.
                if (typeof space === 'number') {
                    for (i = 0; i < space; i += 1) {
                        indent += ' ';
                    }

                    // If the space parameter is a string, it will be used as the indent string.
                } else if (typeof space === 'string') {
                    indent = space;
                }

                // If there is a replacer, it must be a function or an array.
                // Otherwise, throw an error.
                rep = replacer;
                if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                    throw new Error('JSON.stringify');
                }

                // Make a fake root object containing our value under the key of ''.
                // Return the result of stringifying the value.
                return str('', {
                    '': value
                });
            };
        }


        // If the JSON object does not yet have a parse method, give it one.
        if (typeof JSON.parse !== 'function') {
            JSON.parse = function(text, reviver) {

                // The parse method takes a text and an optional reviver function, and returns
                // a JavaScript value if the text is a valid JSON text.
                var j;

                function walk(holder, key) {

                    // The walk method is used to recursively walk the resulting structure so
                    // that modifications can be made.
                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }


                // Parsing happens in four stages. In the first stage, we replace certain
                // Unicode characters with escape sequences. JavaScript handles many characters
                // incorrectly, either silently deleting them, or treating them as line endings.
                text = String(text);
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function(a) {
                        return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }

                // In the second stage, we run the text against regular expressions that look
                // for non-JSON patterns. We are especially concerned with '()' and 'new'
                // because they can cause invocation, and '=' because it can cause mutation.
                // But just to be safe, we want to reject all unexpected forms.
                // We split the second stage into 4 regexp operations in order to work around
                // crippling inefficiencies in IE's and Safari's regexp engines. First we
                // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
                // replace all simple value tokens with ']' characters. Third, we delete all
                // open brackets that follow a colon or comma or that begin the text. Finally,
                // we look to see that the remaining characters are only whitespace or ']' or
                // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
                if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                    // In the third stage we use the eval function to compile the text into a
                    // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                    // in JavaScript: it can begin a block or an object literal. We wrap the text
                    // in parens to eliminate the ambiguity.
                    j = eval('(' + text + ')');

                    // In the optional fourth stage, we recursively walk the new structure, passing
                    // each name/value pair to a reviver function for possible transformation.
                    return typeof reviver === 'function' ? walk({
                        '': j
                    }, '') : j;
                }

                // If the text is not JSON parseable, then a SyntaxError is thrown.
                throw new SyntaxError('JSON.parse');
            };
        }
    }());


    var CryptoJS = CryptoJS || function(e, m) {
        var p = {},
            j = p.lib = {},
            l = function() {},
            f = j.Base = {
                extend: function(a) {
                    l.prototype = this;
                    var c = new l;
                    a && c.mixIn(a);
                    c.hasOwnProperty("init") || (c.init = function() {
                        c.$super.init.apply(this, arguments)
                    });
                    c.init.prototype = c;
                    c.$super = this;
                    return c
                },
                create: function() {
                    var a = this.extend();
                    a.init.apply(a, arguments);
                    return a
                },
                init: function() {},
                mixIn: function(a) {
                    for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
                    a.hasOwnProperty("toString") && (this.toString = a.toString)
                },
                clone: function() {
                    return this.init.prototype.extend(this)
                }
            },
            n = j.WordArray = f.extend({
                init: function(a, c) {
                    a = this.words = a || [];
                    this.sigBytes = c != m ? c : 4 * a.length
                },
                toString: function(a) {
                    return (a || h).stringify(this)
                },
                concat: function(a) {
                    var c = this.words,
                        q = a.words,
                        d = this.sigBytes;
                    a = a.sigBytes;
                    this.clamp();
                    if (d % 4)
                        for (var b = 0; b < a; b++) c[d + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((d + b) % 4);
                    else if (65535 < q.length)
                        for (b = 0; b < a; b += 4) c[d + b >>> 2] = q[b >>> 2];
                    else c.push.apply(c, q);
                    this.sigBytes += a;
                    return this
                },
                clamp: function() {
                    var a = this.words,
                        c = this.sigBytes;
                    a[c >>> 2] &= 4294967295 <<
                        32 - 8 * (c % 4);
                    a.length = e.ceil(c / 4)
                },
                clone: function() {
                    var a = f.clone.call(this);
                    a.words = this.words.slice(0);
                    return a
                },
                random: function(a) {
                    for (var c = [], b = 0; b < a; b += 4) c.push(4294967296 * e.random() | 0);
                    return new n.init(c, a)
                }
            }),
            b = p.enc = {},
            h = b.Hex = {
                stringify: function(a) {
                    var c = a.words;
                    a = a.sigBytes;
                    for (var b = [], d = 0; d < a; d++) {
                        var f = c[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
                        b.push((f >>> 4).toString(16));
                        b.push((f & 15).toString(16))
                    }
                    return b.join("")
                },
                parse: function(a) {
                    for (var c = a.length, b = [], d = 0; d < c; d += 2) b[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
                    return new n.init(b, c / 2)
                }
            },
            g = b.Latin1 = {
                stringify: function(a) {
                    var c = a.words;
                    a = a.sigBytes;
                    for (var b = [], d = 0; d < a; d++) b.push(String.fromCharCode(c[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
                    return b.join("")
                },
                parse: function(a) {
                    for (var c = a.length, b = [], d = 0; d < c; d++) b[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4);
                    return new n.init(b, c)
                }
            },
            r = b.Utf8 = {
                stringify: function(a) {
                    try {
                        return decodeURIComponent(escape(g.stringify(a)))
                    } catch (c) {
                        throw Error("Malformed UTF-8 data");
                    }
                },
                parse: function(a) {
                    return g.parse(unescape(encodeURIComponent(a)))
                }
            },
            k = j.BufferedBlockAlgorithm = f.extend({
                reset: function() {
                    this._data = new n.init;
                    this._nDataBytes = 0
                },
                _append: function(a) {
                    "string" == typeof a && (a = r.parse(a));
                    this._data.concat(a);
                    this._nDataBytes += a.sigBytes
                },
                _process: function(a) {
                    var c = this._data,
                        b = c.words,
                        d = c.sigBytes,
                        f = this.blockSize,
                        h = d / (4 * f),
                        h = a ? e.ceil(h) : e.max((h | 0) - this._minBufferSize, 0);
                    a = h * f;
                    d = e.min(4 * a, d);
                    if (a) {
                        for (var g = 0; g < a; g += f) this._doProcessBlock(b, g);
                        g = b.splice(0, a);
                        c.sigBytes -= d
                    }
                    return new n.init(g, d)
                },
                clone: function() {
                    var a = f.clone.call(this);
                    a._data = this._data.clone();
                    return a
                },
                _minBufferSize: 0
            });
        j.Hasher = k.extend({
            cfg: f.extend(),
            init: function(a) {
                this.cfg = this.cfg.extend(a);
                this.reset()
            },
            reset: function() {
                k.reset.call(this);
                this._doReset()
            },
            update: function(a) {
                this._append(a);
                this._process();
                return this
            },
            finalize: function(a) {
                a && this._append(a);
                return this._doFinalize()
            },
            blockSize: 16,
            _createHelper: function(a) {
                return function(c, b) {
                    return (new a.init(b)).finalize(c)
                }
            },
            _createHmacHelper: function(a) {
                return function(b, f) {
                    return (new s.HMAC.init(a, f)).finalize(b)
                }
            }
        });
        var s = p.algo = {};
        return p
    }(Math);
    (function() {
        var e = CryptoJS,
            m = e.lib,
            p = m.WordArray,
            j = m.Hasher,
            l = [],
            m = e.algo.SHA1 = j.extend({
                _doReset: function() {
                    this._hash = new p.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                },
                _doProcessBlock: function(f, n) {
                    for (var b = this._hash.words, h = b[0], g = b[1], e = b[2], k = b[3], j = b[4], a = 0; 80 > a; a++) {
                        if (16 > a) l[a] = f[n + a] | 0;
                        else {
                            var c = l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16];
                            l[a] = c << 1 | c >>> 31
                        }
                        c = (h << 5 | h >>> 27) + j + l[a];
                        c = 20 > a ? c + ((g & e | ~g & k) + 1518500249) : 40 > a ? c + ((g ^ e ^ k) + 1859775393) : 60 > a ? c + ((g & e | g & k | e & k) - 1894007588) : c + ((g ^ e ^ k) - 899497514);
                        j = k;
                        k = e;
                        e = g << 30 | g >>> 2;
                        g = h;
                        h = c
                    }
                    b[0] = b[0] + h | 0;
                    b[1] = b[1] + g | 0;
                    b[2] = b[2] + e | 0;
                    b[3] = b[3] + k | 0;
                    b[4] = b[4] + j | 0
                },
                _doFinalize: function() {
                    var f = this._data,
                        e = f.words,
                        b = 8 * this._nDataBytes,
                        h = 8 * f.sigBytes;
                    e[h >>> 5] |= 128 << 24 - h % 32;
                    e[(h + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296);
                    e[(h + 64 >>> 9 << 4) + 15] = b;
                    f.sigBytes = 4 * e.length;
                    this._process();
                    return this._hash
                },
                clone: function() {
                    var e = j.clone.call(this);
                    e._hash = this._hash.clone();
                    return e
                }
            });
        e.SHA1 = j._createHelper(m);
        e.HmacSHA1 = j._createHmacHelper(m)
    })();



    var _sendMessageQueue = [], // page to native的消息队列
        _callback_count = 1000, // 第一个事件的id，后面递增。
        _callback_map = {}, // 回调表 'callbackID' => callback
        _event_hook_map = {}, // 事件表 'event' => callback
        _session_data = {}, // session数据
        _MESSAGE_TYPE = '__msg_type',
        _CALLBACK_ID = '__callback_id',
        _EVENT_ID = '__event_id',
        _QUEUE_HAS_MESSAGE_URL = 'weixin://dispatch_message/';

    var _runOn3rdApiList = [], //可以在第三方网页上运行的api列表
        _event_hook_map_for3rd = {}, //第三方网页hook的事件表 'event' => callback
        _RUN_ON_3RD_APIS = '__runOn3rd_apis';

    var _xxyy = 'xx_yy',
        _JSON_MESSAGE = '__json_message',
        _MSG_QUEUE = '__msg_queue',
        _CONTEXT_KEY = '__context_key',
        _context_val = '',
        _isUseMd5 = 'isUseMd5_check',
        _SHA_KEY = '__sha_key';

    var _handleMessageIdentifier = _handleMessageFromWeixin;
    var _fetchQueueIdentifier = _fetchQueue;
    var _logIdentifier = _log;
    var _envIdentifier = _env;
    var _onfor3rdIdentifier = _onfor3rd;
    var _callIdentifier = _call;
    //将消息添加到发送队列
    function _sendMessage(message) {
        _sendMessageQueue.push(message);
        var msInQueue = _fetchQueue();
        window.webkit.messageHandlers.weixinDispatchMessage.postMessage(msInQueue);
    }

    function _checkRegisterEvent() {
        var json = JSON.stringify(Object.keys(_event_hook_map_for3rd));
        var retMap = {};
        retMap[_MSG_QUEUE] = json, retMap[_SHA_KEY] = '';
        return JSON.stringify(retMap)
    }
    //取出队列中的消息，并清空接收队列
    function _fetchQueue() {
        var curFuncIdentifier = __WeixinJSBridge._fetchQueue;
        if (curFuncIdentifier !== _fetchQueueIdentifier) {
            return '';
        }
        var messageQueueString = JSON.stringify(_sendMessageQueue);
        _sendMessageQueue = [];

        var arr = new Array;
        arr[0] = messageQueueString;
        arr[1] = _xxyy;
        var str = arr.join("");
        var msgSha = '';

        if (_isUseMd5 === 'yes') {
            var shaObj = CryptoJS.SHA1(str);
            msgSha = shaObj.toString();
        }

        var retMap = {};
        retMap[_MSG_QUEUE] = messageQueueString;
        retMap[_SHA_KEY] = msgSha;

        return JSON.stringify(retMap);
    }

    function _handleMessageFromWeixin(originmessage) {
        var curFuncIdentifier = __WeixinJSBridge._handleMessageFromWeixin;

        if (curFuncIdentifier !== _handleMessageIdentifier) {

            return '{}';
        }

        var ret;
        var message = originmessage[_JSON_MESSAGE];
        var shaStr = originmessage[_SHA_KEY];
        var arr = new Array;
        arr[0] = JSON.stringify(message);
        arr[1] = _xxyy;
        var str = arr.join("");
        var msgSha = '';
        if (_isUseMd5 === 'yes') {
            var shaObj = CryptoJS.SHA1(str);
            msgSha = shaObj.toString();
            if (msgSha !== shaStr) {
                return '{}';
            }
        }



        switch (message[_MESSAGE_TYPE]) {
            case 'checkRegister':
                return _checkRegisterEvent()
                break;
            case 'callback':
                {
                    if (typeof message[_CALLBACK_ID] === 'string' && typeof _callback_map[message[_CALLBACK_ID]] === 'function') {
                        ret = _callback_map[message[_CALLBACK_ID]](message['__params']);
                        delete _callback_map[message[_CALLBACK_ID]]; // can only call once
                        return JSON.stringify(ret);
                    }
                    return JSON.stringify({
                        '__err_code': 'cb404'
                    });
                }
                break;
            case 'event':
                {
                    if (typeof message[_RUN_ON_3RD_APIS] === 'object') {
                        _runOn3rdApiList = message[_RUN_ON_3RD_APIS];
                    }

                    _context_val = message[_CONTEXT_KEY];

                    if (typeof message[_EVENT_ID] === 'string') {
                        if (typeof _event_hook_map_for3rd[message[_EVENT_ID]] === 'function' && _isIn3rdApiList(message[_EVENT_ID])) {

                            ret = _event_hook_map_for3rd[message[_EVENT_ID]](message['__params']);
                            return JSON.stringify(ret);
                        } else if (typeof _event_hook_map[message[_EVENT_ID]] === 'function') {

                            ret = _event_hook_map[message[_EVENT_ID]](message['__params']);
                            return JSON.stringify(ret);
                        }

                    }
                    return JSON.stringify({
                        '__err_code': 'ev404'
                    });
                }
                break;
        }

        return '{}';
    }

    function _isIn3rdApiList(event) {
        return _runOn3rdApiList.some(function(x) {
            return x === event;
        });
    }

    function _env(key) {
        var curFuncIdentifier = __WeixinJSBridge.env;
        if (curFuncIdentifier !== _envIdentifier) {
            return '';
        }
        return _session_data[key];
    }

    function _log(fmt) {
        var curFuncIdentifier = __WeixinJSBridge.log;
        if (curFuncIdentifier !== _logIdentifier) {
            return;
        }
        var argv = [];
        for (var i = 0; i < arguments.length; i++) {
            argv.push(arguments[i]);
        }
        var fm = argv.shift();
        var msg;
        try {
            msg = vsprintf(fm, argv);
        } catch (e) {
            msg = fmt;
        }
        _call('log', {
            'msg': msg
        });
    }

    function _call(func, params, callback) {
        var curFuncIdentifier = __WeixinJSBridge.call;
        if (curFuncIdentifier !== _callIdentifier) {
            return;
        }
        if (!func || typeof func !== 'string') {
            return;
        }
        if (typeof params !== 'object') {
            params = {};
        }

        var callbackID = (_callback_count++).toString();

        if (typeof callback === 'function') {
            _callback_map[callbackID] = callback;
        }

        var arr = new Array;
        arr[0] = _context_val;
        arr[1] = _xxyy;
        var str = arr.join("");
        var msgSha = '';
        if (_isUseMd5 === 'yes') {

            var shaObj = CryptoJS.SHA1(str);
            msgSha = shaObj.toString();
        }


        params[_CONTEXT_KEY] = msgSha;


        var msgObj = {
            'func': func,
            'params': params
        };
        msgObj[_MESSAGE_TYPE] = 'call';
        msgObj[_CALLBACK_ID] = callbackID;

        _sendMessage(JSON.stringify(msgObj));
    }

    function _on(event, callback) {
        if (!event || typeof event !== 'string') {
            return;
        }

        if (typeof callback !== 'function') {
            return;
        }

        _event_hook_map[event] = callback;
    }

    function _onfor3rd(event, callback) {
        var curFuncIdentifier = __WeixinJSBridge.on;
        if (curFuncIdentifier !== _onfor3rdIdentifier) {
            return;
        }
        if (!event || typeof event !== 'string') {
            return;
        }

        if (typeof callback !== 'function') {
            return;
        }

        _event_hook_map_for3rd[event] = callback;
    }


    function _emit(event, argv) {
        if (typeof _event_hook_map_for3rd[event] === 'function' && _isIn3rdApiList(event)) {
            _event_hook_map_for3rd[event](argv);
        } else if (typeof _event_hook_map[event] === 'function') {
            _event_hook_map[event](argv);
        }

    }

    function _hasOnHandler(event) {
        return typeof _event_hook_map[event] === 'function';
    }

    function _loadedImageByUrl(imgUrl, cb) {
        var newImg = new Image();
        var isLoaded = false;
        newImg.onload = function() {
            if (!isLoaded) {
                isLoaded = true;
                cb(newImg);
            };
        };
        newImg.src = imgUrl;
        setTimeout(function() {
            if (!isLoaded) {
                isLoaded = true;
                cb(newImg);
            }
        }, 1000);
    }

    function _getImageDataAsBase64(inputImg, cb) {
        // Create an empty canvas element
        var _getBase64Impl = function(img) {
            var re_data_url = /^data:image\/(png|jpg|jpeg|tiff|gif|bmp);base64,/i;

            var dataURL = '';

            if (img.src.match(re_data_url)) {
                dataURL = img.src;
            } else {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                // Copy the image contents to the canvas
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var fileExt = 'jpg';
                var m = img.src.match(/\.(png|jpg|jpeg|tiff|gif|bmp)$/i);
                if (m) {
                    fileExt = m[1].toLowerCase();
                }

                try {
                    dataURL = canvas.toDataURL("image/" + fileExt);
                } catch (err) {
                    _log(err.message);
                }
            }

            cb(dataURL.replace(re_data_url, ""), img, inputImg);
        };

        _loadedImageByUrl(inputImg.src, _getBase64Impl)
    }

    function _enable_old_UrlStyleImagePreviews() {
        var old_prefix = "weixin://viewimage/";
        _WXJS('a[href^="weixin://viewimage/"]').on('click', function(e) {
            var cur = '';
            var link;
            if (typeof e.target.href === 'string' && e.target.href.search(old_prefix) === 0) {
                link = e.target;
            } else {
                link = _WXJS(e.target).parents('a[href^="weixin://viewimage/"]')[0];
            }
            cur = link.href.substr(old_prefix.length);
            var allLinks = _WXJS('a[href^="weixin://viewimage/"]');
            var allUrls = [];
            for (var i = 0; i < allLinks.length; i++) {
                allUrls.push(allLinks[i].href.substr(old_prefix.length));
            }
            _call('imagePreview', {
                'urls': allUrls,
                'current': cur
            });

            e.preventDefault();
        });
    }

    function _enable_old_ReaderShareUrls() {
        var old_prefix = "weixin://readershare/";
        _WXJS('a[href^="weixin://readershare/"]').on('click', function(e) {
            e.preventDefault();

            _emit('menu:share:weibo', _session_data.shareWeiboData || {});
        });
        _WXJS('a[href^="weixin://readertimeline/"]').on('click', function(e) {
            e.preventDefault();

            _emit('menu:share:timeline', _session_data.shareTimelineData || {});
        });
    }

    function _enable_mediaPlayChangeNotify() {
        var audioElements = _WXJS("audio");

        audioElements.on('play', function() {
            _call('audioStateChanged', {
                'state': 'play'
            });
        });
        audioElements.on('ended', function() {
            _call('audioStateChanged', {
                'state': 'ended'
            });
        });
        audioElements.on('pause', function() {
            _call('audioStateChanged', {
                'state': 'pause'
            });
        });

        var videoElements = _WXJS("video");

        videoElements.on('play', function() {
            _call('videoStateChanged', {
                'state': 'play'
            });
        });
        videoElements.on('ended', function() {
            _call('videoStateChanged', {
                'state': 'ended'
            });
        });
        videoElements.on('pause', function() {
            _call('videoStateChanged', {
                'state': 'pause'
            });
        });
    }

    function _disableImageSelection() {
        var imgs = _WXJS('img');
        for (var i = 0; i < imgs.length; i++) {
            _WXJS(imgs[i])._wxjs_old_touch_callout = _WXJS(imgs[i]).css('-webkit-touch-callout');
            _WXJS(imgs[i])._wxjs_old_user_select = _WXJS(imgs[i]).css('-webkit-user-select');
        };
        _WXJS('img').css({
            '-webkit-touch-callout': 'none',
            '-webkit-user-select': 'none'
        });
    }

    function _restoreImageSelection() {
        var imgs = _WXJS('img');
        for (var i = 0; i < imgs.length; i++) {
            if (typeof _WXJS(imgs[i])._wxjs_old_touch_callout != 'undefined') {
                _WXJS(imgs[i]).css({
                    '-webkit-touch-callout': _WXJS(imgs[i])._wxjs_old_touch_callout,
                    '-webkit-user-select': _WXJS(imgs[i])._wxjs_old_user_select
                });
            }
        };
    }

    function _disableAlertView() {
        window.__wxjs_sys_alert = window.alert;
        window.alert = null;
        window.__wxjs_sys_prompt = window.prompt;
        window.prompt = null;
    }

    function _restoreAlertView() {
        window.alert = window.__wxjs_sys_alert;
        window.prompt = window.__wxjs_sys_prompt;
        delete window.__wxjs_sys_alert;
        delete window.__wxjs_sys_prompt;
    }

    function _setDefaultEventHandlers() {
        // set font
        _on('menu:setfont', function(argv) {
            if (typeof changefont === 'function') {
                var num = parseInt(argv.fontSize);
                //_log('set font size with changefont: %s',argv.fontSize);
                changefont(num);
                return;
            }

            // 如果是由于第一次自动触发的，而且又是默认参数。则直接返回吧。不需要调用了。这里可能是部分webkit crash的原因。
            if (argv.isFirstAutoSet && (argv.fontSize === '2' || argv.fontScale === '100')) {
                return;
            }

            // ios4及以下的系统在设置字体时会卡死，这里直接返回。
            var sys = _env('system');
            if (typeof sys === 'string' && sys.indexOf('iPhone OS') >= 0 && Number(sys.substr(sys.indexOf('.') - 1, 1)) <= 4) {
                //_log('ios4 set font!');
                return;
            }

            // fallback
            var s;

            var num = parseInt(argv.fontScale);
            if (num >= 50 && num <= 500) s = argv.fontScale + '%';
            else {
                switch (argv.fontSize) {
                    case '1':
                        s = '80%';
                        break;
                    case '2':
                        s = '100%';
                        break;
                    case '3':
                        s = '120%';
                        break;
                    case '4':
                        s = '140%';
                        break;
                    default:
                        return;
                }
            }
            //_log('set font size with webkitTextSizeAdjust: %s',argv.fontSize);

            document.getElementsByTagName('body')[0].style.webkitTextSizeAdjust = s;
        });

        // 获取页面图片算法：
        // 在页面中找到第一个最小边大于290的图片，如果1秒内找不到，则返回空（不带图分享）。
        var getSharePreviewImage = function(cb) {

            var isCalled = false;

            var callCB = function(_img) {
                if (isCalled) {
                    return;
                }
                isCalled = true;

                cb(_img);
            }

            var _allImgs = _WXJS('img');
            if (_allImgs.length == 0) {
                return callCB();
            }

            // 过滤掉重复的图片
            var _srcs = {};
            var allImgs = [];
            for (var i = 0; i < _allImgs.length; i++) {
                var _img = _allImgs[i];

                // 过滤掉不可以见的图片
                if (_WXJS(_img).css('display') == 'none' || _WXJS(_img).css('visibility') == 'hidden') {
                    // _log('ivisable image !! ' + _img.src);
                    continue;
                }

                if (_srcs[_img.src]) {
                    // added
                } else {
                    _srcs[_img.src] = 1; // mark added
                    allImgs.push(_img);
                }
            }

            var results = [];

            var img;
            for (var i = 0; i < allImgs.length && i < 100; i++) {
                img = allImgs[i];

                var newImg = new Image();
                newImg.onload = function() {
                    this.isLoaded = true;
                    var loadedCount = 0;
                    for (var j = 0; j < results.length; j++) {
                        var res = results[j];
                        if (!res.isLoaded) {
                            break;
                        }
                        loadedCount++;
                        if (res.width > 290 && res.height > 290) {
                            callCB(res);
                            break;
                        }
                    }
                    if (loadedCount == results.length) {
                        // 全部都已经加载完了，但还是没有找到。
                        callCB();
                    }
                }
                newImg.src = img.src;
                results.push(newImg);
            }

            setTimeout(function() {
                for (var j = 0; j < results.length; j++) {
                    var res = results[j];
                    if (!res.isLoaded) {
                        continue;
                    }
                    if (res.width > 290 && res.height > 290) {
                        callCB(res);
                        return;
                    }
                }
                callCB();
            }, 1000);
        };

        // share timeline
        var shareTimelineFunc = function(argv) {
            _log('share timeline');

            var data;
            if (typeof argv.title === 'string') {
                data = argv;
                _call('shareTimeline', data);
            } else {
                data = {
                    // "img_url": "",
                    // "img_width": "",
                    // "img_height": "",
                    "link": document.documentURI || _session_data.init_url,
                    "desc": document.documentURI || _session_data.init_url,
                    "title": document.title
                };

                var shareFunc = function(_img) {
                    if (_img) {
                        data['img_url'] = _img.src;
                        data['img_width'] = _img.width;
                        data['img_height'] = _img.height;
                    }

                    _call('shareTimeline', data);
                };

                getSharePreviewImage(shareFunc);
            };
        };
        _on('menu:share:timeline', shareTimelineFunc);

        // share QQ
        var shareQQFunc = function(argv) {
            _log('share QQ');

            var data;
            if (typeof argv.title === 'string') {
                data = argv;
                _call('shareQQ', data);
            } else {
                data = {
                    // "img_url": "",
                    // "img_width": "",
                    // "img_height": "",
                    "link": document.documentURI || _session_data.init_url,
                    "desc": document.documentURI || _session_data.init_url,
                    "title": document.title
                };

                var shareFunc = function(_img) {
                    if (_img) {
                        data['img_url'] = _img.src;
                        data['img_width'] = _img.width;
                        data['img_height'] = _img.height;
                    }

                    _call('shareQQ', data);
                };

                getSharePreviewImage(shareFunc);
            };
        };
        _on('menu:share:qq', shareQQFunc);

        // share WeiBo App
        // 新的分享到微博接口，调起微博客户端做分享
        var shareWeiboAppFunc = function(argv) {
            _log('share Weibo App');

            var data;
            if (typeof argv.title === 'string') {
                data = argv;
                _call('shareWeiboApp', data);
            } else {
                data = {
                    // "img_url": "",
                    // "img_width": "",
                    // "img_height": "",
                    "link": document.documentURI || _session_data.init_url,
                    "desc": document.documentURI || _session_data.init_url,
                    "title": document.title
                };

                var shareFunc = function(_img) {
                    if (_img) {
                        data['img_url'] = _img.src;
                        data['img_width'] = _img.width;
                        data['img_height'] = _img.height;
                    }

                    _call('shareWeiboApp', data);
                };

                getSharePreviewImage(shareFunc);
            };
        };
        _on('menu:share:weiboApp', shareWeiboAppFunc);

        // share weibo
        // 旧版的分享到微博接口，走的是CGI 后台分享
        var shareWeiboFunc = function(argv) {
            _log('share weibo');

            var data;
            if (typeof argv.content === 'string') {
                data = argv;
            } else {
                data = {
                    "content": document.title,
                    "type": 'link',
                    "title": document.title,
                    "link": document.documentURI || _session_data.short_url || _session_data.init_url
                };
            }

            var shareFunc = function(_img) {
                if (_img) {
                    data['img_url'] = _img.src;
                }
                _call('shareWeibo', data);
            };

            getSharePreviewImage(shareFunc);
        };
        _on('menu:share:weibo', shareWeiboFunc);


        // shareQZone
        // 分享到QQ空间接口，调起空间客户端做分享
        var shareQZoneFunc = function(argv) {
            _log('share QZone');

            var data;
            if (typeof argv.title === 'string') {
                data = argv;
                _call('shareQZone', data);

            } else {
                data = {
                    "link": document.documentURI || _session_data.init_url,
                    "desc": document.documentURI || _session_data.init_url,
                    "title": document.title
                };

                var shareFunc = function(_img) {
                    if (_img) {
                        data['img_url'] = _img.src;
                        data['img_width'] = _img.width;
                        data['img_height'] = _img.height;
                    }

                    _call('shareQZone', data);
                };

                getSharePreviewImage(shareFunc);
            };
        };
        _on('menu:share:QZone', shareQZoneFunc);

        // general share
        _on('general:share', function(argv) {
            _log('general share');

            var generalShareCallback = function(o, r) {

                if (argv['shareTo'] === 'weibo') {
                    _call('shareWeibo', o, function(res) {
                        if (res.err_msg === "share_weibo:ok") {
                            res.err_msg = "general_share:ok";
                        } else if (res.err_msg === "share_weibo:cancel") {
                            res.err_msg = "general_share:cancel";
                        } else {
                            res.err_msg = "general_share:fail";
                        }
                        r(res);
                    });
                }

                if (argv['shareTo'] === 'friend' || argv['shareTo'] === 'favorite' || argv['shareTo'] === 'connector') {

                    o.img_width = 0;
                    o.img_height = 0;

                    var resHandler = function(res) {
                        if (res.err_msg === "send_app_msg:confirm") {
                            res.err_msg = "general_share:ok";
                        } else if (res.err_msg === "send_app_msg:cancel") {
                            res.err_msg = "general_share:cancel";
                        } else {
                            res.err_msg = "general_share:fail";
                        }
                        r(res);
                    };

                    if (o.img_url) {
                        _loadedImageByUrl(o.img_url, function(img) {
                            o.img_width = img.width;
                            o.img_height = img.height;

                            _call('sendAppMessage', o, resHandler);
                        });
                    } else {
                        _call('sendAppMessage', o, resHandler);
                    }
                }

                if (argv['shareTo'] === 'timeline') {
                    var resHandler = function(res) {
                        if (res.err_msg === "share_timeline:ok") {
                            res.err_msg = "general_share:ok";
                        } else if (res.err_msg === "share_timeline:cancel") {
                            res.err_msg = "general_share:cancel";
                        } else {
                            res.err_msg = "general_share:fail";
                        }
                        r(res);
                    };

                    o.img_width = 0;
                    o.img_height = 0;
                    if (o.img_url) {
                        _loadedImageByUrl(o.img_url, function(img) {
                            o.img_width = img.width;
                            o.img_height = img.height;

                            _call('shareTimeline', o, resHandler);
                        });
                    } else {
                        _call('shareTimeline', o, resHandler);
                    }
                }

                if (argv['shareTo'] === 'QQ') {
                    var resHandler = function(res) {
                        if (res.err_msg === "share_qq:ok") {
                            res.err_msg = "general_share:ok";
                        } else if (res.err_msg === "share_qq:cancel") {
                            res.err_msg = "general_share:cancel";
                        } else {
                            res.err_msg = "general_share:fail";
                        }
                        r(res);
                    };

                    o.img_width = 0;
                    o.img_height = 0;
                    if (o.img_url) {
                        _loadedImageByUrl(o.img_url, function(img) {
                            o.img_width = img.width;
                            o.img_height = img.height;

                            _call('shareQQ', o, resHandler);
                        });
                    } else {
                        _call('shareQQ', o, resHandler);
                    }
                }

                if (argv['shareTo'] === 'weiboApp') {
                    var resHandler = function(res) {
                        if (res.err_msg === "share_weiboApp:ok") {
                            res.err_msg = "general_share:ok";
                        } else if (res.err_msg === "share_weiboApp:cancel") {
                            res.err_msg = "general_share:cancel";
                        } else {
                            res.err_msg = "general_share:fail";
                        }
                        r(res);
                    };

                    o.img_width = 0;
                    o.img_height = 0;
                    if (o.img_url) {
                        _loadedImageByUrl(o.img_url, function(img) {
                            o.img_width = img.width;
                            o.img_height = img.height;

                            _call('shareWeiboApp', o, resHandler);
                        });
                    } else {
                        _call('shareWeiboApp', o, resHandler);
                    }
                }

                if (argv['shareTo'] === 'QZone') {
                    var resHandler = function(res) {
                        if (res.err_msg === "share_QZone:ok") {
                            res.err_msg = "general_share:ok";
                        } else if (res.err_msg === "share_QZone:cancel") {
                            res.err_msg = "general_share:cancel";
                        } else {
                            res.err_msg = "general_share:fail";
                        }
                        r(res);
                    };

                    o.img_width = 0;
                    o.img_height = 0;
                    if (o.img_url) {
                        _loadedImageByUrl(o.img_url, function(img) {
                            o.img_width = img.width;
                            o.img_height = img.height;

                            _call('shareQZone', o, resHandler);
                        });
                    } else {
                        _call('shareQZone', o, resHandler);
                    }
                }
            };

            var oldShareCallback = function(r) {
                // 新的通用分享失败，回归到旧的各自的分享接口
                _log('general share failed. fallback to original share' + argv['shareTo']);

                if (argv['shareTo'] === 'weibo') {
                    _emit('menu:share:weibo', argv);
                }

                if (argv['shareTo'] === 'friend' || argv['shareTo'] === 'favorite' || argv['shareTo'] === 'connector') {
                    _emit('menu:share:appmessage', argv);
                }

                if (argv['shareTo'] === 'timeline') {
                    _emit('menu:share:timeline', argv);
                }
            };

            var generaShareEventHandler = _event_hook_map_for3rd["menu:general:share"];
            // 调用网页提供的接口
            if (typeof generaShareEventHandler === "function" && _isIn3rdApiList("menu:general:share")) {
                argv.generalShare = generalShareCallback;
                // _emit('menu:general:share', argv);
                generaShareEventHandler(argv);
            }
            // 网页未提供新接口。尝试使用旧接口，如果还没有，就使用默认接口。
            else {
                // 判断下否是有旧接口支持
                if (argv['shareTo'] === 'weibo') {
                    if (_event_hook_map["menu:share:weibo"] != shareWeiboFunc) {
                        _emit('menu:share:weibo', argv);
                        return;
                    }
                }

                if (argv['shareTo'] === 'friend' || argv['shareTo'] === 'favorite' || argv['shareTo'] === 'connector') {
                    // if (_event_hook_map["menu:share:appmessage"] != shareWeiboFunc)
                    {
                        _emit('menu:share:appmessage', argv);
                        return;
                    }
                }

                if (argv['shareTo'] === 'timeline') {
                    // if (_event_hook_map["menu:share:timeline"] != shareWeiboFunc)
                    {
                        _emit('menu:share:timeline', argv);
                        return;
                    }
                }

                if (argv['shareTo'] == 'QQ') {
                    // if (_event_hook_map["menu:share:qq"] != shareWeiboFunc) {
                    _emit('menu:share:qq', argv);
                    return;
                    // }
                }

                if (argv['shareTo'] == 'weiboApp') {
                    // if (_event_hook_map["menu:share:weiboApp"] != shareWeiboFunc) {
                    _emit('menu:share:weiboApp', argv);
                    return;
                    // }
                }

                if (argv['shareTo'] == 'QZone') {
                    _emit('menu:share:QZone', argv);
                    return;
                }

                var internalShareObjectData = {
                    $: _WXJS,
                    fail: oldShareCallback,
                    success: generalShareCallback
                };
                _log('try default share handler');
                _emit('__internal:get_share_object', internalShareObjectData);
            }
        });

        // share with app message
        var sendAppMessageFunc = function(argv) {
            _log('share appmessage');

            var data;
            if (typeof argv.title === 'string') {
                data = argv;
                _call('sendAppMessage', data);
            } else {
                data = {
                    // "appid" : ""
                    // "img_url": "",
                    // "img_width": "",
                    // "img_height": "",
                    "link": document.documentURI || _session_data.init_url,
                    "desc": document.documentURI || _session_data.init_url,
                    "title": document.title
                };

                var shareFunc = function(_img) {
                    if (_img) {
                        data['img_url'] = _img.src;
                        data['img_width'] = _img.width;
                        data['img_height'] = _img.height;
                    }

                    _call('sendAppMessage', data);
                };

                getSharePreviewImage(shareFunc);
            }
        };
        _on('menu:share:appmessage', sendAppMessageFunc);

        // menu:share:email
        _on('menu:share:email', function(argv) {
            _log('share email');

            var data;
            if (typeof argv.title === 'string') {
                data = argv;
                _call('sendEmail', data);
            } else {
                data = {
                    "content": document.documentURI || _session_data.init_url,
                    "title": document.title
                };
                _call('sendEmail', data);
            }
        });

        // share to facebook
        _on('menu:share:facebook', function(argv) {
            _log('share facebook');

            var data;
            if (typeof argv.title === 'string') {
                data = argv;
                _call('shareFB', data);
            } else {
                data = {
                    // "appid" : ""
                    // "img_url": "",
                    // "img_width": "",
                    // "img_height": "",
                    "link": document.documentURI || _session_data.init_url,
                    "desc": document.documentURI || _session_data.init_url,
                    "title": document.title
                };

                var shareFunc = function(_img) {
                    if (_img) {
                        data['img_url'] = _img.src;
                        data['img_width'] = _img.width;
                        data['img_height'] = _img.height;
                    }

                    _call('shareFB', data);
                };

                getSharePreviewImage(shareFunc);
            }
        });

        function _getImageElementAtPoint(x, y) {
            var o = document.elementFromPoint(x, y);
            var e = o;
            while (e && e.tagName != "IMG") {
                e = e.parentNode;
            }

            // get child
            if (!e) {
                var traval = function(e, test) {
                    var c;
                    for (c in e.childNodes) {
                        if (test(c)) {
                            return c;
                        } else {
                            traval(c, test);
                        }
                    }
                    return null;
                };
                e = traval(o, function(d) {
                    return (d && d.tagName == "IMG");
                });
            }

            return (e && e.tagName == "IMG") ? e : null;
        }

        function getTop(e) {
            var offset = e.offsetTop;
            if (e.offsetParent != null) offset += getTop(e.offsetParent);
            return offset;
        }

        function getLeft(e) {
            var offset = e.offsetLeft;
            if (e.offsetParent != null) offset += getLeft(e.offsetParent);
            return offset;
        }



        // share to facebook
        _on('ui:longpress', function(argv) {
            _log("longpress at (" + argv.x + "," + argv.y + ")");
            var el = _getImageElementAtPoint(argv.x, argv.y);

            if (!el) {
                _log("cannot find image at (" + argv.x + "," + argv.y + ")");
                return;
            }

            _getImageDataAsBase64(el, function(base64Data, img, el) {
                _call('saveImage', {
                    'base64DataString': base64Data,
                    'url': img.src,
                    'elementWidth': el.offsetWidth,
                    'elementHeight': el.offsetHeight,
                    'elementTop': getTop(el),
                    'elementLeft': getLeft(el),
                    'pointX': argv.x,
                    'pointY': argv.y,
                });
            });
        });

        // the first event
        _on('sys:init', function(ses) {
            _session_data = ses;

            // bridge ready
            var readyEvent = document.createEvent('Events');
            readyEvent.initEvent('WeixinJSBridgeReady');
            document.dispatchEvent(readyEvent);
        });
        _on('sys:bridged', function(ses) {
            // _log(_env('version'));
            // _log(_env('language'));
            // _log(_env('timezone'));
            // _log(_env('cpu'));
            // _log(_env('model'));
            if (_env('webview_type') === '1') {
                _emit('menu:setfont', {
                    'fontSize': _env('init_font_size'),
                    'isFirstAutoSet': 1
                });
            }

            try {
                _enable_old_UrlStyleImagePreviews();
                _enable_old_ReaderShareUrls();
                _enable_mediaPlayChangeNotify();
            } catch (e) {
                _log('error %s', e);
            }
        });
                                                                                                                                                                                                             
        // onHistoryBack
        _on('onHistoryBack',function(ses){
            _call('historyBack');
        });
    }

    function _test_start() {
        _emit('sys:init', {});
        _emit('sys:bridged', {});
    }

    var __WeixinJSBridge = {
        // public
        invoke: _call,
        call: _call,
        on: _onfor3rd,
        env: _env,
        log: _log,

        // private
        //        emit:_emit,
        // _test_start:_test_start,
        _fetchQueue: _fetchQueue,
        _handleMessageFromWeixin: _handleMessageFromWeixin
    };
    // Copy all but undefined properties from one or more objects to the `window.WeixinJSBridge` object.
    if (window.WeixinJSBridge) {
        _WXJS.extend(window.WeixinJSBridge, __WeixinJSBridge);
    } else {
        window.WeixinJSBridge = __WeixinJSBridge;
    }

    _setDefaultEventHandlers();

    _WXJS.JSON = JSON;
    _WXJS.disableImageSelection = _disableImageSelection;
    _WXJS.restoreImageSelection = _restoreImageSelection;
    _WXJS.disableAlertView = _disableAlertView;
    _WXJS.restoreAlertView = _restoreAlertView;

    // _WXJS("document").ready(function(){
    //     _call("domReady");
    // });

})();
