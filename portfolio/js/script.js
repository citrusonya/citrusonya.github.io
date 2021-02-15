//
// Loader
//

jQuery("body").prepend('<div id="loader"><div class="loader-item"></div><div class="loader-item"></div><div class="loader-item"></div></div>');
$(function() {
  jQuery("#loader").remove();
  $('nav [href]').each(function() {
    if (this.href == window.location.href) {
      $(this).addClass('active');
    }
  });
});

//
// Background stars
//

let stars = [];
const svg = document.getElementById("svg");
let w = window.innerWidth;
let h = window.innerHeight;

let colors = [
 "#5A51B4",
 "#392DB4",
 "#473db4",
 "#8df3fb",
 "#ffff33"
];

// Update svg dimension on window resize
window.addEventListener("resize", function (e) {
 w = svg.style.width = window.innerWidth;
 h = svg.style.height = window.innerHeight;
 createStars();
});

class Star {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.opacity = Math.random() + 0.2;
    this.starEl = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    this.starEl.setAttribute("fill", this.color);
    this.starEl.setAttribute("cx", this.x);
    this.starEl.setAttribute("cy", this.y);
  }

  updatePath() {
    this.starEl.setAttribute("fill-opacity", this.opacity);
    this.starEl.setAttribute("r", this.r);
  }
 
  animate() {
    var time = 2;
    var delay = Math.random();
    TweenLite.to(this, time, {
      r: this.r + 1,
      opacity: Math.random(),
      ease: Bounce.easeOut,
      delay: delay,
      onUpdate: () => this.updatePath(),
      onComplete: () =>
      TweenLite.to(this, time, {
        r: this.r - 1,
        opacity: Math.random() + 0.2,
        ease: Bounce.easeOut,
        delay: delay,
        onUpdate: () => this.updatePath(),
        onComplete: () => this.animate()
      })
    });
  }
}

const createStars = () => {
  stars = [];
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
  for (var i = 0; i < 40; i++) {
    var x = Math.random() * w;
    var y = Math.random() * h;
    var r = Math.ceil(Math.random() * 3) + 1;
    var star = new Star(x, y, r);
    stars.push(star);
    star.updatePath();
    svg.appendChild(star.starEl);
    star.animate();
  }
};

createStars();