Template.SpezOdezdaList.helpers({
		SpezOdezdasCount: function(){
			return SpezOdezdas.find().count();
		},
		// настройки для reactiv table
		settings: function(){
			return {
				collection: SpezOdezdas,
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
					{ key: 'naimenovanie_ciz', label: 'Наименование СИЗ', sortable: true},
					{
						key: 'worker',
						label: 'Работник',
						sortable: true,
						fn: function(value){
							if (Workers.findOne({_id: value})){
								var workerOne = Workers.findOne({_id: value});
								return workerOne.Familia;
							}
						}	
					},
					{ key: 'naklad_prihod', label: 'Номер накладной', sortable: true},
					{ key: 'sertificat_sootvetstvia', label: 'Сертификат соответствия', sortable: true},
					{ 
						key: 'data_prihoda',
						label: 'Дата прихода',
						sortable: true,
						fn: function (value){
							return moment(value).format('DD-MM-YYYY');
						}
					},
					{ key: 'kolvo_prihoda', label: 'Количество прихода (шт)', sortable: true},
					{ key: 'data_vidachi', label: 'Дата выдачи', sortable: true},
					{ key: 'kolvo_vidachi', label: 'Количество выдачи (шт)', sortable: true},
					{ key: 'procent_iznosa_vidachi', label: 'Процент износа выдачи (%)', sortable: true},
					{ key: 'srock_noski', label: 'Срок носки', sortable: true},
					{ key: 'data_vozvrata', label: 'Дата возврата', sortable: true},
					{ key: 'kolvo_vozvrata', label: 'Количество возврата (шт)', sortable: true},
					{ key: 'procent_iznosa_vozvrata', label: 'Процент износа возврата (%)', sortable: true},
					{ key: 'primechanie', label: 'Примечание', sortable: true}
				]
			};
		}
});

// редактировать спец. одежду
Template.SpezOdezdaList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var SpezOdezda = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateSpezOdezdaForm', {_id: this._id});
		}
	}
});
// удалить спец. одежду
Template.SpezOdezdaList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var SpezOdezda = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
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
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertSpezOdezdaForm', 'updateSpezOdezdaForm'], {
		after: {
			insert: function(error, result) {
				if (error) {
					alertify.error("Ошибка!", error);
						console.log("Insert Error:", error);
				} else {
					Router.go('SpezOdezdaList');
					alertify.success("Спец. одежда успешно добавлена!");
					console.log("Insert Result:", result);
				}
			},
			update: function(error) {
				if (error) {
					alertify.error("Ошибка!", error);
					console.log("Update Error:", error);
				} else {
					Router.go('SpezOdezdaList');
					alertify.success("Спец. одежда успешно изменена!");
					console.log("Updated!");
				}
			}
		}
	});
