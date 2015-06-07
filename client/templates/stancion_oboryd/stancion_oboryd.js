Template.StancionOborydList.helpers({
		StancionOborydsCount: function(){
			return StancionOboryds.find().count();
		},
		// настройки для reactiv table
		settings: function(){
			return {
				collection: StancionOboryds,
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
		}
});

// редактировать склад
Template.StancionOborydList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var StancionOboryd = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateStancionOborydForm', {_id: this._id});
		}
	}
});
// удалить склад
Template.StancionOborydList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var StancionOboryd = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
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
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertStancionOborydForm', 'updateStancionOborydForm'], {
	before: {
		insert: function(doc){
			if(AutoForm.getFieldValue("mesto")){
				var mestoId = AutoForm.getFieldValue("mesto");
				if (Sklads.findOne({_id: mestoId})){
					var skladOne = Sklads.findOne({_id: mestoId});
					doc.mestoName = skladOne.name;
				}
				if (ObectExplyats.findOne({_id: mestoId})){
					var obectExplyatOne = ObectExplyats.findOne({_id: mestoId});
					doc.mestoName = obectExplyatOne.name;
				}
			}
			AutoForm.validateForm("insertStancionOborydForm");
			return doc;
		},
		update: function(doc){
			if(AutoForm.getFieldValue("mesto")){
				var mestoId = AutoForm.getFieldValue("mesto");
				if (Sklads.findOne({_id: mestoId})){
					var skladOne = Sklads.findOne({_id: mestoId});
					doc.$set.mestoName = skladOne.name;
				}
				if (ObectExplyats.findOne({_id: mestoId})){
					var obectExplyatOne = ObectExplyats.findOne({_id: mestoId});
					doc.$set.mestoName = obectExplyatOne.name;
				}
			}
			AutoForm.validateForm("updateStancionOborydForm");
			return doc;
		}
	},
	after: {
		insert: function(error, result) {
			if (error) {
				alertify.error("Ошибка!", error);
					console.log("Insert Error:", error);
			} else {
				Router.go('StancionOborydList');
				alertify.success("Станцион. оборудование успешно добавлено!");
				console.log("Insert Result:", result);
			}
		},
		update: function(error) {
			if (error) {
				alertify.error("Ошибка!", error);
				console.log("Update Error:", error);
			} else {
				Router.go('StancionOborydList');
				alertify.success("Станцион. оборудование успешно изменено!");
				console.log("Updated!");
			}
		}
	}
});
