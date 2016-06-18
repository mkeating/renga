import { Mongo } from 'meteor/mongo';

export const Lines = new Mongo.Collection('lines');

if(Meteor.isServer) {
	Meteor.publish('lines.recent', function linesPublication(){
		return Lines.find({}, {sort:{createdAt: -1}, limit: 5});
	});
}

