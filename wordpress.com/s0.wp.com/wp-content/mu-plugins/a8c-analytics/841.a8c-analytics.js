"use strict";
(self.webpackChunka8c_analytics = self.webpackChunka8c_analytics || []).push([
    [841], {
        578: (e, t, n) => {
            n.d(t, {
                MB: () => c,
                sp: () => a,
                vk: () => i
            });
            var o = n(447);
            const i = async () => {
                    var e, t, n;
                    const i = await fetch(`https://public-api.wordpress.com/geo/?_=${Date.now()}`),
                        a = await i.json(),
                        c = null !== (e = null == a ? void 0 : a.country_long) && void 0 !== e ? e : o.ag;
                    return {
                        countryCodeShort: null !== (t = null == a ? void 0 : a.country_short) && void 0 !== t ? t : o.ag,
                        countryCodeLong: c,
                        region: null !== (n = null == a ? void 0 : a.region) && void 0 !== n ? n : o.ag
                    }
                },
                a = e => {
                    const t = window.a8cAnalytics.cb.getConfig();
                    return window.a8cAnalytics.kit.docCookies.setItem("country_code", e.countryCodeShort, o.qw, "/", t.cookieDomain), window.a8cAnalytics.kit.docCookies.setItem("region", e.region, o.qw, "/", t.cookieDomain), e
                },
                c = async e => {
                    var t;
                    if (!window.a8cAnalytics.cb.getConfig().isLoggedIn || !window.WPCOM_Proxy_Request) return !1;
                    const n = await window.WPCOM_Proxy_Request({
                        path: "/me/settings",
                        apiNamespace: "rest/v1.1",
                        method: "POST",
                        body: e
                    });
                    return !n.error && (null === (t = null == n ? void 0 : n.settings) || void 0 === t ? void 0 : t.advertising_targeting_opt_out) === e
                }
        },
        447: (e, t, n) => {
            n.d(t, {
                $M: () => o,
                OP: () => a,
                Tx: () => i,
                Zt: () => r,
                ag: () => c,
                qw: () => s
            });
            const o = ["AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK", "CH", "IS", "LI", "NO", "GB"],
                i = ["aff", "affiliate", "sid", "cid", "adgroupid", "campaignid", "device", "fbclid", "format", "gclid", "gclsrc", "keyword", "locationid", "matchtype", "network", "ref", "targetid", "term", "type", "utm_campaign", "utm_content", "utm_medium", "utm_source", "utm_term", "utm_expid"],
                a = ["california", "utah", "virginia", "colorado", "connecticut"],
                c = "unknown",
                s = 21600,
                r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        },
        841: (e, t, n) => {
            n.r(t), n.d(t, {
                kitIndex: () => w
            });
            const o = e => document.body.appendChild(e),
                i = (e, t, n) => {
                    const o = document.createElement("script");
                    return o.src = e, o.async = !0, t && (o.onload = t), n && (o.onerror = n), o
                },
                a = (e, t, n) => o(i(e, t, n)),
                c = e => {
                    a("https://www.googleadservices.com/pagead/conversion_async.js", () => {
                        window.google_trackConversion(e)
                    })
                },
                s = e => {
                    var t, n, o, i;
                    t = window, n = document, t.hj = t.hj || function() {
                        (t.hj.q = t.hj.q || []).push(arguments)
                    }, t._hjSettings = {
                        hjid: e,
                        hjsv: 5
                    }, o = n.getElementsByTagName("head")[0], (i = n.createElement("script")).async = 1, i.src = "//static.hotjar.com/c/hotjar-" + t._hjSettings.hjid + ".js?sv=" + t._hjSettings.hjsv, o.appendChild(i)
                },
                r = {
                    selectors: {
                        a: "href",
                        form: "action"
                    },
                    includeRegExps: [],
                    excludeRegExps: [],
                    linkQueryVars: [],
                    linkOtherVars: {}
                },
                d = (e, t, n) => {
                    let o, i;
                    if ("string" == typeof e ? (o = e, i = t) : (o = t, i = window.a8cAnalytics.kit.getQueryVar(o)), o && null != i) return window.a8cAnalytics.kit.addQueryVar(o, i, n, !1)
                };
            var l = n(447),
                u = n(578);
            const w = {
                GDPR_COUNTRIES: l.$M,
                QUERY_PARAMS: l.Tx,
                CCPARegions: l.OP,
                doNotTrack: () => {
                    var e;
                    return "1" === window.doNotTrack || "1" === (null === (e = window.navigator) || void 0 === e ? void 0 : e.doNotTrack)
                },
                getGlobalPrivacyControlPreference: () => {
                    var e;
                    return !0 === (null === (e = window.navigator) || void 0 === e ? void 0 : e.globalPrivacyControl)
                },
                tracksAnonId: e => {
                    const t = setInterval(() => {
                        const n = window.a8cAnalytics.kit.docCookies.getItem("tk_ai");
                        n && (clearInterval(t), "function" == typeof e && e(n))
                    }, 100)
                },
                uniqueId: (e = 32, t = l.Zt) => {
                    const n = new Uint8Array(e);
                    return crypto.getRandomValues(n), [...n].map(e => t[e % t.length]).join("")
                },
                parseURL: (e, t) => {
                    try {
                        return e = e ? e.replace(/^\/\//, location.protocol + "//") : "", new URL(e || document.URL, t || document.URL)
                    } catch (e) {
                        return null
                    }
                },
                getQueryVar: (e, t = document.URL) => {
                    var n;
                    return null !== (n = window.a8cAnalytics.kit.getQueryVars(t)[e]) && void 0 !== n ? n : null
                },
                getQueryVars: (e = document.URL, t = []) => {
                    const n = window.a8cAnalytics.kit.parseURL(e),
                        o = null == n ? void 0 : n.searchParams;
                    if (!n || !o) return {};
                    let i = {};
                    return o.forEach((e, n) => {
                        t.length && !t.includes(n) || ("tk_amp" === n && (e = window.a8cAnalytics.kit.parseAmpEncodedSearchParams(e).toString()), i[n] = e)
                    }), i
                },
                addQueryVar: (e, t, n = document.URL, o = !1) => {
                    let i = window.a8cAnalytics.kit.parseURL(n);
                    return i && i.searchParams ? (!o && i.searchParams.has(e) || i.searchParams.set(e, t), i.toString()) : n
                },
                linkQueryVars: function(e) {
                    setTimeout(window.a8cAnalytics.kit.doLinkQueryVars, 0, e)
                },
                doLinkQueryVars: function(e = []) {
                    const t = Object.keys(window.a8cAnalytics.kit.getQueryVars()),
                        n = e.map(e => e.linkQueryVars).flat(),
                        o = t.filter(e => n.includes(e));
                    o.length && e.forEach(e => {
                        var t, n;
                        const i = Object.assign(Object.assign({}, r), e);
                        for (let e in i.selectors) {
                            const a = i.selectors[e],
                                c = document.querySelectorAll(e);
                            for (let e = 0; e < c.length; e++) {
                                let s = !1,
                                    r = !1;
                                const l = c[e],
                                    u = l.getAttribute(a) || "",
                                    w = l.tagName,
                                    m = "FORM" === w ? (l.getAttribute("method") || "get").toLowerCase() : "",
                                    p = (window.a8cAnalytics.kit.parseURL(u, document.URL) || "").toString(),
                                    g = p.replace(/^https?\:\/\//g, "").replace(/[\/?&=#]+$/g, "");
                                if (0 === u.indexOf("#") || !/^https?\:\/\//.test(p)) continue;
                                if ((null === (t = null == i ? void 0 : i.includeRegExps) || void 0 === t ? void 0 : t.length) && (i.includeRegExps.forEach(function(e) {
                                        if (e.test(g)) return s = !0, !1
                                    }), !s)) continue;
                                if ((null === (n = null == i ? void 0 : i.excludeRegExps) || void 0 === n ? void 0 : n.length) && (i.excludeRegExps.forEach(function(e) {
                                        if (e.test(g)) return r = !0, !1
                                    }), r)) continue;
                                let y;
                                o.forEach((e, t) => {
                                    if (y = null != y ? y : u, y = d(t, e, y), "FORM" === w && "get" === m && !l.querySelector('input[name="' + window.a8cAnalytics.kit.escJQSelector(e) + '"]')) {
                                        var n = document.createElement("input");
                                        n.setAttribute("type", "hidden"), n.setAttribute("name", e), n.setAttribute("value", window.a8cAnalytics.kit.getQueryVar(e) || ""), l.appendChild(n)
                                    }
                                }), y && l.setAttribute(a, y)
                            }
                        }
                    })
                },
                parseAmpEncodedSearchParams: e => {
                    const t = e.split("*").filter(e => e.length > 0).slice(2);
                    if (!t.length || 0 != t.length % 2) return {};
                    const n = {};
                    for (let e = 0; e < t.length; e += 2) {
                        const o = window.a8cAnalytics.kit.urlSafeBase64DecodeString(t[e + 1]);
                        n[t[e]] = o
                    }
                    return n
                },
                urlSafeBase64DecodeString: e => {
                    const t = {
                        "-": "+",
                        _: "/",
                        ".": "="
                    };
                    return atob(e.replace(/[\-_.]/g, e => t[e]))
                },
                escRegex: e => e.replace(/[.*+?^${}()|[\]\\\-]/g, "\\$&"),
                escJQSelector: e => e.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\\\$&"),
                escHtml: e => {
                    const t = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;"
                    };
                    return e.replace(/[&<>"']/g, e => t[e])
                },
                currentTime: () => Math.round((new Date).getTime() / 1e3),
                ymdTime: e => window.a8cAnalytics.kit.ymdHisTime(e),
                ymdHisTime: e => {
                    const t = e.split(" ", 2);
                    return t[0] = t[0] || "1970-01-01", t[1] = t[1] || "00:00:00", Math.round(Date.parse(t[0] + "T" + t[1] + ".000Z") / 1e3)
                },
                createScriptElement: i,
                attachToBody: o,
                attachScriptElement: a,
                loadPixelImage: e => {
                    const t = new Image(1, 1);
                    return t.loading = "eager", t.style.border = "none", t.src = e, t
                },
                appendIFrame: e => {
                    var t;
                    if (!document.querySelector("#a8c-analytics")) {
                        const e = document.createElement("div");
                        e.style.display = "none", e.setAttribute("id", "a8c-analytics"), document.body.appendChild(e)
                    }
                    const n = document.createElement("iframe");
                    return n.setAttribute("src", e), n.setAttribute("loading", "eager"), n.setAttribute("width", "1"), n.setAttribute("height", "1"), n.setAttribute("frameborder", "0"), n.style.display = "none", null === (t = document.querySelector("#a8c-analytics")) || void 0 === t || t.appendChild(n), n
                },
                getLastFireTimes: () => {
                    try {
                        const e = localStorage.getItem("a8cAnalytics_lastFireTimes");
                        return e ? JSON.parse(e) : {}
                    } catch (e) {
                        return {}
                    }
                },
                getLastFireTime: e => {
                    const t = window.a8cAnalytics.kit.getLastFireTimes();
                    return "number" == typeof t[e] ? t[e] : 0
                },
                isLastFireTimeStale: (e, t) => {
                    const n = window.a8cAnalytics.kit.getLastFireTime(e),
                        o = window.a8cAnalytics.kit.currentTime();
                    return !n || o - n > (t || 86400)
                },
                updateLastFireTime: e => {
                    const t = window.a8cAnalytics.kit.getLastFireTimes();
                    t[e] = Math.round((new Date).getTime() / 1e3), localStorage.setItem("a8cAnalytics_lastFireTimes", JSON.stringify(t))
                },
                getSSGAOptimizeVariationId: e => {
                    var t;
                    const n = JSON.parse(null !== (t = window.a8cAnalytics.kit.docCookies.getItem("_gaexp_a8c")) && void 0 !== t ? t : ""),
                        o = window.a8cAnalytics.kit.currentTime();
                    if (n[e] && n[e].v && (n[e].ts || 0) >= o - 7776e3) return n[e].v
                },
                docCookies: {
                    getItem: e => e && decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null,
                    setItem: (e, t, n, o, i, a) => {
                        if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
                        let c = "";
                        if (n) switch (n.constructor) {
                            case Number:
                                c = n === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + n;
                                break;
                            case String:
                                c = "; expires=" + n;
                                break;
                            case Date:
                                c = "; expires=" + n.toUTCString()
                        }
                        return "rootDomain" !== i && ".rootDomain" !== i || (i = (".rootDomain" === i ? "." : "") + document.location.hostname.split(".").slice(-2).join(".")), document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + c + (i ? "; domain=" + i : "") + (o ? "; path=" + o : "") + (a ? "; secure" : ""), !0
                    },
                    removeItem: function(e, t, n) {
                        return !!this.hasItem(e) && (document.cookie = encodeURIComponent(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (n ? "; domain=" + n : "") + (t ? "; path=" + t : ""), !0)
                    },
                    hasItem: e => !(!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) && new RegExp("(?:^|;\\s*)" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie),
                    keys: () => {
                        const e = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
                        for (let t = e.length, n = 0; n < t; n++) e[n] = decodeURIComponent(e[n]);
                        return e
                    }
                },
                loadGoogleAnalytics: () => {
                    var e, t, n, o, i, a;
                    e = window, t = document, n = "script", o = "ga", e.GoogleAnalyticsObject = o, e[o] = e[o] || function() {
                        (e[o].q = e[o].q || []).push(arguments)
                    }, e[o].l = 1 * new Date, i = t.createElement(n), a = t.getElementsByTagName(n)[0], i.async = 1, i.src = "//www.google-analytics.com/analytics.js", a.parentNode.insertBefore(i, a)
                },
                loadGoogleTagManager: e => {
                    ! function(e, t, n, o, i) {
                        e[o] = e[o] || [], e[o].push({
                            "gtm.start": (new Date).getTime(),
                            event: "gtm.js"
                        });
                        var a = t.getElementsByTagName(n)[0],
                            c = t.createElement(n);
                        c.async = !0, c.src = "https://www.googletagmanager.com/gtm.js?id=" + i, a.parentNode.insertBefore(c, a)
                    }(window, document, "script", "dataLayer", e)
                },
                loadFacebook: () => {
                    var e, t, n, o, i, a;
                    e = window, t = document, n = "script", e.fbq || (o = e.fbq = function() {
                        o.callMethod ? o.callMethod.apply(o, arguments) : o.queue.push(arguments)
                    }, e._fbq || (e._fbq = o), o.push = o, o.loaded = !0, o.version = "2.0", o.queue = [], (i = t.createElement(n)).async = !0, i.src = "https://connect.facebook.net/en_US/fbevents.js", (a = t.getElementsByTagName(n)[0]).parentNode.insertBefore(i, a))
                },
                loadFullStory: (e, t = !1, n = "FS") => {
                    var o, i, a, c, s, r, d, l;
                    window._fs_debug = t, window._fs_host = "fullstory.com", window._fs_script = "edge.fullstory.com/s/fs.js", window._fs_org = e, window._fs_namespace = n, o = window, i = document, a = window._fs_namespace, c = "script", s = "user", a in o ? o.console && o.console.log && o.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].') : ((d = o[a] = function(e, t, n) {
                        d.q ? d.q.push([e, t, n]) : d._api(e, t, n)
                    }).q = [], (r = i.createElement(c)).async = 1, r.crossOrigin = "anonymous", r.src = "https://" + _fs_script, (l = i.getElementsByTagName(c)[0]).parentNode.insertBefore(r, l), d.identify = function(e, t, n) {
                        d(s, {
                            uid: e
                        }, n), t && d(s, t, n)
                    }, d.setUserVars = function(e, t) {
                        d(s, e, t)
                    }, d.event = function(e, t, n) {
                        d("event", {
                            n: e,
                            p: t
                        }, n)
                    }, d.anonymize = function() {
                        d.identify(!1)
                    }, d.shutdown = function() {
                        d("rec", !1)
                    }, d.restart = function() {
                        d("rec", !0)
                    }, d.log = function(e, t) {
                        d("log", [e, t])
                    }, d.consent = function(e) {
                        d("consent", !arguments.length || e)
                    }, d.identifyAccount = function(e, t) {
                        r = "account", (t = t || {}).acctId = e, d(r, t)
                    }, d.clearUserCookie = function() {}, d.setVars = function(e, t) {
                        d("setVars", [e, t])
                    }, d._w = {}, l = "XMLHttpRequest", d._w[l] = o[l], l = "fetch", d._w[l] = o[l], o[l] && (o[l] = function() {
                        return d._w[l].apply(this, arguments)
                    }), d._v = "1.3.0")
                },
                loadTwitter: () => {
                    var e, t, n, o, i, a;
                    e = window, t = document, n = "script", e.twq || ((o = e.twq = function() {
                        o.exe ? o.exe.apply(o, arguments) : o.queue.push(arguments)
                    }).version = "1.1", o.queue = [], (i = t.createElement(n)).async = !0, i.src = "//static.ads-twitter.com/uwt.js", (a = t.getElementsByTagName(n)[0]).parentNode.insertBefore(i, a))
                },
                loadGtag: (e, t) => {
                    t = void 0 !== t ? t : {}, 0 == "gtag" in window ? (a("https://www.googletagmanager.com/gtag/js?id=" + e), window.dataLayer = window.dataLayer || [], window.gtag = function() {
                        dataLayer.push(arguments)
                    }, window.gtag("js", new Date), window.gtag("config", e, t)) : window.gtag("config", e, t)
                },
                loadPinterest: () => {
                    if (!window.pintrk) {
                        a("https://s.pinimg.com/ct/core.js"), window.pintrk = function() {
                            window.pintrk.queue.push(Array.prototype.slice.call(arguments))
                        };
                        var e = window.pintrk;
                        e.queue = [], e.version = "3.0"
                    }
                },
                loadIponweb: () => {
                    window.__iponweb_loaded || (window.__iponweb_loaded = !0, window.smartPixel = window.smartPixel || function(e, t) {
                        window.smartPixel.cmd = window.smartPixel.cmd || [], window.smartPixel.cmd.push([e, t])
                    }, a("https://s.pubmine.com/loader.js"))
                },
                loadLinkedinInsight: e => {
                    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [], window._linkedin_data_partner_ids.push(e),
                        function(e) {
                            window.lintrk || (window.lintrk = function(e, t) {
                                window.lintrk.q.push([e, t])
                            }, window.lintrk.q = []);
                            var t = document.getElementsByTagName("script")[0],
                                n = document.createElement("script");
                            n.type = "text/javascript", n.async = !0, n.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js", t.parentNode.insertBefore(n, t)
                        }()
                },
                loadAdRoll: () => {
                    window.__adroll_loaded && (window.__adroll_loaded = !0, a("https://s.adroll.com/j/roundtrip.js"))
                },
                loadYahooGeminiOath: () => {
                    ! function(e, t, n, o, i) {
                        e[i] = e[i] || [], e[i].push({
                            projectId: "10000",
                            properties: {
                                pixelId: "10014088"
                            }
                        });
                        var a = t.createElement(n);
                        a.src = "https://s.yimg.com/wi/ytc.js", a.async = !0, a.onload = a.onreadystatechange = function() {
                            var t, n = this.readyState,
                                o = e[i];
                            if (!n || "complete" == n || "loaded" == n) try {
                                t = YAHOO.ywa.I13N.fireBeacon, e[i] = [], e[i].push = function(e) {
                                    t([e])
                                }, t(o)
                            } catch (e) {}
                        };
                        var c = t.getElementsByTagName(n)[0];
                        c.parentNode.insertBefore(a, c)
                    }(window, document, "script", 0, "dotq"), window.dotq = window.dotq || []
                },
                loadHotjar: s,
                loadAdWords: c,
                loadParselyTracker: e => {
                    if (window.PARSELY) return;
                    const t = document.createElement("script");
                    t.type = "text/javascript", t.async = !0, t.src = `https://cdn.parsely.com/keys/${e}/p.js?ver=3.3.2`, document.body.appendChild(t)
                },
                fireHotjar: s,
                fireAdWords: c,
                getOptions: () => {
                    var e, t;
                    const n = window.a8cAnalytics.cb.getConfig(),
                        o = {
                            version: 20201224,
                            ok: null,
                            buckets: Object.assign({}, window.a8cAnalytics.cb.allBucketsNull)
                        },
                        i = null !== (e = window.a8cAnalytics.kit.docCookies.getItem(n.v1CookieName)) && void 0 !== e ? e : {},
                        a = null !== (t = JSON.parse(window.a8cAnalytics.kit.docCookies.getItem(n.v2CookieName))) && void 0 !== t ? t : {};
                    return "boolean" == typeof a.ok ? (o.ok = a.ok, o.buckets = Object.assign({}, o.buckets, a.buckets)) : "yes" !== i && "no" !== i || (o.ok = "yes" === i, o.buckets = Object.assign({}, window.a8cAnalytics.cb.allBucketsTrue)), o
                },
                updateOptions: (e, t) => {
                    const n = window.a8cAnalytics.cb.getConfig();
                    let o = window.a8cAnalytics.kit.getOptions();
                    o.ok = !!e, o.buckets = Object.assign({}, o.buckets, t || {}), window.a8cAnalytics.kit.docCookies.setItem(n.v1CookieName, o.ok ? "yes" : "no", 15778800, "/", n.cookieDomain), window.a8cAnalytics.kit.docCookies.setItem(n.v2CookieName, JSON.stringify(o), 15778800, "/", n.cookieDomain), window.a8cAnalytics.cb.maybeFireTrackers(), (0, u.MB)({
                        advertising_targeting_opt_out: !o.buckets.advertising
                    })
                },
                registerUSUserOptOut: e => {
                    var t, n, o;
                    const i = window.a8cAnalytics.kit.getOptions();
                    e && "wpcom" in window && (null === (o = null === (n = null === (t = window.wpcom) || void 0 === t ? void 0 : t.tracks) || void 0 === n ? void 0 : n.recordEvent) || void 0 === o || o.call(n, "a8c_ccpa_optout", {
                        source: "a8c-analytics_script",
                        hostname: window.location.hostname,
                        pathname: window.location.pathname
                    })), window.a8cAnalytics.kit.updateOptions(!0, Object.assign(Object.assign({}, i.buckets), {
                        advertising: !e
                    }))
                }
            }
        }
    }
]);