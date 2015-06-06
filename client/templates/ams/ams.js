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
				{ key: 'name_adress', label: 'Адресс', sortable: true, hidden: true},
				{ key: 'inventari', label: 'Инв. номер', sortable: true },
				{
					key: 'mesto',
					label: 'Место размещения',
					sortable: true,
					hidden: true,
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
					hidden: true,
					fn: function(value){
						var result = [];
						lines = Lines.find();
						lines.forEach(function(line){
							if(_.contains(line.ams, value.toString())){
								result.push(" "+line.name+" - "+line.nomer);
							}
						});
						return result;
					}
				},
				{ key: 'sever_shirot', label: 'Координаты размещения АМС (С.Ш.)', sortable: true },
				{ key: 'west_dolg', label: 'Координаты размещения АМС (В.Д.)', sortable: true },
				{ key: 'type_ams', label: 'Тип АМС (башня/мачта)', sortable: true },
				{ key: 'massa_ams', label: 'Масса АМС (кг)', sortable: true },
				{ key: 'konstryktiv_ams', label: 'Конструктив АМС (труба/уголок)', sortable: true },
				{ key: 'Visota_AMS', label: 'Высота АМС (м)', sortable: true },
				{ key: 'nagryzka', label: 'Проектная нагрузо-способность (кг)', sortable: true, hidden: true },
				{ key: 'ploshad_ams', label: 'Общая площадь АМС (м²)', sortable: true, hidden: true },
				{ key: 'visota_nad_zemley', label: 'Высота над уровнем земли (м)', sortable: true, hidden: true },
				{ key: 'visota_nad_morem', label: 'Высота над уровнем моря (м)', sortable: true, hidden: true },
				{ 
					key: 'god_vvoda_v_exsplyataz',
					label: 'Год ввода в экспл. (г)',
					sortable: true,
					fn: function(value){
						if(value){
							return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{ key: 'koll_yarysov_ottazek', label: 'Кол-во ярусов оттяжек (шт)', sortable: true, hidden: true },
				{ key: 'nalichie_gosexpertiz', label: 'Наличие гос экспертизы (есть/нет)', sortable: true, hidden: true },
				{ key: 'zashitnoe_pokritie_ams', label: 'Защитное покрытие АМС (год/оцинкована)', sortable: true },
				{ key: 'nalichie_lebedki', label: 'Наличие лебедки (тип)', sortable: true, hidden: true },
				{ key: 'protokol_izmerenia_osadok_fundamenta', label: 'Протокол измерения осадок фундаментов АМС (год)', sortable: true, hidden: true },
				{ key: 'protokol_izmerenia_otklonenia_stvola_AMS_ot_vertikali', label: 'Протокол измерения отклонения ствола АМС от вертикали (год)', sortable: true, hidden: true },
				{ key: 'protokol_izmerenia_yglovih_otkloneniy_AMS', label: 'Протокол измерения угловых отклонений АМС (год)', sortable: true, hidden: true },
				{ key: 'akt_revizii_AMS', label: 'Акт ревизии АМС (год)', sortable: true, hidden: true },
				{ key: 'akt_proverki_natazenia_v_ottazkah', label: 'Акт проверки монтажных натяжений в оттяжках (год)', sortable: true, hidden: true },
				{ key: 'akt_priemki_remotnih_rabot_na_AMS', label: 'Акт приемки ремонтных работ на АМС (год)', sortable: true, hidden: true },
				{ key: 'akt_defectnogo_sostoyania_AMS', label: 'Акт дефектного состояния АМС (год)', sortable: true, hidden: true },
				{ key: 'akt_priemki_rabot_po_kap_remonty_AMS', label: 'Акт приемки работ по капитальному ремонту АМС (год)', sortable: true, hidden: true },
				{ key: 'remont_fundamentov_AMS', label: 'Ремонт фундаментов АМС (год)', sortable: true, hidden: true },
				{ key: 'kap_remont_AMS_bez_pokraski', label: 'Капитальный ремонт АМС кроме покраски (год)', sortable: true, hidden: true },
				{ key: 'nalicie_proektnoi_doc', label: 'Наличие проектной документации на АМС (нет/место хранения)', sortable: true, hidden: true },
				{ key: 'tip_proekta_AMS', label: 'Тип проекта АМС (ГОСТ)', sortable: true, hidden: true },
				{ key: 'project_organization', label: 'Проектная организация', sortable: true, hidden: true },
				{ key: 'nalich_transport_seti', label: 'Наличие транспортной сети (ВОЛС/РРЛ/VSAT)', sortable: true, hidden: true },
				{ key: 'obiem_transportnoi_seti', label: 'Объем транспортной сети (STM/Мбит/сек/Е1)', sortable: true, hidden: true },
				{ key: 'nalichie_svidetelstva_na_pravo_sobstvennosti', label: 'Наличие свидетельства на право собственности (да/нет)', sortable: true, hidden: true },
				{ key: 'Vid_prava_na_zemel_ychastok', label: 'Вид прав на земельный участок(собственность/ аренда (аренда = договор, собственник))', sortable: true, hidden: true },
				{ key: 'nalichie_soglas_s_aviachieu', label: 'Наличие согласования с организациями области авиации (есть/нет)', sortable: true, hidden: true },
				{ key: 'nalichie_pasporta_som', label: 'Наличие паспорта СОМ (да/нет)', sortable: true, hidden: true },
				{ key: 'nalichie_sanepid_na_PRTO', label: 'Наличие санэпид заключения на эксплуатацию ПРТО (да/нет)', sortable: true, hidden: true },
				{ key: 'nalichie_pasporta_na_kontyr_zazemlenia_AMS', label: 'Наличие паспорта на контур заземления АМС (да/нет)', sortable: true, hidden: true },
				{ key: 'videlaemaya_moshnost_na_obekt', label: 'Выделенная мощность на объект (КВт)', sortable: true, hidden: true },
				{ key: 'fakt_potreb_moshnost', label: 'Фактически потребляемая мощность объектом (КВт)', sortable: true, hidden: true },
				{ key: 'MOL_dolznost', label: 'МОЛ должность', sortable: true, hidden: true },
				{ key: 'MOL_FIO', label: 'МОЛ ФИО', sortable: true, hidden: true },
				{ key: 'MOL_tel', label: 'МОЛ тел', sortable: true, hidden: true },
				{ key: 'Otvetstv_za_AMS_dolznost', label: 'Ответств. за АМС должность', sortable: true, hidden: true },
				{ key: 'Otvetstv_za_AMS_FIO', label: 'Ответств. за АМС ФИО', sortable: true, hidden: true },
				{ key: 'Otvetstv_za_AMS_tel', label: 'Ответств. за АМС тел', sortable: true, hidden: true },
				{ key: 'primechania_po_remonty', label: 'Примечания по ремонту', sortable: true, hidden: true }
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
	before: {
		insert: function(doc) {
			if(AutoForm.getFieldValue("shirota_grad") && AutoForm.getFieldValue("shirota_minut") && AutoForm.getFieldValue("shirota_second")){
				var shirota_grad = AutoForm.getFieldValue("shirota_grad");
				var shirota_minut = AutoForm.getFieldValue("shirota_minut");
				var shirota_second = AutoForm.getFieldValue("shirota_second");
				try{
					var shirota = shirota_grad + (shirota_minut / 60) + (shirota_second / 3600);
					doc.shirota_DD = shirota;
				} catch(e){}
			}
			if(AutoForm.getFieldValue("dolgota_grad") && AutoForm.getFieldValue("dolgota_minut") && AutoForm.getFieldValue("dolgota_second")){
				var dolgota_grad = AutoForm.getFieldValue("dolgota_grad");
				var dolgota_minut = AutoForm.getFieldValue("dolgota_minut");
				var dolgota_second = AutoForm.getFieldValue("dolgota_second");
				try{
					var dolgota = dolgota_grad + (dolgota_minut / 60) + (dolgota_second / 3600);
					doc.dolgota_DD = dolgota;
				} catch(e){}
			}
			return doc;
		},
		update: function(doc) {
			if(AutoForm.getFieldValue("shirota_grad") && AutoForm.getFieldValue("shirota_minut") && AutoForm.getFieldValue("shirota_second")){
				var shirota_grad = AutoForm.getFieldValue("shirota_grad");
				var shirota_minut = AutoForm.getFieldValue("shirota_minut");
				var shirota_second = AutoForm.getFieldValue("shirota_second");
				try{
					var shirota = shirota_grad + (shirota_minut / 60) + (shirota_second / 3600);
					doc.$set.shirota_DD = shirota;
				} catch(e){}
			}
			if(AutoForm.getFieldValue("dolgota_grad") && AutoForm.getFieldValue("dolgota_minut") && AutoForm.getFieldValue("dolgota_second")){
				var dolgota_grad = AutoForm.getFieldValue("dolgota_grad");
				var dolgota_minut = AutoForm.getFieldValue("dolgota_minut");
				var dolgota_second = AutoForm.getFieldValue("dolgota_second");
				try{
					var dolgota = dolgota_grad + (dolgota_minut / 60) + (dolgota_second / 3600);
					doc.$set.dolgota_DD = dolgota;
				} catch(e){}
			}
			return doc;
		}
	},
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