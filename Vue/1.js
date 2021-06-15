!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? 
    module.exports = t(require("vue")) : 
    "function" == typeof define && define.amd ? define(["vue"], t) : "object" == typeof exports ? exports.VueJsonPretty = t(require("vue")) : e.VueJsonPretty = t(e.vue)
}(this, (function(e) {
    return function() {
        var t = {
            228: function(e) {
                e.exports = function(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var n = 0, o = new Array(t); n < t; n++)
                        o[n] = e[n];
                    return o
                }
            },
            858: function(e) {
                e.exports = function(e) {
                    if (Array.isArray(e))
                        return e
                }
            },
            646: function(e, t, n) {
                var o = n(228);
                e.exports = function(e) {
                    if (Array.isArray(e))
                        return o(e)
                }
            },
            713: function(e) {
                e.exports = function(e, t, n) {
                    return t in e ? Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = n,
                    e
                }
            },
            860: function(e) {
                e.exports = function(e) {
                    if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
                        return Array.from(e)
                }
            },
            884: function(e) {
                e.exports = function(e, t) {
                    if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
                        var n = []
                          , o = !0
                          , r = !1
                          , c = void 0;
                        try {
                            for (var a, l = e[Symbol.iterator](); !(o = (a = l.next()).done) && (n.push(a.value),
                            !t || n.length !== t); o = !0)
                                ;
                        } catch (e) {
                            r = !0,
                            c = e
                        } finally {
                            try {
                                o || null == l.return || l.return()
                            } finally {
                                if (r)
                                    throw c
                            }
                        }
                        return n
                    }
                }
            },
            521: function(e) {
                e.exports = function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
            },
            206: function(e) {
                e.exports = function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
            },
            38: function(e, t, n) {
                var o = n(858)
                  , r = n(884)
                  , c = n(379)
                  , a = n(521);
                e.exports = function(e, t) {
                    return o(e) || r(e, t) || c(e, t) || a()
                }
            },
            319: function(e, t, n) {
                var o = n(646)
                  , r = n(860)
                  , c = n(379)
                  , a = n(206);
                e.exports = function(e) {
                    return o(e) || r(e) || c(e) || a()
                }
            },
            379: function(e, t, n) {
                var o = n(228);
                e.exports = function(e, t) {
                    if (e) {
                        if ("string" == typeof e)
                            return o(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return "Object" === n && e.constructor && (n = e.constructor.name),
                        "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0
                    }
                }
            },
            719: function(e, t, n) {
                "use strict";
                n.r(t),
                n.d(t, {
                    default: function() {
                        return k
                    }
                });
                var o = n(103)
                  , r = n(38)
                  , c = n.n(r)
                  , a = n(319)
                  , l = n.n(a)
                  , i = n(713)
                  , u = n.n(i)
                  , s = (0,
                o.defineComponent)({
                    props: {
                        data: {
                            required: !0,
                            type: String
                        },
                        onClick: Function
                    },
                    render: function() {
                        var e, t = this.data, n = this.onClick;
                        return (0,
                        o.createVNode)("span", {
                            class: "vjs-tree__brackets",
                            onClick: n
                        }, "function" == typeof (e = t) || "[object Object]" === Object.prototype.toString.call(e) && !(0,
                        o.isVNode)(e) ? t : {
                            default: function() {
                                return [t]
                            }
                        })
                    }
                })
                  , d = (0,
                o.defineComponent)({
                    emits: ["change", "update:modelValue"],
                    props: {
                        checked: {
                            type: Boolean,
                            default: !1
                        },
                        isMultiple: Boolean,
                        onChange: Function
                    },
                    setup: function(e, t) {
                        var n = t.emit;
                        return {
                            uiType: (0,
                            o.computed)((function() {
                                return e.isMultiple ? "checkbox" : "radio"
                            }
                            )),
                            model: (0,
                            o.computed)({
                                get: function() {
                                    return e.checked
                                },
                                set: function(e) {
                                    return n("update:modelValue", e)
                                }
                            })
                        }
                    },
                    render: function() {
                        var e = this.uiType
                          , t = this.model
                          , n = this.$emit;
                        return (0,
                        o.createVNode)("label", {
                            class: ["vjs-check-controller", t ? "is-checked" : ""],
                            onClick: function(e) {
                                return e.stopPropagation()
                            }
                        }, [(0,
                        o.createVNode)("span", {
                            class: "vjs-check-controller__inner is-".concat(e)
                        }, null), (0,
                        o.createVNode)("input", {
                            checked: t,
                            class: "vjs-check-controller__original is-".concat(e),
                            type: e,
                            onChange: function() {
                                return n("change", t)
                            }
                        }, null)])
                    }
                });
                function p(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        t && (o = o.filter((function(t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable
                        }
                        ))),
                        n.push.apply(n, o)
                    }
                    return n
                }
                function h(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? p(Object(n), !0).forEach((function(t) {
                            u()(e, t, n[t])
                        }
                        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : p(Object(n)).forEach((function(t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                        }
                        ))
                    }
                    return e
                }
                function f(e) {
                    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
                }
                function y(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "root"
                      , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                      , o = arguments.length > 3 ? arguments[3] : void 0
                      , r = o || {}
                      , a = r.key
                      , l = r.index
                      , i = r.type
                      , s = void 0 === i ? "content" : i
                      , d = r.showComma
                      , p = void 0 !== d && d
                      , b = r.length
                      , v = void 0 === b ? 1 : b
                      , m = f(e);
                    if ("array" === m) {
                        var g = e.map((function(e, o, r) {
                            return y(e, "".concat(t, "[").concat(o, "]"), n + 1, {
                                index: o,
                                showComma: o !== r.length - 1,
                                length: v,
                                type: s
                            })
                        }
                        )).flat();
                        return [y("[", t, n, {
                            showComma: !1,
                            key: a,
                            length: e.length,
                            type: "arrayStart"
                        })[0]].concat(g, y("]", t, n, {
                            showComma: p,
                            length: e.length,
                            type: "arrayEnd"
                        })[0])
                    }
                    if ("object" === m) {
                        var O = Object.keys(e)
                          , j = O.map((function(o, r, c) {
                            return y(e[o], o.includes(".") ? "".concat(t, '["').concat(o, '"]') : "".concat(t, ".").concat(o), n + 1, {
                                key: o,
                                showComma: r !== c.length - 1,
                                length: v,
                                type: s
                            })
                        }
                        )).flat();
                        return [y("{", t, n, {
                            showComma: !1,
                            key: a,
                            index: l,
                            length: O.length,
                            type: "objectStart"
                        })[0]].concat(j, y("}", t, n, {
                            showComma: p,
                            length: O.length,
                            type: "objectEnd"
                        })[0])
                    }
                    var k = Object.entries({
                        content: e,
                        level: n,
                        key: a,
                        index: l,
                        path: t,
                        showComma: p,
                        length: v,
                        type: s
                    }).reduce((function(e, t) {
                        var n = c()(t, 2)
                          , o = n[0]
                          , r = n[1];
                        return void 0 !== r ? h(h({}, e), {}, u()({}, o, r)) : e
                    }
                    ), {});
                    return [k]
                }
                function b(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        t && (o = o.filter((function(t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable
                        }
                        ))),
                        n.push.apply(n, o)
                    }
                    return n
                }
                function v(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? b(Object(n), !0).forEach((function(t) {
                            u()(e, t, n[t])
                        }
                        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : b(Object(n)).forEach((function(t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                        }
                        ))
                    }
                    return e
                }
                var m = {
                    showLength: {
                        type: Boolean,
                        default: !1
                    },
                    showDoubleQuotes: {
                        type: Boolean,
                        default: !0
                    },
                    customValueFormatter: Function,
                    selectableType: String,
                    showSelectController: {
                        type: Boolean,
                        default: !1
                    },
                    showLine: {
                        type: Boolean,
                        default: !0
                    },
                    selectOnClickNode: {
                        type: Boolean,
                        default: !0
                    },
                    collapsedOnClickBrackets: {
                        type: Boolean,
                        default: !0
                    },
                    pathSelectable: {
                        type: Function,
                        default: function() {
                            return !0
                        }
                    },
                    highlightSelectedNode: {
                        type: Boolean,
                        default: !0
                    }
                }
                  , g = (0,
                o.defineComponent)({
                    name: "TreeNode",
                    props: v(v({}, m), {}, {
                        node: {
                            type: Object,
                            required: !0
                        },
                        collapsed: Boolean,
                        checked: Boolean,
                        onTreeNodeClick: {
                            type: Function
                        },
                        onBracketsClick: {
                            type: Function
                        },
                        onSelectedChange: {
                            type: Function
                        }
                    }),
                    setup: function(e, t) {
                        var n = t.emit
                          , r = (0,
                        o.computed)((function() {
                            return f(e.node.content)
                        }
                        ))
                          , c = (0,
                        o.computed)((function() {
                            return "vjs-value vjs-value__".concat(r.value)
                        }
                        ))
                          , a = (0,
                        o.computed)((function() {
                            return e.showDoubleQuotes ? '"'.concat(e.node.key, '"') : e.node.key
                        }
                        ))
                          , l = (0,
                        o.computed)((function() {
                            return "multiple" === e.selectableType
                        }
                        ))
                          , i = (0,
                        o.computed)((function() {
                            return "single" === e.selectableType
                        }
                        ))
                          , u = (0,
                        o.computed)((function() {
                            return e.pathSelectable(e.node.path, e.node.content) && (l.value || i.value)
                        }
                        ))
                          , s = function(e) {
                            var t = e + "";
                            return "string" === r.value && (t = '"'.concat(t, '"')),
                            t
                        };
                        return {
                            state: (0,
                            o.reactive)({
                                valueClass: c,
                                prettyKey: a,
                                isMultiple: l,
                                selectable: u
                            }),
                            defaultFormatter: s,
                            customFormatter: function(t) {
                                return e.customValueFormatter ? e.customValueFormatter(t, e.node.key, e.node.path, s(t)) : s(t)
                            },
                            onBracketsClickHandler: function() {
                                e.collapsedOnClickBrackets && n("brackets-click", !e.collapsed, e.node.path)
                            },
                            onCheckedChange: function() {
                                n("selected-change", e.node)
                            },
                            onNodeClick: function() {
                                n("tree-node-click", e.node),
                                u.value && e.selectOnClickNode && n("selected-change", e.node)
                            }
                        }
                    },
                    render: function() {
                        var e = this.state
                          , t = this.node
                          , n = this.showSelectController
                          , r = this.highlightSelectedNode
                          , c = this.checked
                          , a = this.showLength
                          , l = this.collapsed
                          , i = this.showLine
                          , u = this.customValueFormatter
                          , p = this.defaultFormatter
                          , h = this.customFormatter
                          , f = this.onNodeClick
                          , y = this.onCheckedChange
                          , b = this.onBracketsClickHandler;
                        return (0,
                        o.createVNode)("div", {
                            class: {
                                "vjs-tree__node": !0,
                                "has-selector": n,
                                "is-highlight": r && c
                            },
                            onClick: f
                        }, [n && e.selectable && "objectEnd" !== t.type && "arrayEnd" !== t.type && (0,
                        o.createVNode)(d, {
                            isMultiple: e.isMultiple,
                            checked: c,
                            onChange: y
                        }, null), Array.from(Array(t.level)).map((function(e, t) {
                            return (0,
                            o.createVNode)("div", {
                                key: t,
                                class: {
                                    "vjs-tree__indent": !0,
                                    "has-line": i
                                }
                            }, null)
                        }
                        )), t.key && (0,
                        o.createVNode)("span", {
                            class: "vjs-key"
                        }, ["".concat(e.prettyKey, ": ")]), (0,
                        o.createVNode)("span", null, ["content" !== t.type ? (0,
                        o.createVNode)(s, {
                            data: t.content,
                            onClick: b
                        }, null) : u ? (0,
                        o.createVNode)("span", {
                            class: e.valueClass,
                            innerHTML: h(t.content)
                        }, null) : (0,
                        o.createVNode)("span", {
                            class: e.valueClass
                        }, [p(t.content)]), t.showComma && (0,
                        o.createVNode)("span", null, [","]), a && l && (0,
                        o.createVNode)("span", {
                            class: "vjs-comment"
                        }, [(0,
                        o.createTextVNode)(" // "), t.length, (0,
                        o.createTextVNode)(" items ")])])])
                    }
                });
                function O(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        t && (o = o.filter((function(t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable
                        }
                        ))),
                        n.push.apply(n, o)
                    }
                    return n
                }
                function j(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? O(Object(n), !0).forEach((function(t) {
                            u()(e, t, n[t])
                        }
                        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : O(Object(n)).forEach((function(t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                        }
                        ))
                    }
                    return e
                }
                var k = (0,
                o.defineComponent)({
                    name: "Tree",
                    props: j(j({}, m), {}, {
                        data: {
                            type: Object,
                            default: null
                        },
                        deep: {
                            type: Number,
                            default: 1 / 0
                        },
                        path: {
                            type: String,
                            default: "root"
                        },
                        virtual: {
                            type: Boolean,
                            default: !1
                        },
                        itemHeight: {
                            type: Number,
                            default: 20
                        },
                        modelValue: {
                            type: [String, Array],
                            default: function() {
                                return ""
                            }
                        }
                    }),
                    emits: ["click", "change", "update:modelValue"],
                    setup: function(e, t) {
                        var n = t.emit
                          , r = (0,
                        o.ref)()
                          , a = (0,
                        o.reactive)({
                            translateY: 0,
                            visibleData: null,
                            hiddenPaths: y(e.data, e.path).reduce((function(t, n) {
                                return "objectStart" !== n.type && "arrayStart" !== n.type || n.level !== e.deep ? t : j(j({}, t), {}, u()({}, n.path, 1))
                            }
                            ), {})
                        })
                          , i = (0,
                        o.computed)((function() {
                            var t = null;
                            return y(e.data, e.path).reduce((function(e, n, o) {
                                var r = j(j({}, n), {}, {
                                    id: o
                                })
                                  , c = a.hiddenPaths[r.path];
                                if (t && t.path === r.path) {
                                    var l = "objectStart" === t.type
                                      , i = j(j(j({}, t), r), {}, {
                                        content: l ? "{...}" : "[...]",
                                        type: l ? "objectCollapsed" : "arrayCollapsed"
                                    });
                                    return t = null,
                                    e.concat(i)
                                }
                                return c && !t ? (t = r,
                                e) : t ? e : e.concat(r)
                            }
                            ), [])
                        }
                        ))
                          , s = (0,
                        o.computed)((function() {
                            var t = e.modelValue;
                            return t && "multiple" === e.selectableType && Array.isArray(t) ? t : [t]
                        }
                        ))
                          , d = (0,
                        o.computed)((function() {
                            return !e.selectableType || e.selectOnClickNode || e.showSelectController ? "" : "When selectableType is not null, selectOnClickNode and showSelectController cannot be false at the same time, because this will cause the selection to fail."
                        }
                        ))
                          , p = function(t) {
                            if (e.virtual) {
                                var n = r.value
                                  , o = n && n.scrollTop || 0
                                  , c = Math.floor(o / e.itemHeight)
                                  , l = c < 0 ? 0 : c + 10 > t.length ? t.length - 10 : c;
                                l < 0 && (l = 0);
                                var i = l + 10;
                                a.translateY = l * e.itemHeight,
                                a.visibleData = t.filter((function(e, t) {
                                    return t >= l && t < i
                                }
                                ))
                            } else
                                a.visibleData = t
                        };
                        return (0,
                        o.watchEffect)((function() {
                            d.value && function(e) {
                                throw new Error("[VueJSONPretty] ".concat(e))
                            }(d.value)
                        }
                        )),
                        (0,
                        o.watchEffect)((function() {
                            i.value && p(i.value)
                        }
                        )),
                        {
                            tree: r,
                            state: a,
                            flatData: i,
                            selectedPaths: s,
                            onTreeScroll: function() {
                                p(i.value)
                            },
                            onSelectedChange: function(t) {
                                var o = t.path
                                  , r = e.selectableType;
                                if ("multiple" === r) {
                                    var a = s.value.findIndex((function(e) {
                                        return e === o
                                    }
                                    ))
                                      , i = l()(s.value);
                                    -1 !== a ? i.splice(a, 1) : i.push(o),
                                    n("update:modelValue", i),
                                    n("change", i, l()(s.value))
                                } else if ("single" === r && s.value[0] !== o) {
                                    var u = c()(s.value, 1)[0]
                                      , d = o;
                                    n("update:modelValue", d),
                                    n("change", d, u)
                                }
                            },
                            onTreeNodeClick: function(e) {
                                var t = e.content
                                  , o = e.path;
                                n("click", o, t)
                            },
                            onBracketsClick: function(e, t) {
                                if (e)
                                    a.hiddenPaths = j(j({}, a.hiddenPaths), {}, u()({}, t, 1));
                                else {
                                    var n = j({}, a.hiddenPaths);
                                    delete n[t],
                                    a.hiddenPaths = n
                                }
                            }
                        }
                    },
                    render: function() {
                        var e, t = this.virtual, n = this.itemHeight, r = this.customValueFormatter, c = this.showDoubleQuotes, a = this.showLength, l = this.showLine, i = this.showSelectController, u = this.selectOnClickNode, s = this.pathSelectable, d = this.highlightSelectedNode, p = this.collapsedOnClickBrackets, h = this.state, f = this.flatData, y = this.selectedPaths, b = this.selectableType, v = this.onTreeNodeClick, m = this.onBracketsClick, O = this.onSelectedChange, j = this.onTreeScroll, k = h.visibleData && h.visibleData.map((function(e) {
                            return (0,
                            o.createVNode)(g, {
                                key: e.id,
                                node: e,
                                collapsed: !!h.hiddenPaths[e.path],
                                "custom-value-formatter": r,
                                "show-double-quotes": c,
                                "show-length": a,
                                "collapsed-on-click-brackets": p,
                                checked: y.includes(e.path),
                                "selectable-type": b,
                                "show-line": l,
                                "show-select-controller": i,
                                "select-on-click-node": u,
                                "path-selectable": s,
                                "highlight-selected-node": d,
                                onTreeNodeClick: v,
                                onBracketsClick: m,
                                onSelectedChange: O
                            }, null)
                        }
                        ));
                        return (0,
                        o.createVNode)("div", {
                            ref: "tree",
                            class: {
                                "vjs-tree": !0,
                                "is-virtual": t
                            },
                            onScroll: j
                        }, [t ? (0,
                        o.createVNode)("div", {
                            style: {
                                height: "".concat(f.length * n, "px")
                            }
                        }, [(0,
                        o.createVNode)("div", {
                            style: {
                                transform: "translateY(".concat(h.translateY, "px)")
                            }
                        }, (e = k,
                        "function" == typeof e || "[object Object]" === Object.prototype.toString.call(e) && !(0,
                        o.isVNode)(e) ? k : {
                            default: function() {
                                return [k]
                            }
                        }))]) : k])
                    }
                })
            },
            103: function(t) {
                "use strict";
                t.exports = e
            }
        }
          , n = {};
        function o(e) {
            if (n[e])
                return n[e].exports;
            var r = n[e] = {
                exports: {}
            };
            return t[e](r, r.exports, o),
            r.exports
        }
        return o.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return o.d(t, {
                a: t
            }),
            t
        }
        ,
        o.d = function(e, t) {
            for (var n in t)
                o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, {
                    enumerable: !0,
                    get: t[n]
                })
        }
        ,
        o.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        o.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        o(719)
    }()
}
));
