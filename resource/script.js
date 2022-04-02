"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // menu
  (function () {
    var dirs = $('.dir');
    dirs.on('click', function () {
      var p = $(this).parent('.parent');
      p.toggleClass('open');
    });
    var links = $('.children > a');
    var host = window.location.protocol + '//' + window.location.host;
    var path = decodeURIComponent(window.location.pathname);
    links.each(function () {
      var url = decodeURIComponent($(this).prop('href'));

      var _path = url.replace(host, '');

      var isActive = path === _path;

      if (isActive) {
        $(this).parent('.children').addClass('active');
      }
    });
  })(); // viewer


  (function () {
    $('.markdown-body img').viewer({
      title: false,
      toolbar: false,
      navbar: false
    });
  })(); // mobile_menu


  (function () {
    var mobile_menu = $('#mobile_menu');
    var menu = $('#menu');
    mobile_menu.on('click', function () {
      menu.toggleClass('show');
    });
  })();
});
