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
						label: 'Измерение СОМ, дата',
						sortable: true,
						fn: function(value){
							if(value){
								return moment(value).format('DD.MM.YYYY');
							}
						}
					},
					{ key: 'COM_protokol', label: 'Измерение СОМ, протокол', sortable: true },
					{ 
						key: 'Metallosvazi_data',
						label: 'Измерение металлосвязи, дата',
						sortable: true,
						fn: function(value){
							if(value){
								return moment(value).format('DD.MM.YYYY');
							}
						}
					},
					{ key: 'Metallosvazi_protokol', label: 'Измерение металлосвязи, протокол', sortable: true },
					{ 
						key: 'Zazemlenia_data',
						label: 'Измерение заземления, дата',
						sortable: true,
						fn: function(value){
							if(value){
								return moment(value).format('DD.MM.YYYY');
							}
						}
					},
					{ key: 'Zazemlenia_protokol', label: 'Измерение заземления, протокол', sortable: true },
					{ 
						key: 'Petli_Faza_Null_data',
						label: 'Измерение петли фаза-ноль, дата',
						sortable: true,
						fn: function(value){
							if(value){
								return moment(value).format('DD.MM.YYYY');
							}
						}
					},
					{ key: 'Petli_Faza_Null_protokol', label: 'Измерение петли фаза-ноль, протокол', sortable: true }
				]
			};
	}
});


