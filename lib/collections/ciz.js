// Коллекция СИЗ
Cizs = new Mongo.Collection("Cizs");

var Schemas = {};

Schemas.Ciz = new SimpleSchema({
	mesto: {
		type: String,
		label: "Место нахождение",
		allowedValues: function () {
				var result = [];
				sklads = Sklads.find();
				sklads.forEach(function(sklad){
					result.push(sklad._id);
				});
				return result;
			},
			autoform: {
				type: "select2",
				afFieldInput: {
					placeholder: "Выберите место нахождения",
					firstOption: ""
				},
			  	options: function () {
					var result = [];
					sklads = Sklads.find();
					sklads.forEach(function(sklad){
						result.push({label: sklad.name, value: sklad._id});
					});
					return result;
				}
			},
		optional: true,
		blackbox: true
	},
	number: {
		type: Number,
		label: "Порядковый номер",
		max: 200
	},
	typeCiz: {
		type: String,
		label: "Тип СИЗ",
		allowedValues: function () {
				var result = [];
				typeCizs = TypeCizs.find();
				typeCizs.forEach(function(typeCiz){
					result.push(typeCiz._id);
				});
				return result;
			},
			autoform: {
				type: "select2",
				afFieldInput: {
					placeholder: "Выберите тип СИЗ",
					firstOption: ""
				},
			  	options: function () {
					var result = [];
					typeCizs = TypeCizs.find();
					typeCizs.forEach(function(typeCiz){
						result.push({label: typeCiz.name, value: typeCiz._id});
					});
					return result;
				}
			},
		optional: true,
		blackbox: true
	},
	nameCiz: {
		type: String,
		label: "Наименование СИЗ",
		allowedValues: function () {
				var result = [];
				sklads = Sklads.find();
				sklads.forEach(function(sklad){
					result.push(sklad._id);
				});
				return result;
			},
			autoform: {
				type: "select2",
				afFieldInput: {
					placeholder: "Выберите место нахождения",
					firstOption: ""
				},
			  	options: function () {
					var result = [];
					sklads = Sklads.find();
					sklads.forEach(function(sklad){
						result.push({label: sklad.name, value: sklad._id});
					});
					return result;
				}
			},
		optional: true,
		blackbox: true
	},
	periodPverki: {
		type: Number,
		label: "Период поверки",
		optional: true
	},
	datePoverki: {
		type: Date,
		label: "Дата поверки",
		optional: true
	},
	dateSledPoverki: {
		type: Date,
		label: "Дата следующей поверки",
		optional: true
	}
});

Cizs.attachSchema(Schemas.Ciz);

// права на изменение базы СИЗ
Cizs.allow({
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