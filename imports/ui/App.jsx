import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Lines } from '../api/lines.js';

import Line from './Line.jsx';

import syllable from 'syllable';


//App Component
export default class App extends Component {


	handleSubmit(event) {
		event.preventDefault();

		//find text field (by React 'ref' )
		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		let lastOne = this.props.lines[this.props.lines.length-1];
		let secondToLast = this.props.lines[this.props.lines.length-2];

		let words = text.split(' ');
		//let words = ["one", "two", "excellent", "excellent"];
		console.log(words);

		let totalSyllables = 0;
		words.forEach(n => totalSyllables += syllable(n));


		console.log(totalSyllables);

		//check for haiku
		if (syllable(text) === 5 && lastOne.syllables === 7 && secondToLast.syllables === 5){
			console.log('haiku created');
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
						<ReactCSSTransitionGroup 
								transitionName = "lineLoad"
								transitionEnterTimeout = {600}
								transitionLeaveTimeout = {600} > 
							
								{this.renderLines()}
						
						</ReactCSSTransitionGroup>
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