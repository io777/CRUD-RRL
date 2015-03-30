Template.TypeCizList.helpers({
    TypeCizsCount: function(){
      return TypeCizs.find().count();
    },
    // настройки для reactiv table
    settings: function(){
    	return {
    		collection: TypeCizs,
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
    			{ key: 'name', label: 'Наименование типа СИЗ', sortable: true}
			    // { key: 'ciz', label: 'Полное наименование', sortable: true },
			]
    	};
    }
});

// редактировать цех
Template.TypeCizList.events({
  'click .reactive-table tr': function (event) {
    // set the blog post we'll display details and news for
    event.preventDefault();
    var TypeCiz = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "fa fa-pencil fa-lg") {
      Router.go('updateTypeCizForm', {_id: this._id});
    }
  }
});
// удалить цех
Template.TypeCizList.events({
  'click .reactive-table tr': function (event) {
    event.preventDefault();
    var TypeCiz = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "fa fa-times fa-lg") {
      	TypeCizs.remove(TypeCiz._id, function(error){
      		if(error){
      			alertify.error("Ошибка!", error);
      			console.log("Remove Error:", error);
      		} else {
      			alertify.success("Тип СИЗ успешно удален!");
      			console.log("TypeCiz Remove!");
      		}
      	});
    }
  }
});
// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertTypeCizForm', 'updateTypeCizForm'], {
    after: {
      insert: function(error, result) {
        if (error) {
        	alertify.error("Ошибка!", error);
          	console.log("Insert Error:", error);
        } else {
        	Router.go('TypeCizList');
        	alertify.success("Тип СИЗ успешно добавлен!");
        	console.log("Insert Result:", result);
        }
      },
      update: function(error) {
        if (error) {
        	alertify.error("Ошибка!", error);
        	console.log("Update Error:", error);
        } else {
        	Router.go('TypeCizList');
        	alertify.success("Тип СИЗ успешно изменен!");
        	console.log("Updated!");
        }
      }
    }
  });
