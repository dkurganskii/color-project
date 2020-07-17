import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { arrayMove } from 'react-sortable-hoc';

class ColorPickerForm extends Component {
	constructor(props) {
		super(props);
		this.state = { currentColor: 'teal', newColorName: '' };
		this.updateCurrentColor = this.updateCurrentColor.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.props.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}
	updateCurrentColor(newColor) {
		this.setState({ currentColor: newColor.hex });
	}
	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}
	handleSubmit() {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName
		};
		this.props.addNewColor(newColor);
	}
	render() {
		const { paletteIsFull } = this.props;
		return (
			<div>
				<ChromePicker color={this.state.currentColor} onChangeComplete={this.updateCurrentColor} />
				<ValidatorForm onSubmit={this.handleSubmit} ref="form">
					<TextValidator
						value={this.state.newColorName}
						name="newColorName"
						onChange={this.handleChange}
						validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
						errorMessages={[ 'Enter a color name', 'Color name must be unique', 'Color already used!' ]}
					/>
					<Button
						variant="contained"
						type="submit"
						color="primary"
						disabled={paletteIsFull}
						style={{
							backgroundColor: paletteIsFull ? 'grey' : this.state.currentColor
						}}
					>
						{paletteIsFull ? 'Palette Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default ColorPickerForm;
