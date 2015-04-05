Template.AMSList.helpers({
		AMSsCount: function(){
			return AMSs.find().count();
		},
		// настройки для reactiv table
		settings: function(){
			return {
				collection: AMSs,
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
					{ key: 'name_psevdo', label: 'Наименование', sortable: true},
					{ key: 'name_adress', label: 'Адресс', sortable: true },
					{ key: 'inventari', label: 'Инв. номер', sortable: true },
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
					{ 
						key: '_id',
						label: 'Линия РРЛ',
						sortable: true,
						fn: function(value){
							var result = [];
							lines = Lines.find();
							var currentLineId = value;
							lines.forEach(function(line){
								if(_.contains(line.ams, value.toString())){
									result.push(" "+line.name+" - "+line.nomer);
								}
							});
							return result;
						}
					 },
					{ key: 'obect_explyat_name', label: 'Место размещения (объект эксплуатации)', sortable: true },
					{ key: 'sever_shirot', label: 'СШ', sortable: true },
					{ key: 'west_dolg', label: 'ВД', sortable: true},
					{ key: 'type_ams', label: 'Тип АМС', sortable: true },
					{ key: 'massa_ams', label: 'Масса АМС', sortable: true },
					{ key: 'konstryktiv_ams', label: 'Конструктив АМС', sortable: true},
					{ key: 'Visota_AMS', label: 'Высота АМС', sortable: true },
					{ key: 'koll_pered', label: 'Количество прд.', sortable: true},
					{ key: 'nagryzka', label: 'Нагрузка', sortable: true },
					{ key: 'ploshad_ams', label: 'Площадь АМС', sortable: true },
					{ key: 'visota_nad_zemley', label: 'Высота над землей', sortable: true},
					{ key: 'visota_nad_morem', label: 'Высота над уровнем моря', sortable: true },
					{ key: 'god_vvoda_v_exsplyataz', label: 'Год ввода в экспл.', sortable: true },
					{ key: 'koll_yarysov_ottazek', label: 'Колич. ярусов оттяжек', sortable: true },
					{ key: 'nalichie_gosexpertiz', label: 'Наличие гос. эспертизы', sortable: true },
					{ key: 'zashitnoe_pokritie_ams', label: 'Защитное покрытие АМС', sortable: true },
					{ key: 'nalichie_lebedki', label: 'Наличие лебедки', sortable: true },
					{ key: 'protokol_izmerenia_osadok_fundamenta', label: 'Протокол измерения осадков фундамента', sortable: true },
					{ key: 'protokol_izmerenia_otklonenia_stvola_AMS_ot_vertikali', label: 'Протокол измерения отклонения ствола АМС от вертикали', sortable: true },
					{ key: 'protokol_izmerenia_yglovih_otkloneniy_AMS', label: 'Протокол измерения угловых отклонений АМС', sortable: true },
					{ key: 'akt_revizii_AMS', label: 'Акт ревизии АМС', sortable: true },
					{ key: 'akt_proverki_natazenia_v_ottazkah', label: 'Акт проверки натяжения в оттяжках', sortable: true },
					{ key: 'akt_priemki_remotnih_rabot_na_AMS', label: 'Акт приемки рем. работ на АМС', sortable: true },
					{ key: 'akt_defectnogo_sostoyania_AMS', label: 'Акт дефектного состояния АМС', sortable: true },
					{ key: 'akt_priemki_rabot_po_kap_remonty_AMS', label: 'Акт приемки работ по кап. рем. АМС', sortable: true },
					{ key: 'remont_fundamentov_AMS', label: 'Ремонт фундаментов АМС', sortable: true },
					{ key: 'kap_remont_AMS_bez_pokraski', label: 'Кап. рем. АМС без покраски', sortable: true },
					{ key: 'nalicie_proektnoi_doc', label: 'Наличие проектной документации', sortable: true },
					{ key: 'tip_proekta_AMS', label: 'Тип проекта АМС', sortable: true },
					{ key: 'project_organization', label: 'Проектная организация', sortable: true },
					{ key: 'nalich_transport_seti', label: 'Наличие транспортной сети', sortable: true },
					{ key: 'obiem_transportnoi_seti', label: 'Объем транспортной сети', sortable: true },
					{ key: 'nalichie_svidetelstva_na_pravo_sobstvennosti', label: 'Наличие свидет. на право собств.', sortable: true },
					{ key: 'Vid_prava_na_zemel_ychastok', label: 'Вид права на земельный участок', sortable: true },
					{ key: 'nalichie_soglas_s_aviachieu', label: 'Наличие согласования с авиацией', sortable: true },
					{ key: 'nalichie_pasporta_som', label: 'Наличие паспорта СОМ', sortable: true },
					{ key: 'nalichie_sanepid_na_PRTO', label: 'Наличие санэпид. на ПРТО', sortable: true },
					{ key: 'nalichie_pasporta_na_kontyr_zazemlenia_AMS', label: 'Наличие паспорта на контур заземления АМС', sortable: true },
					{ key: 'videlaemaya_moshnost_na_obekt', label: 'Выделяемая мощность на объект', sortable: true },
					{ key: 'fakt_potreb_moshnost', label: 'Фактич. потреб. мощность', sortable: true },
					{ key: 'MOL_dolznost', label: 'МОЛ должность', sortable: true },
					{ key: 'MOL_FIO', label: 'МОЛ ФИО', sortable: true },
					{ key: 'MOL_tel', label: 'МОЛ тел', sortable: true },
					{ key: 'Otvetstv_za_AMS_dolznost', label: 'Ответств. за АМС должность', sortable: true },
					{ key: 'Otvetstv_za_AMS_FIO', label: 'Ответств. за АМС ФИО', sortable: true },
					{ key: 'Otvetstv_za_AMS_tel', label: 'Ответств. за АМС тел', sortable: true },
					{ key: 'primechania_po_remonty', label: 'Примечания по ремонту', sortable: true }
			]
			};
		}
});

// редактировать склад
Template.AMSList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var AMS = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateAMSForm', {_id: this._id});
		}
	}
});
// удалить склад
Template.AMSList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var AMS = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
				AMSs.remove(AMS._id, function(error){
					if(error){
						alertify.error("Ошибка!", error);
						console.log("Remove Error:", error);
					} else {
						alertify.success("АМС успешно удален!");
						console.log("AMS Remove!");
					}
				});
		}
	}
});
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertAMSForm', 'updateAMSForm'], {
		after: {
			insert: function(error, result) {
				if (error) {
					alertify.error("Ошибка!", error);
						console.log("Insert Error:", error);
				} else {
					Router.go('AMSList');
					alertify.success("АМС успешно добавлен!");
					console.log("Insert Result:", result);
				}
			},
			update: function(error) {
				if (error) {
					alertify.error("Ошибка!", error);
					console.log("Update Error:", error);
				} else {
					Router.go('AMSList');
					alertify.success("АМС успешно изменен!");
					console.log("Updated!");
				}
			}
		}
	});

Template.updateAMSForm.helpers({
	lineRRL: function(){
		var result = [];
		lines = Lines.find();
		var currentLineId = this._id;
		lines.forEach(function(line){
			if(_.contains(line.ams, currentLineId.toString())){
				result.push(" "+line.name+" - "+line.nomer);
			}
		});
		return result;

	}
})