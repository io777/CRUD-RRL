var Schemas = {};

Schemas.UserProfile = new SimpleSchema({
	firstName: {
		type: String,
		label: "Имя",
		max: 25,
		optional: true
	},
	middleName: {
		type: String,
		label: "Отчество",
		max: 25,
		optional: true
	},
	lastName: {
		type: String,
		label: "Фамилия",
		max: 25,
		optional: true
	},
	birthday: {
		type: Date,
		optional: true,
		label: "Дата рождения"
	},
	gender: {
		type: String,
		label: "Пол",
		optional: true,
		allowedValues: ['Муж', 'Жен'],
			autoform: {
			  type: "select2",
			  afFieldInput: {
				placeholder: "Выберите пол",
				firstOption: ""
			  },
			  options: function () {
				return [
				  {label: "Муж", value: "Муж"},
				  {label: "Жен", value: "Жен"},
				];
			  }
			}
	},
	organization : {
		type: String,
		label: "Организация",
		max: 30,
		optional: true
	},
	// website: {
	//     type: String,
	//     label: "Сайт",
	//     max: 50,
	//     optional: true,
	//     regEx: SimpleSchema.RegEx.Url
	// },
	addressWork: {
		type: String,
		optional: true,
		label: "Адрес места работы",
		max: 200
	}
});

Schemas.User = new SimpleSchema({
	username: {
		type: String,
		label: "Имя пользователя",
		regEx: /^[a-z0-9A-Z_]{3,25}$/,
		optional: true,
		max: 25
	},
	emails: {
		type: [Object],
		label: "Почтовый адрес",
		// this must be optional if you also use other login services like facebook,
		// but if you use only accounts-password, then it can be required
		optional: true
	},
	"emails.$.address": {
		type: String,
		label: "Почтовый адрес",
		regEx: SimpleSchema.RegEx.Email
		// max: 40
	},
	"emails.$.verified": {
		type: Boolean,
		label: "проверить"
	},
	createdAt: {
		type: Date,
		label: "Дата создания"
	},
	profile: {
		type: Schemas.UserProfile,
		label: "Профиль",
		optional: true
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true
	},
	// Add `roles` to your schema if you use the meteor-roles package.
	// Note that when using this package, you must also specify the
	// `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
	// Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
	// You can't mix and match adding with and without a group since
	// you will fail validation in some cases.
	roles: {
		type: [String],
		label: "Роли",
		allowedValues: ['user', 'admin', 'moderator'],
			autoform: {
			  type: "select2",
			  afFieldInput: {
				placeholder: "Выберите роль",
				firstOption: "",
				multiple: true
			  },
			  options: function () {
				return [
					{
						optgroup: "Роли",
						options: [
							{label: "пользователь", value: "user"},
							{label: "администратор", value: "admin"},
							{label: "модератор", value: "moderator"}
						]
					}
				];
			  }
			},
		optional: true,
		blackbox: true
	}
	// roles:{
	//     type: Array,
	//     optional: true,
	//     maxCount: 5
	// },
	// "roles.$":{
	//     type: Object,
	//     optional: true
	// },
	// "roles.$":{
	//     type: String,
	//     autoform: {
	//         type: "select",
	//         options: function () {
	//             return [
	//                 { optgroup: "Group",
	//                     options: [
	//                         {label: "2013", value: 2013},
	//                         {label: "2014", value: 2014},
	//                         {label: "2015", value: 2015}
	//                     ]
	//                 }
	//             ];
	//         }  
	//     }
	// }
});

Meteor.users.attachSchema(Schemas.User);


// права на изменение базы пользователь
Meteor.users.allow({
	insert: function(userId, doc){
		var loggedInUser = Meteor.user();
		if (Roles.userIsInRole(loggedInUser, ['admin'])) {
			return true;
		}
	},
	update: function(userId, doc, fields, modifier){
		// админ может изменять всех пользователей
		var loggedInUser = Meteor.user();
		if (Roles.userIsInRole(loggedInUser, ['admin'])) {
			return true;
		}
		// текущий пользователь может изменять свои данные
		if (userId == doc._id){
			return true;
		}
	},
	remove: function(userId, doc){
		var loggedInUser = Meteor.user();
		if (Roles.userIsInRole(loggedInUser, ['admin'])) {
			return true;
		}
	}
});
// права на изменение базы пользователь
Meteor.users.deny({
	update: function(userId, doc, fields, modifier){
		var loggedInUser = Meteor.user();
		// для админа нет запретов
		if (Roles.userIsInRole(loggedInUser, ['admin'])) {
		// пользователю нельзя менять роли
		} else {
			return _.contains(fields, 'roles');
		}
	}
});

// установить пароль пользователя
if (Meteor.isServer) {
	Meteor.methods({
		addPassword: function(data) {
			check(data, {
				password: String,
				user_id: String
			});
			return Accounts.setPassword(data.user_id, data.password);
		}
	});
}