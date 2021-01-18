 let trigger = document.getElementById("nav__bar");
  trigger.addEventListener("click", showMenu);

  function showMenu() {
    let menu = document.getElementById("nav");
    menu.classList.toggle("open");
    trigger.classList.toggle("change");
  }

  let join = document.getElementById("signUp");
  join.addEventListener("click", showForm);

  function showForm() {
    let inner = document.getElementById('form'); 
    if (inner.style.display == "none") 
      inner.style.display = "block"; 
    else 
      inner.style.display = "none"; 
  }