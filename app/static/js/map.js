$(function() {
	var map;
	var startLat, startLng;

	function onLoad() {
		var lat, lng;
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
				}

				var pt = {
					"type": "Feature",
					"properties": {},
					"geometry": {
						"type": "Point",
						"coordinates": [Number(startLng), Number(startLat)]
					}
				};

				var stores = findClosestStores(pt);

				if (stores.length > 0)
					ko.applyBindings(new HealthyStoresViewModel(stores));

				initMap(startLat, startLng);
			});
		}

		codeAddress();
	}

	function initMap(lat, lng) {
		var latlng = {
			lat: Number(lat),
			lng: Number(lng)
		};

		map = new google.maps.Map(document.getElementById('map'), {
			center: latlng,
			zoom: 16,
			draggable: true
		});

		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: 'Hello World!'
		});

		$(".store-row").click(function() {
			var self = this;
			console.log(self);
			//remove active state class to previous elements
			$(".store-row").find(".panel-primary").removeClass("active");
			var lat = $($(self).find("[data-lat]")[0]).attr("data-lat");
			var lng = $($(self).find("[data-lng]")[0]).attr("data-lng");
			console.log(lat)

			//highlight what store has  been selected
			var panel = $(this).find(".panel-primary");
			$(panel).addClass("active");

			initMap(lat, lng);
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


	function HealthyStoresViewModel(stores) {
		var self = this;

		self.stores = ko.observableArray(stores);
	}

	onLoad();
	
});