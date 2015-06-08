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
				{ key: 'name_adress', label: 'Адресс', sortable: true, hidden: true},
				{ key: 'inventari', label: 'Инв. номер', sortable: true },
				{
					key: 'mestoName',
					label: 'Место размещения',
					sortable: true,
					hidden: true
				},
				{ 
					key: '_id',
					label: 'Линия РРЛ',
					sortable: true,
					hidden: true,
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
				{ key: 'sever_shirot', label: 'Координаты размещения АМС (С.Ш.)', sortable: true },
				{ key: 'west_dolg', label: 'Координаты размещения АМС (В.Д.)', sortable: true },
				{ key: 'type_ams', label: 'Тип АМС (башня/мачта)', sortable: true },
				{ key: 'massa_ams', label: 'Масса АМС (кг)', sortable: true },
				{ key: 'konstryktiv_ams', label: 'Конструктив АМС (труба/уголок)', sortable: true },
				{ key: 'Visota_AMS', label: 'Высота АМС (м)', sortable: true },
				{ key: 'nagryzka', label: 'Проектная нагрузо-способность (кг)', sortable: true, hidden: true },
				{ key: 'ploshad_ams', label: 'Общая площадь АМС (м²)', sortable: true, hidden: true },
				{ key: 'visota_nad_zemley', label: 'Высота над уровнем земли (м)', sortable: true, hidden: true },
				{ key: 'visota_nad_morem', label: 'Высота над уровнем моря (м)', sortable: true, hidden: true },
				{ 
					key: 'god_vvoda_v_exsplyataz',
					label: 'Год ввода в экспл. (г)',
					sortable: true,
					fn: function(value){
						if(value){
							return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{ key: 'koll_yarysov_ottazek', label: 'Кол-во ярусов оттяжек (шт)', sortable: true, hidden: true },
				{ key: 'nalichie_gosexpertiz', label: 'Наличие гос экспертизы (есть/нет)', sortable: true, hidden: true },
				{ key: 'zashitnoe_pokritie_ams', label: 'Защитное покрытие АМС (год/оцинкована)', sortable: true },
				{ key: 'nalichie_lebedki', label: 'Наличие лебедки (тип)', sortable: true, hidden: true },
				{ key: 'protokol_izmerenia_osadok_fundamenta', label: 'Протокол измерения осадок фундаментов АМС (год)', sortable: true, hidden: true },
				{ key: 'protokol_izmerenia_otklonenia_stvola_AMS_ot_vertikali', label: 'Протокол измерения отклонения ствола АМС от вертикали (год)', sortable: true, hidden: true },
				{ key: 'protokol_izmerenia_yglovih_otkloneniy_AMS', label: 'Протокол измерения угловых отклонений АМС (год)', sortable: true, hidden: true },
				{ key: 'akt_revizii_AMS', label: 'Акт ревизии АМС (год)', sortable: true, hidden: true },
				{ key: 'akt_proverki_natazenia_v_ottazkah', label: 'Акт проверки монтажных натяжений в оттяжках (год)', sortable: true, hidden: true },
				{ key: 'akt_priemki_remotnih_rabot_na_AMS', label: 'Акт приемки ремонтных работ на АМС (год)', sortable: true, hidden: true },
				{ key: 'akt_defectnogo_sostoyania_AMS', label: 'Акт дефектного состояния АМС (год)', sortable: true, hidden: true },
				{ key: 'akt_priemki_rabot_po_kap_remonty_AMS', label: 'Акт приемки работ по капитальному ремонту АМС (год)', sortable: true, hidden: true },
				{ key: 'remont_fundamentov_AMS', label: 'Ремонт фундаментов АМС (год)', sortable: true, hidden: true },
				{ key: 'kap_remont_AMS_bez_pokraski', label: 'Капитальный ремонт АМС кроме покраски (год)', sortable: true, hidden: true },
				{ key: 'nalicie_proektnoi_doc', label: 'Наличие проектной документации на АМС (нет/место хранения)', sortable: true, hidden: true },
				{ key: 'tip_proekta_AMS', label: 'Тип проекта АМС (ГОСТ)', sortable: true, hidden: true },
				{ key: 'project_organization', label: 'Проектная организация', sortable: true, hidden: true },
				{ key: 'nalich_transport_seti', label: 'Наличие транспортной сети (ВОЛС/РРЛ/VSAT)', sortable: true, hidden: true },
				{ key: 'obiem_transportnoi_seti', label: 'Объем транспортной сети (STM/Мбит/сек/Е1)', sortable: true, hidden: true },
				{ key: 'nalichie_svidetelstva_na_pravo_sobstvennosti', label: 'Наличие свидетельства на право собственности (да/нет)', sortable: true, hidden: true },
				{ key: 'Vid_prava_na_zemel_ychastok', label: 'Вид прав на земельный участок(собственность/ аренда (аренда = договор, собственник))', sortable: true, hidden: true },
				{ key: 'nalichie_soglas_s_aviachieu', label: 'Наличие согласования с организациями области авиации (есть/нет)', sortable: true, hidden: true },
				{ key: 'nalichie_pasporta_som', label: 'Наличие паспорта СОМ (да/нет)', sortable: true, hidden: true },
				{ key: 'nalichie_sanepid_na_PRTO', label: 'Наличие санэпид заключения на эксплуатацию ПРТО (да/нет)', sortable: true, hidden: true },
				{ key: 'nalichie_pasporta_na_kontyr_zazemlenia_AMS', label: 'Наличие паспорта на контур заземления АМС (да/нет)', sortable: true, hidden: true },
				{ key: 'videlaemaya_moshnost_na_obekt', label: 'Выделенная мощность на объект (КВт)', sortable: true, hidden: true },
				{ key: 'fakt_potreb_moshnost', label: 'Фактически потребляемая мощность объектом (КВт)', sortable: true, hidden: true },
				{ key: 'MOL_dolznost', label: 'МОЛ должность', sortable: true, hidden: true },
				{ key: 'MOL_FIO', label: 'МОЛ ФИО', sortable: true, hidden: true },
				{ key: 'MOL_tel', label: 'МОЛ тел', sortable: true, hidden: true },
				{ key: 'Otvetstv_za_AMS_dolznost', label: 'Ответств. за АМС должность', sortable: true, hidden: true },
				{ key: 'Otvetstv_za_AMS_FIO', label: 'Ответств. за АМС ФИО', sortable: true, hidden: true },
				{ key: 'Otvetstv_za_AMS_tel', label: 'Ответств. за АМС тел', sortable: true, hidden: true },
				{ key: 'primechania_po_remonty', label: 'Примечания по ремонту', sortable: true, hidden: true }
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
					key: 'mestoName',
					label: 'Место размещения',
					sortable: true
				},
				{ 
					key: 'god_postroiki',
					label: 'Год постройки',
					sortable: true,
					fn: function(value){
						if(value){
							return moment(value).format('YYYY');
						}
					}
				},
				{ 
					key: 'god_pereoboryd',
					label: 'Год переоборудования',
					sortable: true,
					fn: function(value){
						if(value){
							return moment(value).format('YYYY');
						}
					}
				},
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
				{ key: 'type_oborydov', label: 'Тип оборудования', sortable: true},
				{ key: 'inventarniu_nomer', label: 'Инвентарный номер', sortable: true },
				{
					key: 'mestoName',
					label: 'Место размещения',
					sortable: true
				},
				{ key: 'freqvansi', label: 'Частоты (Мгц)', sortable: true },
				{ key: 'freqvansi_prd', label: 'Частота прд. (Мгц)', sortable: true},
				{ key: 'freqvansi_prm', label: 'Частота прм. (Мгц)', sortable: true },
				{ key: 'type_moduleshin', label: 'Тип модуляции', sortable: true },
				{ key: 'power_tx', label: 'Мощность прд. (Вт)', sortable: true},
				{ key: 'moshnost_na_vhode_antenn_wt', label: 'Мощность на входе антенн (Вт)', sortable: true},
				{ key: 'moshnost_na_vhode_antenn_Dbm', label: 'Мощность на входе антенн (Дбм)', sortable: true},
				{ key: 'poteri_AVT_AFT', label: 'Потери в АВТ / АФТ (Дбм)', sortable: true },
				{ key: 'ydelnie_poteri_na_metr', label: 'Удельные потери на метр (Дбм)', sortable: true},
				{ key: 'shirina_lycha', label: 'Ширина луча в азимутальной/вертикальной плоскости (град)', sortable: true, hidden: true },
				{ key: 'koll_pered', label: 'Количество прд. (шт.)', sortable: true},
				{ key: 'azimut_izluchenia', label: 'Азимут излучения (град.)', sortable: true },
				{ key: 'ygol_mesta', label: 'Угол места (град.)', sortable: true, hidden: true },
				{ key: 'visota_podvesa_antenn', label: 'Высота подвеса антенн (м)', sortable: true },
				{ key: 'visota_ot_krovli', label: 'Высота от кровли (м)', sortable: true, hidden: true },
				{ key: 'type_antenn_diametr', label: 'Тип антенн диаметр (м)', sortable: true},
				{ key: 'koeffcient_ysil_antenn', label: 'Коэффициент усил. антенн (дБi)', sortable: true, hidden: true },
				{ key: 'type_AVT_AFT', label: 'Тип АВТ / АФТ', sortable: true},
				{ key: 'sechenie', label: 'Сечение', sortable: true, hidden: true },
				{ key: 'dlinna_AVT_AFT', label: 'Длинна АВТ / АФТ (м)', sortable: true },
				{ key: 'vladelec_oboryd', label: 'Владелец оборудования', sortable: true },
				{ key: 'rezervir', label: 'Резервирование', sortable: true, hidden: true},
				{ key: 'koll_potokov', label: 'Колич. потоков (шт.)', sortable: true, hidden: true },
				{ key: 'primechanie', label: 'Примечание', sortable: true, hidden: true },
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
					key: 'mestoName',
					label: 'Место размещения',
					sortable: true
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
					key: 'mestoName',
					label: 'Место нахождения',
					sortable: true
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
						if(value){
							return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{ 
					key: 'dateSledPoverki',
					label: 'Дата следующей поверки',
					sortable: true,
					fn: function(value){
						if(value){
							return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{
					key: 'dateSledPoverki',
					label: 'Поверка',
					sortable: true,
					fn: function(value){
						nowDate = new Date();
						if(value == null){
							return new Spacebars.SafeString('<span class="label label-info">Не поверяется</span>');
						}else{
							if (nowDate > value){
								return new Spacebars.SafeString('<span class="label label-danger">Просрочено</span>');
							} else {
								return new Spacebars.SafeString('<span class="label label-success">Норма</span>');
							}
						}
					}
				}
			]
		};
	},
	SpezOdezdasCount: function(){
			var skladId = this._id;
			var spezOdezdas = SpezOdezdas.find().fetch();
			var spezOdezdasInSklad = _.where(spezOdezdas, {mesto: skladId});
			return spezOdezdasInSklad.length;
	},
	settingsListSpezOdezda: function(){
		var skladId = this._id;
		var spezOdezdas = SpezOdezdas.find().fetch();
		var spezOdezdasInSklad = _.where(spezOdezdas, {mesto: skladId});
		return {
			collection: spezOdezdasInSklad,
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
						return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg spezOdezda"></i></a>');
					}
				},
				{ 
					key: 'edit',
					//headerClass: 'col-md-1',
					label: 'Изменить / посмотреть',
					sortable: false,
					fn: function (value){
						return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg spezOdezda"></i></a>');
					}
				},
				{ key: 'naimenovanie_ciz', label: 'Наименование СИЗ', sortable: true},
				{
					key: 'mestoName',
					label: 'Место размещение',
					sortable: true
				},
				{ key: 'naklad_prihod', label: 'Номер накладной', sortable: true},
				{ key: 'sertificat_sootvetstvia', label: 'Сертификат соответствия', sortable: true},
				{ 
					key: 'data_prihoda',
					label: 'Дата прихода',
					sortable: true,
					fn: function(value){
						if(value){
							return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{ key: 'kolvo_prihoda', label: 'Количество прихода (шт)', sortable: true},
				{ 
					key: 'data_vidachi',
					label: 'Дата выдачи',
					sortable: true,
					fn: function(value){
						if(value){
							return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{ key: 'kolvo_vidachi', label: 'Количество выдачи (шт)', sortable: true},
				{ key: 'procent_iznosa_vidachi', label: 'Процент износа выдачи (%)', sortable: true},
				{ key: 'srock_noski', label: 'Срок носки', sortable: true},
				{ 
					key: 'data_vozvrata',
					label: 'Дата возврата',
					sortable: true,
					fn: function(value){
						if(value){
							return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{ key: 'kolvo_vozvrata', label: 'Количество возврата (шт)', sortable: true},
				{ key: 'procent_iznosa_vozvrata', label: 'Процент износа возврата (%)', sortable: true},
				{ key: 'primechanie', label: 'Примечание', sortable: true}
			]
		};
	},
	MaterialsCount: function(){
			var skladId = this._id;
			var materials = Materials.find().fetch();
			var materialsInSklad = _.where(materials, {mesto: skladId});
			return materialsInSklad.length;
	},
	settingsListMaterial: function(){
		var skladId = this._id;
		var materials = Materials.find().fetch();
		var materialsInSklad = _.where(materials, {mesto: skladId});
		return {
			collection: materialsInSklad,
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
						return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg material"></i></a>');
					}
				},
				{ 
					key: 'edit',
					//headerClass: 'col-md-1',
					label: 'Изменить / посмотреть',
					sortable: false,
					fn: function (value){
						return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg material"></i></a>');
					}
				},
				{ key: 'name', label: 'Наименование', sortable: true},
				{
					key: 'mestoName',
					label: 'Место размещения',
					sortable: true
				},
				{ key: 'kolvo', label: 'Количество', sortable: true},
				{ key: 'razmer', label: 'Размер', sortable: true},
				{ key: 'primechanie', label: 'Примечание', sortable: true}
			]
		};
	}
});

// редактировать материал
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var Material = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg material") {
			Router.go('updateMaterialForm', {_id: this._id});
		}
	}
});
// удалить материал
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var Material = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg material") {
			Materials.remove(Material._id, function(error){
				if(error){
					alertify.error("Ошибка!", error);
					console.log("Remove Error:", error);
				} else {
					alertify.success("Матерьял успешно удален!");
					console.log("Material Remove!");
				}
			});
		}
	}
});

// редактировать спец. одежду
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var SpezOdezda = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg spezOdezda") {
			Router.go('updateSpezOdezdaForm', {_id: this._id});
		}
	}
});

// удалить спец. одежду
Template.updateSkladForm.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var SpezOdezda = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg spezOdezda") {
			SpezOdezdas.remove(SpezOdezda._id, function(error){
				if(error){
					alertify.error("Ошибка!", error);
					console.log("Remove Error:", error);
				} else {
					alertify.success("Спец. одежда успешно удалена!");
					console.log("SpezOdezda Remove!");
				}
			});
		}
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
