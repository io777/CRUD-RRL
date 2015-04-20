Template.TechZdaniaList.helpers({
		TechZdaniasCount: function(){
			return TechZdanias.find().count();
		},
		// настройки для reactiv table
		settings: function(){
			return {
				collection: TechZdanias,
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
					{ key: 'adress', label: 'Адресс', sortable: true},
					{
						key: 'mesto',
						label: 'Место размещения',
						sortable: true,
						fn: function (value){
							if (Sklads.findOne({_id: value})){
								var skladOne = Sklads.findOne({_id: value});
								return skladOne.name;
							};
							if (ObectExplyats.findOne({_id: value})){
								var obectExplyatOne = ObectExplyats.findOne({_id: value});
								return obectExplyatOne.name;
							};
						}
					},
					{ key: 'god_postroiki', label: 'Год постройки', sortable: true},
					{ key: 'god_pereoboryd', label: 'Год переоборудования', sortable: true},
					{ key: 'krovla', label: 'Кровля', sortable: true},
					{ key: 'perekritia', label: 'Перекрытия', sortable: true},
					{ key: 'chislo_etozei', label: 'Число этажей', sortable: true},
					{ key: 'kybatura', label: 'Кубатура', sortable: true},
					{ key: 'organizaciya', label: 'Организация', sortable: true},
					{ key: 'nalichie_kanalizacii', label: 'Наличие канализации', sortable: true}
				]
			};
		}
});

// редактировать склад
Template.TechZdaniaList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var TechZdania = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateTechZdaniaForm', {_id: this._id});
		}
	}
});
// удалить склад
Template.TechZdaniaList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var TechZdania = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
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
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertTechZdaniaForm', 'updateTechZdaniaForm'], {
		after: {
			insert: function(error, result) {
				if (error) {
					alertify.error("Ошибка!", error);
						console.log("Insert Error:", error);
				} else {
					Router.go('TechZdaniaList');
					alertify.success("Тех. здание успешно добавлено!");
					console.log("Insert Result:", result);
				}
			},
			update: function(error) {
				if (error) {
					alertify.error("Ошибка!", error);
					console.log("Update Error:", error);
				} else {
					Router.go('TechZdaniaList');
					alertify.success("Тех. здание успешно изменено!");
					console.log("Updated!");
				}
			}
		}
	});
