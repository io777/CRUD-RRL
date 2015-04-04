// Коллекция АФУ
AFYs = new Mongo.Collection("AFYs");

var Schemas = {};

Schemas.AFY = new SimpleSchema({
	napravlenie: {
		type: String,
		label: "Направление",
		max: 200
	},
	inventarniu_nomer: {
		type: String,
		label: "Инвентарный номер",
		optional: true,
		max: 200
	},
	mesto: {
		type: String,
		label: "Место нахождение",
		allowedValues: function () {
			var result = [];
			sklads = Sklads.find();
			obectExplyats = ObectExplyats.find();
			sklads.forEach(function(sklad){
				result.push(sklad._id);
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
				var obectExplyatsResult = [];
			
				sklads = Sklads.find();
				obectExplyats = ObectExplyats.find();

				sklads.forEach(function(sklad){
					skladsResult.push({label: sklad.name, value: sklad._id});
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
						optgroup: "Объекты эксплуатации:",
						options: obectExplyatsResult
					}
				];
			}
		},
		optional: true,
		blackbox: true
	},
	freqvansi: {
		type: String,
		label: "Частота",
		optional: true,
		max: 200
	},
	freqvansi_prd: {
		type: String,
		label: "Частота прд.",
		optional: true,
		max: 200
	},
	freqvansi_prm: {
		type: String,
		label: "Частота прм.",
		optional: true,
		max: 200
	},
	type_moduleshin: {
		type: String,
		label: "Тип модуляции",
		optional: true,
		max: 200
	},
	power_tx: {
		type: Number,
		label: "Мощность прд.",
		optional: true,
		max: 10000000000000000
	},
	poteri_AVT_AFT: {
		type: Number,
		label: "Потери в АВТ / АФТ",
		optional: true,
		max: 10000000000000000
	},
	ydelnie_poteri_na_metr: {
		type: Number,
		label: "Удельные потери на метр",
		optional: true,
		max: 10000000000000000
	},
	shirina_lycha: {
		type: String,
		label: "Ширина луча",
		optional: true,
		max: 200
	},
	koll_pered: {
		type: Number,
		label: "Количество прд.",
		optional: true,
		max: 10000000000000000
	},
	azimut_izluchenia: {
		type: String,
		label: "Азимут излучения",
		optional: true,
		max: 200
	},
	visota_podvesa_antenn: {
		type: String,
		label: "Высота подвеса антенн",
		optional: true,
		max: 200
	},
	type_antenn_diametr: {
		type: String,
		label: "Тип антенн диаметр",
		optional: true,
		max: 200
	},
	koeffcient_ysil_antenn: {
		type: String,
		label: "Коэффициент усил. антенн",
		optional: true,
		max: 200
	},
	type_AVT_AFT: {
		type: String,
		label: "Тип АВТ / АФТ",
		optional: true,
		max: 200
	},
	sechenie: {
		type: String,
		label: "Сечение",
		optional: true,
		max: 200
	},
	dlinna_AVT_AFT: {
		type: Number,
		label: "Длинна АВТ / АФТ",
		optional: true,
		max: 10000000000000000
	},
	moshnost_na_vhode_antenn: {
		type: Number,
		label: "Мощность на входе антенн",
		optional: true,
		max: 10000000000000000
	},
	vladelec_oboryd: {
		type: String,
		label: "Владелец оборудования",
		optional: true,
		max: 200
	},
	rezervir: {
		type: String,
		label: "Резервирование",
		optional: true,
		max: 200
	},
	koll_potokov: {
		type: String,
		label: "Колич. потоков",
		optional: true,
		max: 200
	},
	razmeshenie: {
		type: String,
		label: "Размещение",
		optional: true,
		max: 200
	}
});

AFYs.attachSchema(Schemas.AFY);

// права на изменение базы АФУ
AFYs.allow({
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