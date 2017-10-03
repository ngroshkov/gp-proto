"use strict";

// import css from './style.css';
//import boundaryjson from 'json-loader!./data/cityboundary.geojson';

import React from 'react';
import ReactDOM from 'react-dom';
import MapboxClient from 'mapbox';
import ReactMapboxGl, { Layer, GeoJSONLayer } from 'react-mapbox-gl';
import turfBboxPolygon from '@turf/bbox-polygon';
import turfDifference from '@turf/difference';


const accessToken = "pk.eyJ1Ijoia2xuNCIsImEiOiJjaW9sNjZlbWMwMDEwdzVtNmxxYjA2ZGozIn0.BytaphQwtjCVMGEaLlfb3Q";
const mapbox = new MapboxClient(accessToken);
const Map = ReactMapboxGl({accessToken: accessToken});

function App() {
	const style = {
		backgroundColor: '#D7DADB',
		height: '100%',
	} 
	return <div style={style}>
				<GpMap/>
				<Toolbar/>
			</div>;
}

function GpMap(props) {
	return	<Map
				style="mapbox://styles/kln4/cj7kgebwh00ol2rpq2b8h6udp"
	  			center={[45.502,41.925]}
	  			zoom={[13]}
	  			containerStyle={{
							height: "100vh",
							width: "100vw"
	  			}}>
	  			<CityBoundaryLayer/>
	  		</Map>
}

class CityBoundaryLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {boundary: {"type":"FeatureCollection", "features":[]}};
  }

  componentDidMount() {
  	mapbox.listFeatures('cj87ejtwt17b232plqeyu1tga', {}, (err, boundaryjson) => {
		let feature = boundaryjson.features[0];
		let bounds = turfBboxPolygon([180, 90, -180, -90]);
		let boundary = turfDifference(bounds, feature);
		this.setBoundary(boundary);
	});
  }

  setBoundary(boundary) {
    this.setState({
      boundary: boundary
    });
  }
  
  render() {
    return <GeoJSONLayer
		data={this.state.boundary}
		fillPaint={{
			"fill-color": "grey",
			"fill-opacity": 0.5,
			"fill-outline-color": "red"
		}}/>;
  }
}

function Toolbar(props) {
	const style = {
		position: 'absolute',
		width: '300px',
		height: '500px',
		right: '20px',
		top: '20px',
		backgroundColor: 'white',
		borderRadius: '10px',
		opacity: '0.9',
		textAlign: 'center',
		padding: '15px'
	};
	return <div style={style}>
				<Title/>
				<Image/>
				<Text/>
			</div>;
}

function Title(props) {
	return <div><h2><i>Prototype</i></h2></div>;
}

function Image(props) {
	const style = {
		width: '100%',
		height: '150px',
		backgroundColor: 'lightgray'
	}
	return <div style={style}/>;
}

function Text(props) {
	const style = {
		padding: '10px',
		textAlign: 'left'
	}
	return <div style={style}>&nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
		sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
		nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
		in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
		occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
}




ReactDOM.render(
  <App />,
  document.getElementById('root')
);



