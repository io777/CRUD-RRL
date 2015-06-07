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
	mesto: {
		type: String,
		label: "Место аварии",
		allowedValues: function () {
			var result = [];
			obectExplyats = ObectExplyats.find();
			obectExplyats.forEach(function(obectExplyat){
				result.push(obectExplyat._id);
			});
			return result;
		},
		autoform: {
			type: "select2",
			afFieldInput: {
				placeholder: "Выберите место аварии",
				firstOption: ""
			},
		  	options: function () {
				var obectExplyatsResult = [];
				obectExplyats = ObectExplyats.find();
				obectExplyats.forEach(function(obectExplyat){
					obectExplyatsResult.push({label: obectExplyat.name, value: obectExplyat._id});
				});

				return [
					{
						optgroup: "Объекты эксплуатации:",
						options: obectExplyatsResult
					}
				];
			}
		},
		optional: true,
		blackbox: true
	},
	mestoName: {
		type: String,
		label: "Наименование место нахождения",
		optional: true
	},
	date: {
		type: Date,
		optional: true,
		label: "Дата аварии"
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