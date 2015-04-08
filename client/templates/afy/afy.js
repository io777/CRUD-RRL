Template.AFYList.helpers({
		AFYsCount: function(){
			return AFYs.find().count();
		},
		// настройки для reactiv table
		settings: function(){
			return {
				collection: AFYs,
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
					{ key: 'napravlenie', label: 'Направление', sortable: true},
					{ key: 'inventarniu_nomer', label: 'Инвентарный номер', sortable: true },
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
					{ key: 'freqvansi', label: 'Частота', sortable: true },
					{ key: 'freqvansi_prd', label: 'Частота прд.', sortable: true},
					{ key: 'freqvansi_prm', label: 'Частота прм.', sortable: true },
					{ key: 'type_moduleshin', label: 'Тип модуляции', sortable: true },
					{ key: 'power_tx', label: 'Мощность прд.', sortable: true},
					{ key: 'poteri_AVT_AFT', label: 'Потери в АВТ / АФТ', sortable: true },
					{ key: 'primechanie', label: 'Примечание', sortable: true },
					{ key: 'ydelnie_poteri_na_metr', label: 'Удельные потери на метр', sortable: true},
					{ key: 'shirina_lycha', label: 'Ширина луча', sortable: true },
					{ key: 'koll_pered', label: 'Количество прд.', sortable: true},
					{ key: 'azimut_izluchenia', label: 'Азимут излучения', sortable: true },
					{ key: 'visota_podvesa_antenn', label: 'Высота подвеса антенн', sortable: true },
					{ key: 'type_antenn_diametr', label: 'Тип антенн диаметр', sortable: true},
					{ key: 'koeffcient_ysil_antenn', label: 'Коэффициент усил. антенн', sortable: true },
					{ key: 'type_AVT_AFT', label: 'Тип АВТ / АФТ', sortable: true},
					{ key: 'sechenie', label: 'Сечение', sortable: true },
					{ key: 'dlinna_AVT_AFT', label: 'Длинна АВТ / АФТ', sortable: true },
					{ key: 'moshnost_na_vhode_antenn', label: 'Мощность на входе антенн', sortable: true},
					{ key: 'vladelec_oboryd', label: 'Владелец оборудования', sortable: true },
					{ key: 'rezervir', label: 'Резервирование', sortable: true},
					{ key: 'koll_potokov', label: 'Колич. потоков', sortable: true },
					{ key: 'razmeshenie', label: 'Размещение', sortable: true }
				]
			};
		}
});

// редактировать склад
Template.AFYList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var AFY = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateAFYForm', {_id: this._id});
		}
	}
});
// удалить склад
Template.AFYList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var AFY = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
				AFYs.remove(AFY._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("АФУ успешно удалено!");
						console.log("AFY Remove!");
					}
				});
		}
	}
});
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertAFYForm', 'updateAFYForm'], {
		after: {
			insert: function(error, result) {
				if (error) {
					alertify.error("Ошибка!", error);
						console.log("Insert Error:", error);
				} else {
					Router.go('AFYList');
					alertify.success("АФУ успешно добавлено!");
					console.log("Insert Result:", result);
				}
			},
			update: function(error) {
				if (error) {
					alertify.error("Ошибка!", error);
					console.log("Update Error:", error);
				} else {
					Router.go('AFYList');
					alertify.success("АФУ успешно изменено!");
					console.log("Updated!");
				}
			}
		}
	});
