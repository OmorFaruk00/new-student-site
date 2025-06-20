// plugins/menu.client.js
export default () => {
    if (process.client) {
      // Wait for DOM
      window.addEventListener("load", () => {
        // Paste your jQuery code here
        (function ($) {
          'use strict';
          $(function () {
            var body = $('body');
            var contentWrapper = $('.content-wrapper');
            var scroller = $('.container-scroller');
            var footer = $('.footer');
            var sidebar = $('.sidebar');
  
            function addActiveClass(element) {
              const current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
              if (current === "") {
                if (element.attr('href').indexOf("index.html") !== -1) {
                  element.parents('.nav-item').last().addClass('active');
                  if (element.parents('.sub-menu').length) {
                    element.closest('.collapse').addClass('show');
                    element.addClass('active');
                  }
                }
              } else {
                if (element.attr('href').indexOf(current) !== -1) {
                  element.parents('.nav-item').last().addClass('active');
                  if (element.parents('.sub-menu').length) {
                    element.closest('.collapse').addClass('show');
                    element.addClass('active');
                  }
                  if (element.parents('.submenu-item').length) {
                    element.addClass('active');
                  }
                }
              }
            }
  
            $('.nav li a', sidebar).each(function () {
              addActiveClass($(this));
            });
  
            $('.horizontal-menu .nav li a').each(function () {
              addActiveClass($(this));
            });
  
            sidebar.on('show.bs.collapse', '.collapse', function () {
              sidebar.find('.collapse.show').collapse('hide');
            });
  
            function applyStyles() {
              if (!body.hasClass("rtl")) {
                if ($('.settings-panel .tab-content .tab-pane.scroll-wrapper').length) {
                  new PerfectScrollbar('.settings-panel .tab-content .tab-pane.scroll-wrapper');
                }
                if ($('.chats').length) {
                  new PerfectScrollbar('.chats');
                }
                if (body.hasClass("sidebar-fixed")) {
                  new PerfectScrollbar('#sidebar .nav');
                }
              }
            }
  
            applyStyles();
  
            $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
          });
        })(jQuery);
      });
    }
  };
  