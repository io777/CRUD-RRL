// Коллекция аварий
Alarms = new Mongo.Collection("Alarms");

var Schemas = {};

Schemas.Alarm = new SimpleSchema({
	name: {
		type: String,
		label: "Наименование",
		max: 200
	},
	type: {
		type: String,
		label: "Тип",
		max: 200,
		optional: true
	},
	primechanie: {
		type: String,
		label: "Примечание",
		max: 1000,
		optional: true,
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	}
});

Alarms.attachSchema(Schemas.Alarm);

// права на изменение базы аварий
Alarms.allow({
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