"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var utils = {
    getQueryString: function getQueryString(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split('&');

      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');

        if (pair[0] == variable) {
          return decodeURIComponent(pair[1]);
        }
      }

      return false;
    }
  };
  var isMobile = !!(document.body.clientWidth < 900); // menu

  (function () {
    var $dirs = $('#menu .dir');
    $dirs.on('click', function () {
      var $p = $(this).parent('.parent');
      $p.toggleClass('open');
    });
    var $links = $('#menu .children > a');
    var host = window.location.protocol + '//' + window.location.host;
    var path = decodeURIComponent(window.location.pathname);
    $links.each(function () {
      var url = decodeURIComponent($(this).prop('href'));

      var _path = url.replace(host, '');

      var isActive = path === _path;

      if (isActive) {
        $(this).parent('.children').addClass('active');
      }
    });
  })(); // menu drag


  (function () {
    if (isMobile) {
      return;
    }

    var $drager = $('#drager');
    var $body = $('body');
    var $menu = $('#menu');
    $drager.mouseover(function () {
      if ($menu.hasClass('expand')) {
        $(this).css('cursor', 'e-resize');
      } else {
        $(this).css('cursor', 'unset');
      }
    });
    $drager.mousedown(function () {
      if ($menu.hasClass('expand')) {
        $(this).css('cursor', 'e-resize');
      } else {
        $(this).css('cursor', 'unset');
      }

      $body.mousemove(function (e) {
        var _x = e.pageX;

        if (_x < 245) {
          return;
        }

        $menu.animate({
          width: _x
        }, 0);
      });
    });
    $body.mouseup(function () {
      $(this).unbind('mousemove');
      $(this).css('cursor', 'default');
    });
  })(); // menu switcher


  (function () {
    if (isMobile) {
      return;
    }

    var $menu = $('#menu');
    var $switcher = $('#drager > #switcher');
    $switcher.on('click', function () {
      $menu.removeAttr('style');
      $menu.toggleClass('expand');
      $(this).toggleClass('expand');
    });
  })(); // mobile_menu


  (function () {
    var $mobile_menu = $('#mobile_menu');
    var $menu = $('#menu');
    $mobile_menu.on('click', function () {
      $menu.toggleClass('show');
    });
  })(); // search_bar


  (function () {
    if (isMobile) {
      return;
    }

    var $input = $('#search_bar > input');
    var $clear = $('#search_bar > #clear');
    var timer = null;

    var getSearchResult = function getSearchResult(str) {
      str = str.toLowerCase();
      var tree = window.__doc_builder_dirTree__ || [];
      var res = [];

      var fn = function fn(arr) {
        arr.forEach(function (info) {
          var isDir = !!info.dirname;

          if (isDir) {
            fn(info.children);
          } else {
            var findInTitle = info.basename.toLowerCase().indexOf(str) !== -1;
            var findInContent = info.content.toLowerCase().indexOf(str) !== -1;

            if (findInTitle || findInContent) {
              res.push(info);
            }
          }
        });
      };

      fn(tree);
      return res;
    };

    var addHighlight = function addHighlight(str, keyword) {
      var regExp = new RegExp(keyword, 'gi');
      var text = regExp.exec(str);
      return str.replace(regExp, '<mark class="keyword">' + ((text === null || text === void 0 ? void 0 : text[0]) || keyword) + '</mark>');
    };

    var handleInputChange = function handleInputChange(value) {
      value = value.trim().toLowerCase();
      var res = getSearchResult(value);
      var showSearchResult = value.length !== 0;
      var showEmpty = res.length === 0;
      var $wrapEle = $('#search_result');
      var html = '';

      if (value.length !== 0) {
        $clear.show();
      } else {
        $clear.hide();
      }

      if (showEmpty) {
        html = '<div class="empty">No Results!</div>';
      } else {
        html = res.map(function (info) {
          var index = info.content.toLowerCase().indexOf(value);
          var summary = "...".concat(info.content.substring(index, index + 30), "...");
          var href = "".concat(window.root, "/").concat(info.relative_path ? info.relative_path + '/' : '').concat(info.basename, ".html?search=").concat(value);
          return "\n              <a class=\"item\" href=\"".concat(href, "\">\n                <div class=\"title\">").concat(addHighlight(info.basename, value), "</div>\n                <div class=\"content\">").concat(addHighlight(summary, value), "</div>\n              </a>\n            ");
        }).join('');
      }

      if (showSearchResult) {
        $wrapEle.html(html);
        $wrapEle.show();
      } else {
        $wrapEle.hide();
      }
    };

    $input.bind('input propertychange', function (e) {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(function () {
        handleInputChange(e.target.value);
      }, 500);
    });
    $clear.on('click', function () {
      $input.val('');
      handleInputChange('');
    });
  })(); // keyword highlight


  (function () {
    var search = utils.getQueryString('search');

    if (search) {
      $('.content.markdown-body').mark(search, {
        className: 'keyword'
      });
    }
  })(); // viewer


  (function () {
    $('.markdown-body img').viewer({
      title: false,
      toolbar: false,
      navbar: false
    });
  })(); // btt


  (function () {
    if (isMobile) {
      return;
    }

    var $btt = $('#btt');
    var $content = $('body > .content');
    $content.scroll(function () {
      if ($content.scrollTop() > 50) {
        $btt.fadeIn(200);
      } else {
        $btt.fadeOut(200);
      }
    });
    $btt.on('click', function () {
      $content.animate({
        scrollTop: 0
      }, 200);
    });
  })();
});
