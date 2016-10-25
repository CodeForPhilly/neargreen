$(function() {
	var map;
	var startLat, startLng;
	var infowindow;

	function onLoad() {
		
		function getQueryVariable(variable)
		{
		       var query = window.location.search.substring(1);
		       var vars = query.split("&");
		       for (var i=0;i<vars.length;i++) {
		               var pair = vars[i].split("=");
		               if(pair[0] == variable){return pair[1];}
		       }
		       return(false);
		}

		var geocoder = new google.maps.Geocoder();

		function codeAddress() {
			var address = decodeURIComponent(getQueryVariable("destination")).replace(/\+/g , " ");
			geocoder.geocode({
				'address': address,
			},	function (results, status) {
				if (status === "OK") {
					startLat = results[0].geometry.location.lat();
					startLng = results[0].geometry.location.lng();

					initMap(startLat, startLng);
				}
			});
		}

		codeAddress();
	}

	function initMap(lat, lng) {
		var latlng = {
			lat: Number(lat),
			lng: Number(lng)
		};

		var pt = {
			"type": "Feature",
			"properties": {},
			"geometry": {
				"type": "Point",
				"coordinates": [Number(lng), Number(lat)]
			}
		};

		var stores = findClosestStores(pt);
		var markers = [];

		map = new google.maps.Map(document.getElementById('map'), {
			center: latlng,
			zoom: 14,
			draggable: true
		});

		if (stores.length > 0)
		{
			if (stores.length > 5) {
				$(".results-container").addClass("results-container-scrollable");
			}

			for (var i = 0; i < stores.length; i++) 
			{
				var store = stores[i];
				store.marker = makeMarker(store.name, store.latlng);
			}

			ko.applyBindings(new HealthyStoresViewModel(stores));
		}

		$(".store-row").click(function() {
			var self = this;
			//remove active state class to previous elements
			$(".store-row").find(".panel-primary").removeClass("active");
			var lat = $($(self).find("[data-lat]")[0]).attr("data-lat");
			var lng = $($(self).find("[data-lng]")[0]).attr("data-lng");

			map.panTo({lat: Number(lat), lng: Number(lng)});

			//highlight what store has  been selected
			var panel = $(this).find(".panel-primary");
			$(panel).addClass("active");
		});

	}

	function findClosestStores(pt) {
		var stores = [];

		var unit = 'miles';
		var buffered = turf.buffer(pt, 1, unit);

		$.ajax({
			url: "Healthy_Corner_Stores.geojson",
			dataType: 'json',
			async: false,
			success: function(data) {
				$.each(data, function(key, val) {
					if (key === "features") {
						$.each(val, function(subkey, subval) {
							var isInside = turf.inside(subval, buffered);
							if (isInside) {
								var store = {
									name: subval.properties.OFFICIAL_STORE_NAME,
									latlng: [subval.geometry.coordinates[1], subval.geometry.coordinates[0]],
									address1: subval.properties.STORE_ADDRESS,
									city: "Philadelphia",
									state: "PA",
									zipCode: subval.properties.ZIP,
									telephoneNumber: "215-555-5555"
								};

								stores.push(store);
							}
						});
					}
				});				
			}
		});

		return stores;
	}

	function makeMarker(name, latlng)
	{	
		var marker = new google.maps.Marker({
			position: {
				lat: latlng[0],
				lng: latlng[1]
			},
			map: map,
			title: name,
			icon: {
				url: '../../images/leaf.png',
				scaledSize: new google.maps.Size(35.5, 52.25), // scaled size
			    origin: new google.maps.Point(0,0), // origin
			    anchor: new google.maps.Point(0, 0) // anchor
			}
		});

		marker.addListener('click', function() {
			infowindow = new google.maps.InfoWindow({
			    content: '<h5>' + marker.title + '</h5>'
			  });
			infowindow.open(map, marker);
		});

		return marker;
	}

	function HealthyStoresViewModel(stores) {
		var self = this;

		self.stores = ko.observableArray(stores);
	}

	onLoad();
	
});