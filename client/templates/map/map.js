Template.map.helpers({
	mapRRLOptions: function() {
		// Make sure the maps API has loaded
		if (GoogleMaps.loaded()) {
			// Map initialization options
			return {
				center: new google.maps.LatLng(61.261338,73.401701),
				zoom: 8,
				panControl: true,
				zoomControl: true,
				scaleControl: true
			};
		}
	}
});

Template.map.onCreated(function() {
	// We can use the `ready` callback to interact with the map API once the map is ready.
	GoogleMaps.ready('mapRRL', function(map) {
		// Add a marker to the map once it's ready
		// var myLatlng = new google.maps.LatLng(-25.363882,131.044922);

		var lines = Lines.find();
		var amss = AMSs.find().fetch();

		var amsMarker = _.each(amss, function(ams){

			var contentString = '<div style="margin: 10px;">' + '<h5>' + ams.name_psevdo + '</h5>' +
													'<a class="btn btn-info" href="/Alarms">DOC</a>' + '&nbsp;' +
													'<a class="btn btn-success" href="{{pathFor "LineList"}}">АМС</a>' + '&nbsp;' +
													'<a class="btn btn-warning" href="{{pathFor "LineList"}}">ПРТО</a>' + '&nbsp;' +
													'</div>';

			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(ams.shirota_DD,ams.dolgota_DD),
				map: map.instance,
				title: ams.name_psevdo
				
			});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map.instance,marker);
			});

		});

		// var marker = new google.maps.Marker({
		// 	position: new google.maps.LatLng(-25.363882,131.044922),
		// 	map: map.instance,
		// 	title: 'Hello World!'
		// });
	});
});