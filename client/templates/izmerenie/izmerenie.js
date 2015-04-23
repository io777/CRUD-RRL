Template.Izmerenie.helpers({
	ObectExplyatsCount: function(){
		return ObectExplyats.find().count();
	},
	// настройки для reactiv table
	settings: function(){
			return {
				collection: ObectExplyats,
				rowsPerPage: 10,
				showFilter: true,
				showColumnToggles: true,
				class: 'table table-bordered table-hover col-sm-12',
				fields: [
					{ key: 'name', label: 'Наименование', sortable: true},
					{ 
						key: 'COM_data',
						label: 'Измерение СОМ, дата (1 в год)',
						sortable: true,
						fn: function(value){
							if(value){
								nowDate = new Date();
								if(moment(nowDate).year() > moment(value).year()){
									return new Spacebars.SafeString('<span class="label label-danger">'+moment(value).format('DD.MM.YYYY')+'</span>');
								}else{
									return new Spacebars.SafeString('<span class="label label-success">'+moment(value).format('DD.MM.YYYY')+'</span>');
								}
							}
						}
					},
					{ key: 'COM_protokol', label: 'Измерение СОМ, протокол', sortable: true },
					{ 
						key: 'Metallosvazi_data',
						label: 'Измерение металлосвязи, дата (1 в 5 лет)',
						sortable: true,
						fn: function(value){
							if(value){
								nowDate = new Date();
								if((moment(nowDate).year() - 5) > moment(value).year()){
									return new Spacebars.SafeString('<span class="label label-danger">'+moment(value).format('DD.MM.YYYY')+'</span>');
								}else{
									return new Spacebars.SafeString('<span class="label label-success">'+moment(value).format('DD.MM.YYYY')+'</span>');
								}
							}
						}
					},
					{ key: 'Metallosvazi_protokol', label: 'Измерение металлосвязи, протокол', sortable: true },
					{ 
						key: 'Zazemlenia_data',
						label: 'Измерение заземления, дата (1 в год)',
						sortable: true,
						fn: function(value){
							if(value){
								nowDate = new Date();
								if(moment(nowDate).year() > moment(value).year()){
									return new Spacebars.SafeString('<span class="label label-danger">'+moment(value).format('DD.MM.YYYY')+'</span>');
								}else{
									return new Spacebars.SafeString('<span class="label label-success">'+moment(value).format('DD.MM.YYYY')+'</span>');
								}
							}
						}
					},
					{ key: 'Zazemlenia_protokol', label: 'Измерение заземления, протокол', sortable: true },
					{ 
						key: 'Petli_Faza_Null_data',
						label: 'Измерение петли фаза-ноль, дата (1 в 5 лет)',
						sortable: true,
						fn: function(value){
						if(value){
								nowDate = new Date();
								if((moment(nowDate).year() - 5) > moment(value).year()){
									return new Spacebars.SafeString('<span class="label label-danger">'+moment(value).format('DD.MM.YYYY')+'</span>');
								}else{
									return new Spacebars.SafeString('<span class="label label-success">'+moment(value).format('DD.MM.YYYY')+'</span>');
								}
							}
						}
					},
					{ key: 'Petli_Faza_Null_protokol', label: 'Измерение петли фаза-ноль, протокол', sortable: true }
				]
			};
	}
});


