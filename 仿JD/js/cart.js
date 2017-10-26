/**
 * Created by HUCC on 2017/7/11.
 */
//checkbox功能
//1. 每个checkbox都有一个功能，点击的时候，选中状态可以切换的。
;(function () {

  var all = document.querySelectorAll(".jd_checkbox");

  for(var i = 0; i < all.length; i++) {
    all[i].addEventListener("click", function (e) {
      this.classList.toggle("checked");
      e.preventDefault();
    });


    all[i].addEventListener("selectstart" ,function (e) {
      e.preventDefault();
    });
  }


  var qx = document.querySelector(".cart_title .jd_checkbox");
  var others = document.querySelectorAll(".cart_content .jd_checkbox");

  qx.addEventListener("click", function () {
    for(var i = 0; i < others.length; i++) {
      if(qx.classList.contains("checked")) {
        others[i].classList.add("checked");
      }else {
        others[i].classList.remove("checked");
      }
    }
  });

})();



//垃圾桶功能
;(function () {

  var btns = document.querySelectorAll(".count_right");
  var mask = document.querySelector(".jd_mask");
  var cancel = document.querySelector(".cancel");

  var title;//记录翻开的那个盖子
  //注册点击事件
  for(var i = 0; i < btns.length; i++) {
    //注册点击事件， 特点不会覆盖
    btns[i].addEventListener("click", function () {
      title = this.children[0];
      title.style.transition = "all .5s";
      title.style.transform = "rotate(-20deg)";
      title.style.transformOrigin = "left top";

      mask.style.display = "block";
    });
  }


  //给取消注册点击事件
  cancel.addEventListener("click", function () {

    mask.style.display = "none";

    title.style.transform = "rotate(0deg)";

  });

})();
