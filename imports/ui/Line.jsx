import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Line Component
export default class Line extends Component {
	render() {

		//console.log('ref from component: ' + typeof(this.props.line._id));

		return (
				<div >{this.props.line.text}  {this.props.line._id}</div>
		);
	}
}

Line.propTypes = {
	line: PropTypes.object.isRequired,
};