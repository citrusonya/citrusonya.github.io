document.getElementById('output').hidden = true;

document.querySelector("html").classList.add('js');

let fileInput  = document.querySelector(".input-file"),  
    button     = document.querySelector(".input-file-trigger"),
    the_return = document.querySelector(".file-return");
          
button.addEventListener("keydown", function(event) {  
  if ( event.keyCode == 13 || event.keyCode == 32 ) {  
    fileInput.focus();  
  }  
});

button.addEventListener("click", function(event)  {
  fileInput.focus();
  return false;
});

fileInput.addEventListener("change", function(event) {  
  the_return.innerHTML = this.value; 
  document.getElementById('output').hidden = false; 
  const output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
});

const content = document.getElementById("content");
document.getElementById("act").addEventListener("click", function(e) {
  const tgt = e.target;
  const id = tgt.dataset.id;
  [...content.querySelectorAll("div")].forEach(div => {
    if (div.id !== id) div.classList.add("hide");
    the_return.innerHTML = "";
  })  
  document.getElementById(id).classList.remove("hide"); 
  the_return.innerHTML = "";
})

content.addEventListener("click", function(e) {
  const tgt = e.target;
  if (tgt.classList.contains("close")) {
    tgt.closest("div").classList.add("hide")
  }
})