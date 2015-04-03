Template.CizList.helpers({
	CizsCount: function(){
		return Cizs.find().count();
	},
	// настройки для reactiv table
	settings: function(){
		return {
			collection: Cizs,
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

// редактировать цех
Template.CizList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var Ciz = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateCizForm', {_id: this._id});
		}
	}
});
// удалить цех
Template.CizList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var Ciz = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
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
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertCizForm', 'updateCizForm'], {
	before: {
		insert: function(doc) {
			if(AutoForm.getFieldValue("typeCiz") && AutoForm.getFieldValue("nameCiz")){
				var nameCiz = AutoForm.getFieldValue("nameCiz");
				var typeCizId = AutoForm.getFieldValue("typeCiz");
				try{
					var typeCizOne = TypeCizs.findOne({_id: typeCizId});
					var period = _.findWhere(typeCizOne.ciz, {name: nameCiz});
					var periodNumber = period.periodPoverki;
					doc.periodPoverki = periodNumber;
				} catch(e){}
				if(AutoForm.getFieldValue("datePoverki")){
					var datePoverki = AutoForm.getFieldValue("datePoverki");
					doc.dateSledPoverki = moment(datePoverki).add(periodNumber, 'M').format();
				} 
			}
			AutoForm.validateForm("insertCizForm");
			return doc;
		},
		update: function(doc) {
			if(AutoForm.getFieldValue("typeCiz") && AutoForm.getFieldValue("nameCiz")){
				var nameCiz = AutoForm.getFieldValue("nameCiz");
				var typeCizId = AutoForm.getFieldValue("typeCiz");
				try{
					var typeCizOne = TypeCizs.findOne({_id: typeCizId});
					var period = _.findWhere(typeCizOne.ciz, {name: nameCiz});
					var periodNumber = period.periodPoverki;
					doc.$set.periodPoverki = periodNumber;
				} catch(e){}
				if(AutoForm.getFieldValue("datePoverki")){
					var datePoverki = AutoForm.getFieldValue("datePoverki");
					doc.$set.dateSledPoverki = moment(datePoverki).add(periodNumber, 'M').format();
				} 
			}
			AutoForm.validateForm("updateCizForm");
			return doc;
		}
	},
	after: {
		insert: function(error, result) {
			if (error) {
				alertify.error("Ошибка!", error);
					console.log("Insert Error:", error);
			} else {
				Router.go('CizList');
				alertify.success("СИЗ успешно добавлено!");
				console.log("Insert Result:", result);
			}
		},
		update: function(error) {
			if (error) {
				alertify.error("Ошибка!", error);
				console.log("Update Error:", error);
			} else {
				Router.go('CizList');
				alertify.success("СИЗ успешно изменено!");
				console.log("Updated!");
			}
		}
	},
	beginSubmit: function() {},
  	endSubmit: function() {}
});
// хелпер который показывает текущее значение строки
// Template.registerHelper("test", function (fieldName) {
// 	return AutoForm.getFieldValue(fieldName);
// });

Template.insertCizForm.helpers({
	nameCizOptions: function(){
		if (AutoForm.getFieldValue("typeCiz")){
			var typeCizId = AutoForm.getFieldValue("typeCiz");
			var typeCizOne = TypeCizs.findOne({_id: typeCizId});
			// return typeCizOne.ciz.length;
			_.pluck(typeCizOne.ciz, 'name');
			result = _.map(_.pluck(typeCizOne.ciz, 'name'), function(name){ 
				return {label: name, value: name};
			 });
			return result;
		}
	},
	periodPoverki: function(){
		if(AutoForm.getFieldValue("typeCiz") && AutoForm.getFieldValue("nameCiz")){
			var nameCiz = AutoForm.getFieldValue("nameCiz");
			var typeCizId = AutoForm.getFieldValue("typeCiz");
			try{
				var typeCizOne = TypeCizs.findOne({_id: typeCizId});
				var period = _.findWhere(typeCizOne.ciz, {name: nameCiz});
				return period.periodPoverki;
			} catch(e){}
		}
	},
	dateSledPoverki: function(){
		if(AutoForm.getFieldValue("datePoverki") && AutoForm.getFieldValue("nameCiz")){
			var typeCizId = AutoForm.getFieldValue("typeCiz");
			var nameCiz = AutoForm.getFieldValue("nameCiz");
			try{
				var typeCizOne = TypeCizs.findOne({_id: typeCizId});
				var period = _.findWhere(typeCizOne.ciz, {name: nameCiz});
				var periodNumber = period.periodPoverki;
			} catch(e){}
			var datePoverki = AutoForm.getFieldValue("datePoverki");
			return moment(datePoverki).add(periodNumber, 'M').format('DD.MM.YYYY');
		}
	}

});

Template.updateCizForm.helpers({
	nameCizOptions: function(){
		if (AutoForm.getFieldValue("typeCiz")){
			var typeCizId = AutoForm.getFieldValue("typeCiz");
			var typeCizOne = TypeCizs.findOne({_id: typeCizId});
			// return typeCizOne.ciz.length;
			_.pluck(typeCizOne.ciz, 'name');
			result = _.map(_.pluck(typeCizOne.ciz, 'name'), function(name){ 
				return {label: name, value: name};
			 });
			return result;
		}
	},
	periodPoverki: function(){
		if(AutoForm.getFieldValue("typeCiz") && AutoForm.getFieldValue("nameCiz")){
			var nameCiz = AutoForm.getFieldValue("nameCiz");
			var typeCizId = AutoForm.getFieldValue("typeCiz");
			try{
				var typeCizOne = TypeCizs.findOne({_id: typeCizId});
				var period = _.findWhere(typeCizOne.ciz, {name: nameCiz});
				return period.periodPoverki;
			} catch(e){}
		}
	},
	dateSledPoverki: function(){
		if(AutoForm.getFieldValue("datePoverki") && AutoForm.getFieldValue("nameCiz")){
			var typeCizId = AutoForm.getFieldValue("typeCiz");
			var nameCiz = AutoForm.getFieldValue("nameCiz");
			try{
				var typeCizOne = TypeCizs.findOne({_id: typeCizId});
				var period = _.findWhere(typeCizOne.ciz, {name: nameCiz});
				var periodNumber = period.periodPoverki;
			} catch(e){}
			var datePoverki = AutoForm.getFieldValue("datePoverki");
			return moment(datePoverki).add(periodNumber, 'M').format('DD.MM.YYYY');
		}
	}

})