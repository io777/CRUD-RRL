// Коллекция спец. одежды
SpezOdezdas = new Mongo.Collection("SpezOdezdas");

var Schemas = {};

Schemas.SpezOdezda = new SimpleSchema({
	naimenovanie_ciz: {
		type: String,
		label: "Наименование СИЗ",
		max: 200
	},
	naklad_prihod: {
		type: String,
		label: "Номер накладной",
		max: 200,
		optional: true
	},
	sertificat_sootvetstvia: {
		type: String,
		label: "Сертификат соответствия",
		max: 200,
		optional: true
	},
	data_prihoda: {
		type: Date,
		label: "Дата прихода",
		optional: true
	},
	kolvo_prihoda: {
		type: Number,
		label: "Количество прихода (шт)",
		max: 10000000000000000,
		optional: true
	},
	data_vidachi: {
		type: Date,
		label: "Дата выдачи",
		max: 200,
		optional: true
	},
	kolvo_vidachi: {
		type: Number,
		label: "Количество выдачи(шт)",
		max: 10000000000000000,
		optional: true
	},
	procent_iznosa_vidachi: {
		type: Number,
		label: "Процент износа выдачи (%)",
		max: 100,
		optional: true
	},
	srock_noski: {
		type: String,
		label: "Срок носки",
		max: 200,
		optional: true
	},
	data_vozvrata: {
		type: Date,
		label: "Дата возврата",
		max: 200,
		optional: true
	},
	kolvo_vozvrata: {
		type: Number,
		label: "Количество возврата (шт)",
		max: 10000000000000000,
		optional: true
	},
	procent_iznosa_vozvrata: {
		type: Number,
		label: "Процент износа возврата (%)",
		max: 100,
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

SpezOdezdas.attachSchema(Schemas.SpezOdezda);

// права на изменение базы спец. одежда
SpezOdezdas.allow({
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