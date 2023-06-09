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
    e.exports = n(1)
}, function(e, t, n) {
    ! function() {
        n(2).main()
    }()
}, function(e, t, n) {
    function r() {
        u.create(), i.listen(d), a.callChrome("contextMenus.onClicked.addListener", function(e, t) {
            l.exec(e.menuItemId, {
                tabId: t.id,
                frameId: e.frameId
            })
        }), a.callChrome("commands.onCommand.addListener", function(e) {
            l.exec(e, null)
        }), f.updateUI()
    }
    var o = e.exports = {},
        i = n(3),
        a = n(4),
        c = n(5),
        u = n(8),
        l = n(9),
        f = (n(10), n(17)),
        d = {
            dropAllSelections: function(e) {
                i.allFrames("dropSelection")
            },
            dropOtherSelections: function(e) {
                i.enumFrames("active").then(function(t) {
                    t.forEach(function(t) {
                        t.frameId !== e.sender.frameId && i.frame("dropSelection", t)
                    })
                })
            },
            contextMenu: function(e) {
                f.enumTables().then(function(t) {
                    u.enable(["select_row", "select_column", "select_table"], e.selectable), u.enable(["copy"], e.selectable), u.enable(["find_previous", "find_next"], t.length > 0)
                })
            },
            genericCopy: function(e) {
                l.exec("copy", e.sender)
            },
            preferencesUpdated: function(e) {
                f.updateUI(), i.broadcast("preferencesUpdated")
            },
            command: function(e) {
                l.exec(e.command, e.sender)
            }
        };
    o.main = function() {
        c.load().then(r)
    }
}, function(e, t, n) {
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
        f = c.modifiers.ALT,
        d = c.mac ? c.modifiers.META : c.modifiers.CTRL,
        s = {
            "modifier.cell": f,
            "modifier.column": f | d,
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
            return e = e || {}, "modKey" in e && "1" === String(e.modKey) && (e["modifier.cell"] = d, delete e.modKey), b = Object.assign({}, s, b, e), b["scroll.amount"] = i(1, b["scroll.amount"], 100), b["scroll.acceleration"] = i(0, b["scroll.acceleration"], 100), b["number.group"] || (b["number.group"] = u.defaultFormat().group), b["number.decimal"] || (b["number.decimal"] = u.defaultFormat().decimal), b
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
}, function(e, t, n) {
    function r(e, t) {
        var n = {
            enabled: !0,
            contexts: ["page", "selection", "link", "editable"]
        };
        t && (n.parentId = t), "---" === e ? (n.id = "uid" + ++u, n.type = "separator") : (n.id = e.id, n.title = e.title);
        var o = e.children;
        if ("copyAs" === e.id) {
            var c = i.copyFormats().filter(function(e) {
                return e.enabled
            });
            if (!c.length) return;
            o = c.map(function(e) {
                return {
                    id: "copy_" + e.id,
                    title: e.name
                }
            })
        }
        var l = a.callChrome("contextMenus.create", n);
        return o && o.forEach(function(e) {
            r(e, l)
        }), l
    }
    var o = e.exports = {},
        i = n(5),
        a = n(4),
        c = {
            id: "root",
            title: "Table...",
            children: [{
                id: "select_row",
                title: "Select Row"
            }, {
                id: "select_column",
                title: "Select Column"
            }, {
                id: "select_table",
                title: "Select Table"
            }, "---", {
                id: "find_previous",
                title: "Previous Table"
            }, {
                id: "find_next",
                title: "Next Table"
            }, "---", {
                id: "copy",
                title: "Copy"
            }, {
                id: "copyAs",
                title: "Copy..."
            }]
        },
        u = 0;
    o.create = function() {
        a.callChromeAsync("contextMenus.removeAll").then(function() {
            r(c)
        })
    }, o.enable = function(e, t) {
        e.forEach(function(e) {
            if (a.callChrome("contextMenus.update", e, {
                    enabled: t
                }), "copy" === e) {
                i.copyFormats().filter(function(e) {
                    return e.enabled
                }).forEach(function(e) {
                    a.callChrome("contextMenus.update", "copy_" + e.id, {
                        enabled: t
                    })
                })
            }
        })
    }
}, function(e, t, n) {
    function r(e, t) {
        if (!t) return s.findTable(e);
        u.frame("tableIndexFromContextMenu", t).then(function(n) {
            null !== n.data ? s.findTable(e, {
                tabId: t.tabId,
                frameId: t.frameId,
                index: n.data
            }) : s.findTable(e)
        })
    }

    function o(e, t) {
        function n(t) {
            if (t.data) return o = d.exec(e, t.data), !0
        }
        var r = {
                name: "beginCopy",
                broadcast: !t,
                options: d.options(e)
            },
            o = !0;
        t ? u.frame(r, t).then(function(e) {
            n(e), u.frame(o ? "endCopy" : "endCopyFailed", t)
        }) : u.allFrames(r).then(function(e) {
            e.some(n), u.allFrames(o ? "endCopy" : "endCopyFailed")
        })
    }

    function i(e) {
        "zzz" === e && (e = ""), l.val("_captureMode") === e && (e = ""), l.set("_captureMode", e).then(function() {
            s.updateUI(), u.allFrames("preferencesUpdated")
        })
    }

    function a(e, t) {
        t && u.frame({
            name: "selectFromContextMenu",
            mode: e
        }, t)
    }
    var c = e.exports = {},
        u = n(3),
        l = n(5),
        f = n(4),
        d = (n(8), n(10)),
        s = n(17);
    c.exec = function(e, t) {
        t && void 0 === t.tabId && (t = null), "copy" === e && l.copyFormats().forEach(function(t) {
            t.default && (e = "copy_" + t.id)
        });
        var n;
        if (n = e.match(/^copy_(\w+)/)) return o(n[1], t);
        if (n = e.match(/^capture_(\w+)/)) return i(n[1]);
        if (n = e.match(/^select_(\w+)/)) return a(n[1], t);
        switch (e) {
            case "find_next":
                return r(1, t);
            case "find_previous":
                return r(-1, t);
            case "open_options":
                return f.callChrome("runtime.openOptionsPage");
            case "open_commands":
                return f.callChrome("tabs.create", {
                    url: "chrome://extensions/configureCommands"
                })
        }
    }
}, function(e, t, n) {
    function r(e) {
        return e = f.map(e, function(e, t) {
            return d.strip(d.nobr(t))
        }), f.trim(e, Boolean)
    }

    function o(e) {
        return r(e).map(function(e) {
            return e.join("\t")
        }).join("\n")
    }

    function i(e) {
        return r(e).map(function(e) {
            return e.map(function(e) {
                return e.match(/^\w+$/) || e.match(/^-?[0-9]+(\.[0-9]*)?$/) ? e : '"' + e.replace(/"/g, '""') + '"'
            }).join(",")
        }).join("\n")
    }

    function a(e, t) {
        return e.map(function(e) {
            return e.filter(function(e) {
                return e.td
            }).map(function(e) {
                var n = "",
                    r = "";
                return n = t ? l.htmlContent(e.td) : l.textContent(e.td), e.colSpan && (r += "\\" + (e.colSpan + 1)), e.rowSpan && (r += "/" + (e.rowSpan + 1)), r && (r += "."), "|" + r + " " + n.replace("|", "&#124;")
            }).join(" ") + " |"
        }).join("\n")
    }
    var c = e.exports = {},
        u = n(11),
        l = n(12),
        f = n(13),
        d = n(4),
        s = n(16);
    c.formats = {}, c.formats.richHTMLCSS = {
        opts: {
            method: "clipboard",
            withSelection: !0,
            keepStyles: !0,
            keepHidden: !1
        },
        exec: function(e) {
            s.copyRich(e.html())
        }
    }, c.formats.richHTML = {
        opts: {
            method: "clipboard",
            withSelection: !0,
            keepStyles: !1,
            keepHidden: !1
        },
        exec: function(e) {
            s.copyRich(e.html())
        }
    }, c.formats.textTabs = {
        opts: {
            method: "clipboard",
            withSelection: !0,
            keepStyles: !1,
            keepHidden: !1
        },
        exec: function(e) {
            s.copyText(o(e.textMatrix()))
        }
    }, c.formats.textTabsSwap = {
        opts: {
            method: "clipboard",
            withSelection: !0,
            keepStyles: !1,
            keepHidden: !1
        },
        exec: function(e) {
            s.copyText(o(f.transpose(e.textMatrix())))
        }
    }, c.formats.textCSV = {
        opts: {
            method: "clipboard",
            withSelection: !0,
            keepStyles: !1,
            keepHidden: !1
        },
        exec: function(e) {
            s.copyText(i(e.textMatrix()))
        }
    }, c.formats.textCSVSwap = {
        opts: {
            method: "clipboard",
            withSelection: !0,
            keepStyles: !1,
            keepHidden: !1
        },
        exec: function(e) {
            s.copyText(i(f.transpose(e.textMatrix())))
        }
    }, c.formats.textHTML = {
        opts: {
            method: "clipboard",
            withSelection: !0,
            keepStyles: !1,
            keepHidden: !0
        },
        exec: function(e) {
            s.copyText(d.reduceWhitespace(e.html()))
        }
    }, c.formats.textHTMLCSS = {
        opts: {
            method: "clipboard",
            withSelection: !0,
            keepStyles: !0,
            keepHidden: !0
        },
        exec: function(e) {
            s.copyText(d.reduceWhitespace(e.html()))
        }
    }, c.formats.textTextileHTML = {
        opts: {
            method: "clipboard",
            withSelection: !0,
            keepStyles: !1,
            keepHidden: !1
        },
        exec: function(e) {
            s.copyText(a(e.nodeMatrix(), !0))
        }
    }, c.formats.textTextile = {
        opts: {
            method: "clipboard",
            withSelection: !0,
            keepStyles: !1,
            keepHidden: !1
        },
        exec: function(e) {
            s.copyText(a(e.nodeMatrix(), !1))
        }
    }, c.options = function(e) {
        return c.formats[e].opts
    }, c.exec = function(e, t) {
        var n = !1,
            r = new u.table,
            o = c.formats[e];
        return r.init(t, o.opts) && (o.exec(r), n = !0), r.destroy(), n
    }
}, function(e, t, n) {
    function r(e) {
        var t = {},
            n = {},
            r = {};
        l.cells(e).forEach(function(e) {
            var o = l.bounds(e),
                i = o.x,
                a = o.y;
            r[i] = n[a] = 1, t[a + "/" + i] = e
        }), n = Object.keys(n).sort(d.numeric), r = Object.keys(r).sort(d.numeric);
        var o = n.map(function(e) {
            return r.map(function(n) {
                var r = t[e + "/" + n];
                return r ? {
                    td: r
                } : {}
            })
        });
        return f.each(o, function(e, t, n, r) {
            if (t.td) {
                for (var i = parseInt(l.attr(t.td, "rowSpan")) || 1, a = parseInt(l.attr(t.td, "colSpan")) || 1, c = 1; c < a; c++) e[r + c] && !e[r + c].td && (e[r + c].colRef = t);
                for (var c = 1; c < i; c++) o[n + c] && o[n + c][r] && !o[n + c][r].td && (o[n + c][r].rowRef = t)
            }
        }), o
    }

    function o(e) {
        f.each(e, function(e, t) {
            t.colRef && (t.colRef.colSpan = (t.colRef.colSpan || 0) + 1), t.rowRef && (t.rowRef.rowSpan = (t.rowRef.rowSpan || 0) + 1)
        })
    }

    function i(e) {
        var t = f.trim(r(e), function(e) {
                return s.selected(e.td)
            }),
            n = [];
        f.each(t, function(e, t) {
            t.td && n.push(t.td)
        });
        var i = [];
        l.cells(e).forEach(function(e) {
            n.indexOf(e) < 0 ? i.push(e) : s.selected(e) || (e.innerHTML = "")
        }), l.remove(i), i = [], l.find("tr", e).forEach(function(e) {
            0 === l.find("td, th", e).length && i.push(e)
        }), l.remove(i), o(t), f.each(t, function(e, t) {
            t.td && (l.attr(t.td, "rowSpan", t.rowSpan ? t.rowSpan + 1 : null), l.attr(t.td, "colSpan", t.colSpan ? t.colSpan + 1 : null))
        })
    }

    function a(e, t) {
        function n(e) {
            return o.href = e, o.href
        }

        function r(t, r) {
            l.find(t, e).forEach(function(e) {
                r.forEach(function(t) {
                    var r = l.attr(e, t);
                    r && l.attr(e, t, n(r))
                })
            })
        }
        var o = e.ownerDocument.createElement("A");
        r("A, AREA, LINK", ["href"]), r("IMG, INPUT, SCRIPT", ["src", "longdesc", "usemap"]), r("FORM", ["action"]), r("Q, BLOCKQUOTE, INS, DEL", ["cite"]), r("OBJECT", ["classid", "codebase", "data", "usemap"]), t && l.find("*", e).forEach(function(e) {
            var t = l.attr(e, "style");
            if (t && !(t.toLowerCase().indexOf("url") < 0)) {
                var r = t.replace(/(\burl\s*\()([^()]+)/gi, function(e, t, r) {
                    return r = d.strip(r), '"' === r[0] || "'" === r[0] ? t + r[0] + n(r.slice(1, -1)) + r[0] : t + n(r)
                });
                r !== t && l.attr(e, "style", r)
            }
        })
    }

    function c(e) {
        var t = [];
        l.find("*", e).forEach(function(e) {
            l.visible(e) || t.push(e)
        }), t.length && l.remove(t)
    }
    var u = e.exports = {},
        l = n(12),
        f = n(13),
        d = n(4),
        s = n(14),
        m = n(15),
        p = n(16);
    var tcc;
    tcc = function(e) {
        var t = document.createElement("textarea");
        document.body.appendChild(t), t.value = e, t.focus(), t.select(), document.execCommand("copy"), document.body.removeChild(t)
    }, u.table = function() {}, u.table.prototype.init = function(e, t) {
        this.frame = document.createElement("IFRAME"), this.frame.setAttribute("sandbox", "allow-same-origin"), document.body.appendChild(this.frame), this.doc = this.frame.contentDocument, this.body = this.doc.body;
        var n = this.doc.createElement("BASE");
        l.attr(n, "href", e.url), this.body.appendChild(n);
        var r = this.doc.createElement("STYLE");
        return r.type = "text/css", r.innerHTML = "td { min-width: 1px; }", this.body.appendChild(r), this.div = this.doc.createElement("DIV"), this.div.contentEditable = !0, this.body.appendChild(this.div), this.initTable(e, t)
    }, u.table.prototype.initTable = function(e, t) {
        return "clipboard" === t.method && (this.div.focus(), this.div.innerHTML = p.content(), p.copyText("")), "transfer" === t.method && (this.div.innerHTML = e.html), this.table = l.findOne("table", this.div), !(!this.table || "TABLE" !== l.tag(this.table)) && (e.hasSelection && i(this.table), "transfer" === t.method && t.keepStyles && l.findSelf("*", this.table).forEach(function(t) {
            var n = l.attr(t, "data-copytables-uid");
            n && t.style && (l.removeAttr(t, "style"), t.style.cssText = m.compute(m.read(t), e.css[n] || {})), l.removeAttr(t, "data-copytables-uid")
        }), "transfer" !== t.method || t.keepHidden || c(this.div), a(this.div, t.keepStyles), l.cells(this.table).forEach(s.reset), t.keepStyles || l.findSelf("*", this.table).forEach(function(e) {
            l.removeAttr(e, "style"), l.removeAttr(e, "class")
        }), !0)
    }, u.table.prototype.html = function() {
        return this.table.outerHTML
    }, u.table.prototype.nodeMatrix = function() {
        var e = r(this.table);
        return o(e), e
    }, u.table.prototype.textMatrix = function() {
        return f.map(r(this.table), function(e, t) {
            return l.textContent(t.td)
        })
    }, u.table.prototype.destroy = function() {
        this.frame && document.body.removeChild(this.frame)
    }
}, function(e, t) {
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
}, function(e, t) {
    var n = e.exports = {};
    n.column = function(e, t) {
        return e.map(function(e) {
            return e[t]
        })
    }, n.transpose = function(e) {
        return e.length ? e[0].map(function(t, r) {
            return n.column(e, r)
        }) : e
    }, n.trim = function(e, t) {
        var r = function(e) {
            return e.some(function(e) {
                return t(e)
            })
        };
        return e = e.filter(r), e = n.transpose(e).filter(r), n.transpose(e)
    }, n.each = function(e, t) {
        e.forEach(function(e, n) {
            e.forEach(function(r, o) {
                t(e, r, n, o)
            })
        })
    }, n.map = function(e, t) {
        return e.map(function(e, n) {
            return e.map(function(r, o) {
                return t(e, r, n, o)
            })
        })
    }
}, function(e, t, n) {
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
}, function(e, t, n) {
    var r = e.exports = {},
        o = n(12);
    n(4);
    r.copyRich = function(e) {
        var t = document.createElement("div");
        document.body.appendChild(t), t.contentEditable = !0, t.innerHTML = e, o.select(t), document.execCommand("copy"), document.body.removeChild(t)
    }, r.copyText = function(e) {
        var t = document.createElement("textarea");
        document.body.appendChild(t), t.value = e, t.focus(), t.select(), document.execCommand("copy"), document.body.removeChild(t)
    }, r.content = function() {
        var e = "",
            t = !1,
            n = function(n) {
                t || (t = !0, e = n.clipboardData.getData("text/html"), n.stopPropagation(), n.preventDefault())
            };
        return document.addEventListener("paste", n, !0), document.execCommand("paste"), document.removeEventListener("paste", n), e
    }
}, function(e, t, n) {
    var r = e.exports = {},
        o = n(3),
        i = n(5),
        a = n(4),
        c = n(8);
    r.updateUI = function() {
        i.load().then(function() {
            c.create(), r.updateBadge()
        })
    }, r.setBadge = function(e) {
        a.callChrome("browserAction.setBadgeText", {
            text: e
        }), a.callChrome("browserAction.setBadgeBackgroundColor", {
            color: "#1e88ff"
        })
    }, r.updateBadge = function() {
        switch (i.val("_captureMode")) {
            case "column":
                return r.setBadge("C");
            case "row":
                return r.setBadge("R");
            case "cell":
                return r.setBadge("E");
            case "table":
                return r.setBadge("T");
            default:
                r.setBadge("")
        }
    }, r.enumTables = function() {
        return o.allFrames("enumTables").then(function(e) {
            var t = [];
            return e.forEach(function(e) {
                t = t.concat((e.data || []).map(function(t) {
                    return t.frame = {
                        tabId: e.receiver.tabId,
                        frameId: e.receiver.frameId
                    }, t
                }))
            }), t.sort(function(e, t) {
                return e.frame.frameId - t.frame.frameId || e.index - t.index
            })
        })
    }, r.findTable = function(e, t) {
        r.enumTables().then(function(n) {
            if (n.length) {
                var r = -1;
                n.some(function(e, n) {
                    return t && e.frame.frameId == t.frameId && e.frame.tabId === t.tabId && e.index === t.index ? (r = n, !0) : !t && e.selected ? (r = n, !0) : void 0
                }), 1 === e ? -1 === r || r === n.length - 1 ? r = 0 : r += 1 : -1 === r || 0 === r ? r = n.length - 1 : r--;
                var i = n[r];
                o.frame({
                    name: "selectTableByIndex",
                    index: i.index
                }, i.frame)
            }
        })
    }
}]);
