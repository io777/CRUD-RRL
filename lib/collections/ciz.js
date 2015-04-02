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
			workers = Workers.find();
			obectExplyats = ObectExplyats.find();
			sklads.forEach(function(sklad){
				result.push(sklad._id);
			});
			workers.forEach(function(worker){
				result.push(worker._id);
			});
			obectExplyats.forEach(function(obectExplyat){
				result.push(obectExplyat._id);
			});
			return result;
		},
		autoform: {
			type: "select",
			afFieldInput: {
				placeholder: "Выберите место нахождения",
				firstOption: ""
			},
		  	options: function () {
				
				var skladsResult = [];
				var workersResult = [];
				var obectExplyatsResult = [];
			
				sklads = Sklads.find();
				workers = Workers.find();
				obectExplyats = ObectExplyats.find();

				sklads.forEach(function(sklad){
					skladsResult.push({label: sklad.name+" номер карты - "+sklad.nomerKarti+" -", value: sklad._id});
				});
				workers.forEach(function(worker){
					workersResult.push({label: worker.Familia, value: worker._id});
				});
				obectExplyats.forEach(function(obectExplyat){
					obectExplyatsResult.push({label: obectExplyat.name, value: obectExplyat._id});
				});

				return [
					{
						optgroup: "Склады:",
						options: skladsResult
					},
					{
						optgroup: "Работники:",
						options: workersResult
					},
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
	number: {
		type: Number,
		label: "Порядковый номер",
		max: 10000000000000000
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
		optional: true
	},
	periodPoverki: {
		type: Number,
		label: "Период поверки",
		optional: true,
		max: 10000000000000000
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