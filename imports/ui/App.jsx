import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

//App Component
export default class App extends Component {

	handleSubmit(event) {
		event.preventDefault();

		//find text field (by React 'ref' )
		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		Tasks.insert({
			text,
			createdAt: new Date(),
		});

		//clear the form
		ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}
	
	renderTasks() {

		return this.props.tasks.map((task) => (
			<Task key={task._id} task={task} />
		));
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1>title</h1>

				{/* Comments in JSX */}

					<form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
						<input
							type="text"
							ref="textInput"
							placeholder="Type to add new" />
					</form>

				</header>

				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		);
	}
}

App.propTypes = {
	tasks: PropTypes.array.isRequired,
};


/*
wraps the App component in a Higher Order Component (container), and supplies the Tasks 
collection to App as a prop 
*/
export default createContainer(() => {
	return {
		tasks: Tasks.find().fetch(),
	};
}, App);