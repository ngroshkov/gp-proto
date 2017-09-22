"use strict";

const css = require("./style.css");

const boundaryjson = require('json-loader!./data/cityboundary.geojson');

const mapbox = require('mapbox-gl');
const turf = require('@turf/turf');


mapbox.accessToken = 'pk.eyJ1Ijoia2xuNCIsImEiOiJjaW9sNjZlbWMwMDEwdzVtNmxxYjA2ZGozIn0.BytaphQwtjCVMGEaLlfb3Q';
var map = new mapbox.Map({
    container: 'map',
    style: 'mapbox://styles/kln4/cj7kgebwh00ol2rpq2b8h6udp',
    center: [45.502,41.925],
    zoom: 13
});

map.on('load', function () {
    let boundary = boundaryjson.features[0];
    let bounds = turf.bboxPolygon([180, 90, -180, -90]); 
    map.addSource('boundary-source', {
        type: 'geojson',
        data: turf.difference(bounds, boundary)
    });
        
    map.addLayer({
        "id": "boundary-layer",
        "source": "boundary-source",
        "type": "fill",
        "paint": {
            "fill-color": "grey",
            "fill-opacity": 0.5,
            "fill-outline-color": "red"
        }
    });
});