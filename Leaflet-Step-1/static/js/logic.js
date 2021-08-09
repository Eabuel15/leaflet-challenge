
// Name map var
var myMap = L.map("map", {
    center: [39.1939, -76.9665],
    zoom: 5
  });

// Add tile layer
// var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoiZWFidWVsIiwiYSI6ImNrczNwYzg4aDBwaW0ybm10M3BvcnJ6aWUifQ.xm9y0kLHkVk9TPGASAAQ7A'
// }).addTo(mymap);

var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);


//  Store url in var
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';


d3.json(url).then(function(data) {
    function styleInfo(features) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(features.properties.mag),
            color: '#000000',
            radius: getRadius(features.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
    function getColor(magnitude) {
        switch (true) {
        case magnitude > 5:
          return "#ea2c2c";
        case magnitude > 4:
          return "#ea822c";
        case magnitude > 3:
          return "#ee9c00";
        case magnitude > 2:
          return "#eecc00";
        case magnitude > 1:
          return "#d4ee00";
        default:
          return "#98ee00";
        }
      }
      function getRadius(magnitude) {
        if (magnitude === 0) {
          return 1;
        }
    
        return magnitude * 4;
      }
    // GeoJSON layer
    L.geoJson(data, {
        // Maken cricles
        pointToLayer: function(features, latlng) {
          return L.circleMarker(latlng);
        },
        // cirecle style
        style: styleInfo,
        // popup for each marker
        onEachFeature: function(features, layer) {
          layer.bindPopup("Magnitude: " + features.properties.mag + "<br>Location: " + features.properties.place);
        }
      }).addTo(myMap);

      // an object legend
    var legend = L.control({
        position: "bottomright"
    });
    // details for the legend
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        
        var grades = [0, 1, 2, 3, 4, 5];
        var colors = [
          "#98ee00",
          "#d4ee00",
          "#eecc00",
          "#ee9c00",
          "#ea822c",
          "#ea2c2c"
        ];

        // Looping through
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                "<i style='background: " + colors[i] + "'></i> " +
            grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
      return div;
    };

    legend.addTo(myMap);
});

//   function createMap(bikeStations) {

//     // Create the tile layer that will be the background of our map.
//     var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });
  
  
//     // Create a baseMaps object to hold the streetmap layer.
//     var baseMaps = {
//       "Street Map": streetmap
//     };
  
//     // Create an overlayMaps object to hold the bikeStations layer.
//     var overlayMaps = {
//       "Bike Stations": bikeStations
//     };
  
//     // Create the map object with options.
//     var map = L.map("map-id", {
//       center: [40.73, -74.0059],
//       zoom: 12,
//       layers: [streetmap, bikeStations]
//     });
  
//     // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(map);
//   }
  
//   function createMarkers(response) {
  
//     // Pull the "stations" property from response.data.
//     var stations = response.data.stations;
  
//     // Initialize an array to hold bike markers.
//     var bikeMarkers = [];
  
//     // Loop through the stations array.
//     for (var index = 0; index < stations.length; index++) {
//       var station = stations[index];
  
//       // For each station, create a marker, and bind a popup with the station's name.
//       var bikeMarker = L.marker([station.lat, station.lon])
//         .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
  
//       // Add the marker to the bikeMarkers array.
//       bikeMarkers.push(bikeMarker);
//     }
  
//     // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
//     createMap(L.layerGroup(bikeMarkers));
//   }
  
  
//   // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
//   d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson").then(createMarkers);
  