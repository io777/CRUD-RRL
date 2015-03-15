// Коллекция цеха
Cexs = new Mongo.Collection("Cexs");

var Schemas = {};

Schemas.Cex = new SimpleSchema({
	full_name: {
		type: String,
		label: "Короткое наименование",
		max: 200
	},
	short_name: {
		type: String,
		label: "Полное наименование",
		max: 200
	}
});

Cexs.attachSchema(Schemas.Cex);

// права на изменение базы цех
Cexs.allow({
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