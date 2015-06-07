Template.WorkerList.helpers({
	WorkersCount: function(){
		return Workers.find().count();
	},
		// настройки для reactiv table
	settings: function(){
			return {
				collection: Workers,
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
					{ key: 'Familia', label: 'Фамилия', sortable: true},
					{ key: 'Name', label: 'Имя', sortable: true},
					{ key: 'Otchestvo', label: 'Отчество', sortable: true},
					{ key: 'nomerKarti', label: 'Номер карты', sortable: true},
					{
						key: 'cexName',
						label: 'Цех',
						sortable: true
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

Template.updateWorkerForm.helpers({
	ObectExplyatsCount: function(){
		var workerId = this._id;
		var obectExplyats = ObectExplyats.find().fetch();
		var obectExplyatsInWorker = _.where(obectExplyats, {otvetstvenniu: workerId});
		return obectExplyatsInWorker.length;
	},
	settingsListObectExplyat: function(){
		var workerId = this._id;
		var obectExplyats = ObectExplyats.find().fetch();
		var obectExplyatsInWorker = _.where(obectExplyats, {otvetstvenniu: workerId});
		return {
			collection: obectExplyatsInWorker,
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
						return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg obectExplyat"></i></a>');
					}
				},
				{ 
					key: 'edit',
					//headerClass: 'col-md-1',
					label: 'Изменить / посмотреть',
					sortable: false,
					fn: function (value){
						return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg obectExplyat"></i></a>');
					}
				},
				{ key: 'name', label: 'Наименование', sortable: true},
				{ key: 'setevoi_nomer', label: 'Сетевой номер', sortable: true },
				{ key: 'nomerKarti', label: 'Номер карты', sortable: true},
				{ 
					key: 'PRTO',
					label: 'ПРТО',
					sortable: true,
					fn: function(value){
						return new Spacebars.SafeString('<a class="label label-warning">ПРТО</a><br><a class="label label-success">exel</a><br><a class="label label-primary">doc</a>')
					}
				},
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
				{ key: 'adress', label: 'Адресс', sortable: true, hidden: true },
				{ key: 'rasstoyanie_do_osn_stancii', label: 'Расстояние до основной станции (км)', sortable: true },
				{ key: 'rasstoyanie_mezdy_stanciami', label: 'Расстояние между станциями (км)', sortable: true },
				{ 
					key: 'god_vvoda_v_exsplyataz',
					label: 'Год ввода в экспл.',
					sortable: true,
					fn: function(value){
						if(value){
						return moment(value).format('YYYY');
						}
					}
				},
				{ 
					key: 'COM_data',
					label: 'Измерение СОМ, дата',
					sortable: true,
					hidden: true,
					fn: function(value){
						if(value){
						return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{ key: 'COM_protokol', label: 'Измерение СОМ, протокол', sortable: true, hidden: true },
				{ 
					key: 'Metallosvazi_data',
					label: 'Измерение металлосвязи, дата',
					sortable: true,
					hidden: true,
					fn: function(value){
						if(value){
							return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{ key: 'Metallosvazi_protokol', label: 'Измерение металлосвязи, протокол', sortable: true, hidden: true },
				{ 
					key: 'Zazemlenia_data',
					label: 'Измерение заземления, дата',
					sortable: true,
					hidden: true,
					fn: function(value){
						if(value){
							return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{ key: 'Zazemlenia_protokol', label: 'Измерение заземления, протокол', sortable: true, hidden: true },
				{ 
					key: 'Petli_Faza_Null_data',
					label: 'Измерение петли фаза-ноль, дата',
					sortable: true,
					hidden: true,
					fn: function(value){
						if(value){
							return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{ key: 'Petli_Faza_Null_protokol', label: 'Измерение петли фаза-ноль, протокол', sortable: true, hidden: true }
			]
		};
	},
	CizsCount: function(){
		var workerId = this._id;
		var cizs = Cizs.find().fetch();
		var cizsInWorker = _.where(cizs, {mesto: workerId});
		return cizsInWorker.length;
	},
	settingsListCiz: function(){
		var workerId = this._id;
		var cizs = Cizs.find().fetch();
		var cizsInWorker = _.where(cizs, {mesto: workerId});
		return {
			collection: cizsInWorker,
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
	},
	SpezOdezdasCount: function(){
		var workerId = this._id;
		var spezOdezdas = SpezOdezdas.find().fetch();
		var spezOdezdasInWorker = _.where(spezOdezdas, {worker: workerId});
		return spezOdezdasInWorker.length;
	},
	settingsListSpezOdezda: function(){
		var workerId = this._id;
		var spezOdezdas = SpezOdezdas.find().fetch();
		var spezOdezdasInWorker = _.where(spezOdezdas, {worker: workerId});
		return {
			collection: spezOdezdasInWorker,
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
							return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg SpezOdezda"></i></a>');
						}
					},
					{ 
						key: 'edit',
						//headerClass: 'col-md-1',
						label: 'Изменить / посмотреть',
						sortable: false,
						fn: function (value){
							return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg SpezOdezda"></i></a>');
						}
					},
					{ key: 'naimenovanie_ciz', label: 'Наименование СИЗ', sortable: true},
					{
						key: 'mesto',
						label: 'Место размещение',
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
						}	
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
	}
});

// редактировать спец. одежду
Template.updateWorkerForm.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var SpezOdezda = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg SpezOdezda") {
			Router.go('updateSpezOdezdaForm', {_id: this._id});
		}
	}
});
// удалить спец. одежду
Template.updateWorkerForm.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var SpezOdezda = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg SpezOdezda") {
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
Template.updateWorkerForm.events({
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
Template.updateWorkerForm.events({
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

// редактировать объект эксплуатации
Template.updateWorkerForm.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var ObectExplyat = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg obectExplyat") {
			Router.go('updateObectExplyatForm', {_id: this._id});
		}
	}
});
// удалить объект эксплуатации
Template.updateWorkerForm.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var ObectExplyat = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg obectExplyat") {
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

// редактировать работника
Template.WorkerList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var Worker = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateWorkerForm', {_id: this._id});
		}
	}
});
// удалить работника
Template.WorkerList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var Worker = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
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
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertWorkerForm', 'updateWorkerForm'], {
	before: {
		insert: function(doc){
			if(AutoForm.getFieldValue("cex")){
				var cexId = AutoForm.getFieldValue("cex");
				if (Cexs.findOne({_id: cexId})){
					var cexOne = Cexs.findOne({_id: cexId});
					doc.cexName = cexOne.full_name;
				};
			}
			AutoForm.validateForm("insertWorkerForm");
			return doc;
		},
		update: function(doc){
			if(AutoForm.getFieldValue("cex")){
				var cexId = AutoForm.getFieldValue("cex");
				if (Cexs.findOne({_id: cexId})){
					var cexOne = Cexs.findOne({_id: cexId});
					doc.$set.cexName = cexOne.full_name;
				};
			}
			AutoForm.validateForm("updateWorkerForm");
			return doc;
		}
	},
	after: {
		insert: function(error, result) {
			if (error) {
				alertify.error("Ошибка!", error);
				console.log("Insert Error:", error);
			} else {
				Router.go('WorkerList');
				alertify.success("Работник успешно добавлен!");
				console.log("Insert Result:", result);
			}
		},
		update: function(error) {
			if (error) {
				alertify.error("Ошибка!", error);
				console.log("Update Error:", error);
			} else {
				Router.go('WorkerList');
				alertify.success("Работник успешно изменен!");
				console.log("Updated!");
			}
		}
	}
});
