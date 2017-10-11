"use strict";

// import css from './style.css';
//import boundaryjson from 'json-loader!./data/cityboundary.geojson';

import React from 'react';
import ReactDOM from 'react-dom';
import MapboxClient from 'mapbox';
import ReactMapboxGl, { Source, ZoomControl, Layer, GeoJSONLayer } from 'react-mapbox-gl';
import turfBboxPolygon from '@turf/bbox-polygon';
import turfDifference from '@turf/difference';


const accessToken = "pk.eyJ1Ijoia2xuNCIsImEiOiJjaW9sNjZlbWMwMDEwdzVtNmxxYjA2ZGozIn0.BytaphQwtjCVMGEaLlfb3Q";
const mapbox = new MapboxClient(accessToken);
const Map = ReactMapboxGl({accessToken: accessToken});

const descriptions = [	
	{	
		id: 0,
		title:"Telavi", 
		image:"https://upload.wikimedia.org/wikipedia/commons/4/4f/Telavi_-_old_city.jpg",
		text: "<b>Telavi</b> (Georgian: <span lang='ka'>თელავი</span> [tʰɛlɑvi]) is the main city and administrative center of Georgia&#39;s eastern province of Kakheti. Its population consists of some 19,629 inhabitants (as of the year 2014). The city is located on foot-hills of Tsiv-Gombori Range at 500–800 meters above the sea level.<br/>The first archaeological findings from Telavi date back to the Bronze Age. One of the earliest surviving accounts of Telavi is from the 2nd century AD, by Greek geographer Claudius Ptolemaeus, who mentions the name <i>Teleda</i> (a reference to <i>Telavi</i>). Telavi began to transform into a fairly important and large political and administrative center in the 8th century AD. Interesting information on Telavi is provided in the records by an Arab geographer, Al-Muqaddasi of the 10th century, who mentions Telavi along with such important cities of that time's Caucasus as Tbilisi, Shamkhor, Ganja, Shemakha and Shirvan. Speaking about the population of Telavi, Al-Muqaddasi points out that for the most part it consisted of Christians."
	},
	{
		id: 1,
		title:"Dzveli Galavani", 
		image:"https://lh3.googleusercontent.com/xmQz_8qafqNLbLPfRy7vJjxsrV4Ztw0Art1JQPw_Pz-wjg4plTvmwzLp9DA7k4Rd4JG8QCJ28Mbtng7d9Dfs4RJAsYA48HCDQJNiiYijLor-V5ZHbmGzuRVHTC3oYYQjN7gOvJAblLJ35G65fXLzCjSbiZZEFJLHujWfLjTwhgxeYrE1InxQMWnh56YIshXFhv9C8cM9P_otYHO8DY47rkkWw0DJ5xMVQD7Pt85zFnTx_6oQMXB6VB7ZiVmZvcH7Km2xmh48A0OkpzX2BX7_D2ebbolQ1FiGOrNAanmyTKvQdGWWxZ2ykybVmG5-Ws5JfJ4SV7NhOlpGmUkcYSLdvWF-sUraihL7WntIIJj0zUwf-9F2tNriZYryTZ87cCu3TFqUz35NOA60AaleL-sPJdr7pYHmOng1or5gGrkS5OlOgdeh_LBir8Fa7MNi4sff65tYyX8ZMtM6uJHxfjGmsLmB4nquaVmsamU1VF8taY8gNmxAWYjf0u3Epk-YOugznWp0mxLffeAZN6i-OhVIt72z2mOLjViye8TYJu5fvsEl0JejEopvNzcOz_P5zoBvNFwi8VuGD3-ZmKpm7719Fw8kC8S3igFHfEwSP14YI2dGOcvKTTxlDiK8E6jQ7RyUKqYSsGwXBgmP5px10qC3lNgGngfR6yPPp-0=w1008-h673-no",
		text: "Dzveli Galavani (old walls) - fortress of the first Kakhetian kings (9th-10th centuries AD)."
	},
	{		
		id: 2,
		title:"King Heraclius II Monument", 
		image:"https://lh3.googleusercontent.com/RsBM-0rUgZ_cmu0K3uxwetQL_uvfMpDBgggmS7NW9lFQNSbjtDjfdGDD9JfbNg6pAXCrOMI4KvuHZsucL5j6slQyKpO1G4vim6VdNktI_UEJ4ZUKa1YSY9gFgdVlIs0MlhPtfk9aquCrHvZHcRS_PhgBdGtMO9Ardwq1HG4b9zSDKWYoKjqfFsqemxkUEdWaoSQoNbtwp7ahpaiA0MeN0DXQ16cDfq6gaGrrpwm1P_Nw-aVtwgUdz8sICKLxKXw102qn2Ys7CysE_jrSfs6zJkYLfjEeudp3DBJwTvoGtUanwWgMOtWzEqt0sZvAm3qmQAPx3zwGUiavqHPlfmyBo-mTogUNEY5TwrCH2jKndO9K0K3oxMH-tz5ziaIfVPqt53ju31qghwsMQb5tsua8z8wWwLFcypJEdbpu0t-vB8XT1sYJqMUZsgBLEAWRfvk3IOYWeEdI2lmVTFvwRVfcSTGEGz_pWfS-VYzxBUuBA096rON-d4w3-v0Vcol0w5_6Rxx8Hz1Wjkz-lOon5I4QP6p0ObJL2zSrY2PPIA9Zou_-Ifm8-NCaGJmGRdQHFoZejvwNbs8hPgY-9AUg4BsXsDrPQ1g2ZLMN5o63jnQJNQ=w1008-h673-no",
		text: ""
	}
]


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mapProperties: {
				center:[45.476,41.919],
	  			zoom:[14.2],
	  			pitch:50,
	  			bearing:20
			},
			description: descriptions[0]
		};
		this.handleClick = (complex) => {
			if (complex == null) {
				this.setState({description:descriptions[0]})
			} else {
				let description = descriptions.find(o => o.title === complex);
				if (description == null) {
					this.setState({description:descriptions[0]})
				} else {
					this.setState({description:description})
				}
			}
		}
	}

	render() {
		const style = {
			backgroundColor: '#D7DADB',
			height: '100%',
		} 
		return <div style={style}>
					<GpMap 
						properties={this.state.mapProperties} 
						description={this.state.description} 
						onClick={(complex) => this.handleClick(complex)}/>
					<Toolbar description={this.state.description}/>
				</div>
	}
}

class GpMap extends React.Component {
  	constructor(props) {
		super(props);
		this.state = {
			buildings:      [],
			hoverBuildings: [],
			clickBuildings: []
		};
		this.handleBuildingsEnter = (e) => {
			let complex = e.features[0].properties.complex
			let blds = this.state.buildings.filter(feature => feature.properties.complex === complex)
			this.setState({hoverBuildings: blds});
		}
		this.handleBuildingsLeave = (e) => {
			this.setState({hoverBuildings: []});
		}
		this.handleBuildingsClick = (e) => {
			if (e == null) {
				this.props.onClick(null)
				this.setState({clickBuildings: []});
			} else {
				let complex = e.features[0].properties.complex
				this.props.onClick(complex)
				let blds = this.state.buildings.filter(feature => feature.properties.complex === complex)
				this.setState({clickBuildings: blds});
			}
		}
  	}

	componentDidMount() {
  		mapbox.listFeatures('cj8iom0rf0zde2wqtldtlu8gj', {}, (err, buildings) => {
			this.setBuildings(buildings);
		});
  	}

	setBuildings(buildings) {

		this.setState({buildings: buildings.features});
	}

  	render() {
		return <Map
			style="mapbox://styles/kln4/cj7kgebwh00ol2rpq2b8h6udp"
  			center={this.props.properties.center}
  			zoom={this.props.properties.zoom}
  			pitch={this.props.properties.pitch}
  			bearing={this.props.properties.bearing}
  			containerStyle={{
  				position: 'absolute',
    			height: '100%',
    			width: '100%'
  			}}
  			onClick={() => this.handleBuildingsClick(null)}
  			>
  				<CityBoundaryLayer/>
  				<BuildingsLayer
  					features={this.state.buildings}
  					opacity={0.5}
  					onBuildingsMouseEnter={this.handleBuildingsEnter}
  					onBuildingsMouseLeave={this.handleBuildingsLeave}
  					onBuildingsClick={this.handleBuildingsClick}
  					/>
  				<BuildingsLayer features={this.state.hoverBuildings} opacity={0.8}/>
  				<BuildingsLayer features={this.state.clickBuildings} opacity={1}/>
  				<ZoomControl position="topLeft"/>
  		</Map>
  }
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

class BuildingsLayer extends React.Component {
	constructor(props) {
		super(props);
  	}

  	render() {
		return <GeoJSONLayer
					data={{
						'type': 'FeatureCollection', 
						'features': this.props.features
					}}
					fillExtrusionPaint={{
						'fill-extrusion-color': {
              				'property': 'color',
              				'type': 'identity'
            			},
			    		'fill-extrusion-height': {
			                'property': 'height',
			        		'type': 'identity'
			    		},
						'fill-extrusion-base': {
			        		'property': 'base_height',
			        		'type': 'identity'
						},
						'fill-extrusion-opacity': this.props.opacity
					}}
					fillExtrusionOnMouseEnter={this.props.onBuildingsMouseEnter}
					fillExtrusionOnMouseLeave={this.props.onBuildingsMouseLeave}
					fillExtrusionOnClick={this.props.onBuildingsClick}
					>
		       	</GeoJSONLayer>;
  	}
}

class Toolbar extends React.Component {
	render() {
		const style = {
			position: 'absolute',
			width: '300px',
			right: '20px',
			top: '20px',
			bottom: '100px',
			backgroundColor: 'white',
			borderRadius: '10px',
			opacity: '0.9',
			textAlign: 'center',
			padding: '15px'
		};
		return <div style={style}>
					<Title value = {this.props.description.title}/>
					<Image value = {this.props.description.image}/>
					<Text  value = {this.props.description.text}/>
				</div>;
	}
}

function Title(props) {
	return <div><h2>{props.value}</h2></div>;
}

function Image(props) {
	const style = {
		width: '100%'
	}
	return <img src={props.value} style={style}/>;
}

function Text(props) {
	const style = {
		position: 'absolute',
	    top: '290px',
	    left: '15px',
	    right: '15px',
	    bottom: '15px',
	    overflow: 'auto',
	    paddingRight: '5px',
	    textAlign: 'justify'
	}
	return <div style={style}
				dangerouslySetInnerHTML={{__html: '&nbsp;&nbsp;&nbsp;&nbsp;' + props.value}} />;
}




ReactDOM.render(
  <App />,
  document.getElementById('root')
);
	