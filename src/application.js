"use strict";

import css from './style.css';
import boundaryjson from 'json-loader!./data/cityboundary.geojson';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import turfBboxPolygon from '@turf/bbox-polygon';
import turfDifference from '@turf/difference';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoia2xuNCIsImEiOiJjaW9sNjZlbWMwMDEwdzVtNmxxYjA2ZGozIn0.BytaphQwtjCVMGEaLlfb3Q"
});

let boundary = boundaryjson.features[0];
let bounds = turfBboxPolygon([180, 90, -180, -90]);

ReactDOM.render(
	<Map
	  style="mapbox://styles/kln4/cj7kgebwh00ol2rpq2b8h6udp"
	  center={[45.502,41.925]}
	  zoom={[13]}
	  containerStyle={{
	    height: "100vh",
	    width: "100vw"
	  }}>
	  <GeoJSONLayer
	  	data={turfDifference(bounds, boundary)}
	  	fillPaint={{
	  	    "fill-color": "grey",
            "fill-opacity": 0.5,
            "fill-outline-color": "red"
	  	}}/>
	</Map>,
  	document.getElementById('map')
);

ReactDOM.render(
	<div>
  		<div id="title"><h2><i>Prototype</i></h2></div>
        <div id="image"></div>
        <div id="text">&nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    </div>,
  	document.getElementById('toolbar')
);
