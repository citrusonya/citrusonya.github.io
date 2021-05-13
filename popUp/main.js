//
// JQuery
//
/*
$(document).ready(function() {
    $('.open_modal_jq').click( function(event){
        event.preventDefault();
        $('.modal__background').fadeIn(297, function(){
            $('.modal') 
            .css('display', 'flex')
            .animate({opacity: 1}, 198);
        });
    });
  
    $('.modal__close, .modal__background').click( function(){
        $('.modal').animate({opacity: 0}, 198, function(){
            $(this).css('display', 'none');
            $('.modal__background').fadeOut(297);
        });
    });
});
*/
//
// JavaScript
//

const   btn_open = document.querySelector('.open_modal_js'),
        btn_close = document.querySelector('.modal__close'),
        modal = document.querySelector('.modal_js'),
        modal_back = document.querySelector('.modal__background');

btn_open.addEventListener('click', function() {
    modal.classList.add('active', 'fadeIn');
    modal_back.classList.add('active', 'fadeIn');
})

btn_close.addEventListener('click', function() {
    modal.classList.add('fadeOut');
    modal_back.classList.add('fadeOut');
    setTimeout(() => {
        modal.classList.remove('active', 'fadeIn', 'fadeOut');
        modal_back.classList.remove('active', 'fadeIn', 'fadeOut')
    }, 300);
})

modal_back.addEventListener('click', function() {
    modal.classList.add('fadeOut');
    modal_back.classList.add('fadeOut');
    setTimeout(() => {
        modal.classList.remove('active', 'fadeIn', 'fadeOut');
        modal_back.classList.remove('active', 'fadeIn', 'fadeOut')
    }, 300);
})