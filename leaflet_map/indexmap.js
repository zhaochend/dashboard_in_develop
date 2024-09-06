var map; // Declare map as a global variable for use in multiple functions
var geojson; // Declare geojson as a global variable

var geojson_cambodia;
var geojson_india;
var geojson_myanmar;
var geojson_thailand;
var geojson_vietnam;

var legend; // Declare legend as a global variable
var info; // Declare info as a global variable

// Initialize the map and zoom to Thailand and surrounding countries
map = L.map("map_container",{
  scrollWheelZoom: false
}).setView([15, 100], 6);

var tileLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 10,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Load country boundaries as GeoJSON (assumed you have a countries.geojson file)
var countryLayer = L.geoJson(null, {
  style: {
      color: "#3388ff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.1
  }
}).addTo(map);

// Custom Info Control
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function (content) {
  this._div.innerHTML = '<h4>Crop Area Data</h4>' + (content ? content : '');
};

info.addTo(map);

// Fetch and add the GeoJSON data
fetch('./dashboard/maps/SEApIndia.geojson')
.then(response => response.json())
    .then(data => {
        // Add GeoJSON layer to the map and store it in the geojson variable
        geojson = L.geoJSON(data, {
            style: function(feature) {
                return {
                    fillColor: 'transparent',  // Transparent fill
                    color: '#3388ff',          // Outline color
                    weight: 2,                 // Outline width
                    opacity: 1,                // Outline opacity
                };
            },
            onEachFeature: function(feature, layer) {
              // Add event listeners to each feature (country)
              layer.on('mouseover', function(e) {
                  // Update the info control with feature properties
                  info.update('<b>' + feature.properties.name + '</b><br>' + feature.properties.region);
              });

              layer.on('mouseout', function(e) {
                // Reset info control content on mouse out
                info.update();
            });
          }
      }).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));
  // Enable zooming with Ctrl + mouse wheel
  map.getContainer().addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
        // Prevent the default scroll behavior
        e.preventDefault();

        // Determine zoom direction
        var zoomChange = e.deltaY < 0 ? 1 : -1;
        var newZoom = map.getZoom() + zoomChange;

        // Set new zoom level, within valid range
        map.setZoom(Math.min(Math.max(newZoom, map.getMinZoom()), map.getMaxZoom()));
    }
});

// Load GeoTIFF file using georaster-layer-for-leaflet
fetch("../geotiff/croparea_month6.tif")
.then(response => response.arrayBuffer())
.then(arrayBuffer => {
  parseGeoraster(arrayBuffer).then(georaster => {
    var layer = new GeoRasterLayer({
      georaster: georaster,
      opacity: 0.7,
      pixelValuesToColorFn: values => {
        var pixelValue = values[0];
        if (pixelValue === 0 || isNaN(pixelValue)) {
          return null;
        }
        return getColor(pixelValue);
      },
      resolution: 64
    });
    layer.addTo(map);
    map.fitBounds(layer.getBounds());
  });
});

// Function to generate color based on value
function getColor(value) {
return value > 1000 ? '#800026' :
       value > 500  ? '#BD0026' :
       value > 200  ? '#E31A1C' :
       value > 100  ? '#FC4E2A' :
       value > 50   ? '#FD8D3C' :
       value > 10   ? '#FEB24C' :
                     '#FFD700';
}

// Custom Legend Control
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 10, 50, 100, 200, 500, 1000],
    labels = [];

div.innerHTML = '<strong>Rice Planting Area (ha)</strong><br>'; 

for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}

return div;
};

// Add legend to the map
legend.addTo(map);