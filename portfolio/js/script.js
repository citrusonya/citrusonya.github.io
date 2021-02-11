var mySwiper = new Swiper(".swiper-container", {
  direction: "vertical",
  loop: false,
  pagination: ".swiper-pagination",
  grabCursor: true,
  speed: 1000,
  paginationClickable: true,
  parallax: true,
  autoplay: false,
  effect: "slide",
  mousewheelControl: 1
});

$(function() {
  $('nav [href]').each(function() {
    if (this.href == window.location.href) {
      $(this).addClass('active');
    }
  });
});