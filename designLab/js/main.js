$(function() {
    let $scroll = $('html, body');
    $('a[href*="#"]').click(function() {
        $scroll.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
        return false;
    });

    let openMenu = document.querySelector('.menu__bars'),
        menu = document.querySelector('.menu'),
        bars = document.querySelector('.menu__bars'),
        link = document.querySelector('.menu__link');
        openMenu.addEventListener('click', () => {
            menu.classList.toggle('menu_open');
            link.classList.toggle('menu__link_open');
            bars.classList.toggle('move');
            link.classList.toggle('fade-in');
        })

    $(document).click( function(event){
        if( $(event.target).closest(".menu").length ) 
            return;
            menu.classList.remove('menu_open');
            link.classList.remove('menu__link_open');
            bars.classList.remove('move');
            link.classList.remove('fade-in');
            event.stopPropagation();
    });
});