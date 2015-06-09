// Коллекция АМС
AMSs = new Mongo.Collection("AMSs");

var Schemas = {};

Schemas.AMS = new SimpleSchema({
	name_psevdo: {
		type: String,
		label: "Наименование*",
		max: 200
	},
	mesto: {
		type: String,
		label: "Место нахождение",
		allowedValues: function () {
			var result = [];
			var sklads = Sklads.find();
			var obectExplyats = ObectExplyats.find();
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
			
				var sklads = Sklads.find();
				var obectExplyats = ObectExplyats.find();

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
	mestoName: {
		type: String,
		label: "Наименование место нахождения",
		optional: true
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
		label: "Координаты размещения АМС (С.Ш.)",
		max: 200,
		optional: true
	},
	shirota_grad: {
		type: Number,
		label: "СШ град.*",
		max: 10000000000000000,
	},
	shirota_minut: {
		type: Number,
		label: "СШ мин.*",
		max: 10000000000000000,
	},
	shirota_second: {
		type: Number,
		label: "СШ сек.*",
		max: 10000000000000000,
	},
	shirota_DD: {
		type: Number,
		decimal: true,
		label: "СШ для карты",
		max: 10000000000000000,
		optional: true
	},
	west_dolg: {
		type: String,
		label: "Координаты размещения АМС (В.Д.)",
		max: 200,
		optional: true
	},
	dolgota_grad: {
		type: Number,
		label: "ВД град.*",
		max: 10000000000000000,
	},
	dolgota_minut: {
		type: Number,
		label: "ВД мин.*",
		max: 10000000000000000,
	},
	dolgota_second: {
		type: Number,
		label: "ВД сек.*",
		max: 10000000000000000,
	},
	dolgota_DD: {
		type: Number,
		decimal: true,
		label: "ВД для карты",
		max: 10000000000000000,
		optional: true
	},
	type_ams: {
		type: String,
		label: "Тип АМС (башня/мачта)",
		max: 200,
		optional: true
	},
	massa_ams: {
		type: String,
		label: "Масса АМС (кг)",
		max: 200,
		optional: true
	},
	konstryktiv_ams: {
		type: String,
		label: "Конструктив АМС (труба/уголок)",
		max: 200,
		optional: true
	},
	Visota_AMS: {
		type: Number,
		label: "Высота АМС(м)*",
		max: 10000000000000000
	},
	nagryzka: {
		type: String,
		label: "Проектная нагрузо-способность (кг)",
		max: 200,
		optional: true
	},
	ploshad_ams: {
		type: String,
		label: "Общая площадь АМС (м²)",
		max: 200,
		optional: true
	},
	visota_nad_zemley: {
		type: String,
		label: "Высота над уровнем земли (м)",
		max: 200,
		optional: true
	},
	visota_nad_morem: {
		type: String,
		label: "Высота над уровнем моря (м)",
		max: 200,
		optional: true
	},
	god_vvoda_v_exsplyataz: {
		type: Date,
		label: "Год ввода в экспл. (г)",
		max: 200,
		optional: true
	},
	koll_yarysov_ottazek: {
		type: String,
		label: "Кол-во ярусов оттяжек (шт)",
		max: 200,
		optional: true
	},
	nalichie_gosexpertiz: {
		type: String,
		label: "Наличие гос экспертизы (есть/нет)",
		max: 200,
		optional: true
	},
	zashitnoe_pokritie_ams: {
		type: String,
		label: "Защитное покрытие АМС (год/оцинкована)",
		max: 200,
		optional: true
	},
	nalichie_lebedki: {
		type: String,
		label: "Наличие лебедки (тип)",
		max: 200,
		optional: true
	},
	protokol_izmerenia_osadok_fundamenta: {
		type: String,
		label: "Протокол измерения осадок фундаментов АМС (год)",
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
		label: "Протокол измерения угловых отклонений АМС (год)",
		max: 200,
		optional: true
	},
	akt_revizii_AMS: {
		type: String,
		label: "Акт ревизии АМС (год)",
		max: 200,
		optional: true
	},
	akt_proverki_natazenia_v_ottazkah: {
		type: String,
		label: "Акт проверки монтажных натяжений в оттяжках (год)",
		max: 200,
		optional: true
	},
	akt_priemki_remotnih_rabot_na_AMS: {
		type: String,
		label: "Акт приемки ремонтных работ на АМС (год)",
		max: 200,
		optional: true
	},
	akt_defectnogo_sostoyania_AMS: {
		type: String,
		label: "Акт дефектного состояния АМС (год)",
		max: 200,
		optional: true
	},
	akt_priemki_rabot_po_kap_remonty_AMS: {
		type: String,
		label: "Акт приемки работ по капитальному ремонту АМС (год)",
		max: 200,
		optional: true
	},
	remont_fundamentov_AMS: {
		type: String,
		label: "Ремонт фундаментов АМС(год)",
		max: 200,
		optional: true
	},
	kap_remont_AMS_bez_pokraski: {
		type: String,
		label: "Капитальный ремонт АМС кроме покраски (год)",
		max: 200,
		optional: true
	},
	nalicie_proektnoi_doc: {
		type: String,
		label: "Наличие проектной документации на АМС (нет/место хранения)",
		max: 200,
		optional: true
	},
	tip_proekta_AMS: {
		type: String,
		label: "Тип проекта АМС(ГОСТ)",
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
		label: "Наличие транспортной сети(ВОЛС/РРЛ/VSAT)",
		max: 200,
		optional: true
	},
	obiem_transportnoi_seti: {
		type: String,
		label: "Объем транспортной сети (STM/Мбит/сек/Е1)",
		max: 200,
		optional: true
	},
	nalichie_svidetelstva_na_pravo_sobstvennosti: {
		type: String,
		label: "Наличие свидетельства на право собственности (да/нет)",
		max: 200,
		optional: true
	},
	Vid_prava_na_zemel_ychastok: {
		type: String,
		label: "Вид прав на земельный участок (собственность/ аренда (аренда = договор, собственник))",
		max: 200,
		optional: true
	},
	nalichie_soglas_s_aviachieu: {
		type: String,
		label: "Наличие согласования с организациями области авиации (есть/нет)",
		max: 200,
		optional: true
	},
	nalichie_pasporta_som: {
		type: String,
		label: "Наличие паспорта СОМ (да/нет)",
		max: 200,
		optional: true
	},
	nalichie_sanepid_na_PRTO: {
		type: String,
		label: "Наличие санэпид заключения на эксплуатацию ПРТО (да/нет)",
		max: 200,
		optional: true
	},
	nalichie_pasporta_na_kontyr_zazemlenia_AMS: {
		type: String,
		label: "Наличие паспорта на контур заземления АМС (да/нет)",
		max: 200,
		optional: true
	},
	videlaemaya_moshnost_na_obekt: {
		type: Number,
		label: "Выделенная мощность на объект (КВт)",
		max: 10000000000000000,
		optional: true
	},
	fakt_potreb_moshnost: {
		type: Number,
		label: "Фактически потребляемая мощность объектом (КВт)",
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
		max: 1000,
		optional: true,
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
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