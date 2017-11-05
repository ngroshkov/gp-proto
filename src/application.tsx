"use strict"

// import css from './style.css';
//import boundaryjson from 'json-loader!./data/cityboundary.geojson';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import GpMap from './map';
import Toolbar from './toolbar';
import Description, {descriptions} from './data/descriptions';


export interface AppProps {
}

export interface AppState {
	description: Description
}
	
class App extends React.Component<AppProps, AppState> {
	constructor(props : AppProps) {
		super(props);
		this.state = {
			description: descriptions[0]
		};
	}


	private handleClick = (complex: string) => {
		if (complex == null) {
			this.setState({description:descriptions[0]})
		} else {
			let foundDescriptions = descriptions.filter(o => o.title === complex);
			if (foundDescriptions.length == 0) {
				this.setState({description:descriptions[0]})
			} else {
				this.setState({description:foundDescriptions[0]})
			}
		}
	}

	public render() {
		const style = {
			backgroundColor: '#D7DADB',
			height: '100%',
		} 
		return <div style={style}>
					<GpMap onClick={(complex: string) => this.handleClick(complex)}/>
					<Toolbar description={this.state.description}/>
				</div>
	}
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
	