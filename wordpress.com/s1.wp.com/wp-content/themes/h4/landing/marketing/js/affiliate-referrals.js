(function(e) {
    "use strict";
    var r = localStorage.getItem("affiliate-referrals.js:debug") ? console.log : function() {};

    function t(e, r) {
        window._tkq = window._tkq || [];
        window._tkq.push(["recordEvent", e, r])
    }

    function a(r, t) {
        var a = e("<a />")[0];
        a.href = r;
        return {
            host: a.host,
            pathname: a.pathname,
            query: t ? n(a.search) : a.search
        }
    }

    function n(e) {
        var r = e.substr(1).split("&");
        var t = {};
        for (var a = 0; a < r.length; a++) {
            var n = r[a].split("=");
            if (2 === n.length) {
                t[decodeURIComponent(n[0])] = decodeURIComponent(n[1])
            }
        }
        return t
    }
    if (typeof Object.assign != "function") {
        Object.defineProperty(Object, "assign", {
            value: function e(e, r) {
                "use strict";
                if (e == null) {
                    throw new TypeError("Cannot convert undefined or null to object")
                }
                var t = Object(e);
                for (var a = 1; a < arguments.length; a++) {
                    var n = arguments[a];
                    if (n != null) {
                        for (var i in n) {
                            if (Object.prototype.hasOwnProperty.call(n, i)) {
                                t[i] = n[i]
                            }
                        }
                    }
                }
                return t
            },
            writable: true,
            configurable: true
        })
    }

    function i(e) {
        var r = {
            "-": "+",
            _: "/",
            ".": "="
        };
        return atob(e.replace(/[\-_.]/g, function(e) {
            return r[e]
        }))
    }

    function s(e) {
        e = e.split("*").filter(function(e) {
            return e.length
        }).slice(2);
        if (0 === e.length || 0 !== e.length % 2) {
            return null
        }
        var r = {};
        for (var t = 0; t < e.length; t += 2) {
            r[e[t]] = i(e[t + 1])
        }
        return r
    }

    function f(e) {
        var t = a(e, true);
        var n = t.query;
        r("affiliate-referrals.js: urlParseAmpCompatible: original query:", n);
        if ("tk_amp" in n) {
            var i = s(n.tk_amp);
            r("affiliate-referrals.js: urlParseAmpCompatible: tk_amp:", i);
            t.query = Object.assign({}, i, n)
        }
        r("affiliate-referrals.js: urlParseAmpCompatible: merged query:", t.query);
        return t
    }
    e(document).on("referral_tracked", function(e, a) {
        r("affiliate-referrals.js: referral_tracked");
        var n = a.data || {};
        n.success = a.success || "";
        n.message = a.message || "success";
        n.status = a.status || "";
        t("wpcom_refer_visit_response", n)
    });
    e(document).on("referral_tracked_error", function(e, a) {
        r("affiliate-referrals.js: referral_tracked_error");
        var n = a.responseJSON || {};
        n.status = a.status || "";
        t("wpcom_refer_visit_response", n)
    });
    var o = f(document.location.href).query;
    window.ReferWP = window.ReferWP || {};
    window.ReferWP.queryParams = o;
    var l = document.createElement("script");
    l.src = "https://refer.wordpress.com/wp-content/themes/refer-wordpress/assets/js/referrals.min.js?v=20190410";
    l.setAttribute("data-vendor", "67402");
    document.body.appendChild(l);
    if (o.aff) {
        r("affiliate-referrals.js: wpcom_refer_visit");
        t("wpcom_refer_visit", {
            "affiliate_id": o.aff
        })
    } else if (o.affiliate) {
        r("affiliate-referrals.js: wpcom_refer_old_link_visit");
        t("wpcom_refer_old_link_visit", {
            "affiliate_id": o.affiliate
        })
    }
})(jQuery);