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
	name: 'dashboard'
})
// маршрут списка складов
Router.route('/sklads',{
	name: 'skladList',
	waitOn: function() { 
    	return Meteor.subscribe('Sklads');
  	}
})
// маршрут для редактирования склада
Router.route('/sklads/:_id',{
	name: 'updateSkladForm',
	waitOn: function () {
		return Meteor.subscribe('singleSklad', this.params._id);
	},
	data: function() { return Sklads.findOne(this.params._id); }
})
// маршрут для добавления склада
Router.route('/sklad',{
	name: 'insertSkladForm'
})
// маршрут профиля пользователя
Router.route('/profile',{
	name: 'profile',
	data: function() { return Meteor.users.findOne(Meteor.userId()); }
})
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

// маршрут списка АФУ
Router.route('/AFYs',{
	name: 'AFYList',
	waitOn: function() { 
    	return Meteor.subscribe('AFYs');
  	}
})
// маршрут для редактирования АФУ
Router.route('/AFYs/:_id',{
	name: 'updateAFYForm',
	waitOn: function () {
		return Meteor.subscribe('singleAFY', this.params._id);
	},
	data: function() { return AFYs.findOne(this.params._id); }
})
// маршрут для добавления АФУ
Router.route('/AFY',{
	name: 'insertAFYForm'
})

// маршрут списка аварий
Router.route('/Alarms',{
	name: 'AlarmList',
	waitOn: function() { 
    	return Meteor.subscribe('Alarms');
  	}
})
// маршрут для редактирования аварий
Router.route('/Alarms/:_id',{
	name: 'updateAlarmForm',
	waitOn: function () {
		return Meteor.subscribe('singleAlarm', this.params._id);
	},
	data: function() { return Alarms.findOne(this.params._id); }
})
// маршрут для добавления аварий
Router.route('/Alarm',{
	name: 'insertAlarmForm'
})

// маршрут списка АМС
Router.route('/AMSs',{
	name: 'AMSList',
	waitOn: function() { 
    	return Meteor.subscribe('AMSs');
  	}
})
// маршрут для редактирования АМС
Router.route('/AMSs/:_id',{
	name: 'updateAMSForm',
	waitOn: function () {
		return Meteor.subscribe('singleAMS', this.params._id);
	},
	data: function() { return AMSs.findOne(this.params._id); }
})
// маршрут для добавления АМС
Router.route('/AMS',{
	name: 'insertAMSForm'
})

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
		return Meteor.subscribe('singleCex', this.params._id);
	},
	data: function() { return Cexs.findOne(this.params._id); }
})
// маршрут для добавления Цех
Router.route('/Cex',{
	name: 'insertCexForm'
})

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
		return Meteor.subscribe('singleLine', this.params._id);
	},
	data: function() { return Lines.findOne(this.params._id); }
})
// маршрут для добавления линий
Router.route('/Line',{
	name: 'insertLineForm'
})

// маршрут списка объектов эксплуатации
Router.route('/ObectExplyats',{
	name: 'ObectExplyatList',
	waitOn: function() { 
    	return Meteor.subscribe('ObectExplyats');
  	}
})
// маршрут для редактирования объекта эксплуатации
Router.route('/ObectExplyats/:_id',{
	name: 'updateObectExplyatForm',
	waitOn: function () {
		return Meteor.subscribe('singleObectExplyat', this.params._id);
	},
	data: function() { return ObectExplyats.findOne(this.params._id); }
})
// маршрут для добавления объекта эксплуатации
Router.route('/ObectExplyat',{
	name: 'insertObectExplyatForm'
})


// функция проверки авторизации
var requireLogin = function() {
  if (! Meteor.user()) {
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
	'AFYList',
	'updateAFYForm',
	'skladList',
	'updateSkladForm',
	'profile'
]});
// права модератора
Router.onBeforeAction(requireLoginModeratorAdmin, {only: [
	'insertSkladForm',
	'insertAFYForm'
]});
// права админа
Router.onBeforeAction(requireLoginAdmin, {only: [
	'setPasswordForm',
	'updateUserForm',
	'insertUserForm',
	'userList'

]});