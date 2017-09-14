L.mapbox.accessToken = 'pk.eyJ1Ijoia2xuNCIsImEiOiJjaW9sNjZlbWMwMDEwdzVtNmxxYjA2ZGozIn0.BytaphQwtjCVMGEaLlfb3Q';
let map = L.mapbox.map('map').setView([41.925,45.502], 14);
let style = L.mapbox.styleLayer('mapbox://styles/kln4/cj7kgebwh00ol2rpq2b8h6udp').addTo(map);


$.getJSON('/static/data/cityboundary.geojson', function(data) {
    let boundaryLayer = L.mapbox.featureLayer(data).addTo(map);
    boundaryLayer.setStyle({color: 'red', opacity: 0.5, fillColor: 'grey', fillOpacity: 0.5});
    
});
