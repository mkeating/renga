import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Lines } from '../api/lines.js';
import Line from './Line.jsx';

import FlipMove from 'react-flip-move';



// Scroll Component
export default class Scroll extends Component {


	renderLines() {

		return this.props.lines.map((line) => (
			<Line key={line._id} line={line} />
		));
	}


	render() {
		return (

			<FlipMove easing = "cubic-bezier(0, 0.7, 0.8, 0.1)" enterAnimation="fade"  leaveAnimation="fade">
							{ this.renderLines() }
			</FlipMove>

			)
		
		
	}
}

Scroll.propTypes = {
	lines: PropTypes.array.isRequired,
};

/*
wraps the Scroll component in a Higher Order Component (container), and supplies the Tasks 
collection to Scroll as a prop 
*/
export default createContainer(() => {

	Meteor.subscribe('lines.recent');

	return {
		lines: Lines.find({}, {sort:{createdAt: 1}}).fetch()
	};
}, Scroll);