// get const for event listener
const select = document.querySelectorAll(".select");
const options_list = document.querySelectorAll(".options_list");
// const select_02 = document.querySelector(".select_02");
// const options_list_02 = document.querySelector(".options_list_02");
const op_1 = document.querySelector(".option_01");
const op_2 = document.querySelector(".option_02");
const op_3 = document.querySelector(".option_03");

// get var for echarts
var dom = document.getElementById("chart_container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});
var app = {};

var option_01;

var option_02;

var final_option;

// // Show/hide the 2nd menu
// select.addEventListener("click", () => {
//   options_list.classList.toggle("active");
// });

for (let i = 0; i < select.length; i++) {
  select[i].addEventListener("click", () => {
    options_list[i].classList.toggle("active");
  });
}

// Prepare chart options
option_01 = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 188, 218, 135, 147, 260],
      type: "line",
    },
  ],
};

option_02 = {
  title: {
    text: "Temperature Change in the Coming Week",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      dataView: { readOnly: false },
      magicType: { type: ["line", "bar"] },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: "{value} °C",
    },
  },
  series: [
    {
      name: "Highest",
      type: "line",
      data: [10, 11, 13, 11, 12, 12, 9],
      markPoint: {
        data: [
          { type: "max", name: "Max" },
          { type: "min", name: "Min" },
        ],
      },
      markLine: {
        data: [{ type: "average", name: "Avg" }],
      },
    },
    {
      name: "Lowest",
      type: "line",
      data: [1, -2, 2, 5, 3, 2, 0],
      markPoint: {
        data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
      },
      markLine: {
        data: [
          { type: "average", name: "Avg" },
          [
            {
              symbol: "none",
              x: "90%",
              yAxis: "max",
            },
            {
              symbol: "circle",
              label: {
                position: "start",
                formatter: "Max",
              },
              type: "max",
              name: "最高点",
            },
          ],
        ],
      },
    },
  ],
};

// if (option_02 && typeof option_02 === "object") {
//   myChart.setOption(option_02);
// }

// final_option = option_01;

// options.forEach((option)=> {
//     option.addEventListener("click",(=>))
// })

function myFunc_01() {
  myChart.clear();

  if (option_01 && typeof option_01 === "object") {
    myChart.setOption(option_01);
  }
}

function myFunc_02() {
  myChart.clear();
  if (option_02 && typeof option_02 === "object") {
    myChart.setOption(option_02);
  }
}

function myFunc_03() {
  myChart.clear();
  $.get("./maps/america.json", function (usaJson) {
    myChart.hideLoading();
    echarts.registerMap("USA", usaJson, {
      Alaska: {
        left: -131,
        top: 25,
        width: 15,
      },
      Hawaii: {
        left: -110,
        top: 28,
        width: 5,
      },
      "Puerto Rico": {
        left: -76,
        top: 26,
        width: 2,
      },
    });
    option_03 = {
      title: {
        text: "USA Population Estimates (2012)",
        subtext: "Data from www.census.gov",
        sublink: "http://www.census.gov/popest/data/datasets.html",
        left: "right",
      },
      tooltip: {
        trigger: "item",
        showDelay: 0,
        transitionDuration: 0.2,
      },
      visualMap: {
        left: "right",
        min: 500000,
        max: 38000000,
        inRange: {
          color: [
            "#313695",
            "#4575b4",
            "#74add1",
            "#abd9e9",
            "#e0f3f8",
            "#ffffbf",
            "#fee090",
            "#fdae61",
            "#f46d43",
            "#d73027",
            "#a50026",
          ],
        },
        text: ["High", "Low"],
        calculable: true,
      },
      toolbox: {
        show: true,
        //orient: 'vertical',
        left: "left",
        top: "top",
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: "USA PopEstimates",
          type: "map",
          roam: true,
          map: "USA",
          emphasis: {
            label: {
              show: true,
            },
          },
          data: [
            { name: "Alabama", value: 4822023 },
            { name: "Alaska", value: 731449 },
            { name: "Arizona", value: 6553255 },
            { name: "Arkansas", value: 2949131 },
            { name: "California", value: 38041430 },
            { name: "Colorado", value: 5187582 },
            { name: "Connecticut", value: 3590347 },
            { name: "Delaware", value: 917092 },
            { name: "District of Columbia", value: 632323 },
            { name: "Florida", value: 19317568 },
            { name: "Georgia", value: 9919945 },
            { name: "Hawaii", value: 1392313 },
            { name: "Idaho", value: 1595728 },
            { name: "Illinois", value: 12875255 },
            { name: "Indiana", value: 6537334 },
            { name: "Iowa", value: 3074186 },
            { name: "Kansas", value: 2885905 },
            { name: "Kentucky", value: 4380415 },
            { name: "Louisiana", value: 4601893 },
            { name: "Maine", value: 1329192 },
            { name: "Maryland", value: 5884563 },
            { name: "Massachusetts", value: 6646144 },
            { name: "Michigan", value: 9883360 },
            { name: "Minnesota", value: 5379139 },
            { name: "Mississippi", value: 2984926 },
            { name: "Missouri", value: 6021988 },
            { name: "Montana", value: 1005141 },
            { name: "Nebraska", value: 1855525 },
            { name: "Nevada", value: 2758931 },
            { name: "New Hampshire", value: 1320718 },
            { name: "New Jersey", value: 8864590 },
            { name: "New Mexico", value: 2085538 },
            { name: "New York", value: 19570261 },
            { name: "North Carolina", value: 9752073 },
            { name: "North Dakota", value: 699628 },
            { name: "Ohio", value: 11544225 },
            { name: "Oklahoma", value: 3814820 },
            { name: "Oregon", value: 3899353 },
            { name: "Pennsylvania", value: 12763536 },
            { name: "Rhode Island", value: 1050292 },
            { name: "South Carolina", value: 4723723 },
            { name: "South Dakota", value: 833354 },
            { name: "Tennessee", value: 6456243 },
            { name: "Texas", value: 26059203 },
            { name: "Utah", value: 2855287 },
            { name: "Vermont", value: 626011 },
            { name: "Virginia", value: 8185867 },
            { name: "Washington", value: 6897012 },
            { name: "West Virginia", value: 1855413 },
            { name: "Wisconsin", value: 5726398 },
            { name: "Wyoming", value: 576412 },
            { name: "Puerto Rico", value: 3667084 },
          ],
        },
      ],
    };
    myChart.setOption(option_03);
  });
}

op_1.addEventListener("click", myFunc_01);

op_2.addEventListener("click", myFunc_02);

op_3.addEventListener("click", myFunc_03);

// if (final_option && typeof final_option === "object") {
//   myChart.setOption(final_option);
// }

window.addEventListener("resize", myChart.resize);

// start data explorer section plots

// get var for echarts
var chartDom = document.getElementById("chart_container_02");
var myChart_02 = echarts.init(chartDom);
var option;

// prettier-ignore
const data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];
const dateList = data.map(function (item) {
  return item[0];
});
const valueList = data.map(function (item) {
  return item[1];
});
option = {
  // Make gradient line here
  visualMap: [
    {
      // show: true,
      type: "continuous",
      seriesIndex: 0,
      min: 0,
      max: 400,
    },
    {
      show: false,
      type: "continuous",
      seriesIndex: 1,
      dimension: 0,
      min: 0,
      max: dateList.length - 1,
    },
  ],
  title: [
    {
      left: "center",
      text: "Gradient along the y axis",
    },
    {
      top: "55%",
      left: "center",
      text: "Gradient along the x axis",
    },
  ],
  tooltip: {
    trigger: "axis",
  },
  xAxis: [
    {
      data: dateList,
    },
    {
      data: dateList,
      gridIndex: 1,
    },
  ],
  yAxis: [
    {},
    {
      gridIndex: 1,
    },
  ],
  grid: [
    {
      bottom: "60%",
    },
    {
      top: "60%",
    },
  ],
  series: [
    {
      type: "line",
      // showSymbol: false,
      data: valueList,
    },
    {
      type: "line",
      // showSymbol: false,
      data: valueList,
      xAxisIndex: 1,
      yAxisIndex: 1,
    },
  ],
};

// window.addEventListener("resize", myChart_02.resize);

// get var for echarts
var Dom_03 = document.getElementById("first_container_plot_01");
var myChart_03 = echarts.init(Dom_03);
var option;
option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "Direct",
      type: "bar",
      barWidth: "60%",
      data: [10, 52, 200, 334, 390, 330, 220],
    },
  ],
};

// option_s1 && myChart.setOption(option_s1);

myChart_02.setOption(option);

myChart_03.setOption(option);

window.addEventListener("resize", myChart_03.resize);
