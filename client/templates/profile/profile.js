Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function(event) {
        Router.go('profile');
    }
});

accountsUIBootstrap3.logoutCallback = function(error) {
  if(error) console.log("Error:" + error);
  Router.go('dashboard');
};

// перенаправить на список после создания и изменения
AutoForm.addHooks(['profile'], {
	onSuccess: function(update, result) {
		alertify.success("Профиль успешно изменен!");
        console.log("User updated!");
	},
	onError: function(update, error) {
		if(error.error === 409){
			alertify.error("Такое имя пользователя или почтовый адресс уже существуют!");
		} else {
			alertify.error(error.error);
		}
        console.log("Update Error:", error);
	}
  });

// Template.profile.rendered=function() {
//     $('#birthday').datepicker({
//     	language: 'ru'
//     });

//     $('#changeProfile').parsley({
// 		// successClass: "has-success",
// 	 //    errorClass: "has-error",
// 	 //    classHandler: function (el) {
// 	 //        return el.$element.closest(".form-group");
// 	 //    },
// 	 //    errorsContainer: function (el) {
// 	 //        return el.$element.closest(".form-group");
// 	 //    },
// 	 //    errorsWrapper: "<p class='text-center help-block'></p>",
// 	 //    errorTemplate: "<span></span>"
// 	});
// };

// изменить профиль пользователя
// Template.profile.events({
// 	'submit form': function(e) {
//     	e.preventDefault();
// 		//var ID = $(e.target).find('[name=ID]').val();

// 		Meteor.users.update({_id: Meteor.userId()}, {$set: {
// 			"username": $(e.target).find('[name=username]').val(),
// 			"profile.firstName": $(e.target).find('[name=firstName]').val(),
// 			"profile.middleName": $(e.target).find('[name=middleName]').val(),
// 			"profile.lastName": $(e.target).find('[name=lastName]').val(),
// 			"profile.birthday": $(e.target).find('[name=birthday]').val(),
// 			"profile.gender": $(e.target).find('[name=gender]').val(),
// 			"profile.organization": $(e.target).find('[name=organization]').val(),
// 			"profile.addressWork": $(e.target).find('[name=addressWork]').val(),
// 			"emails.0.address": $(e.target).find('[name=email]').val()
// 		}}, 
// 		function(error){
// 			if (error) {
// 			    // display the error to the user
// 			    alertify.error("Ошибка!", error);
// 			    throwError(error.reason);
// 			} else {
// 			    // Router.go('postPage', {_id: currentPostId});
// 			    alertify.success("Профиль успешно обновлен!");
// 			}
// 		});
// 	}
// });

// Template.profile.helpers({
//   M: function () {
//     return "Муж";
//   },
//   F: function() {
//   	return "Жен";
//   }
// });