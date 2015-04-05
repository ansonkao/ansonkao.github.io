function Note(params) {
    return this.start = params.start || 0, this.end = params.end || 0, this.key = params.key || 60, 
    this.velocity = params.velocity || 127, this.active = params.active || !1, this.selected = params.selected || !1, 
    this;
}

!function(global) {
    function index(array, item) {
        for (var i = array.length; i--; ) if (array[i] === item) return i;
        return -1;
    }
    function compareArray(a1, a2) {
        if (a1.length != a2.length) return !1;
        for (var i = 0; i < a1.length; i++) if (a1[i] !== a2[i]) return !1;
        return !0;
    }
    function updateModifierKey(event) {
        for (k in _mods) _mods[k] = event[modifierMap[k]];
    }
    function dispatch(event) {
        var key, handler, k, i, modifiersMatch, scope;
        if (key = event.keyCode, -1 == index(_downKeys, key) && _downKeys.push(key), (93 == key || 224 == key) && (key = 91), 
        key in _mods) {
            _mods[key] = !0;
            for (k in _MODIFIERS) _MODIFIERS[k] == key && (assignKey[k] = !0);
        } else if (updateModifierKey(event), assignKey.filter.call(this, event) && key in _handlers) for (scope = getScope(), 
        i = 0; i < _handlers[key].length; i++) if (handler = _handlers[key][i], handler.scope == scope || "all" == handler.scope) {
            modifiersMatch = handler.mods.length > 0;
            for (k in _mods) (!_mods[k] && index(handler.mods, +k) > -1 || _mods[k] && -1 == index(handler.mods, +k)) && (modifiersMatch = !1);
            (0 != handler.mods.length || _mods[16] || _mods[18] || _mods[17] || _mods[91]) && !modifiersMatch || handler.method(event, handler) === !1 && (event.preventDefault ? event.preventDefault() : event.returnValue = !1, 
            event.stopPropagation && event.stopPropagation(), event.cancelBubble && (event.cancelBubble = !0));
        }
    }
    function clearModifier(event) {
        var k, key = event.keyCode, i = index(_downKeys, key);
        if (i >= 0 && _downKeys.splice(i, 1), (93 == key || 224 == key) && (key = 91), key in _mods) {
            _mods[key] = !1;
            for (k in _MODIFIERS) _MODIFIERS[k] == key && (assignKey[k] = !1);
        }
    }
    function resetModifiers() {
        for (k in _mods) _mods[k] = !1;
        for (k in _MODIFIERS) assignKey[k] = !1;
    }
    function assignKey(key, scope, method) {
        var keys, mods;
        keys = getKeys(key), void 0 === method && (method = scope, scope = "all");
        for (var i = 0; i < keys.length; i++) mods = [], key = keys[i].split("+"), key.length > 1 && (mods = getMods(key), 
        key = [ key[key.length - 1] ]), key = key[0], key = code(key), key in _handlers || (_handlers[key] = []), 
        _handlers[key].push({
            shortcut: keys[i],
            scope: scope,
            method: method,
            key: keys[i],
            mods: mods
        });
    }
    function unbindKey(key, scope) {
        var multipleKeys, keys, i, j, obj, mods = [];
        for (multipleKeys = getKeys(key), j = 0; j < multipleKeys.length; j++) {
            if (keys = multipleKeys[j].split("+"), keys.length > 1 && (mods = getMods(keys)), 
            key = keys[keys.length - 1], key = code(key), void 0 === scope && (scope = getScope()), 
            !_handlers[key]) return;
            for (i = 0; i < _handlers[key].length; i++) obj = _handlers[key][i], obj.scope === scope && compareArray(obj.mods, mods) && (_handlers[key][i] = {});
        }
    }
    function isPressed(keyCode) {
        return "string" == typeof keyCode && (keyCode = code(keyCode)), -1 != index(_downKeys, keyCode);
    }
    function getPressedKeyCodes() {
        return _downKeys.slice(0);
    }
    function filter(event) {
        var tagName = (event.target || event.srcElement).tagName;
        return !("INPUT" == tagName || "SELECT" == tagName || "TEXTAREA" == tagName);
    }
    function setScope(scope) {
        _scope = scope || "all";
    }
    function getScope() {
        return _scope || "all";
    }
    function deleteScope(scope) {
        var key, handlers, i;
        for (key in _handlers) for (handlers = _handlers[key], i = 0; i < handlers.length; ) handlers[i].scope === scope ? handlers.splice(i, 1) : i++;
    }
    function getKeys(key) {
        var keys;
        return key = key.replace(/\s/g, ""), keys = key.split(","), "" == keys[keys.length - 1] && (keys[keys.length - 2] += ","), 
        keys;
    }
    function getMods(key) {
        for (var mods = key.slice(0, key.length - 1), mi = 0; mi < mods.length; mi++) mods[mi] = _MODIFIERS[mods[mi]];
        return mods;
    }
    function addEvent(object, event, method) {
        object.addEventListener ? object.addEventListener(event, method, !1) : object.attachEvent && object.attachEvent("on" + event, function() {
            method(window.event);
        });
    }
    function noConflict() {
        var k = global.key;
        return global.key = previousKey, k;
    }
    var k, _handlers = {}, _mods = {
        16: !1,
        18: !1,
        17: !1,
        91: !1
    }, _scope = "all", _MODIFIERS = {
        "⇧": 16,
        shift: 16,
        "⌥": 18,
        alt: 18,
        option: 18,
        "⌃": 17,
        ctrl: 17,
        control: 17,
        "⌘": 91,
        command: 91
    }, _MAP = {
        backspace: 8,
        tab: 9,
        clear: 12,
        enter: 13,
        "return": 13,
        esc: 27,
        escape: 27,
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        del: 46,
        "delete": 46,
        home: 36,
        end: 35,
        pageup: 33,
        pagedown: 34,
        ",": 188,
        ".": 190,
        "/": 191,
        "`": 192,
        "-": 189,
        "=": 187,
        ";": 186,
        "'": 222,
        "[": 219,
        "]": 221,
        "\\": 220
    }, code = function(x) {
        return _MAP[x] || x.toUpperCase().charCodeAt(0);
    }, _downKeys = [];
    for (k = 1; 20 > k; k++) _MAP["f" + k] = 111 + k;
    var modifierMap = {
        16: "shiftKey",
        18: "altKey",
        17: "ctrlKey",
        91: "metaKey"
    };
    for (k in _MODIFIERS) assignKey[k] = !1;
    addEvent(document, "keydown", function(event) {
        dispatch(event);
    }), addEvent(document, "keyup", clearModifier), addEvent(window, "focus", resetModifiers);
    var previousKey = global.key;
    global.key = assignKey, global.key.setScope = setScope, global.key.getScope = getScope, 
    global.key.deleteScope = deleteScope, global.key.filter = filter, global.key.isPressed = isPressed, 
    global.key.getPressedKeyCodes = getPressedKeyCodes, global.key.noConflict = noConflict, 
    global.key.unbind = unbindKey, "undefined" != typeof module && (module.exports = assignKey);
}(this);

var CurseWords = function() {
    var currentTarget = null, targetCounter = 0, targets = [], enterHandlers = [], hoverHandlers = [], exitHandlers = [], currentImplicitCursor = "default", currentExplicitCursor = null, body = document.getElementsByTagName("body")[0], addImplicitCursorHandler = function(targetElement, enterHandler, hoverHandler, exitHandler) {
        targets[targetCounter] = targetElement, enterHandlers[targetCounter] = enterHandler, 
        hoverHandlers[targetCounter] = hoverHandler, exitHandlers[targetCounter] = exitHandler, 
        targetCounter++;
    }, setExplicitCursor = function(newCursor) {
        currentExplicitCursor = newCursor, drawCursor();
    }, clearExplicitCursor = function() {
        currentExplicitCursor = null, drawCursor();
    }, drawCursor = function() {
        var newCursor = null;
        newCursor = currentExplicitCursor ? currentExplicitCursor : currentImplicitCursor;
        var classes = body.className.split(" ");
        classes = classes.filter(function(c) {
            return 0 !== c.lastIndexOf("curse-words-", 0);
        }), classes.push("curse-words-" + newCursor), body.className = classes.join(" ");
    };
    return document.addEventListener("mouseover", function(e) {
        for (var i = 0; i < targets.length; i++) if (e.target == targets[i]) return null != currentTarget && exitHandlers[currentTarget](e), 
        currentTarget = i, void enterHandlers[currentTarget](e);
        null != currentTarget && exitHandlers[currentTarget](e), currentImplicitCursor = "default", 
        drawCursor(), currentTarget = null;
    }), document.addEventListener("mousemove", function(e) {
        if (null != currentTarget) {
            var newCursor = hoverHandlers[currentTarget](e);
            newCursor && newCursor != currentImplicitCursor && (currentImplicitCursor = newCursor, 
            drawCursor());
        }
    }), {
        addImplicitCursorHandler: addImplicitCursorHandler,
        setExplicitCursor: setExplicitCursor,
        clearExplicitCursor: clearExplicitCursor
    };
}(), DragKing = function() {
    function rootDropHandler(ignoreLeftClick) {
        return function(e) {
            isDragging() && e.which > ignoreLeftClick | 0 && (dropHandlers[currentTarget](e), 
            currentTarget = null);
        };
    }
    var currentTarget = null, targetCounter = 0, gripHandlers = [], dragHandlers = [], dropHandlers = [], getCurrentTarget = function() {
        return currentTarget;
    }, isDragging = function() {
        return null !== currentTarget;
    }, addHandler = function(target, gripHandler, dragHandler, dropHandler) {
        var mousedownHandler = function(uid) {
            return function(e) {
                1 == e.which && (currentTarget = uid, gripHandlers[uid](e), e.preventDefault());
            };
        }(targetCounter);
        target.addEventListener("mousedown", mousedownHandler), gripHandlers[targetCounter] = gripHandler, 
        dragHandlers[targetCounter] = dragHandler, dropHandlers[targetCounter] = dropHandler, 
        targetCounter++;
    };
    return document.onmousewheel = function(e) {
        isDragging() && e.preventDefault();
    }, document.addEventListener("mousemove", function(e) {
        isDragging() && dragHandlers[currentTarget](e);
    }), document.addEventListener("mouseup", rootDropHandler(!1)), document.addEventListener("mousedown", rootDropHandler(!0)), 
    {
        getCurrentTarget: getCurrentTarget,
        isDragging: isDragging,
        addHandler: addHandler
    };
}();

GripScroll = function(key) {
    function Scrollbar(container, params) {
        this.container = container, this.canvas = container.appendChild(document.createElement("canvas")), 
        this.canvasContext = this.canvas.getContext("2d"), this.canvas.className = "bar " + params.direction, 
        this.direction = params.direction, this.perpendicular = {
            x: "y",
            y: "x"
        }[this.direction], this.smallestZoom = .125, this.isHovering = !1, this.isDragging = !1, 
        this.wasHovering = null, this.wasDragging = null, this.width = null, this.height = null, 
        this.model = {
            min: params.min || 0,
            max: params.max || 1
        }, this.oldDrawModel = {
            min: null,
            max: null
        };
        var that = this;
        that.init(), window.addEventListener("resize", function() {
            that.init();
        });
        var whichGrip = null, startPosition = null, gripHandler = function(e) {
            that.isDragging = !0, startPosition = that.calculateCursorPosition(e), whichGrip = that.whichGrip(startPosition), 
            "mid" == whichGrip ? CurseWords.setExplicitCursor("grabbing") : whichGrip && CurseWords.setExplicitCursor(that.direction + "resize");
        }, dragHandler = function(e) {
            that.recalculateModel(e, whichGrip, startPosition);
        }, dropHandler = function(e) {
            that.isDragging = !1, CurseWords.clearExplicitCursor();
            var newModel = that.recalculateModel(e, whichGrip, startPosition);
            newModel && (that.save(newModel.min, "min"), that.save(newModel.max, "max"));
        };
        DragKing.addHandler(that.canvas, gripHandler, dragHandler, dropHandler);
        var enterHandler = function() {
            that.isHovering = !0, that.render();
        }, hoverHandler = function(e) {
            var newPosition = that.calculateCursorPosition(e), hoverGrip = that.whichGrip(newPosition), newCursor = null;
            switch (hoverGrip) {
              case "min":
                that.isHovering = !0, newCursor = that.direction + "resize";
                break;

              case "max":
                that.isHovering = !0, newCursor = that.direction + "resize";
                break;

              case "mid":
                that.isHovering = !0, newCursor = "grab";
                break;

              default:
                that.isHovering = !1, newCursor = "default";
            }
            return that.render(), newCursor;
        }, exitHandler = function() {
            that.isHovering = !1, that.render();
        };
        CurseWords.addImplicitCursorHandler(that.canvas, enterHandler, hoverHandler, exitHandler);
    }
    var GripScrollStack = [], add = function(container, params) {
        for (var i = 0; i < GripScrollStack.length; i++) if (GripScrollStack[i].container == container) return !1;
        params = validateParams(params), GripScrollStack.push({
            container: container,
            x: params.x ? new Scrollbar(container, {
                direction: "x",
                min: params.x.min,
                max: params.x.max
            }) : null,
            y: params.y ? new Scrollbar(container, {
                direction: "y",
                min: params.y.min,
                max: params.y.max
            }) : null
        }), container.classList.add("gripscroll"), params.x && container.addEventListener("gripscroll-update-x", function(e) {
            triggerUpdate(container, {
                xMin: e.gripScrollMin,
                xMax: e.gripScrollMax
            });
        }), params.y && container.addEventListener("gripscroll-update-y", function(e) {
            triggerUpdate(container, {
                yMin: e.gripScrollMin,
                yMax: e.gripScrollMax
            });
        });
        var currentGripScroll = GripScrollStack[GripScrollStack.length - 1];
        return container.addEventListener("wheel", function(e) {
            key.ctrl ? (currentGripScroll.x.zoomByAmount(e, "x"), currentGripScroll.y.zoomByAmount(e, "y")) : (currentGripScroll.x.moveByAmount(e.deltaX, "x"), 
            currentGripScroll.y.moveByAmount(e.deltaY, "y")), e.preventDefault();
        }), !0;
    }, validateParams = function(params) {
        return params || (params = {}), void 0 === params.x ? params.x = {
            min: 0,
            max: 1
        } : params.x && (void 0 === params.x.min && (params.x.min = 0), void 0 === params.x.max && (params.x.max = 1)), 
        void 0 === params.y ? params.y = {
            min: 0,
            max: 1
        } : params.y && (void 0 === params.y.min && (params.y.min = 0), void 0 === params.y.max && (params.y.max = 1)), 
        params;
    }, triggerUpdate = function(container, overrideValues) {
        for (var i = 0; i < GripScrollStack.length; i++) if (GripScrollStack[i].container == container) var thisGripScroll = GripScrollStack[i];
        if (!thisGripScroll) return !1;
        var event = new CustomEvent("gripscroll-update");
        return event.gripScrollX = {}, event.gripScrollX.min = overrideValues && overrideValues.xMin || thisGripScroll.x && thisGripScroll.x.model.min || null, 
        event.gripScrollX.max = overrideValues && overrideValues.xMax || thisGripScroll.x && thisGripScroll.x.model.max || null, 
        event.gripScrollY = {}, event.gripScrollY.min = overrideValues && overrideValues.yMin || thisGripScroll.y && thisGripScroll.y.model.min || null, 
        event.gripScrollY.max = overrideValues && overrideValues.yMax || thisGripScroll.y && thisGripScroll.y.model.max || null, 
        container.dispatchEvent(event), !0;
    };
    return Scrollbar.prototype.init = function() {
        switch (this.direction) {
          case "x":
            this.canvas.width = this.width = this.container.clientWidth - 20, this.canvas.height = this.height = 10;
            break;

          case "y":
            this.canvas.width = this.width = 10, this.canvas.height = this.height = this.container.clientHeight - 20;
        }
        this.wasHovering = null, this.wasDragging = null, this.oldDrawModel.min = null, 
        this.oldDrawModel.max = null, this.render(this.model.min, this.model.max);
    }, Scrollbar.prototype.render = function(newMin, newMax) {
        if (newMin || 0 === newMin ? newMax || (newMax = newMin.max, newMin = newMin.min) : (newMin = this.model.min, 
        newMax = this.model.max), newMin != this.oldDrawModel.min || this.wasHovering != this.isHovering || newMax != this.oldDrawModel.max || this.wasDragging != this.isDragging) {
            switch (this.canvasContext.clear(), this.isHovering || this.isDragging ? this.canvas.classList.add("is-mouseover") : this.canvas.classList.remove("is-mouseover"), 
            this.canvasContext.strokeStyle = "rgb(64,64,64)", this.canvasContext.fillStyle = "rgb(96,96,96)", 
            this.direction) {
              case "x":
                this.canvasContext.roundRect(this.width * newMin, 0, this.width * newMax, this.height, 5, !0, !0);
                break;

              case "y":
                this.canvasContext.roundRect(0, this.height * newMin, this.width, this.height * newMax, 5, !0, !0);
            }
            if (newMin != this.oldDrawModel.min || newMax != this.oldDrawModel.max) {
                var event = new CustomEvent("gripscroll-update-" + this.direction);
                event.gripScrollMin = newMin, event.gripScrollMax = newMax, this.container.dispatchEvent(event);
            }
            this.wasHovering = this.isHovering, this.wasDragging = this.isDragging, this.oldDrawModel.min = newMin, 
            this.oldDrawModel.max = newMax;
        }
    }, Scrollbar.prototype.save = function(newValue, minOrMax) {
        this.model[minOrMax] = newValue;
    }, Scrollbar.prototype.calculateCursorPosition = function(e) {
        var offset = this.canvas.clientXYDirectional(this.direction), mousePixels = e.clientXYDirectional(this.direction), mouseRange = this.canvas.clientLength(this.direction), newPosition = (mousePixels - offset) / mouseRange;
        return newPosition;
    }, Scrollbar.prototype.whichGrip = function(cursorPosition) {
        return Math.abs(cursorPosition - this.model.min) < this.pxToPct(5) ? "min" : Math.abs(cursorPosition - this.model.max) < this.pxToPct(5) ? "max" : cursorPosition > this.model.min && cursorPosition < this.model.max ? "mid" : null;
    }, Scrollbar.prototype.isOutsideDragZone = function(e) {
        var perpendicularOffset = this.canvas.clientXYDirectional(this.perpendicular, 1), perpendicularMousePixels = e.clientXYDirectional(this.perpendicular, 1);
        return Math.abs(perpendicularMousePixels - perpendicularOffset) > 150 ? !0 : void 0;
    }, Scrollbar.prototype.validateEndPosition = function(newPosition, minOrMax) {
        switch (minOrMax) {
          case "min":
            0 > newPosition ? newPosition = 0 : newPosition > this.model.max - this.smallestZoom && (newPosition = this.model.max - this.smallestZoom);
            break;

          case "max":
            newPosition > 1 ? newPosition = 1 : newPosition < this.model.min + this.smallestZoom && (newPosition = this.model.min + this.smallestZoom);
        }
        return newPosition;
    }, Scrollbar.prototype.validateBothEndPositions = function(changePosition) {
        var newMin = this.model.min + changePosition;
        0 > newMin && (changePosition -= newMin);
        var newMax = this.model.max + changePosition;
        newMax > 1 && (changePosition -= newMax - 1);
        var newModel = {};
        return newModel.min = changePosition + this.model.min, newModel.max = changePosition + this.model.max, 
        newModel;
    }, Scrollbar.prototype.recalculateModel = function(e, whichGrip, startPosition) {
        if (whichGrip && this.isOutsideDragZone(e)) return this.render(this.model), null;
        if ("mid" == whichGrip) {
            var newPosition = this.calculateCursorPosition(e), newModel = this.validateBothEndPositions(newPosition - startPosition);
            return this.render(newModel), newModel;
        }
        if ("min" == whichGrip || "max" == whichGrip) {
            var newPosition = this.calculateCursorPosition(e);
            newPosition = this.validateEndPosition(newPosition, whichGrip);
            var otherGrip = {
                min: "max",
                max: "min"
            }[whichGrip], newModel = {};
            return newModel[whichGrip] = newPosition, newModel[otherGrip] = this.model[otherGrip], 
            this.render(newModel), newModel;
        }
        return null;
    }, Scrollbar.prototype.moveByAmount = function(amount, direction) {
        var mouseRange = this.canvas.clientLength(direction), deltaPercent = amount / (3 * mouseRange);
        this.model = this.validateBothEndPositions(deltaPercent), this.render(this.model);
    }, Scrollbar.prototype.zoomByAmount = function(e) {
        var deltaPercent = .001 * e.deltaY, zoomTarget = this.calculateCursorPosition(e);
        this.model.min = this.validateEndPosition(this.model.min + deltaPercent * (0 + 2 * zoomTarget), "min"), 
        this.model.max = this.validateEndPosition(this.model.max - deltaPercent * (2 - 2 * zoomTarget), "max"), 
        this.render(this.model);
    }, Scrollbar.prototype.pxToPct = function() {
        switch (this.direction) {
          case "x":
            return 5 / this.width;

          case "y":
            return 5 / this.height;
        }
    }, {
        add: add,
        triggerUpdate: triggerUpdate
    };
}(key), MouseEvent.prototype.clientXYDirectional = MouseEvent.prototype.clientXYDirectional || function(axis, sign) {
    switch (sign = void 0 === sign ? 1 : sign, axis) {
      case "x":
        switch (sign > 0) {
          case !0:
            return this.clientX;

          case !1:
            return window.innerWidth - this.clientX;
        }

      case "y":
        switch (sign > 0) {
          case !0:
            return this.clientY;

          case !1:
            return window.innerHeight - this.clientY;
        }

      default:
        return null;
    }
}, Element.prototype.offsetDirectional = Element.prototype.offsetDirectional || function(axis, sign) {
    switch (sign = void 0 === sign ? 1 : sign, axis) {
      case "x":
        switch (sign > 0) {
          case !0:
            return this.offsetLeft;

          case !1:
            return this.parentElement.offsetWidth - this.offsetWidth - this.offsetLeft;
        }

      case "y":
        switch (sign > 0) {
          case !0:
            return this.offsetTop;

          case !1:
            return this.parentElement.offsetHeight - this.offsetHeight - this.offsetTop;
        }

      default:
        return null;
    }
}, Element.prototype.clientXYDirectional = Element.prototype.clientXYDirectional || function(axis, sign) {
    sign = void 0 === sign ? 1 : sign;
    var rect = this.getBoundingClientRect();
    switch (axis) {
      case "x":
        switch (sign > 0) {
          case !0:
            return rect.left;

          case !1:
            return window.innerWidth - rect.left - rect.width;
        }

      case "y":
        switch (sign > 0) {
          case !0:
            return rect.top;

          case !1:
            return window.innerHeight - rect.top - rect.height;
        }

      default:
        return null;
    }
}, Element.prototype.clientLength = Element.prototype.clientLength || function(axis) {
    var rect = this.getBoundingClientRect();
    switch (axis) {
      default:
      case "x":
        return rect.width;

      case "y":
        return rect.height;
    }
}, CanvasRenderingContext2D.prototype.clear = CanvasRenderingContext2D.prototype.clear || function(preserveTransform) {
    preserveTransform && (this.save(), this.setTransform(1, 0, 0, 1, 0, 0)), this.clearRect(0, 0, this.canvas.width, this.canvas.height), 
    preserveTransform && this.restore();
}, CanvasRenderingContext2D.prototype.roundRect = CanvasRenderingContext2D.prototype.roundRect || function(x1, y1, x2, y2, radius, fill, stroke) {
    this.beginPath(), this.moveTo(.5 + x1 + radius, .5 + y1), this.lineTo(-.5 + x2 - radius, .5 + y1), 
    this.quadraticCurveTo(-.5 + x2, .5 + y1, -.5 + x2, .5 + y1 + radius), this.lineTo(-.5 + x2, -.5 + y2 - radius), 
    this.quadraticCurveTo(-.5 + x2, -.5 + y2, -.5 + x2 - radius, -.5 + y2), this.lineTo(.5 + x1 + radius, -.5 + y2), 
    this.quadraticCurveTo(.5 + x1, -.5 + y2, .5 + x1, -.5 + y2 - radius), this.lineTo(.5 + x1, .5 + y1 + radius), 
    this.quadraticCurveTo(.5 + x1, .5 + y1, .5 + x1 + radius, .5 + y1), this.closePath(), 
    stroke && this.stroke(), fill && this.fill();
}, Note.prototype.activate = function() {
    this.active = !0;
}, Note.prototype.select = function() {
    this.selected = !0;
};

var PIANO = function(key) {
    "use strict";
    var $ = {
        controller: {},
        model: {},
        view: {}
    };
    return $.controller.mouseMove = function() {}, $.controller.mouseHover = function() {
        var enterHandler = function() {
            $.model.isHovering = !0;
        }, hoverHandler = function(e) {
            if ($.model.isDragging) return null;
            var timePosition = $.model.yCoordToBar(e.clientY - $.model.canvas.clientXYDirectional("y")), keyPosition = $.model.xCoordToKey(e.clientX - $.model.canvas.clientXYDirectional("x")), hoveredNote = $.model.getHoveredNote(timePosition, keyPosition), hoverAction = $.model.getHoverAction(timePosition, hoveredNote);
            $.view.renderFreshGrid(), $.view.renderNotes();
            var newCursor = null;
            switch (hoverAction) {
              case "min":
                newCursor = "xresize";
                break;

              case "max":
                newCursor = "xresize";
                break;

              case "mid":
                newCursor = "default";
                break;

              default:
                newCursor = "default";
            }
            return newCursor;
        }, exitHandler = function() {
            $.view.renderFreshGrid(), $.view.renderNotes();
        };
        CurseWords.addImplicitCursorHandler($.model.canvas, enterHandler, hoverHandler, exitHandler);
    }, $.controller.mouseDrag = function() {
        var dragAction = null, startEvent = null, currentNote = null, gripHandler = function(e) {
            startEvent = e;
            var timePosition = $.model.yCoordToBar(e.clientY - $.model.canvas.clientXYDirectional("y")), keyPosition = $.model.xCoordToKey(e.clientX - $.model.canvas.clientXYDirectional("x"));
            switch (currentNote = $.model.getHoveredNote(timePosition, keyPosition), dragAction = $.model.getHoverAction(timePosition, currentNote)) {
              case "mid":
                CurseWords.setExplicitCursor("default");
                break;

              case "min":
              case "max":
                CurseWords.setExplicitCursor("xresize");
                break;

              case "select":            }
            $.view.renderFreshGrid(), $.view.renderNotes();
        }, dragHandler = function(e) {
            (Math.abs(e.clientX - startEvent.clientX) > 1 || Math.abs(e.clientY - startEvent.clientY) > 1) && ($.model.isDragging = !0), 
            currentNote && $.model.isDragging && !currentNote.active && (key.shift || $.model.clearActiveNotes(), 
            currentNote.active = !0);
            var noteChanges = {}, showSelectionBox = !1;
            switch (dragAction) {
              case "mid":
                CurseWords.setExplicitCursor("grab"), noteChanges.keyDelta = $.model.pixelsToKey(e.clientX - startEvent.clientX), 
                noteChanges.startDelta = $.model.pixelsToBar(e.clientY - startEvent.clientY), noteChanges.endDelta = noteChanges.startDelta;
                break;

              case "min":
                noteChanges.startDelta = $.model.pixelsToBar(e.clientY - startEvent.clientY);
                break;

              case "max":
                noteChanges.endDelta = $.model.pixelsToBar(e.clientY - startEvent.clientY);
                break;

              case "select":
                showSelectionBox = !0, $.model.selectNotesInBox(startEvent, e);
            }
            noteChanges = $.model.snapNoteChanges(noteChanges, currentNote), $.view.renderFreshGrid(), 
            $.view.renderNotes(noteChanges), showSelectionBox && $.view.renderSelectBox(startEvent, e);
        }, dropHandler = function(e) {
            var noteChanges = {};
            switch (dragAction) {
              case "mid":
                $.model.isDragging ? (noteChanges.keyDelta = $.model.pixelsToKey(e.clientX - startEvent.clientX), 
                noteChanges.startDelta = $.model.pixelsToBar(e.clientY - startEvent.clientY), noteChanges.endDelta = noteChanges.startDelta) : currentNote.active ? $.model.deleteActiveNotes() : !currentNote.active && $.model.countActiveNotes() > 0 ? key.shift ? currentNote.active = !0 : $.model.clearActiveNotes() : $.model.notes.splice($.model.notes.indexOf(currentNote), 1);
                break;

              case "min":
                noteChanges.startDelta = $.model.pixelsToBar(e.clientY - startEvent.clientY);
                break;

              case "max":
                noteChanges.endDelta = $.model.pixelsToBar(e.clientY - startEvent.clientY);
                break;

              case "select":
                if ($.model.isDragging) $.model.setActiveNotes($.model.getSelectedNotes(), key.shift), 
                $.model.clearSelectedNotes(); else if ($.model.countActiveNotes() > 0) $.model.clearActiveNotes(); else {
                    var timePosition = $.model.yCoordToBar(e.clientY - $.model.canvas.clientXYDirectional("y")), keyPosition = $.model.xCoordToKey(e.clientX - $.model.canvas.clientXYDirectional("x")), newNoteParams = {
                        key: Math.ceil(keyPosition),
                        end: .25 * Math.ceil(4 * timePosition),
                        start: .25 * Math.floor(4 * timePosition)
                    }, newNote = new Note(newNoteParams);
                    console.log(e.clientX - $.model.canvas.clientXYDirectional("x"), keyPosition, newNote), 
                    $.model.setActiveNotes(newNote);
                }
            }
            $.model.isDragging = !1, dragAction = null, noteChanges = $.model.snapNoteChanges(noteChanges, currentNote), 
            $.model.adjustActiveNotes(noteChanges), $.view.renderFreshGrid(), $.view.renderNotes(), 
            CurseWords.clearExplicitCursor();
        };
        DragKing.addHandler($.model.canvas, gripHandler, dragHandler, dropHandler);
    }, $.controller.windowResize = function() {
        window.addEventListener("resize", function() {
            $.model.resize();
        });
    }, $.controller.keyPress = function() {
        key("ctrl+s", function() {
            for (var i = 0; i < $.model.notes.length; i++) console.log("{ key: " + $.model.notes[i].key + ", start: " + $.model.notes[i].start.toFixed(3) + ", end: " + $.model.notes[i].end.toFixed(3) + " }");
            return !1;
        }), key("del", function() {
            return $.model.deleteActiveNotes(), $.view.renderFreshGrid(), $.view.renderNotes(), 
            !1;
        }), key("right", function() {
            var noteChanges = {
                keyDelta: 1
            };
            return $.model.adjustActiveNotes(noteChanges), $.view.renderFreshGrid(), $.view.renderNotes(), 
            !1;
        }), key("left", function() {
            var noteChanges = {
                keyDelta: -1
            };
            return $.model.adjustActiveNotes(noteChanges), $.view.renderFreshGrid(), $.view.renderNotes(), 
            !1;
        }), key("up", function() {
            var noteChanges = {
                startDelta: -.25,
                endDelta: -.25
            };
            return $.model.adjustActiveNotes(noteChanges), $.view.renderFreshGrid(), $.view.renderNotes(), 
            !1;
        }), key("down", function() {
            var noteChanges = {
                startDelta: .25,
                endDelta: .25
            };
            return $.model.adjustActiveNotes(noteChanges), $.view.renderFreshGrid(), $.view.renderNotes(), 
            !1;
        });
    }, $.controller.midiEvent = function() {}, $.controller.gripscroll = function() {
        $.model.container.addEventListener("gripscroll-update", function(e) {
            $.model.setViewport(e.gripScrollX.min, e.gripScrollX.max, e.gripScrollY.min, e.gripScrollY.max), 
            $.view.renderFreshGrid(), $.view.renderNotes();
        });
    }, $.controller.velocityChange = function() {
        var velocityInput = document.getElementById("note_velocity");
        velocityInput.addEventListener("change", function() {
            if (!(velocityInput.value < $.model.minVelocity || velocityInput.value > $.model.maxVelocity)) {
                for (var i = 0; i < $.model.notes.length; i++) $.model.notes[i].active && ($.model.notes[i].velocity = parseInt(velocityInput.value));
                $.view.renderNotes();
            }
        });
    }, $.model.container = null, $.model.canvas = null, $.model.canvasContext = null, 
    $.model.keyboardSize = 88, $.model.clipLength = 16, $.model.width = null, $.model.height = null, 
    $.model.timeScale = {
        min: .5,
        max: 1
    }, $.model.keyScale = {
        min: 0,
        max: 1
    }, $.model.notes = null, $.model.isDragging = !1, $.model.isHovering = !1, $.model.maxVelocity = 127, 
    $.model.minVelocity = 0, $.model.velocityRange = $.model.maxVelocity - $.model.minVelocity, 
    $.model.initialize = function(container, params) {
        $.model.container = container, $.model.canvas = container.appendChild(document.createElement("canvas")), 
        $.model.canvas.className = "piano-canvas", $.model.canvasContext = $.model.canvas.getContext("2d"), 
        $.model.notes = params.notes;
        for (var i in $.controller) $.controller[i]();
    }, $.model.resize = function() {
        $.model.canvas.width = $.model.width = $.model.container.clientWidth, $.model.canvas.height = $.model.height = $.model.container.clientHeight;
    }, $.model.getTimeRange = function() {
        return $.model.timeScale.max - $.model.timeScale.min;
    }, $.model.getKeyRange = function() {
        return $.model.keyScale.max - $.model.keyScale.min;
    }, $.model.percentToKey = function(percent) {
        return Math.ceil(percent * $.model.keyboardSize);
    }, $.model.percentToBar = function(percent) {
        return Math.ceil(percent * $.model.clipLength);
    }, $.model.barToPixels = function(bar) {
        return bar / $.model.clipLength / $.model.getTimeRange() * $.model.height;
    }, $.model.keyToPixels = function(key) {
        return (88 - key) / $.model.keyboardSize / $.model.getKeyRange() * $.model.width;
    }, $.model.barToYCoord = function(bar) {
        return (bar / $.model.clipLength - $.model.timeScale.min) / $.model.getTimeRange() * $.model.height;
    }, $.model.keyToXCoord = function(key) {
        return ((88 - key) / $.model.keyboardSize - $.model.keyScale.min) / $.model.getKeyRange() * $.model.width;
    }, $.model.pixelsToBar = function(pixels) {
        return pixels / $.model.height * $.model.getTimeRange() * $.model.clipLength;
    }, $.model.pixelsToKey = function(pixels) {
        return (0 + pixels / $.model.width * $.model.getKeyRange()) * $.model.keyboardSize;
    }, $.model.yCoordToBar = function(yCoord) {
        return (yCoord / $.model.height * $.model.getTimeRange() + $.model.timeScale.min) * $.model.clipLength;
    }, $.model.xCoordToKey = function(xCoord) {
        return (0 + (xCoord / $.model.width * $.model.getKeyRange() + $.model.keyScale.min)) * $.model.keyboardSize;
    }, $.model.setViewport = function(keyScaleMin, keyScaleMax, timeScaleMin, timeScaleMax) {
        $.model.resize(), $.model.timeScale.min = timeScaleMin, $.model.timeScale.max = timeScaleMax, 
        $.model.keyScale.min = keyScaleMin, $.model.keyScale.max = keyScaleMax;
    }, $.model.getAverageVelocity = function() {
        for (var velocityTotal = 0, numActiveNotes = 0, velocityInput = document.getElementById("note_velocity"), i = 0; i < $.model.notes.length; i++) $.model.notes[i].active && (velocityTotal += $.model.notes[i].velocity, 
        numActiveNotes++);
        numActiveNotes > 0 && (velocityInput.value = Math.floor(velocityTotal / numActiveNotes));
    }, $.model.setActiveNotes = function(notes, union) {
        notes || (notes = []), union || $.model.clearActiveNotes(), Array.isArray(notes) || (notes = [ notes ]);
        for (var i = 0; i < notes.length; i++) -1 == $.model.notes.indexOf(notes[i]) && notes[i] && $.model.notes.push(notes[i]), 
        notes[i].active = union && !notes[i].active || union === !1;
        $.model.getAverageVelocity();
    }, $.model.adjustActiveNotes = function(params) {
        if (params) for (var i = 0; i < $.model.notes.length; i++) $.model.notes[i].active && (params.startDelta && ($.model.notes[i].start += params.startDelta), 
        params.keyDelta && ($.model.notes[i].key += params.keyDelta), params.endDelta && ($.model.notes[i].end += params.endDelta));
    }, $.model.countActiveNotes = function() {
        for (var total = 0, i = 0; i < $.model.notes.length; i++) $.model.notes[i].active && total++;
        return total;
    }, $.model.deleteActiveNotes = function() {
        $.model.notes = $.model.notes.filter(function(el) {
            return !el.active;
        });
    }, $.model.clearActiveNotes = function() {
        for (var i = 0; i < $.model.notes.length; i++) this.notes[i].active = !1;
    }, $.model.getSelectedNotes = function() {
        return $.model.notes.filter(function(note) {
            return note.selected;
        });
    }, $.model.countSelectedNotes = function() {
        for (var total = 0, i = 0; i < $.model.notes.length; i++) $.model.notes[i].selected && total++;
        return total;
    }, $.model.clearSelectedNotes = function() {
        for (var i = 0; i < $.model.notes.length; i++) this.notes[i].selected = !1;
    }, $.model.getHoveredNote = function(timePositionBars, key) {
        for (var i = 0; i < $.model.notes.length; i++) if (timePositionBars >= $.model.notes[i].start && timePositionBars <= $.model.notes[i].end && $.model.notes[i].key - key < 1 && $.model.notes[i].key - key > 0) return $.model.notes[i];
        return null;
    }, $.model.getHoverAction = function(timePositionBars, hoveredNote) {
        return hoveredNote ? $.model.barToPixels(hoveredNote.end - hoveredNote.start) < 15 ? "mid" : $.model.barToPixels(-1 * hoveredNote.start + timePositionBars) < 4 ? "min" : $.model.barToPixels(hoveredNote.end - timePositionBars) < 4 ? "max" : "mid" : "select";
    }, $.model.snapNoteChanges = function(delta, targetNote) {
        return targetNote ? (delta.keyDelta = Math.round(delta.keyDelta), key.alt ? delta : delta.startDelta && delta.endDelta ? (delta.startDelta = delta.endDelta = this.snapIndividualValue(delta.startDelta, targetNote.start), 
        delta) : (delta.startDelta && (delta.startDelta = this.snapIndividualValue(delta.startDelta, targetNote.start)), 
        delta.endDelta && (delta.endDelta = this.snapIndividualValue(delta.endDelta, targetNote.end)), 
        delta)) : delta;
    }, $.model.snapIndividualValue = function(delta, value) {
        var quantizedDelta = .125 * Math.round(8 * delta), quantizedResult = .125 * Math.round(8 * (value + delta));
        return Math.abs(quantizedDelta - delta) < Math.abs(quantizedResult - value - delta) ? quantizedDelta : quantizedResult - value;
    }, $.model.selectNotesInBox = function(startEvent, endEvent) {
        for (var bar1 = this.yCoordToBar(startEvent.clientY - this.canvas.clientXYDirectional("y")), key1 = this.xCoordToKey(startEvent.clientX - this.canvas.clientXYDirectional("x")), bar2 = this.yCoordToBar(endEvent.clientY - this.canvas.clientXYDirectional("y")), key2 = this.xCoordToKey(endEvent.clientX - this.canvas.clientXYDirectional("x")), barMin = bar2 > bar1 ? bar1 : bar2, barMax = bar1 > bar2 ? bar1 : bar2, keyMin = key2 > key1 ? key1 : key2, keyMax = key1 > key2 ? key1 : key2, i = 0; i < this.notes.length; i++) this.notes[i].start < barMax && this.notes[i].end > barMin && this.notes[i].key < keyMax + 1 && (this.notes[i].selected = this.notes[i].key > keyMin + 0 ? !0 : !1);
        $.model.getAverageVelocity();
    }, $.view.renderFreshGrid = function() {
        $.model.canvasContext.clear(), $.model.canvasContext.backgroundFill("#EEEEEE"), 
        $.view.renderKeyScale(), $.view.renderTimeScale();
    }, $.view.renderKeyScale = function() {
        $.model.canvasContext.lineWidth = 1, $.model.canvasContext.setLineDash([]), $.model.canvasContext.strokeStyle = "#D4D4E0", 
        $.model.canvasContext.fillStyle = "#DDDDE4";
        for (var minKey = $.model.percentToKey($.model.keyScale.min), maxKey = $.model.percentToKey($.model.keyScale.max), key = minKey; maxKey >= key; key++) {
            var prevEdge = Math.closestHalfPixel($.model.keyToXCoord(key - 1)), nextEdge = Math.closestHalfPixel($.model.keyToXCoord(key));
            prevEdge > .5 && $.model.canvasContext.drawLine(prevEdge, 0, prevEdge, $.model.height, !1), 
            key % 12 in {
                3: !0,
                5: !0,
                7: !0,
                10: !0,
                0: !0
            } && $.model.canvasContext.fillRect(nextEdge, 0, prevEdge - nextEdge, $.model.height);
        }
        $.model.canvasContext.stroke();
    }, $.view.renderTimeScale = function() {
        $.model.canvasContext.lineWidth = 1, $.model.canvasContext.setLineDash(key.alt ? [ 2, 4 ] : []);
        for (var minBar = $.model.percentToBar($.model.timeScale.min) - 1, maxBar = $.model.percentToBar($.model.timeScale.max), bar = minBar; maxBar > bar; bar += .25) {
            $.model.canvasContext.beginPath(), $.model.canvasContext.strokeStyle = bar % 1 ? "#CCD" : "#AAB";
            var yPosition = Math.closestHalfPixel($.model.barToYCoord(bar));
            $.model.canvasContext.drawLine(0, yPosition, $.model.width, yPosition), $.model.canvasContext.stroke();
        }
    }, $.view.renderNotes = function(params) {
        for (var i = 0; i < $.model.notes.length; i++) {
            $.model.canvasContext.beginPath(), $.model.canvasContext.lineWidth = 1, $.model.canvasContext.setLineDash([]);
            var shiftKeyDownAndNoteActive = key.shift && $.model.notes[i].active ^ $.model.notes[i].selected, shiftKeyUpAndNoteActive = !key.shift && ($.model.notes[i].selected || $.model.notes[i].active);
            if (shiftKeyDownAndNoteActive || shiftKeyUpAndNoteActive) {
                var previewNote = {};
                previewNote.start = params && params.startDelta ? $.model.notes[i].start + params.startDelta : $.model.notes[i].start, 
                previewNote.key = params && params.keyDelta ? $.model.notes[i].key + params.keyDelta : $.model.notes[i].key, 
                previewNote.end = params && params.endDelta ? $.model.notes[i].end + params.endDelta : $.model.notes[i].end, 
                $.model.canvasContext.strokeStyle = "#401", $.model.canvasContext.fillStyle = "#812", 
                $.view.renderSingleNote(previewNote);
            } else {
                var intensityFactor = $.model.notes[i].velocity / $.model.maxVelocity, r = Math.floor(215 + 32 * intensityFactor), g = Math.floor(160 - 144 * intensityFactor), b = Math.floor(160 - 128 * intensityFactor);
                $.model.canvasContext.strokeStyle = "#812", $.model.canvasContext.fillStyle = "#" + r.toString(16) + g.toString(16) + b.toString(16), 
                $.view.renderSingleNote($.model.notes[i]);
            }
            $.model.canvasContext.stroke();
        }
    }, $.view.renderSingleNote = function(note) {
        var y1 = Math.closestHalfPixel($.model.barToYCoord(note.start)), y2 = Math.closestHalfPixel($.model.barToYCoord(note.end)), x1 = Math.closestHalfPixel($.model.keyToXCoord($.model.keyboardSize - note.key)), x2 = Math.closestHalfPixel($.model.keyToXCoord($.model.keyboardSize - note.key + 1));
        $.model.canvasContext.fillRect(x1 - 2, y1 + 1, x2 - x1 + 4, y2 - y1 - 3), $.model.canvasContext.strokeRect(x1 - 1, y1 + 0, x2 - x1 + 2, y2 - y1 - 1);
    }, $.view.renderSelectBox = function(startEvent, endEvent) {
        var x0 = Math.closestHalfPixel(startEvent.clientX - $.model.canvas.clientXYDirectional("x")), y0 = Math.closestHalfPixel(startEvent.clientY - $.model.canvas.clientXYDirectional("y")), width = Math.round(endEvent.clientX - startEvent.clientX), height = Math.round(endEvent.clientY - startEvent.clientY);
        $.model.canvasContext.beginPath(), $.model.canvasContext.lineWidth = 1, $.model.canvasContext.strokeStyle = "rgba(0,0,0,0.5)", 
        $.model.canvasContext.fillStyle = "rgba(64,64,64,0.125)", $.model.canvasContext.fillRect(x0, y0, width, height), 
        $.model.canvasContext.strokeRect(x0, y0, width, height), $.model.canvasContext.stroke(), 
        $.model.canvasContext.setLineDash([]);
    }, {
        initialize: $.model.initialize,
        getAllNotes: function() {
            return $.model.notes;
        }
    };
}(key);

Math.closestHalfPixel = Math.closestHalfPixel || function(pixels) {
    return parseInt(.5 + pixels) - .5;
}, CanvasRenderingContext2D.prototype.drawLine = CanvasRenderingContext2D.prototype.drawLine || function(x1, y1, x2, y2, xyFlip) {
    xyFlip && (x1 = [ y1, y1 = x1 ][0], x2 = [ y2, y2 = x2 ][0]), this.moveTo(x1, y1), 
    this.lineTo(x2, y2);
}, CanvasRenderingContext2D.prototype.backgroundFill = CanvasRenderingContext2D.prototype.backgroundFill || function(color) {
    this.fillStyle = color, this.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

var Transport = function() {
    var keyFrequency = [], bpm = 105, ctx = new AudioContext(), masterVolume = ctx.createGain();
    for (masterVolume.connect(ctx.destination), masterVolume.gain.value = .25, key("space", function() {
        return play(), !1;
    }), i = 1; i <= 88; i++) keyFrequency[i] = 440 * Math.pow(2, (i - 49) / 12);
    var getPlayTime = function(time) {
        return 120 * time / bpm + ctx.currentTime;
    }, createOscillator = function(key, start, end, velocity) {
        var oscillator = ctx.createOscillator(), gainNode = ctx.createGain();
        gainNode.connect(masterVolume), gainNode.gain.value = velocity / 127, oscillator.connect(gainNode), 
        oscillator.type = "square", oscillator.frequency.value = keyFrequency[key], oscillator.start(getPlayTime(start)), 
        oscillator.stop(getPlayTime(end));
    }, play = function() {
        var notes = PIANO.getAllNotes();
        for (var i in notes) createOscillator(notes[i].key, notes[i].start, notes[i].end, notes[i].velocity);
    }, stop = function() {}, setTempo = function(tempo) {
        bpm = tempo;
    };
    return {
        play: play,
        stop: stop,
        setTempo: setTempo
    };
}();