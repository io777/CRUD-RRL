// Коллекция АМС
AMSs = new Mongo.Collection("AMSs");

var Schemas = {};

Schemas.AMS = new SimpleSchema({
	name_psevdo: {
		type: String,
		label: "Наименование",
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
	name_adress: {
		type: String,
		label: "Адресс",
		max: 200,
		optional: true
	},
	inventari: {
		type: String,
		label: "Инв. номер",
		max: 200,
		optional: true
	},
	sever_shirot: {
		type: String,
		label: "СШ",
		max: 200,
		optional: true
	},
	shirota_grad: {
		type: Number,
		label: "СШ град.",
		max: 10000000000000000,
		optional: true
	},
	shirota_minut: {
		type: Number,
		label: "СШ мин.",
		max: 10000000000000000,
		optional: true
	},
	shirota_second: {
		type: Number,
		label: "СШ сек.",
		max: 10000000000000000,
		optional: true
	},
	shirota_DD: {
		type: Number,
		label: "СШ для карты",
		max: 10000000000000000,
		optional: true
	},
	west_dolg: {
		type: String,
		label: "ВД",
		max: 200,
		optional: true
	},
	dolgota_grad: {
		type: Number,
		label: "ВД град.",
		max: 10000000000000000,
		optional: true
	},
	dolgota_minut: {
		type: Number,
		label: "ВД мин.",
		max: 10000000000000000,
		optional: true
	},
	dolgota_second: {
		type: Number,
		label: "ВД сек.",
		max: 10000000000000000,
		optional: true
	},
	dolgota_DD: {
		type: Number,
		label: "ВД для карты",
		max: 10000000000000000,
		optional: true
	},
	type_ams: {
		type: String,
		label: "Тип АМС",
		max: 200,
		optional: true
	},
	massa_ams: {
		type: String,
		label: "Масса АМС",
		max: 200,
		optional: true
	},
	konstryktiv_ams: {
		type: String,
		label: "Конструктив АМС",
		max: 200,
		optional: true
	},
	Visota_AMS: {
		type: String,
		label: "Высота АМС",
		max: 200,
		optional: true
	},
	nagryzka: {
		type: String,
		label: "Нагрузка",
		max: 200,
		optional: true
	},
	ploshad_ams: {
		type: String,
		label: "Площадь АМС",
		max: 200,
		optional: true
	},
	visota_nad_zemley: {
		type: String,
		label: "Высота над землей",
		max: 200,
		optional: true
	},
	visota_nad_morem: {
		type: String,
		label: "Высота над уровнем моря",
		max: 200,
		optional: true
	},
	god_vvoda_v_exsplyataz: {
		type: Date,
		label: "Год ввода в экспл.",
		max: 200,
		optional: true
	},
	koll_yarysov_ottazek: {
		type: String,
		label: "Колич. ярусов оттяжек",
		max: 200,
		optional: true
	},
	nalichie_gosexpertiz: {
		type: String,
		label: "Наличие гос. эспертизы",
		max: 200,
		optional: true
	},
	zashitnoe_pokritie_ams: {
		type: String,
		label: "Защитное покрытие АМС",
		max: 200,
		optional: true
	},
	nalichie_lebedki: {
		type: String,
		label: "Наличие лебедки",
		max: 200,
		optional: true
	},
	protokol_izmerenia_osadok_fundamenta: {
		type: String,
		label: "Протокол измерения осадков фундамента",
		max: 200,
		optional: true
	},
	protokol_izmerenia_otklonenia_stvola_AMS_ot_vertikali: {
		type: String,
		label: "Протокол измерения отклонения ствола АМС от вертикали",
		max: 200,
		optional: true
	},
	protokol_izmerenia_yglovih_otkloneniy_AMS: {
		type: String,
		label: "Протокол измерения угловых отклонений АМС",
		max: 200,
		optional: true
	},
	akt_revizii_AMS: {
		type: String,
		label: "Акт ревизии АМС",
		max: 200,
		optional: true
	},
	akt_proverki_natazenia_v_ottazkah: {
		type: String,
		label: "Акт проверки натяжения в оттяжках",
		max: 200,
		optional: true
	},
	akt_priemki_remotnih_rabot_na_AMS: {
		type: String,
		label: "Акт приемки рем. работ на АМС",
		max: 200,
		optional: true
	},
	akt_defectnogo_sostoyania_AMS: {
		type: String,
		label: "Акт дефектного состояния АМС",
		max: 200,
		optional: true
	},
	akt_priemki_rabot_po_kap_remonty_AMS: {
		type: String,
		label: "Акт приемки работ по кап. рем. АМС",
		max: 200,
		optional: true
	},
	remont_fundamentov_AMS: {
		type: String,
		label: "Ремонт фундаментов АМС",
		max: 200,
		optional: true
	},
	kap_remont_AMS_bez_pokraski: {
		type: String,
		label: "Кап. рем. АМС без покраски",
		max: 200,
		optional: true
	},
	nalicie_proektnoi_doc: {
		type: String,
		label: "Наличие проектной документации",
		max: 200,
		optional: true
	},
	tip_proekta_AMS: {
		type: String,
		label: "Тип проекта АМС",
		max: 200,
		optional: true
	},
	project_organization: {
		type: String,
		label: "Проектная организация",
		max: 200,
		optional: true
	},
	nalich_transport_seti: {
		type: String,
		label: "Наличие транспортной сети",
		max: 200,
		optional: true
	},
	obiem_transportnoi_seti: {
		type: String,
		label: "Объем транспортной сети",
		max: 200,
		optional: true
	},
	nalichie_svidetelstva_na_pravo_sobstvennosti: {
		type: String,
		label: "Наличие свидет. на право собств.",
		max: 200,
		optional: true
	},
	Vid_prava_na_zemel_ychastok: {
		type: String,
		label: "Вид права на земельный участок",
		max: 200,
		optional: true
	},
	nalichie_soglas_s_aviachieu: {
		type: String,
		label: "Наличие согласования с авиацией",
		max: 200,
		optional: true
	},
	nalichie_pasporta_som: {
		type: String,
		label: "Наличие паспорта СОМ",
		max: 200,
		optional: true
	},
	nalichie_sanepid_na_PRTO: {
		type: String,
		label: "Наличие санэпид. на ПРТО",
		max: 200,
		optional: true
	},
	nalichie_pasporta_na_kontyr_zazemlenia_AMS: {
		type: String,
		label: "Наличие паспорта на контур заземления АМС",
		max: 200,
		optional: true
	},
	videlaemaya_moshnost_na_obekt: {
		type: Number,
		label: "Выделяемая мощность на объект",
		max: 10000000000000000,
		optional: true
	},
	fakt_potreb_moshnost: {
		type: Number,
		label: "Фактич. потреб. мощность",
		max: 10000000000000000,
		optional: true
	},
	MOL_dolznost: {
		type: String,
		label: "МОЛ должность",
		max: 200,
		optional: true
	},
	MOL_FIO: {
		type: String,
		label: "МОЛ ФИО",
		max: 200,
		optional: true
	},
	MOL_tel: {
		type: String,
		label: "МОЛ тел",
		max: 200,
		optional: true
	},
	Otvetstv_za_AMS_dolznost: {
		type: String,
		label: "Ответств. за АМС должность",
		max: 200,
		optional: true
	},
	Otvetstv_za_AMS_FIO: {
		type: String,
		label: "Ответств. за АМС ФИО",
		max: 200,
		optional: true
	},
	Otvetstv_za_AMS_tel: {
		type: String,
		label: "Ответств. за АМС тел",
		max: 200,
		optional: true
	},
	primechania_po_remonty: {
		type: String,
		label: "Примечания по ремонту",
		max: 200,
		optional: true
	}
});

AMSs.attachSchema(Schemas.AMS);

// права на изменение базы АМС
AMSs.allow({
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