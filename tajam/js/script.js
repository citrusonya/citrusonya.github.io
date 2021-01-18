//
//  menu burger
//

let trigger = document.getElementById("conteiner__nav__bar");
trigger.addEventListener("click", showMenu);

function showMenu() {
  let menu = document.getElementById("conteiner__nav_link");
  menu.style.width = "65px";
  menu.classList.toggle("open");
  trigger.classList.toggle("change");
}

//
//  slider header
//

let links = document.querySelectorAll(".points__point"),
    wrapper = document.querySelector("#wrapper"),
    activeLink = 0;

  for (let i = 0; i < links.length; i++) {  // setting up event tracking
      let link = links[i];
      link.addEventListener('click', setClickedItem, false);

      link.itemID = i; // define an element for activeLink
  }

links[activeLink].classList.add("points__point_active"); // set the first element as active

  function removeActiveLinks() {
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("points__point_active");
    }
  }

  function changePosition(link) {   // change position of the slider depending on media queries
    if(window.innerWidth >= 1024){
      link.classList.add("points__point_active");

      let position = link.getAttribute("data-md");

      let translateValue = "translate3d(" + position + ", 0px, 0)";
      wrapper.style[transformProperty] = translateValue;
    
    }else if (window.innerWidth >= 640){
      link.classList.add("points__point_active");

      let position = link.getAttribute("data-sm");

      let translateValue = "translate3d(" + position + ", 0px, 0)";
      wrapper.style[transformProperty] = translateValue;

    }else{
      link.classList.add("points__point_active");

      let position = link.getAttribute("data-xs");

      let translateValue = "translate3d(" + position + ", 0px, 0)";
      wrapper.style[transformProperty] = translateValue;
    }
  }

let transforms = ["transform",  // vendor prefix
            "msTransform",
            "webkitTransform",
            "mozTransform",
            "oTransform"],

    transformProperty = getSupportedPropertyName(transforms);

  function getSupportedPropertyName(properties) {
      for (let i = 0; i < properties.length; i++) {
          if (typeof document.body.style[properties[i]] != "undefined") {
              return properties[i];
          }
      }
      return null;
  }

let timeoutID;  // automatic slide change

  function startTimer() {
      timeoutID = window.setInterval(goToNextItem, 3000);
  }
  startTimer();

  function resetTimer() {
      window.clearInterval(timeoutID);
      startTimer();
  }

  function goToNextItem() {
    removeActiveLinks();

    if (activeLink < links.length - 1) {
      activeLink++;
    } else {
      activeLink = 0;
    }

    let newLink = links[activeLink];
     changePosition(newLink);
  }

  function setClickedItem(e) {
    removeActiveLinks();
    resetTimer();

    let clickedLink = e.target;
    activeLink = clickedLink.itemID;

    changePosition(clickedLink);
  }

//
//  load more button (section works)
//

let data = Array.from(document.querySelectorAll('.worksBlock .worksBlock__item')),
    step = 6,
    item = 0;


data.slice(step).forEach(e => e.style.display = 'none');
item += step;
  
document.querySelector('#loadmore').addEventListener('click', function(e){
  let tmp = data.slice(item, item + step);

  tmp.forEach(e => e.style.display = 'block');
  item += step;
  let animation = document.querySelector('.worksBlock');
  
  if(tmp.length < 6){
    this.remove();
  }
});


//
//  slider peopleSay
//

let slides = document.querySelectorAll(".dots__dot"),
    activeSlide = 3;

  slides[activeSlide].classList.add("dots__dot_active");

  document.getElementById("left").addEventListener("click", function(e) {
    showSlides(activeSlide -= 1);
  })
  
  document.getElementById("right").addEventListener("click", function(e) {
    showSlides(activeSlide += 1);
  })

  function currentSlide(n) {
    showSlides(activeSlide = n);
  }

  function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("slider__item");
      let dots = document.getElementsByClassName("dots__dot");
      if (n > slides.length) {
        activeSlide = 1
      }
      if (n < 1) {
        activeSlide = slides.length
      }
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].classList.remove("dots__dot_active");
      }
      slides[activeSlide - 1].style.display = "block";
      dots[activeSlide - 1].classList.add("dots__dot_active");
  }

showSlides(activeSlide);