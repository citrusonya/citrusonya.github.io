jQuery("body").prepend('<div id="loader"><div class="loader-item"></div><div class="loader-item"></div><div class="loader-item"></div></div>');
$(function() {
  jQuery("#loader").remove();
  $('nav [href]').each(function() {
    if (this.href == window.location.href) {
      $(this).addClass('active');
    }
  });
});