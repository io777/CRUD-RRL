// опубликовать все склады
Meteor.publish('Sklads', function(){
  return Sklads.find();
});
// опубликовать один склад
Meteor.publish('singleSklad', function(id) {
  check(id, String);
  return Sklads.find(id);
});
// опубликовать всех пользователей
Meteor.publish('Users', function() {
  return Meteor.users.find();
});
// опубликовать одного пользователя
Meteor.publish('singleUser', function(id) {
	check(id, String);
  	return Meteor.users.find(id);
});

// опубликовать роли
Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
});

// опубликовать все АФУ
Meteor.publish('AFYs', function(){
  return AFYs.find();
});
// опубликовать один АФУ
Meteor.publish('singleAFY', function(id) {
  check(id, String);
  return AFYs.find(id);
});
// опубликовать все аварии
Meteor.publish('Alarms', function(){
  return Alarms.find();
});
// опубликовать одну аварию
Meteor.publish('singleAlarm', function(id) {
  check(id, String);
  return Alarms.find(id);
});
// опубликовать все АМС
Meteor.publish('AMSs', function(){
  return AMSs.find();
});
// опубликовать один АМС
Meteor.publish('singleAMS', function(id) {
  check(id, String);
  return AMSs.find(id);
});
// опубликовать все Цеха
Meteor.publish('Cexs', function(){
  return Cexs.find();
});
// опубликовать один Цех
Meteor.publish('singleCex', function(id) {
  check(id, String);
  return Cexs.find(id);
});
// опубликовать все линии
Meteor.publish('Lines', function(){
  return Lines.find();
});
// опубликовать одну линию
Meteor.publish('singleLine', function(id) {
  check(id, String);
  return Lines.find(id);
});
// опубликовать все объекты эксплуатации
Meteor.publish('ObectExplyats', function(){
  return ObectExplyats.find();
});
// опубликовать один объект эксплуатации
Meteor.publish('singleObectExplyat', function(id) {
  check(id, String);
  return ObectExplyats.find(id);
});

















