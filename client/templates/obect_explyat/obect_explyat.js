Template.ObectExplyatList.helpers({
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
			    		return new Spacebars.SafeString('<a class="btn btn-danger"><i class="ion-close-circled"></i></a>');
			    	}
			    },
			    { 
			    	key: 'edit',
			    	//headerClass: 'col-md-1',
			    	label: 'Изменить / посмотреть',
			    	sortable: false,
			    	fn: function (value){
			    		return new Spacebars.SafeString('<a class="btn btn-warning"><i class="ion-android-create"></i></a>');
			    	}
			    },
    			{ key: 'name', label: 'Наименование', sortable: true},
			    { key: 'setevoi_nomer', label: 'Сетевой номер', sortable: true },
          { key: 'adress', label: 'Адресс', sortable: true },
          { key: 'rasstoyanie_do_osn_stancii', label: 'Расстояние до основной станции (км)', sortable: true },
          { key: 'rasstoyanie_mezdy_stanciami', label: 'Расстояние между станциями (км)', sortable: true },
          { key: 'worker_Familia', label: 'Ответственный', sortable: true },
          { key: 'COM_data', label: 'Измерение СОМ, дата', sortable: true },
          { key: 'COM_protokol', label: 'Измерение СОМ, протокол', sortable: true },
          { key: 'Metallosvazi_data', label: 'Измерение металлосвязи, дата', sortable: true },
          { key: 'Metallosvazi_protokol', label: 'Измерение металлосвязи, протокол', sortable: true },
          { key: 'Zazemlenia_data', label: 'Измерение заземления, дата', sortable: true },
          { key: 'Zazemlenia_protokol', label: 'Измерение заземления, протокол', sortable: true },
          { key: 'Petli_Faza_Null_data', label: 'Измерение петли фаза-ноль, дата', sortable: true },
          { key: 'Petli_Faza_Null_protokol', label: 'Измерение петли фаза-ноль, протокол', sortable: true }
			]
    	};
    }
});

// редактировать объект эксплуатации
Template.ObectExplyatList.events({
  'click .reactive-table tr': function (event) {
    // set the blog post we'll display details and news for
    event.preventDefault();
    var ObectExplyat = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "ion-android-create" ||
    	event.target.className == "btn btn-warning") {
      Router.go('updateObectExplyatForm', {_id: this._id});
    }
  }
});
// удалить объект эксплуатации
Template.ObectExplyatList.events({
  'click .reactive-table tr': function (event) {
    event.preventDefault();
    var ObectExplyat = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "ion-close-circled" ||
    	event.target.className == "btn btn-danger") {
      	ObectExplyats.remove(ObectExplyat._id, function(error){
      		if(error){
      			alertify.error("Ошибка!", error);
      			console.log("Remove Error:", error);
      		} else {
      			alertify.success("Объект эксплуатации успешно удален!");
      			console.log("ObectExplyat Remove!");
      		}
      	});
    }
  }
});
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertObectExplyatForm', 'updateObectExplyatForm'], {
    after: {
      insert: function(error, result) {
        if (error) {
        	alertify.error("Ошибка!", error);
          	console.log("Insert Error:", error);
        } else {
        	Router.go('ObectExplyatList');
        	alertify.success("Объект эксплуатации успешно добавлен!");
        	console.log("Insert Result:", result);
        }
      },
      update: function(error) {
        if (error) {
        	alertify.error("Ошибка!", error);
        	console.log("Update Error:", error);
        } else {
        	Router.go('ObectExplyatList');
        	alertify.success("Объект эксплуатации успешно изменен!");
        	console.log("Updated!");
        }
      }
    }
  });
