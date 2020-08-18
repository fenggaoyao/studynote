! function (t) {
    var e = {};

    function r(n) {
        if (e[n]) return e[n].exports;
        var o = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }
    r.m = t, r.c = e, r.d = function (t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }, r.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, r.t = function (t, e) {
        if (1 & e && (t = r(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var o in t) r.d(n, o, function (e) {
                return t[e]
            }.bind(null, o));
        return n
    }, r.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return r.d(e, "a", e), e
    }, r.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, r.p = "", r(r.s = 0)
}([function (t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function o(t, e) {
        var r;
        if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
            if (Array.isArray(t) || (r = function (t, e) {
                    if (!t) return;
                    if ("string" == typeof t) return i(t, e);
                    var r = Object.prototype.toString.call(t).slice(8, -1);
                    "Object" === r && t.constructor && (r = t.constructor.name);
                    if ("Map" === r || "Set" === r) return Array.from(t);
                    if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return i(t, e)
                }(t)) || e && t && "number" == typeof t.length) {
                r && (t = r);
                var n = 0,
                    o = function () {};
                return {
                    s: o,
                    n: function () {
                        return n >= t.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: t[n++]
                        }
                    },
                    e: function (t) {
                        throw t
                    },
                    f: o
                }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var u, a = !0,
            s = !1;
        return {
            s: function () {
                r = t[Symbol.iterator]()
            },
            n: function () {
                var t = r.next();
                return a = t.done, t
            },
            e: function (t) {
                s = !0, u = t
            },
            f: function () {
                try {
                    a || null == r.return || r.return()
                } finally {
                    if (s) throw u
                }
            }
        }
    }

    function i(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
        return n
    }

    function u(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function a(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
    }

    function s(t, e, r) {
        return e && a(t.prototype, e), r && a(t, r), t
    }
    r.r(e);
    var c = function () {
            function t(e) {
                u(this, t), this.type = e, this.props = Object.create(null), this.children = []
            }
            return s(t, [{
                key: "setAttribute",
                value: function (t, e) {
                    this.props[t] = e
                }
            }, {
                key: "appendChild",
                value: function (t) {
                    this.children.push(t.vdom)
                }
            }, {
                key: "mountTo",
                value: function (t) {
                    this.range = t;
                    var e = document.createComment("placeholder"),
                        r = document.createRange();
                    r.setStart(t.endContainer, t.endOffset), r.setEnd(t.endContainer, t.endOffset), r.insertNode(e), t.deleteContents();
                    var n = document.createElement(this.type);
                    for (var i in this.props) {
                        var u = this.props[i];
                        if (i.match(/^on([\s\S]+)$/)) {
                            var a = RegExp.$1.replace(/^[\s\S]/, (function (t) {
                                return t.toLowerCase()
                            }));
                            n.addEventListener(a, u)
                        }
                        "className" === i && (i = "class"), n.setAttribute(i, u)
                    }
                    var s, c = o(this.children);
                    try {
                        for (c.s(); !(s = c.n()).done;) {
                            var l = s.value,
                                f = document.createRange();
                            n.children.length ? (f.setStartAfter(n.lastChild), f.setEndAfter(n.lastChild)) : (f.setStart(n, 0), f.setEnd(n, 0)), l.mountTo(f)
                        }
                    } catch (t) {
                        c.e(t)
                    } finally {
                        c.f()
                    }
                    t.insertNode(n)
                }
            }, {
                key: "vdom",
                get: function () {
                    return this
                }
            }]), t
        }(),
        l = function () {
            function t(e) {
                u(this, t), this.root = document.createTextNode(e), this.type = "#text", this.children = [], this.props = Object.create(null)
            }
            return s(t, [{
                key: "mountTo",
                value: function (t) {
                    this.range = t, t.deleteContents(), t.insertNode(this.root)
                }
            }, {
                key: "vdom",
                get: function () {
                    return this
                }
            }]), t
        }(),
        f = function () {
            function t() {
                u(this, t), this.children = [], this.props = Object.create(null), this.state = Object.create(null)
            }
            return s(t, [{
                key: "setState",
                value: function (t) {
                    !this.state && t && (this.state = {}),
                        function t(e, r) {
                            for (var o in r) "object" === n(r[o]) && null !== r[o] ? ("object" !== n(e[o]) && (r[o] instanceof Array ? e[o] = [] : e[o] = {}), t(e[o], r[o])) : e[o] = r[o]
                        }(this.state, t), this.update()
                }
            }, {
                key: "setAttribute",
                value: function (t, e) {
                    this.props[t] = e, this[t] = e
                }
            }, {
                key: "mountTo",
                value: function (t) {
                    this.range = t, this.update()
                }
            }, {
                key: "update",
                value: function () {
                    var t = this.vdom;
                    if (this.oldVdom) {
                        var e = function (t, e) {
                            if (t.type !== e.type) return !1;
                            for (var r in t.props)
                                if (("object" !== n(t.props[r]) || "object" !== n(e.props[r]) || JSON.stringify(t.props[r]) !== JSON.stringify(e.props[r])) && t.props[r] !== e.props[r]) return !1;
                            return Object.keys(t.props).length === Object.keys(e.props).length
                        };
                        ! function t(r, n) {
                            if (! function t(r, n) {
                                    if (e(r, n)) return !1;
                                    if (r.children.length !== n.children.length) return !1;
                                    for (var o = 0; o < r.children.length; o++)
                                        if (!t(r.children[o], n.children[o])) return !1;
                                    return !0
                                }(r, n))
                                if (e(r, n))
                                    for (var o = 0; o < r.children.length; o++) t(r.children[o], n.children[o]);
                                else r.mountTo(n.range)
                        }(t, this.oldVdom)
                    } else t.mountTo(this.range);
                    this.oldVdom = t
                }
            }, {
                key: "appendChild",
                value: function (t) {
                    this.children.push(t)
                }
            }, {
                key: "type",
                get: function () {
                    return this.constructor.name
                }
            }, {
                key: "vdom",
                get: function () {
                    return this.render().vdom
                }
            }]), t
        }(),
        p = function (t, e) {
            var r;
            for (var i in r = "string" == typeof t ? new c(t) : new t, e) r.setAttribute(i, e[i]);
            for (var u = function t(e) {
                    var i, u = o(e);
                    try {
                        for (u.s(); !(i = u.n()).done;) {
                            var a = i.value;
                            "object" === n(a) && a instanceof Array ? t(a) : (null == a && (a = ""), a instanceof f || a instanceof c || a instanceof l || (a = String(a)), "string" == typeof a && (a = new l(a)), r.appendChild(a))
                        }
                    } catch (t) {
                        u.e(t)
                    } finally {
                        u.f()
                    }
                }, a = arguments.length, s = new Array(a > 2 ? a - 2 : 0), p = 2; p < a; p++) s[p - 2] = arguments[p];
            return u(s), r
        },
        h = function (t, e) {
            var r = document.createRange();
            e.children.length ? (r.setStartAfter(e.lastChild), r.setEndAfter(e.lastChild)) : (r.setStart(e, 0), r.setEnd(e, 0)), t.mountTo(r)
        };

    function y(t, e) {
        return function (t) {
            if (Array.isArray(t)) return t
        }(t) || function (t, e) {
            if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
            var r = [],
                n = !0,
                o = !1,
                i = void 0;
            try {
                for (var u, a = t[Symbol.iterator](); !(n = (u = a.next()).done) && (r.push(u.value), !e || r.length !== e); n = !0);
            } catch (t) {
                o = !0, i = t
            } finally {
                try {
                    n || null == a.return || a.return()
                } finally {
                    if (o) throw i
                }
            }
            return r
        }(t, e) || function (t, e) {
            if (!t) return;
            if ("string" == typeof t) return d(t, e);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === r && t.constructor && (r = t.constructor.name);
            if ("Map" === r || "Set" === r) return Array.from(t);
            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return d(t, e)
        }(t, e) || function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function d(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
        return n
    }

    function v(t) {
        return (v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function b(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function m(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
    }

    function g(t, e, r) {
        return e && m(t.prototype, e), r && m(t, r), t
    }

    function S(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }), e && j(t, e)
    }

    function j(t, e) {
        return (j = Object.setPrototypeOf || function (t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function O(t) {
        var e = function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
            } catch (t) {
                return !1
            }
        }();
        return function () {
            var r, n = w(t);
            if (e) {
                var o = w(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return k(this, r)
        }
    }

    function k(t, e) {
        return !e || "object" !== v(e) && "function" != typeof e ? function (t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }(t) : e
    }

    function w(t) {
        return (w = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }
    var A = function (t) {
            S(r, t);
            var e = O(r);

            function r() {
                return b(this, r), e.apply(this, arguments)
            }
            return g(r, [{
                key: "render",
                value: function () {
                    return p("button", {
                        className: "square",
                        onClick: this.props.onClick
                    }, this.props.value)
                }
            }]), r
        }(f),
        C = function (t) {
            S(r, t);
            var e = O(r);

            function r() {
                return b(this, r), e.apply(this, arguments)
            }
            return g(r, [{
                key: "renderSquare",
                value: function (t) {
                    var e = this;
                    return p(A, {
                        value: this.props.squares[t],
                        onClick: function () {
                            return e.props.onClick(t)
                        }
                    })
                }
            }, {
                key: "render",
                value: function () {
                    return p("div", null, p("div", {
                        className: "board-row"
                    }, this.renderSquare(0), this.renderSquare(1), this.renderSquare(2)), p("div", {
                        className: "board-row"
                    }, this.renderSquare(3), this.renderSquare(4), this.renderSquare(5)), p("div", {
                        className: "board-row"
                    }, this.renderSquare(6), this.renderSquare(7), this.renderSquare(8)))
                }
            }]), r
        }(f),
        N = function (t) {
            S(r, t);
            var e = O(r);

            function r(t) {
                var n;
                return b(this, r), (n = e.call(this, t)).state = {
                    history: [{
                        squares: Array(9).fill(null)
                    }],
                    stepNumber: 0,
                    xIsNext: !0
                }, n
            }
            return g(r, [{
                key: "handleClick",
                value: function (t) {
                    var e = this.state.history.slice(0, this.state.stepNumber + 1),
                        r = e[e.length - 1].squares.slice();
                    x(r) || r[t] || (r[t] = this.state.xIsNext ? "X" : "O", this.setState({
                        history: e.concat([{
                            squares: r
                        }]),
                        stepNumber: e.length,
                        xIsNext: !this.state.xIsNext
                    }))
                }
            }, {
                key: "jumpTo",
                value: function (t) {
                    this.setState({
                        stepNumber: t,
                        xIsNext: t % 2 == 0
                    })
                }
            }, {
                key: "render",
                value: function () {
                    var t = this,
                        e = this.state.history[this.state.stepNumber];
                    x(e.squares);
                    return p("div", {
                        className: "game"
                    }, p("div", {
                        className: "game-board"
                    }, p(C, {
                        squares: e.squares,
                        onClick: function (e) {
                            t.handleClick(e)
                        }
                    })))
                }
            }]), r
        }(f);

    function x(t) {
        for (var e = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ], r = 0; r < e.length; r++) {
            var n = y(e[r], 3),
                o = n[0],
                i = n[1],
                u = n[2];
            if (t[o] && t[o] === t[i] && t[o] === t[u]) return t[o]
        }
        return null
    }
    h(p(N, null), document.body)
}]);