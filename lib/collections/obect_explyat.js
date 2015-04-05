// Коллекция цеха
ObectExplyats = new Mongo.Collection("ObectExplyats");

var Schemas = {};

Schemas.ObectExplyat = new SimpleSchema({
	name: {
		type: String,
		label: "Наименование",
		max: 200
	},
	setevoi_nomer: {
		type: String,
		label: "Сетевой номер",
		max: 200,
		optional: true
	},
	nomerKarti: {
		type: Number,
		label: "Номер карты",
		max: 10000000000000000
	},
	lineRRL: {
		type: String,
		label: "Линия РРЛ",
		allowedValues: function () {
			var result = [];
			lines = Lines.find();
			lines.forEach(function(line){
				result.push(line._id);
			});
			return result;
		},
		autoform: {
			type: "select2",
			afFieldInput: {
			placeholder: "Выберите Линию РРЛ",
			firstOption: ""
			// multiple: true
			},
			options: function () {
				var result = [];
				lines = Lines.find();
				lines.forEach(function(line){
					result.push({label: line.name+" - "+line.nomer, value: line._id});
				});
				return result;
			}  
		},
		optional: true,
		blackbox: true
	},
	otvetstvenniu: {
		type: String,
		label: "Ответственный за объект",
		allowedValues: function () {
			var result = [];
			var workers = Workers.find();
			workers.forEach(function(worker){
				result.push(worker._id);
			});
			return result;
		},
		autoform: {
			type: "select",
			afFieldInput: {
				placeholder: "Выберите ответственного за объект",
				firstOption: ""
			},
		  	options: function () {
				var workersResult = [];
				var workers = Workers.find();
				workers.forEach(function(worker){
					workersResult.push({label: worker.Familia, value: worker._id});
				});
				return [
					{
						optgroup: "Работники:",
						options: workersResult
					}
				];
			}
		},
		optional: true,
		blackbox: true
	},
	adress: {
		type: String,
		label: "Адресс",
		max: 200,
		optional: true
	},
	rasstoyanie_do_osn_stancii: {
		type: String,
		label: "Расстояние до основной станции (км)",
		max: 200,
		optional: true
	},
	rasstoyanie_mezdy_stanciami: {
		type: String,
		label: "Расстояние между станциями (км)",
		max: 200,
		optional: true
	},
	COM_data: {
		type: Date,
		label: "Измерение СОМ, дата",
		max: 200,
		optional: true
	},
	COM_protokol: {
		type: String,
		label: "Измерение СОМ, протокол",
		max: 200,
		optional: true
	},
	Metallosvazi_data: {
		type: Date,
		label: "Измерение металлосвязи, дата",
		max: 200,
		optional: true
	},
	Metallosvazi_protokol: {
		type: String,
		label: "Измерение металлосвязи, протокол",
		max: 200,
		optional: true
	},
	Zazemlenia_data: {
		type: Date,
		label: "Измерение заземления, дата",
		max: 200,
		optional: true
	},
	Zazemlenia_protokol: {
		type: String,
		label: "Измерение заземления, протокол",
		max: 200,
		optional: true
	},
	Petli_Faza_Null_data: {
		type: Date,
		label: "Измерение петли фаза-ноль, дата",
		max: 200,
		optional: true
	},
	Petli_Faza_Null_protokol: {
		type: String,
		label: "Измерение петли фаза-ноль, протокол",
		max: 200,
		optional: true
	}
});

ObectExplyats.attachSchema(Schemas.ObectExplyat);

// права на изменение базы цех
ObectExplyats.allow({
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