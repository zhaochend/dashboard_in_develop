// get const for event listener
const select = document.querySelectorAll(".select");
const options_list = document.querySelectorAll(".options_list");
const options_1 = document.querySelectorAll(".opt_1");
const options_2 = document.querySelectorAll(".opt_2");

const options_list_data = document.querySelector(".options_list_data");
const options_region_data = document.querySelector(".options_region_data");

var map_titles = document.querySelector(".map_titles");

// initialize current variable data
var currData;

// Show/hide the 2nd menu

for (let i = 0; i < select.length; i++) {
  select[i].addEventListener("click", () => {
    options_list[i].classList.toggle("active");
    select[i].querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
  });
}

options_1.forEach((option) => {
  option.addEventListener("click", () => {
    options_1.forEach((option) => {
      option.classList.remove("selected");
    });
    select[0].querySelector("span").innerHTML = option.innerHTML;
    map_titles.querySelector("h3").innerHTML = option.innerHTML;
    option.classList.add("selected");
    options_list[0].classList.toggle("active");
    select[0].querySelector(".fa-angle-up").classList.toggle("fa-angle-up");

    // change selected data var
    changeVariable();
    mapYearlyChanage();

    // clear all options_2 selected
    options_2.forEach((option) => {
      option.classList.remove("selected");
    });
    select[1].querySelector("span").innerHTML = "Select Region";
  });
});

options_2.forEach((option) => {
  option.addEventListener("click", () => {
    options_2.forEach((option) => {
      option.classList.remove("selected");
    });
    select[1].querySelector("span").innerHTML = option.innerHTML;
    option.classList.add("selected");
    options_list[1].classList.toggle("active");
    select[1].querySelector(".fa-angle-up").classList.toggle("fa-angle-up");
  });
});

function changeVariable() {
  var dataNameSelected = options_list_data.querySelector(".selected").innerHTML;
  if (dataNameSelected == "SPI1") {
    currData = SPI1_Yearly_Country;
  }
  if (dataNameSelected == "SPI3") {
    currData = SPI3_Yearly_Country;
  }
  if (dataNameSelected == "SPI6") {
    currData = SPI6_Yearly_Country;
  }
  if (dataNameSelected == "SPI12") {
    currData = SPI12_Yearly_Country;
  }
  if (dataNameSelected == "SMPct") {
    currData = SMPct_Yearly_Country;
  }
  console.log(dataNameSelected);
  console.log(currData);
  //   return currData;
}

// var dataSelected = options_list_data.querySelector(".selected").innerHTML;
// console.log(dataSelected);
