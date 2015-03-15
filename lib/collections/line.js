// Коллекция линий
Lines = new Mongo.Collection("Lines");

var Schemas = {};

Schemas.Line = new SimpleSchema({
	name: {
		type: String,
		label: "Наименование",
		max: 200
	},
	nomer: {
		type: String,
		label: "Номер линии РРЛ",
		max: 200,
		optional: true
	}
});

Lines.attachSchema(Schemas.Line);

// права на изменение базы линий
Lines.allow({
	insert: function(userId, doc){
		var loggedInUser = Meteor.user();
		if (Roles.userIsInRole(loggedInUser, ['admin','moderator'])) {
      		return true;
    	}
	},
	update: function(userId, doc, fields, modifier){
		var loggedInUser = Meteor.user();
		if (Roles.userIsInRole(loggedInUser, ['admin','moderator'])) {
      		return true;
    	}
	},
	remove: function(userId, doc){
		var loggedInUser = Meteor.user();
		if (Roles.userIsInRole(loggedInUser, ['admin','moderator'])) {
      		return true;
    	}
	}
});