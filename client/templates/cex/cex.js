Template.CexList.helpers({
    CexsCount: function(){
      return Cexs.find().count();
    },
    // настройки для reactiv table
    settings: function(){
    	return {
    		collection: Cexs,
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
    			{ key: 'short_name', label: 'Короткое наименование', sortable: true},
			    { key: 'full_name', label: 'Полное наименование', sortable: true },
			]
    	};
    }
});

// редактировать цех
Template.CexList.events({
  'click .reactive-table tr': function (event) {
    // set the blog post we'll display details and news for
    event.preventDefault();
    var Cex = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "ion-android-create" ||
    	event.target.className == "btn btn-warning") {
      Router.go('updateCexForm', {_id: this._id});
    }
  }
});
// удалить цех
Template.CexList.events({
  'click .reactive-table tr': function (event) {
    event.preventDefault();
    var Cex = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "ion-close-circled" ||
    	event.target.className == "btn btn-danger") {
      	Cexs.remove(Cex._id, function(error){
      		if(error){
      			alertify.error("Ошибка!", error);
      			console.log("Remove Error:", error);
      		} else {
      			alertify.success("Цех успешно удален!");
      			console.log("Cex Remove!");
      		}
      	});
    }
  }
});
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertCexForm', 'updateCexForm'], {
    after: {
      insert: function(error, result) {
        if (error) {
        	alertify.error("Ошибка!", error);
          	console.log("Insert Error:", error);
        } else {
        	Router.go('CexList');
        	alertify.success("Цех успешно добавлен!");
        	console.log("Insert Result:", result);
        }
      },
      update: function(error) {
        if (error) {
        	alertify.error("Ошибка!", error);
        	console.log("Update Error:", error);
        } else {
        	Router.go('CexList');
        	alertify.success("Цех успешно изменен!");
        	console.log("Updated!");
        }
      }
    }
  });
