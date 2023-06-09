import './content.css';
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
    e.exports = n(18)
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

    function i(e) {
        return e.to = "background", l.callChromeAsync("runtime.sendMessage", e).then(function(e) {
            return {
                receiver: "background",
                data: e
            }
        })
    }

    function a(e, t) {
        return e.to = t, l.callChromeAsync("tabs.sendMessage", t.tabId, e, {
            frameId: t.frameId
        }).then(function(e) {
            return {
                receiver: t,
                data: e
            }
        })
    }

    function c(e, t) {
        return Promise.all(t.map(function(t) {
            return a(e, t)
        }))
    }
    var u = e.exports = {},
        l = n(4);
    u.enumFrames = function(e) {
        function t(e) {
            return l.callChromeAsync("webNavigation.getAllFrames", {
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
        }), l.callChromeAsync("tabs.query", e || {}).then(function(e) {
            return Promise.all(e.map(t))
        }).then(function(e) {
            return l.flatten(e)
        })
    }, u.background = function(e) {
        return i(r(e))
    }, u.frame = function(e, t) {
        return a(r(e), t)
    }, u.allFrames = function(e) {
        return e = r(e), u.enumFrames("active").then(function(t) {
            return c(e, t)
        })
    }, u.topFrame = function(e) {
        return e = r(e), u.enumFrames("active").then(function(t) {
            var n = t.filter(function(e) {
                return 0 === e.frameId
            });
            if (n.length) return a(e, n[0])
        })
    }, u.broadcast = function(e) {
        return e = r(e), u.enumFrames().then(function(t) {
            return c(e, t)
        })
    }, u.listen = function(e) {
        l.callChrome("runtime.onMessage.addListener", function(t, n, r) {
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
            i = r.pop();
        if (r.forEach(function(e) {
                o = o[e]
            }), !e) try {
            return o[i].apply(o, n)
        } catch (e) {
            return null
        }
        return new Promise(function(e, t) {
            function r(t) {
                var n = chrome.runtime.lastError;
                e(n ? null : t)
            }
            try {
                o[i].apply(o, n.concat(r))
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

    function i(e, t, n) {
        return t = Number(t) || e, Math.max(e, Math.min(t, n))
    }
    var a = e.exports = {},
        c = n(6),
        u = n(7),
        l = n(4),
        s = c.modifiers.ALT,
        f = c.mac ? c.modifiers.META : c.modifiers.CTRL,
        d = {
            "modifier.cell": s,
            "modifier.column": s | f,
            "modifier.row": 0,
            "modifier.table": 0,
            "modifier.extend": c.modifiers.SHIFT,
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
        m = [{
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
        h = [{
            name: "count",
            fn: function(e) {
                return e.length
            }
        }, {
            name: "sum",
            fn: function(e) {
                var t = o(e);
                return t ? u.format(r(t)) : null
            }
        }, {
            name: "average",
            fn: function(e) {
                var t = o(e);
                return t ? u.format(r(t) / t.length, 2) : null
            }
        }, {
            name: "min",
            fn: function(e) {
                var t = o(e);
                return t ? u.format(Math.min.apply(Math, t)) : null
            }
        }, {
            name: "max",
            fn: function(e) {
                var t = o(e);
                return t ? u.format(Math.max.apply(Math, t)) : null
            }
        }],
        b = {};
    a.load = function() {
        return l.callChromeAsync("storage.local.get", null).then(function(e) {
            return e = e || {}, "modKey" in e && "1" === String(e.modKey) && (e["modifier.cell"] = f, delete e.modKey), b = Object.assign({}, d, b, e), b["scroll.amount"] = i(1, b["scroll.amount"], 100), b["scroll.acceleration"] = i(0, b["scroll.acceleration"], 100), b["number.group"] || (b["number.group"] = u.defaultFormat().group), b["number.decimal"] || (b["number.decimal"] = u.defaultFormat().decimal), b
        })
    }, a.save = function() {
        return l.callChromeAsync("storage.local.clear").then(function() {
            return l.callChromeAsync("storage.local.set", b)
        }).then(function() {
            return b
        })
    }, a.setAll = function(e) {
        return b = Object.assign({}, b, e), a.save()
    }, a.set = function(e, t) {
        return b[e] = t, a.save()
    }, a.val = function(e) {
        return b[e]
    }, a.int = function(e) {
        return Number(a.val(e)) || 0
    }, a.copyFormats = function() {
        return p.map(function(e) {
            return e.enabled = !!a.val("copy.format.enabled." + e.id), e.default = !!a.val("copy.format.default." + e.id), e
        })
    }, a.numberFormat = function() {
        var e = a.val("number.group"),
            t = a.val("number.decimal");
        return e || t ? {
            group: e || "",
            decimal: t || ""
        } : u.defaultFormat()
    }, a.infoFunctions = function() {
        return h
    }, a.captureModes = function() {
        return m
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
            i = [],
            a = [];
        Object.keys(n.modifiers).forEach(function(e) {
            t & n.modifiers[e] && i.push(n.modNames[n.modifiers[e]])
        }), i = i.join(" ");
        var c = {
            modifiers: {
                code: 0,
                name: ""
            },
            scan: {
                code: 0,
                name: ""
            }
        };
        return i && (c.modifiers = {
            code: t,
            name: i
        }, a.push(i)), o && (c.scan = {
            code: r,
            name: o
        }, a.push(o)), c.code = t | r, c.name = a.join(" "), c
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

    function i(e, t) {
        if (!t.group || e.indexOf(t.group) < 0) return r(e);
        var n = "\\" + t.group,
            o = new RegExp("^\\d{1,3}(" + n + "\\d{2,3})*$");
        return e.match(o) ? r(e.replace(/\D+/g, "")) : null
    }
    var a = e.exports = {};
    a.parse = function(e, t) {
        if ("-" === e[0]) {
            var n = a.parse(e.slice(1), t);
            return null === n ? null : -n
        }
        if (!t.decimal || e.indexOf(t.decimal) < 0) return i(e, t);
        if (e === t.decimal) return null;
        var r = e.split(t.decimal);
        if (1 === r.length) return i(r[0], t);
        if (2 === r.length) {
            var c = r[0].length ? i(r[0], t) : 0,
                u = r[1].length ? o(r[1]) : 0;
            return null === c || null === u ? null : Number(c + "." + u)
        }
        return null
    }, a.extract = function(e, t) {
        if (!e) return null;
        if (!(e = String(e).replace(/^\s+|\s+$/g, ""))) return null;
        var n = t.group ? "\\" + t.group : "",
            r = t.decimal ? "\\" + t.decimal : "",
            o = new RegExp("-?[\\d" + n + r + "]*\\d", "g"),
            i = e.match(o);
        if (!i || 1 !== i.length) return null;
        var c = a.parse(i[0], t);
        return null === c ? null : c
    }, a.defaultFormat = function() {
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
    }, a.format = function(e, t) {
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
                    var i = r(e.textContent);
                    return void(i.length && n.push(i))
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
}, , function(e, t, n) {
    var r = e.exports = {},
        o = n(12),
        i = "data-copytables-";
    r.set = function(e, t) {
        return e && e.setAttribute(i + t, "1")
    }, r.is = function(e, t) {
        return e && e.hasAttribute(i + t)
    }, r.clear = function(e, t) {
        return e && e.removeAttribute(i + t)
    }, r.select = function(e) {
        return r.set(e, "selected")
    }, r.selected = function(e) {
        return r.is(e, "selected")
    }, r.unselect = function(e) {
        return r.clear(e, "selected")
    }, r.mark = function(e) {
        return r.set(e, "marked")
    }, r.marked = function(e) {
        return r.is(e, "marked")
    }, r.unmark = function(e) {
        return r.clear(e, "marked")
    }, r.lock = function(e) {
        return r.set(e, "locked")
    }, r.locked = function(e) {
        return r.is(e, "locked")
    }, r.unlock = function(e) {
        return r.clear(e, "locked")
    }, r.find = function(e, t) {
        var n = e.split(",").map(function(e) {
            return "[" + i + e.trim() + "]"
        }).join(",");
        return o.find(n, t)
    }, r.findSelected = function(e) {
        var t = "[{}selected]:not([{}locked]), [{}marked]:not([{}locked])".replace(/{}/g, i);
        return o.find(t, e)
    }, r.reset = function(e) {
        e.removeAttribute(i + "selected"), e.removeAttribute(i + "marked"), e.removeAttribute(i + "locked")
    }
}, function(e, t) {
    var n = e.exports = {},
        r = /^(width|height|display)$|^(-webkit|animation|motion)|-origin$/,
        o = null;
    n.read = function(e) {
        var t = window.getComputedStyle(e);
        o || (o = [].filter.call(t, function(e) {
            return !r.test(e)
        }));
        var n = {};
        return o.forEach(function(e) {
            var r = t.getPropertyValue(e);
            n[e] = r.replace(/\b(\d+\.\d+)(?=px\b)/g, function(e, t) {
                return Math.round(parseFloat(t))
            })
        }), "none" === t.getPropertyValue("display") && (n.display = "none"), n
    }, n.compute = function(e, t) {
        var n = [];
        return Object.keys(t).forEach(function(r) {
            t[r] !== e[r] && n.push(r + ":" + t[r])
        }), n.join("; ")
    }
}, , , function(e, t, n) {
    ! function() {
        n(19).main()
    }()
}, function(e, t, n) {
    function r(e) {
        var t = d.key(e),
            n = f.int("modifier.extend"),
            r = t.modifiers.code,
            o = r & ~n;
        if (f.val("capture.enabled") && f.val("_captureMode") && !o) return [f.val("_captureMode"), r & n];
        if (!t.scan.code && o) {
            var i = b.first(f.captureModes(), function(e) {
                return o === f.int("modifier." + e.id)
            });
            if (i) return [i.id, r & n]
        }
    }

    function o() {
        T && (T.stop(), T = null)
    }

    function i(e) {
        x.selectCaptured(e), f.val("capture.reset") && f.set("_captureMode", "").then(function() {
            p.background("preferencesUpdated")
        })
    }

    function a(e, t, n) {
        var r = x.locate(e.target);
        if (!r) return o(), !1;
        T && T.table !== r.table && (o(), n = !1), T && T.stop(), T = T || new v.Capture, T.onDone = i, y.start(e.target), T.start(e, t, n)
    }

    function c(e) {
        var t = y.table(),
            n = !0;
        if (!t) {
            if (e.broadcast) return null;
            var r = m.lastTarget(),
                o = x.locate(r);
            if (!o) return null;
            t = o.table, n = !1
        }
        w = !0;
        var i = x.copy(t, e.options, n);
        return k = setTimeout(function() {
            h.attr(document.body, "data-copytables-wait", 1)
        }, S), i
    }

    function u() {
        w = !1, clearTimeout(k), h.removeAttr(document.body, "data-copytables-wait")
    }

    function l() {
        m.listen(document, M), p.listen(L)
    }
    var s = e.exports = {},
        f = n(5),
        d = n(6),
        m = n(20),
        p = n(3),
        h = n(12),
        b = n(4),
        v = n(21),
        g = n(22),
        y = n(25),
        x = n(23),
        C = n(26),
        T = null,
        w = !1,
        S = 300,
        k = 0,
        M = {
            mousedownCapture: function(e) {
                if (m.register(e), 0 === e.button) {
                    var t = r(e);
                    if (!t || !y.selectable(e.target)) return void p.background("dropAllSelections");
                    window.focus(), a(e, t[0], t[1])
                }
            },
            copy: function(e) {
                y.active() && !w ? (p.background("genericCopy"), m.reset(e)) : w && m.reset(e)
            },
            contextmenu: function(e) {
                m.register(e), p.background({
                    name: "contextMenu",
                    selectable: y.selectable(e.target),
                    selected: y.active()
                })
            }
        },
        L = {
            dropSelection: function() {
                y.table() && y.drop(), g.remove()
            },
            preferencesUpdated: f.load,
            enumTables: function(e) {
                return x.enum(y.table())
            },
            selectTableByIndex: function(e) {
                var t = x.byIndex(e.index);
                t && (y.select(t, "table"), t.scrollIntoView(!0), g.update(y.table()))
            },
            selectFromContextMenu: function(e) {
                var t = m.lastTarget(),
                    n = x.locate(t);
                n ? y.toggle(n.td, e.mode) : "table" === e.mode && y.toggle(h.closest(t, "table"), "table"), g.update(y.table())
            },
            tableIndexFromContextMenu: function() {
                var e = m.lastTarget(),
                    t = h.closest(e, "table");
                return t ? x.indexOf(t) : null
            },
            beginCopy: c,
            endCopy: u,
            endCopyFailed: function() {
                w && console.error("Sorry, TableGPT was unable to copy this table."), u()
            }
        };
    s.main = function() {
        C.load().then(function() {
            document.body && f.load().then(l)
        })
    }
}, function(e, t) {
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

        function i() {
            clearInterval(o.timer), o.active = !1, n.unlisten(document, a)
        }
        var a = {
            mousemove: function(e) {
                n.reset(e), o.lastEvent = e, 1 === e.buttons ? (clearTimeout(o.timer), t("move", o.lastEvent), r()) : (i(), t("up", e))
            },
            mouseup: function(e) {
                n.reset(e), o.lastEvent = e, i(), t("up", e)
            }
        };
        o.active && i(), o.active = !0, n.listen(document, a), a.mousemove(e)
    }
}, function(e, t, n) {
    var r = e.exports = {},
        o = n(12),
        i = n(14),
        a = n(20),
        c = (n(3), n(5), n(4)),
        u = n(22),
        l = n(23),
        s = n(24);
    r.Capture = function() {
        this.anchorPoint = null, this.table = null
    }, r.Capture.prototype.markRect = function(e) {
        var t = e.clientX,
            n = e.clientY,
            r = this.scroller.adjustPoint(this.anchorPoint),
            o = [Math.min(t, r.x), Math.min(n, r.y), Math.max(t, r.x), Math.max(n, r.y)];
        return "column" !== this.mode && "table" !== this.mode || (o[1] = -1e7, o[3] = 1e7), "row" !== this.mode && "table" !== this.mode || (o[0] = -1e7, o[2] = 1e7), o
    }, r.Capture.prototype.setCaptured = function(e) {
        o.cells(this.table).forEach(function(t) {
            i.unmark(t), c.intersect(o.bounds(t).rect, e) && i.mark(t)
        })
    }, r.Capture.prototype.setLocked = function(e, t) {
        o.cells(this.table).forEach(function(n) {
            i.unlock(n), c.intersect(o.bounds(n).rect, e) && (t || (i.unselect(n), i.lock(n)))
        })
    }, r.Capture.prototype.selection = function() {
        var e = this,
            t = i.findSelected(e.table);
        if (!e.selectedCells) return [!0, e.selectedCells = t];
        if (t.length !== e.selectedCells.length) return [!0, e.selectedCells = t];
        var n = !0;
        return t.forEach(function(t, r) {
            n = n && t === e.selectedCells[r]
        }), n ? [!1, e.selectedCells] : [!0, e.selectedCells = t]
    }, r.Capture.prototype.start = function(e, t, n) {
        var r = l.locate(e.target);
        this.table = r.table, this.scroller = new s.Scroller(r.td), this.mode = t, this.extend = n, this.anchorPoint || (n = !1), n || (this.anchorPoint = {
            x: o.bounds(r.td).x + 1,
            y: o.bounds(r.td).y + 1
        }, this.setLocked(this.markRect(e), !i.selected(r.td)));
        var c = this,
            f = function(e, t) {
                "move" === e && c.scroller.reset(), c.scroller.scroll(t), c.setCaptured(c.markRect(t)), u.update(c.table), "up" === e && c.onDone(c.table)
            };
        a.trackMouse(e, f)
    }, r.Capture.prototype.stop = function() {
        o.find("td, th").forEach(function(e) {
            i.unmark(e), i.unlock(e)
        })
    }
}, function(e, t, n) {
    function r(e, t) {
        var n = {
            text: "",
            number: 0,
            isNumber: !1
        };
        return h.textContentItems(e).some(function(e) {
            var r = v.extract(e, t);
            if (null !== r) return n = {
                text: e,
                number: r,
                isNumber: !0
            }
        }), n
    }

    function o(e) {
        if (!e) return null;
        var t = p.findSelected(e);
        if (!t || !t.length) return null;
        var n = b.numberFormat(),
            o = [];
        return t.forEach(function(e) {
            o.push(r(e, n))
        }), b.infoFunctions().map(function(e) {
            return {
                title: e.name + ":",
                message: e.fn(o)
            }
        })
    }

    function i() {
        return h.findOne("#" + g)
    }

    function a() {
        x || (x = setInterval(s, C))
    }

    function c() {
        clearInterval(x), x = 0
    }

    function u(e, t) {
        var n = [];
        return e.forEach(function(e) {
            null !== e.message && n.push(" <b>" + e.title + "<i>" + e.message + "</i></b>")
        }), n = n.join(""), n += t ? "<span>&times;</span>" : "<b></b>"
    }

    function l() {
        var e = h.create("div", {
            id: g,
            "data-position": b.val("infobox.position") || "0"
        });
        return document.body.appendChild(e), e.addEventListener("click", function(e) {
            "SPAN" === h.tag(e.target) && d()
        }), e
    }

    function s() {
        if (!y) return void c();
        if ("hide" === y) return h.remove([i()]), void c();
        var e = i() || l();
        h.removeClass(e, "hidden"), e.innerHTML = y, y = null
    }

    function f(e) {
        var t = u(e, b.val("infobox.sticky"));
        t !== y && (y = t, a())
    }

    function d() {
        y = "hide", h.addClass(i(), "hidden"), a()
    }
    var m = e.exports = {},
        p = n(14),
        h = n(12),
        b = (n(20), n(5)),
        v = n(7),
        g = "__copytables_infobox__",
        y = null,
        x = 0,
        C = 500;
    m.update = function(e) {
        if (b.val("infobox.enabled")) {
            var t = o(e);
            t && t.length && f(t)
        }
    }, m.remove = function() {
        b.val("infobox.sticky") || d()
    }
}, function(e, t, n) {
    function r() {
        var e = [];
        return i.find("table").forEach(function(t, n) {
            i.cells(t).length && i.visible(t) && e.push({
                index: n,
                table: t
            })
        }), e
    }
    var o = e.exports = {},
        i = n(12),
        a = n(14),
        c = n(15);
    n(20), n(4);
    o.locate = function(e) {
        var t = i.closest(e, "td, th"),
            n = i.closest(t, "table");
        return t && n ? {
            td: t,
            table: n
        } : null
    }, o.indexOf = function(e) {
        var t = -1;
        return r().forEach(function(n) {
            e === n.table && (t = n.index)
        }), t
    }, o.byIndex = function(e) {
        var t = null;
        return r().forEach(function(n) {
            e === n.index && (t = n.table)
        }), t
    }, o.enum = function(e) {
        return r().map(function(t) {
            return t.selected = t.table === e, delete t.table, t
        })
    }, o.copy = function(e, t, n) {
        var r = {
            hasSelection: n,
            url: document.location ? document.location.href : ""
        };
        if (n && i.cells(e).forEach(function(e) {
                a.selected(e) && a.lock(e)
            }), "transfer" === t.method && (r.css = {}, t.keepStyles && i.findSelf("*", e).forEach(function(e, t) {
                i.attr(e, "data-copytables-uid", t), r.css[t] = c.read(e)
            }), r.html = e.outerHTML, t.keepStyles && i.findSelf("*", e).forEach(function(e) {
                i.removeAttr(e, "data-copytables-uid")
            })), "clipboard" === t.method) {
            var o = document.createElement("STYLE");
            o.type = "text/css", o.innerHTML = "* { user-select: auto !important; -webkit-user-select: auto !important }", document.body.appendChild(o), i.select(e);
            var u = function(e) {
                e.stopPropagation()
            };
            document.addEventListener("copy", u, !0), document.execCommand("copy"), document.removeEventListener("copy", u, !0), i.deselect(), document.body.removeChild(o)
        }
        return n && i.cells(e).forEach(function(e) {
            a.selected(e) && a.unlock(e)
        }), r
    }, o.selectCaptured = function(e) {
        i.cells(e).forEach(function(e) {
            a.locked(e) ? a.reset(e) : a.marked(e) && (a.unmark(e), a.select(e))
        })
    }
}, function(e, t, n) {
    function r(e) {
        var t = window.getComputedStyle(e);
        return !(!t.overflowX.match(/scroll|auto/) && !t.overflowY.match(/scroll|auto/)) && (e.scrollWidth > e.clientWidth || e.scrollHeight > e.clientHeight)
    }

    function o(e) {
        for (; e && e !== document.body && e !== document.documentElement;) {
            if (r(e)) return e;
            e = e.parentNode
        }
        return null
    }

    function i(e) {
        return e ? {
            x: e.scrollLeft,
            y: e.scrollTop
        } : {
            x: window.scrollX,
            y: window.scrollY
        }
    }
    var a = e.exports = {},
        c = n(12),
        u = (n(20), n(5));
    a.Scroller = function(e) {
        this.base = o(e.parentNode), this.anchor = i(this.base), this.reset()
    }, a.Scroller.prototype.reset = function() {
        this.amount = u.int("scroll.amount"), this.acceleration = u.int("scroll.acceleration")
    }, a.Scroller.prototype.adjustPoint = function(e) {
        var t = i(this.base);
        return {
            x: e.x + this.anchor.x - t.x,
            y: e.y + this.anchor.y - t.y
        }
    }, a.Scroller.prototype.scroll = function(e) {
        function t(e, t, n, r, o, i, a) {
            return i < e && (t -= e), i > r - e && (t += e), a < e && (n -= e), a > o - e && (n += e), {
                x: t,
                y: n
            }
        }
        if (this.base) {
            var n = c.bounds(this.base),
                r = t(this.amount, this.base.scrollLeft, this.base.scrollTop, this.base.clientWidth, this.base.clientHeight, e.clientX - n.x, e.clientY - n.y);
            this.base.scrollLeft = r.x, this.base.scrollTop = r.y
        } else {
            var r = t(this.amount, window.scrollX, window.scrollY, window.innerWidth, window.innerHeight, e.clientX, e.clientY);
            r.x == window.scrollX && r.y == window.scrollY || window.scrollTo(r.x, r.y)
        }
        this.amount = Math.max(1, Math.min(100, this.amount + this.amount * (this.acceleration / 100)))
    }
}, function(e, t, n) {
    function r(e, t) {
        if ("table" === t) {
            var n = i.closest(e, "table");
            return n ? i.cells(n) : []
        }
        var r = u.locate(e);
        if (!r) return [];
        if ("cell" === t) return [r.td];
        var o = i.bounds(r.td);
        return i.cells(r.table).filter(function(e) {
            var n = i.bounds(e);
            switch (t) {
                case "column":
                    return o.x === n.x;
                case "row":
                    return o.y === n.y
            }
        })
    }
    var o = e.exports = {},
        i = n(12),
        a = n(3),
        c = n(14),
        u = n(23);
    n(22);
    o.selectable = function(e) {
        return !(!e || !i.closest(e, "table") || i.closest(e, "a, input, button, textarea, select, img"))
    }, o.selected = function(e) {
        var t = u.locate(e);
        return t && c.selected(t.td)
    }, o.drop = function() {
        i.find("td, th").forEach(c.reset)
    }, o.active = function() {
        return !!c.find("selected").length
    }, o.table = function() {
        var e = c.find("selected");
        return e.length ? i.closest(e[0], "table") : null
    }, o.start = function(e) {
        var t = u.locate(e);
        return !!t && (window.getSelection().removeAllRanges(), a.background("dropOtherSelections"), o.table() !== t.table && o.drop(), !0)
    }, o.select = function(e, t) {
        if (i.is(e, "table") && (e = i.cells(e)[0]), e && o.start(e)) {
            r(e, t).forEach(c.select)
        }
    }, o.toggle = function(e, t) {
        if (i.is(e, "table") && (e = i.cells(e)[0]), e && o.start(e)) {
            var n = r(e, t),
                a = n.every(c.selected) ? c.reset : c.select;
            n.forEach(a)
        }
    }
}, function(e, t) {
    (e.exports = {}).load = function() {
        return new Promise(function(e) {
            function t() {
                return document && ("interactive" === document.readyState || "complete" === document.readyState)
            }

            function n(r) {
                t() && (document.removeEventListener("readystatechange", n), e())
            }
            if (t()) return e();
            document.addEventListener("readystatechange", n)
        })
    }
}]);
