import $ from "jquery";
import AOS from "aos";

$(document).ready(function () {
  $(".menu-click").on("click", function () {
    $(".navigation").css("width", "100%");
    $("body").addClass("overflow-hidden");
  });

  $(".menu-close").on("click", function () {
    $(".navigation").css("width", "0%");
    $("body").removeClass("overflow-hidden");
  });
  $(".slider").on("beforeChange", function () {
    $(".slick-slide::after").css({ width: 0, opacity: 0 });
  });
});
AOS.init({
  once: true,
});
