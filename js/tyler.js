$(document).ready(function () {
  $('body').scrollspy({ target: '.navbar-fixed-top', offset: 51 });

  // offset top padding when clicking a navbar link
  $('#topNav').affix({ offset: { top: 100 } });

  // smooth scrolling
  $('.page-scroll a').bind('click', function (e) {
      var $that = $(this);
      $('html, body').stop().animate({
          scrollTop: ($($that.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
      e.preventDefault();
    });

  // close modals on 'esc'
  $('body').keyup(function (e) {
    var key = e.keyCode || e.which;
    if (key === 27) $('.modal').modal('hide');
  });
});
