import { Mongo } from 'meteor/mongo';

export const Locked = new Mongo.Collection('locked');

if(Meteor.isServer) {
	/*Meteor.publish('lines.recent', function linesPublication(){
		return Lines.find({}, {sort:{createdAt: -1}, limit: 5});
	});*/
}

