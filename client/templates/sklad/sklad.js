Template.skladList.helpers({
		// настройки для reactiv table
		SkladsCount: function(){
			return Sklads.find().count();
		},
		settings: function(){
			return {
				collection: Sklads,
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
					{ key: 'nomerKarti', label: 'Номер карты', sortable: true},
					{ key: 'adress', label: 'Адресс', sortable: true },
					{ key: 'primechanie', label: 'Примечание', sortable: true }
				]
			};
		}
});

Template.updateSkladForm.helpers({
		AMSsCount: function(){
			var skladId = this._id;
			var amss = AMSs.find().fetch();
			var amsInSklad = _.where(amss, {mesto: skladId});
			return amsInSklad.length;
		},
		settingsListAMS: function(){
			var skladId = this._id;
			var amss = AMSs.find().fetch();
			var amsInSklad = _.where(amss, {mesto: skladId});
			return {
				collection: amsInSklad,
				rowsPerPage: 5,
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
							return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg AMS"></i></a>');
						}
					},
					{ 
						key: 'edit',
						//headerClass: 'col-md-1',
						label: 'Изменить / посмотреть',
						sortable: false,
						fn: function (value){
							return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg AMS"></i></a>');
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
							var currentLineId = value;
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
		},
		TechZdaniasCount: function(){
			var skladId = this._id;
			var techZdanias = TechZdanias.find().fetch();
			var techZdaniaInSklad = _.where(techZdanias, {mesto: skladId});
			return techZdaniaInSklad.length;
		},
		settingsListTechZdania: function(){
			var skladId = this._id;
			var techZdanias = TechZdanias.find().fetch();
			var techZdaniaInSklad = _.where(techZdanias, {mesto: skladId});
			return {
				collection: techZdaniaInSklad,
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
							return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg techZdania"></i></a>');
						}
					},
					{ 
						key: 'edit',
						//headerClass: 'col-md-1',
						label: 'Изменить / посмотреть',
						sortable: false,
						fn: function (value){
							return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg techZdania"></i></a>');
						}
					},
					{ key: 'adress', label: 'Адресс', sortable: true},
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
					{ key: 'god_postroiki', label: 'Год постройки', sortable: true},
					{ key: 'god_pereoboryd', label: 'Год переоборудования', sortable: true},
					{ key: 'krovla', label: 'Кровля', sortable: true},
					{ key: 'perekritia', label: 'Перекрытия', sortable: true},
					{ key: 'chislo_etozei', label: 'Число этажей', sortable: true},
					{ key: 'kybatura', label: 'Кубатура', sortable: true},
					{ key: 'organizaciya', label: 'Организация', sortable: true},
					{ key: 'nalichie_kanalizacii', label: 'Наличие канализации', sortable: true}
			  ]
			};
		},
		AFYsCount: function(){
			var skladId = this._id;
			var afys = AFYs.find().fetch();
			var afysInSklad = _.where(afys, {mesto: skladId});
			return afysInSklad.length;
		},
		settingsListAFY: function(){
			var skladId = this._id;
			var afys = AFYs.find().fetch();
			var afysInSklad = _.where(afys, {mesto: skladId});
			return {
				collection: afysInSklad,
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
							return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg AFY"></i></a>');
						}
					},
					{ 
						key: 'edit',
						//headerClass: 'col-md-1',
						label: 'Изменить / посмотреть',
						sortable: false,
						fn: function (value){
							return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg AFY"></i></a>');
						}
					},
					{ key: 'napravlenie', label: 'Направление', sortable: true},
					{ key: 'inventarniu_nomer', label: 'Инвентарный номер', sortable: true },
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
					{ key: 'freqvansi', label: 'Частота', sortable: true },
					{ key: 'freqvansi_prd', label: 'Частота прд.', sortable: true},
					{ key: 'freqvansi_prm', label: 'Частота прм.', sortable: true },
					{ key: 'type_moduleshin', label: 'Тип модуляции', sortable: true },
					{ key: 'power_tx', label: 'Мощность прд.', sortable: true},
					{ key: 'poteri_AVT_AFT', label: 'Потери в АВТ / АФТ', sortable: true },
					{ key: 'primechanie', label: 'Примечание', sortable: true },
					{ key: 'ydelnie_poteri_na_metr', label: 'Удельные потери на метр', sortable: true},
					{ key: 'shirina_lycha', label: 'Ширина луча', sortable: true },
					{ key: 'koll_pered', label: 'Количество прд.', sortable: true},
					{ key: 'azimut_izluchenia', label: 'Азимут излучения', sortable: true },
					{ key: 'visota_podvesa_antenn', label: 'Высота подвеса антенн', sortable: true },
					{ key: 'type_antenn_diametr', label: 'Тип антенн диаметр', sortable: true},
					{ key: 'koeffcient_ysil_antenn', label: 'Коэффициент усил. антенн', sortable: true },
					{ key: 'type_AVT_AFT', label: 'Тип АВТ / АФТ', sortable: true},
					{ key: 'sechenie', label: 'Сечение', sortable: true },
					{ key: 'dlinna_AVT_AFT', label: 'Длинна АВТ / АФТ', sortable: true },
					{ key: 'moshnost_na_vhode_antenn', label: 'Мощность на входе антенн', sortable: true},
					{ key: 'vladelec_oboryd', label: 'Владелец оборудования', sortable: true },
					{ key: 'rezervir', label: 'Резервирование', sortable: true},
					{ key: 'koll_potokov', label: 'Колич. потоков', sortable: true },
					{ key: 'razmeshenie', label: 'Размещение', sortable: true }
				]
			};
		},
		StancionOborydsCount: function(){
			var skladId = this._id;
			var stancionOboryds = StancionOboryds.find().fetch();
			var stancionOborydInSklad = _.where(stancionOboryds, {mesto: skladId});
			return stancionOborydInSklad.length;
		},
		settingsListStancionOboryd: function(){
			var skladId = this._id;
			var stancionOboryds = StancionOboryds.find().fetch();
			var stancionOborydInSklad = _.where(stancionOboryds, {mesto: skladId});
			return {
				collection: stancionOborydInSklad,
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
							return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg stancionOboryd"></i></a>');
						}
					},
					{ 
						key: 'edit',
						//headerClass: 'col-md-1',
						label: 'Изменить / посмотреть',
						sortable: false,
						fn: function (value){
							return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg stancionOboryd"></i></a>');
						}
					},
					{ key: 'full_name', label: 'Наименование', sortable: true},
					{ key: 'inventari_nomer', label: 'Инвентарный номер', sortable: true},
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
					{ key: 'function_naznachenie', label: 'Функциональное назначение', sortable: true},
					{ key: 'decimal_nomer', label: 'Децимальный номер', sortable: true},
					{ key: 'serial_nomer', label: 'Серийный номер', sortable: true},
					{ key: 'adress', label: 'Адресс', sortable: true},
					{ key: 'primechanie', label: 'Примечание', sortable: true}
			  ]
			};
		},
		CizsCount: function(){
			var skladId = this._id;
			var cizs = Cizs.find().fetch();
			var cizsInSklad = _.where(cizs, {mesto: skladId});
			return cizsInSklad.length;
		},
		settingsListCiz: function(){
			var skladId = this._id;
			var cizs = Cizs.find().fetch();
			var cizsInSklad = _.where(cizs, {mesto: skladId});
			return {
				collection: cizsInSklad,
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
							return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg Ciz"></i></a>');
						}
					},
					{ 
						key: 'edit',
						//headerClass: 'col-md-1',
						label: 'Изменить / посмотреть',
						sortable: false,
						fn: function (value){
							return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg Ciz"></i></a>');
						}
					},
					{ 
						key: 'mesto',
						label: 'Место нахождения',
						sortable: true,
						fn: function(value){
							if (Sklads.findOne({_id: value})){
								var skladOne = Sklads.findOne({_id: value});
								return skladOne.name;
							};
							if (Workers.findOne({_id: value})){
								var workerOne = Workers.findOne({_id: value});
								return workerOne.Familia;
							};
							if (ObectExplyats.findOne({_id: value})){
								var obectExplyatOne = ObectExplyats.findOne({_id: value});
								return obectExplyatOne.name;
							};
						}
					},
					{ 
						key: 'mesto',
						label: 'Номер карты',
						sortable: true,
						fn: function(value){
							if (Sklads.findOne({_id: value})){
								var skladOne = Sklads.findOne({_id: value});
								return skladOne.nomerKarti;
							};
							if (Workers.findOne({_id: value})){
								var workerOne = Workers.findOne({_id: value});
								return workerOne.nomerKarti;
							};
							if (ObectExplyats.findOne({_id: value})){
								var obectExplyatOne = ObectExplyats.findOne({_id: value});
								return obectExplyatOne.nomerKarti;
							};
						}

					},
					{ key: 'number', label: 'Порядковый номер', sortable: true },
					{ 
						key: 'typeCiz',
						label: 'Тип СИЗ',
						sortable: true,
						fn: function (value) {
							var typeCizOne = TypeCizs.findOne({_id: value});
							return typeCizOne.name;
						}
					},
					{ key: 'nameCiz', label: 'Наименование СИЗ', sortable: true},
					{ key: 'periodPoverki', label: 'Период поверки (мес)', sortable: true},
					{ 
						key: 'datePoverki',
						label: 'Дата поверки',
						sortable: true,
						fn: function(value){
							return moment(value).format('DD.MM.YYYY');
						}
					},
					{ 
						key: 'dateSledPoverki',
						label: 'Дата следующей поверки',
						sortable: true,
						fn: function(value){
							return moment(value).format('DD.MM.YYYY');
						}
					},
					{
						key: 'dateSledPoverki',
						label: 'Поверка',
						sortable: true,
						fn: function(value){
							nowDate = new Date();
							if (nowDate > value){
								return new Spacebars.SafeString('<span class="label label-danger">Просрочено</span>');
							} else {
								return new Spacebars.SafeString('<span class="label label-success">Норма</span>');
							}
							
						}
					}
				]
			};
		}
});

// редактировать СИЗ
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var Ciz = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg Ciz") {
			Router.go('updateCizForm', {_id: this._id});
		}
	}
});

// удалить СИЗ
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var Ciz = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg Ciz") {
				Cizs.remove(Ciz._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("СИЗ успешно удалено!");
						console.log("Ciz Remove!");
					}
				});
		}
	}
});

// редактировать станционное. оборудование
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var StancionOboryd = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg stancionOboryd") {
			Router.go('updateStancionOborydForm', {_id: this._id});
		}
	}
});
// удалить станционное оборудование
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var StancionOboryd = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg stancionOboryd") {
				StancionOboryds.remove(StancionOboryd._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("Станцион. оборудование успешно удалено!");
						console.log("StancionOboryd Remove!");
					}
				});
		}
	}
});

// редактировать тех. здания
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var TechZdania = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg techZdania") {
			Router.go('updateTechZdaniaForm', {_id: this._id});
		}
	}
});
// удалить тех. здания
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var TechZdania = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg techZdania") {
				TechZdanias.remove(TechZdania._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("Тех. здание успешно удалено!");
						console.log("TechZdania Remove!");
					}
				});
		}
	}
});

// редактировать АМС
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var AMS = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg AMS") {
			Router.go('updateAMSForm', {_id: this._id});
		}
	}
});
// удалить АМС
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var AMS = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg AMS") {
				AMSs.remove(AMS._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("АМС успешно удалено!");
						console.log("AMS Remove!");
					}
				});
		}
	}
});

// редактировать АФУ
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var AFY = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg AFY") {
			Router.go('updateAFYForm', {_id: this._id});
		}
	}
});
// удалить АФУ
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var AFY = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg AFY") {
				AFYs.remove(AFY._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("АФУ успешно удалено!");
						console.log("AFY Remove!");
					}
				});
		}
	}
});

// редактировать склад
Template.skladList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var sklad = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateSkladForm', {_id: this._id});
		}
	}
});
// удалить склад
Template.skladList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var sklad = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
				Sklads.remove(sklad._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("Склад успешно удален!");
						console.log("Sklad Remove!");
					}
				});
		}
	}
});
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertSkladForm', 'updateSkladForm'], {
		after: {
			insert: function(error, result) {
				if (error) {
					alertify.error("Ошибка!", error);
						console.log("Insert Error:", error);
				} else {
					Router.go('skladList');
					alertify.success("Склад успешно добавлен!");
					console.log("Insert Result:", result);
				}
			},
			update: function(error) {
				if (error) {
					alertify.error("Ошибка!", error);
					console.log("Update Error:", error);
				} else {
					Router.go('skladList');
					alertify.success("Склад успешно изменен!");
					console.log("Updated!");
				}
			}
		}
});
