import React, { Component, PropTypes } from 'react';

// Task Component
export default class Task extends Component {
	render() {
		return (
			<li>{this.props.task.text}</li>
		);
	}
}

Task.propTypes = {
	task: PropTypes.object.isRequired,
};