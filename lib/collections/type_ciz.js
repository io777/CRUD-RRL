// Коллекция типов СИЗ
TypeCizs = new Mongo.Collection("TypeCizs");

var Schemas = {};

Schemas.TypeCiz = new SimpleSchema({
	name: {
		type: String,
		label: "Наименование типа СИЗ*",
		max: 200
	},
	ciz: {
		type: [Object],
		label: "СИЗ",
		max: 200,
		optional: true
	},
	"ciz.$.name": {
		type: String,
		label: "Наименование СИЗ",
		max: 200
	},
	"ciz.$.periodPoverki": {
		type: Number,
		label: "Период поверки (месяц)",
		max: 10000000000000000
	}
});

TypeCizs.attachSchema(Schemas.TypeCiz);

// права на изменение базы цех
TypeCizs.allow({
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