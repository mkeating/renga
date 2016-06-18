import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Task Component
export default class Line extends Component {
	render() {
		return (
			<div>
			{this.props.line.createdAt.toString()} </div>
		);
	}
}

Line.propTypes = {
	line: PropTypes.object.isRequired,
};