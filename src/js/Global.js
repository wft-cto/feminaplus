import $ from "jquery";
import AOS from "aos";

$(document).ready(function () {
  $(".menu-click").on("click", function () {
    $(".navigation").fadeIn();
    $("body").addClass("overflow-hidden");
  });

  $(".menu-close").on("click", function () {
   $(".navigation").fadeOut();
    $("body").removeClass("overflow-hidden");
  });
  $(".slider").on("beforeChange", function () {
    $(".slick-slide::after").css({ width: 0, opacity: 0 });
  });
});

$(window).resize(function() {
  if(window.innerWidth > 1023) {
    $("body").removeClass("overflow-hidden");
    $(".navigation").removeAttr("style")
  }
});

AOS.init({
  once: true,
});
