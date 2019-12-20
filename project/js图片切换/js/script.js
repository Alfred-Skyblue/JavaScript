function $(a) {
    return document.getElementById(a)
}

var EventUtil = {};
EventUtil.addEventHandler = function(a, b, c) {
    if (a.addEventListener) a.addEventListener(b, c, false);
    else if (a.attachEvent) a.attachEvent("on" + b, c);
    else a["on" + b] = c
};
EventUtil.removeEventHandler = function(a, b, c) {
    if (a.removeEventListener) a.removeEventListener(b, c, false);
    else if (a.detachEvent) a.detachEvent("on" + b, c);
    else a["on" + b] = null
};

ScrollCrossLeft = {
    interval: 0,
    count: 0,
    duration: 0,
    step: 0,
    srcObj: null,
    callback: null
};
ScrollCrossLeft.doit = function(a, b, c, e) {
    var d = ScrollCrossLeft,
    f = function(g, h, j, k) {
        return j * ((g = g / k - 1) * g * g + 1) + h
    } (d.count, b, c, e);
    a.style.marginLeft = f + "px";
    BigNews.currentBegin = f;
    d.count++;
    if (d.count == e) {
        clearInterval(d.interval);
        d.count = 0;
        a.style.marginLeft = b + c + "px";
        BigNews.currentBegin = b + c;
        d.callback()
    }
};
ScrollCrossLeft2 = {
    interval: 0,
    count: 0,
    duration: 0,
    step: 0,
    srcObj: null,
    callback: null
};
ScrollCrossLeft2.doit_2 = function(a, b, c, e) {
    var d = ScrollCrossLeft2;
    a.style.marginLeft = function(f, g, h, j) {
        return h * ((f = f / j - 1) * f * f + 1) + g
    } (d.count, b, c, e) + "px";
    d.count++;
    if (d.count == e) {
        clearInterval(d.interval);
        d.count = 0;
        a.style.marginLeft = b + c + "px";
        d.callback()
    }
};
ScrollCrossLeft2.scroll = function(a, b, c, e, d, f) {
    var g = ScrollCrossLeft2;
    g.duration = f;
    g.callback = d;
    g.interval = setInterval(function() {
        g.doit_2(a, e, b * c, f)
    },
    10)
};
var B = BigNews = {
    current: 0,
    next: 0,
    scrollInterval: 0,
    autoScroller: 0,
    s: {},
    f: {},
    t: {},
    OnScrolling: false,
    preCss: "",
    currentBegin: 0
};
BigNews.turn = function(a, b) {
    if (a == BigNews.current) return false;
    $("showDiv_" + a).style.zIndex++;
    if ($("bigpic_" + a).src == "images/loading.gif") try {
        setTimeout('$("bigpic_' + a + '").src = ScrollBigPic[' + a + "] ;", 50)
    } catch(c) {}
    BigNews.fadeIn("showDiv_" + a, a, 50, b);
    BigNews.scroll(a, b)
};
BigNews.fadeIn = function(a, b, c, e) {
    try {
        clearInterval(BigNews.f.interval)
    } catch(d) {}
    var f = $(a),
    g = 0;
    BigNews.f.interval = setInterval(function() {
        g += 20;
        f.style.filter = "alpha(opacity=" + g + ")";
        f.style.cssText = f.style.cssText.replace(/;-moz-opacity:.*?;/gi, "") + ";-moz-opacity:" + g * 0.01;
        f.style.cssText = f.style.cssText.replace(/;opacity:.*?;/gi, "") + ";opacity:" + g * 0.01;
        f.style.display = "block";
        if (g == 100) {
            for (var h = 0; h < e.totalcount; h++) {
                $("title_bg_" + h).style.cssText = "position:absolute;left:0;top:221px;float:none;width:694px;height:40px;background:#000;z-index:98;filter:alpha(opacity=60);opacity:0.6;z-index:98;filter:alpha(opacity=0);-moz-opacity:0;opacity:0";
                $("title_" + h).style.cssText = "position:absolute;left:10px;top:232px;font-size:14px;color:#fff;font-weight:normal;z-index:99;filter:alpha(opacity=0);-moz-opacity:0;opacity:0";
                BigNews.showTitles(b, e);
                $("showDiv_" + h).style.cssText = BigNews.preCss;
                if (h == b) $("showDiv_" + h).style.display = "block";
                else $("showDiv_" + h).style.display = "none";
                $("showDiv_" + b).style.zIndex = 0
            }
            BigNews.current = b;
            clearInterval(BigNews.f.interval)
        }
    },
    c)
};
BigNews.showTitles = function(a) {
    try {
        clearInterval(BigNews.t.interval)
    } catch(b) {}
    var c = $("title_" + a),
    e = $("title_bg_" + a),
    d = 0;
    BigNews.t.interval = setInterval(function() {
        d += 10;
        c.style.filter = "alpha(opacity=" + d + ")";
        c.style.cssText = c.style.cssText.replace(/;-moz-opacity:.*?;/gi, "") + ";-moz-opacity:" + d * 0.01;
        c.style.cssText = c.style.cssText.replace(/;opacity:.*?;/gi, "") + ";opacity:" + d * 0.01;
        e.style.filter = "alpha(opacity=" + d * 0.6 + ")";
        e.style.cssText = e.style.cssText.replace(/;-moz-opacity:.*?;/gi, "") + ";-moz-opacity:" + d * 0.0060;
        e.style.cssText = e.style.cssText.replace(/;opacity:.*?;/gi, "") + ";opacity:" + d * 0.0060;
        d == 100 && clearInterval(BigNews.t.interval)
    },
    50)
};
BigNews.scroll = function(a, b) {
    var c = b.step;
    BigNews.next = a;
    try {
        clearInterval(BigNews.s.interval)
    } catch(e) {}
    $(b.hover);
    BigNews.s.duration = 16;
    BigNews.s.callback = function() {};
    var d = parseInt(BigNews.currentBegin),
    f = a * c - d;
    BigNews.s.interval = setInterval(function() {
        BigNews.s.doit($(b.hover), d, f, 16)
    },
    8)
};

BigNews.auto = function(a) {
    clearInterval(BigNews.autoScroller);
    BigNews.autoScroller = setInterval(function() {
        BigNews.turn(BigNews.current == a.totalcount - 1 ? 0 : BigNews.current + 1, a)
    },
    a.autotimeintval)
};
BigNews.pauseSwitch = function() {
    clearTimeout(BigNews.autoScroller)
};
BigNews.showNext = function(a, b) {
    if (a >= MovieRecom.totalcount - 1) return false;
    else {
        BigNews.pauseSwitch();
        BigNews.turn(a + 1, b);
        BigNews.auto(b)
    }
};
BigNews.showPre = function(a, b) {
    if (a <= 0) return false;
    else {
        BigNews.pauseSwitch();
        BigNews.turn(a - 1, b);
        BigNews.auto(b)
    }
};
BigNews.init = function(a) {
    BigNews.s = ScrollCrossLeft;
    BigNews.preCss = a.css;
    EventUtil.addEventHandler($(a.bigpic), "mouseover", new Function("BigNews.pauseSwitch();"));
    EventUtil.addEventHandler($(a.bigpic), "mouseout", new Function("BigNews.auto(" + a.objname + ");"));
    for (i = 0; i < a.totalcount; i++) if (a.smallpic != null && a.smallpic != "") {
        EventUtil.addEventHandler($(a.smallpic + "_" + i), "mouseover", new Function("BigNews.pauseSwitch();BigNews.turn(" + i + "," + a.objname + ");return false;"));
        EventUtil.addEventHandler($(a.smallpic + "_" + i), "mouseout", new Function("BigNews.auto(" + a.objname + ");"))
    }
    BigNews.showTitles(0, a);
    BigNews.auto(a)
};