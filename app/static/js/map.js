var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {
            lat: 39.9522, 
            lng: -75.1635
        },
        zoom: 16,
        draggable: true
    });
}

$(function() {
    initMap();
});