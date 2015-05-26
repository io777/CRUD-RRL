// опубликовать все склады
Meteor.publish('Sklads', function(){
	return Sklads.find();
});
// опубликовать один склад
Meteor.publish('singleSklad', function(id) {
	check(id, String);
	return Sklads.find(id);
});
// опубликовать все типы СИЗ
Meteor.publish('TypeCizs', function(){
	return TypeCizs.find();
});
// опубликовать один тип СИЗ
Meteor.publish('singleTypeCiz', function(id) {
	check(id, String);
	return TypeCizs.find(id);
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
// опубликовать все тех. здания
Meteor.publish('TechZdanias', function(){
	return TechZdanias.find();
});
// опубликовать одно тех. здание
Meteor.publish('singleTechZdania', function(id) {
	check(id, String);
	return TechZdanias.find(id);
});
// опубликовать все станцион. оборудование
Meteor.publish('StancionOboryds', function(){
	return StancionOboryds.find();
});
// опубликовать один станцион. оборудование
Meteor.publish('singleStancionOboryd', function(id) {
	check(id, String);
	return StancionOboryds.find(id);
});
// опубликовать все матерьялы
Meteor.publish('Materials', function(){
	return Materials.find();
});
// опубликовать один матерьял
Meteor.publish('singleMaterial', function(id) {
	check(id, String);
	return Materials.find(id);
});
// опубликовать всех работников
Meteor.publish('Workers', function(){
	return Workers.find();
});
// опубликовать одиного работника
Meteor.publish('singleWorker', function(id) {
	check(id, String);
	return Workers.find(id);
});
// опубликовать всю спец. одежда
Meteor.publish('SpezOdezdas', function(){
	return SpezOdezdas.find();
});
// опубликовать одину спец. одежду
Meteor.publish('singleSpezOdezda', function(id) {
	check(id, String);
	return SpezOdezdas.find(id);
});
// опубликовать все СИЗ
Meteor.publish('Cizs', function(){
	return Cizs.find();
});
// опубликовать один СИЗ
Meteor.publish('singleCiz', function(id) {
	check(id, String);
	return Cizs.find(id);
});

Meteor.publish("user", function() {
	//returns undefined if not logged in so check if logged in first
	if(this.userId) {
		var user = Meteor.users.findOne(this.userId);
		//var user is the same info as would be given in Meteor.user();
	}
});