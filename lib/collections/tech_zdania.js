// Коллекция тех. зданий
TechZdanias = new Mongo.Collection("TechZdanias");

var Schemas = {};

Schemas.TechZdania = new SimpleSchema({
	adress: {
		type: String,
		label: "Адресс",
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
	god_postroiki: {
		type: String,
		label: "Год постройки",
		max: 200,
		optional: true
	},
	god_pereoboryd: {
		type: String,
		label: "Год переоборудования",
		max: 200,
		optional: true
	},
	material_sten_vnesh_obhifka: {
		type: String,
		label: "Материал стен внешней обшифки",
		max: 200,
		optional: true
	},
	material_sten_vertical_stoiki_mezdy_polom_potolkom: {
		type: String,
		label: "Материал стен вертикальные стойки между полом и потолком",
		max: 200,
		optional: true
	},
	material_sten_verticalnie_stoiki: {
		type: String,
		label: "Материал стен вертикальные стойки",
		max: 200,
		optional: true
	},
	material_sten_yteplitel: {
		type: String,
		label: "Материал стен утеплитель",
		max: 200,
		optional: true
	},
	material_sten_vnytrennya_obshifka: {
		type: String,
		label: "Материал стен внутрення обшифка",
		max: 200,
		optional: true
	},
	krovla: {
		type: String,
		label: "Кровля",
		max: 200,
		optional: true
	},
	perekritia: {
		type: String,
		label: "Перекрытия",
		max: 200,
		optional: true
	},
	chislo_etozei: {
		type: String,
		label: "Число этажей",
		max: 200,
		optional: true
	},
	systema_otoplenia: {
		type: String,
		label: "Система отопления",
		max: 200,
		optional: true
	},
	nalichie_vodoprovoda: {
		type: String,
		label: "Наличие водопровода",
		max: 200,
		optional: true
	},
	nalichie_kanalizacii: {
		type: String,
		label: "Наличие канализации",
		max: 200,
		optional: true
	},
	kybatura: {
		type: String,
		label: "Кубатура",
		max: 200,
		optional: true
	},
	organizaciya: {
		type: String,
		label: "Организация",
		max: 200,
		optional: true
	},
	sistema_ventilacii: {
		type: String,
		label: "Система вентиляции",
		max: 200,
		optional: true
	},
	gazosnabzenie: {
		type: String,
		label: "Газоснабжение",
		max: 200,
		optional: true
	},
	sistema_gorachego_vodosnabzenie: {
		type: String,
		label: "Система горячего водоснабженияование",
		max: 200,
		optional: true
	}
});

TechZdanias.attachSchema(Schemas.TechZdania);

// права на изменение базы тех. зданий
TechZdanias.allow({
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