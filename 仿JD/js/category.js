/**
 * Created by HUCC on 2017/7/8.
 */
//功能1：nav的touch反弹效果
//给ul注册3个touch事件，获取到touch的距离，让ul跟着移动
//;(function () {
//
//  //1. 找对象
//  var nav = document.querySelector(".jd_nav");
//  var ul = nav.children[0];
//
//
//  //2. 给ul注册touch事件
//
//  //核心变量：用于存储每次移动结束的位置
//  var currentY = 0;
//
//  var startY = 0;
//
//  ul.addEventListener("touchstart", function (e) {
//    startY = e.touches[0].clientY;
//  });
//
//  ul.addEventListener("touchmove", function (e) {
//    //获取滑动距离
//    var moveY = e.touches[0].clientY - startY;
//
//    removeTransition();
//
//    var temp = currentY + moveY;
//
//    if (temp >= 100) {
//      temp = 100;
//    }
//
//    if (temp <= nav.offsetHeight - ul.offsetHeight - 100) {
//      temp = nav.offsetHeight - ul.offsetHeight - 100;
//    }
//
//    setTranslateY(temp);
//  });
//
//  ul.addEventListener("touchend", function (e) {
//    var moveY = e.changedTouches[0].clientY - startY;
//    currentY += moveY;
//
//    if(currentY > 0){
//      currentY = 0;
//      addTransition();
//      setTranslateY(currentY);
//    }
//
//    if(currentY < nav.offsetHeight - ul.offsetHeight) {
//      currentY = nav.offsetHeight - ul.offsetHeight;
//      addTransition();
//      setTranslateY(currentY);
//    }
//
//  });
//
//
//  function addTransition() {
//    //2. 添加过渡
//    ul.style.transition = "all .2s";
//    ul.style.webkitTransition = "all .2s";
//  }
//
//  function removeTransition() {
//    ul.style.transition = "none";
//    ul.style.webkitTransition = "none";
//  }
//
//  function setTranslateY(value) {
//    ul.style.transform = "translateY(" + value + "px)";
//    ul.style.webkitTransform = "translateY(" + value + "px)";
//  }
//
//
//})();


window.addEventListener("load", function () {

  new IScroll(".jd_nav");

  //参数设置
  // new IScroll(".jd_content",{
  //   scrollY:true,
  //   scrollX:true
  // });
});
