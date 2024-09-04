var dom = document.getElementById("chart_container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});
var app = {};
var ROOT_PATH = "https://echarts.apache.org/examples";
var option;

$.get("./maps/Inte.json", function (geoJson) {
  // myChart.hideLoading();
  echarts.registerMap("America", geoJson);
  myChart.setOption(
    (option = {
      title: {
        text: "Population Density of Hong Kong （2011）",
        subtext: "Data from Wikipedia",
        sublink:
          "http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12",
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}<br/>{c} (p / km2)",
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      visualMap: {
        min: 500000,
        max: 26000000,
        text: ["High", "Low"],
        realtime: false,
        calculable: true,
        inRange: {
          color: ["lightskyblue", "yellow", "orangered"],
        },
      },
      series: [
        {
          name: "香港18区人口密度",
          type: "map",
          map: "America",
          // top: "15%",
          // bottom: "15%",
          roam: true,
          label: {
            show: false,
          },

          // projection: {
          //   project: function (point) {
          //     return projection(point);
          //   },
          //   unproject: function (point) {
          //     return projection.invert(point);
          //   },
          // },
          data: [
            { name: "Ayeyarwady", value: 3899353 },
            { name: "Bago", value: 12763536 },
            { name: "Chin", value: 1050292 },
            { name: "Kachin", value: 4723723 },
            { name: "Kayah", value: 833354 },
            { name: "Kayin", value: 6456243 },
            { name: "Magway", value: 26059203 },
            { name: "Mandalay", value: 2855287 },
            { name: "Mon", value: 626011 },
            { name: "Rakhine", value: 8185867 },
            { name: "Sagaing", value: 6897012 },
            { name: "Shan", value: 1855413 },
            { name: "Tanintharyi", value: 5726398 },
            { name: "Yangon", value: 576412 },
            // { name: "Alabama", value: 4822023 },
            // { name: "Alaska", value: 731449 },
            // { name: "Arizona", value: 6553255 },
            // { name: "Arkansas", value: 2949131 },
            // { name: "California", value: 38041430 },
            // { name: "Colorado", value: 5187582 },
            // { name: "Connecticut", value: 3590347 },
            // { name: "Delaware", value: 917092 },
            // { name: "District of Columbia", value: 632323 },
            // { name: "Florida", value: 19317568 },
            // { name: "Georgia", value: 9919945 },
            // { name: "Hawaii", value: 1392313 },
            // { name: "Idaho", value: 1595728 },
            // { name: "Illinois", value: 12875255 },
            // { name: "Indiana", value: 6537334 },
            // { name: "Iowa", value: 3074186 },
            // { name: "Kansas", value: 2885905 },
            // { name: "Kentucky", value: 4380415 },
            // { name: "Louisiana", value: 4601893 },
            // { name: "Maine", value: 1329192 },
            // { name: "Maryland", value: 5884563 },
            // { name: "Massachusetts", value: 6646144 },
            // { name: "Michigan", value: 9883360 },
            // { name: "Minnesota", value: 5379139 },
            // { name: "Mississippi", value: 2984926 },
            // { name: "Missouri", value: 6021988 },
            // { name: "Montana", value: 1005141 },
            // { name: "Nebraska", value: 1855525 },
            // { name: "Nevada", value: 2758931 },
            // { name: "New Hampshire", value: 1320718 },
            // { name: "New Jersey", value: 8864590 },
            // { name: "New Mexico", value: 2085538 },
            // { name: "New York", value: 19570261 },
            // { name: "North Carolina", value: 9752073 },
            // { name: "North Dakota", value: 699628 },
            // { name: "Ohio", value: 11544225 },
            // { name: "Oklahoma", value: 3814820 },
            // { name: "Oregon", value: 3899353 },
            // { name: "Pennsylvania", value: 12763536 },
            // { name: "Rhode Island", value: 1050292 },
            // { name: "South Carolina", value: 4723723 },
            // { name: "South Dakota", value: 833354 },
            // { name: "Tennessee", value: 6456243 },
            // { name: "Texas", value: 26059203 },
            // { name: "Utah", value: 2855287 },
            // { name: "Vermont", value: 626011 },
            // { name: "Virginia", value: 8185867 },
            // { name: "Washington", value: 6897012 },
            // { name: "West Virginia", value: 1855413 },
            // { name: "Wisconsin", value: 5726398 },
            // { name: "Wyoming", value: 576412 },
            // { name: "Puerto Rico", value: 3667084 },
          ],
        },
      ],
    })
  );
});

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);
