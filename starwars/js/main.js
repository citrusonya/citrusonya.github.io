$(function() {
    
    //
    // Pagination
    //

    $('#news').paginate();

    //
    // Scroll by anchors
    //

    let $scroll = $('html, body');
    $('.link').click(function() {
        $scroll.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
        return false;
    });

    //
    // Open menu
    //

    const   navBtn = document.querySelector('.nav__btn'),
            nav = document.querySelector('#nav'),
            lineOne = document.querySelector('.nav__line_1'),
            lineTwo = document.querySelector('.nav__line_2'),
            lineThree = document.querySelector('.nav__line_3'),
            link = document.querySelector('.nav__links');
    navBtn.addEventListener('click', () => {
        nav.classList.toggle('nav_open');
        lineOne.classList.toggle('move');
        lineTwo.classList.toggle('move');
        lineThree.classList.toggle('move');
        link.classList.toggle('fade-in');
    })

    //
    // Close menu, if click is out of area
    //

    $(document).click( function(event){
        if( $(event.target).closest("#nav").length ) 
            return;
            nav.classList.remove('nav_open');
            lineOne.classList.remove('move');
            lineTwo.classList.remove('move');
            lineThree.classList.remove('move');
            link.classList.remove('fade-in');
            event.stopPropagation();
    });

    //
    // Button "read more"
    //

    $('#read-more').click(function() {
        let btn_more = $("#read-more").text();
        if (btn_more == "Read more") {
            $("#read-more").text("Read less");
            $('.about__container').toggleClass("show");
            $('#about').toggleClass("show");
          } else {
            $("#read-more").text("Read more");
            $('.about__container').toggleClass("show");
            $('#about').toggleClass("show");
          }
    });

    //
    // Counter's animation
    //

    var windowHeight = $(window).height();
    var element_animated = false;

	$(document).on('scroll', function() {
		var self = $('.counter'),
        height = self.offset().top + self.height() - windowHeight;
        show = true;
                
        if (!element_animated && $(document).scrollTop() >= height) {

            $('.counter__count').each(function () {
                
                $(this).prop('counter_', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 1500,
                    easing: 'swing',
                    step: function (now) {
                        
                        $(this).text(Math.ceil(now));
                    }
                });
            });

            $('.counter__progress_1').addClass('move');
            $('.counter__progress_2').addClass('move');
            $('.counter__progress_3').addClass('move');
                    
            element_animated = true;
		}
    });
});