$(document).ready(function () {
  $('body').scrollspy({ target: '.navbar-fixed-top', offset: 51 });

  $('#topNav').affix({ offset: { top: 100 } });

  $('.page-scroll a').bind('click', function (e) {
      var $that = $(this);
      $('html, body').stop().animate({
          scrollTop: ($($that.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
      e.preventDefault();
    });
});
