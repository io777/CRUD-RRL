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
					{ key: 'mesto', label: 'Место нахождения', sortable: true},
					{ key: 'number', label: 'Порядковый номер', sortable: true },
					{ key: 'typeCiz', label: 'Тип СИЗ', sortable: true },
					{ key: 'nameCiz', label: 'Наименование СИЗ', sortable: true},
					{ key: 'periodPverki', label: 'Период поверки', sortable: true},
					{ key: 'datePoverki', label: 'Дата поверки', sortable: true },
					{ key: 'dateSledPoverki', label: 'Дата следующей поверки', sortable: true },
					
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
						alertify.success("Тип СИЗ успешно удален!");
						console.log("Ciz Remove!");
					}
				});
		}
	}
});
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertCizForm', 'updateCizForm'], {
	befor: {
		insert: function(doc) {
			
		}
	},
	after: {
		insert: function(error, result) {
			if (error) {
				alertify.error("Ошибка!", error);
					console.log("Insert Error:", error);
			} else {
				Router.go('CizList');
				alertify.success("Тип СИЗ успешно добавлен!");
				console.log("Insert Result:", result);
			}
		},
		update: function(error) {
			if (error) {
				alertify.error("Ошибка!", error);
				console.log("Update Error:", error);
			} else {
				Router.go('CizList');
				alertify.success("Тип СИЗ успешно изменен!");
				console.log("Updated!");
			}
		}
	}
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
			return moment(datePoverki).add(periodNumber, 'y').format('DD.MM.YYYY');
		}
	}

})