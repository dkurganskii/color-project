import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends Component {
	findPalette(id) {
		return seedColors.find(function(palette) {
			return palette.id === id;
		});
	}
	render() {
		return (
			<Switch>
				<Route
					exact
					path="/palette/:paletteId/:colorId"
					render={(routProps) => (
						<SingleColorPalette
							colorId={routProps.match.params.colorId}
							palette={generatePalette(this.findPalette(routProps.match.params.paletteId))}
						/>
					)}
				/>

				<Route exact path="/" render={(routProps) => <PaletteList palettes={seedColors} {...routProps} />} />

				<Route
					exact
					path="/palette/:id"
					render={(routProps) => (
						<Palette palette={generatePalette(this.findPalette(routProps.match.params.id))} />
					)}
				/>
			</Switch>
			// <div>
			// 	<Palette palette={generatePalette(seedColors[4])} />
			// </div>
		);
	}
}
export default App;
