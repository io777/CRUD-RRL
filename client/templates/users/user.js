// таблица пользователей
Template.userList.helpers({
	settings: function(){
		return {
			collection: Meteor.users.find(),
			rowsPerPage: 10,
			showFilter: true,
			showColumnToggles: true,
			class: 'table table-bordered table-hover',
    		fields: [
    			{ 
			    	key: 'delete',
			    	//headerClass: 'col-md-1',
			    	label: 'Удалить',
			    	sortable: false,
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
    			{ key: 'username', label: 'Имя пользователя', sortable: true},
			    { key: 'emails.0.address', label: 'Почтовый адрес', sortable: true},
			    { 
			    	key: 'services.password',
			    	headerClass: 'col-md-1',
			    	label: 'Установить пароль',
			    	sortable: false,
			    	fn: function (value){
			    		if(value){
			    			return new Spacebars.SafeString(
			    				'<a><i class="fa fa-lock fa-lg"></i></a>'
			    			);
			    		} else {
			    			return new Spacebars.SafeString(
			    				'<a><i class="fa fa-unlock fa-lg"></i></a>'
			    			);
			    		}
			    	}
			    },
			    { 
			    	key: 'createdAt',
			    	label: 'Дата создания',
			    	sortable: true,
			    	fn: function(value){
			    		if(value){
			    			return moment(value).format('DD.MM.YYYY');
			    		}
			    	}
			    },
			    { key: 'profile.firstName', label: 'Имя', sortable: true},
			    { key: 'profile.middleName', label: 'Отчество', sortable: true},
			    { key: 'profile.lastName', label: 'Фамилия', sortable: true},
			    { 
			    	key: 'profile.birthday',
			    	label: 'День рождения',
			    	sortable: true,
			    	fn: function(value){
			    		if(value){
			    			return moment(value).format('DD.MM.YYYY');
			    		}
			    	}
			    },
			    { key: 'profile.gender', label: 'Пол', sortable: true},
			    { key: 'profile.organization', label: 'Организация', sortable: true},
			    // { key: 'profile.website', label: 'Сайт', sortable: true},
			    { key: 'profile.addressWork', label: 'Адрес работы', sortable: true},
			    { key: 'roles', label: 'Роли', sortable: true}
			]
		};
	}
});

// редактировать пользователя
Template.userList.events({
  'click .reactive-table tr': function (event) {
    // set the blog post we'll display details and news for
    event.preventDefault();
    var user = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "fa fa-pencil fa-lg") {
      Router.go('updateUserForm', {_id: this._id});
    }
  }
});

// удалить пользователя
Template.userList.events({
  'click .reactive-table tr': function (event) {
    event.preventDefault();
    var user = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "fa fa-times fa-lg") {
      Meteor.users.remove(user._id, function(error){
      	if(error){
      		alertify.error("Ошибка!", error);
      	} else {
      		alertify.success("Пользователь успешно удален!");
      	}
      });
    }
  }
});

// установить пароль пользователя
Template.userList.events({
  'click .reactive-table tr': function (event) {
    event.preventDefault();
    var user = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "fa fa-unlock fa-lg" || 
    	event.target.className == "fa fa-lock fa-lg") {
			Router.go('setPasswordForm', {_id: this._id});
    }
  }
});
// установить пароль пользователя
Template.setPasswordForm.events({
	'submit form': function(e) {
    	e.preventDefault();
		var data = {
			password: $(e.target).find('[name=password]').val(),
			user_id: this._id
		};
		if (data.password !== '') {
		    Meteor.call('addPassword', data, function(error, result) {
		      // display the error to the user and abort
		    	if (error){
		    		alertify.error("Ошибка!", error);
		    		console.log("Insert Error:", error);
		    	}
		    	Router.go('userList');
		    	alertify.success("Пароль пользователя успешно обновлен!");  
			});
		}
	}
});

Template.setPasswordForm.rendered = function(){
	$('#addPasswordForm').parsley({
		successClass: "has-success",
	    errorClass: "has-error",
	    classHandler: function (el) {
	        return el.$element.closest(".form-group");
	    },
	    errorsContainer: function (el) {
	        return el.$element.closest(".form-group");
	    },
	    errorsWrapper: "<span class='help-block'></span>",
	    errorTemplate: "<span></span>"
	});
};

// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertUserForm', 'updateUserForm'], {
    onSuccess: function(insert, result) {
    	Router.go('userList');
        alertify.success("Пользователь успешно добавлен!");
        console.log("Insert Result:", result);
    },
    onError: function(insert, error) {
    	if (error) {
        	if(error.error === 409){
				alertify.error("Такое имя пользователя или почтовый адресс уже существуют!");
			} else {
	        	alertify.error("Ошибка!", error);
	          	console.log("Insert Error:", error);
	        }
        }
    },
    onSuccess: function(update, result) {
    	Router.go('userList');
        alertify.success("Пользователь успешно изменен!");
        console.log("Updated!");
    },
    onError: function(update, error) {
    	if (error) {
        	if(error.error === 409){
				alertify.error("Такое имя пользователя или почтовый адресс уже существуют!");
			} else {
	        	alertify.error("Ошибка!", error);
	        	console.log("Update Error:", error);
	        }
        }
    },
});

// Template.setPasswordForm.rendered = function(){
// 	$(document).ready(function() {
// 		$('#addPasswordForm').bootstrapValidator({
// 			message: 'Это значение неверно',
// 	        feedbackIcons: {
// 	            valid: 'glyphicon glyphicon-ok',
// 	            invalid: 'glyphicon glyphicon-remove',
// 	            validating: 'glyphicon glyphicon-refresh'
// 	        },
// 	        locale: 'ru_RU',
// 	        fields: {
// 	        	password: {
// 	                message: 'Поле пароль обязателен для заполнения',
// 	                validators: {
// 	                    notEmpty: {},
// 	                    stringLength: {
// 	                        min: 6,
// 	                        max: 20
// 	                    }
// 	                }
// 	            }
// 	        }
// 		});
// 	});
// };

// Template.insertUserForm.events({
// 	'submit form': function(e){
// 		e.preventDefault();
// 		var id;
// 		id=	Accounts.createUser({
// 				username: $(e.target).find('[name=username]').val(),
// 		    	email: $(e.target).find('[name=email]').val(),
// 		    	password: $(e.target).find('[name=password]').val(),
// 		    	// profile: { 
// 		    	// 	firstName: AutoForm.getFieldValue("insertUserForm", "profile.firstName"),
// 		    	// 	middleName: AutoForm.getFieldValue("insertUserForm", "profile.middleName"),
// 		    	// 	lastName: AutoForm.getFieldValue("insertUserForm", "profile.lastName"),
// 		    	// 	birthday: AutoForm.getFieldValue("insertUserForm", "profile.birthday"),
// 		    	// 	gender: AutoForm.getFieldValue("insertUserForm", "profile.gender"),
// 		    	// 	organization: AutoForm.getFieldValue("insertUserForm", "profile.organization"),
// 		    	// 	website: AutoForm.getFieldValue("insertUserForm", "profile.website"),
// 		    	// 	adressWork: AutoForm.getFieldValue("insertUserForm", "profile.adressWork")
// 		    	// }
// 		    });
// 		// Roles.addUsersToRoles(id, ['manage-team','schedule-game']);
//     	Router.go('userList');
// 	}
// });

// Meteor.methods({
//     addUser: function(doc) {
//       //  check(doc, Meteor.users);
//         var id;
//         id = Accounts.createUser({
//             username: doc.username,
//             email: doc.email,
//             password: doc.password
//         });
//         Router.go('userList');
//     }
// });

// Template.insertUserForm.helpers({
// 	userSchema: function(){
// 		return Meteor.users.find();
// 	}
// });


// Template.insertUserForm.events({
// 	'submit form': function(e){
// 		e.preventDefault();

// 		id=	Accounts.createUser({
// 				username: $(e.target).find('[name=username]').val(),
// 		    	email: $(e.target).find('[name=email]').val(),
// 		    	password: $(e.target).find('[name=password]').val(),
// 		    	profile: { 
// 		    		firstName: $(e.target).find('[name=firstName]').val(),
// 		    		middleName: $(e.target).find('[name=middleName]').val(),
// 		    		lastName: $(e.target).find('[name=lastName]').val(),
// 		    		birthday: $(e.target).find('[name=birthday]').val(),
// 		    		gender: $(e.target).find('[name=gender]').val(),
// 		    		organization: $(e.target).find('[name=organization]').val(),
// 		    		website: $(e.target).find('[name=website]').val(),
// 		    		country: $(e.target).find('[name=country]').val()
// 		    	}
// 		    });
// 		Roles.addUsersToRoles(id, $(e.target).find('[name=roles]').val());
//     	Router.go('userList');
// 	}
// });

// Template.insertUserForm.helpers({
// 	$(document).ready(function() {
// 	  $(".js-example-basic-multiple").select2();
// 	});
// });

// Template.skladList.helpers({
//     Sklads: function () {
//         return Sklads.find();
//     },
//     // настройки для reactiv table
//     settings: function(){
//     	return {
//     		collection: Sklads,
//     		rowsPerPage: 10,
//     		showFilter: true,
//     		showColumnToggles: true,
//     		class: 'table table-bordered table-hover col-sm-12',
//     		fields: [
//     			{ 
// 			    	key: 'delete',
// 			    	headerClass: 'col-md-1',
// 			    	label: 'Удалить',
// 			    	fn: function (value){
// 			    		return new Spacebars.SafeString('<i class="ion-ios-trash"></i>');
// 			    	}
// 			    },
// 			    { 
// 			    	key: 'edit',
// 			    	headerClass: 'col-md-1',
// 			    	label: 'Изменить',
// 			    	fn: function (value){
// 			    		return new Spacebars.SafeString('<i class="ion-android-create"></i>');
// 			    	}
// 			    },
//     			{ key: 'name', label: 'Наименование'},
// 			    { key: 'adress', label: 'Адресс' },
// 			    { key: 'primechanie', label: 'Примечание' }
			    
// 			]
//     	};
//     }
// });