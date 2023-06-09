import './popup.css';
! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var n = {};
    t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
    e.exports = n(28)
}, , , function(e, t, n) {
    function r(e) {
        return "object" != typeof e ? {
            name: e
        } : e
    }

    function o(e) {
        if (!e) return {};
        if ("object" != typeof e) return e;
        var t = Object.keys(e);
        if (1 === t.length && "id" === t[0]) return "background";
        if (e.tab) {
            var n = Object.assign({}, e);
            return n.tabId = e.tab.id, n
        }
        return e
    }

    function a(e) {
        return e.to = "background", m.callChromeAsync("runtime.sendMessage", e).then(function(e) {
            return {
                receiver: "background",
                data: e
            }
        })
    }

    function i(e, t) {
        return e.to = t, m.callChromeAsync("tabs.sendMessage", t.tabId, e, {
            frameId: t.frameId
        }).then(function(e) {
            return {
                receiver: t,
                data: e
            }
        })
    }

    function u(e, t) {
        return Promise.all(t.map(function(t) {
            return i(e, t)
        }))
    }
    var c = e.exports = {},
        m = n(4);
    c.enumFrames = function(e) {
        function t(e) {
            return m.callChromeAsync("webNavigation.getAllFrames", {
                tabId: e.id
            }).then(function(t) {
                return t || (t = [{
                    errorOccurred: !1,
                    frameId: 0,
                    parentFrameId: -1
                }]), t.map(function(t) {
                    return t.tabId = e.id, t
                })
            })
        }
        return "active" === e && (e = {
            active: !0,
            currentWindow: !0
        }), m.callChromeAsync("tabs.query", e || {}).then(function(e) {
            return Promise.all(e.map(t))
        }).then(function(e) {
            return m.flatten(e)
        })
    }, c.background = function(e) {
        return a(r(e))
    }, c.frame = function(e, t) {
        return i(r(e), t)
    }, c.allFrames = function(e) {
        return e = r(e), c.enumFrames("active").then(function(t) {
            return u(e, t)
        })
    }, c.topFrame = function(e) {
        return e = r(e), c.enumFrames("active").then(function(t) {
            var n = t.filter(function(e) {
                return 0 === e.frameId
            });
            if (n.length) return i(e, n[0])
        })
    }, c.broadcast = function(e) {
        return e = r(e), c.enumFrames().then(function(t) {
            return u(e, t)
        })
    }, c.listen = function(e) {
        m.callChrome("runtime.onMessage.addListener", function(t, n, r) {
            if (e[t.name]) {
                t.sender = o(n);
                return r(e[t.name](t))
            }
        })
    }
}, function(e, t) {
    function n(e, t, n) {
        var r = t.split("."),
            o = chrome,
            a = r.pop();
        if (r.forEach(function(e) {
                o = o[e]
            }), !e) try {
            return o[a].apply(o, n)
        } catch (e) {
            return null
        }
        return new Promise(function(e, t) {
            function r(t) {
                var n = chrome.runtime.lastError;
                e(n ? null : t)
            }
            try {
                o[a].apply(o, n.concat(r))
            } catch (t) {
                e(null)
            }
        })
    }
    var r = e.exports = {};
    r.numeric = function(e, t) {
        return e - t
    }, r.toArray = function(e) {
        return Array.prototype.slice.call(e || [], 0)
    }, r.flatten = function(e) {
        for (; e.some(Array.isArray);) e = Array.prototype.concat.apply([], e);
        return e
    }, r.first = function(e, t) {
        for (var n = 0; n < e.length; n++)
            if (t(e[n], n)) return e[n];
        return null
    }, r.intersect = function(e, t) {
        return !(e[0] >= t[2] || e[2] <= t[0] || e[1] >= t[3] || e[3] <= t[1])
    }, r.lstrip = function(e) {
        return e.replace(/^\s+/, "")
    }, r.rstrip = function(e) {
        return e.replace(/\s+$/, "")
    }, r.strip = function(e) {
        return e.replace(/^\s+|\s+$/g, "")
    }, r.reduceWhitespace = function(e) {
        return e.replace(/\n\r/g, "\n").replace(/\n[ ]+/g, "\n").replace(/[ ]+\n/g, "\n").replace(/\n+/g, "\n")
    }, r.uid = function(e) {
        for (var t = ""; e--;) t += String.fromCharCode(97 + Math.floor(26 * Math.random()));
        return t
    }, r.nobr = function(e) {
        return e.replace(/[\r\n]+/g, " ")
    }, r.format = function(e, t) {
        return e.replace(/\${(\w+)}/g, function(e, n) {
            return t[n]
        })
    };
    var o = {};
    r.timeStart = function(e) {
        return o[e] = new Date, "TIME START: " + e
    }, r.timeEnd = function(e) {
        if (o[e]) {
            var t = new Date - o[e];
            return delete o[e], "TIME END: " + e + " " + t
        }
    }, r.callChrome = function(e) {
        return n(!1, e, [].slice.call(arguments, 1))
    }, r.callChromeAsync = function(e) {
        return n(!0, e, [].slice.call(arguments, 1))
    }
}, function(e, t, n) {
    function r(e) {
        return e.reduce(function(e, t) {
            return e + (Number(t) || 0)
        }, 0)
    }

    function o(e) {
        var t = [];
        return e.forEach(function(e) {
            e.isNumber && t.push(e.number)
        }), t.length ? t : null
    }

    function a(e, t, n) {
        return t = Number(t) || e, Math.max(e, Math.min(t, n))
    }
    var i = e.exports = {},
        u = n(6),
        c = n(7),
        m = n(4),
        l = u.modifiers.ALT,
        f = u.mac ? u.modifiers.META : u.modifiers.CTRL,
        s = {
            "modifier.cell": l,
            "modifier.column": l | f,
            "modifier.row": 0,
            "modifier.table": 0,
            "modifier.extend": u.modifiers.SHIFT,
            "capture.enabled": !0,
            "capture.reset": !1,
            "scroll.amount": 30,
            "scroll.acceleration": 5,
            "copy.format.enabled.richHTML": !0,
            "copy.format.enabled.richHTMLCSS": !0,
            "copy.format.enabled.textCSV": !0,
            "copy.format.enabled.textCSVSwap": !0,
            "copy.format.enabled.textHTML": !0,
            "copy.format.enabled.textHTMLCSS": !0,
            "copy.format.enabled.textTabs": !0,
            "copy.format.enabled.textTabsSwap": !0,
            "copy.format.enabled.textTextile": !0,
            "copy.format.default.richHTMLCSS": !0,
            "infobox.enabled": !0,
            "infobox.position": "0"
        },
        d = [{
            id: "zzz",
            name: "Off"
        }, {
            id: "cell",
            name: "Cells"
        }, {
            id: "column",
            name: "Columns"
        }, {
            id: "row",
            name: "Rows"
        }, {
            id: "table",
            name: "Tables"
        }],
        p = [{
            id: "richHTMLCSS",
            name: "As is",
            desc: "Copy the table as seen on the screen"
        }, {
            id: "richHTML",
            name: "Plain Table",
            desc: "Copy the table without formatting"
        }, {
            id: "textTabs",
            name: "Text",
            desc: "Copy as tab-delimited text"
        }, {
            id: "textTabsSwap",
            name: "Text+Swap",
            desc: "Copy as tab-delimited text, swap columns and rows"
        }, {
            id: "textCSV",
            name: "CSV",
            desc: "Copy as comma-separated text"
        }, {
            id: "textCSVSwap",
            name: "CSV+Swap",
            desc: "Copy as comma-separated text, swap columns and rows"
        }, {
            id: "textHTMLCSS",
            name: "HTML+CSS",
            desc: "Copy as HTML source, retain formatting"
        }, {
            id: "textHTML",
            name: "HTML",
            desc: "Copy as HTML source, without formatting"
        }, {
            id: "textTextile",
            name: "Textile",
            desc: "Copy as Textile (Text content)"
        }, {
            id: "textTextileHTML",
            name: "Textile+HTML",
            desc: "Copy as Textile (HTML content)"
        }],
        v = [{
            name: "count",
            fn: function(e) {
                return e.length
            }
        }, {
            name: "sum",
            fn: function(e) {
                var t = o(e);
                return t ? c.format(r(t)) : null
            }
        }, {
            name: "average",
            fn: function(e) {
                var t = o(e);
                return t ? c.format(r(t) / t.length, 2) : null
            }
        }, {
            name: "min",
            fn: function(e) {
                var t = o(e);
                return t ? c.format(Math.min.apply(Math, t)) : null
            }
        }, {
            name: "max",
            fn: function(e) {
                var t = o(e);
                return t ? c.format(Math.max.apply(Math, t)) : null
            }
        }],
        g = {};
    i.load = function() {
        return m.callChromeAsync("storage.local.get", null).then(function(e) {
            return e = e || {}, "modKey" in e && "1" === String(e.modKey) && (e["modifier.cell"] = f, delete e.modKey), g = Object.assign({}, s, g, e), g["scroll.amount"] = a(1, g["scroll.amount"], 100), g["scroll.acceleration"] = a(0, g["scroll.acceleration"], 100), g["number.group"] || (g["number.group"] = c.defaultFormat().group), g["number.decimal"] || (g["number.decimal"] = c.defaultFormat().decimal), g
        })
    }, i.save = function() {
        return m.callChromeAsync("storage.local.clear").then(function() {
            return m.callChromeAsync("storage.local.set", g)
        }).then(function() {
            return g
        })
    }, i.setAll = function(e) {
        return g = Object.assign({}, g, e), i.save()
    }, i.set = function(e, t) {
        return g[e] = t, i.save()
    }, i.val = function(e) {
        return g[e]
    }, i.int = function(e) {
        return Number(i.val(e)) || 0
    }, i.copyFormats = function() {
        return p.map(function(e) {
            return e.enabled = !!i.val("copy.format.enabled." + e.id), e.default = !!i.val("copy.format.default." + e.id), e
        })
    }, i.numberFormat = function() {
        var e = i.val("number.group"),
            t = i.val("number.decimal");
        return e || t ? {
            group: e || "",
            decimal: t || ""
        } : c.defaultFormat()
    }, i.infoFunctions = function() {
        return v
    }, i.captureModes = function() {
        return d
    }
}, function(e, t) {
    var n = e.exports = {};
    n.mac = navigator.userAgent.indexOf("Macintosh") > 0, n.win = navigator.userAgent.indexOf("Windows") > 0, n.modifiers = {
        SHIFT: 1024,
        CTRL: 2048,
        ALT: 4096,
        META: 8192
    }, n.mouseModifiers = {}, n.mac ? n.mouseModifiers = [n.modifiers.SHIFT, n.modifiers.ALT, n.modifiers.META] : n.win ? n.mouseModifiers = [n.modifiers.SHIFT, n.modifiers.ALT, n.modifiers.CTRL] : n.mouseModifiers = [n.modifiers.SHIFT, n.modifiers.ALT, n.modifiers.CTRL, n.modifiers.META], n.modNames = {}, n.modNames[n.modifiers.CTRL] = "Ctrl", n.modNames[n.modifiers.ALT] = n.mac ? "Opt" : "Alt", n.modNames[n.modifiers.META] = n.mac ? "Cmd" : n.win ? "Win" : "Meta", n.modNames[n.modifiers.SHIFT] = "Shift", n.modHTMLNames = {}, n.modHTMLNames[n.modifiers.CTRL] = n.mac ? "&#x2303; control" : n.modNames[n.modifiers.CTRL], n.modHTMLNames[n.modifiers.ALT] = n.mac ? "&#x2325; option" : n.modNames[n.modifiers.ALT], n.modHTMLNames[n.modifiers.META] = n.mac ? "&#x2318; command" : n.modNames[n.modifiers.META], n.modHTMLNames[n.modifiers.SHIFT] = n.mac ? "&#x21E7; shift" : n.modNames[n.modifiers.SHIFT], n.keyNames = {
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        19: "Break",
        20: "Caps",
        27: "Esc",
        32: "Space",
        33: "PgUp",
        34: "PgDn",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        45: "Ins",
        46: "Del",
        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
        65: "A",
        66: "B",
        67: "C",
        68: "D",
        69: "E",
        70: "F",
        71: "G",
        72: "H",
        73: "I",
        74: "J",
        75: "K",
        76: "L",
        77: "M",
        78: "N",
        79: "O",
        80: "P",
        81: "Q",
        82: "R",
        83: "S",
        84: "T",
        85: "U",
        86: "V",
        87: "W",
        88: "X",
        89: "Y",
        90: "Z",
        93: "Select",
        96: "Num0",
        97: "Num1",
        98: "Num2",
        99: "Num3",
        100: "Num4",
        101: "Num5",
        102: "Num6",
        103: "Num7",
        104: "Num8",
        105: "Num9",
        106: "Num*",
        107: "Num+",
        109: "Num-",
        110: "Num.",
        111: "Num/",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "(",
        220: "\\",
        221: ")",
        222: "'"
    }, n.keyCode = function(e) {
        var t;
        return Object.keys(n.keyNames).some(function(r) {
            if (n.keyNames[r] === e) return t = r
        }), t
    }, n.key = function(e) {
        var t = n.modifiers.ALT * e.altKey | n.modifiers.CTRL * e.ctrlKey | n.modifiers.META * e.metaKey | n.modifiers.SHIFT * e.shiftKey,
            r = e.keyCode,
            o = n.keyNames[r],
            a = [],
            i = [];
        Object.keys(n.modifiers).forEach(function(e) {
            t & n.modifiers[e] && a.push(n.modNames[n.modifiers[e]])
        }), a = a.join(" ");
        var u = {
            modifiers: {
                code: 0,
                name: ""
            },
            scan: {
                code: 0,
                name: ""
            }
        };
        return a && (u.modifiers = {
            code: t,
            name: a
        }, i.push(a)), o && (u.scan = {
            code: r,
            name: o
        }, i.push(o)), u.code = t | r, u.name = i.join(" "), u
    }
}, function(e, t) {
    function n(e) {
        return e.match(/^\d+$/)
    }

    function r(e) {
        if (!n(e)) return null;
        var t = Number(e);
        return n(String(t)) ? t : null
    }

    function o(e) {
        var t = r("1" + e);
        return null === t ? null : String(t).slice(1)
    }

    function a(e, t) {
        if (!t.group || e.indexOf(t.group) < 0) return r(e);
        var n = "\\" + t.group,
            o = new RegExp("^\\d{1,3}(" + n + "\\d{2,3})*$");
        return e.match(o) ? r(e.replace(/\D+/g, "")) : null
    }
    var i = e.exports = {};
    i.parse = function(e, t) {
        if ("-" === e[0]) {
            var n = i.parse(e.slice(1), t);
            return null === n ? null : -n
        }
        if (!t.decimal || e.indexOf(t.decimal) < 0) return a(e, t);
        if (e === t.decimal) return null;
        var r = e.split(t.decimal);
        if (1 === r.length) return a(r[0], t);
        if (2 === r.length) {
            var u = r[0].length ? a(r[0], t) : 0,
                c = r[1].length ? o(r[1]) : 0;
            return null === u || null === c ? null : Number(u + "." + c)
        }
        return null
    }, i.extract = function(e, t) {
        if (!e) return null;
        if (!(e = String(e).replace(/^\s+|\s+$/g, ""))) return null;
        var n = t.group ? "\\" + t.group : "",
            r = t.decimal ? "\\" + t.decimal : "",
            o = new RegExp("-?[\\d" + n + r + "]*\\d", "g"),
            a = e.match(o);
        if (!a || 1 !== a.length) return null;
        var u = i.parse(a[0], t);
        return null === u ? null : u
    }, i.defaultFormat = function() {
        var e = {
            group: ",",
            decimal: "."
        };
        try {
            return (new Intl.NumberFormat).formatToParts(123456.78).forEach(function(t) {
                "group" === String(t.type) && (e.group = t.value), "decimal" === String(t.type) && (e.decimal = t.value)
            }), e
        } catch (e) {}
        try {
            var t = 123456.78.toLocaleString().replace(/\d/g, ""),
                n = t.length;
            return e.decimal = n > 0 ? t[n - 1] : ".", e.group = n > 1 ? t[n - 2] : "", e
        } catch (e) {}
        return e
    }, i.format = function(e, t) {
        return e = t ? Number(e.toFixed(t)) : Number(e), (e || 0).toLocaleString()
    }
}, , , , , function(e, t) {
    function n(e) {
        return Array.prototype.slice.call(e || [], 0)
    }

    function r(e) {
        return String(e || "").replace(/^\s+|\s+$/g, "")
    }
    var o = e.exports = {};
    o.is = function(e, t) {
        return e && e.matches && e.matches(t)
    }, o.visible = function(e) {
        return e && !(!e.offsetHeight && !e.offsetWidth)
    }, o.findOne = function(e, t) {
        return (t || document).querySelector(e)
    }, o.find = function(e, t) {
        return (t || document).querySelectorAll(e)
    }, o.tag = function(e) {
        return e && e.tagName ? String(e.tagName).toUpperCase() : ""
    }, o.indexOf = function(e, t, n) {
        var r = -1;
        return o.find(t, n).forEach(function(t, n) {
            t === e && (r = n)
        }), r
    }, o.nth = function(e, t, n) {
        return o.find(t, n).item(e)
    }, o.attr = function(e, t, n) {
        return e && e.getAttribute ? 2 === arguments.length ? e.getAttribute(t) : null === n ? e.removeAttribute(t) : e.setAttribute(t, n) : null
    }, o.removeAttr = function(e, t) {
        e && e.removeAttribute && e.removeAttribute(t)
    }, o.findSelf = function(e, t) {
        return [t || document].concat(n(o.find(e, t)))
    }, o.rows = function(e) {
        return e && e.rows ? n(e.rows) : []
    }, o.cells = function(e) {
        var t = [];
        return o.rows(e).forEach(function(e) {
            t = t.concat(n(e.cells))
        }), t
    }, o.remove = function(e) {
        e.forEach(function(e) {
            e && e.parentNode && e.parentNode.removeChild(e)
        })
    }, o.closest = function(e, t) {
        for (; e && e.matches;) {
            if (e.matches(t)) return e;
            e = e.parentNode
        }
        return null
    }, o.contains = function(e, t) {
        for (; t;) {
            if (t === e) return !0;
            t = t.parentNode
        }
        return !1
    }, o.bounds = function(e) {
        var t = e.getBoundingClientRect();
        return {
            x: t.left,
            y: t.top,
            right: t.right,
            bottom: t.bottom,
            rect: [t.left, t.top, t.right, t.bottom]
        }
    }, o.offset = function(e) {
        for (var t = {
                x: 0,
                y: 0
            }; e;) t.x += e.offsetLeft, t.y += e.offsetTop, e = e.offsetParent;
        return t
    }, o.addClass = function(e, t) {
        return e && e.classList && e.classList.add(t)
    }, o.removeClass = function(e, t) {
        return e && e.classList && e.classList.remove(t)
    }, o.hasClass = function(e, t) {
        return e && e.classList && e.classList.contains(t)
    }, o.textContentItems = function(e) {
        function t(e) {
            if (e) {
                if (3 === e.nodeType) {
                    var a = r(e.textContent);
                    return void(a.length && n.push(a))
                }
                o.visible(e) && (e.childNodes || []).forEach(t)
            }
        }
        var n = [];
        return t(e), n
    }, o.textContent = function(e) {
        return r(o.textContentItems(e).join(" "))
    }, o.htmlContent = function(e) {
        return e ? r(e.innerHTML) : ""
    }, o.deselect = function() {
        window.getSelection().removeAllRanges()
    }, o.select = function(e) {
        var t = document.createRange(),
            n = window.getSelection();
        t.selectNodeContents(e), n.removeAllRanges(), n.addRange(t)
    }, o.create = function(e, t) {
        var n = document.createElement(e);
        return t && Object.keys(t).forEach(function(e) {
            n.setAttribute(e, t[e])
        }), n
    }
}, , , , , , , , function(e, t) {
    var n = e.exports = {},
        r = null;
    n.register = function(e) {
        r = e
    }, n.last = function() {
        return r
    }, n.lastTarget = function() {
        return r ? r.target : null
    }, n.reset = function(e) {
        e.stopPropagation(), e.preventDefault()
    }, n.listen = function(e, t) {
        Object.keys(t).forEach(function(n) {
            var r = n.match(/^(\w+?)(Capture)?$/);
            (e || document).addEventListener(r[1], t[n], !!r[2])
        })
    }, n.unlisten = function(e, t) {
        Object.keys(t).forEach(function(n) {
            var r = n.match(/^(\w+?)(Capture)?$/);
            (e || document).removeEventListener(r[1], t[n], !!r[2])
        })
    };
    var o = {
        active: !1,
        lastEvent: null,
        timer: 0,
        freq: 5
    };
    n.trackMouse = function(e, t) {
        function r() {
            t("tick", o.lastEvent), o.timer = setTimeout(r, o.freq)
        }

        function a() {
            clearInterval(o.timer), o.active = !1, n.unlisten(document, i)
        }
        var i = {
            mousemove: function(e) {
                n.reset(e), o.lastEvent = e, 1 === e.buttons ? (clearTimeout(o.timer), t("move", o.lastEvent), r()) : (a(), t("up", e))
            },
            mouseup: function(e) {
                n.reset(e), o.lastEvent = e, a(), t("up", e)
            }
        };
        o.active && a(), o.active = !0, n.listen(document, i), i.mousemove(e)
    }
}, , , , , , , , function(e, t, n) {
    function r() {
        var e = c.val("_captureMode") || "zzz";
        return c.captureModes().map(function(t) {
            return f.format('<button class="${cls}" data-command="capture_${id}">${name}</button>', {
                id: t.id,
                name: t.name,
                cls: t.id === e ? "on" : ""
            })
        }).join("")
    }

    function o() {
        return c.copyFormats().filter(function(e) {
            return e.enabled
        }).map(function(e) {
            return f.format('<button data-command="copy_${id}" title="${desc}">${name}</button>', e)
        }).join("")
    }

    function a() {
        u.findOne("#copy-buttons").innerHTML = o(), c.val("capture.enabled") ? (u.findOne("#capture-row").style.display = "", u.findOne("#capture-buttons").innerHTML = r()) : u.findOne("#capture-row").style.display = "none"
    }

    function i() {
        a(), l.listen(document, {
            click: function(e) {
                var t = u.attr(e.target, "data-command");
                t && m.background({
                    name: "command",
                    command: t
                }), u.attr(e.target, "data-keep-open") || window.close()
            }
        })
    }
    var u = n(12),
        c = n(5),
        m = n(3),
        l = n(20),
        f = n(4);
    window.onload = function() {
        c.load().then(i)
    }
}]);
