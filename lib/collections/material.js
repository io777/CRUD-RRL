// Коллекция матерьялов
Materials = new Mongo.Collection("Materials");

var Schemas = {};

Schemas.Material = new SimpleSchema({
	name: {
		type: String,
		label: "Наименование",
		max: 200
	},
	kolvo: {
		type: Number,
		label: "Количество",
		max: 10000000000000000,
		optional: true
	},
	razmer: {
		type: String,
		label: "Размер",
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

Materials.attachSchema(Schemas.Material);

// права на изменение базы матерьялов
Materials.allow({
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