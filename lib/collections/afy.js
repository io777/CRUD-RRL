// Коллекция АФУ
AFYs = new Mongo.Collection("AFYs");

var Schemas = {};

Schemas.AFY = new SimpleSchema({
	type_oborydov: {
		type: String,
		label: "Тип оборудования",
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
		label: "Место размещения",
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
			type: "select2",
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
		label: "Частоты (Мгц)",
		optional: true,
		max: 200
	},
	freqvansi_prd: {
		type: String,
		label: "Частота прд. (Мгц)",
		optional: true,
		max: 200
	},
	freqvansi_prm: {
		type: String,
		label: "Частота прм. (Мгц)",
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
		decimal: true,
		label: "Мощность прд. (Вт)",
		optional: true,
		min: 0.001,
		max: 10000000000000000
	},
	poteri_AVT_AFT: {
		type: Number,
		decimal: true,
		label: "Потери в АВТ / АФТ (Дбм)",
		optional: true,
		max: 10000000000000000
	},
	ydelnie_poteri_na_metr: {
		type: Number,
		decimal: true,
		label: "Удельные потери на метр (Дбм)",
		optional: true,
		min: 0.001,
		max: 10000000000000000
	},
	shirina_lycha: {
		type: String,
		label: "Ширина луча в азимутальной/вертикальной плоскости (град)",
		optional: true,
		max: 200
	},
	koll_pered: {
		type: Number,
		label: "Количество прд.",
		optional: true,
		min: 1,
		max: 10000000000000000
	},
	azimut_izluchenia: {
		type: String,
		label: "Азимут излучения (град)",
		optional: true,
		max: 200
	},
	ygol_mesta: {
		type: String,
		label: "Угол места (град.)",
		optional: true,
		max: 200
	},
	visota_podvesa_antenn: {
		type: String,
		label: "Высота подвеса антенн (м)",
		optional: true,
		max: 200
	},
	visota_ot_krovli: {
		type: String,
		label: "Высота от кровли (м)",
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
		label: "Коэффициент усил. антенн (дБi)",
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
		label: "Длинна АВТ / АФТ (м)",
		optional: true,
		min: 1,
		max: 10000000000000000
	},
	moshnost_na_vhode_antenn_wt: {
		type: Number,
		decimal: true,
		label: "Мощность на входе антенн (Вт)",
		optional: true,
		max: 10000000000000000
	},
	moshnost_na_vhode_antenn_Dbm: {
		type: Number,
		decimal: true,
		label: "Мощность на входе антенн (Дбм)",
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
		label: "Колич. потоков (шт.)",
		optional: true,
		max: 200
	},
	razmeshenie: {
		type: String,
		label: "Размещение",
		optional: true,
		max: 200
	},
	primechanie: {
		type: String,
		label: "Примечание",
		optional: true,
		max: 200
	},
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