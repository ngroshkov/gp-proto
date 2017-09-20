require.config({
    baseUrl: 'node_modules',
    paths: {
        "jquery": 'jquery/dist/jquery',
        "mapbox": 'mapbox.js/src/mapbox',
        "geocoder_control": 'mapbox.js/src/geocoder_control',
        "geocoder": 'mapbox.js/src/geocoder',
        "isarray": 'isarray/build/build',
        "util": 'mapbox.js/src/util',
        "grid_control": 'mapbox.js/src/grid_control'
    },
    shim:{
        "mapbox": {
            deps: ['geocoder_control']
//            deps: ['util', 'geocoder', 'isarray' , 'grid_control', 'geocoder_control']
        },
        "geocoder_control": {
            deps: ['geocoder', 'grid_control']
        },
        "geocoder": {
            deps: ['util', 'isarray']//, 'grid_control']
        }

    }
});

require(['mapbox', 'jquery'], function (L, $) {
  L.mapbox.accessToken = 'pk.eyJ1Ijoia2xuNCIsImEiOiJjaW9sNjZlbWMwMDEwdzVtNmxxYjA2ZGozIn0.BytaphQwtjCVMGEaLlfb3Q';
  let map = L.mapbox.map('map').setView([41.925,45.502], 14);
  let style = L.mapbox.styleLayer('mapbox://styles/kln4/cj7kgebwh00ol2rpq2b8h6udp').addTo(map);


  $.getJSON('/static/data/cityboundary.geojson', function(data) {
      let boundaryLayer = L.mapbox.featureLayer(data).addTo(map);
      boundaryLayer.setStyle({color: 'red', opacity: 0.5, fillColor: 'grey', fillOpacity: 0.5});
      
  });

});
