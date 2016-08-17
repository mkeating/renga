import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Lines } from '../api/lines.js';
import Line from './Line.jsx';

import Scroll from './Scroll.jsx';

import syllable from 'syllable';



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

		//let lastOne = this.props.lines[this.props.lines.length-1];
		//let secondToLast = this.props.lines[this.props.lines.length-2];

		//let words = text.split(' ');

		//let totalSyllables = 0;
		//words.forEach(n => totalSyllables += syllable(n));

		//let lastOneID = lastOne._id;

		//check for haiku
		/*if (totalSyllables === 5 && lastOne.syllables === 7 && secondToLast.syllables === 5){
			console.log('!!! haiku created !!!');

			console.log(secondToLast._id);
			console.log(lastOne._id);
			console.log('current one to be inserted');
		}*/

		Lines.insert({
			text,
			createdAt: new Date(),
			//syllables: totalSyllables,
		});

		//clear the form
		ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}
	
	render() {

		

		return (
			<div className="container">
				<header>
					<h1>Renga</h1>

					<div className="scroll">
						
						<Scroll> </Scroll>

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




