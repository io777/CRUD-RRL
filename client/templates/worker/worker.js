Template.WorkerList.helpers({
    WorkersCount: function(){
      return Workers.find().count();
    },
    // настройки для reactiv table
    settings: function(){
    	return {
    		collection: Workers,
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
    			{ key: 'Familia', label: 'Фамилия', sortable: true},
          { key: 'Name', label: 'Имя', sortable: true},
          { key: 'Otchestvo', label: 'Отчество', sortable: true},
          { key: 'nomerKarti', label: 'Номер карты', sortable: true},
          { key: 'tabel_nomer', label: 'Табельный номер', sortable: true},
          { key: 'data_postyplenia_na_raboty', label: 'Дата поступления на работу', sortable: true},
          { key: 'pol', label: 'Пол', sortable: true},
          { key: 'rost', label: 'Рост', sortable: true},
          { key: 'razmer_odezdi', label: 'Размер одежды', sortable: true},
          { key: 'razmer_obyvi', label: 'Размер обуви', sortable: true},
          { key: 'razmer_golovnogo_ubora', label: 'Размер головного убора', sortable: true},
          { key: 'tel', label: 'Телефон', sortable: true},
          { key: 'tel_rab', label: 'Рабочий телефон', sortable: true},
          { key: 'dolznost', label: 'dolznost', sortable: true},
          { key: 'podpis', label: 'Подпись', sortable: true}
			]
    	};
    }
});

// редактировать работника
Template.WorkerList.events({
  'click .reactive-table tr': function (event) {
    // set the blog post we'll display details and news for
    event.preventDefault();
    var Worker = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "fa fa-pencil fa-lg") {
      Router.go('updateWorkerForm', {_id: this._id});
    }
  }
});
// удалить работника
Template.WorkerList.events({
  'click .reactive-table tr': function (event) {
    event.preventDefault();
    var Worker = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "fa fa-times fa-lg") {
      	Workers.remove(Worker._id, function(error){
      		if(error){
      			alertify.error("Ошибка!", error);
      			console.log("Remove Error:", error);
      		} else {
      			alertify.success("Работник успешно удален!");
      			console.log("Worker Remove!");
      		}
      	});
    }
  }
});
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertWorkerForm', 'updateWorkerForm'], {
    after: {
      insert: function(error, result) {
        if (error) {
        	alertify.error("Ошибка!", error);
          	console.log("Insert Error:", error);
        } else {
        	Router.go('WorkerList');
        	alertify.success("Работник успешно добавлен!");
        	console.log("Insert Result:", result);
        }
      },
      update: function(error) {
        if (error) {
        	alertify.error("Ошибка!", error);
        	console.log("Update Error:", error);
        } else {
        	Router.go('WorkerList');
        	alertify.success("Работник успешно изменен!");
        	console.log("Updated!");
        }
      }
    }
  });
