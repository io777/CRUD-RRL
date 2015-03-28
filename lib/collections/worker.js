// Коллекция работников
Workers = new Mongo.Collection("Workers");

var Schemas = {};

Schemas.Worker = new SimpleSchema({
	Familia: {
		type: String,
		label: "Фамилия",
		max: 200
	},
	Name: {
		type: String,
		label: "Имя",
		max: 200,
		optional: true
	},
	Otchestvo: {
		type: String,
		label: "Отчество",
		max: 200,
		optional: true
	},
	nomerKarti: {
		type: Number,
		label: "Номер карты",
		max: 10000000000000000
	},
	tabel_nomer: {
		type: String,
		label: "Табельный номер",
		max: 200,
		optional: true
	},
	data_postyplenia_na_raboty: {
		type: Date,
		label: "Дата поступления на работу",
		optional: true
	},
	pol: {
		type: String,
		label: "Пол",
		optional: true,
		allowedValues: ['Муж', 'Жен'],
            autoform: {
              type: "select2",
              afFieldInput: {
                placeholder: "Выберите пол",
                firstOption: "",
              },
              options: function () {
                return [
                  {label: "Муж", value: "Муж"},
                  {label: "Жен", value: "Жен"},
                ];
              }
            }
	},
	rost: {
		type: String,
		label: "Рост (м)",
		max: 200,
		optional: true
	},
	razmer_odezdi: {
		type: String,
		label: "Размер одежды",
		max: 200,
		optional: true
	},
	razmer_obyvi: {
		type: String,
		label: "Размер обуви",
		max: 200,
		optional: true
	},
	razmer_golovnogo_ubora: {
		type: String,
		label: "Размер головного убора",
		max: 200,
		optional: true
	},
	tel: {
		type: String,
		label: "Телефон",
		max: 200,
		optional: true
	},
	tel_rab: {
		type: String,
		label: "Рабочий телефон",
		max: 200,
		optional: true
	},
	dolznost: {
		type: String,
		label: "Должность",
		max: 200,
		optional: true
	},
	podpis: {
		type: String,
		label: "Подпись",
		max: 200,
		optional: true
	}
});

Workers.attachSchema(Schemas.Worker);

// права на изменение базы работников
Workers.allow({
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