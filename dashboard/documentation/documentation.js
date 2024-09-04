// // get const for event listener
// const sidebar = document.querySelector("#sidebar");
// const btn = document.querySelector("#menu_button");

// sidebar_button.addEventListener("click", function () {
//   // if (sidebar_outer.classList.contains("active")) {
//   //   sidebar_outer.classList.remove("active");
//   // } else {
//   //   sidebar_outer.classList.add("active");
//   // }
//   sidebar_outer.classList.toggle("active");
// });

// var btn = document.getElementById("menu_button");

// function open_sidebar() {
//   sidebar.style.width = "250px";
//   sidebarstyle.marginLeft = "250px";
// }

// function close_sidebar() {
//   sidebar.style.width = "0";
//   sidebar.style.marginLeft = "0";
// }

// document.getElementById("sidebar_button").addEventListener("click", () => {
//   if ((document.getElementById("sidebar_outer").style.width = "0")) {
//     document.getElementById("sidebar_outer").style.width = "300px";
//   } else {
//     document.getElementById("sidebar_outer").style.width = "0";
//   }
// });

// btn.addEventListener("click", close_sidebar());

// btn.onclick(open_sidebar());

const menu_button = document.querySelector(".sidebar_button");
const close_button = document.querySelector(".sidebar_close_button");
const sidebar = document.querySelector("#sidebar");

menu_button.addEventListener("click", function () {
  menu_button.classList.toggle("is_active");
  sidebar.classList.toggle("is_active");
});

close_button.addEventListener("click", function () {
  menu_button.classList.toggle("is_active");
  sidebar.classList.toggle("is_active");
});
