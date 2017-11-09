var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?6fcd62ad8d4fa46fe6c001c4876b8e3d";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s)
})();
(function(para) {
    var p = para.sdk_url,
        n = para.name,
        w = window,
        d = document,
        s = "script",
        x = null,
        y = null;
    w["sensorsDataAnalytic201505"] = n;
    w[n] = w[n] || function(a) {
        return function() {
            (w[n]._q = w[n]._q || []).push([a, arguments])
        }
    };
    var ifs = ["track", "quick", "register", "registerPage", "registerOnce", "clearAllRegister", "trackSignup", "trackAbtest", "setProfile", "setOnceProfile", "appendProfile", "incrementProfile", "deleteProfile", "unsetProfile", "identify", "login", "logout"];
    for (var i = 0; i < ifs.length; i++) { w[n][ifs[i]] = w[n].call(null, ifs[i]) }
    if (!w[n]._t) {
        x = d.createElement(s), y = d.getElementsByTagName(s)[0];
        x.async = 1;
        x.src = p;
        y.parentNode.insertBefore(x, y);
        w[n].para = para
    }
})({ sdk_url: "http://cdn.followme.com/cdn/analytics/sensors-1.7.4/vtrack.min.js", name: "sa", config_url: "http://168.63.205.22:8006/config/?project=followme", web_url: "http://168.63.205.22:8007/?project=followme", server_url: "http://168.63.205.22:8006/sa?project=followme", vtrack_js_file: "http://cdn.followme.com/cdn/analytics/sensors-1.7.4/vendor.min.js", vtrack_css_file: "http://cdn.followme.com/cdn/analytics/sensors-1.7.4/vendor.min.css", heatmap: {}, show_log: false });
sa.quick("autoTrack");

(function() {
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
    try {
        var vcode = getQueryString('vcode');
        if (vcode) {
            sa.setProfile({ vcode: vcode });
        }
        var from = getQueryString('from');
        if (from) {
            sa.setProfile({ from: from });
        }
    } catch(e){console.log(e);}
})();
