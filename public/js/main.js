var map;

function initialize(coordinates) {
    var mapOptions = {
        // zoom: 8,
        zoom: 12,
        center: new google.maps.LatLng(coordinates.latitude,
                                       coordinates.longitude)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
                              mapOptions);
}

var updateLocation = function(position){
    google.maps.event.addDomListener(window, 'load', initialize)
    initialize(position.coords)
}

navigator.geolocation.getCurrentPosition(updateLocation);