(function() {
    "use strict";

    var map = new google.maps.Map($('#map')[0], {
	    center: {
            lat: 39.9522, 
            lng: -75.1635
        },
	    zoom: 16
    });
})(window, document, google);