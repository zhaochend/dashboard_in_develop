// const btn_01 = document.querySelectorAll(".chart_btn_01");
// const opt_list_01 = document.querySelectorAll(".chart_opt_list_01");

const btn_01 = document.querySelectorAll(".plot_select_box");
const opt_list_01 = document.querySelectorAll(".plot_options_list");

for (let i = 0; i < btn_01.length; i++) {
  btn_01[i].addEventListener("click", () => {
    opt_list_01[i].classList.toggle("active");
    btn_01[i].querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
  });
}
