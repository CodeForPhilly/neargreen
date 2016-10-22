$(function() {
	var map;
	function initMap(lat, lng) {
		var latlng = {lat: Number(lat), lng: Number(lng)};
		
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
	}


	function HealthyStoresViewModel() {
		var self = this;

		self.stores = ko.observableArray([
			{ 
				name: "Store 1", 
				latlng: [39.9532, -75.1645], 
				address1: "1400 Market St.",
				city: "Philadelphia",
				state: "PA",
				zipCode: "19106",
				telephoneNumber: "215-555-5555" 
			},
			{ 
				name: "Store 2", 
				latlng: [39.9632, -75.1645], 
				address1: "1401 Market St.",
				city: "Philadelphia",
				state: "PA",
				zipCode: "19106",
				telephoneNumber: "215-555-5555" 
			},
			{ 
				name: "Store 3", 
				latlng: [39.9579, -75.1645],
				address1: "1403 Market St.",
				city: "Philadelphia",
				state: "PA",
				zipCode: "19106",
				telephoneNumber: "215-555-5555" 
			},
			{ 
				name: "Store 4", 
				latlng: [39.9532, -75.2645],
				address1: "1404 Market St.",
				city: "Philadelphia",
				state: "PA",
				zipCode: "19106",
				telephoneNumber: "215-555-5555" 
			},
			{ 
				name: "Store 5", 
				latlng: [39.8612, -75.6292],
				address1: "1405 Market St.",
				city: "Philadelphia",
				state: "PA",
				zipCode: "19106",
				telephoneNumber: "215-555-5555" 
			}
		]);
	}

	ko.applyBindings(new HealthyStoresViewModel());

	$(".store-row").click(function() {
		var that = this;
		//remove active state class to previous elements
		$(".store-row").find(".panel-primary").removeClass("active");
		var lat = $($(that).find("[data-lat]")[0]).attr("data-lat");
		var lng = $($(that).find("[data-lat]")[0]).attr("data-lng");

		//highlight what store has  been selected
		var panel = $(this).find(".panel-primary");
		$(panel).addClass("active");

		initMap(lat, lng);
	});


    initMap(39.9522, -75.1635);
});