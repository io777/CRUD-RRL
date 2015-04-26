Template.PRTOdoc.helpers({
	obectExplyat: function(){
		var obectExplyat = this;
		return obectExplyat;
	},
	obectExplyatGod: function(){
		if(this.god_vvoda_v_exsplyataz){
			return moment(this.god_vvoda_v_exsplyataz).format('YYYY');
		}
	},
	settings: function(){
		var obectExplyatId = this._id;
		var afys = AFYs.find().fetch();
		var afysInObectExplyat = _.where(afys, {mesto: obectExplyatId});
		var afysInObectExplyatPrd = _.filter(afysInObectExplyat, function(afy){ return afy.koll_pered > 0 })
		return {
			collection: afysInObectExplyatPrd,
			rowsPerPage: 10,
			showFilter: false,
			showColumnToggles: false,
			showNavigation: 'never',
			class: 'table table-bordered table-hover col-sm-12',
			fields: [
				{ key: 'type_oborydov', label: 'Тип оборудования', sortable: true},
				{ key: 'freqvansi_prd', label: 'Рабочие частоты (MГц)', sortable: true},
				{ key: 'type_moduleshin', label: 'Тип модуляции', sortable: true },
				{ key: 'power_tx', label: 'Мощность передатчика (Вт)', sortable: true},
				{ key: 'koll_pered', label: 'Кол-во передат-чиков', sortable: true},
				{ key: 'azimut_izluchenia', label: 'Азимут излучения (град.)', sortable: true },
				{ key: 'ygol_mesta', label: 'Угол места (град.)', sortable: true },
				{ key: 'visota_podvesa_antenn', label: 'Высота под-веса (м)', sortable: true },
				{ key: 'visota_ot_krovli', label: 'Высота от кровли (м)', sortable: true },
				{ key: 'type_antenn_diametr', label: 'Тип антенны', sortable: true},
				{ key: 'koeffcient_ysil_antenn', label: 'Усиление антенны (дБi)', sortable: true },
				{ 
					key: '_id',
					label: 'Длина фиде-ра, тип фи-дера',
					sortable: true,
					fn: function(value){
						var AFYOne = AFYs.findOne({_id: value});
						if (AFYOne.dlinna_AVT_AFT && AFYOne.type_AVT_AFT){
							return new Spacebars.SafeString(AFYOne.dlinna_AVT_AFT+", "+AFYOne.type_AVT_AFT);
						} else {
							if (AFYOne.dlinna_AVT_AFT){
								return new Spacebars.SafeString(AFYOne.dlinna_AVT_AFT);
							} else {
								return new Spacebars.SafeString(AFYOne.type_AVT_AFT);
							}
						}
					}
				},
				{ key: 'poteri_AVT_AFT', label: 'Потери в АВТ / АФТ', sortable: true },
				{ key: 'moshnost_na_vhode_antenn', label: 'Мощность на входе антенн', sortable: true}
			]
		};
	}
});