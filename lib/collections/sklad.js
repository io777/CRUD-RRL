// Коллекция склада
Sklads = new Mongo.Collection("sklads");

var Schemas = {};

Schemas.Sklad = new SimpleSchema({
	name: {
		type: String,
		label: "Наименование*",
		max: 200
	},
	nomerKarti: {
		type: Number,
		label: "Номер карты*",
		max: 10000000000000000
	},
	adress: {
		type: String,
		label: "Адресс",
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

Sklads.attachSchema(Schemas.Sklad);

// права на изменение базы склад
Sklads.allow({
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