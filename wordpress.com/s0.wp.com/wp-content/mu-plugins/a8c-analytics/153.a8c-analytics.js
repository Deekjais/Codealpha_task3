"use strict";
(self.webpackChunka8c_analytics = self.webpackChunka8c_analytics || []).push([
    [153], {
        498: (e, o, t) => {
            t.d(o, {
                Z: () => l
            });
            var n = t(81),
                a = t.n(n),
                i = t(645),
                r = t.n(i)()(a());
            r.push([e.id, '.a8c-do-not-sell,.a8c-do-not-sell *{box-sizing:border-box;z-index:50002}.a8c-do-not-sell{display:flex;position:fixed;top:0;left:0;width:100%;height:100%}.a8c-do-not-sell__dialog{position:relative;display:flex;flex-direction:column;position:relative;margin:auto;width:100%;max-width:700px;height:inherit;max-height:800px;background-color:#fff;z-index:1;overflow-y:auto;box-shadow:0px 8px 16px rgba(0,0,0,.2),0px 1px 3px rgba(0,0,0,.15),0px 1px 0px rgba(0,0,0,.05);border-radius:6px}.a8c-do-not-sell__header{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e0e0e0;padding:1rem 2rem}.a8c-do-not-sell__close-button{background:none;border:none;margin:0;padding:0}.a8c-do-not-sell__close-button:after{display:inline-block;content:"\xd7";font-size:28px;transform:translateX(1px)}.a8c-do-not-sell__title{font-size:24px;margin:0;font-family:sans-serif}.a8c-do-not-sell__content{display:flex;flex-direction:column;margin:0 2rem 1rem}.a8c-do-not-sell__content p{font-size:15px;font-family:sans-serif;font-weight:normal;line-height:150%;margin:1em 0}.a8c-do-not-sell__footer{display:flex;justify-content:flex-end;border-top:1px solid #e0e0e0;padding:1rem 2rem}.a8c-do-not-sell__preference{display:flex;align-items:center;border-top:1px solid #e0e0e0;padding:1rem 2rem;font-size:18px}#a8c-do-not-sell.a8c-do-not-sell__checkbox{margin-right:1rem;appearance:checkbox;width:18px;height:18px}.a8c-do-not-sell__button{color:#fff;background-color:rgba(0,0,0,.8);border:1px solid #e0e0e0;padding:10px;border-radius:4px;text-align:center}.a8c-do-not-sell__overlay{position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.2);z-index:0}', ""]);
            const l = r
        },
        645: e => {
            e.exports = function(e) {
                var o = [];
                return o.toString = function() {
                    return this.map(function(o) {
                        var t = "",
                            n = void 0 !== o[5];
                        return o[4] && (t += "@supports (".concat(o[4], ") {")), o[2] && (t += "@media ".concat(o[2], " {")), n && (t += "@layer".concat(o[5].length > 0 ? " ".concat(o[5]) : "", " {")), t += e(o), n && (t += "}"), o[2] && (t += "}"), o[4] && (t += "}"), t
                    }).join("")
                }, o.i = function(e, t, n, a, i) {
                    "string" == typeof e && (e = [
                        [null, e, void 0]
                    ]);
                    var r = {};
                    if (n)
                        for (var l = 0; l < this.length; l++) {
                            var s = this[l][0];
                            null != s && (r[s] = !0)
                        }
                    for (var d = 0; d < e.length; d++) {
                        var c = [].concat(e[d]);
                        n && r[c[0]] || (void 0 !== i && (void 0 === c[5] || (c[1] = "@layer".concat(c[5].length > 0 ? " ".concat(c[5]) : "", " {").concat(c[1], "}")), c[5] = i), t && (c[2] ? (c[1] = "@media ".concat(c[2], " {").concat(c[1], "}"), c[2] = t) : c[2] = t), a && (c[4] ? (c[1] = "@supports (".concat(c[4], ") {").concat(c[1], "}"), c[4] = a) : c[4] = "".concat(a)), o.push(c))
                    }
                }, o
            }
        },
        81: e => {
            e.exports = function(e) {
                return e[1]
            }
        },
        379: e => {
            var o = [];

            function t(e) {
                for (var t = -1, n = 0; n < o.length; n++)
                    if (o[n].identifier === e) {
                        t = n;
                        break
                    }
                return t
            }

            function n(e, n) {
                for (var i = {}, r = [], l = 0; l < e.length; l++) {
                    var s = e[l],
                        d = n.base ? s[0] + n.base : s[0],
                        c = i[d] || 0,
                        p = "".concat(d, " ").concat(c);
                    i[d] = c + 1;
                    var u = t(p),
                        f = {
                            css: s[1],
                            media: s[2],
                            sourceMap: s[3],
                            supports: s[4],
                            layer: s[5]
                        };
                    if (-1 !== u) o[u].references++, o[u].updater(f);
                    else {
                        var h = a(f, n);
                        n.byIndex = l, o.splice(l, 0, {
                            identifier: p,
                            updater: h,
                            references: 1
                        })
                    }
                    r.push(p)
                }
                return r
            }

            function a(e, o) {
                var t = o.domAPI(o);
                return t.update(e),
                    function(o) {
                        if (o) {
                            if (o.css === e.css && o.media === e.media && o.sourceMap === e.sourceMap && o.supports === e.supports && o.layer === e.layer) return;
                            t.update(e = o)
                        } else t.remove()
                    }
            }
            e.exports = function(e, a) {
                var i = n(e = e || [], a = a || {});
                return function(e) {
                    e = e || [];
                    for (var r = 0; r < i.length; r++) {
                        var l = t(i[r]);
                        o[l].references--
                    }
                    for (var s = n(e, a), d = 0; d < i.length; d++) {
                        var c = t(i[d]);
                        0 === o[c].references && (o[c].updater(), o.splice(c, 1))
                    }
                    i = s
                }
            }
        },
        569: e => {
            var o = {};
            e.exports = function(e, t) {
                var n = function(e) {
                    if (void 0 === o[e]) {
                        var t = document.querySelector(e);
                        if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement) try {
                            t = t.contentDocument.head
                        } catch (e) {
                            t = null
                        }
                        o[e] = t
                    }
                    return o[e]
                }(e);
                if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                n.appendChild(t)
            }
        },
        216: e => {
            e.exports = function(e) {
                var o = document.createElement("style");
                return e.setAttributes(o, e.attributes), e.insert(o, e.options), o
            }
        },
        565: (e, o, t) => {
            e.exports = function(e) {
                var o = t.nc;
                o && e.setAttribute("nonce", o)
            }
        },
        795: e => {
            e.exports = function(e) {
                var o = e.insertStyleElement(e);
                return {
                    update: function(t) {
                        ! function(e, o, t) {
                            var n = "";
                            t.supports && (n += "@supports (".concat(t.supports, ") {")), t.media && (n += "@media ".concat(t.media, " {"));
                            var a = void 0 !== t.layer;
                            a && (n += "@layer".concat(t.layer.length > 0 ? " ".concat(t.layer) : "", " {")), n += t.css, a && (n += "}"), t.media && (n += "}"), t.supports && (n += "}");
                            var i = t.sourceMap;
                            i && "undefined" != typeof btoa && (n += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")), o.styleTagTransform(n, e, o.options)
                        }(o, e, t)
                    },
                    remove: function() {
                        ! function(e) {
                            if (null === e.parentNode) return !1;
                            e.parentNode.removeChild(e)
                        }(o)
                    }
                }
            }
        },
        589: e => {
            e.exports = function(e, o) {
                if (o.styleSheet) o.styleSheet.cssText = e;
                else {
                    for (; o.firstChild;) o.removeChild(o.firstChild);
                    o.appendChild(document.createTextNode(e))
                }
            }
        },
        153: (e, o, t) => {
            t.r(o), t.d(o, {
                doNotSellDialogIndex: () => v
            });
            var n = t(140),
                a = t(379),
                i = t.n(a),
                r = t(795),
                l = t.n(r),
                s = t(569),
                d = t.n(s),
                c = t(565),
                p = t.n(c),
                u = t(216),
                f = t.n(u),
                h = t(589),
                m = t.n(h),
                y = t(498),
                g = {};
            g.styleTagTransform = m(), g.setAttributes = p(), g.insert = d().bind(null, "head"), g.domAPI = l(), g.insertStyleElement = f(), i()(y.Z, g), y.Z && y.Z.locals && y.Z.locals;
            const v = {
                disableScrollStyles: "\n        html, body {\n            overflow: hidden;\n        }\n    ",
                getConfig: () => window.a8cAnalyticsConfig.doNotSellDialog,
                enableScroll: function() {
                    const e = document.getElementById("disable-scroll-styles");
                    e && e.remove()
                },
                disableScroll: () => {
                    if (document.getElementById("disable-scroll-styles")) return;
                    const e = (0, n.d)("style", void 0, window.a8cAnalytics.dnsd.disableScrollStyles, e => (e.id = "disable-scroll-styles", e));
                    document.head.appendChild(e)
                },
                show: () => {
                    window.a8cAnalytics.dnsd.disableScroll();
                    const e = window.a8cAnalytics.dnsd.getConfig(),
                        o = (0, n.d)("div", ["a8c-do-not-sell"]);
                    o.appendChild((0, n.d)("div", ["a8c-do-not-sell__overlay"]));
                    const t = (0, n.d)("div", ["a8c-do-not-sell__dialog"]),
                        a = (0, n.d)("div", ["a8c-do-not-sell__header"]),
                        i = (0, n.d)("button", ["a8c-do-not-sell__close-button"], void 0, e => (e.onclick = window.a8cAnalytics.dnsd.close, e)),
                        r = (0, n.d)("h3", ["a8c-do-not-sell__title"], "Do Not Sell or Share My Data"),
                        l = (0, n.d)("div", ["a8c-do-not-sell__content"]);
                    [(0, n.d)("p", ["a8c-do-not-sell__paragraph"], "Your privacy is critically important to us so we strive to be transparent in how we are collecting, using, and sharing your information. We use cookies and other technologies to help us identify and track visitors to our sites, to store usage and access preferences for our services, to track and understand email campaign effectiveness, and to deliver targeted ads. Learn more in our Privacy Policy and our Cookie Policy."), (0, n.d)("p", ["a8c-do-not-sell__paragraph"], "Like many websites, we share some of the data we collect through cookies with certain third party advertising and analytics vendors. The personal information we share includes online identifiers; internet or other network or device activity (such as cookie information, other device identifiers, and IP address); and geolocation data (approximate location information from your IP address). We do not share information that identifies you personally, like your name or contact information. "), (0, n.d)("p", ["a8c-do-not-sell__paragraph"], "We never directly sell your personal information in the conventional sense (i.e., for money), but in some U.S. states the sharing of your information with advertising/analytics vendors can be considered a “sale” of your information, which you may have the right to opt out of. To opt out, click the link below:"), (0, n.d)("p", ["a8c-do-not-sell__paragraph"], "Our opt-out is managed through cookies, so if you delete cookies, your browser is set to delete cookies automatically after a certain length of time, or if you visit sites in a different browser, you’ll need to make this selection again."), (0, n.d)("p", ["a8c-do-not-sell__paragraph"], `If you have any questions about this opt out, or how we honor your legal rights, you can contact us at <a href="mailto:${e.contactEmailAddress}">${e.contactEmailAddress}</a>`)].forEach(e => l.appendChild(e));
                    const s = (0, n.d)("label", ["a8c-do-not-sell__preference"]),
                        d = (0, n.d)("input", ["a8c-do-not-sell__checkbox"], void 0, e => {
                            const {
                                buckets: o
                            } = window.a8cAnalytics.kit.getOptions();
                            return e.type = "checkbox", e.name = "a8c-do-not-sell", e.id = "a8c-do-not-sell", e.checked = !1 === o.advertising, e.onchange = function(e) {
                                var o;
                                const t = !!(null === (o = e.target) || void 0 === o ? void 0 : o.checked);
                                window.a8cAnalytics.kit.registerUSUserOptOut(t)
                            }, e
                        });
                    s.appendChild(d), s.appendChild(document.createTextNode("Do Not Sell or Share My Data"));
                    const c = (0, n.d)("div", ["a8c-do-not-sell__footer"]),
                        p = (0, n.d)("button", ["a8c-do-not-sell__button"], "Close", e => (e.onclick = window.a8cAnalytics.dnsd.close, e));
                    c.appendChild(p), a.appendChild(r), a.appendChild(i), t.appendChild(a), t.appendChild(l), t.appendChild(s), t.appendChild(c), o.appendChild(t), document.body.appendChild(o)
                },
                close: () => {
                    window.a8cAnalytics.dnsd.enableScroll(), document.querySelectorAll(".a8c-do-not-sell").forEach(e => e.remove())
                }
            }
        },
        140: (e, o, t) => {
            t.d(o, {
                d: () => n
            });
            const n = (e, o, t, n) => {
                let a = document.createElement(e);
                return Array.isArray(o) && a.classList.add(...o), t && (a.innerHTML = t), n && (a = n(a)), a
            }
        }
    }
]);