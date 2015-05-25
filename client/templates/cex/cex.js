Template.CexList.helpers({
		CexsCount: function(){
			return Cexs.find().count();
		},
		// настройки для reactiv table
		settings: function(){
			return {
				collection: Cexs,
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
					{ key: 'short_name', label: 'Короткое наименование', sortable: true},
					{ key: 'full_name', label: 'Полное наименование', sortable: true },
			]
			};
		}
});

Template.updateCexForm.helpers({
	WorkersCount: function(){
		var CexId = this._id;
		var workers = Workers.find().fetch();
		var workersInCex = _.where(workers, {cex: CexId});
		return workersInCex.length;
	},
	settingsListWorker: function(){
		var CexId = this._id;
		var workers = Workers.find().fetch();
		var workersInCex = _.where(workers, {cex: CexId});
		return {
				collection: workersInCex,
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
							return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg Worker"></i></a>');
						}
					},
					{ 
						key: 'edit',
						//headerClass: 'col-md-1',
						label: 'Изменить / посмотреть',
						sortable: false,
						fn: function (value){
							return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg Worker"></i></a>');
						}
					},
					{ key: 'Familia', label: 'Фамилия', sortable: true},
					{ key: 'Name', label: 'Имя', sortable: true},
					{ key: 'Otchestvo', label: 'Отчество', sortable: true},
					{ key: 'nomerKarti', label: 'Номер карты', sortable: true},
					{
						key: 'cex',
						label: 'Цех',
						sortable: true,
						fn: function(value){
							if (Cexs.findOne({_id: value})){
								var cexOne = Cexs.findOne({_id: value});
								return cexOne.full_name;
							};
						}
					},
					{ key: 'tabel_nomer', label: 'Табельный номер', sortable: true},
					{ 
						key: 'data_postyplenia_na_raboty',
						label: 'Дата поступления на работу',
						sortable: true,
						fn: function(value){
							if(value){
								return moment(value).format('DD.MM.YYYY');
							}
						}
					},
					{ key: 'pol', label: 'Пол', sortable: true},
					{ key: 'rost', label: 'Рост', sortable: true},
					{ key: 'razmer_odezdi', label: 'Размер одежды', sortable: true},
					{ key: 'razmer_obyvi', label: 'Размер обуви', sortable: true},
					{ key: 'razmer_golovnogo_ubora', label: 'Размер головного убора', sortable: true},
					{ key: 'tel', label: 'Телефон', sortable: true},
					{ key: 'tel_rab', label: 'Рабочий телефон', sortable: true},
					{ key: 'dolznost', label: 'Должность', sortable: true},
					{ key: 'podpis', label: 'Подпись', sortable: true}
				]
		};
	}
});

// редактировать работника
Template.updateCexForm.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var Worker = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg Worker") {
			Router.go('updateWorkerForm', {_id: this._id});
		}
	}
});
// удалить работника
Template.updateCexForm.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var Worker = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg Worker") {
				Workers.remove(Worker._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("Работник успешно удален!");
						console.log("Worker Remove!");
					}
				});
		}
	}
});

// редактировать цех
Template.CexList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var Cex = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateCexForm', {_id: this._id});
		}
	}
});
// удалить цех
Template.CexList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var Cex = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
				Cexs.remove(Cex._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("Цех успешно удален!");
						console.log("Cex Remove!");
					}
				});
		}
	}
});
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertCexForm', 'updateCexForm'], {
		after: {
			insert: function(error, result) {
				if (error) {
					alertify.error("Ошибка!", error);
						console.log("Insert Error:", error);
				} else {
					Router.go('CexList');
					alertify.success("Цех успешно добавлен!");
					console.log("Insert Result:", result);
				}
			},
			update: function(error) {
				if (error) {
					alertify.error("Ошибка!", error);
					console.log("Update Error:", error);
				} else {
					Router.go('CexList');
					alertify.success("Цех успешно изменен!");
					console.log("Updated!");
				}
			}
		}
	});
