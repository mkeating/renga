import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Lines } from '../api/lines.js';
import Line from './Line.jsx';

import { Locked } from '../api/locked.js';

import syllable from 'syllable';

import FlipMove from 'react-flip-move';


//App Component
export default class App extends Component {

	componentDidUpdate() {
	    console.log('updated');
	    console.log(this.props.lines);
	  }

	handleSubmit(event) {
		event.preventDefault();

		//find text field (by React 'ref' )
		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		let lastOne = this.props.lines[this.props.lines.length-1];
		let secondToLast = this.props.lines[this.props.lines.length-2];

		//console.log(this.props.lines[this.props.lines.length-1]._id);

		let words = text.split(' ');

		let totalSyllables = 0;
		words.forEach(n => totalSyllables += syllable(n));

		let lastOneID = lastOne._id;
		console.log(lastOneID);

	
		console.log('overall props from handle submit:' + JSON.stringify(this.props.lines));
		console.log(this.refs);

		//check for haiku
		if (totalSyllables === 5 && lastOne.syllables === 7 && secondToLast.syllables === 5){
			console.log('!!! haiku created !!!');

			console.log(secondToLast._id);
			console.log(lastOne._id);
			console.log('current one to be inserted');
		}

		Lines.insert({
			text,
			createdAt: new Date(),
			syllables: totalSyllables,
		});

		//clear the form
		ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}
	
	renderLines() {


		console.log(this.props.lines.refs);

		return this.props.lines.map((line) => (
			<Line key={line._id} line={line} />
		));
	}

	render() {

		

		return (
			<div className="container">
				<header>
					<h1>Renga</h1>

					<div className="scroll">
						
						<FlipMove easing = "cubic-bezier(0, 0.7, 0.8, 0.1)" enterAnimation="fade"  leaveAnimation="fade">
							{ this.renderLines() }
						</FlipMove>
					</div>

					<form className="new-line" onSubmit={this.handleSubmit.bind(this)}>
						<input
							type="text"
							ref="textInput"
							placeholder="Type to add new" />
					</form>

				</header>
			</div>
		);
	}

	
}

App.propTypes = {
	lines: PropTypes.array.isRequired,
};


/*
wraps the App component in a Higher Order Component (container), and supplies the Tasks 
collection to App as a prop 
*/
export default createContainer(() => {

	Meteor.subscribe('lines.recent');

	return {
		lines: Lines.find({}, {sort:{createdAt: 1}}).fetch()
	};
}, App);