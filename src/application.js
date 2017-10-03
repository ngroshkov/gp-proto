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
	return <div><h2>Telavi</h2></div>;
}

function Image(props) {
	const style = {
		width: '100%',
		height: '150px'
	}
	return <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Telavi_-_old_city.jpg" style={style}/>;
}

function Text(props) {
		const conainerstyle = {
		position: 'relative',
		height: '280px'
	}
	const textconainerstyle = {
		height: '100%',
		overflow: 'hidden',
		boxSizing: 'border-box',
		position: 'absolute'
	}
	const textstyle = {
		textAlign: 'justify',
		position: 'relative',
		maxHeight: '100%',
		overflow: 'auto'
	}
	return  <div style={conainerstyle}>
				<div style={textconainerstyle}>
					<div style={textstyle}>
						<p>&nbsp;&nbsp;&nbsp;&nbsp;<b>Telavi</b> (Georgian: <span lang="ka">თელავი</span> [tʰɛlɑvi])
						is the main city and administrative center of Georgia's eastern province of Kakheti.
						Its population consists of some 19,629 inhabitants (as of the year 2014). 
						The city is located on foot-hills of Tsiv-Gombori Range at 500–800 meters above the sea level.</p>
						<p>The first archaeological findings from Telavi date back to the Bronze Age. 
						One of the earliest surviving accounts of Telavi is from the 2nd century AD, 
						by Greek geographer Claudius Ptolemaeus, who mentions the name <i>Teleda</i> (a reference to <i>Telavi</i>). 
						Telavi began to transform into a fairly important and large political and administrative center 
						in the 8th century AD. Interesting information on Telavi is provided in the records by an Arab geographer, 
						Al-Muqaddasi of the 10th century, who mentions Telavi along with such important cities of that time's 
						Caucasus as Tbilisi, Shamkhor, Ganja, Shemakha and Shirvan. Speaking about the population of Telavi, 
						Al-Muqaddasi points out that for the most part it consisted of Christians.</p>
				 	</div>
				</div>
			</div>;
}




ReactDOM.render(
  <App />,
  document.getElementById('root')
);



