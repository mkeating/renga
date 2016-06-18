import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Lines } from '../api/lines.js';

import Line from './Line.jsx';


//App Component
export default class App extends Component {

	handleSubmit(event) {
		event.preventDefault();

		//find text field (by React 'ref' )
		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		Lines.insert({
			text,
			createdAt: new Date(),
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
					<h1>title</h1>

					<form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
						<input
							type="text"
							ref="textInput"
							placeholder="Type to add new" />
					</form>

				</header>

				<ReactCSSTransitionGroup 
					transitionName = "lineLoad"
					transitionEnterTimeout = {600}
					transitionLeaveTimeout = {600}  
				>

					{this.renderLines()}
				</ReactCSSTransitionGroup>
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
	return {
		lines: Lines.find({}, {sort:{createdAt: -1}, limit: 5}).fetch(),
	};
}, App);