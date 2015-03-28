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
		if (event.target.className == "ion-close-circled" ||
			event.target.className == "btn btn-danger") {
				Cizs.remove(Ciz._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("Цех успешно удален!");
						console.log("Ciz Remove!");
					}
				});
		}
	}
});
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertCizForm', 'updateCizForm'], {
		after: {
			insert: function(error, result) {
				if (error) {
					alertify.error("Ошибка!", error);
						console.log("Insert Error:", error);
				} else {
					Router.go('CizList');
					alertify.success("Цех успешно добавлен!");
					console.log("Insert Result:", result);
				}
			},
			update: function(error) {
				if (error) {
					alertify.error("Ошибка!", error);
					console.log("Update Error:", error);
				} else {
					Router.go('CizList');
					alertify.success("Цех успешно изменен!");
					console.log("Updated!");
				}
			}
		}
	});
