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
					{ key: 'type_oborydov', label: 'Тип оборудования', sortable: true},
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
					{ key: 'freqvansi', label: 'Частота (Мгц)', sortable: true },
					{ key: 'freqvansi_prd', label: 'Частота прд. (Мгц)', sortable: true},
					{ key: 'freqvansi_prm', label: 'Частота прм. (Мгц)', sortable: true },
					{ key: 'type_moduleshin', label: 'Тип модуляции', sortable: true },
					{ key: 'power_tx', label: 'Мощность прд. (Вт)', sortable: true},
					{ key: 'moshnost_na_vhode_antenn_wt', label: 'Мощность на входе антенн (Вт)', sortable: true},
					{ key: 'moshnost_na_vhode_antenn_Dbm', label: 'Мощность на входе антенн (Дбм)', sortable: true},
					{ key: 'poteri_AVT_AFT', label: 'Потери в АВТ / АФТ (Дбм)', sortable: true },
					{ key: 'ydelnie_poteri_na_metr', label: 'Удельные потери на метр (Дбм)', sortable: true},
					{ key: 'shirina_lycha', label: 'Ширина луча в азимутальной/вертикальной плоскости (град)', sortable: true },
					{ key: 'koll_pered', label: 'Количество прд. (шт.)', sortable: true},
					{ key: 'azimut_izluchenia', label: 'Азимут излучения (град.)', sortable: true },
					{ key: 'ygol_mesta', label: 'Азимут излучения (град)', sortable: true },
					{ key: 'visota_podvesa_antenn', label: 'Высота подвеса антенн (м)', sortable: true },
					{ key: 'visota_ot_krovli', label: 'Высота от кровли (м)', sortable: true },
					{ key: 'type_antenn_diametr', label: 'Тип антенн диаметр (м)', sortable: true},
					{ key: 'koeffcient_ysil_antenn', label: 'Коэффициент усил. антенн (дБi)', sortable: true },
					{ key: 'type_AVT_AFT', label: 'Тип АВТ / АФТ', sortable: true},
					{ key: 'sechenie', label: 'Сечение', sortable: true },
					{ key: 'dlinna_AVT_AFT', label: 'Длинна АВТ / АФТ (м)', sortable: true },
					{ key: 'vladelec_oboryd', label: 'Владелец оборудования', sortable: true },
					{ key: 'rezervir', label: 'Резервирование', sortable: true},
					{ key: 'koll_potokov', label: 'Колич. потоков (шт.)', sortable: true },
					{ key: 'primechanie', label: 'Примечание', sortable: true },
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
	before: {
		insert: function(doc) {
			if(AutoForm.getFieldValue("ydelnie_poteri_na_metr") && AutoForm.getFieldValue("dlinna_AVT_AFT")){
				var ydelnie_poteri_na_metr = AutoForm.getFieldValue("ydelnie_poteri_na_metr");
				var dlinna_AVT_AFT = AutoForm.getFieldValue("dlinna_AVT_AFT");
				try{
					doc.poteri_AVT_AFT = (ydelnie_poteri_na_metr * dlinna_AVT_AFT).toFixed(2);
				} catch(e){}
			}
			if(AutoForm.getFieldValue("power_tx") && doc.poteri_AVT_AFT && AutoForm.getFieldValue("koll_pered")){
				var power_tx = AutoForm.getFieldValue("power_tx");
				var koll_pered = AutoForm.getFieldValue("koll_pered");
				var log10 = function(x) { return Math.LOG10E * Math.log(x); }
				try{
					doc.moshnost_na_vhode_antenn_Dbm = ((10 * log10((koll_pered * power_tx) / 0.001)) - doc.poteri_AVT_AFT).toFixed(2);
				}catch(e){}
			}
			if(doc.moshnost_na_vhode_antenn_Dbm){
				try{
					doc.moshnost_na_vhode_antenn_wt = ((Math.pow(10,(doc.moshnost_na_vhode_antenn_Dbm / 10))) / 1000).toFixed(2);
				}catch(e){}
			}
			AutoForm.validateForm("insertAFYForm");
			return doc;
		},
		update: function(doc) {
			if(AutoForm.getFieldValue("ydelnie_poteri_na_metr") && AutoForm.getFieldValue("dlinna_AVT_AFT")){
				var ydelnie_poteri_na_metr = AutoForm.getFieldValue("ydelnie_poteri_na_metr");
				var dlinna_AVT_AFT = AutoForm.getFieldValue("dlinna_AVT_AFT");
				try{
					doc.$set.poteri_AVT_AFT = ((ydelnie_poteri_na_metr * dlinna_AVT_AFT)).toFixed(2);
				} catch(e){}
			}
			if(AutoForm.getFieldValue("power_tx") && doc.$set.poteri_AVT_AFT && AutoForm.getFieldValue("koll_pered")){
				var power_tx = AutoForm.getFieldValue("power_tx");
				var koll_pered = AutoForm.getFieldValue("koll_pered");
				var log10 = function(x) { return Math.LOG10E * Math.log(x); }
				try{
					doc.$set.moshnost_na_vhode_antenn_Dbm = ((10 * log10((koll_pered * power_tx) / 0.001)) - doc.$set.poteri_AVT_AFT).toFixed(2);
				}catch(e){}
			}
			if(doc.$set.moshnost_na_vhode_antenn_Dbm){
				try{
					doc.$set.moshnost_na_vhode_antenn_wt = ((Math.pow(10,(doc.$set.moshnost_na_vhode_antenn_Dbm / 10))) / 1000).toFixed(2);
				}catch(e){}
			}
			AutoForm.validateForm("updateAFYForm");
			return doc;
		}
	},
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

Template.insertAFYForm.helpers({
	poteri_AVT_AFT: function(){
		if(AutoForm.getFieldValue("ydelnie_poteri_na_metr") && AutoForm.getFieldValue("dlinna_AVT_AFT")){
			var ydelnie_poteri_na_metr = AutoForm.getFieldValue("ydelnie_poteri_na_metr");
			var dlinna_AVT_AFT = AutoForm.getFieldValue("dlinna_AVT_AFT");
			try{
				poteri_AVT_AFT = ((ydelnie_poteri_na_metr * dlinna_AVT_AFT)).toFixed(2);
				return poteri_AVT_AFT
			} catch(e){}
		}
	},
	moshnost_na_vhode_antenn_Dbm: function(){
		if(AutoForm.getFieldValue("ydelnie_poteri_na_metr") && AutoForm.getFieldValue("dlinna_AVT_AFT")){
			var ydelnie_poteri_na_metr = AutoForm.getFieldValue("ydelnie_poteri_na_metr");
			var dlinna_AVT_AFT = AutoForm.getFieldValue("dlinna_AVT_AFT");
			try{
				var poteri_AVT_AFT = ((ydelnie_poteri_na_metr * dlinna_AVT_AFT)).toFixed(2);
			} catch(e){}
		}
		if(AutoForm.getFieldValue("power_tx") && poteri_AVT_AFT && AutoForm.getFieldValue("koll_pered")){
			if(AutoForm.getFieldValue("power_tx") > 0){
				if(AutoForm.getFieldValue("koll_pered") > 0){
					var power_tx = AutoForm.getFieldValue("power_tx");
					var koll_pered = AutoForm.getFieldValue("koll_pered");
					var log10 = function(x) { return Math.LOG10E * Math.log(x); }
					try{
						return moshnost_na_vhode_antenn_Dbm = ((10 * log10((koll_pered * power_tx)/0.001)) - poteri_AVT_AFT).toFixed(2);
					} catch(e){}
				}
			}
		}
	},
	moshnost_na_vhode_antenn_wt: function(){
		if(AutoForm.getFieldValue("ydelnie_poteri_na_metr") && AutoForm.getFieldValue("dlinna_AVT_AFT")){
			var ydelnie_poteri_na_metr = AutoForm.getFieldValue("ydelnie_poteri_na_metr");
			var dlinna_AVT_AFT = AutoForm.getFieldValue("dlinna_AVT_AFT");
			try{
				var poteri_AVT_AFT = ((ydelnie_poteri_na_metr * dlinna_AVT_AFT)).toFixed(2);
			} catch(e){}
		}
		if(AutoForm.getFieldValue("power_tx") && poteri_AVT_AFT && AutoForm.getFieldValue("koll_pered")){
			if(AutoForm.getFieldValue("power_tx") > 0){
				if(AutoForm.getFieldValue("koll_pered") > 0){
					var power_tx = AutoForm.getFieldValue("power_tx");
					var koll_pered = AutoForm.getFieldValue("koll_pered");
					var log10 = function(x) { return Math.LOG10E * Math.log(x); }
					try{
						moshnost_na_vhode_antenn_Dbm = ((10 * log10((koll_pered * power_tx)/0.001)) - poteri_AVT_AFT).toFixed(2);
					} catch(e){}
				}
			}
		}
		try{
			if(moshnost_na_vhode_antenn_Dbm){
				if(AutoForm.getFieldValue("koll_pered") > 0 && AutoForm.getFieldValue("power_tx") > 0){
					return moshnost_na_vhode_antenn_wt = ((Math.pow(10,(moshnost_na_vhode_antenn_Dbm / 10))) / 1000).toFixed(2);
				}
			}
		}catch(e){}
	}
});

Template.updateAFYForm.helpers({
	poteri_AVT_AFT: function(){
		if(AutoForm.getFieldValue("ydelnie_poteri_na_metr") && AutoForm.getFieldValue("dlinna_AVT_AFT")){
			var ydelnie_poteri_na_metr = AutoForm.getFieldValue("ydelnie_poteri_na_metr");
			var dlinna_AVT_AFT = AutoForm.getFieldValue("dlinna_AVT_AFT");
			try{
				poteri_AVT_AFT = ((ydelnie_poteri_na_metr * dlinna_AVT_AFT)).toFixed(2);
				return poteri_AVT_AFT
			} catch(e){}
		}
	},
	moshnost_na_vhode_antenn_Dbm: function(){
		if(AutoForm.getFieldValue("ydelnie_poteri_na_metr") && AutoForm.getFieldValue("dlinna_AVT_AFT")){
			var ydelnie_poteri_na_metr = AutoForm.getFieldValue("ydelnie_poteri_na_metr");
			var dlinna_AVT_AFT = AutoForm.getFieldValue("dlinna_AVT_AFT");
			try{
				var poteri_AVT_AFT = ((ydelnie_poteri_na_metr * dlinna_AVT_AFT)).toFixed(2);
			} catch(e){}
		}
		if(AutoForm.getFieldValue("power_tx") && poteri_AVT_AFT && AutoForm.getFieldValue("koll_pered")){
			if(AutoForm.getFieldValue("power_tx") > 0){
				if(AutoForm.getFieldValue("koll_pered") > 0){
					var power_tx = AutoForm.getFieldValue("power_tx");
					var koll_pered = AutoForm.getFieldValue("koll_pered");
					var log10 = function(x) { return Math.LOG10E * Math.log(x); }
					try{
						return moshnost_na_vhode_antenn_Dbm = ((10 * log10((koll_pered * power_tx)/0.001)) - poteri_AVT_AFT).toFixed(2);
					} catch(e){}
				}
			}
		}
	},
	moshnost_na_vhode_antenn_wt: function(){
		if(AutoForm.getFieldValue("ydelnie_poteri_na_metr") && AutoForm.getFieldValue("dlinna_AVT_AFT")){
			var ydelnie_poteri_na_metr = AutoForm.getFieldValue("ydelnie_poteri_na_metr");
			var dlinna_AVT_AFT = AutoForm.getFieldValue("dlinna_AVT_AFT");
			try{
				var poteri_AVT_AFT = ((ydelnie_poteri_na_metr * dlinna_AVT_AFT)).toFixed(2);
			} catch(e){}
		}
		if(AutoForm.getFieldValue("power_tx") && poteri_AVT_AFT && AutoForm.getFieldValue("koll_pered")){
			if(AutoForm.getFieldValue("power_tx") > 0){
				if(AutoForm.getFieldValue("koll_pered") > 0){
					var power_tx = AutoForm.getFieldValue("power_tx");
					var koll_pered = AutoForm.getFieldValue("koll_pered");
					var log10 = function(x) { return Math.LOG10E * Math.log(x); }
					try{
						moshnost_na_vhode_antenn_Dbm = ((10 * log10((koll_pered * power_tx)/0.001)) - poteri_AVT_AFT).toFixed(2);
					} catch(e){}
				}
			}
		}
		try{
			if(moshnost_na_vhode_antenn_Dbm){
				if(AutoForm.getFieldValue("koll_pered") > 0 && AutoForm.getFieldValue("power_tx") > 0){
					return moshnost_na_vhode_antenn_wt = ((Math.pow(10,(moshnost_na_vhode_antenn_Dbm / 10))) / 1000).toFixed(2);
				}
			}
		}catch(e){}
	}
});