jQuery("body").prepend('<div id="loader"><div class="loader-item"></div><div class="loader-item"></div><div class="loader-item"></div></div>');
$(window).load(function() {
  jQuery("#loader").remove();
});

$(function() {
  $('nav [href]').each(function() {
    if (this.href == window.location.href) {
      $(this).addClass('active');
    }
  });
});