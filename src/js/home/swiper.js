(function (_window) {
    // 计算dpr
    var navigatorUserAgent = navigator.userAgent;
    var iPhone = navigatorUserAgent.indexOf("iPhone");
    if (iPhone > -1) {
        var dpr = Number(window.devicePixelRatio),
            one_dpr = 1 / dpr;
    } else {
        var dpr = 1,
            one_dpr = 1;
    }
    var writeText = "<meta name=\"viewport\" content=\"width=device-width,initial-scale=" + one_dpr + ",maximum-scale=" + one_dpr + ",minimum-scale=" + one_dpr + ",user-scalable=no\">\n        <meta name=\"'flexible\" content=\"initial-dpr=" + dpr + "\">";
    document.write(writeText);
    // 计算字体大小
    var html = document.getElementsByTagName("html");
    var F0 = 75;
    html[0].setAttribute("data-dpr", dpr);
    var getFontSize = function getFontSize() {
        var windowWidth = window.innerWidth;
        html[0].style.fontSize = F0 * windowWidth / 750 + "px";
    };
    // 初始化
    getFontSize();
    _window.addEventListener("resize", getFontSize, false);
})(window);	

var bannerList = document.getElementById("bannerlist"),
        img = bannerList.getElementsByTagName("a"),
        bannerIndex = document.getElementById("bannerindex").getElementsByTagName("li"),
        bannerBox = document.getElementById("bannerbox"); //touch事件容器
    var index = 0,
        // 当前索引
    maxIndex = img.length - 1,
        //最大索引
    classname = "thisindex";
    var setmain,
        // 轮播主体定时器
    setframe,
        // 连续运动定时器
    time = 4000,
        // 连续间隔时间
    animationIng = 0; // 判断轮播连续运动定时器是否存在
    // 速度和单位
    var velocit = 0.65;
    var metric = "rem";
    // touch事件相关函数
    var start = {};
    start.x = "";
    start.right = "";
    start.time = "";
    var end = {};
    end.x = "";
    var html = document.getElementsByTagName("html");
    // px to rem
    var px2rem = function px2rem(px) {
        return px / parseFloat(html[0].style.fontSize);
    };
    // touchstart
    var bannerStartFun = function bannerStartFun(event) {
        if (animationIng == 0) {
            animationIng = 1;
            clearTimeout(setmain);
            var e = event.touches[0];
            start.x = e.pageX;
            start.right = parseFloat(bannerList.style.right);
            start.time = +new Date();
            document.addEventListener("touchmove", bannerMoveFun, false);
            document.addEventListener("touchend", bannerEndFun, false);
        }
    };
    // touchmove
    var bannerMoveFun = function bannerMoveFun(event) {
        event.preventDefault();
        var move = function move() {
            var e = event.touches[0];
            end.x = e.pageX;
            var cha = px2rem(end.x - start.x);
            bannerList.style.right = start.right - cha + metric;
        };
        requestAnimationFrame(move);
    };
    // touchend
    var bannerEndFun = function bannerEndFun(event) {
        end.time = +new Date();
        if (end.time - start.time >= 50) {
            var cha = px2rem(end.x - start.x);
            if (Math.abs(cha) >= 2) {
                cha > 0 ? endFunB() : endFunA();
            } else {
                endFunC();
            }
        } else {
            endFunC();
        }
        document.removeEventListener("touchmove", bannerMoveFun);
        document.removeEventListener("touchend", bannerEndFun);
    };
    // touchend判断并执行相应的函数
    // 加加函数
    var endFunA = function endFunA() {
        bannerIndex[index].classList.remove(classname);
        index == maxIndex ? index = 0 : index++;
        bannerIndex[index].classList.add(classname);
        animation(20, function () {
            enlargeCallBack();
            animationIng = 0;
            setmain = setTimeout(main, time);
        });
    };
    // 减减函数
    var endFunB = function endFunB() {
        bannerIndex[index].classList.remove(classname);
        index == 0 ? index = maxIndex : index--;
        bannerIndex[index].classList.add(classname);
        animation(0, function () {
            reduceCallBack();
            animationIng = 0;
            setmain = setTimeout(main, time);
        });
    };
    // index不变的函数
    var endFunC = function endFunC() {
        animation(10, function () {
            animationIng = 0;
            setmain = setTimeout(main, time);
        });
    };
    // index++回调函数
    var enlargeCallBack = function enlargeCallBack() {
        bannerList.appendChild(img[0]);
        bannerList.style.right = "10" + metric;
    };
    // index--回调函数
    var reduceCallBack = function reduceCallBack() {
        bannerList.insertBefore(img[maxIndex], img[0]);
        bannerList.style.right = "10" + metric;
    };
    // 动画函数
    var animation = function animation(target, callback) {
        var v = "";
        var start = parseFloat(bannerList.style.right);
        start < target ? v = +velocit : v = -velocit;
        var frame = function frame() {
            var right = parseFloat(bannerList.style.right);
            if (Math.abs(target - right) > velocit) {
                bannerList.style.right = v + right + metric;
                setframe = requestAnimationFrame(frame);
            } else {
                bannerList.style.right = target + metric;
                callback ? callback() : "";
            }
        };
        setframe = requestAnimationFrame(frame);
    };
    // 轮播主函数
    var main = function main() {
        animationIng = 1;
        bannerIndex[index].classList.remove(classname);
        index == maxIndex ? index = 0 : index++;
        bannerIndex[index].classList.add(classname);
        animation(20, function () {
            enlargeCallBack();
            animationIng = 0;
            setmain = setTimeout(main, time);
        });
    };
    // 初始化
    var init = function init() {
        bannerList.insertBefore(img[maxIndex], img[0]);
        bannerList.style.right = "10" + metric;
        bannerIndex[0].classList.add(classname);
        bannerBox.addEventListener("touchstart", bannerStartFun, false);
        setmain = setTimeout(main, time);
    };
    init(); 