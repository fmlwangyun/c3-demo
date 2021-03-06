/**
 * Created by HUCC on 2017/7/5.
 */


//功能1：动态改变header的不透明度
//1.1 给window注册一个scroll事件
//1.2 获取到window的scrollTop值
//1.3 如果scrollTop大于600，header的不透明度直接固定为0.9
//1.4 如果scrollTop小于等于600，header的不透明度等比例的设置 scrollTop/600 = 当前的opacity/0.9
;(function () {

  var header = document.querySelector(".jd_header");

  window.addEventListener("scroll", function () {

    //获取scrollTop
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    var opacity = 0;
    if (scrollTop > 600) {
      opacity = 0.9;
    } else {
      opacity = scrollTop / 600 * 0.9;
    }

    //设置不透明度
    header.style.backgroundColor = "rgba(222, 24, 27, " + opacity + ")";
  });


})();


//功能2：动态设置秒杀ul的宽度
//1. 获取到ul下li的个数
//2. 获取到ul下li的宽度
//3. 设置ul的宽度 = 个数 * 宽度
;(function () {

  var ul = document.querySelector(".seckill_c>ul");
  var lis = ul.querySelectorAll("li");
  var liWidth = lis[0].offsetWidth;


  ul.style.width = lis.length * liWidth + "px";
})();


//功能3：倒计时
//1. 需要获取时间差  秒杀时间 - 当前时间    除1000  取整
//2. 把时间差转换时，设置到小时的span, 如果值小于10，需要补0
//3. 把时间差转换分，设置到分的span， 如果值小于10，需要补0
//4. 把时间差转换秒，设置到秒的span， 如果值小于10，需要补0

//5. 开启定时器
//6. 当时间差 小于等于0，清除定时器
;(function () {

  var spans = document.querySelectorAll(".seckill_time>span:nth-child(odd)");


  var timer = setInterval(function () {
    var nowTime = new Date();

    //创建一个新的日期
    //年月日，时分秒  毫秒
    // 2017-07-07 12:00:00  DateFormat

    //创建指定日期
    var secTime = new Date(2017, 6, 7, 12, 0, 0);


    var time = parseInt((secTime - nowTime) / 1000);

    if (time <= 0) {
      time = 0;
      clearInterval(timer);
    }

    //转换成小时
    var hours = parseInt(time / 3600);
    spans[0].innerHTML = addZero(hours);

    //转换成分钟,不满60的分钟
    var minutes = parseInt(time / 60) % 60;
    spans[1].innerHTML = addZero(minutes);

    //转换成秒， 不满60的秒钟
    var seconds = time % 60;
    spans[2].innerHTML = addZero(seconds);
  }, 1000);


  function addZero(n) {
    return n < 10 ? "0" + n : n;
  }

})();


//功能4：京东快报
//1. 开启一个定时器，2秒钟滚动一次
//2. 让ul设置translateY ,每次滚动的距离是 一个li的高度，值还要是负值。
//3. 给ul添加过渡，持续时间.5
//4. 无缝，到到达最后一个li的时候，切换成第一个li
;(function () {

  //获取ul
  var ul = document.querySelector(".jd_news>.info>ul");
  //获取li的个数
  var lis = ul.children;
  //获取li的高度
  var liHeight = lis[0].offsetHeight;

  var index = 0;
  setInterval(function () {
    index++;
    //给ul添加过渡
    ul.style.transition = "all .5s";
    ul.style.webkitTransition = "all .5s";
    //设置ul的translateY
    ul.style.transform = "translateY(-" + index * liHeight + "px)";
    ul.style.webkitTransform = "translateY(-" + index * liHeight + "px)";
  }, 2000);


  ////当ul过渡结束时，判断是否是最后一个li，如果是，瞬间变成第一个li
  ul.addEventListener("transitionend", function () {
    //渲染机制： js
    if (index >= lis.length - 1) {
      //说明最后一个li了,换成第一个li ,瞬间切换，清除过渡
      //console.log("最后一个li了，换成第一个");
      index = 0;
      //清除过渡
      ul.style.transition = "none";
      ul.style.webkitTransition = "none";
      //瞬间变成第一个li
      ul.style.transform = "translateY(0px)";
      ul.style.webkitTransform = "translateY(0px)";
    }
  });

})();


//功能5：京东轮播图
//1. 让轮播图可以自动轮播
//1.1 index  2秒钟轮播一次   过渡结束，判断需不要要换图片
//2. 添加touch事件的支持
;(function () {

  var lock = true;

  //1. 找对象
  var banner = document.querySelector(".jd_banner");
  var ul = banner.children[0];
  var ulLis = ul.children;
  var ol = banner.children[1];
  var olLis = ol.children;

  var width = banner.offsetWidth;

  var index = 1;
  //2. 自动轮播图
  var timer = setInterval(function () {
    index++;
    addTransition();
    setTranslateX(-index * width);
  }, 1000);

  //3. 注册过渡结束事件
  ul.addEventListener("transitionend", function () {
    lock = true;
    //如果是最后一张假图片，需要换成第一张真图片
    if (index >= ulLis.length - 1) {
      index = 1;
    }

    //如果是第一张假图片，需要换成最后一张真图片
    if (index <= 0) {
      index = ulLis.length - 2;
    }

    removeTransition();
    setTranslateX(-index * width);


    //同步小圆点
    for (var i = 0; i < olLis.length; i++) {
      olLis[i].className = "";
    }
    olLis[index - 1].className = "now";

  });


  //4. 给window注册resize事件，重新修改width
  window.addEventListener("resize", function () {
    clearInterval(timer);
    width = banner.offsetWidth;
    setTranslateX(-index * width);

    timer = setInterval(function () {
      index++;
      addTransition();
      setTranslateX(-index * width);
    }, 1000);
  })


  //5. 支持手指滑动
  var startX = 0;
  var startTime = 0;
  ul.addEventListener("touchstart", function (e) {

    if(lock) {
      //1. 清除定时器
      clearInterval(timer);
      //2. 获取当前位置
      startX = e.touches[0].clientX;

      //3. 获取当前时间
      startTime = new Date();
    }

  });

  ul.addEventListener("touchmove", function (e) {
   if(lock) {
     //1. 获取滑动的距离
     var moveX = e.touches[0].clientX - startX;
     //2. 让ul加上这段滑动距离
     setTranslateX(-index * width + moveX);
   }
  });

  ul.addEventListener("touchend", function (e) {

    if(lock) {
      lock = false;

      //1. 判断最终滑动是否成功
      //1. 距离超过1/3屏
      //2. 时间小于300ms,距离超过30px
      var moveX = e.changedTouches[0].clientX - startX;
      var moveTime = new Date() - startTime;
      if (Math.abs(moveX) > width / 3 || Math.abs(moveX) > 30 && moveTime < 300) {
        //说明判定成功,判定上一屏还是下一屏
        if (moveX > 0) {
          index--;
        }
        if (moveX < 0) {
          index++
        }
      }

      addTransition();
      setTranslateX(-index * width);


      //2. 开启定时器
      clearInterval(timer);
      timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * width);
      }, 1000);

    }

  });

  function addTransition() {
    ul.style.transition = "all .2s";
    ul.style.webkitTransition = "all .2s";
  }

  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }

  function setTranslateX(value) {
    ul.style.transform = "translateX(" + value + "px)";
    ul.style.webkitTransform = "translateX(" + value + "px)";
  }
})();

