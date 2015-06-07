Template.MaterialList.helpers({
		MaterialsCount: function(){
			return Materials.find().count();
		},
		// настройки для reactiv table
		settings: function(){
			return {
				collection: Materials,
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
					{
						key: 'mestoName',
						label: 'Место размещения',
						sortable: true
					},
					{ key: 'kolvo', label: 'Количество', sortable: true},
					{ key: 'razmer', label: 'Размер', sortable: true},
					{ key: 'primechanie', label: 'Примечание', sortable: true}
			]
			};
		}
});

// редактировать материал
Template.MaterialList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var Material = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateMaterialForm', {_id: this._id});
		}
	}
});
// удалить материал
Template.MaterialList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var Material = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
				Materials.remove(Material._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("Матерьял успешно удален!");
						console.log("Material Remove!");
					}
				});
		}
	}
});
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertMaterialForm', 'updateMaterialForm'], {
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
			AutoForm.validateForm("insertMaterialForm");
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
			AutoForm.validateForm("updateMaterialForm");
			return doc;
		}
	},
	after: {
		insert: function(error, result) {
			if (error) {
				alertify.error("Ошибка!", error);
					console.log("Insert Error:", error);
			} else {
				Router.go('MaterialList');
				alertify.success("Матерьял успешно добавлен!");
				console.log("Insert Result:", result);
			}
		},
		update: function(error) {
			if (error) {
				alertify.error("Ошибка!", error);
				console.log("Update Error:", error);
			} else {
				Router.go('MaterialList');
				alertify.success("Матерьял успешно изменен!");
				console.log("Updated!");
			}
		}
	}
});
