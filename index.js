const nav_menu = document.querySelector("#mobile_menu");
const nav_menu_links = document.querySelector(".navbar__menu");

nav_menu.addEventListener("click", function () {
  nav_menu.classList.toggle("is_active");
  nav_menu_links.classList.toggle("active");
});
