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
		var alarmsInSklad = _.where(alarms, {mesto: obectExplyatId});
		return alarmsInSklad.length;
	},
	settingsListAlarm: function(){
		var obectExplyatId = this._id;
		var alarms = Alarms.find().fetch();
		var alarmsInSklad = _.where(alarms, {mesto: obectExplyatId});
		return {
			collection: alarmsInSklad,
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
