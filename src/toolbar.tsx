"use strict"

import * as React from 'react';

export interface ToolbarProps {
	description: {
		title : string;
		image : string;
		text : string;
	}
};

export interface ToolbarValueProps {
	value :string;
};

const Toolbar: React.StatelessComponent<ToolbarProps> = (props) => {
	const style = {
		position: 'absolute' as 'absolute',
		width: '300px',
		right: '20px',
		top: '20px',
		bottom: '100px',
		backgroundColor: 'white',
		borderRadius: '10px',
		opacity: 0.9,
		textAlign: 'center',
		padding: '15px'
	};
	return <div style={style} >
				<Title value = {props.description.title}/>
				<Image value = {props.description.image}/>
				<Text  value = {props.description.text}/>
			</div>
}

export default Toolbar;

const Title: React.StatelessComponent<ToolbarValueProps> = (props) => {
	return <div><h2>{props.value}</h2></div>
};


const Image: React.StatelessComponent<ToolbarValueProps> = (props) => {
	const style = {
		width: '100%'
	}
	return <img style={style} src={props.value} />
}

const Text: React.StatelessComponent<ToolbarValueProps> = (props) => {
	const style = {
		position: 'absolute' as 'absolute',
	    top: '290px',
	    left: '15px',
    	right: '15px',
	    bottom: '15px',
	    overflow: 'auto' as 'auto',
    	paddingRight: '5px',
	    textAlign: 'justify'
	}
	return <div style={style}
				dangerouslySetInnerHTML={{__html: '&nbsp;&nbsp;&nbsp;&nbsp;' + props.value}} 
			/>
}

