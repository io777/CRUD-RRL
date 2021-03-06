Template.AlarmList.helpers({
	AlarmsCount: function(){
		return Alarms.find().count();
	},
	// настройки для reactiv table
	settings: function(){
		return {
			collection: Alarms,
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
				{ key: 'type', label: 'Тип', sortable: true },
				{
					key: 'mestoName',
					label: 'Место аварии',
					sortable: true
				},
				{ 
					key: 'date',
					label: 'Дата аварии',
					sortable: true,
					fn: function(value){
						if(value){
							return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{ key: 'primechanie', label: 'Примечание', sortable: true }
			]
		};
	}
});

// редактировать аварию
Template.AlarmList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var Alarm = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateAlarmForm', {_id: this._id});
		}
	}
});
// удалить аварию
Template.AlarmList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var Alarm = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
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
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertAlarmForm', 'updateAlarmForm'], {
	before: {
		insert: function(doc){
			if(AutoForm.getFieldValue("mesto")){
				var mestoId = AutoForm.getFieldValue("mesto");
				if (ObectExplyats.findOne({_id: mestoId})){
					var obectExplyatOne = ObectExplyats.findOne({_id: mestoId});
					doc.mestoName = obectExplyatOne.name;
				};
			}
			AutoForm.validateForm("insertAlarmForm");
			return doc;
		},
		update: function(doc){
			if(AutoForm.getFieldValue("mesto")){
				var mestoId = AutoForm.getFieldValue("mesto");
				if (ObectExplyats.findOne({_id: mestoId})){
					var obectExplyatOne = ObectExplyats.findOne({_id: mestoId});
					doc.$set.mestoName = obectExplyatOne.name;
				};
			}
			AutoForm.validateForm("updateAlarmForm");
			return doc;
		}
	},
	after: {
		insert: function(error, result) {
			if (error) {
				alertify.error("Ошибка!", error);
				console.log("Insert Error:", error);
			} else {
				Router.go('AlarmList');
				alertify.success("Авария успешно добавлена!");
				console.log("Insert Result:", result);
			}
		},
		update: function(error) {
			if (error) {
				alertify.error("Ошибка!", error);
				console.log("Update Error:", error);
			} else {
				Router.go('AlarmList');
				alertify.success("Авария успешно изменена!");
				console.log("Updated!");
			}
		}
	}
});
