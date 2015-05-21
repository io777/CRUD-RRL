Template.dashboard.onRendered(function () {
	$('#carousel').slick({
		dots: true,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 2000
	});

	//users
	var users = Meteor.users.find({},{sort: {createdAt: 1}}).fetch();
	var user_date = ['user_date'];
	var user_kol = ['user_kol'];
	var i = 0;

	_.filter(users, function(user){
		i++;
		user_kol.push(i);
		user_date.push(moment(user.createdAt).format('YYYY-MM-DD'));
	})

	Session.set('user_kol', user_kol);
	Session.set('user_date', user_date);

	var user_chart = c3.generate({
		bindto: this.find('.user_chart'),
			data: {
				x: 'user_date',
				columns: [['user_date'],['user_kol']],
				names: {
					user_kol: 'Пользователи'
				},
				type: 'scatter',
				labels: true,
				colors: {
					user_kol: d3.rgb('#00ff00').darker(2)
				},
			},
			grid: {
				x: {
					show: true
				},
				y: {
					show: true
				}
			},
			axis: {
				x: {
					label: {
						text: 'Дата регистрации'
					},
					type: 'timeseries',
					tick: {
						format: '%Y-%m-%d',
						fit: false,
						rotate: 75,
						multiline: false
					}
				},
				y: {
					label: {
						text: 'Количество пользователей (шт)',
						position: 'outer-middle'
					}
				}
			}
	});

	//ams
	var amss = AMSs.find({}, {sort: {Visota_AMS: 1}}).fetch();
	var ams_visota = ['ams_visota'];
	var ams_name_psevdo = ['ams_name_psevdo'];

	_.filter(amss, function(ams){
		ams_visota.push(ams.Visota_AMS);
		ams_name_psevdo.push(ams.name_psevdo);
	})

	Session.set('ams_visota', ams_visota);
	Session.set('ams_name_psevdo', ams_name_psevdo);

	var ams_chart = c3.generate({
		bindto: this.find('.ams_chart'),
			data: {
				x: 'ams_name_psevdo',
				columns: [['ams_name_psevdo'],['ams_visota']],
				names: {
					ams_visota: 'АМС'
				},
				type: 'bar',
				labels: true
			},
			grid: {
				x: {
					show: true
				},
				y: {
					show: true
				}
			},
			bar: {
				width: {
					ratio: 0.3 // this makes bar width 50% of length between ticks
				}
				// or
				//width: 100 // this makes bar width 100px
			},
			axis: {
				x: {
					label: {
						text: 'Наименование объекта эксплуатации',
						position: 'outer-center'
					},
					type: 'category' // this needed to load string x value
				},
				y: {
					label: {
						text: 'Высота (м)',
						position: 'outer-middle'
					}
				}
			}
	});

	this.autorun(function (tracker) {
		user_chart.load({columns: [
			Session.get('user_kol'),
			Session.get('user_date'),
			[]
		]});
		ams_chart.load({columns: [
			Session.get('ams_name_psevdo'),
			Session.get('ams_visota'),
			[]
		]});
	});
});

Template.dashboard.helpers({
	CizsCount: function(){
		return Cizs.find().count();
	},
	AMSsCount: function(){
		return AMSs.find().count();
	},
	ObectExplyatsCount: function(){
		return ObectExplyats.find().count();
	},
	AFYsCount: function(){
		return AFYs.find().count();
	},
	AlarmsCount: function(){
		return Alarms.find().count();
	},
	UsersCount: function(){
		return Meteor.users.find().count();
	}
});