var oLi = document.getElementsByTagName("li");
    show();
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].style.left = 140 - i * 20 + "px";
    }
    var onOff = {
        l: false,
        r: true,
        t: false,
        b: false
    };
    //开始的时候为了不让后面的和前面的重合结束游戏，定位因为下面也有定时器会让后面的方块往前走
    var aa = true;
    var ds = setInterval(function () {
        //控制蛇尾跟蛇头
        for (var i = oLi.length - 1; i > 0; i--) {
            oLi[i].style.left = oLi[i - 1].offsetLeft + "px";
            oLi[i].style.top = oLi[i - 1].offsetTop + "px";
        }
        //蛇吃食物
        var oCl = document.getElementsByClassName("cl");
        var oUl = document.getElementById("bod");
        for (var j = 0; j < oCl.length; j++) {
            if (((oCl[j].offsetLeft + oCl[j].offsetWidth) > oLi[0].offsetLeft) && (oCl[j].offsetLeft < (oLi[0].offsetLeft + oLi[0].offsetWidth)) &&
                    +(oCl[j].offsetTop + oCl[j].offsetHeight) > oLi[0].offsetTop && oCl[j].offsetTop < (oLi[0].offsetTop + oLi[0].offsetHeight)) {
                oCl[j].parentNode.removeChild(oCl[j]);
                var oL = document.createElement("li");
                oUl.appendChild(oL);
                oL.style.top = oLi[oLi.length - 2].offsetTop + "px";
                oL.style.left = oLi[oLi.length - 2].offsetLeft + "px";
                oL.className = "she";
                show();
            }
        }
        if (onOff.l) {
            oLi[0].style.left = oLi[0].offsetLeft - 20 + "px";
        }
        if (onOff.r) {
            oLi[0].style.left = oLi[0].offsetLeft + 20 + "px";
        }
        if (onOff.t) {
            oLi[0].style.top = oLi[0].offsetTop - 20 + "px";
        }
        if (onOff.b) {
            oLi[0].style.top = oLi[0].offsetTop + 20 + "px";
        }
        limit();
        fn();
    }, 100);

    //出现食物，如果食物与蛇重合，重新执行函数
    function show() {
        var l = Math.floor(Math.random() * 25);
        var t = Math.floor(Math.random() * 25);
        var oDiv = document.createElement("div");
        document.querySelector(".container").appendChild(oDiv);
        oDiv.className = "cl";
        oDiv.style.top = (t * 20) + "px";
        oDiv.style.left = (l * 20) + "px";
        oLi = document.getElementsByTagName("li");
        for (var i = 0; i < oLi.length; i++) {
            if (oLi[i].offsetLeft == oDiv.offsetLeft  && oLi[i].offsetTop == oDiv.offsetTop) {
                oDiv.parentNode.removeChild(oDiv);
                show();
            }
        }
    }
    //防出界的
    function limit() {
        if (oLi[0].offsetTop < 0) {
            alert("you lose,score:" + (oLi.length - 7));
            clearInterval(ds);
        } else if (oLi[0].offsetTop > document.querySelector(".container").offsetWidth - oLi[0].offsetHeight) {
            alert("you lose,score:" + (oLi.length - 7));
            clearInterval(ds);
        }
        if (oLi[0].offsetLeft < 0) {
            alert("you lose,score:" + (oLi.length - 7));
            clearInterval(ds);
        } else if (oLi[0].offsetLeft > document.querySelector(".container").offsetWidth - oLi[0].offsetWidth) {
            alert("you lose,score:" + (oLi.length - 7));
            clearInterval(ds);
        }
    }
    //控制键盘操作，防止按反方向键
    document.onkeydown = function (e) {
        e = e || event;
        if (e.keyCode == 37 && onOff.r == false) {
            onOff.l = true;
            onOff.r = false;
            onOff.t = false;
            onOff.b = false;
        } else if (e.keyCode == 38 && onOff.b == false) {
            onOff.l = false;
            onOff.r = false;
            onOff.t = true;
            onOff.b = false;
        } else if (e.keyCode == 39 && onOff.l == false) {
            onOff.l = false;
            onOff.r = true;
            onOff.t = false;
            onOff.b = false;
        } else if (e.keyCode == 40 && onOff.t == false) {
            onOff.l = false;
            onOff.r = false;
            onOff.t = false;
            onOff.b = true;
        }
    }
    //判断有没有咬到自己身体
    function fn() {
        for (var i = 1; i < oLi.length; i++) {
                if (oLi[i].offsetLeft == oLi[0].offsetLeft && oLi[i].offsetTop == oLi[0].offsetTop) {
                    alert("you lose,score:" + (oLi.length - 7));
                    clearInterval(ds);

                }
        }
    }