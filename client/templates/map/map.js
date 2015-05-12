Template.map.onRendered(function () {

	ymaps.ready(init);

	function init () {
		var map = new ymaps.Map('map', {
			center: [61.293744, 73.33554],
			zoom: 7
		});

		var lines = Lines.find().fetch();
		var amss = AMSs.find().fetch();
		var obectExplyats = ObectExplyats.find().fetch();

		var amsMarker = _.each(amss, function(ams){

			if (ObectExplyats.findOne(ams.mesto)){
				var obectExplyat = ObectExplyats.findOne(ams.mesto);
				BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
					'<div style="margin: 10px;">' + '<h5>' + ams.name_psevdo + '</h5>' +
						'<a class="btn btn-info" href="/PRTOdoc/' + obectExplyat._id + '">ПРТО doc</a>' + '&nbsp;' +
						'<a class="btn btn-success" href="/PRTOxls/' + obectExplyat._id + '">ПРТО xls</a>' + '&nbsp;' +
						'<a class="btn btn-primary" href="/AMSs/'+ ams._id + '">АМС</a>' + '&nbsp;' +
						'<a class="btn btn-warning" href="/PRTO/' + obectExplyat._id + '">ПРТО</a>' +
					'</div>'
				);
			}else{
				BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
					'<div style="margin: 10px;">' + '<h5>' + ams.name_psevdo + '</h5>' +
						'<a class="btn btn-primary" href="/AMSs/'+ ams._id + '">АМС</a>' + '&nbsp;' +
					'</div>'
				);
			}
			
			var placemark = new ymaps.Placemark([ams.shirota_DD, ams.dolgota_DD], {
				iconContent: ams.name_psevdo,
					name: ams.name_psevdo
				}, {
					balloonContentLayout: BalloonContentLayout,
					preset: 'twirl#redStretchyIcon'
				});
									
			map.controls.add('zoomControl', {left : '35px'});
			// Выбор типа карты
			map.controls.add(new ymaps.control.TypeSelector());
			map.geoObjects.add(placemark);
		});

		var lineMarker = _.each(lines, function(line){
			var amsCount = line.ams.length;
			for(var i=0; i < (amsCount - 1); i++){
				var j = i + 1;
				var amsOne = AMSs.findOne({_id: line.ams[i]});
				var amsTwo = AMSs.findOne({_id: line.ams[j]});
				var geometry = [ [ amsOne.shirota_DD, amsOne.dolgota_DD ], [ amsTwo.shirota_DD, amsTwo.dolgota_DD ]];
				properties = {
					hintContent: '1213'
				},
				options = {
					draggable: true,
					strokeColor: '#120a8f',
					strokeWidth: 5,
					strokeOpacity: 0.7
				},
				polyline = new ymaps.Polyline(geometry, properties, options);
				map.geoObjects.add(polyline);
			}
		});
	}
});





// Template.map.helpers({
// 	mapRRLOptions: function() {
// 		// Make sure the maps API has loaded
// 		if (GoogleMaps.loaded()) {
// 			// Map initialization options
// 			return {
// 				center: new google.maps.LatLng(61.261338,73.401701),
// 				zoom: 8,
// 				panControl: true,
// 				zoomControl: true,
// 				scaleControl: true
// 			};
// 		}
// 	}
// });

// Template.map.onCreated(function() {
// 	// We can use the `ready` callback to interact with the map API once the map is ready.
// 	GoogleMaps.ready('mapRRL', function(map) {
// 		// Add a marker to the map once it's ready
// 		// var myLatlng = new google.maps.LatLng(-25.363882,131.044922);

// 		var lines = Lines.find();
// 		var amss = AMSs.find().fetch();

// 		var amsMarker = _.each(amss, function(ams){

// 			var contentString = '<div style="margin: 10px;">' + '<h5>' + ams.name_psevdo + '</h5>' +
// 													'<a class="btn btn-info" href="/Alarms">DOC</a>' + '&nbsp;' +
// 													'<a class="btn btn-success" href="{{pathFor "LineList"}}">АМС</a>' + '&nbsp;' +
// 													'<a class="btn btn-warning" href="{{pathFor "LineList"}}">ПРТО</a>' + '&nbsp;' +
// 													'</div>';

// 			var infowindow = new google.maps.InfoWindow({
// 				content: contentString
// 			});

// 			var marker = new google.maps.Marker({
// 				position: new google.maps.LatLng(ams.shirota_DD,ams.dolgota_DD),
// 				map: map.instance,
// 				title: ams.name_psevdo
				
// 			});

// 			google.maps.event.addListener(marker, 'click', function() {
// 				infowindow.open(map.instance,marker);
// 			});

// 		});

// 		// var marker = new google.maps.Marker({
// 		// 	position: new google.maps.LatLng(-25.363882,131.044922),
// 		// 	map: map.instance,
// 		// 	title: 'Hello World!'
// 		// });
// 	});
// });