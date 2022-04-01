"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener('DOMContentLoaded', function () {
  var LAST_VISIT_LOCALSTORAGE_KEY = '20220315210423_LAST_VISIT_LOCALSTORAGE_KEY';

  var insertMenuHtmlByFileInfoArr = function insertMenuHtmlByFileInfoArr() {
    var fileInfoArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var ele = arguments.length > 1 ? arguments[1] : undefined;

    if (!ele) {
      return;
    }

    var _iterator = _createForOfIteratorHelper(fileInfoArr),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var info = _step.value;
        var isDir = !!info.dirname;

        if (info.basename === 'index') {
          continue;
        }

        if (isDir) {
          (function () {
            var parentTextEle = $("<span title=\"".concat(info.dirname, "\">").concat(info.dirname, "</span>"));
            var parentEle = $("<div class=\"parent expand\" id=\"".concat(info.id, "\"></div>"));
            parentTextEle.on('click', function () {
              parentEle.toggleClass('expand');
            });
            parentEle.append(parentTextEle);
            $(ele).append(parentEle);
            insertMenuHtmlByFileInfoArr(info.children, parentEle);
          })();
        } else {
          (function () {
            var href = "".concat(window.root, "/").concat(info.relative_path ? info.relative_path + '/' : '').concat(info.basename, ".html");
            var childrenEle = $("<a id=\"".concat(info.id, "\" href=\"").concat(href, "\" class=\"children\" title=\"").concat(info.basename, "\">").concat(info.basename, "</a>"));
            var host = window.location.protocol + '//' + window.location.host;
            var url = decodeURIComponent(childrenEle.prop('href'));

            var _path = url.replace(host, '');

            var isActive = function () {
              var path = decodeURIComponent(window.location.pathname);
              return path === _path;
            }();

            var isLastVisit = function () {
              var lastVisit = window.localStorage.getItem(LAST_VISIT_LOCALSTORAGE_KEY);
              return lastVisit === _path;
            }();

            if (isActive) {
              childrenEle.addClass('active');
            }

            if (isLastVisit) {
              childrenEle.addClass('last_visit');
            }

            $(ele).append(childrenEle);
          })();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  var insertAbout = function insertAbout(ele) {
    var about = $("<a href=\"".concat(window.root, "/\" class=\"children about\" title=\"\u5173\u4E8E\">\u5173\u4E8E</a>"));

    var isActive = function () {
      var path = decodeURIComponent(window.location.pathname);
      return ["".concat(window.root, "/"), "".concat(window.root, "/index.html"), '/', '/index.html'].includes(path);
    }();

    if (isActive) {
      about.addClass('active');
    }

    $(ele).append(about);
  };

  (function () {
    var menu = $('#menu');
    fetch("".concat(window.root, "/dir_tree.json")).then(function (res) {
      return res.json();
    }).then(function (data) {
      // gen menu
      insertMenuHtmlByFileInfoArr(data, menu);
      insertAbout(menu); // set last visit

      var path = decodeURIComponent(window.location.pathname);

      if (["".concat(window.root, "/"), "".concat(window.root, "/index.html"), '/', '/index.html'].includes(path)) {
        return;
      }

      window.localStorage.setItem(LAST_VISIT_LOCALSTORAGE_KEY, path);
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
  })(); // TOC


  (function () {
    var toc = $('.table-of-contents:last');
    var li = $('.table-of-contents:last > ul > li');
    var content = $('.content.markdown-body');

    if (li.length > 0) {
      content.after(toc);
    }
  })();
});
