// Коллекция склада
StancionOboryds = new Mongo.Collection("StancionOboryds");

var Schemas = {};

Schemas.StancionOboryd = new SimpleSchema({
	full_name: {
		type: String,
		label: "Наименование",
		max: 200
	},
	inventari_nomer: {
		type: String,
		label: "Инвентарный номер",
		max: 200,
		optional: true
	},
	function_naznachenie: {
		type: String,
		label: "Функциональное назначение",
		max: 200,
		optional: true
	},
	decimal_nomer: {
		type: String,
		label: "Децимальный номер",
		max: 200,
		optional: true
	},
	serial_nomer: {
		type: String,
		label: "Серийный номер",
		max: 200,
		optional: true
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

StancionOboryds.attachSchema(Schemas.StancionOboryd);

// права на изменение базы склад
StancionOboryds.allow({
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