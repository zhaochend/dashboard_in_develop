// var map = L.map("map").setView([20, 90], 5);

var map; // 将 map 声明为全局变量以便在多个函数中使用
var geojson; // 让 geojson 也成为全局变量

var geojson_cambodia;
var geojson_india;
var geojson_myanmar;
var geojson_thailand;
var geojson_vietnam;

var legend; // 让 legend 成为全局变量
var info; // 让 info 成为全局变量

var map = L.map("chart_container").setView([20, 90], 5);

var tileLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 12,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// var geojson;
// // ... our listeners
// geojson = L.geoJson(myanmar);

// var geojson = L.geoJson(myanmar, {
//   // style: style,
//   // onEachFeature: onEachFeature,
// }).addTo(map);

// var geojson = L.geoJson(myanmar, {
//   // style: style,
//   // onEachFeature: onEachFeature,
// }).addTo(map);

function mapFunc_m03() {
  if (map) {
    // if (geojson) {
    //   map.removeLayer(geojson); // 移除 geojson 图层
    // }
    // if (geojson_cambodia) {
    //   map.removeLayer(geojson_cambodia); // 移除 geojson 图层
    // }
    // if (geojson_india) {
    //   map.removeLayer(geojson_india); // 移除 geojson 图层
    // }
    // if (geojson_myanmar) {
    //   map.removeLayer(geojson_myanmar); // 移除 geojson 图层
    // }
    // if (geojson_thailand) {
    //   map.removeLayer(geojson_thailand); // 移除 geojson 图层
    // }
    // if (geojson_vietnam) {
    //   map.removeLayer(geojson_vietnam); // 移除 geojson 图层
    // }
    if (legend) {
      map.removeControl(legend); // 移除图例控件
    }
    if (info) {
      map.removeControl(info); // 移除信息控件
    }
    map.remove(); // 销毁地图实例
  }
  map = L.map("chart_container").setView([20, 90], 5);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // 假设你有一个 myanmar GeoJSON 对象
  function getColor(d) {
    return d > 300
      ? "#800026"
      : d > 250
      ? "#BD0026"
      : d > 200
      ? "#E31A1C"
      : d > 150
      ? "#FC4E2A"
      : d > 50
      ? "#FD8D3C"
      : d > 30
      ? "#FEB24C"
      : d > 10
      ? "#FED976"
      : "#FFEDA0";
  }

  function style(feature) {
    return {
      fillColor: getColor(feature.properties.y1951),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  }

  function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });
    info.update(layer.feature.properties);
    layer.bringToFront();
  }

  function resetHighlight(e) {
    if (geojson) {
      geojson.resetStyle(e.target);
    }
    if (geojson_myanmar) {
      geojson_myanmar.resetStyle(e.target);
    }
    if (geojson_cambodia) {
      geojson_cambodia.resetStyle(e.target);
    }
    if (geojson_india) {
      geojson_india.resetStyle(e.target);
    }
    if (geojson_thailand) {
      geojson_thailand.resetStyle(e.target);
    }
    if (geojson_vietnam) {
      geojson_vietnam.resetStyle(e.target);
    }
    info.update();
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  }

  geojson = L.geoJson(precip_myanmar, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);

  // 添加自定义信息控件
  info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create("div", "info"); // 创建一个带有类 "info" 的 div
    this.update();
    return this._div;
  };

  info.update = function (props) {
    this._div.innerHTML =
      "<h4>Myanmar Precipitation<h4>" +
      (props
        ? "<b>" +
          props.name +
          "</b><br />" +
          "Precipitation " +
          props.precip +
          " mm"
        : "Hover over a state");
  };

  info.addTo(map);

  // 添加自定义图例控件
  legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [0, 50, 75, 100, 150, 200, 250, 300],
      labels = [];

    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' +
        getColor(grades[i] + 1) +
        '"></i> ' +
        grades[i] +
        (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }

    return div;
  };

  legend.addTo(map);

  // 添加 GeoJSON 图层
  // geojson_myanmar = L.geoJson(precip_myanmar, {
  //   style: style,
  //   onEachFeature: onEachFeature,
  // }).addTo(map);
}

// function mapFunc_m02() {
//   if (map) {
//     // if (geojson) {
//     //   map.removeLayer(geojson); // 移除 geojson 图层
//     // }
//     // if (geojson_cambodia) {
//     //   map.removeLayer(geojson_cambodia); // 移除 geojson 图层
//     // }
//     // if (geojson_india) {
//     //   map.removeLayer(geojson_india); // 移除 geojson 图层
//     // }
//     // if (geojson_myanmar) {
//     //   map.removeLayer(geojson_myanmar); // 移除 geojson 图层
//     // }
//     // if (geojson_thailand) {
//     //   map.removeLayer(geojson_thailand); // 移除 geojson 图层
//     // }
//     // if (geojson_vietnam) {
//     //   map.removeLayer(geojson_vietnam); // 移除 geojson 图层
//     // }
//     if (legend) {
//       map.removeControl(legend); // 移除图例控件
//     }
//     if (info) {
//       map.removeControl(info); // 移除信息控件
//     }
//     map.remove(); // 销毁地图实例
//   }
//   // 重新初始化地图
//   map = L.map("chart_container").setView([20, 90], 5);

//   L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     maxZoom: 12,
//     attribution:
//       '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   }).addTo(map);

//   // 假设你有一个 myanmar GeoJSON 对象
//   function getColor(d) {
//     return d > 300
//       ? "#666"
//       : d > 250
//       ? "#555"
//       : d > 200
//       ? "#444"
//       : d > 150
//       ? "#333"
//       : d > 100
//       ? "#FD8D3C"
//       : d > 70
//       ? "#FEB24C"
//       : d > 50
//       ? "#FED976"
//       : "#FFEDA0";
//   }

//   function style(feature) {
//     return {
//       fillColor: getColor(feature.properties.y1950),
//       weight: 2,
//       opacity: 1,
//       color: "white",
//       dashArray: "3",
//       fillOpacity: 0.7,
//     };
//   }

//   function highlightFeature(e) {
//     var layer = e.target;
//     layer.setStyle({
//       weight: 5,
//       color: "#666",
//       dashArray: "",
//       fillOpacity: 0.7,
//     });
//     info.update(layer.feature.properties);
//     layer.bringToFront();
//   }

//   function resetHighlight(e) {
//     if (geojson_myanmar) {
//       geojson_myanmar.resetStyle(e.target);
//     }
//     if (geojson_cambodia) {
//       geojson_cambodia.resetStyle(e.target);
//     }
//     if (geojson_india) {
//       geojson_india.resetStyle(e.target);
//     }
//     if (geojson_thailand) {
//       geojson_thailand.resetStyle(e.target);
//     }
//     if (geojson_vietnam) {
//       geojson_vietnam.resetStyle(e.target);
//     }
//     info.update();
//   }

//   function onEachFeature(feature, layer) {
//     layer.on({
//       mouseover: highlightFeature,
//       mouseout: resetHighlight,
//     });
//   }

//   // add geojson layers
//   // 添加 GeoJSON 图层
//   // geojson_myanmar = L.geoJson(precip_myanmar, {
//   //   style: style,
//   //   onEachFeature: onEachFeature,
//   // }).addTo(map);

//   var geojson_cambodia = L.geoJson(precip_cambodia, {
//     style: style,
//     onEachFeature: onEachFeature,
//   }).addTo(map);

//   // 添加自定义信息控件
//   info = L.control();

//   info.onAdd = function (map) {
//     this._div = L.DomUtil.create("div", "info"); // 创建一个带有类 "info" 的 div
//     this.update();
//     return this._div;
//   };

//   info.update = function (props) {
//     this._div.innerHTML =
//       "<h4>Myanmar Precipitation<h4>" +
//       (props
//         ? "<b>" +
//           props.name +
//           "</b><br />" +
//           "Precipitation " +
//           props.precip +
//           " mm"
//         : "Hover over a state");
//   };

//   info.addTo(map);

//   // 添加自定义图例控件
//   legend = L.control({ position: "bottomright" });

//   legend.onAdd = function (map) {
//     var div = L.DomUtil.create("div", "info legend"),
//       grades = [0, 50, 75, 100, 150, 200, 250, 300],
//       labels = [];

//     for (var i = 0; i < grades.length; i++) {
//       div.innerHTML +=
//         '<i style="background:' +
//         getColor(grades[i] + 1) +
//         '"></i> ' +
//         grades[i] +
//         (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
//     }

//     return div;
//   };

//   legend.addTo(map);
// }

function mapFunc_m02() {
  if (map) {
    // if (geojson) {
    //   map.removeLayer(geojson); // 移除 geojson 图层
    // }
    // if (geojson_cambodia) {
    //   map.removeLayer(geojson_cambodia); // 移除 geojson 图层
    // }
    // if (geojson_india) {
    //   map.removeLayer(geojson_india); // 移除 geojson 图层
    // }
    // if (geojson_myanmar) {
    //   map.removeLayer(geojson_myanmar); // 移除 geojson 图层
    // }
    // if (geojson_thailand) {
    //   map.removeLayer(geojson_thailand); // 移除 geojson 图层
    // }
    // if (geojson_vietnam) {
    //   map.removeLayer(geojson_vietnam); // 移除 geojson 图层
    // }
    if (legend) {
      map.removeControl(legend); // 移除图例控件
    }
    if (info) {
      map.removeControl(info); // 移除信息控件
    }
    map.remove(); // 销毁地图实例
  }
  map = L.map("chart_container").setView([20, 90], 5);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // 假设你有一个 myanmar GeoJSON 对象
  function getColor(d) {
    return d > 300
      ? "#800026"
      : d > 250
      ? "#BD0026"
      : d > 200
      ? "#E31A1C"
      : d > 150
      ? "#FC4E2A"
      : d > 50
      ? "#FD8D3C"
      : d > 30
      ? "#FEB24C"
      : d > 10
      ? "#FED976"
      : "#FFEDA0";
  }

  function style(feature) {
    return {
      fillColor: getColor(feature.properties.y1950),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  }

  function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });
    info.update(layer.feature.properties);
    layer.bringToFront();
  }

  function resetHighlight(e) {
    if (geojson) {
      geojson.resetStyle(e.target);
    }
    if (geojson_myanmar) {
      geojson_myanmar.resetStyle(e.target);
    }
    if (geojson_cambodia) {
      geojson_cambodia.resetStyle(e.target);
    }
    if (geojson_india) {
      geojson_india.resetStyle(e.target);
    }
    if (geojson_thailand) {
      geojson_thailand.resetStyle(e.target);
    }
    if (geojson_vietnam) {
      geojson_vietnam.resetStyle(e.target);
    }
    info.update();
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  }

  geojson = L.geoJson(precip_myanmar, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);

  // 添加自定义信息控件
  info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create("div", "info"); // 创建一个带有类 "info" 的 div
    this.update();
    return this._div;
  };

  info.update = function (props) {
    this._div.innerHTML =
      "<h4>Myanmar Precipitation<h4>" +
      (props
        ? "<b>" +
          props.name +
          "</b><br />" +
          "Precipitation " +
          props.precip +
          " mm"
        : "Hover over a state");
  };

  info.addTo(map);

  // 添加自定义图例控件
  legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [0, 50, 75, 100, 150, 200, 250, 300],
      labels = [];

    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' +
        getColor(grades[i] + 1) +
        '"></i> ' +
        grades[i] +
        (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }

    return div;
  };

  legend.addTo(map);

  // 添加 GeoJSON 图层
  // geojson_myanmar = L.geoJson(precip_myanmar, {
  //   style: style,
  //   onEachFeature: onEachFeature,
  // }).addTo(map);
}

function mapFunc_m01() {
  if (map) {
    if (geojson_myanmar) {
      map.removeLayer(geojson_myanmar); // 移除 geojson 图层
    }
    // if (legend) {
    //   map.removeControl(legend); // 移除图例控件
    // }
    // if (info) {
    //   map.removeControl(info); // 移除信息控件
    // }
  }
}

// function mapFunc_m02() {
//   // // var map = L.map("map").setView([20, 90], 5);
//   // var map = L.map("chart_container").setView([20, 90], 5);

//   // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   //   maxZoom: 12,
//   //   attribution:
//   //     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   // }).addTo(map);

//   // import myanmar from "./maps/myanmar.json" assert { type: "JSON" };

//   // $.get("./maps/myanmar.json", function (myanmar) {
//   //   //data 代表读取到的json中的数据
//   // });

//   // $.get(ROOT_PATH + "/data/asset/geo/USA.json", function (geoJson) {
//   //   const myanmar = geojson;
//   // });

//   // var myanmar = (function () {
//   //   $.getJson("./maps/myanmar.json", function (data) {
//   //     console.log(data);
//   //   });
//   // })();

//   // import { myanmar } from "./myanmar.js";

//   // L.geoJson(myanmar).addTo(map);

//   function getColor(d) {
//     return d > 300
//       ? "#800026"
//       : d > 250
//       ? "#BD0026"
//       : d > 200
//       ? "#E31A1C"
//       : d > 150
//       ? "#FC4E2A"
//       : d > 100
//       ? "#FD8D3C"
//       : d > 70
//       ? "#FEB24C"
//       : d > 50
//       ? "#FED976"
//       : "#FFEDA0";
//   }

//   //add style func for geojson layer, make fillColor based on feature.properties.density

//   function style(feature) {
//     return {
//       fillColor: getColor(feature.properties.precip),
//       weight: 2,
//       opacity: 1,
//       color: "white",
//       dashArray: "3",
//       fillOpacity: 0.7,
//     };
//   }

//   // mouse hover to show the status

//   function highlightFeature(e) {
//     var layer = e.target;
//     layer.setStyle({
//       weight: 5,
//       color: "#666",
//       dashArray: "",
//       fillOpacity: 0.7,
//     });
//     info.update(layer.feature.properties);
//     layer.bringToFront();
//   }

//   function resetHighlight(e) {
//     geojson.resetStyle(e.target);
//     info.update();
//   }

//   var geojson;
//   // ... our listeners
//   geojson = L.geoJson(myanmar);

//   function onEachFeature(feature, layer) {
//     layer.on({
//       mouseover: highlightFeature,
//       mouseout: resetHighlight,
//       // click: zoomToFeature,
//     });
//   }

//   // add custom info control
//   var info = L.control();

//   info.onAdd = function (map) {
//     this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
//     this.update();
//     return this._div;
//   };

//   // method that we will use to update the control based on feature properties passed
//   info.update = function (props) {
//     this._div.innerHTML =
//       "<h4>Myanmar Precipitation<h4>" +
//       (props
//         ? "<b>" +
//           props.name +
//           "</b><br />" +
//           "Precipitation " +
//           props.precip +
//           " mm"
//         : "Hover over a state");
//   };
//   info.addTo(map);

//   // custom map legend
//   var legend = L.control({ position: "bottomright" });

//   legend.onAdd = function (map) {
//     var div = L.DomUtil.create("div", "info legend"),
//       grades = [0, 50, 75, 100, 150, 200, 250, 300],
//       labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//       div.innerHTML +=
//         '<i style="background:' +
//         getColor(grades[i] + 1) +
//         '"></i> ' +
//         grades[i] +
//         (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
//     }

//     return div;
//   };

//   var geojson = L.geoJson(myanmar, {
//     style: style,
//     onEachFeature: onEachFeature,
//   }).addTo(map);

//   legend.addTo(map);

//   return map;
// }

// function mapFunc_m03() {
//   map.remove();
//   // var map = L.map("map").setView([20, 90], 5);
//   var map = L.map("chart_container").setView([20, 90], 5);

//   L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     maxZoom: 12,
//     attribution:
//       '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   }).addTo(map);

//   // import myanmar from "./maps/myanmar.json" assert { type: "JSON" };

//   // $.get("./maps/myanmar.json", function (myanmar) {
//   //   //data 代表读取到的json中的数据
//   // });

//   // $.get(ROOT_PATH + "/data/asset/geo/USA.json", function (geoJson) {
//   //   const myanmar = geojson;
//   // });

//   // var myanmar = (function () {
//   //   $.getJson("./maps/myanmar.json", function (data) {
//   //     console.log(data);
//   //   });
//   // })();

//   // import { myanmar } from "./myanmar.js";

//   // L.geoJson(myanmar).addTo(map);

//   function getColor(d) {
//     return d > 300
//       ? "#800026"
//       : d > 250
//       ? "#BD0026"
//       : d > 200
//       ? "#E31A1C"
//       : d > 150
//       ? "#FC4E2A"
//       : d > 100
//       ? "#FD8D3C"
//       : d > 70
//       ? "#FEB24C"
//       : d > 50
//       ? "#FED976"
//       : "#FFEDA0";
//   }

//   //add style func for geojson layer, make fillColor based on feature.properties.density

//   function style(feature) {
//     return {
//       fillColor: getColor(feature.properties.precip),
//       weight: 2,
//       opacity: 1,
//       color: "white",
//       dashArray: "3",
//       fillOpacity: 0.7,
//     };
//   }

//   // mouse hover to show the status

//   function highlightFeature(e) {
//     var layer = e.target;
//     layer.setStyle({
//       weight: 5,
//       color: "#666",
//       dashArray: "",
//       fillOpacity: 0.7,
//     });
//     info.update(layer.feature.properties);
//     layer.bringToFront();
//   }

//   function resetHighlight(e) {
//     geojson.resetStyle(e.target);
//     info.update();
//   }

//   var geojson;
//   // ... our listeners
//   geojson = L.geoJson(myanmar);

//   function onEachFeature(feature, layer) {
//     layer.on({
//       mouseover: highlightFeature,
//       mouseout: resetHighlight,
//       // click: zoomToFeature,
//     });
//   }

//   // add custom info control
//   var info = L.control();

//   info.onAdd = function (map) {
//     this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
//     this.update();
//     return this._div;
//   };

//   // method that we will use to update the control based on feature properties passed
//   info.update = function (props) {
//     this._div.innerHTML =
//       "<h4>Myanmar Precipitation<h4>" +
//       (props
//         ? "<b>" +
//           props.name +
//           "</b><br />" +
//           "Precipitation " +
//           props.precip +
//           " mm"
//         : "Hover over a state");
//   };
//   info.addTo(map);

//   // custom map legend
//   var legend = L.control({ position: "bottomright" });

//   legend.onAdd = function (map) {
//     var div = L.DomUtil.create("div", "info legend"),
//       grades = [0, 50, 75, 100, 150, 200, 250, 300],
//       labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//       div.innerHTML +=
//         '<i style="background:' +
//         getColor(grades[i] + 1) +
//         '"></i> ' +
//         grades[i] +
//         (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
//     }

//     return div;
//   };

//   geojson = L.geoJson(myanmar, {
//     style: style,
//     onEachFeature: onEachFeature,
//   }).addTo(map);

//   legend.addTo(map);
// }
