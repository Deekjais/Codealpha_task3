(function() {
    function e(t, n, r) {
        function i(a, s) {
            if (!n[a]) {
                if (!t[a]) {
                    var l = "function" == typeof require && require;
                    if (!s && l) return l(a, !0);
                    if (o) return o(a, !0);
                    var u = new Error("Cannot find module '" + a + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var c = n[a] = {
                    exports: {}
                };
                t[a][0].call(c.exports, function(e) {
                    var n = t[a][1][e];
                    return i(n || e)
                }, c, c.exports, e, t, n, r)
            }
            return n[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
        return i
    }
    return e
})()({
    1: [function(e, t, n) {
        "use strict";
        if (window.top !== window.self) {
            if (window.top.location.hostname !== window.self.location.hostname || window.top.location.protocol !== window.top.location.protocol) {
                window.top.location.href = window.self.location.href
            }
        }
    }, {}],
    2: [function(e, t, n) {
        "use strict";
        var r = window;
        var i = homepage;
        var o = null;
        var a = {
            init: function(e, t) {
                o = t;
                e.add_scripts(["https://stats.wp.com/w.js?60"]);
                r.last_section_seen = $(".page-root section").attr("id");
                r._tkq = r._tkq || [];
                var n = {};
                if (i.test_name && i.variation) {
                    var s = i.test_mobile_only && 740 < document.documentElement.clientWidth;
                    if (!s) {
                        n.abtest_name = i.test_name;
                        n.abtest_variation = i.variation;
                        n.abtest_new_participant = i.is_new_participant
                    }
                }
                n.lp_name = "logged-out-homepage";
                n.lp_variation = i.variation;
                n.lp_personal_variation = i.personal_variation;
                n.do_not_track = i.do_not_track;
                n.country = i.country;
                n.locale = i.locale;
                n.platform = i.platform;
                n.utm_source = i.utm_source;
                n.utm_campaign = i.utm_campaign;
                n.ref = i.ref;
                n.affiliate = i.affiliate;
                if (o.view_event) {
                    r._tkq.push(["recordEvent", o.view_event, n])
                }
                if (n.abtest_name && n.abtest_variation && i.is_new_participant) {
                    r._tkq.push(["recordEvent", "wpcom_abtest_start", n])
                }
                a.setup_link_click_tracking();
                a.setup_scroll_tracking()
            },
            setup_link_click_tracking: function() {
                if (o.click_event) {
                    var e = function(e) {
                        var t = e.currentTarget;
                        r._tkq = r._tkq || [];
                        r._tkq.push(["recordEvent", o.click_event, {
                            id: t.id,
                            href: t.href,
                            last_section_seen: r.last_section_seen
                        }])
                    };
                    $("a").on("click", e)
                }
            },
            setup_scroll_tracking: function() {
                var e = [];
                var t = false;
                var n = function() {
                    t = true;
                    var n = document.querySelectorAll(".page-template-page-landing-marketing section, .page-template-page-landpack .lp-section");
                    for (var a = 0, s = n.length; a < s; a++) {
                        var l = n[a].id || n[a].className;
                        var u = n[a].getBoundingClientRect().top;
                        if (l && u < r.innerHeight / 2) {
                            var c = e.indexOf(l) !== -1;
                            if (!c) {
                                e.push(l);
                                r.last_section_seen = l;
                                r._tkq = r._tkq || [];
                                r._tkq.push(["recordEvent", o.section_view_event, {
                                    name: l,
                                    version: i.variation
                                }])
                            }
                        }
                    }
                    t = false
                };
                var a = false;
                var s = document.querySelector("." + o.plans_table_class);
                var l = function() {
                    t = true;
                    if (!a && s) {
                        if (s.getBoundingClientRect().top < 600) {
                            a = true;
                            r._tkq = r._tkq || [];
                            r._tkq.push(["recordEvent", o.plans_view_event])
                        }
                    }
                    t = false
                };
                r.addEventListener("scroll", function() {
                    t = t || r.requestAnimationFrame(function() {
                        if (o.section_view_event) {
                            n()
                        }
                        if (o.plans_view_event) {
                            l()
                        }
                    })
                })
            }
        };
        t.exports = a
    }, {}],
    3: [function(e, t, n) {
        "use strict";
        var r = {
            add_scripts: function(e) {
                var t, n = document.createDocumentFragment(),
                    r = e.length,
                    i = 0;
                for (i = 0; i < r; i++) {
                    t = document.createElement("script");
                    t.async = true;
                    t.src = e[i];
                    n.appendChild(t)
                }
                document.body.appendChild(n)
            },
            add_wpcomstats: function() {
                new Image().src = "//pixel.wp.com/b.gif?subd=wordpress.com&host=wordpress.com&blog=1&v=wpcom&user_id=0&tz=0&rand=" + Math.random()
            }
        };
        t.exports = r
    }, {}],
    4: [function(e, t, n) {
        "use strict";
        e("../../lib/js-modules/make-top-frame");
        window.$ = e("../../../wp-content/themes/h4/js/jquery-1.12.4.min");
        window.jQuery = $;
        e("../../../wp-content/js/jquery/jquery.fix-widows.js");
        (function(t) {
            var n = e("./page");
            var r = e("../../lib/js-modules/wpcom");
            t(document).ready(function() {
                r.add_wpcomstats();
                e("../../lib/js-modules/tracks").init(r, {
                    view_event: "wpcom_homepage_view",
                    click_event: "wpcom_homepage_link_click",
                    section_view_event: "wpcom_homepage_section_view",
                    plans_view_event: "calypso_wp_plans_test_view",
                    plans_table_class: "plans-table"
                });
                n.onDOMReady()
            });
            t(window).on("load", function() {
                n.onWindowLoaded()
            })
        })(window.jQuery)
    }, {
        "../../../wp-content/js/jquery/jquery.fix-widows.js": 6,
        "../../../wp-content/themes/h4/js/jquery-1.12.4.min": 8,
        "../../lib/js-modules/make-top-frame": 1,
        "../../lib/js-modules/tracks": 2,
        "../../lib/js-modules/wpcom": 3,
        "./page": 5
    }],
    5: [function(e, t, n) {
        "use strict";
        var r = e("../../../wp-content/lib/i18n/text-review/text-review");

        function i() {
            if (r.isTextReviewMode()) {
                r.init("home.logged-out")
            } else if ($('html[lang="en"]').length) {
                $(document).fixWidows({
                    minWidth: 320,
                    useNonBreakingHyphens: false
                })
            }
        }

        function o() {}
        t.exports = {
            onDOMReady: i,
            onWindowLoaded: o
        }
    }, {
        "../../../wp-content/lib/i18n/text-review/text-review": 7
    }],
    6: [function(e, t, n) {
        (function(e) {
            "use strict";
            e.fn.fixWidows = function(t) {
                var n = e.extend({}, {
                    minWidth: 481,
                    minWords: 3,
                    maxWordLength: 15,
                    useNonBreakingHyphens: true,
                    rtlEnable: false,
                    selectors: [".no-widows"],
                    negate: [".allow-widows"]
                }, t || window.fixWidowsConfig || {});
                n.minWidth = Math.max(0, n.minWidth);
                n.minWords = Math.max(1, n.minWords);
                n.maxWordLength = Math.max(10, n.maxWordLength);
                if (!n.selectors.length) {
                    n.selectors.push(".no-widows")
                }
                if (!n.negate.length) {
                    n.negate.push(".allow-widows")
                }
                if (window.innerWidth < n.minWidth) {
                    return
                } else if (!n.rtlEnable && e('html[dir="rtl"]').length) {
                    return
                }
                var r = new RegExp("^\\s+|\\s+$", "g");
                var i = new RegExp("[<>]|&#?[a-z0-9]+;", "i");
                var o = new RegExp("\\s+");
                var a = new RegExp("\\<[^<>]*\\>", "g");
                var s = new RegExp("\\<t:([0-9]+)\\>", "g");
                var l = new RegExp("(^|\\s)" + "(" + "(?:[a-z0-9._\\-]+:)?\\/\\/\\S+" + "|[^\\s@]+@[^\\s@]+" + "|[@#+][^\\s@#+]+" + ")", "ig");
                var u = new RegExp("\\{a:([0-9]+)\\}", "g");
                var c = new RegExp("\\s+(\\S{1," + n.maxWordLength + "})" + "\\s+(\\S{1," + n.maxWordLength + "})" + "$", "g");
                var d = new RegExp("\\s+(\\S+)\\s+(\\S+)$", "g");
                var f = function(e, t, n) {
                    return " " + t + "&nbsp;" + n
                };
                var p = new RegExp("([^\\s\\-]{1," + n.maxWordLength + "})" + "-(?=[^\\s\\-]{1," + n.maxWordLength + "})", "g");
                var h = new RegExp("([^\\s\\-]+)-(?=[^\\s\\-]+)", "g");
                return this.each(function() {
                    var t = e(this);
                    var g = e(n.selectors.join(","), t).not(n.negate.join(","));
                    g.each(function() {
                        var t = e(this);
                        var g = t.html();
                        var v = [];
                        var m = [];
                        var y = i.test(g);
                        if (-1 !== g.indexOf("&nbsp;")) {
                            return
                        } else if (!n.rtlEnable && t.is('[dir="rtl"]')) {
                            return
                        } else if ("block" === t.find("> span").css("display")) {
                            return
                        }
                        g = g.replace(r, "");
                        g = g.replace(a, function(e) {
                            v.push(e);
                            return "<t:" + (v.length - 1) + ">"
                        });
                        g = g.replace(l, function(e, t, n) {
                            m.push(n);
                            return t + "{a:" + (m.length - 1) + "}"
                        });
                        if (g.split(o).length < n.minWords) {
                            return
                        }
                        g = g.replace(y ? d : c, f);
                        if (n.useNonBreakingHyphens) {
                            g = g.replace(y ? h : p, "$1&#8209;")
                        }
                        g = g.replace(u, function(e, t) {
                            return m[t]
                        });
                        g = g.replace(s, function(e, t) {
                            return v[t]
                        });
                        t.html(g)
                    })
                })
            }
        })(jQuery)
    }, {}],
    7: [function(e, t, n) {
        "use strict";
        (function(e) {
            function n(e) {
                return e.trim()
            }
            var r = "https://translate.wordpress.com";
            var i = r + "/api/text-review/-flag";
            var o = r + "/projects/wpcom/text-review-dashboard";
            var a = "";

            function s(e, t) {
                if (t.length <= 0) {
                    return jQuery.Deferred().resolve()
                }
                return jQuery.ajax({
                    method: "POST",
                    url: i + "/add",
                    dataType: "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    data: {
                        locale: e,
                        location: window.location.host + window.location.pathname,
                        text_flags: t,
                        reference_hint: a
                    }
                })
            }

            function l(e) {
                if (e.length <= 0) {
                    return jQuery.Deferred().resolve()
                }
                return jQuery.ajax({
                    method: "POST",
                    url: i + "/update",
                    dataType: "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    data: {
                        id_values: e
                    }
                })
            }

            function u(e) {
                return jQuery.ajax({
                    method: "GET",
                    url: i,
                    dataType: "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    data: {
                        locale: e
                    }
                }).then(function(e) {
                    return e.flags
                })
            }

            function c(e) {
                return e.data("flag-id")
            }

            function d(e, t) {
                e.data("flag-id", t)
            }

            function f(e) {
                return e.data("flag-value")
            }

            function p(e, t) {
                e.data("flag-value", t)
            }
            var h = 2;

            function g(e) {
                var t = (f(e) + h) % 3;
                p(e, t)
            }

            function v(e) {
                var t = f(e);
                e.removeClass("flag-good flag-issue flag-edited");
                if (t > 20) {
                    e.addClass("flag-edited");
                    t -= 20
                }
                switch (t) {
                    case 1:
                        e.addClass("flag-issue");
                        break;
                    case 2:
                        e.addClass("flag-good");
                        break
                }
            }

            function m() {
                var e = location.host.split(".")[0] || jQuery("html").attr("lang");
                if ("br" === e) {
                    return "pt-br"
                }
                if (-1 !== location.search.indexOf("formal")) {
                    return e + "_formal"
                }
                return e
            }

            function y(t) {
                var r = m();
                a = t;
                jQuery(window).on("beforeunload", function() {
                    return ""
                });
                jQuery("head").append('<link rel="stylesheet" type="text/css" href="//s1.wp.com/wp-content/lib/i18n/text-review/text-review.css" />');
                u(r).then(function(t) {
                    jQuery("*:not(iframe,title,script,style)").contents().filter(function() {
                        return this.nodeType === 3 && this.nodeValue.trim().length > 0
                    }).parent().addClass("text-review-flaggable");
                    e(".text-review-flaggable .text-review-flaggable").removeClass("text-review-flaggable");
                    var i = jQuery(".text-review-flaggable");
                    i.each(function() {
                        var e = jQuery(this);
                        var r = n(e.text());
                        for (var i in t) {
                            var o = t[i];
                            if (o.text === r) {
                                d(e, o.id);
                                p(e, o.flag);
                                v(e)
                            }
                        }
                    });
                    i.on("click", function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var t = jQuery(this);
                        if (null == f(t)) {
                            p(t, h)
                        } else {
                            g(t)
                        }
                        if (!c(t)) {
                            t.addClass("new-flag")
                        } else {
                            t.addClass("update-flag")
                        }
                        v(t);
                        return false
                    });
                    jQuery("body").append('<div class="text-review-dialog">' + '<button class="text-review-dialog-button report">Report</button>' + '<a class="text-review-dialog-link" href="' + o + "?language=" + r + '" target="_blank" rel="noopener noreferrer">Go to dashboard</a>' + "</div>");
                    var a = jQuery(".text-review-dialog .report");
                    a.on("click", function(e) {
                        e.preventDefault();
                        var t = [];
                        var i = jQuery(".new-flag");
                        i.each(function() {
                            var e = jQuery(this);
                            var r = f(e);
                            if (0 != r) {
                                t.push([n(e.text()), f(e)])
                            }
                        });
                        var o = s(r, t).then(function(e) {
                            i.removeClass("new-flag");
                            i.each(function(t) {
                                d(jQuery(this), e[t])
                            })
                        });
                        var u = [];
                        var p = jQuery(".update-flag");
                        p.each(function() {
                            var e = jQuery(this);
                            u.push([c(e), f(e)])
                        });
                        var h = l(u).then(function() {
                            p.removeClass("update-flag")
                        });
                        jQuery.when(o, h).then(function() {
                            a.text("Reported").prop("disabled", true)
                        }, function() {
                            a.text("Failed to report some text").prop("disabled", true)
                        }).always(function() {
                            setTimeout(function() {
                                a.text("Report").prop("disabled", false)
                            }, 3e3)
                        })
                    })
                })
            }

            function x() {
                return location.search && location.search.indexOf("text-review") > -1
            }
            var w = {
                isTextReviewMode: x,
                init: y
            };
            window.textReview = w;
            if (typeof t !== "undefined") {
                t.exports = w
            }
        })(jQuery)
    }, {}],
    8: [function(e, t, n) {
        ! function(e, n) {
            "object" == typeof t && "object" == typeof t.exports ? t.exports = e.document ? n(e, !0) : function(e) {
                if (!e.document) throw new Error("jQuery requires a window with a document");
                return n(e)
            } : n(e)
        }("undefined" != typeof window ? window : this, function(e, t) {
            var n = [],
                r = e.document,
                i = n.slice,
                o = n.concat,
                a = n.push,
                s = n.indexOf,
                l = {},
                u = l.toString,
                c = l.hasOwnProperty,
                d = {},
                f = "1.12.4",
                p = function(e, t) {
                    return new p.fn.init(e, t)
                },
                h = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                g = /^-ms-/,
                v = /-([\da-z])/gi,
                m = function(e, t) {
                    return t.toUpperCase()
                };
            p.fn = p.prototype = {
                jquery: f,
                constructor: p,
                selector: "",
                length: 0,
                toArray: function() {
                    return i.call(this)
                },
                get: function(e) {
                    return null != e ? 0 > e ? this[e + this.length] : this[e] : i.call(this)
                },
                pushStack: function(e) {
                    var t = p.merge(this.constructor(), e);
                    return t.prevObject = this, t.context = this.context, t
                },
                each: function(e) {
                    return p.each(this, e)
                },
                map: function(e) {
                    return this.pushStack(p.map(this, function(t, n) {
                        return e.call(t, n, t)
                    }))
                },
                slice: function() {
                    return this.pushStack(i.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(e) {
                    var t = this.length,
                        n = +e + (0 > e ? t : 0);
                    return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor()
                },
                push: a,
                sort: n.sort,
                splice: n.splice
            }, p.extend = p.fn.extend = function() {
                var e, t, n, r, i, o, a = arguments[0] || {},
                    s = 1,
                    l = arguments.length,
                    u = !1;
                for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || p.isFunction(a) || (a = {}), s === l && (a = this, s--); l > s; s++)
                    if (null != (i = arguments[s]))
                        for (r in i) e = a[r], n = i[r], a !== n && (u && n && (p.isPlainObject(n) || (t = p.isArray(n))) ? (t ? (t = !1, o = e && p.isArray(e) ? e : []) : o = e && p.isPlainObject(e) ? e : {}, a[r] = p.extend(u, o, n)) : void 0 !== n && (a[r] = n));
                return a
            }, p.extend({
                expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e)
                },
                noop: function() {},
                isFunction: function(e) {
                    return "function" === p.type(e)
                },
                isArray: Array.isArray || function(e) {
                    return "array" === p.type(e)
                },
                isWindow: function(e) {
                    return null != e && e == e.window
                },
                isNumeric: function(e) {
                    var t = e && e.toString();
                    return !p.isArray(e) && t - parseFloat(t) + 1 >= 0
                },
                isEmptyObject: function(e) {
                    var t;
                    for (t in e) return !1;
                    return !0
                },
                isPlainObject: function(e) {
                    var t;
                    if (!e || "object" !== p.type(e) || e.nodeType || p.isWindow(e)) return !1;
                    try {
                        if (e.constructor && !c.call(e, "constructor") && !c.call(e.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (e) {
                        return !1
                    }
                    if (!d.ownFirst)
                        for (t in e) return c.call(e, t);
                    for (t in e);
                    return void 0 === t || c.call(e, t)
                },
                type: function(e) {
                    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[u.call(e)] || "object" : typeof e
                },
                globalEval: function(t) {
                    t && p.trim(t) && (e.execScript || function(t) {
                        e.eval.call(e, t)
                    })(t)
                },
                camelCase: function(e) {
                    return e.replace(g, "ms-").replace(v, m)
                },
                nodeName: function(e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                },
                each: function(e, t) {
                    var n, r = 0;
                    if (y(e)) {
                        for (n = e.length; n > r; r++)
                            if (t.call(e[r], r, e[r]) === !1) break
                    } else
                        for (r in e)
                            if (t.call(e[r], r, e[r]) === !1) break;
                    return e
                },
                trim: function(e) {
                    return null == e ? "" : (e + "").replace(h, "")
                },
                makeArray: function(e, t) {
                    var n = t || [];
                    return null != e && (y(Object(e)) ? p.merge(n, "string" == typeof e ? [e] : e) : a.call(n, e)), n
                },
                inArray: function(e, t, n) {
                    var r;
                    if (t) {
                        if (s) return s.call(t, e, n);
                        for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)
                            if (n in t && t[n] === e) return n
                    }
                    return -1
                },
                merge: function(e, t) {
                    var n = +t.length,
                        r = 0,
                        i = e.length;
                    while (n > r) e[i++] = t[r++];
                    if (n !== n)
                        while (void 0 !== t[r]) e[i++] = t[r++];
                    return e.length = i, e
                },
                grep: function(e, t, n) {
                    for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++) r = !t(e[o], o), r !== s && i.push(e[o]);
                    return i
                },
                map: function(e, t, n) {
                    var r, i, a = 0,
                        s = [];
                    if (y(e))
                        for (r = e.length; r > a; a++) i = t(e[a], a, n), null != i && s.push(i);
                    else
                        for (a in e) i = t(e[a], a, n), null != i && s.push(i);
                    return o.apply([], s)
                },
                guid: 1,
                proxy: function(e, t) {
                    var n, r, o;
                    return "string" == typeof t && (o = e[t], t = e, e = o), p.isFunction(e) ? (n = i.call(arguments, 2), r = function() {
                        return e.apply(t || this, n.concat(i.call(arguments)))
                    }, r.guid = e.guid = e.guid || p.guid++, r) : void 0
                },
                now: function() {
                    return +new Date
                },
                support: d
            }), "function" == typeof Symbol && (p.fn[Symbol.iterator] = n[Symbol.iterator]), p.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
                l["[object " + t + "]"] = t.toLowerCase()
            });

            function y(e) {
                var t = !!e && "length" in e && e.length,
                    n = p.type(e);
                return "function" === n || p.isWindow(e) ? !1 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
            }
            var x = function(e) {
                var t, n, r, i, o, a, s, l, u, c, d, f, p, h, g, v, m, y, x, w = "sizzle" + 1 * new Date,
                    b = e.document,
                    T = 0,
                    C = 0,
                    k = ea(),
                    E = ea(),
                    N = ea(),
                    _ = function(e, t) {
                        return e === t && (d = !0), 0
                    },
                    j = 1 << 31,
                    S = {}.hasOwnProperty,
                    A = [],
                    D = A.pop,
                    L = A.push,
                    q = A.push,
                    H = A.slice,
                    R = function(e, t) {
                        for (var n = 0, r = e.length; r > n; n++)
                            if (e[n] === t) return n;
                        return -1
                    },
                    O = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    M = "[\\x20\\t\\r\\n\\f]",
                    F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    W = "\\[" + M + "*(" + F + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + F + "))|)" + M + "*\\]",
                    P = ":(" + F + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)",
                    B = new RegExp(M + "+", "g"),
                    I = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
                    z = new RegExp("^" + M + "*," + M + "*"),
                    X = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
                    Q = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"),
                    U = new RegExp(P),
                    V = new RegExp("^" + F + "$"),
                    G = {
                        ID: new RegExp("^#(" + F + ")"),
                        CLASS: new RegExp("^\\.(" + F + ")"),
                        TAG: new RegExp("^(" + F + "|[*])"),
                        ATTR: new RegExp("^" + W),
                        PSEUDO: new RegExp("^" + P),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + O + ")$", "i"),
                        needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
                    },
                    Y = /^(?:input|select|textarea|button)$/i,
                    J = /^h\d$/i,
                    K = /^[^{]+\{\s*\[native \w/,
                    Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    ee = /[+~]/,
                    et = /'|\\/g,
                    en = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
                    er = function(e, t, n) {
                        var r = "0x" + t - 65536;
                        return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                    },
                    ei = function() {
                        f()
                    };
                try {
                    q.apply(A = H.call(b.childNodes), b.childNodes), A[b.childNodes.length].nodeType
                } catch (e) {
                    q = {
                        apply: A.length ? function(e, t) {
                            L.apply(e, H.call(t))
                        } : function(e, t) {
                            var n = e.length,
                                r = 0;
                            while (e[n++] = t[r++]);
                            e.length = n - 1
                        }
                    }
                }

                function eo(e, t, r, i) {
                    var o, s, u, c, d, h, m, y, T = t && t.ownerDocument,
                        C = t ? t.nodeType : 9;
                    if (r = r || [], "string" != typeof e || !e || 1 !== C && 9 !== C && 11 !== C) return r;
                    if (!i && ((t ? t.ownerDocument || t : b) !== p && f(t), t = t || p, g)) {
                        if (11 !== C && (h = Z.exec(e)))
                            if (o = h[1]) {
                                if (9 === C) {
                                    if (!(u = t.getElementById(o))) return r;
                                    if (u.id === o) return r.push(u), r
                                } else if (T && (u = T.getElementById(o)) && x(t, u) && u.id === o) return r.push(u), r
                            } else {
                                if (h[2]) return q.apply(r, t.getElementsByTagName(e)), r;
                                if ((o = h[3]) && n.getElementsByClassName && t.getElementsByClassName) return q.apply(r, t.getElementsByClassName(o)), r
                            }
                        if (n.qsa && !N[e + " "] && (!v || !v.test(e))) {
                            if (1 !== C) T = t, y = e;
                            else if ("object" !== t.nodeName.toLowerCase()) {
                                (c = t.getAttribute("id")) ? c = c.replace(et, "\\$&"): t.setAttribute("id", c = w), m = a(e), s = m.length, d = V.test(c) ? "#" + c : "[id='" + c + "']";
                                while (s--) m[s] = d + " " + ev(m[s]);
                                y = m.join(","), T = ee.test(e) && eh(t.parentNode) || t
                            }
                            if (y) try {
                                return q.apply(r, T.querySelectorAll(y)), r
                            } catch (e) {} finally {
                                c === w && t.removeAttribute("id")
                            }
                        }
                    }
                    return l(e.replace(I, "$1"), t, r, i)
                }

                function ea() {
                    var e = [];

                    function t(n, i) {
                        return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
                    }
                    return t
                }

                function es(e) {
                    return e[w] = !0, e
                }

                function el(e) {
                    var t = p.createElement("div");
                    try {
                        return !!e(t)
                    } catch (e) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null
                    }
                }

                function eu(e, t) {
                    var n = e.split("|"),
                        i = n.length;
                    while (i--) r.attrHandle[n[i]] = t
                }

                function ec(e, t) {
                    var n = t && e,
                        r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || j) - (~e.sourceIndex || j);
                    if (r) return r;
                    if (n) {
                        while (n = n.nextSibling)
                            if (n === t) return -1
                    }
                    return e ? 1 : -1
                }

                function ed(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return "input" === n && t.type === e
                    }
                }

                function ef(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }

                function ep(e) {
                    return es(function(t) {
                        return t = +t, es(function(n, r) {
                            var i, o = e([], n.length, t),
                                a = o.length;
                            while (a--) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                        })
                    })
                }

                function eh(e) {
                    return e && "undefined" != typeof e.getElementsByTagName && e
                }
                n = eo.support = {}, o = eo.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return t ? "HTML" !== t.nodeName : !1
                }, f = eo.setDocument = function(e) {
                    var t, i, a = e ? e.ownerDocument || e : b;
                    return a !== p && 9 === a.nodeType && a.documentElement ? (p = a, h = p.documentElement, g = !o(p), (i = p.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", ei, !1) : i.attachEvent && i.attachEvent("onunload", ei)), n.attributes = el(function(e) {
                        return e.className = "i", !e.getAttribute("className")
                    }), n.getElementsByTagName = el(function(e) {
                        return e.appendChild(p.createComment("")), !e.getElementsByTagName("*").length
                    }), n.getElementsByClassName = K.test(p.getElementsByClassName), n.getById = el(function(e) {
                        return h.appendChild(e).id = w, !p.getElementsByName || !p.getElementsByName(w).length
                    }), n.getById ? (r.find.ID = function(e, t) {
                        if ("undefined" != typeof t.getElementById && g) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }, r.filter.ID = function(e) {
                        var t = e.replace(en, er);
                        return function(e) {
                            return e.getAttribute("id") === t
                        }
                    }) : (delete r.find.ID, r.filter.ID = function(e) {
                        var t = e.replace(en, er);
                        return function(e) {
                            var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
                    } : function(e, t) {
                        var n, r = [],
                            i = 0,
                            o = t.getElementsByTagName(e);
                        if ("*" === e) {
                            while (n = o[i++]) 1 === n.nodeType && r.push(n);
                            return r
                        }
                        return o
                    }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                        return "undefined" != typeof t.getElementsByClassName && g ? t.getElementsByClassName(e) : void 0
                    }, m = [], v = [], (n.qsa = K.test(p.querySelectorAll)) && (el(function(e) {
                        h.appendChild(e).innerHTML = "<a id='" + w + "'></a><select id='" + w + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + O + ")"), e.querySelectorAll("[id~=" + w + "-]").length || v.push("~="), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + w + "+*").length || v.push(".#.+[+~]")
                    }), el(function(e) {
                        var t = p.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
                    })), (n.matchesSelector = K.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && el(function(e) {
                        n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), m.push("!=", P)
                    }), v = v.length && new RegExp(v.join("|")), m = m.length && new RegExp(m.join("|")), t = K.test(h.compareDocumentPosition), x = t || K.test(h.contains) ? function(e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e,
                            r = t && t.parentNode;
                        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                    } : function(e, t) {
                        if (t) {
                            while (t = t.parentNode)
                                if (t === e) return !0
                        }
                        return !1
                    }, _ = t ? function(e, t) {
                        if (e === t) return d = !0, 0;
                        var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === p || e.ownerDocument === b && x(b, e) ? -1 : t === p || t.ownerDocument === b && x(b, t) ? 1 : c ? R(c, e) - R(c, t) : 0 : 4 & r ? -1 : 1)
                    } : function(e, t) {
                        if (e === t) return d = !0, 0;
                        var n, r = 0,
                            i = e.parentNode,
                            o = t.parentNode,
                            a = [e],
                            s = [t];
                        if (!i || !o) return e === p ? -1 : t === p ? 1 : i ? -1 : o ? 1 : c ? R(c, e) - R(c, t) : 0;
                        if (i === o) return ec(e, t);
                        n = e;
                        while (n = n.parentNode) a.unshift(n);
                        n = t;
                        while (n = n.parentNode) s.unshift(n);
                        while (a[r] === s[r]) r++;
                        return r ? ec(a[r], s[r]) : a[r] === b ? -1 : s[r] === b ? 1 : 0
                    }, p) : p
                }, eo.matches = function(e, t) {
                    return eo(e, null, null, t)
                }, eo.matchesSelector = function(e, t) {
                    if ((e.ownerDocument || e) !== p && f(e), t = t.replace(Q, "='$1']"), n.matchesSelector && g && !N[t + " "] && (!m || !m.test(t)) && (!v || !v.test(t))) try {
                        var r = y.call(e, t);
                        if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                    } catch (e) {}
                    return eo(t, p, null, [e]).length > 0
                }, eo.contains = function(e, t) {
                    return (e.ownerDocument || e) !== p && f(e), x(e, t)
                }, eo.attr = function(e, t) {
                    (e.ownerDocument || e) !== p && f(e);
                    var i = r.attrHandle[t.toLowerCase()],
                        o = i && S.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;
                    return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
                }, eo.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, eo.uniqueSort = function(e) {
                    var t, r = [],
                        i = 0,
                        o = 0;
                    if (d = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(_), d) {
                        while (t = e[o++]) t === e[o] && (i = r.push(o));
                        while (i--) e.splice(r[i], 1)
                    }
                    return c = null, e
                }, i = eo.getText = function(e) {
                    var t, n = "",
                        r = 0,
                        o = e.nodeType;
                    if (o) {
                        if (1 === o || 9 === o || 11 === o) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                        } else if (3 === o || 4 === o) return e.nodeValue
                    } else
                        while (t = e[r++]) n += i(t);
                    return n
                }, r = eo.selectors = {
                    cacheLength: 50,
                    createPseudo: es,
                    match: G,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(en, er), e[3] = (e[3] || e[4] || e[5] || "").replace(en, er), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || eo.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && eo.error(e[0]), e
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[6] && e[2];
                            return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && U.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(en, er).toLowerCase();
                            return "*" === e ? function() {
                                return !0
                            } : function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        },
                        CLASS: function(e) {
                            var t = k[e + " "];
                            return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && k(e, function(e) {
                                return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(e, t, n) {
                            return function(r) {
                                var i = eo.attr(r, e);
                                return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace(B, " ") + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                            }
                        },
                        CHILD: function(e, t, n, r, i) {
                            var o = "nth" !== e.slice(0, 3),
                                a = "last" !== e.slice(-4),
                                s = "of-type" === t;
                            return 1 === r && 0 === i ? function(e) {
                                return !!e.parentNode
                            } : function(t, n, l) {
                                var u, c, d, f, p, h, g = o !== a ? "nextSibling" : "previousSibling",
                                    v = t.parentNode,
                                    m = s && t.nodeName.toLowerCase(),
                                    y = !l && !s,
                                    x = !1;
                                if (v) {
                                    if (o) {
                                        while (g) {
                                            f = t;
                                            while (f = f[g])
                                                if (s ? f.nodeName.toLowerCase() === m : 1 === f.nodeType) return !1;
                                            h = g = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [a ? v.firstChild : v.lastChild], a && y) {
                                        f = v, d = f[w] || (f[w] = {}), c = d[f.uniqueID] || (d[f.uniqueID] = {}), u = c[e] || [], p = u[0] === T && u[1], x = p && u[2], f = p && v.childNodes[p];
                                        while (f = ++p && f && f[g] || (x = p = 0) || h.pop())
                                            if (1 === f.nodeType && ++x && f === t) {
                                                c[e] = [T, p, x];
                                                break
                                            }
                                    } else if (y && (f = t, d = f[w] || (f[w] = {}), c = d[f.uniqueID] || (d[f.uniqueID] = {}), u = c[e] || [], p = u[0] === T && u[1], x = p), x === !1) {
                                        while (f = ++p && f && f[g] || (x = p = 0) || h.pop())
                                            if ((s ? f.nodeName.toLowerCase() === m : 1 === f.nodeType) && ++x && (y && (d = f[w] || (f[w] = {}), c = d[f.uniqueID] || (d[f.uniqueID] = {}), c[e] = [T, x]), f === t)) break
                                    }
                                    return x -= i, x === r || x % r === 0 && x / r >= 0
                                }
                            }
                        },
                        PSEUDO: function(e, t) {
                            var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || eo.error("unsupported pseudo: " + e);
                            return i[w] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? es(function(e, n) {
                                var r, o = i(e, t),
                                    a = o.length;
                                while (a--) r = R(e, o[a]), e[r] = !(n[r] = o[a])
                            }) : function(e) {
                                return i(e, 0, n)
                            }) : i
                        }
                    },
                    pseudos: {
                        not: es(function(e) {
                            var t = [],
                                n = [],
                                r = s(e.replace(I, "$1"));
                            return r[w] ? es(function(e, t, n, i) {
                                var o, a = r(e, null, i, []),
                                    s = e.length;
                                while (s--)(o = a[s]) && (e[s] = !(t[s] = o))
                            }) : function(e, i, o) {
                                return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                            }
                        }),
                        has: es(function(e) {
                            return function(t) {
                                return eo(e, t).length > 0
                            }
                        }),
                        contains: es(function(e) {
                            return e = e.replace(en, er),
                                function(t) {
                                    return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                                }
                        }),
                        lang: es(function(e) {
                            return V.test(e || "") || eo.error("unsupported lang: " + e), e = e.replace(en, er).toLowerCase(),
                                function(t) {
                                    var n;
                                    do
                                        if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1
                                }
                        }),
                        target: function(t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function(e) {
                            return e === h
                        },
                        focus: function(e) {
                            return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function(e) {
                            return e.disabled === !1
                        },
                        disabled: function(e) {
                            return e.disabled === !0
                        },
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(e) {
                            return !r.pseudos.empty(e)
                        },
                        header: function(e) {
                            return J.test(e.nodeName)
                        },
                        input: function(e) {
                            return Y.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        },
                        first: ep(function() {
                            return [0]
                        }),
                        last: ep(function(e, t) {
                            return [t - 1]
                        }),
                        eq: ep(function(e, t, n) {
                            return [0 > n ? n + t : n]
                        }),
                        even: ep(function(e, t) {
                            for (var n = 0; t > n; n += 2) e.push(n);
                            return e
                        }),
                        odd: ep(function(e, t) {
                            for (var n = 1; t > n; n += 2) e.push(n);
                            return e
                        }),
                        lt: ep(function(e, t, n) {
                            for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                            return e
                        }),
                        gt: ep(function(e, t, n) {
                            for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                            return e
                        })
                    }
                }, r.pseudos.nth = r.pseudos.eq;
                for (t in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) r.pseudos[t] = ed(t);
                for (t in {
                        submit: !0,
                        reset: !0
                    }) r.pseudos[t] = ef(t);

                function eg() {}
                eg.prototype = r.filters = r.pseudos, r.setFilters = new eg, a = eo.tokenize = function(e, t) {
                    var n, i, o, a, s, l, u, c = E[e + " "];
                    if (c) return t ? 0 : c.slice(0);
                    s = e, l = [], u = r.preFilter;
                    while (s) {
                        n && !(i = z.exec(s)) || (i && (s = s.slice(i[0].length) || s), l.push(o = [])), n = !1, (i = X.exec(s)) && (n = i.shift(), o.push({
                            value: n,
                            type: i[0].replace(I, " ")
                        }), s = s.slice(n.length));
                        for (a in r.filter) !(i = G[a].exec(s)) || u[a] && !(i = u[a](i)) || (n = i.shift(), o.push({
                            value: n,
                            type: a,
                            matches: i
                        }), s = s.slice(n.length));
                        if (!n) break
                    }
                    return t ? s.length : s ? eo.error(e) : E(e, l).slice(0)
                };

                function ev(e) {
                    for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
                    return r
                }

                function em(e, t, n) {
                    var r = t.dir,
                        i = n && "parentNode" === r,
                        o = C++;
                    return t.first ? function(t, n, o) {
                        while (t = t[r])
                            if (1 === t.nodeType || i) return e(t, n, o)
                    } : function(t, n, a) {
                        var s, l, u, c = [T, o];
                        if (a) {
                            while (t = t[r])
                                if ((1 === t.nodeType || i) && e(t, n, a)) return !0
                        } else
                            while (t = t[r])
                                if (1 === t.nodeType || i) {
                                    if (u = t[w] || (t[w] = {}), l = u[t.uniqueID] || (u[t.uniqueID] = {}), (s = l[r]) && s[0] === T && s[1] === o) return c[2] = s[2];
                                    if (l[r] = c, c[2] = e(t, n, a)) return !0
                                }
                    }
                }

                function ey(e) {
                    return e.length > 1 ? function(t, n, r) {
                        var i = e.length;
                        while (i--)
                            if (!e[i](t, n, r)) return !1;
                        return !0
                    } : e[0]
                }

                function ex(e, t, n) {
                    for (var r = 0, i = t.length; i > r; r++) eo(e, t[r], n);
                    return n
                }

                function ew(e, t, n, r, i) {
                    for (var o, a = [], s = 0, l = e.length, u = null != t; l > s; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), u && t.push(s)));
                    return a
                }

                function eb(e, t, n, r, i, o) {
                    return r && !r[w] && (r = eb(r)), i && !i[w] && (i = eb(i, o)), es(function(o, a, s, l) {
                        var u, c, d, f = [],
                            p = [],
                            h = a.length,
                            g = o || ex(t || "*", s.nodeType ? [s] : s, []),
                            v = !e || !o && t ? g : ew(g, f, e, s, l),
                            m = n ? i || (o ? e : h || r) ? [] : a : v;
                        if (n && n(v, m, s, l), r) {
                            u = ew(m, p), r(u, [], s, l), c = u.length;
                            while (c--)(d = u[c]) && (m[p[c]] = !(v[p[c]] = d))
                        }
                        if (o) {
                            if (i || e) {
                                if (i) {
                                    u = [], c = m.length;
                                    while (c--)(d = m[c]) && u.push(v[c] = d);
                                    i(null, m = [], u, l)
                                }
                                c = m.length;
                                while (c--)(d = m[c]) && (u = i ? R(o, d) : f[c]) > -1 && (o[u] = !(a[u] = d))
                            }
                        } else m = ew(m === a ? m.splice(h, m.length) : m), i ? i(null, a, m, l) : q.apply(a, m)
                    })
                }

                function eT(e) {
                    for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], l = a ? 1 : 0, c = em(function(e) {
                            return e === t
                        }, s, !0), d = em(function(e) {
                            return R(t, e) > -1
                        }, s, !0), f = [function(e, n, r) {
                            var i = !a && (r || n !== u) || ((t = n).nodeType ? c(e, n, r) : d(e, n, r));
                            return t = null, i
                        }]; o > l; l++)
                        if (n = r.relative[e[l].type]) f = [em(ey(f), n)];
                        else {
                            if (n = r.filter[e[l].type].apply(null, e[l].matches), n[w]) {
                                for (i = ++l; o > i; i++)
                                    if (r.relative[e[i].type]) break;
                                return eb(l > 1 && ey(f), l > 1 && ev(e.slice(0, l - 1).concat({
                                    value: " " === e[l - 2].type ? "*" : ""
                                })).replace(I, "$1"), n, i > l && eT(e.slice(l, i)), o > i && eT(e = e.slice(i)), o > i && ev(e))
                            }
                            f.push(n)
                        }
                    return ey(f)
                }

                function eC(e, t) {
                    var n = t.length > 0,
                        i = e.length > 0,
                        o = function(o, a, s, l, c) {
                            var d, h, v, m = 0,
                                y = "0",
                                x = o && [],
                                w = [],
                                b = u,
                                C = o || i && r.find.TAG("*", c),
                                k = T += null == b ? 1 : Math.random() || .1,
                                E = C.length;
                            for (c && (u = a === p || a || c); y !== E && null != (d = C[y]); y++) {
                                if (i && d) {
                                    h = 0, a || d.ownerDocument === p || (f(d), s = !g);
                                    while (v = e[h++])
                                        if (v(d, a || p, s)) {
                                            l.push(d);
                                            break
                                        }
                                    c && (T = k)
                                }
                                n && ((d = !v && d) && m--, o && x.push(d))
                            }
                            if (m += y, n && y !== m) {
                                h = 0;
                                while (v = t[h++]) v(x, w, a, s);
                                if (o) {
                                    if (m > 0)
                                        while (y--) x[y] || w[y] || (w[y] = D.call(l));
                                    w = ew(w)
                                }
                                q.apply(l, w), c && !o && w.length > 0 && m + t.length > 1 && eo.uniqueSort(l)
                            }
                            return c && (T = k, u = b), x
                        };
                    return n ? es(o) : o
                }
                return s = eo.compile = function(e, t) {
                    var n, r = [],
                        i = [],
                        o = N[e + " "];
                    if (!o) {
                        t || (t = a(e)), n = t.length;
                        while (n--) o = eT(t[n]), o[w] ? r.push(o) : i.push(o);
                        o = N(e, eC(i, r)), o.selector = e
                    }
                    return o
                }, l = eo.select = function(e, t, i, o) {
                    var l, u, c, d, f, p = "function" == typeof e && e,
                        h = !o && a(e = p.selector || e);
                    if (i = i || [], 1 === h.length) {
                        if (u = h[0] = h[0].slice(0), u.length > 2 && "ID" === (c = u[0]).type && n.getById && 9 === t.nodeType && g && r.relative[u[1].type]) {
                            if (t = (r.find.ID(c.matches[0].replace(en, er), t) || [])[0], !t) return i;
                            p && (t = t.parentNode), e = e.slice(u.shift().value.length)
                        }
                        l = G.needsContext.test(e) ? 0 : u.length;
                        while (l--) {
                            if (c = u[l], r.relative[d = c.type]) break;
                            if ((f = r.find[d]) && (o = f(c.matches[0].replace(en, er), ee.test(u[0].type) && eh(t.parentNode) || t))) {
                                if (u.splice(l, 1), e = o.length && ev(u), !e) return q.apply(i, o), i;
                                break
                            }
                        }
                    }
                    return (p || s(e, h))(o, t, !g, i, !t || ee.test(e) && eh(t.parentNode) || t), i
                }, n.sortStable = w.split("").sort(_).join("") === w, n.detectDuplicates = !!d, f(), n.sortDetached = el(function(e) {
                    return 1 & e.compareDocumentPosition(p.createElement("div"))
                }), el(function(e) {
                    return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                }) || eu("type|href|height|width", function(e, t, n) {
                    return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }), n.attributes && el(function(e) {
                    return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                }) || eu("value", function(e, t, n) {
                    return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
                }), el(function(e) {
                    return null == e.getAttribute("disabled")
                }) || eu(O, function(e, t, n) {
                    var r;
                    return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }), eo
            }(e);
            p.find = x, p.expr = x.selectors, p.expr[":"] = p.expr.pseudos, p.uniqueSort = p.unique = x.uniqueSort, p.text = x.getText, p.isXMLDoc = x.isXML, p.contains = x.contains;
            var w = function(e, t, n) {
                    var r = [],
                        i = void 0 !== n;
                    while ((e = e[t]) && 9 !== e.nodeType)
                        if (1 === e.nodeType) {
                            if (i && p(e).is(n)) break;
                            r.push(e)
                        }
                    return r
                },
                b = function(e, t) {
                    for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                    return n
                },
                T = p.expr.match.needsContext,
                C = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
                k = /^.[^:#\[\.,]*$/;

            function E(e, t, n) {
                if (p.isFunction(t)) return p.grep(e, function(e, r) {
                    return !!t.call(e, r, e) !== n
                });
                if (t.nodeType) return p.grep(e, function(e) {
                    return e === t !== n
                });
                if ("string" == typeof t) {
                    if (k.test(t)) return p.filter(t, e, n);
                    t = p.filter(t, e)
                }
                return p.grep(e, function(e) {
                    return p.inArray(e, t) > -1 !== n
                })
            }
            p.filter = function(e, t, n) {
                var r = t[0];
                return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? p.find.matchesSelector(r, e) ? [r] : [] : p.find.matches(e, p.grep(t, function(e) {
                    return 1 === e.nodeType
                }))
            }, p.fn.extend({
                find: function(e) {
                    var t, n = [],
                        r = this,
                        i = r.length;
                    if ("string" != typeof e) return this.pushStack(p(e).filter(function() {
                        for (t = 0; i > t; t++)
                            if (p.contains(r[t], this)) return !0
                    }));
                    for (t = 0; i > t; t++) p.find(e, r[t], n);
                    return n = this.pushStack(i > 1 ? p.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
                },
                filter: function(e) {
                    return this.pushStack(E(this, e || [], !1))
                },
                not: function(e) {
                    return this.pushStack(E(this, e || [], !0))
                },
                is: function(e) {
                    return !!E(this, "string" == typeof e && T.test(e) ? p(e) : e || [], !1).length
                }
            });
            var N, _ = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                j = p.fn.init = function(e, t, n) {
                    var i, o;
                    if (!e) return this;
                    if (n = n || N, "string" == typeof e) {
                        if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : _.exec(e), !i || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                        if (i[1]) {
                            if (t = t instanceof p ? t[0] : t, p.merge(this, p.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : r, !0)), C.test(i[1]) && p.isPlainObject(t))
                                for (i in t) p.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                            return this
                        }
                        if (o = r.getElementById(i[2]), o && o.parentNode) {
                            if (o.id !== i[2]) return N.find(e);
                            this.length = 1, this[0] = o
                        }
                        return this.context = r, this.selector = e, this
                    }
                    return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : p.isFunction(e) ? "undefined" != typeof n.ready ? n.ready(e) : e(p) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), p.makeArray(e, this))
                };
            j.prototype = p.fn, N = p(r);
            var S = /^(?:parents|prev(?:Until|All))/,
                A = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
            p.fn.extend({
                has: function(e) {
                    var t, n = p(e, this),
                        r = n.length;
                    return this.filter(function() {
                        for (t = 0; r > t; t++)
                            if (p.contains(this, n[t])) return !0
                    })
                },
                closest: function(e, t) {
                    for (var n, r = 0, i = this.length, o = [], a = T.test(e) || "string" != typeof e ? p(e, t || this.context) : 0; i > r; r++)
                        for (n = this[r]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && p.find.matchesSelector(n, e))) {
                                o.push(n);
                                break
                            }
                    return this.pushStack(o.length > 1 ? p.uniqueSort(o) : o)
                },
                index: function(e) {
                    return e ? "string" == typeof e ? p.inArray(this[0], p(e)) : p.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(e, t) {
                    return this.pushStack(p.uniqueSort(p.merge(this.get(), p(e, t))))
                },
                addBack: function(e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                }
            });

            function D(e, t) {
                do e = e[t]; while (e && 1 !== e.nodeType);
                return e
            }
            p.each({
                parent: function(e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null
                },
                parents: function(e) {
                    return w(e, "parentNode")
                },
                parentsUntil: function(e, t, n) {
                    return w(e, "parentNode", n)
                },
                next: function(e) {
                    return D(e, "nextSibling")
                },
                prev: function(e) {
                    return D(e, "previousSibling")
                },
                nextAll: function(e) {
                    return w(e, "nextSibling")
                },
                prevAll: function(e) {
                    return w(e, "previousSibling")
                },
                nextUntil: function(e, t, n) {
                    return w(e, "nextSibling", n)
                },
                prevUntil: function(e, t, n) {
                    return w(e, "previousSibling", n)
                },
                siblings: function(e) {
                    return b((e.parentNode || {}).firstChild, e)
                },
                children: function(e) {
                    return b(e.firstChild)
                },
                contents: function(e) {
                    return p.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : p.merge([], e.childNodes)
                }
            }, function(e, t) {
                p.fn[e] = function(n, r) {
                    var i = p.map(this, t, n);
                    return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = p.filter(r, i)), this.length > 1 && (A[e] || (i = p.uniqueSort(i)), S.test(e) && (i = i.reverse())), this.pushStack(i)
                }
            });
            var L = /\S+/g;

            function q(e) {
                var t = {};
                return p.each(e.match(L) || [], function(e, n) {
                    t[n] = !0
                }), t
            }
            p.Callbacks = function(e) {
                e = "string" == typeof e ? q(e) : p.extend({}, e);
                var t, n, r, i, o = [],
                    a = [],
                    s = -1,
                    l = function() {
                        for (i = e.once, r = t = !0; a.length; s = -1) {
                            n = a.shift();
                            while (++s < o.length) o[s].apply(n[0], n[1]) === !1 && e.stopOnFalse && (s = o.length, n = !1)
                        }
                        e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
                    },
                    u = {
                        add: function() {
                            return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
                                p.each(n, function(n, r) {
                                    p.isFunction(r) ? e.unique && u.has(r) || o.push(r) : r && r.length && "string" !== p.type(r) && t(r)
                                })
                            }(arguments), n && !t && l()), this
                        },
                        remove: function() {
                            return p.each(arguments, function(e, t) {
                                var n;
                                while ((n = p.inArray(t, o, n)) > -1) o.splice(n, 1), s >= n && s--
                            }), this
                        },
                        has: function(e) {
                            return e ? p.inArray(e, o) > -1 : o.length > 0
                        },
                        empty: function() {
                            return o && (o = []), this
                        },
                        disable: function() {
                            return i = a = [], o = n = "", this
                        },
                        disabled: function() {
                            return !o
                        },
                        lock: function() {
                            return i = !0, n || u.disable(), this
                        },
                        locked: function() {
                            return !!i
                        },
                        fireWith: function(e, n) {
                            return i || (n = n || [], n = [e, n.slice ? n.slice() : n], a.push(n), t || l()), this
                        },
                        fire: function() {
                            return u.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!r
                        }
                    };
                return u
            }, p.extend({
                Deferred: function(e) {
                    var t = [
                            ["resolve", "done", p.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", p.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", p.Callbacks("memory")]
                        ],
                        n = "pending",
                        r = {
                            state: function() {
                                return n
                            },
                            always: function() {
                                return i.done(arguments).fail(arguments), this
                            },
                            then: function() {
                                var e = arguments;
                                return p.Deferred(function(n) {
                                    p.each(t, function(t, o) {
                                        var a = p.isFunction(e[t]) && e[t];
                                        i[o[1]](function() {
                                            var e = a && a.apply(this, arguments);
                                            e && p.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                        })
                                    }), e = null
                                }).promise()
                            },
                            promise: function(e) {
                                return null != e ? p.extend(e, r) : r
                            }
                        },
                        i = {};
                    return r.pipe = r.then, p.each(t, function(e, o) {
                        var a = o[2],
                            s = o[3];
                        r[o[1]] = a.add, s && a.add(function() {
                            n = s
                        }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
                            return i[o[0] + "With"](this === i ? r : this, arguments), this
                        }, i[o[0] + "With"] = a.fireWith
                    }), r.promise(i), e && e.call(i, i), i
                },
                when: function(e) {
                    var t = 0,
                        n = i.call(arguments),
                        r = n.length,
                        o = 1 !== r || e && p.isFunction(e.promise) ? r : 0,
                        a = 1 === o ? e : p.Deferred(),
                        s = function(e, t, n) {
                            return function(r) {
                                t[e] = this, n[e] = arguments.length > 1 ? i.call(arguments) : r, n === l ? a.notifyWith(t, n) : --o || a.resolveWith(t, n)
                            }
                        },
                        l, u, c;
                    if (r > 1)
                        for (l = new Array(r), u = new Array(r), c = new Array(r); r > t; t++) n[t] && p.isFunction(n[t].promise) ? n[t].promise().progress(s(t, u, l)).done(s(t, c, n)).fail(a.reject) : --o;
                    return o || a.resolveWith(c, n), a.promise()
                }
            });
            var H;
            p.fn.ready = function(e) {
                return p.ready.promise().done(e), this
            }, p.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(e) {
                    e ? p.readyWait++ : p.ready(!0)
                },
                ready: function(e) {
                    (e === !0 ? --p.readyWait : p.isReady) || (p.isReady = !0, e !== !0 && --p.readyWait > 0 || (H.resolveWith(r, [p]), p.fn.triggerHandler && (p(r).triggerHandler("ready"), p(r).off("ready"))))
                }
            });

            function R() {
                r.addEventListener ? (r.removeEventListener("DOMContentLoaded", O), e.removeEventListener("load", O)) : (r.detachEvent("onreadystatechange", O), e.detachEvent("onload", O))
            }

            function O() {
                (r.addEventListener || "load" === e.event.type || "complete" === r.readyState) && (R(), p.ready())
            }
            p.ready.promise = function(t) {
                if (!H)
                    if (H = p.Deferred(), "complete" === r.readyState || "loading" !== r.readyState && !r.documentElement.doScroll) e.setTimeout(p.ready);
                    else if (r.addEventListener) r.addEventListener("DOMContentLoaded", O), e.addEventListener("load", O);
                else {
                    r.attachEvent("onreadystatechange", O), e.attachEvent("onload", O);
                    var n = !1;
                    try {
                        n = null == e.frameElement && r.documentElement
                    } catch (e) {}
                    n && n.doScroll && ! function t() {
                        if (!p.isReady) {
                            try {
                                n.doScroll("left")
                            } catch (n) {
                                return e.setTimeout(t, 50)
                            }
                            R(), p.ready()
                        }
                    }()
                }
                return H.promise(t)
            }, p.ready.promise();
            var M;
            for (M in p(d)) break;
            d.ownFirst = "0" === M, d.inlineBlockNeedsLayout = !1, p(function() {
                    var e, t, n, i;
                    n = r.getElementsByTagName("body")[0], n && n.style && (t = r.createElement("div"), i = r.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", d.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
                }),
                function() {
                    var e = r.createElement("div");
                    d.deleteExpando = !0;
                    try {
                        delete e.test
                    } catch (e) {
                        d.deleteExpando = !1
                    }
                    e = null
                }();
            var F = function(e) {
                    var t = p.noData[(e.nodeName + " ").toLowerCase()],
                        n = +e.nodeType || 1;
                    return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
                },
                W = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                P = /([A-Z])/g;

            function B(e, t, n) {
                if (void 0 === n && 1 === e.nodeType) {
                    var r = "data-" + t.replace(P, "-$1").toLowerCase();
                    if (n = e.getAttribute(r), "string" == typeof n) {
                        try {
                            n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : W.test(n) ? p.parseJSON(n) : n
                        } catch (e) {}
                        p.data(e, t, n)
                    } else n = void 0
                }
                return n
            }

            function I(e) {
                var t;
                for (t in e)
                    if (("data" !== t || !p.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
                return !0
            }

            function z(e, t, r, i) {
                if (F(e)) {
                    var o, a, s = p.expando,
                        l = e.nodeType,
                        u = l ? p.cache : e,
                        c = l ? e[s] : e[s] && s;
                    if (c && u[c] && (i || u[c].data) || void 0 !== r || "string" != typeof t) return c || (c = l ? e[s] = n.pop() || p.guid++ : s), u[c] || (u[c] = l ? {} : {
                        toJSON: p.noop
                    }), "object" != typeof t && "function" != typeof t || (i ? u[c] = p.extend(u[c], t) : u[c].data = p.extend(u[c].data, t)), a = u[c], i || (a.data || (a.data = {}), a = a.data), void 0 !== r && (a[p.camelCase(t)] = r), "string" == typeof t ? (o = a[t], null == o && (o = a[p.camelCase(t)])) : o = a, o
                }
            }

            function X(e, t, n) {
                if (F(e)) {
                    var r, i, o = e.nodeType,
                        a = o ? p.cache : e,
                        s = o ? e[p.expando] : p.expando;
                    if (a[s]) {
                        if (t && (r = n ? a[s] : a[s].data)) {
                            p.isArray(t) ? t = t.concat(p.map(t, p.camelCase)) : t in r ? t = [t] : (t = p.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
                            while (i--) delete r[t[i]];
                            if (n ? !I(r) : !p.isEmptyObject(r)) return
                        }(n || (delete a[s].data, I(a[s]))) && (o ? p.cleanData([e], !0) : d.deleteExpando || a != a.window ? delete a[s] : a[s] = void 0)
                    }
                }
            }
            p.extend({
                    cache: {},
                    noData: {
                        "applet ": !0,
                        "embed ": !0,
                        "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                    },
                    hasData: function(e) {
                        return e = e.nodeType ? p.cache[e[p.expando]] : e[p.expando], !!e && !I(e)
                    },
                    data: function(e, t, n) {
                        return z(e, t, n)
                    },
                    removeData: function(e, t) {
                        return X(e, t)
                    },
                    _data: function(e, t, n) {
                        return z(e, t, n, !0)
                    },
                    _removeData: function(e, t) {
                        return X(e, t, !0)
                    }
                }), p.fn.extend({
                    data: function(e, t) {
                        var n, r, i, o = this[0],
                            a = o && o.attributes;
                        if (void 0 === e) {
                            if (this.length && (i = p.data(o), 1 === o.nodeType && !p._data(o, "parsedAttrs"))) {
                                n = a.length;
                                while (n--) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = p.camelCase(r.slice(5)), B(o, r, i[r])));
                                p._data(o, "parsedAttrs", !0)
                            }
                            return i
                        }
                        return "object" == typeof e ? this.each(function() {
                            p.data(this, e)
                        }) : arguments.length > 1 ? this.each(function() {
                            p.data(this, e, t)
                        }) : o ? B(o, e, p.data(o, e)) : void 0
                    },
                    removeData: function(e) {
                        return this.each(function() {
                            p.removeData(this, e)
                        })
                    }
                }), p.extend({
                    queue: function(e, t, n) {
                        var r;
                        return e ? (t = (t || "fx") + "queue", r = p._data(e, t), n && (!r || p.isArray(n) ? r = p._data(e, t, p.makeArray(n)) : r.push(n)), r || []) : void 0
                    },
                    dequeue: function(e, t) {
                        t = t || "fx";
                        var n = p.queue(e, t),
                            r = n.length,
                            i = n.shift(),
                            o = p._queueHooks(e, t),
                            a = function() {
                                p.dequeue(e, t)
                            };
                        "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
                    },
                    _queueHooks: function(e, t) {
                        var n = t + "queueHooks";
                        return p._data(e, n) || p._data(e, n, {
                            empty: p.Callbacks("once memory").add(function() {
                                p._removeData(e, t + "queue"), p._removeData(e, n)
                            })
                        })
                    }
                }), p.fn.extend({
                    queue: function(e, t) {
                        var n = 2;
                        return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? p.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                            var n = p.queue(this, e, t);
                            p._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && p.dequeue(this, e)
                        })
                    },
                    dequeue: function(e) {
                        return this.each(function() {
                            p.dequeue(this, e)
                        })
                    },
                    clearQueue: function(e) {
                        return this.queue(e || "fx", [])
                    },
                    promise: function(e, t) {
                        var n, r = 1,
                            i = p.Deferred(),
                            o = this,
                            a = this.length,
                            s = function() {
                                --r || i.resolveWith(o, [o])
                            };
                        "string" != typeof e && (t = e, e = void 0), e = e || "fx";
                        while (a--) n = p._data(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
                        return s(), i.promise(t)
                    }
                }),
                function() {
                    var e;
                    d.shrinkWrapBlocks = function() {
                        if (null != e) return e;
                        e = !1;
                        var t, n, i;
                        return n = r.getElementsByTagName("body")[0], n && n.style ? (t = r.createElement("div"), i = r.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(r.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(i), e) : void 0
                    }
                }();
            var Q = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                U = new RegExp("^(?:([+-])=|)(" + Q + ")([a-z%]*)$", "i"),
                V = ["Top", "Right", "Bottom", "Left"],
                G = function(e, t) {
                    return e = t || e, "none" === p.css(e, "display") || !p.contains(e.ownerDocument, e)
                };

            function Y(e, t, n, r) {
                var i, o = 1,
                    a = 20,
                    s = r ? function() {
                        return r.cur()
                    } : function() {
                        return p.css(e, t, "")
                    },
                    l = s(),
                    u = n && n[3] || (p.cssNumber[t] ? "" : "px"),
                    c = (p.cssNumber[t] || "px" !== u && +l) && U.exec(p.css(e, t));
                if (c && c[3] !== u) {
                    u = u || c[3], n = n || [], c = +l || 1;
                    do o = o || ".5", c /= o, p.style(e, t, c + u); while (o !== (o = s() / l) && 1 !== o && --a)
                }
                return n && (c = +c || +l || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = u, r.start = c, r.end = i)), i
            }
            var J = function(e, t, n, r, i, o, a) {
                    var s = 0,
                        l = e.length,
                        u = null == n;
                    if ("object" === p.type(n)) {
                        i = !0;
                        for (s in n) J(e, t, s, n[s], !0, o, a)
                    } else if (void 0 !== r && (i = !0, p.isFunction(r) || (a = !0), u && (a ? (t.call(e, r), t = null) : (u = t, t = function(e, t, n) {
                            return u.call(p(e), n)
                        })), t))
                        for (; l > s; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
                    return i ? e : u ? t.call(e) : l ? t(e[0], n) : o
                },
                K = /^(?:checkbox|radio)$/i,
                Z = /<([\w:-]+)/,
                ee = /^$|\/(?:java|ecma)script/i,
                et = /^\s+/,
                en = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";

            function er(e) {
                var t = en.split("|"),
                    n = e.createDocumentFragment();
                if (n.createElement)
                    while (t.length) n.createElement(t.pop());
                return n
            }! function() {
                var e = r.createElement("div"),
                    t = r.createDocumentFragment(),
                    n = r.createElement("input");
                e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d.leadingWhitespace = 3 === e.firstChild.nodeType, d.tbody = !e.getElementsByTagName("tbody").length, d.htmlSerialize = !!e.getElementsByTagName("link").length, d.html5Clone = "<:nav></:nav>" !== r.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, t.appendChild(n), d.appendChecked = n.checked, e.innerHTML = "<textarea>x</textarea>", d.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, t.appendChild(e), n = r.createElement("input"), n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), d.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, d.noCloneEvent = !!e.addEventListener, e[p.expando] = 1, d.attributes = !e.getAttribute(p.expando)
            }();
            var ei = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: d.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            };
            ei.optgroup = ei.option, ei.tbody = ei.tfoot = ei.colgroup = ei.caption = ei.thead, ei.th = ei.td;

            function eo(e, t) {
                var n, r, i = 0,
                    o = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : void 0;
                if (!o)
                    for (o = [], n = e.childNodes || e; null != (r = n[i]); i++) !t || p.nodeName(r, t) ? o.push(r) : p.merge(o, eo(r, t));
                return void 0 === t || t && p.nodeName(e, t) ? p.merge([e], o) : o
            }

            function ea(e, t) {
                for (var n, r = 0; null != (n = e[r]); r++) p._data(n, "globalEval", !t || p._data(t[r], "globalEval"))
            }
            var es = /<|&#?\w+;/,
                el = /<tbody/i;

            function eu(e) {
                K.test(e.type) && (e.defaultChecked = e.checked)
            }

            function ec(e, t, n, r, i) {
                for (var o, a, s, l, u, c, f, h = e.length, g = er(t), v = [], m = 0; h > m; m++)
                    if (a = e[m], a || 0 === a)
                        if ("object" === p.type(a)) p.merge(v, a.nodeType ? [a] : a);
                        else if (es.test(a)) {
                    l = l || g.appendChild(t.createElement("div")), u = (Z.exec(a) || ["", ""])[1].toLowerCase(), f = ei[u] || ei._default, l.innerHTML = f[1] + p.htmlPrefilter(a) + f[2], o = f[0];
                    while (o--) l = l.lastChild;
                    if (!d.leadingWhitespace && et.test(a) && v.push(t.createTextNode(et.exec(a)[0])), !d.tbody) {
                        a = "table" !== u || el.test(a) ? "<table>" !== f[1] || el.test(a) ? 0 : l : l.firstChild, o = a && a.childNodes.length;
                        while (o--) p.nodeName(c = a.childNodes[o], "tbody") && !c.childNodes.length && a.removeChild(c)
                    }
                    p.merge(v, l.childNodes), l.textContent = "";
                    while (l.firstChild) l.removeChild(l.firstChild);
                    l = g.lastChild
                } else v.push(t.createTextNode(a));
                l && g.removeChild(l), d.appendChecked || p.grep(eo(v, "input"), eu), m = 0;
                while (a = v[m++])
                    if (r && p.inArray(a, r) > -1) i && i.push(a);
                    else if (s = p.contains(a.ownerDocument, a), l = eo(g.appendChild(a), "script"), s && ea(l), n) {
                    o = 0;
                    while (a = l[o++]) ee.test(a.type || "") && n.push(a)
                }
                return l = null, g
            }! function() {
                var t, n, i = r.createElement("div");
                for (t in {
                        submit: !0,
                        change: !0,
                        focusin: !0
                    }) n = "on" + t, (d[t] = n in e) || (i.setAttribute(n, "t"), d[t] = i.attributes[n].expando === !1);
                i = null
            }();
            var ed = /^(?:input|select|textarea)$/i,
                ef = /^key/,
                ep = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                eh = /^(?:focusinfocus|focusoutblur)$/,
                eg = /^([^.]*)(?:\.(.+)|)/;

            function ev() {
                return !0
            }

            function em() {
                return !1
            }

            function ey() {
                try {
                    return r.activeElement
                } catch (e) {}
            }

            function ex(e, t, n, r, i, o) {
                var a, s;
                if ("object" == typeof t) {
                    "string" != typeof n && (r = r || n, n = void 0);
                    for (s in t) ex(e, s, n, r, t[s], o);
                    return e
                }
                if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), i === !1) i = em;
                else if (!i) return e;
                return 1 === o && (a = i, i = function(e) {
                    return p().off(e), a.apply(this, arguments)
                }, i.guid = a.guid || (a.guid = p.guid++)), e.each(function() {
                    p.event.add(this, t, i, r, n)
                })
            }
            p.event = {
                global: {},
                add: function(e, t, n, r, i) {
                    var o, a, s, l, u, c, d, f, h, g, v, m = p._data(e);
                    if (m) {
                        n.handler && (l = n, n = l.handler, i = l.selector), n.guid || (n.guid = p.guid++), (a = m.events) || (a = m.events = {}), (c = m.handle) || (c = m.handle = function(e) {
                            return "undefined" == typeof p || e && p.event.triggered === e.type ? void 0 : p.event.dispatch.apply(c.elem, arguments)
                        }, c.elem = e), t = (t || "").match(L) || [""], s = t.length;
                        while (s--) o = eg.exec(t[s]) || [], h = v = o[1], g = (o[2] || "").split(".").sort(), h && (u = p.event.special[h] || {}, h = (i ? u.delegateType : u.bindType) || h, u = p.event.special[h] || {}, d = p.extend({
                            type: h,
                            origType: v,
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: i,
                            needsContext: i && p.expr.match.needsContext.test(i),
                            namespace: g.join(".")
                        }, l), (f = a[h]) || (f = a[h] = [], f.delegateCount = 0, u.setup && u.setup.call(e, r, g, c) !== !1 || (e.addEventListener ? e.addEventListener(h, c, !1) : e.attachEvent && e.attachEvent("on" + h, c))), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, d) : f.push(d), p.event.global[h] = !0);
                        e = null
                    }
                },
                remove: function(e, t, n, r, i) {
                    var o, a, s, l, u, c, d, f, h, g, v, m = p.hasData(e) && p._data(e);
                    if (m && (c = m.events)) {
                        t = (t || "").match(L) || [""], u = t.length;
                        while (u--)
                            if (s = eg.exec(t[u]) || [], h = v = s[1], g = (s[2] || "").split(".").sort(), h) {
                                d = p.event.special[h] || {}, h = (r ? d.delegateType : d.bindType) || h, f = c[h] || [], s = s[2] && new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = f.length;
                                while (o--) a = f[o], !i && v !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, d.remove && d.remove.call(e, a));
                                l && !f.length && (d.teardown && d.teardown.call(e, g, m.handle) !== !1 || p.removeEvent(e, h, m.handle), delete c[h])
                            } else
                                for (h in c) p.event.remove(e, h + t[u], n, r, !0);
                        p.isEmptyObject(c) && (delete m.handle, p._removeData(e, "events"))
                    }
                },
                trigger: function(t, n, i, o) {
                    var a, s, l, u, d, f, h, g = [i || r],
                        v = c.call(t, "type") ? t.type : t,
                        m = c.call(t, "namespace") ? t.namespace.split(".") : [];
                    if (l = f = i = i || r, 3 !== i.nodeType && 8 !== i.nodeType && !eh.test(v + p.event.triggered) && (v.indexOf(".") > -1 && (m = v.split("."), v = m.shift(), m.sort()), s = v.indexOf(":") < 0 && "on" + v, t = t[p.expando] ? t : new p.Event(v, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = m.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : p.makeArray(n, [t]), d = p.event.special[v] || {}, o || !d.trigger || d.trigger.apply(i, n) !== !1)) {
                        if (!o && !d.noBubble && !p.isWindow(i)) {
                            for (u = d.delegateType || v, eh.test(u + v) || (l = l.parentNode); l; l = l.parentNode) g.push(l), f = l;
                            f === (i.ownerDocument || r) && g.push(f.defaultView || f.parentWindow || e)
                        }
                        h = 0;
                        while ((l = g[h++]) && !t.isPropagationStopped()) t.type = h > 1 ? u : d.bindType || v, a = (p._data(l, "events") || {})[t.type] && p._data(l, "handle"), a && a.apply(l, n), a = s && l[s], a && a.apply && F(l) && (t.result = a.apply(l, n), t.result === !1 && t.preventDefault());
                        if (t.type = v, !o && !t.isDefaultPrevented() && (!d._default || d._default.apply(g.pop(), n) === !1) && F(i) && s && i[v] && !p.isWindow(i)) {
                            f = i[s], f && (i[s] = null), p.event.triggered = v;
                            try {
                                i[v]()
                            } catch (e) {}
                            p.event.triggered = void 0, f && (i[s] = f)
                        }
                        return t.result
                    }
                },
                dispatch: function(e) {
                    e = p.event.fix(e);
                    var t, n, r, o, a, s = [],
                        l = i.call(arguments),
                        u = (p._data(this, "events") || {})[e.type] || [],
                        c = p.event.special[e.type] || {};
                    if (l[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                        s = p.event.handlers.call(this, e, u), t = 0;
                        while ((o = s[t++]) && !e.isPropagationStopped()) {
                            e.currentTarget = o.elem, n = 0;
                            while ((a = o.handlers[n++]) && !e.isImmediatePropagationStopped()) e.rnamespace && !e.rnamespace.test(a.namespace) || (e.handleObj = a, e.data = a.data, r = ((p.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, l), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()))
                        }
                        return c.postDispatch && c.postDispatch.call(this, e), e.result
                    }
                },
                handlers: function(e, t) {
                    var n, r, i, o, a = [],
                        s = t.delegateCount,
                        l = e.target;
                    if (s && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1)) {
                        for (; l != this; l = l.parentNode || this)
                            if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                                for (r = [], n = 0; s > n; n++) o = t[n], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? p(i, this).index(l) > -1 : p.find(i, this, null, [l]).length), r[i] && r.push(o);
                                r.length && a.push({
                                    elem: l,
                                    handlers: r
                                })
                            }
                    }
                    return s < t.length && a.push({
                        elem: this,
                        handlers: t.slice(s)
                    }), a
                },
                fix: function(e) {
                    if (e[p.expando]) return e;
                    var t, n, i, o = e.type,
                        a = e,
                        s = this.fixHooks[o];
                    s || (this.fixHooks[o] = s = ep.test(o) ? this.mouseHooks : ef.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new p.Event(a), t = i.length;
                    while (t--) n = i[t], e[n] = a[n];
                    return e.target || (e.target = a.srcElement || r), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, a) : e
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(e, t) {
                        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(e, t) {
                        var n, i, o, a = t.button,
                            s = t.fromElement;
                        return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || r, o = i.documentElement, n = i.body, e.pageX = t.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? t.toElement : s), e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
                    }
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            if (this !== ey() && this.focus) try {
                                return this.focus(), !1
                            } catch (e) {}
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            return this === ey() && this.blur ? (this.blur(), !1) : void 0
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            return p.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                        },
                        _default: function(e) {
                            return p.nodeName(e.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                        }
                    }
                },
                simulate: function(e, t, n) {
                    var r = p.extend(new p.Event, n, {
                        type: e,
                        isSimulated: !0
                    });
                    p.event.trigger(r, null, t), r.isDefaultPrevented() && n.preventDefault()
                }
            }, p.removeEvent = r.removeEventListener ? function(e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n)
            } : function(e, t, n) {
                var r = "on" + t;
                e.detachEvent && ("undefined" == typeof e[r] && (e[r] = null), e.detachEvent(r, n))
            }, p.Event = function(e, t) {
                return this instanceof p.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? ev : em) : this.type = e, t && p.extend(this, t), this.timeStamp = e && e.timeStamp || p.now(), void(this[p.expando] = !0)) : new p.Event(e, t)
            }, p.Event.prototype = {
                constructor: p.Event,
                isDefaultPrevented: em,
                isPropagationStopped: em,
                isImmediatePropagationStopped: em,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = ev, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = ev, e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = ev, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
                }
            }, p.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(e, t) {
                p.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function(e) {
                        var n, r = this,
                            i = e.relatedTarget,
                            o = e.handleObj;
                        return i && (i === r || p.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                    }
                }
            }), d.submit || (p.event.special.submit = {
                setup: function() {
                    return p.nodeName(this, "form") ? !1 : void p.event.add(this, "click._submit keypress._submit", function(e) {
                        var t = e.target,
                            n = p.nodeName(t, "input") || p.nodeName(t, "button") ? p.prop(t, "form") : void 0;
                        n && !p._data(n, "submit") && (p.event.add(n, "submit._submit", function(e) {
                            e._submitBubble = !0
                        }), p._data(n, "submit", !0))
                    })
                },
                postDispatch: function(e) {
                    e._submitBubble && (delete e._submitBubble, this.parentNode && !e.isTrigger && p.event.simulate("submit", this.parentNode, e))
                },
                teardown: function() {
                    return p.nodeName(this, "form") ? !1 : void p.event.remove(this, "._submit")
                }
            }), d.change || (p.event.special.change = {
                setup: function() {
                    return ed.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (p.event.add(this, "propertychange._change", function(e) {
                        "checked" === e.originalEvent.propertyName && (this._justChanged = !0)
                    }), p.event.add(this, "click._change", function(e) {
                        this._justChanged && !e.isTrigger && (this._justChanged = !1), p.event.simulate("change", this, e)
                    })), !1) : void p.event.add(this, "beforeactivate._change", function(e) {
                        var t = e.target;
                        ed.test(t.nodeName) && !p._data(t, "change") && (p.event.add(t, "change._change", function(e) {
                            !this.parentNode || e.isSimulated || e.isTrigger || p.event.simulate("change", this.parentNode, e)
                        }), p._data(t, "change", !0))
                    })
                },
                handle: function(e) {
                    var t = e.target;
                    return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
                },
                teardown: function() {
                    return p.event.remove(this, "._change"), !ed.test(this.nodeName)
                }
            }), d.focusin || p.each({
                focus: "focusin",
                blur: "focusout"
            }, function(e, t) {
                var n = function(e) {
                    p.event.simulate(t, e.target, p.event.fix(e))
                };
                p.event.special[t] = {
                    setup: function() {
                        var r = this.ownerDocument || this,
                            i = p._data(r, t);
                        i || r.addEventListener(e, n, !0), p._data(r, t, (i || 0) + 1)
                    },
                    teardown: function() {
                        var r = this.ownerDocument || this,
                            i = p._data(r, t) - 1;
                        i ? p._data(r, t, i) : (r.removeEventListener(e, n, !0), p._removeData(r, t))
                    }
                }
            }), p.fn.extend({
                on: function(e, t, n, r) {
                    return ex(this, e, t, n, r)
                },
                one: function(e, t, n, r) {
                    return ex(this, e, t, n, r, 1)
                },
                off: function(e, t, n) {
                    var r, i;
                    if (e && e.preventDefault && e.handleObj) return r = e.handleObj, p(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                    if ("object" == typeof e) {
                        for (i in e) this.off(i, t, e[i]);
                        return this
                    }
                    return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = em), this.each(function() {
                        p.event.remove(this, e, n, t)
                    })
                },
                trigger: function(e, t) {
                    return this.each(function() {
                        p.event.trigger(e, t, this)
                    })
                },
                triggerHandler: function(e, t) {
                    var n = this[0];
                    return n ? p.event.trigger(e, t, n, !0) : void 0
                }
            });
            var ew = / jQuery\d+="(?:null|\d+)"/g,
                eb = new RegExp("<(?:" + en + ")[\\s/>]", "i"),
                eT = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
                eC = /<script|<style|<link/i,
                ek = /checked\s*(?:[^=]|=\s*.checked.)/i,
                eE = /^true\/(.*)/,
                eN = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                e_ = er(r),
                ej = e_.appendChild(r.createElement("div"));

            function eS(e, t) {
                return p.nodeName(e, "table") && p.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
            }

            function eA(e) {
                return e.type = (null !== p.find.attr(e, "type")) + "/" + e.type, e
            }

            function eD(e) {
                var t = eE.exec(e.type);
                return t ? e.type = t[1] : e.removeAttribute("type"), e
            }

            function eL(e, t) {
                if (1 === t.nodeType && p.hasData(e)) {
                    var n, r, i, o = p._data(e),
                        a = p._data(t, o),
                        s = o.events;
                    if (s) {
                        delete a.handle, a.events = {};
                        for (n in s)
                            for (r = 0, i = s[n].length; i > r; r++) p.event.add(t, n, s[n][r])
                    }
                    a.data && (a.data = p.extend({}, a.data))
                }
            }

            function eq(e, t) {
                var n, r, i;
                if (1 === t.nodeType) {
                    if (n = t.nodeName.toLowerCase(), !d.noCloneEvent && t[p.expando]) {
                        i = p._data(t);
                        for (r in i.events) p.removeEvent(t, r, i.handle);
                        t.removeAttribute(p.expando)
                    }
                    "script" === n && t.text !== e.text ? (eA(t).text = e.text, eD(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), d.html5Clone && e.innerHTML && !p.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && K.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
                }
            }

            function eH(e, t, n, r) {
                t = o.apply([], t);
                var i, a, s, l, u, c, f = 0,
                    h = e.length,
                    g = h - 1,
                    v = t[0],
                    m = p.isFunction(v);
                if (m || h > 1 && "string" == typeof v && !d.checkClone && ek.test(v)) return e.each(function(i) {
                    var o = e.eq(i);
                    m && (t[0] = v.call(this, i, o.html())), eH(o, t, n, r)
                });
                if (h && (c = ec(t, e[0].ownerDocument, !1, e, r), i = c.firstChild, 1 === c.childNodes.length && (c = i), i || r)) {
                    for (l = p.map(eo(c, "script"), eA), s = l.length; h > f; f++) a = c, f !== g && (a = p.clone(a, !0, !0), s && p.merge(l, eo(a, "script"))), n.call(e[f], a, f);
                    if (s)
                        for (u = l[l.length - 1].ownerDocument, p.map(l, eD), f = 0; s > f; f++) a = l[f], ee.test(a.type || "") && !p._data(a, "globalEval") && p.contains(u, a) && (a.src ? p._evalUrl && p._evalUrl(a.src) : p.globalEval((a.text || a.textContent || a.innerHTML || "").replace(eN, "")));
                    c = i = null
                }
                return e
            }

            function eR(e, t, n) {
                for (var r, i = t ? p.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || p.cleanData(eo(r)), r.parentNode && (n && p.contains(r.ownerDocument, r) && ea(eo(r, "script")), r.parentNode.removeChild(r));
                return e
            }
            p.extend({
                htmlPrefilter: function(e) {
                    return e.replace(eT, "<$1></$2>")
                },
                clone: function(e, t, n) {
                    var r, i, o, a, s, l = p.contains(e.ownerDocument, e);
                    if (d.html5Clone || p.isXMLDoc(e) || !eb.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (ej.innerHTML = e.outerHTML, ej.removeChild(o = ej.firstChild)), !(d.noCloneEvent && d.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || p.isXMLDoc(e)))
                        for (r = eo(o), s = eo(e), a = 0; null != (i = s[a]); ++a) r[a] && eq(i, r[a]);
                    if (t)
                        if (n)
                            for (s = s || eo(e), r = r || eo(o), a = 0; null != (i = s[a]); a++) eL(i, r[a]);
                        else eL(e, o);
                    return r = eo(o, "script"), r.length > 0 && ea(r, !l && eo(e, "script")), r = s = i = null, o
                },
                cleanData: function(e, t) {
                    for (var r, i, o, a, s = 0, l = p.expando, u = p.cache, c = d.attributes, f = p.event.special; null != (r = e[s]); s++)
                        if ((t || F(r)) && (o = r[l], a = o && u[o])) {
                            if (a.events)
                                for (i in a.events) f[i] ? p.event.remove(r, i) : p.removeEvent(r, i, a.handle);
                            u[o] && (delete u[o], c || "undefined" == typeof r.removeAttribute ? r[l] = void 0 : r.removeAttribute(l), n.push(o))
                        }
                }
            }), p.fn.extend({
                domManip: eH,
                detach: function(e) {
                    return eR(this, e, !0)
                },
                remove: function(e) {
                    return eR(this, e)
                },
                text: function(e) {
                    return J(this, function(e) {
                        return void 0 === e ? p.text(this) : this.empty().append((this[0] && this[0].ownerDocument || r).createTextNode(e))
                    }, null, e, arguments.length)
                },
                append: function() {
                    return eH(this, arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = eS(this, e);
                            t.appendChild(e)
                        }
                    })
                },
                prepend: function() {
                    return eH(this, arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = eS(this, e);
                            t.insertBefore(e, t.firstChild)
                        }
                    })
                },
                before: function() {
                    return eH(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    })
                },
                after: function() {
                    return eH(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    })
                },
                empty: function() {
                    for (var e, t = 0; null != (e = this[t]); t++) {
                        1 === e.nodeType && p.cleanData(eo(e, !1));
                        while (e.firstChild) e.removeChild(e.firstChild);
                        e.options && p.nodeName(e, "select") && (e.options.length = 0)
                    }
                    return this
                },
                clone: function(e, t) {
                    return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                        return p.clone(this, e, t)
                    })
                },
                html: function(e) {
                    return J(this, function(e) {
                        var t = this[0] || {},
                            n = 0,
                            r = this.length;
                        if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(ew, "") : void 0;
                        if ("string" == typeof e && !eC.test(e) && (d.htmlSerialize || !eb.test(e)) && (d.leadingWhitespace || !et.test(e)) && !ei[(Z.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = p.htmlPrefilter(e);
                            try {
                                for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (p.cleanData(eo(t, !1)), t.innerHTML = e);
                                t = 0
                            } catch (e) {}
                        }
                        t && this.empty().append(e)
                    }, null, e, arguments.length)
                },
                replaceWith: function() {
                    var e = [];
                    return eH(this, arguments, function(t) {
                        var n = this.parentNode;
                        p.inArray(this, e) < 0 && (p.cleanData(eo(this)), n && n.replaceChild(t, this))
                    }, e)
                }
            }), p.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(e, t) {
                p.fn[e] = function(e) {
                    for (var n, r = 0, i = [], o = p(e), s = o.length - 1; s >= r; r++) n = r === s ? this : this.clone(!0), p(o[r])[t](n), a.apply(i, n.get());
                    return this.pushStack(i)
                }
            });
            var eO, eM = {
                HTML: "block",
                BODY: "block"
            };

            function eF(e, t) {
                var n = p(t.createElement(e)).appendTo(t.body),
                    r = p.css(n[0], "display");
                return n.detach(), r
            }

            function eW(e) {
                var t = r,
                    n = eM[e];
                return n || (n = eF(e, t), "none" !== n && n || (eO = (eO || p("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (eO[0].contentWindow || eO[0].contentDocument).document, t.write(), t.close(), n = eF(e, t), eO.detach()), eM[e] = n), n
            }
            var eP = /^margin/,
                eB = new RegExp("^(" + Q + ")(?!px)[a-z%]+$", "i"),
                e$ = function(e, t, n, r) {
                    var i, o, a = {};
                    for (o in t) a[o] = e.style[o], e.style[o] = t[o];
                    i = n.apply(e, r || []);
                    for (o in t) e.style[o] = a[o];
                    return i
                },
                eI = r.documentElement;
            ! function() {
                var t, n, i, o, a, s, l = r.createElement("div"),
                    u = r.createElement("div");
                if (u.style) {
                    u.style.cssText = "float:left;opacity:.5", d.opacity = "0.5" === u.style.opacity, d.cssFloat = !!u.style.cssFloat, u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", d.clearCloneStyle = "content-box" === u.style.backgroundClip, l = r.createElement("div"), l.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", u.innerHTML = "", l.appendChild(u), d.boxSizing = "" === u.style.boxSizing || "" === u.style.MozBoxSizing || "" === u.style.WebkitBoxSizing, p.extend(d, {
                        reliableHiddenOffsets: function() {
                            return null == t && c(), o
                        },
                        boxSizingReliable: function() {
                            return null == t && c(), i
                        },
                        pixelMarginRight: function() {
                            return null == t && c(), n
                        },
                        pixelPosition: function() {
                            return null == t && c(), t
                        },
                        reliableMarginRight: function() {
                            return null == t && c(), a
                        },
                        reliableMarginLeft: function() {
                            return null == t && c(), s
                        }
                    });

                    function c() {
                        var c, d, f = r.documentElement;
                        f.appendChild(l), u.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", t = i = s = !1, n = a = !0, e.getComputedStyle && (d = e.getComputedStyle(u), t = "1%" !== (d || {}).top, s = "2px" === (d || {}).marginLeft, i = "4px" === (d || {
                            width: "4px"
                        }).width, u.style.marginRight = "50%", n = "4px" === (d || {
                            marginRight: "4px"
                        }).marginRight, c = u.appendChild(r.createElement("div")), c.style.cssText = u.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", u.style.width = "1px", a = !parseFloat((e.getComputedStyle(c) || {}).marginRight), u.removeChild(c)), u.style.display = "none", o = 0 === u.getClientRects().length, o && (u.style.display = "", u.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", u.childNodes[0].style.borderCollapse = "separate", c = u.getElementsByTagName("td"), c[0].style.cssText = "margin:0;border:0;padding:0;display:none", o = 0 === c[0].offsetHeight, o && (c[0].style.display = "", c[1].style.display = "none", o = 0 === c[0].offsetHeight)), f.removeChild(l)
                    }
                }
            }();
            var ez, eX, eQ = /^(top|right|bottom|left)$/;
            e.getComputedStyle ? (ez = function(t) {
                var n = t.ownerDocument.defaultView;
                return n && n.opener || (n = e), n.getComputedStyle(t)
            }, eX = function(e, t, n) {
                var r, i, o, a, s = e.style;
                return n = n || ez(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, "" !== a && void 0 !== a || p.contains(e.ownerDocument, e) || (a = p.style(e, t)), n && !d.pixelMarginRight() && eB.test(a) && eP.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o), void 0 === a ? a : a + ""
            }) : eI.currentStyle && (ez = function(e) {
                return e.currentStyle
            }, eX = function(e, t, n) {
                var r, i, o, a, s = e.style;
                return n = n || ez(e), a = n ? n[t] : void 0, null == a && s && s[t] && (a = s[t]), eB.test(a) && !eQ.test(t) && (r = s.left, i = e.runtimeStyle, o = i && i.left, o && (i.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = r, o && (i.left = o)), void 0 === a ? a : a + "" || "auto"
            });

            function eU(e, t) {
                return {
                    get: function() {
                        return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                    }
                }
            }
            var eV = /alpha\([^)]*\)/i,
                eG = /opacity\s*=\s*([^)]*)/i,
                eY = /^(none|table(?!-c[ea]).+)/,
                eJ = new RegExp("^(" + Q + ")(.*)$", "i"),
                eK = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                eZ = {
                    letterSpacing: "0",
                    fontWeight: "400"
                },
                e0 = ["Webkit", "O", "Moz", "ms"],
                e1 = r.createElement("div").style;

            function e2(e) {
                if (e in e1) return e;
                var t = e.charAt(0).toUpperCase() + e.slice(1),
                    n = e0.length;
                while (n--)
                    if (e = e0[n] + t, e in e1) return e
            }

            function e3(e, t) {
                for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) r = e[a], r.style && (o[a] = p._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && G(r) && (o[a] = p._data(r, "olddisplay", eW(r.nodeName)))) : (i = G(r), (n && "none" !== n || !i) && p._data(r, "olddisplay", i ? n : p.css(r, "display"))));
                for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
                return e
            }

            function e4(e, t, n) {
                var r = eJ.exec(t);
                return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
            }

            function e9(e, t, n, r, i) {
                for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += p.css(e, n + V[o], !0, i)), r ? ("content" === n && (a -= p.css(e, "padding" + V[o], !0, i)), "margin" !== n && (a -= p.css(e, "border" + V[o] + "Width", !0, i))) : (a += p.css(e, "padding" + V[o], !0, i), "padding" !== n && (a += p.css(e, "border" + V[o] + "Width", !0, i)));
                return a
            }

            function e5(e, t, n) {
                var r = !0,
                    i = "width" === t ? e.offsetWidth : e.offsetHeight,
                    o = ez(e),
                    a = d.boxSizing && "border-box" === p.css(e, "boxSizing", !1, o);
                if (0 >= i || null == i) {
                    if (i = eX(e, t, o), (0 > i || null == i) && (i = e.style[t]), eB.test(i)) return i;
                    r = a && (d.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
                }
                return i + e9(e, t, n || (a ? "border" : "content"), r, o) + "px"
            }
            p.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, t) {
                            if (t) {
                                var n = eX(e, "opacity");
                                return "" === n ? "1" : n
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": d.cssFloat ? "cssFloat" : "styleFloat"
                },
                style: function(e, t, n, r) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var i, o, a, s = p.camelCase(t),
                            l = e.style;
                        if (t = p.cssProps[s] || (p.cssProps[s] = e2(s) || s), a = p.cssHooks[t] || p.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                        if (o = typeof n, "string" === o && (i = U.exec(n)) && i[1] && (n = Y(e, t, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (p.cssNumber[s] ? "" : "px")), d.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(e, n, r))))) try {
                            l[t] = n
                        } catch (e) {}
                    }
                },
                css: function(e, t, n, r) {
                    var i, o, a, s = p.camelCase(t);
                    return t = p.cssProps[s] || (p.cssProps[s] = e2(s) || s), a = p.cssHooks[t] || p.cssHooks[s], a && "get" in a && (o = a.get(e, !0, n)), void 0 === o && (o = eX(e, t, r)), "normal" === o && t in eZ && (o = eZ[t]), "" === n || n ? (i = parseFloat(o), n === !0 || isFinite(i) ? i || 0 : o) : o
                }
            }), p.each(["height", "width"], function(e, t) {
                p.cssHooks[t] = {
                    get: function(e, n, r) {
                        return n ? eY.test(p.css(e, "display")) && 0 === e.offsetWidth ? e$(e, eK, function() {
                            return e5(e, t, r)
                        }) : e5(e, t, r) : void 0
                    },
                    set: function(e, n, r) {
                        var i = r && ez(e);
                        return e4(e, n, r ? e9(e, t, r, d.boxSizing && "border-box" === p.css(e, "boxSizing", !1, i), i) : 0)
                    }
                }
            }), d.opacity || (p.cssHooks.opacity = {
                get: function(e, t) {
                    return eG.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
                },
                set: function(e, t) {
                    var n = e.style,
                        r = e.currentStyle,
                        i = p.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                        o = r && r.filter || n.filter || "";
                    n.zoom = 1, (t >= 1 || "" === t) && "" === p.trim(o.replace(eV, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = eV.test(o) ? o.replace(eV, i) : o + " " + i)
                }
            }), p.cssHooks.marginRight = eU(d.reliableMarginRight, function(e, t) {
                return t ? e$(e, {
                    display: "inline-block"
                }, eX, [e, "marginRight"]) : void 0
            }), p.cssHooks.marginLeft = eU(d.reliableMarginLeft, function(e, t) {
                return t ? (parseFloat(eX(e, "marginLeft")) || (p.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - e$(e, {
                    marginLeft: 0
                }, function() {
                    return e.getBoundingClientRect().left
                }) : 0)) + "px" : void 0
            }), p.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(e, t) {
                p.cssHooks[e + t] = {
                    expand: function(n) {
                        for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + V[r] + t] = o[r] || o[r - 2] || o[0];
                        return i
                    }
                }, eP.test(e) || (p.cssHooks[e + t].set = e4)
            }), p.fn.extend({
                css: function(e, t) {
                    return J(this, function(e, t, n) {
                        var r, i, o = {},
                            a = 0;
                        if (p.isArray(t)) {
                            for (r = ez(e), i = t.length; i > a; a++) o[t[a]] = p.css(e, t[a], !1, r);
                            return o
                        }
                        return void 0 !== n ? p.style(e, t, n) : p.css(e, t)
                    }, e, t, arguments.length > 1)
                },
                show: function() {
                    return e3(this, !0)
                },
                hide: function() {
                    return e3(this)
                },
                toggle: function(e) {
                    return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                        G(this) ? p(this).show() : p(this).hide()
                    })
                }
            });

            function e6(e, t, n, r, i) {
                return new e6.prototype.init(e, t, n, r, i)
            }
            p.Tween = e6, e6.prototype = {
                constructor: e6,
                init: function(e, t, n, r, i, o) {
                    this.elem = e, this.prop = n, this.easing = i || p.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (p.cssNumber[n] ? "" : "px")
                },
                cur: function() {
                    var e = e6.propHooks[this.prop];
                    return e && e.get ? e.get(this) : e6.propHooks._default.get(this)
                },
                run: function(e) {
                    var t, n = e6.propHooks[this.prop];
                    return this.options.duration ? this.pos = t = p.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : e6.propHooks._default.set(this), this
                }
            }, e6.prototype.init.prototype = e6.prototype, e6.propHooks = {
                _default: {
                    get: function(e) {
                        var t;
                        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = p.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
                    },
                    set: function(e) {
                        p.fx.step[e.prop] ? p.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[p.cssProps[e.prop]] && !p.cssHooks[e.prop] ? e.elem[e.prop] = e.now : p.style(e.elem, e.prop, e.now + e.unit)
                    }
                }
            }, e6.propHooks.scrollTop = e6.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            }, p.easing = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                _default: "swing"
            }, p.fx = e6.prototype.init, p.fx.step = {};
            var e8, e7, te = /^(?:toggle|show|hide)$/,
                tt = /queueHooks$/;

            function tn() {
                return e.setTimeout(function() {
                    e8 = void 0
                }), e8 = p.now()
            }

            function tr(e, t) {
                var n, r = {
                        height: e
                    },
                    i = 0;
                for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = V[i], r["margin" + n] = r["padding" + n] = e;
                return t && (r.opacity = r.width = e), r
            }

            function ti(e, t, n) {
                for (var r, i = (ts.tweeners[t] || []).concat(ts.tweeners["*"]), o = 0, a = i.length; a > o; o++)
                    if (r = i[o].call(n, t, e)) return r
            }

            function to(e, t, n) {
                var r, i, o, a, s, l, u, c, f = this,
                    h = {},
                    g = e.style,
                    v = e.nodeType && G(e),
                    m = p._data(e, "fxshow");
                n.queue || (s = p._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function() {
                    s.unqueued || l()
                }), s.unqueued++, f.always(function() {
                    f.always(function() {
                        s.unqueued--, p.queue(e, "fx").length || s.empty.fire()
                    })
                })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [g.overflow, g.overflowX, g.overflowY], u = p.css(e, "display"), c = "none" === u ? p._data(e, "olddisplay") || eW(e.nodeName) : u, "inline" === c && "none" === p.css(e, "float") && (d.inlineBlockNeedsLayout && "inline" !== eW(e.nodeName) ? g.zoom = 1 : g.display = "inline-block")), n.overflow && (g.overflow = "hidden", d.shrinkWrapBlocks() || f.always(function() {
                    g.overflow = n.overflow[0], g.overflowX = n.overflow[1], g.overflowY = n.overflow[2]
                }));
                for (r in t)
                    if (i = t[r], te.exec(i)) {
                        if (delete t[r], o = o || "toggle" === i, i === (v ? "hide" : "show")) {
                            if ("show" !== i || !m || void 0 === m[r]) continue;
                            v = !0
                        }
                        h[r] = m && m[r] || p.style(e, r)
                    } else u = void 0;
                if (p.isEmptyObject(h)) "inline" === ("none" === u ? eW(e.nodeName) : u) && (g.display = u);
                else {
                    m ? "hidden" in m && (v = m.hidden) : m = p._data(e, "fxshow", {}), o && (m.hidden = !v), v ? p(e).show() : f.done(function() {
                        p(e).hide()
                    }), f.done(function() {
                        var t;
                        p._removeData(e, "fxshow");
                        for (t in h) p.style(e, t, h[t])
                    });
                    for (r in h) a = ti(v ? m[r] : 0, r, f), r in m || (m[r] = a.start, v && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
                }
            }

            function ta(e, t) {
                var n, r, i, o, a;
                for (n in e)
                    if (r = p.camelCase(n), i = t[r], o = e[n], p.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = p.cssHooks[r], a && "expand" in a) {
                        o = a.expand(o), delete e[r];
                        for (n in o) n in e || (e[n] = o[n], t[n] = i)
                    } else t[r] = i
            }

            function ts(e, t, n) {
                var r, i, o = 0,
                    a = ts.prefilters.length,
                    s = p.Deferred().always(function() {
                        delete l.elem
                    }),
                    l = function() {
                        if (i) return !1;
                        for (var t = e8 || tn(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, l = u.tweens.length; l > a; a++) u.tweens[a].run(o);
                        return s.notifyWith(e, [u, o, n]), 1 > o && l ? n : (s.resolveWith(e, [u]), !1)
                    },
                    u = s.promise({
                        elem: e,
                        props: p.extend({}, t),
                        opts: p.extend(!0, {
                            specialEasing: {},
                            easing: p.easing._default
                        }, n),
                        originalProperties: t,
                        originalOptions: n,
                        startTime: e8 || tn(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function(t, n) {
                            var r = p.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                            return u.tweens.push(r), r
                        },
                        stop: function(t) {
                            var n = 0,
                                r = t ? u.tweens.length : 0;
                            if (i) return this;
                            for (i = !0; r > n; n++) u.tweens[n].run(1);
                            return t ? (s.notifyWith(e, [u, 1, 0]), s.resolveWith(e, [u, t])) : s.rejectWith(e, [u, t]), this
                        }
                    }),
                    c = u.props;
                for (ta(c, u.opts.specialEasing); a > o; o++)
                    if (r = ts.prefilters[o].call(u, e, c, u.opts)) return p.isFunction(r.stop) && (p._queueHooks(u.elem, u.opts.queue).stop = p.proxy(r.stop, r)), r;
                return p.map(c, ti, u), p.isFunction(u.opts.start) && u.opts.start.call(e, u), p.fx.timer(p.extend(l, {
                    elem: e,
                    anim: u,
                    queue: u.opts.queue
                })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
            }
            p.Animation = p.extend(ts, {
                    tweeners: {
                        "*": [function(e, t) {
                            var n = this.createTween(e, t);
                            return Y(n.elem, e, U.exec(t), n), n
                        }]
                    },
                    tweener: function(e, t) {
                        p.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(L);
                        for (var n, r = 0, i = e.length; i > r; r++) n = e[r], ts.tweeners[n] = ts.tweeners[n] || [], ts.tweeners[n].unshift(t)
                    },
                    prefilters: [to],
                    prefilter: function(e, t) {
                        t ? ts.prefilters.unshift(e) : ts.prefilters.push(e)
                    }
                }), p.speed = function(e, t, n) {
                    var r = e && "object" == typeof e ? p.extend({}, e) : {
                        complete: n || !n && t || p.isFunction(e) && e,
                        duration: e,
                        easing: n && t || t && !p.isFunction(t) && t
                    };
                    return r.duration = p.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in p.fx.speeds ? p.fx.speeds[r.duration] : p.fx.speeds._default, null != r.queue && r.queue !== !0 || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                        p.isFunction(r.old) && r.old.call(this), r.queue && p.dequeue(this, r.queue)
                    }, r
                }, p.fn.extend({
                    fadeTo: function(e, t, n, r) {
                        return this.filter(G).css("opacity", 0).show().end().animate({
                            opacity: t
                        }, e, n, r)
                    },
                    animate: function(e, t, n, r) {
                        var i = p.isEmptyObject(e),
                            o = p.speed(t, n, r),
                            a = function() {
                                var t = ts(this, p.extend({}, e), o);
                                (i || p._data(this, "finish")) && t.stop(!0)
                            };
                        return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
                    },
                    stop: function(e, t, n) {
                        var r = function(e) {
                            var t = e.stop;
                            delete e.stop, t(n)
                        };
                        return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                            var t = !0,
                                i = null != e && e + "queueHooks",
                                o = p.timers,
                                a = p._data(this);
                            if (i) a[i] && a[i].stop && r(a[i]);
                            else
                                for (i in a) a[i] && a[i].stop && tt.test(i) && r(a[i]);
                            for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                            !t && n || p.dequeue(this, e)
                        })
                    },
                    finish: function(e) {
                        return e !== !1 && (e = e || "fx"), this.each(function() {
                            var t, n = p._data(this),
                                r = n[e + "queue"],
                                i = n[e + "queueHooks"],
                                o = p.timers,
                                a = r ? r.length : 0;
                            for (n.finish = !0, p.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                            for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                            delete n.finish
                        })
                    }
                }), p.each(["toggle", "show", "hide"], function(e, t) {
                    var n = p.fn[t];
                    p.fn[t] = function(e, r, i) {
                        return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(tr(t, !0), e, r, i)
                    }
                }), p.each({
                    slideDown: tr("show"),
                    slideUp: tr("hide"),
                    slideToggle: tr("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(e, t) {
                    p.fn[e] = function(e, n, r) {
                        return this.animate(t, e, n, r)
                    }
                }), p.timers = [], p.fx.tick = function() {
                    var e, t = p.timers,
                        n = 0;
                    for (e8 = p.now(); n < t.length; n++) e = t[n], e() || t[n] !== e || t.splice(n--, 1);
                    t.length || p.fx.stop(), e8 = void 0
                }, p.fx.timer = function(e) {
                    p.timers.push(e), e() ? p.fx.start() : p.timers.pop()
                }, p.fx.interval = 13, p.fx.start = function() {
                    e7 || (e7 = e.setInterval(p.fx.tick, p.fx.interval))
                }, p.fx.stop = function() {
                    e.clearInterval(e7), e7 = null
                }, p.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, p.fn.delay = function(t, n) {
                    return t = p.fx ? p.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, r) {
                        var i = e.setTimeout(n, t);
                        r.stop = function() {
                            e.clearTimeout(i)
                        }
                    })
                },
                function() {
                    var e, t = r.createElement("input"),
                        n = r.createElement("div"),
                        i = r.createElement("select"),
                        o = i.appendChild(r.createElement("option"));
                    n = r.createElement("div"), n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], t.setAttribute("type", "checkbox"), n.appendChild(t), e = n.getElementsByTagName("a")[0], e.style.cssText = "top:1px", d.getSetAttribute = "t" !== n.className, d.style = /top/.test(e.getAttribute("style")), d.hrefNormalized = "/a" === e.getAttribute("href"), d.checkOn = !!t.value, d.optSelected = o.selected, d.enctype = !!r.createElement("form").enctype, i.disabled = !0, d.optDisabled = !o.disabled, t = r.createElement("input"), t.setAttribute("value", ""), d.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), d.radioValue = "t" === t.value
                }();
            var tl = /\r/g,
                tu = /[\x20\t\r\n\f]+/g;
            p.fn.extend({
                val: function(e) {
                    var t, n, r, i = this[0]; {
                        if (arguments.length) return r = p.isFunction(e), this.each(function(n) {
                            var i;
                            1 === this.nodeType && (i = r ? e.call(this, n, p(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : p.isArray(i) && (i = p.map(i, function(e) {
                                return null == e ? "" : e + ""
                            })), t = p.valHooks[this.type] || p.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                        });
                        if (i) return t = p.valHooks[i.type] || p.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(tl, "") : null == n ? "" : n)
                    }
                }
            }), p.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            var t = p.find.attr(e, "value");
                            return null != t ? t : p.trim(p.text(e)).replace(tu, " ")
                        }
                    },
                    select: {
                        get: function(e) {
                            for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, l = 0 > i ? s : o ? i : 0; s > l; l++)
                                if (n = r[l], (n.selected || l === i) && (d.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !p.nodeName(n.parentNode, "optgroup"))) {
                                    if (t = p(n).val(), o) return t;
                                    a.push(t)
                                }
                            return a
                        },
                        set: function(e, t) {
                            var n, r, i = e.options,
                                o = p.makeArray(t),
                                a = i.length;
                            while (a--)
                                if (r = i[a], p.inArray(p.valHooks.option.get(r), o) > -1) try {
                                    r.selected = n = !0
                                } catch (e) {
                                    r.scrollHeight
                                } else r.selected = !1;
                            return n || (e.selectedIndex = -1), i
                        }
                    }
                }
            }), p.each(["radio", "checkbox"], function() {
                p.valHooks[this] = {
                    set: function(e, t) {
                        return p.isArray(t) ? e.checked = p.inArray(p(e).val(), t) > -1 : void 0
                    }
                }, d.checkOn || (p.valHooks[this].get = function(e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                })
            });
            var tc, td, tf = p.expr.attrHandle,
                tp = /^(?:checked|selected)$/i,
                th = d.getSetAttribute,
                tg = d.input;
            p.fn.extend({
                attr: function(e, t) {
                    return J(this, p.attr, e, t, arguments.length > 1)
                },
                removeAttr: function(e) {
                    return this.each(function() {
                        p.removeAttr(this, e)
                    })
                }
            }), p.extend({
                attr: function(e, t, n) {
                    var r, i, o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? p.prop(e, t, n) : (1 === o && p.isXMLDoc(e) || (t = t.toLowerCase(), i = p.attrHooks[t] || (p.expr.match.bool.test(t) ? td : tc)), void 0 !== n ? null === n ? void p.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = p.find.attr(e, t), null == r ? void 0 : r))
                },
                attrHooks: {
                    type: {
                        set: function(e, t) {
                            if (!d.radioValue && "radio" === t && p.nodeName(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t), n && (e.value = n), t
                            }
                        }
                    }
                },
                removeAttr: function(e, t) {
                    var n, r, i = 0,
                        o = t && t.match(L);
                    if (o && 1 === e.nodeType)
                        while (n = o[i++]) r = p.propFix[n] || n, p.expr.match.bool.test(n) ? tg && th || !tp.test(n) ? e[r] = !1 : e[p.camelCase("default-" + n)] = e[r] = !1 : p.attr(e, n, ""), e.removeAttribute(th ? n : r)
                }
            }), td = {
                set: function(e, t, n) {
                    return t === !1 ? p.removeAttr(e, n) : tg && th || !tp.test(n) ? e.setAttribute(!th && p.propFix[n] || n, n) : e[p.camelCase("default-" + n)] = e[n] = !0, n
                }
            }, p.each(p.expr.match.bool.source.match(/\w+/g), function(e, t) {
                var n = tf[t] || p.find.attr;
                tg && th || !tp.test(t) ? tf[t] = function(e, t, r) {
                    var i, o;
                    return r || (o = tf[t], tf[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, tf[t] = o), i
                } : tf[t] = function(e, t, n) {
                    return n ? void 0 : e[p.camelCase("default-" + t)] ? t.toLowerCase() : null
                }
            }), tg && th || (p.attrHooks.value = {
                set: function(e, t, n) {
                    return p.nodeName(e, "input") ? void(e.defaultValue = t) : tc && tc.set(e, t, n)
                }
            }), th || (tc = {
                set: function(e, t, n) {
                    var r = e.getAttributeNode(n);
                    return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
                }
            }, tf.id = tf.name = tf.coords = function(e, t, n) {
                var r;
                return n ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
            }, p.valHooks.button = {
                get: function(e, t) {
                    var n = e.getAttributeNode(t);
                    return n && n.specified ? n.value : void 0
                },
                set: tc.set
            }, p.attrHooks.contenteditable = {
                set: function(e, t, n) {
                    tc.set(e, "" === t ? !1 : t, n)
                }
            }, p.each(["width", "height"], function(e, t) {
                p.attrHooks[t] = {
                    set: function(e, n) {
                        return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
                    }
                }
            })), d.style || (p.attrHooks.style = {
                get: function(e) {
                    return e.style.cssText || void 0
                },
                set: function(e, t) {
                    return e.style.cssText = t + ""
                }
            });
            var tv = /^(?:input|select|textarea|button|object)$/i,
                tm = /^(?:a|area)$/i;
            p.fn.extend({
                prop: function(e, t) {
                    return J(this, p.prop, e, t, arguments.length > 1)
                },
                removeProp: function(e) {
                    return e = p.propFix[e] || e, this.each(function() {
                        try {
                            this[e] = void 0, delete this[e]
                        } catch (e) {}
                    })
                }
            }), p.extend({
                prop: function(e, t, n) {
                    var r, i, o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o) return 1 === o && p.isXMLDoc(e) || (t = p.propFix[t] || t, i = p.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            var t = p.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : tv.test(e.nodeName) || tm.test(e.nodeName) && e.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    "for": "htmlFor",
                    "class": "className"
                }
            }), d.hrefNormalized || p.each(["href", "src"], function(e, t) {
                p.propHooks[t] = {
                    get: function(e) {
                        return e.getAttribute(t, 4)
                    }
                }
            }), d.optSelected || (p.propHooks.selected = {
                get: function(e) {
                    var t = e.parentNode;
                    return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
                },
                set: function(e) {
                    var t = e.parentNode;
                    t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
                }
            }), p.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                p.propFix[this.toLowerCase()] = this
            }), d.enctype || (p.propFix.enctype = "encoding");
            var ty = /[\t\r\n\f]/g;

            function tx(e) {
                return p.attr(e, "class") || ""
            }
            p.fn.extend({
                addClass: function(e) {
                    var t, n, r, i, o, a, s, l = 0;
                    if (p.isFunction(e)) return this.each(function(t) {
                        p(this).addClass(e.call(this, t, tx(this)))
                    });
                    if ("string" == typeof e && e) {
                        t = e.match(L) || [];
                        while (n = this[l++])
                            if (i = tx(n), r = 1 === n.nodeType && (" " + i + " ").replace(ty, " ")) {
                                a = 0;
                                while (o = t[a++]) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                                s = p.trim(r), i !== s && p.attr(n, "class", s)
                            }
                    }
                    return this
                },
                removeClass: function(e) {
                    var t, n, r, i, o, a, s, l = 0;
                    if (p.isFunction(e)) return this.each(function(t) {
                        p(this).removeClass(e.call(this, t, tx(this)))
                    });
                    if (!arguments.length) return this.attr("class", "");
                    if ("string" == typeof e && e) {
                        t = e.match(L) || [];
                        while (n = this[l++])
                            if (i = tx(n), r = 1 === n.nodeType && (" " + i + " ").replace(ty, " ")) {
                                a = 0;
                                while (o = t[a++])
                                    while (r.indexOf(" " + o + " ") > -1) r = r.replace(" " + o + " ", " ");
                                s = p.trim(r), i !== s && p.attr(n, "class", s)
                            }
                    }
                    return this
                },
                toggleClass: function(e, t) {
                    var n = typeof e;
                    return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : p.isFunction(e) ? this.each(function(n) {
                        p(this).toggleClass(e.call(this, n, tx(this), t), t)
                    }) : this.each(function() {
                        var t, r, i, o;
                        if ("string" === n) {
                            r = 0, i = p(this), o = e.match(L) || [];
                            while (t = o[r++]) i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
                        } else void 0 !== e && "boolean" !== n || (t = tx(this), t && p._data(this, "__className__", t), p.attr(this, "class", t || e === !1 ? "" : p._data(this, "__className__") || ""))
                    })
                },
                hasClass: function(e) {
                    var t, n, r = 0;
                    t = " " + e + " ";
                    while (n = this[r++])
                        if (1 === n.nodeType && (" " + tx(n) + " ").replace(ty, " ").indexOf(t) > -1) return !0;
                    return !1
                }
            }), p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
                p.fn[t] = function(e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                }
            }), p.fn.extend({
                hover: function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                }
            });
            var tw = e.location,
                tb = p.now(),
                tT = /\?/,
                tC = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
            p.parseJSON = function(t) {
                if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
                var n, r = null,
                    i = p.trim(t + "");
                return i && !p.trim(i.replace(tC, function(e, t, i, o) {
                    return n && t && (r = 0), 0 === r ? e : (n = i || t, r += !o - !i, "")
                })) ? Function("return " + i)() : p.error("Invalid JSON: " + t)
            }, p.parseXML = function(t) {
                var n, r;
                if (!t || "string" != typeof t) return null;
                try {
                    e.DOMParser ? (r = new e.DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new e.ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
                } catch (e) {
                    n = void 0
                }
                return n && n.documentElement && !n.getElementsByTagName("parsererror").length || p.error("Invalid XML: " + t), n
            };
            var tk = /#.*$/,
                tE = /([?&])_=[^&]*/,
                tN = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
                t_ = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                tj = /^(?:GET|HEAD)$/,
                tS = /^\/\//,
                tA = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                tD = {},
                tL = {},
                tq = "*/".concat("*"),
                tH = tw.href,
                tR = tA.exec(tH.toLowerCase()) || [];

            function tO(e) {
                return function(t, n) {
                    "string" != typeof t && (n = t, t = "*");
                    var r, i = 0,
                        o = t.toLowerCase().match(L) || [];
                    if (p.isFunction(n))
                        while (r = o[i++]) "+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
                }
            }

            function tM(e, t, n, r) {
                var i = {},
                    o = e === tL;

                function a(s) {
                    var l;
                    return i[s] = !0, p.each(e[s] || [], function(e, s) {
                        var u = s(t, n, r);
                        return "string" != typeof u || o || i[u] ? o ? !(l = u) : void 0 : (t.dataTypes.unshift(u), a(u), !1)
                    }), l
                }
                return a(t.dataTypes[0]) || !i["*"] && a("*")
            }

            function tF(e, t) {
                var n, r, i = p.ajaxSettings.flatOptions || {};
                for (r in t) void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
                return n && p.extend(!0, e, n), e
            }

            function tW(e, t, n) {
                var r, i, o, a, s = e.contents,
                    l = e.dataTypes;
                while ("*" === l[0]) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                if (i) {
                    for (a in s)
                        if (s[a] && s[a].test(i)) {
                            l.unshift(a);
                            break
                        }
                }
                if (l[0] in n) o = l[0];
                else {
                    for (a in n) {
                        if (!l[0] || e.converters[a + " " + l[0]]) {
                            o = a;
                            break
                        }
                        r || (r = a)
                    }
                    o = o || r
                }
                return o ? (o !== l[0] && l.unshift(o), n[o]) : void 0
            }

            function tP(e, t, n, r) {
                var i, o, a, s, l, u = {},
                    c = e.dataTypes.slice();
                if (c[1])
                    for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
                o = c.shift();
                while (o)
                    if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift()) {
                        if ("*" === o) o = l;
                        else if ("*" !== l && l !== o) {
                            if (a = u[l + " " + o] || u["* " + o], !a) {
                                for (i in u)
                                    if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                                        a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], c.unshift(s[1]));
                                        break
                                    }
                            }
                            if (a !== !0)
                                if (a && e["throws"]) t = a(t);
                                else try {
                                    t = a(t)
                                } catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: a ? e : "No conversion from " + l + " to " + o
                                    }
                                }
                        }
                    }
                return {
                    state: "success",
                    data: t
                }
            }
            p.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: tH,
                    type: "GET",
                    isLocal: t_.test(tR[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": tq,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": p.parseJSON,
                        "text xml": p.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(e, t) {
                    return t ? tF(tF(e, p.ajaxSettings), t) : tF(p.ajaxSettings, e)
                },
                ajaxPrefilter: tO(tD),
                ajaxTransport: tO(tL),
                ajax: function(t, n) {
                    "object" == typeof t && (n = t, t = void 0), n = n || {};
                    var r, i, o, a, s, l, u, c, d = p.ajaxSetup({}, n),
                        f = d.context || d,
                        h = d.context && (f.nodeType || f.jquery) ? p(f) : p.event,
                        g = p.Deferred(),
                        v = p.Callbacks("once memory"),
                        m = d.statusCode || {},
                        y = {},
                        x = {},
                        w = 0,
                        b = "canceled",
                        T = {
                            readyState: 0,
                            getResponseHeader: function(e) {
                                var t;
                                if (2 === w) {
                                    if (!c) {
                                        c = {};
                                        while (t = tN.exec(a)) c[t[1].toLowerCase()] = t[2]
                                    }
                                    t = c[e.toLowerCase()]
                                }
                                return null == t ? null : t
                            },
                            getAllResponseHeaders: function() {
                                return 2 === w ? a : null
                            },
                            setRequestHeader: function(e, t) {
                                var n = e.toLowerCase();
                                return w || (e = x[n] = x[n] || e, y[e] = t), this
                            },
                            overrideMimeType: function(e) {
                                return w || (d.mimeType = e), this
                            },
                            statusCode: function(e) {
                                var t;
                                if (e)
                                    if (2 > w)
                                        for (t in e) m[t] = [m[t], e[t]];
                                    else T.always(e[T.status]);
                                return this
                            },
                            abort: function(e) {
                                var t = e || b;
                                return u && u.abort(t), C(0, t), this
                            }
                        };
                    if (g.promise(T).complete = v.add, T.success = T.done, T.error = T.fail, d.url = ((t || d.url || tH) + "").replace(tk, "").replace(tS, tR[1] + "//"), d.type = n.method || n.type || d.method || d.type, d.dataTypes = p.trim(d.dataType || "*").toLowerCase().match(L) || [""], null == d.crossDomain && (r = tA.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] === tR[1] && r[2] === tR[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (tR[3] || ("http:" === tR[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = p.param(d.data, d.traditional)), tM(tD, d, n, T), 2 === w) return T;
                    l = p.event && d.global, l && 0 === p.active++ && p.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !tj.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (tT.test(o) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = tE.test(o) ? o.replace(tE, "$1_=" + tb++) : o + (tT.test(o) ? "&" : "?") + "_=" + tb++)), d.ifModified && (p.lastModified[o] && T.setRequestHeader("If-Modified-Since", p.lastModified[o]), p.etag[o] && T.setRequestHeader("If-None-Match", p.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", d.contentType), T.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + tq + "; q=0.01" : "") : d.accepts["*"]);
                    for (i in d.headers) T.setRequestHeader(i, d.headers[i]);
                    if (d.beforeSend && (d.beforeSend.call(f, T, d) === !1 || 2 === w)) return T.abort();
                    b = "abort";
                    for (i in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) T[i](d[i]);
                    if (u = tM(tL, d, n, T)) {
                        if (T.readyState = 1, l && h.trigger("ajaxSend", [T, d]), 2 === w) return T;
                        d.async && d.timeout > 0 && (s = e.setTimeout(function() {
                            T.abort("timeout")
                        }, d.timeout));
                        try {
                            w = 1, u.send(y, C)
                        } catch (e) {
                            if (!(2 > w)) throw e;
                            C(-1, e)
                        }
                    } else C(-1, "No Transport");

                    function C(t, n, r, i) {
                        var c, y, x, b, C, k = n;
                        2 !== w && (w = 2, s && e.clearTimeout(s), u = void 0, a = i || "", T.readyState = t > 0 ? 4 : 0, c = t >= 200 && 300 > t || 304 === t, r && (b = tW(d, T, r)), b = tP(d, b, T, c), c ? (d.ifModified && (C = T.getResponseHeader("Last-Modified"), C && (p.lastModified[o] = C), C = T.getResponseHeader("etag"), C && (p.etag[o] = C)), 204 === t || "HEAD" === d.type ? k = "nocontent" : 304 === t ? k = "notmodified" : (k = b.state, y = b.data, x = b.error, c = !x)) : (x = k, !t && k || (k = "error", 0 > t && (t = 0))), T.status = t, T.statusText = (n || k) + "", c ? g.resolveWith(f, [y, k, T]) : g.rejectWith(f, [T, k, x]), T.statusCode(m), m = void 0, l && h.trigger(c ? "ajaxSuccess" : "ajaxError", [T, d, c ? y : x]), v.fireWith(f, [T, k]), l && (h.trigger("ajaxComplete", [T, d]), --p.active || p.event.trigger("ajaxStop")))
                    }
                    return T
                },
                getJSON: function(e, t, n) {
                    return p.get(e, t, n, "json")
                },
                getScript: function(e, t) {
                    return p.get(e, void 0, t, "script")
                }
            }), p.each(["get", "post"], function(e, t) {
                p[t] = function(e, n, r, i) {
                    return p.isFunction(n) && (i = i || r, r = n, n = void 0), p.ajax(p.extend({
                        url: e,
                        type: t,
                        dataType: i,
                        data: n,
                        success: r
                    }, p.isPlainObject(e) && e))
                }
            }), p._evalUrl = function(e) {
                return p.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }, p.fn.extend({
                wrapAll: function(e) {
                    if (p.isFunction(e)) return this.each(function(t) {
                        p(this).wrapAll(e.call(this, t))
                    });
                    if (this[0]) {
                        var t = p(e, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                            var e = this;
                            while (e.firstChild && 1 === e.firstChild.nodeType) e = e.firstChild;
                            return e
                        }).append(this)
                    }
                    return this
                },
                wrapInner: function(e) {
                    return p.isFunction(e) ? this.each(function(t) {
                        p(this).wrapInner(e.call(this, t))
                    }) : this.each(function() {
                        var t = p(this),
                            n = t.contents();
                        n.length ? n.wrapAll(e) : t.append(e)
                    })
                },
                wrap: function(e) {
                    var t = p.isFunction(e);
                    return this.each(function(n) {
                        p(this).wrapAll(t ? e.call(this, n) : e)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        p.nodeName(this, "body") || p(this).replaceWith(this.childNodes)
                    }).end()
                }
            });

            function tB(e) {
                return e.style && e.style.display || p.css(e, "display")
            }

            function t$(e) {
                if (!p.contains(e.ownerDocument || r, e)) return !0;
                while (e && 1 === e.nodeType) {
                    if ("none" === tB(e) || "hidden" === e.type) return !0;
                    e = e.parentNode
                }
                return !1
            }
            p.expr.filters.hidden = function(e) {
                return d.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : t$(e)
            }, p.expr.filters.visible = function(e) {
                return !p.expr.filters.hidden(e)
            };
            var tI = /%20/g,
                tz = /\[\]$/,
                tX = /\r?\n/g,
                tQ = /^(?:submit|button|image|reset|file)$/i,
                tU = /^(?:input|select|textarea|keygen)/i;

            function tV(e, t, n, r) {
                var i;
                if (p.isArray(t)) p.each(t, function(t, i) {
                    n || tz.test(e) ? r(e, i) : tV(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
                });
                else if (n || "object" !== p.type(t)) r(e, t);
                else
                    for (i in t) tV(e + "[" + i + "]", t[i], n, r)
            }
            p.param = function(e, t) {
                var n, r = [],
                    i = function(e, t) {
                        t = p.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                    };
                if (void 0 === t && (t = p.ajaxSettings && p.ajaxSettings.traditional), p.isArray(e) || e.jquery && !p.isPlainObject(e)) p.each(e, function() {
                    i(this.name, this.value)
                });
                else
                    for (n in e) tV(n, e[n], t, i);
                return r.join("&").replace(tI, "+")
            }, p.fn.extend({
                serialize: function() {
                    return p.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var e = p.prop(this, "elements");
                        return e ? p.makeArray(e) : this
                    }).filter(function() {
                        var e = this.type;
                        return this.name && !p(this).is(":disabled") && tU.test(this.nodeName) && !tQ.test(e) && (this.checked || !K.test(e))
                    }).map(function(e, t) {
                        var n = p(this).val();
                        return null == n ? null : p.isArray(n) ? p.map(n, function(e) {
                            return {
                                name: t.name,
                                value: e.replace(tX, "\r\n")
                            }
                        }) : {
                            name: t.name,
                            value: n.replace(tX, "\r\n")
                        }
                    }).get()
                }
            }), p.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
                return this.isLocal ? tZ() : r.documentMode > 8 ? tK() : /^(get|post|head|put|delete|options)$/i.test(this.type) && tK() || tZ()
            } : tK;
            var tG = 0,
                tY = {},
                tJ = p.ajaxSettings.xhr();
            e.attachEvent && e.attachEvent("onunload", function() {
                for (var e in tY) tY[e](void 0, !0)
            }), d.cors = !!tJ && "withCredentials" in tJ, tJ = d.ajax = !!tJ, tJ && p.ajaxTransport(function(t) {
                if (!t.crossDomain || d.cors) {
                    var n;
                    return {
                        send: function(r, i) {
                            var o, a = t.xhr(),
                                s = ++tG;
                            if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                                for (o in t.xhrFields) a[o] = t.xhrFields[o];
                            t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                            for (o in r) void 0 !== r[o] && a.setRequestHeader(o, r[o] + "");
                            a.send(t.hasContent && t.data || null), n = function(e, r) {
                                var o, l, u;
                                if (n && (r || 4 === a.readyState))
                                    if (delete tY[s], n = void 0, a.onreadystatechange = p.noop, r) 4 !== a.readyState && a.abort();
                                    else {
                                        u = {}, o = a.status, "string" == typeof a.responseText && (u.text = a.responseText);
                                        try {
                                            l = a.statusText
                                        } catch (e) {
                                            l = ""
                                        }
                                        o || !t.isLocal || t.crossDomain ? 1223 === o && (o = 204) : o = u.text ? 200 : 404
                                    }
                                u && i(o, l, u, a.getAllResponseHeaders())
                            }, t.async ? 4 === a.readyState ? e.setTimeout(n) : a.onreadystatechange = tY[s] = n : n()
                        },
                        abort: function() {
                            n && n(void 0, !0)
                        }
                    }
                }
            });

            function tK() {
                try {
                    return new e.XMLHttpRequest
                } catch (e) {}
            }

            function tZ() {
                try {
                    return new e.ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {}
            }
            p.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(e) {
                        return p.globalEval(e), e
                    }
                }
            }), p.ajaxPrefilter("script", function(e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
            }), p.ajaxTransport("script", function(e) {
                if (e.crossDomain) {
                    var t, n = r.head || p("head")[0] || r.documentElement;
                    return {
                        send: function(i, o) {
                            t = r.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, n) {
                                (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || o(200, "success"))
                            }, n.insertBefore(t, n.firstChild)
                        },
                        abort: function() {
                            t && t.onload(void 0, !0)
                        }
                    }
                }
            });
            var t0 = [],
                t1 = /(=)\?(?=&|$)|\?\?/;
            p.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = t0.pop() || p.expando + "_" + tb++;
                    return this[e] = !0, e
                }
            }), p.ajaxPrefilter("json jsonp", function(t, n, r) {
                var i, o, a, s = t.jsonp !== !1 && (t1.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && t1.test(t.data) && "data");
                return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = p.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(t1, "$1" + i) : t.jsonp !== !1 && (t.url += (tT.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
                    return a || p.error(i + " was not called"), a[0]
                }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
                    a = arguments
                }, r.always(function() {
                    void 0 === o ? p(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, t0.push(i)), a && p.isFunction(o) && o(a[0]), a = o = void 0
                }), "script") : void 0
            }), p.parseHTML = function(e, t, n) {
                if (!e || "string" != typeof e) return null;
                "boolean" == typeof t && (n = t, t = !1), t = t || r;
                var i = C.exec(e),
                    o = !n && [];
                return i ? [t.createElement(i[1])] : (i = ec([e], t, o), o && o.length && p(o).remove(), p.merge([], i.childNodes))
            };
            var t2 = p.fn.load;
            p.fn.load = function(e, t, n) {
                if ("string" != typeof e && t2) return t2.apply(this, arguments);
                var r, i, o, a = this,
                    s = e.indexOf(" ");
                return s > -1 && (r = p.trim(e.slice(s, e.length)), e = e.slice(0, s)), p.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && p.ajax({
                    url: e,
                    type: i || "GET",
                    dataType: "html",
                    data: t
                }).done(function(e) {
                    o = arguments, a.html(r ? p("<div>").append(p.parseHTML(e)).find(r) : e)
                }).always(n && function(e, t) {
                    a.each(function() {
                        n.apply(this, o || [e.responseText, t, e])
                    })
                }), this
            }, p.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
                p.fn[t] = function(e) {
                    return this.on(t, e)
                }
            }), p.expr.filters.animated = function(e) {
                return p.grep(p.timers, function(t) {
                    return e === t.elem
                }).length
            };

            function t3(e) {
                return p.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
            }
            p.offset = {
                setOffset: function(e, t, n) {
                    var r, i, o, a, s, l, u, c = p.css(e, "position"),
                        d = p(e),
                        f = {};
                    "static" === c && (e.style.position = "relative"), s = d.offset(), o = p.css(e, "top"), l = p.css(e, "left"), u = ("absolute" === c || "fixed" === c) && p.inArray("auto", [o, l]) > -1, u ? (r = d.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(l) || 0), p.isFunction(t) && (t = t.call(e, n, p.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : d.css(f)
                }
            }, p.fn.extend({
                offset: function(e) {
                    if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                        p.offset.setOffset(this, e, t)
                    });
                    var t, n, r = {
                            top: 0,
                            left: 0
                        },
                        i = this[0],
                        o = i && i.ownerDocument;
                    if (o) return t = o.documentElement, p.contains(t, i) ? ("undefined" != typeof i.getBoundingClientRect && (r = i.getBoundingClientRect()), n = t3(o), {
                        top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                        left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                    }) : r
                },
                position: function() {
                    if (this[0]) {
                        var e, t, n = {
                                top: 0,
                                left: 0
                            },
                            r = this[0];
                        return "fixed" === p.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), p.nodeName(e[0], "html") || (n = e.offset()), n.top += p.css(e[0], "borderTopWidth", !0), n.left += p.css(e[0], "borderLeftWidth", !0)), {
                            top: t.top - n.top - p.css(r, "marginTop", !0),
                            left: t.left - n.left - p.css(r, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        var e = this.offsetParent;
                        while (e && !p.nodeName(e, "html") && "static" === p.css(e, "position")) e = e.offsetParent;
                        return e || eI
                    })
                }
            }), p.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(e, t) {
                var n = /Y/.test(t);
                p.fn[e] = function(r) {
                    return J(this, function(e, r, i) {
                        var o = t3(e);
                        return void 0 === i ? o ? t in o ? o[t] : o.document.documentElement[r] : e[r] : void(o ? o.scrollTo(n ? p(o).scrollLeft() : i, n ? i : p(o).scrollTop()) : e[r] = i)
                    }, e, r, arguments.length, null)
                }
            }), p.each(["top", "left"], function(e, t) {
                p.cssHooks[t] = eU(d.pixelPosition, function(e, n) {
                    return n ? (n = eX(e, t), eB.test(n) ? p(e).position()[t] + "px" : n) : void 0
                })
            }), p.each({
                Height: "height",
                Width: "width"
            }, function(e, t) {
                p.each({
                    padding: "inner" + e,
                    content: t,
                    "": "outer" + e
                }, function(n, r) {
                    p.fn[r] = function(r, i) {
                        var o = arguments.length && (n || "boolean" != typeof r),
                            a = n || (r === !0 || i === !0 ? "margin" : "border");
                        return J(this, function(t, n, r) {
                            var i;
                            return p.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? p.css(t, n, a) : p.style(t, n, r, a)
                        }, t, o ? r : void 0, o, null)
                    }
                })
            }), p.fn.extend({
                bind: function(e, t, n) {
                    return this.on(e, null, t, n)
                },
                unbind: function(e, t) {
                    return this.off(e, null, t)
                },
                delegate: function(e, t, n, r) {
                    return this.on(t, e, n, r)
                },
                undelegate: function(e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                }
            }), p.fn.size = function() {
                return this.length
            }, p.fn.andSelf = p.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
                return p
            });
            var t4 = e.jQuery,
                t9 = e.$;
            return p.noConflict = function(t) {
                return e.$ === p && (e.$ = t9), t && e.jQuery === p && (e.jQuery = t4), p
            }, t || (e.jQuery = e.$ = p), p
        })
    }, {}]
}, {}, [4]);