//установить пользователя при загрузки
if (Meteor.isServer){
	if(Meteor.users.find().count() == 0){
		Accounts.createUser({
			username: 'admin',
			email: 'admin@mail.ru',
			password: '12345678',
		});
		Meteor.users.update({username: 'admin'}, {$set: {'roles': ['admin']}});
	}
}