"use strict"

import * as React from 'react';
import ReactMapboxGl, { ZoomControl } from 'react-mapbox-gl';

import {CityBoundaryLayer, BuildingsLayer} from './layers';

const accessToken = "pk.eyJ1Ijoia2xuNCIsImEiOiJjaW9sNjZlbWMwMDEwdzVtNmxxYjA2ZGozIn0.BytaphQwtjCVMGEaLlfb3Q";
const Mapbox = ReactMapboxGl({accessToken: accessToken});
const MapboxClient = require('mapbox');
const mapbox = new MapboxClient(accessToken);

const mapProperties = {
	center:[45.476,41.919],
	zoom:[14.2],
	pitch:50,
	bearing:20
}

const styleId = 'mapbox://styles/kln4/cj7kgebwh00ol2rpq2b8h6udp';
const boundaryDatasetId = 'cj87ejtwt17b232plqeyu1tga';
const buildingDatasetId = 'cj8iom0rf0zde2wqtldtlu8gj';

export interface GpMapProps {
	onClick: any;
};

export interface GpMapState {
	boundary: GeoJSON.Feature<GeoJSON.GeometryObject>[];
	buildings: GeoJSON.Feature<GeoJSON.GeometryObject>[];
	hoverBuildings: GeoJSON.Feature<GeoJSON.GeometryObject>[];
	clickBuildings: GeoJSON.Feature<GeoJSON.GeometryObject>[];
};

export default class GpMap extends React.Component<GpMapProps, GpMapState> {
	constructor(props : GpMapProps) {
		super(props);
		this.state = {
			boundary: 		[],
			buildings:      [],
			hoverBuildings: [],
			clickBuildings: []
		};
	}

	public componentDidMount() {
  		mapbox.listFeatures(boundaryDatasetId, {}, (err: any, boundary: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>) => {
			this.setState({boundary: boundary.features});
  		});
  		mapbox.listFeatures(buildingDatasetId, {}, (err: any, buildings: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>) => {
			this.setState({buildings: buildings.features});
  		});
  	}

	private handleBuildingsEnter = (e: any) => {
		let complex = e.features[0].properties.complex
		let blds = this.state.buildings.filter(feature => feature.properties.complex === complex)
		this.setState({hoverBuildings: blds});
	}

	private handleBuildingsLeave = (e: any) => {
		this.setState({hoverBuildings: []});
	}

	private handleBuildingsClick = (e: any) => {
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

  	public render() {
		return <Mapbox
			style={styleId}
  			center={mapProperties.center}
  			zoom={mapProperties.zoom}
  			pitch={mapProperties.pitch}
  			bearing={mapProperties.bearing}
  			containerStyle={{
  				position: 'absolute',
    			height: '100%',
    			width: '100%'
  			}}
  			onClick={() => this.handleBuildingsClick(null)}
  			>
  				<CityBoundaryLayer features={this.state.boundary} />
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
  		</Mapbox>
  	}
}
