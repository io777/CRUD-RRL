// Конфигурация маршрутов
Router.configure({
	// основной шаблон
	layoutTemplate: 'layout',
	// шаблон загрузки
	loadingTemplate: 'loading',
	// не существующая страница
	notFoundTemplate: 'notFound',
});

// маршрут приборной панели
Router.route('/',{
	name: 'dashboard',
	waitOn: function() { 
		return [
			Meteor.subscribe('Users'),
			Meteor.subscribe('AMSs'),
			Meteor.subscribe('ObectExplyats'),
			Meteor.subscribe('Cizs'),
			Meteor.subscribe('Alarms'),
			Meteor.subscribe('AFYs')
		];
	}
})

//////////////////////////////////////////
//////////// Карта РРЛ ///////////////////
/////////////////////////////////////////

//маршрут карты РРЛ
Router.route('/map',{
	name: 'map',
	waitOn: function () {
		return [
			Meteor.subscribe('AMSs'),
			Meteor.subscribe('Lines'),
			Meteor.subscribe('ObectExplyats'),
			IRLibLoader.load('http://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU')
		];
	}
})

//////////////////////////////////////////
//////////// PRTO ///////////////////
/////////////////////////////////////////

// маршрут ПРТО описание
Router.route('/PRTOopisanie',{
	name: 'PRTOopisanie'
})

// маршрут ПРТО
Router.route('/PRTO/:_id',{
	name: 'PRTO',
	waitOn: function () {
		return [
			Meteor.subscribe('singleObectExplyat', this.params._id),
			Meteor.subscribe('AFYs')
		];
	},
	data: function() { return ObectExplyats.findOne(this.params._id); }
})

// маршрут ПРТО DOC
Router.route('/PRTOdoc/:_id', {
	name: 'PRTOdoc',
	where: 'server',
	action: function(){
		var obectExplyat = ObectExplyats.findOne(this.params._id);
		console.log('получение ПРТО ' + obectExplyat.name);
		var headers = {
			'Content-type': 'html/doc',
			'charset': 'utf-8',
			'Content-Disposition': 'attachment; filename=' + obectExplyat.name + ".doc"
		};
		var afys = AFYs.find().fetch();
		var afysInObectExplyat = _.where(afys, {mesto: obectExplyat._id});
		var afysInObectExplyatPrd = _.filter(afysInObectExplyat, function(afy){ return afy.koll_pered > 0 });
		obectExplyatGod = function(){
			if(obectExplyat.god_vvoda_v_exsplyataz){
				return moment(obectExplyat.god_vvoda_v_exsplyataz).format('YYYY');
			}
		};
		SSR.compileTemplate('PRTOdoc', Assets.getText('prto_doc.html'));
		var PRTOdocHtml = SSR.render("PRTOdoc", {
			obectExplyat: obectExplyat,
			afysInObectExplyatPrd: afysInObectExplyatPrd,
			obectExplyatGod: obectExplyatGod
		});
		this.response.writeHead(200, headers);
		this.response.end(PRTOdocHtml);
	}
})

// маршрут ПРТО XLS
Router.route('/PRTOxls/:_id', {
	name: 'PRTOxls',
	where: 'server',
	action: function(){
		var obectExplyat = ObectExplyats.findOne(this.params._id);
		console.log('получение ПРТО ' + obectExplyat.name);
		var headers = {
			'Content-type': 'html/xls',
			'charset': 'utf-8',
			'Content-Disposition': 'attachment; filename=' + obectExplyat.name + ".xls"
		};
		var afys = AFYs.find().fetch();
		var afysInObectExplyat = _.where(afys, {mesto: obectExplyat._id});
		var afysInObectExplyatPrd = _.filter(afysInObectExplyat, function(afy){ return afy.koll_pered > 0 });
		obectExplyatGod = function(){
			if(obectExplyat.god_vvoda_v_exsplyataz){
				return moment(obectExplyat.god_vvoda_v_exsplyataz).format('YYYY');
			}
		};
		SSR.compileTemplate('PRTOxls', Assets.getText('prto_xls.html'));
		Template.PRTOxls.helpers({
			time: function() {
				return new Date().toString();
			},
			mestoRazmeshenie: function(value){
				if (Sklads.findOne({_id: value})){
					var skladOne = Sklads.findOne({_id: value});
					return skladOne.adress;
				};
				if (ObectExplyats.findOne({_id: value})){
					var obectExplyatOne = ObectExplyats.findOne({_id: value});
					return obectExplyatOne.adress;
				};
			}
		});
		var PRTOxlsHtml = SSR.render('PRTOxls', {
			obectExplyat: obectExplyat, 
			afysInObectExplyatPrd: afysInObectExplyatPrd,
			obectExplyatGod: obectExplyatGod
		});
		this.response.writeHead(200, headers);
		this.response.end(PRTOxlsHtml);
	}
})


//////////////////////////////////////////
//////////// Izmerenie ///////////////////
/////////////////////////////////////////

// маршрут измерений
Router.route('/IzmereniePamytka',{
	name: 'IzmereniePamytka',
})

// маршрут измерений
Router.route('/Izmerenie',{
	name: 'Izmerenie',
	waitOn: function() { 
		return Meteor.subscribe('ObectExplyats');
	}
})

//////////////////////////////////////////
//////////// TypeCizs ///////////////////
/////////////////////////////////////////

// маршрут списка типов СИЗ
Router.route('/TypeCizs',{
	name: 'TypeCizList',
	waitOn: function() { 
		return Meteor.subscribe('TypeCizs');
	}
})
// маршрут для редактирования типов СИЗ
Router.route('/TypeCizs/:_id',{
	name: 'updateTypeCizForm',
	waitOn: function () {
		return Meteor.subscribe('singleTypeCiz', this.params._id);
	},
	data: function() { return TypeCizs.findOne(this.params._id); }
})
// маршрут для добавления типов СИЗ
Router.route('/TypeCiz',{
	name: 'insertTypeCizForm'
})

//////////////////////////////////////////
//////////// Sklad //////////////////////
/////////////////////////////////////////

// маршрут списка складов
Router.route('/sklads',{
	name: 'skladList',
	waitOn: function() { 
		return [
			Meteor.subscribe('Sklads')
		];
	}
})
// маршрут для редактирования склада
Router.route('/sklads/:_id',{
	name: 'updateSkladForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleSklad', this.params._id),
			Meteor.subscribe('AMSs'),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats'),
			Meteor.subscribe('Lines'),
			Meteor.subscribe('TechZdanias'),
			Meteor.subscribe('AFYs'),
			Meteor.subscribe('StancionOboryds'),
			Meteor.subscribe('Cizs'),
			Meteor.subscribe('TypeCizs'),
			Meteor.subscribe('SpezOdezdas'),
			Meteor.subscribe('Materials')
		];
	},
	data: function() { return Sklads.findOne(this.params._id); }
})
// маршрут для добавления склада
Router.route('/sklad',{
	name: 'insertSkladForm'
})

//////////////////////////////////////////
//////////// Profile //////////////////////
/////////////////////////////////////////

// маршрут профиля пользователя
Router.route('/profile',{
	name: 'profile'
})

//////////////////////////////////////////
//////////// User //////////////////////
/////////////////////////////////////////

// маршрут для списка пользователей
Router.route('/users',{
	name: 'userList',
	waitOn: function() { 
		return Meteor.subscribe('Users');
	}
	//data: function() { return Meteor.users.find({}); }
})

// маршрут для добавления пользователя
Router.route('/user',{
	name: 'insertUserForm'
})

// маршрут для редактирования пользователя
Router.route('/users/:_id',{
	name: 'updateUserForm',
	waitOn: function () {
		return Meteor.subscribe('singleUser', this.params._id);
	},
	data: function() { return Meteor.users.findOne(this.params._id); }
})

// маршрут для установки пароля пользователя
Router.route('/password/:_id',{
	name: 'setPasswordForm',
	waitOn: function() {
		return Meteor.subscribe('singleUser', this.params._id);
	},
	data: function() { return Meteor.users.findOne(this.params._id); }
})

//////////////////////////////////////////
//////////// AFY //////////////////////
/////////////////////////////////////////

// маршрут списка АФУ
Router.route('/AFYs',{
	name: 'AFYList',
	waitOn: function() { 
		return [
			Meteor.subscribe('AFYs'),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats')
		];
	}
})
// маршрут для редактирования АФУ
Router.route('/AFYs/:_id',{
	name: 'updateAFYForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleAFY', this.params._id),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats')
		];
	},
	data: function() { return AFYs.findOne(this.params._id); }
})
// маршрут для добавления АФУ
Router.route('/AFY',{
	name: 'insertAFYForm',
	waitOn: function() { 
		return [
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats')
		];
	}
})

//////////////////////////////////////////
//////////// Alarm //////////////////////
/////////////////////////////////////////

// маршрут списка аварий
Router.route('/Alarms',{
	name: 'AlarmList',
	waitOn: function() { 
		return [
			Meteor.subscribe('Alarms'),
			Meteor.subscribe('ObectExplyats')
		];
	}
})
// маршрут для редактирования аварий
Router.route('/Alarms/:_id',{
	name: 'updateAlarmForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleAlarm', this.params._id),
			Meteor.subscribe('ObectExplyats')
		];
	},
	data: function() { return Alarms.findOne(this.params._id); }
})
// маршрут для добавления аварий
Router.route('/Alarm',{
	name: 'insertAlarmForm',
	waitOn: function () {
		return [
			Meteor.subscribe('ObectExplyats')
		];
	}
})

//////////////////////////////////////////
//////////// AMS //////////////////////
/////////////////////////////////////////

// маршрут списка АМС
Router.route('/AMSs',{
	name: 'AMSList',
	waitOn: function() { 
		return [
			Meteor.subscribe('AMSs'),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats'),
			Meteor.subscribe('Lines')
		];
	}
})
// маршрут для редактирования АМС
Router.route('/AMSs/:_id',{
	name: 'updateAMSForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleAMS', this.params._id),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats'),
			Meteor.subscribe('Lines')
		];
	},
	data: function() { return AMSs.findOne(this.params._id); }
})
// маршрут для добавления АМС
Router.route('/AMS',{
	name: 'insertAMSForm',
	waitOn: function() { 
		return [
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats')
		];
	}
})

//////////////////////////////////////////
//////////// Cex //////////////////////
/////////////////////////////////////////

// маршрут списка Цех
Router.route('/Cexs',{
	name: 'CexList',
	waitOn: function() { 
		return Meteor.subscribe('Cexs');
	}
})
// маршрут для редактирования Цех
Router.route('/Cexs/:_id',{
	name: 'updateCexForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleCex', this.params._id),
			Meteor.subscribe('Workers')
		]
	},
	data: function() { return Cexs.findOne(this.params._id); }
})
// маршрут для добавления Цех
Router.route('/Cex',{
	name: 'insertCexForm'
})

//////////////////////////////////////////
//////////// Ciz //////////////////////
/////////////////////////////////////////

// маршрут списка СИЗ
Router.route('/Cizs',{
	name: 'CizList',
	waitOn: function() { 
		return [
			Meteor.subscribe('Cizs'),
			Meteor.subscribe('TypeCizs'),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats'),
			Meteor.subscribe('Workers')
		];
	}
})
// маршрут для редактирования СИЗ
Router.route('/Cizs/:_id',{
	name: 'updateCizForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleCiz', this.params._id),
			Meteor.subscribe('TypeCizs'),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats'),
			Meteor.subscribe('Workers')
		];
	},
	data: function() { return Cizs.findOne(this.params._id); }
})
// маршрут для добавления СИЗ
Router.route('/Ciz',{
	name: 'insertCizForm',
	waitOn: function() { 
		return [
			Meteor.subscribe('TypeCizs'),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats'),
			Meteor.subscribe('Workers')
		];
	}
})

//////////////////////////////////////////
//////////// Line //////////////////////
/////////////////////////////////////////

// маршрут списка линий
Router.route('/Lines',{
	name: 'LineList',
	waitOn: function() { 
		return Meteor.subscribe('Lines');
	}
})
// маршрут для редактирования линий
Router.route('/Lines/:_id',{
	name: 'updateLineForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleLine', this.params._id),
			Meteor.subscribe('AMSs')
		];
	},
	data: function() { return Lines.findOne(this.params._id); }
})
// маршрут для добавления линий
Router.route('/Line',{
	name: 'insertLineForm',
	waitOn: function() { 
		return Meteor.subscribe('AMSs');
	}
})

//////////////////////////////////////////
//////////// ObectExplyat/////////////////
/////////////////////////////////////////

// маршрут списка объектов эксплуатации
Router.route('/ObectExplyats',{
	name: 'ObectExplyatList',
	waitOn: function() { 
		return [
			Meteor.subscribe('ObectExplyats'),
			Meteor.subscribe('Lines'),
			Meteor.subscribe('Workers')
		];
	}
})
// маршрут для редактирования объекта эксплуатации
Router.route('/ObectExplyats/:_id',{
	name: 'updateObectExplyatForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleObectExplyat', this.params._id),
			Meteor.subscribe('Lines'),
			Meteor.subscribe('Workers'),
			Meteor.subscribe('Alarms'),
			Meteor.subscribe('AMSs'),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('TechZdanias'),
			Meteor.subscribe('AFYs'),
			Meteor.subscribe('ObectExplyats'),
			Meteor.subscribe('StancionOboryds'),
			Meteor.subscribe('Cizs'),
			Meteor.subscribe('TypeCizs'),
			Meteor.subscribe('Materials')
		];
	},
	data: function() { return ObectExplyats.findOne(this.params._id); }
})
// маршрут для добавления объекта эксплуатации
Router.route('/ObectExplyat',{
	name: 'insertObectExplyatForm',
	waitOn: function() { 
		return [
			Meteor.subscribe('Lines'),
			Meteor.subscribe('Workers')
		];
	}
})

//////////////////////////////////////////
//////////// TechZdania///////////////////
/////////////////////////////////////////

// маршрут списка тех.зданий
Router.route('/TechZdanias',{
	name: 'TechZdaniaList',
	waitOn: function() { 
		return [
			Meteor.subscribe('TechZdanias'),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats')
		];
	}
})
// маршрут для редактирования тех.зданий
Router.route('/TechZdanias/:_id',{
	name: 'updateTechZdaniaForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleTechZdania', this.params._id),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats')
		];
	},
	data: function() { return TechZdanias.findOne(this.params._id); }
})
// маршрут для добавления тех.зданий
Router.route('/TechZdania',{
	name: 'insertTechZdaniaForm',
	waitOn: function () {
		return [
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats')
		];
	}
})

//////////////////////////////////////////
//////////// StancionOboryd///////////////
/////////////////////////////////////////

// маршрут списка станцион. оборуд.
Router.route('/StancionOboryds',{
	name: 'StancionOborydList',
	waitOn: function() { 
		return [
			Meteor.subscribe('StancionOboryds'),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats')
		];
	}
})
// маршрут для редактирования станцион. оборуд
Router.route('/StancionOboryds/:_id',{
	name: 'updateStancionOborydForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleStancionOboryd', this.params._id),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats')
		];
	},
	data: function() { return StancionOboryds.findOne(this.params._id); }
})
// маршрут для добавления станцион. оборуд
Router.route('/StancionOboryd',{
	name: 'insertStancionOborydForm',
	waitOn: function () {
		return [
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats')
		];
	}
})

//////////////////////////////////////////
//////////// Material/////////////////////
/////////////////////////////////////////

// маршрут списка матерьялов
Router.route('/Materials',{
	name: 'MaterialList',
	waitOn: function() { 
		return [
			Meteor.subscribe('Materials'),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats')
		]
	}
})
// маршрут для редактирования матерьялов
Router.route('/Materials/:_id',{
	name: 'updateMaterialForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleMaterial', this.params._id),
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats')
		]
	},
	data: function() { return Materials.findOne(this.params._id); }
})
// маршрут для добавления матерьялов
Router.route('/Material',{
	name: 'insertMaterialForm',
	waitOn: function () {
		return [
			Meteor.subscribe('Sklads'),
			Meteor.subscribe('ObectExplyats')
		];
	}
})

//////////////////////////////////////////
//////////// Worker//////////////////////
/////////////////////////////////////////

// маршрут списка работников
Router.route('/Workers',{
	name: 'WorkerList',
	waitOn: function() { 
		return [
			Meteor.subscribe('Workers'),
			Meteor.subscribe('Cexs')
		];
	}
})
// маршрут для редактирования работников
Router.route('/Workers/:_id',{
	name: 'updateWorkerForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleWorker', this.params._id),
			Meteor.subscribe('Cexs'),
			Meteor.subscribe('ObectExplyats'),
			Meteor.subscribe('Cizs'),
			Meteor.subscribe('TypeCizs'),
			Meteor.subscribe('SpezOdezdas'),
			Meteor.subscribe('Workers'),
			Meteor.subscribe('Lines')
		];
	},
	data: function() { return Workers.findOne(this.params._id); }
})
// маршрут для добавления работников
Router.route('/Worker',{
	name: 'insertWorkerForm',
	waitOn: function () {
		return [
			Meteor.subscribe('Cexs')
		];
	}
})

//////////////////////////////////////////
//////////// SpezOdezda///////////////////
/////////////////////////////////////////

// маршрут списка спец. одежды
Router.route('/SpezOdezdas',{
	name: 'SpezOdezdaList',
	waitOn: function() { 
		return [
			Meteor.subscribe('SpezOdezdas'),
			Meteor.subscribe('Workers'),
			Meteor.subscribe('Sklads')
		];
	}
})
// маршрут для редактирования спец. одежды
Router.route('/SpezOdezdas/:_id',{
	name: 'updateSpezOdezdaForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleSpezOdezda', this.params._id),
			Meteor.subscribe('Workers'),
			Meteor.subscribe('Sklads')
		];
	},
	data: function() { return SpezOdezdas.findOne(this.params._id); }
})
// маршрут для добавления спец. одежды
Router.route('/SpezOdezda',{
	name: 'insertSpezOdezdaForm',
	waitOn: function () {
		return [
			Meteor.subscribe('Workers'),
			Meteor.subscribe('Sklads')
		];
	}
})

//////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// функция проверки авторизации
var requireLogin = function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

// функция проверки авторизации и прав модератора и администратора
var requireLoginModeratorAdmin = function() {
	var loggedInUser = Meteor.user();
	if (!Meteor.user() || !Roles.userIsInRole(loggedInUser, ['admin','moderator'])) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
		this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

// функция проверки авторизации и прав администратора
var requireLoginAdmin = function() {
	var loggedInUser = Meteor.user();
	if (!Meteor.user() || !Roles.userIsInRole(loggedInUser, ['admin'])) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
		this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

// проверка прав перед переходом на страницу
Router.onBeforeAction(requireLogin, {only: [
	// AFY
	'AFYList',
	'updateAFYForm',
	// Sklad
	'skladList',
	'updateSkladForm',
	// Profile
	'profile',
	// map
	'map',
	// PRTOopisanie,
	'PRTOopisanie',
	// PRTO
	'PRTO',
	// PRTOdoc,
	// 'PRTOdoc',
	// PRTOxls
	// 'PRTOxls',
	// IzmereniePamytka
	'IzmereniePamytka',
	// Izmerenie
	'Izmerenie',
	// TypeCizList
	'TypeCizList',
	'updateTypeCizForm',
	// AlarmList
	'AlarmList',
	'updateAlarmForm',
	// AMSList
	'AMSList',
	'updateAMSForm',
	// CexList
	'CexList',
	'updateCexForm',
	// CizList
	'CizList',
	'updateCizForm',
	// LineList
	'LineList',
	'updateLineForm',
	// ObectExplyatList
	'ObectExplyatList',
	'updateObectExplyatForm',
	// TechZdaniaList
	'TechZdaniaList',
	'updateTechZdaniaForm',
	// StancionOborydList
	'StancionOborydList',
	'updateStancionOborydForm',
	// MaterialList
	'MaterialList',
	'updateMaterialForm',
	// WorkerList
	'WorkerList',
	'updateWorkerForm',
	// SpezOdezdaList
	'SpezOdezdaList',
	'updateSpezOdezdaForm'
]});
// права модератора
Router.onBeforeAction(requireLoginModeratorAdmin, {only: [
	'insertSkladForm',
	'insertAFYForm',
	'insertTypeCizForm',
	'insertAlarmForm',
	'insertAMSForm',
	'insertCexForm',
	'insertCizForm',
	'insertLineForm',
	'insertObectExplyatForm',
	'insertTechZdaniaForm',
	'insertStancionOborydForm',
	'insertMaterialForm',
	'insertWorkerForm',
	'insertSpezOdezdaForm'
]});
// права админа
Router.onBeforeAction(requireLoginAdmin, {only: [
	'setPasswordForm',
	'updateUserForm',
	'insertUserForm',
	'userList'
]});