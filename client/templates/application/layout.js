Template.layout.helpers({
	dateYear: function () {
		nowDate = new Date();
		return moment(nowDate).format('YYYY');
	}
});