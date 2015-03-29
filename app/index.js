// npm run watch-js

// browserify ./public/js/main.js -o ./public/js/bundle.js
// browserify ./public/js/main.js -o ./public/js/bundle.js --debug

var geoLit = {}

/*******************************************************************************

                    DATA

*******************************************************************************/

geoLit.map
geoLit.currentPosition
geoLit.defaults = {
    zoomLevel: 12
}

/*******************************************************************************

                    FUNCTIONS

*******************************************************************************/

geoLit.init = function(coordinates) {
    var mapOptions = {
        zoom: geoLit.defaults.zoomLevel,
        center: new google.maps.LatLng(coordinates.latitude,
                                       coordinates.longitude)
    };
    geoLit.map = new google.maps.Map(document.getElementById('map-canvas'),
                                     mapOptions);
}

geoLit.updateLocation = function(position){
    google.maps.event.addDomListener(window, 'load', geoLit.init)
    geoLit.init(position.coords)
}

navigator.geolocation.getCurrentPosition(geoLit.updateLocation)

// geoLit.init()