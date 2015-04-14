Template.ObectExplyatList.helpers({
	ObectExplyatsCount: function(){
		return ObectExplyats.find().count();
	},
	// настройки для reactiv table
	settings: function(){
			return {
				collection: ObectExplyats,
				rowsPerPage: 10,
				showFilter: true,
				showColumnToggles: true,
				class: 'table table-bordered table-hover col-sm-12',
				fields: [
					{ 
						key: 'delete',
						//headerClass: 'col-md-1',
						label: 'Удалить',
						hideToggle: true,
						sortable: false,
						hidden: function () {
							var loggedInUser = Meteor.user();
						if (!Roles.userIsInRole(loggedInUser, ['admin','moderator'])) {
									return true;
							}
						},
						fn: function (value){
							return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg"></i></a>');
						}
					},
					{ 
						key: 'edit',
						//headerClass: 'col-md-1',
						label: 'Изменить / посмотреть',
						sortable: false,
						fn: function (value){
							return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg"></i></a>');
						}
					},
					{ key: 'name', label: 'Наименование', sortable: true},
					{ key: 'setevoi_nomer', label: 'Сетевой номер', sortable: true },
					{ key: 'nomerKarti', label: 'Номер карты', sortable: true},
					{ 
						key: 'lineRRL',
						label: 'Линия РРЛ',
						sortable: true,
						fn: function (value){
							if (Lines.findOne({_id: value})){
								var lineOne = Lines.findOne({_id: value});
								return lineOne.name+" - "+lineOne.nomer;
							};
						}
					},
					{
						key: 'otvetstvenniu',
						label: 'Ответственный за объект',
						sortable: true,
						fn: function(value){
							if (Workers.findOne({_id: value})){
								var workerOne = Workers.findOne({_id: value});
								return workerOne.Familia;
							}
						}	
					},
					{ key: 'adress', label: 'Адресс', sortable: true },
					{ key: 'rasstoyanie_do_osn_stancii', label: 'Расстояние до основной станции (км)', sortable: true },
					{ key: 'rasstoyanie_mezdy_stanciami', label: 'Расстояние между станциями (км)', sortable: true },
					{ key: 'worker_Familia', label: 'Ответственный', sortable: true },
					{ key: 'COM_data', label: 'Измерение СОМ, дата', sortable: true },
					{ key: 'COM_protokol', label: 'Измерение СОМ, протокол', sortable: true },
					{ key: 'Metallosvazi_data', label: 'Измерение металлосвязи, дата', sortable: true },
					{ key: 'Metallosvazi_protokol', label: 'Измерение металлосвязи, протокол', sortable: true },
					{ key: 'Zazemlenia_data', label: 'Измерение заземления, дата', sortable: true },
					{ key: 'Zazemlenia_protokol', label: 'Измерение заземления, протокол', sortable: true },
					{ key: 'Petli_Faza_Null_data', label: 'Измерение петли фаза-ноль, дата', sortable: true },
					{ key: 'Petli_Faza_Null_protokol', label: 'Измерение петли фаза-ноль, протокол', sortable: true }
			]
			};
	}
});

Template.updateObectExplyatForm.helpers({
	AlarmsCount: function(){
		var obectExplyatId = this._id;
		var alarms = Alarms.find().fetch();
		var alarmsInObectExplyat = _.where(alarms, {mesto: obectExplyatId});
		return alarmsInObectExplyat.length;
	},
	settingsListAlarm: function(){
		var obectExplyatId = this._id;
		var alarms = Alarms.find().fetch();
		var alarmsInObectExplyat = _.where(alarms, {mesto: obectExplyatId});
		return {
			collection: alarmsInObectExplyat,
			rowsPerPage: 10,
			showFilter: true,
			showColumnToggles: true,
			class: 'table table-bordered table-hover col-sm-12',
			fields: [
				{ 
					key: 'delete',
					//headerClass: 'col-md-1',
					label: 'Удалить',
					hideToggle: true,
					sortable: false,
					hidden: function () {
						var loggedInUser = Meteor.user();
					if (!Roles.userIsInRole(loggedInUser, ['admin','moderator'])) {
								return true;
						}
					},
					fn: function (value){
						return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg alarm"></i></a>');
					}
				},
				{ 
					key: 'edit',
					//headerClass: 'col-md-1',
					label: 'Изменить / посмотреть',
					sortable: false,
					fn: function (value){
						return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg alarm"></i></a>');
					}
				},
				{ key: 'name', label: 'Наименование', sortable: true},
				{ key: 'type', label: 'Тип', sortable: true },
				{
					key: 'mesto',
					label: 'Место аварии',
					sortable: true,
					fn: function (value){
						if (ObectExplyats.findOne({_id: value})){
							var obectExplyatOne = ObectExplyats.findOne({_id: value});
							return obectExplyatOne.name;
						};
					}
				},
				{ key: 'primechanie', label: 'Примечание', sortable: true }
			]
		}
	},
	AMSsCount: function(){
		var obectExplyatId = this._id;
		var amss = AMSs.find().fetch();
		var amssInObectExplyat = _.where(amss, {mesto: obectExplyatId});
		return amssInObectExplyat.length;
	},
	settingsListAMS: function(){
		var obectExplyatId = this._id;
		var amss = AMSs.find().fetch();
		var amssInObectExplyat = _.where(amss, {mesto: obectExplyatId});
		return {
			collection: amssInObectExplyat,
			rowsPerPage: 10,
			showFilter: true,
			showColumnToggles: true,
			class: 'table table-bordered table-hover col-sm-12',
			fields: [
				{ 
					key: 'delete',
					//headerClass: 'col-md-1',
					label: 'Удалить',
					hideToggle: true,
					sortable: false,
					hidden: function () {
						var loggedInUser = Meteor.user();
					if (!Roles.userIsInRole(loggedInUser, ['admin','moderator'])) {
								return true;
						}
					},
					fn: function (value){
						return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg ams"></i></a>');
					}
				},
				{ 
					key: 'edit',
					//headerClass: 'col-md-1',
					label: 'Изменить / посмотреть',
					sortable: false,
					fn: function (value){
						return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg ams"></i></a>');
					}
				},
				{ key: 'name_psevdo', label: 'Наименование', sortable: true},
				{ key: 'name_adress', label: 'Адресс', sortable: true },
				{ key: 'inventari', label: 'Инв. номер', sortable: true },
				{
					key: 'mesto',
					label: 'Место размещения',
					sortable: true,
					fn: function (value){
						if (Sklads.findOne({_id: value})){
							var skladOne = Sklads.findOne({_id: value});
							return skladOne.name;
						};
						if (ObectExplyats.findOne({_id: value})){
							var obectExplyatOne = ObectExplyats.findOne({_id: value});
							return obectExplyatOne.name;
						};
					}
				},
				{ 
					key: '_id',
					label: 'Линия РРЛ',
					sortable: true,
					fn: function(value){
						var result = [];
						lines = Lines.find();
						lines.forEach(function(line){
							if(_.contains(line.ams, value.toString())){
								result.push(" "+line.name+" - "+line.nomer);
							}
						});
						return result;
					}
				 },
				{ key: 'obect_explyat_name', label: 'Место размещения (объект эксплуатации)', sortable: true },
				{ key: 'sever_shirot', label: 'СШ', sortable: true },
				{ key: 'west_dolg', label: 'ВД', sortable: true},
				{ key: 'type_ams', label: 'Тип АМС', sortable: true },
				{ key: 'massa_ams', label: 'Масса АМС', sortable: true },
				{ key: 'konstryktiv_ams', label: 'Конструктив АМС', sortable: true},
				{ key: 'Visota_AMS', label: 'Высота АМС', sortable: true },
				{ key: 'koll_pered', label: 'Количество прд.', sortable: true},
				{ key: 'nagryzka', label: 'Нагрузка', sortable: true },
				{ key: 'ploshad_ams', label: 'Площадь АМС', sortable: true },
				{ key: 'visota_nad_zemley', label: 'Высота над землей', sortable: true},
				{ key: 'visota_nad_morem', label: 'Высота над уровнем моря', sortable: true },
				{ key: 'god_vvoda_v_exsplyataz', label: 'Год ввода в экспл.', sortable: true },
				{ key: 'koll_yarysov_ottazek', label: 'Колич. ярусов оттяжек', sortable: true },
				{ key: 'nalichie_gosexpertiz', label: 'Наличие гос. эспертизы', sortable: true },
				{ key: 'zashitnoe_pokritie_ams', label: 'Защитное покрытие АМС', sortable: true },
				{ key: 'nalichie_lebedki', label: 'Наличие лебедки', sortable: true },
				{ key: 'protokol_izmerenia_osadok_fundamenta', label: 'Протокол измерения осадков фундамента', sortable: true },
				{ key: 'protokol_izmerenia_otklonenia_stvola_AMS_ot_vertikali', label: 'Протокол измерения отклонения ствола АМС от вертикали', sortable: true },
				{ key: 'protokol_izmerenia_yglovih_otkloneniy_AMS', label: 'Протокол измерения угловых отклонений АМС', sortable: true },
				{ key: 'akt_revizii_AMS', label: 'Акт ревизии АМС', sortable: true },
				{ key: 'akt_proverki_natazenia_v_ottazkah', label: 'Акт проверки натяжения в оттяжках', sortable: true },
				{ key: 'akt_priemki_remotnih_rabot_na_AMS', label: 'Акт приемки рем. работ на АМС', sortable: true },
				{ key: 'akt_defectnogo_sostoyania_AMS', label: 'Акт дефектного состояния АМС', sortable: true },
				{ key: 'akt_priemki_rabot_po_kap_remonty_AMS', label: 'Акт приемки работ по кап. рем. АМС', sortable: true },
				{ key: 'remont_fundamentov_AMS', label: 'Ремонт фундаментов АМС', sortable: true },
				{ key: 'kap_remont_AMS_bez_pokraski', label: 'Кап. рем. АМС без покраски', sortable: true },
				{ key: 'nalicie_proektnoi_doc', label: 'Наличие проектной документации', sortable: true },
				{ key: 'tip_proekta_AMS', label: 'Тип проекта АМС', sortable: true },
				{ key: 'project_organization', label: 'Проектная организация', sortable: true },
				{ key: 'nalich_transport_seti', label: 'Наличие транспортной сети', sortable: true },
				{ key: 'obiem_transportnoi_seti', label: 'Объем транспортной сети', sortable: true },
				{ key: 'nalichie_svidetelstva_na_pravo_sobstvennosti', label: 'Наличие свидет. на право собств.', sortable: true },
				{ key: 'Vid_prava_na_zemel_ychastok', label: 'Вид права на земельный участок', sortable: true },
				{ key: 'nalichie_soglas_s_aviachieu', label: 'Наличие согласования с авиацией', sortable: true },
				{ key: 'nalichie_pasporta_som', label: 'Наличие паспорта СОМ', sortable: true },
				{ key: 'nalichie_sanepid_na_PRTO', label: 'Наличие санэпид. на ПРТО', sortable: true },
				{ key: 'nalichie_pasporta_na_kontyr_zazemlenia_AMS', label: 'Наличие паспорта на контур заземления АМС', sortable: true },
				{ key: 'videlaemaya_moshnost_na_obekt', label: 'Выделяемая мощность на объект', sortable: true },
				{ key: 'fakt_potreb_moshnost', label: 'Фактич. потреб. мощность', sortable: true },
				{ key: 'MOL_dolznost', label: 'МОЛ должность', sortable: true },
				{ key: 'MOL_FIO', label: 'МОЛ ФИО', sortable: true },
				{ key: 'MOL_tel', label: 'МОЛ тел', sortable: true },
				{ key: 'Otvetstv_za_AMS_dolznost', label: 'Ответств. за АМС должность', sortable: true },
				{ key: 'Otvetstv_za_AMS_FIO', label: 'Ответств. за АМС ФИО', sortable: true },
				{ key: 'Otvetstv_za_AMS_tel', label: 'Ответств. за АМС тел', sortable: true },
				{ key: 'primechania_po_remonty', label: 'Примечания по ремонту', sortable: true }
			]
		};
	}
});

// редактировать АМС
Template.updateObectExplyatForm.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var AMS = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg ams") {
			Router.go('updateAMSForm', {_id: this._id});
		}
	}
});
// удалить АМС
Template.updateObectExplyatForm.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var AMS = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg ams") {
				AMSs.remove(AMS._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("АМС успешно удален!");
						console.log("AMS Remove!");
					}
				});
		}
	}
});

// редактировать аварию
Template.updateObectExplyatForm.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var Alarm = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg alarm") {
			Router.go('updateAlarmForm', {_id: this._id});
		}
	}
});
// удалить аварию
Template.updateObectExplyatForm.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var Alarm = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg alarm") {
				Alarms.remove(Alarm._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("Авария успешно удалена!");
						console.log("Alarm Remove!");
					}
				});
		}
	}
});

// редактировать объект эксплуатации
Template.ObectExplyatList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var ObectExplyat = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateObectExplyatForm', {_id: this._id});
		}
	}
});
// удалить объект эксплуатации
Template.ObectExplyatList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var ObectExplyat = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
				ObectExplyats.remove(ObectExplyat._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("Объект эксплуатации успешно удален!");
						console.log("ObectExplyat Remove!");
					}
				});
		}
	}
});
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertObectExplyatForm', 'updateObectExplyatForm'], {
		after: {
			insert: function(error, result) {
				if (error) {
					alertify.error("Ошибка!", error);
						console.log("Insert Error:", error);
				} else {
					Router.go('ObectExplyatList');
					alertify.success("Объект эксплуатации успешно добавлен!");
					console.log("Insert Result:", result);
				}
			},
			update: function(error) {
				if (error) {
					alertify.error("Ошибка!", error);
					console.log("Update Error:", error);
				} else {
					Router.go('ObectExplyatList');
					alertify.success("Объект эксплуатации успешно изменен!");
					console.log("Updated!");
				}
			}
		}
	});
