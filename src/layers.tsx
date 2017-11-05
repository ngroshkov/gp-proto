"use strict"

import * as React from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import * as turfBboxPolygon from '@turf/bbox-polygon';
import * as turfDifference from '@turf/difference';

export interface CityBoundaryLayerProps {
	features: GeoJSON.Feature<GeoJSON.GeometryObject>[];
};

export const CityBoundaryLayer : React.StatelessComponent<CityBoundaryLayerProps> = (props) => {
	let feature: any  = props.features[0];
	let bounds = turfBboxPolygon([180, 90, -180, -90]);
	let boundary = turfDifference(bounds, feature);
	return <GeoJSONLayer
				data={boundary}
				fillPaint={{
					"fill-color": "grey",
					"fill-opacity": 0.5,
					"fill-outline-color": "red"
				}}/>;
}

export interface BuildingsLayerProps {
	features: GeoJSON.Feature<GeoJSON.GeometryObject>[];
	opacity: number;
	onBuildingsMouseEnter?: any;
	onBuildingsMouseLeave?: any;
	onBuildingsClick?: any;
};

export const BuildingsLayer: React.StatelessComponent<BuildingsLayerProps> = (props) => {
	return <GeoJSONLayer
				data={{
					'type': 'FeatureCollection', 
					'features': props.features
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
					'fill-extrusion-opacity': props.opacity
				}}
				fillExtrusionOnMouseEnter={props.onBuildingsMouseEnter}
				fillExtrusionOnMouseLeave={props.onBuildingsMouseLeave}
				fillExtrusionOnClick={props.onBuildingsClick}
				/>
}
