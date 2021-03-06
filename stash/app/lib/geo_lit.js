var geoLit = {}

var _ = require('underscore')
var place = require('./place')

/*******************************************************************************

                    DATA

*******************************************************************************/

var DEFAULT_RANGE = 5 // distance in KM
var TEST_MOVE = false
var TEST_MAX_DISTANCE = 0.1

geoLit.map = null
geoLit.currentLatitude = null
geoLit.currentLongitude = null
geoLit.mapFollow = true
geoLit.intervalId = null
geoLit.intervalTime = 1000 * 5 //10 seconds
geoLit.mapId = null
geoLit.placeMarkers = {}
geoLit.userMarker = null
geoLit.zoomLevel = 12

/*******************************************************************************

                    FUNCTIONS

*******************************************************************************/

geoLit.createMap = function(){

    var mapOptions = {
        zoom: geoLit.zoomLevel,
        center: new google.maps.LatLng(geoLit.currentLatitude,
                                       geoLit.currentLongitude)
    };
    geoLit.map = new google.maps.Map(document.getElementById(geoLit.mapId),
                                     mapOptions);
}

geoLit.getPosition = function(callbackIn){
    navigator.geolocation.getCurrentPosition(function(position){
        callbackIn(null, { latitude: position.coords.latitude,
                           longitude: position.coords.longitude });
    }, callbackIn)
}

geoLit.init = function(mapId, callbackIn){

    geoLit.mapId = mapId
    google.maps.event.addDomListener(window, 'load', function(){
        geoLit.updatePosition(function(err){
            if( err ){ callbackIn(err) }
            else{
                geoLit.createMap()
                geoLit.updateUserMarker()
                geoLit.intervalId = window.setInterval(geoLit.intervalCallback,
                                                       geoLit.intervalTime)
                callbackIn()
            }
        })
    })
}

geoLit.updatePosition = function(callbackIn){

    navigator.geolocation.getCurrentPosition(function(position){
        geoLit.currentLatitude = position.coords.latitude
        geoLit.currentLongitude = position.coords.longitude
        callbackIn()
    }, callbackIn)
}


// asdf
geoLit.addPlacesToMap = function(places){

    _.each(places, function(place){

        // set new marker
        var latLang = new google.maps.LatLng(place.location[1],
                                             place.location[0]);

        
        geoLit.placeMarkers[place._id] =  new google.maps.Marker({
            position: latLang,
            map: geoLit.map,
            title: 'Current Position',
            geoLit: {_id: place._id}
        });

  google.maps.event.addListener(geoLit.placeMarkers[place._id],
                                'click',
                                function(){
// asdf asdf
console.log(this.geoLit)

  });

    })
}

geoLit.updatePlaces = function(callbackIn){

    place.findNear({latitude: geoLit.currentLatitude,
                    longitude: geoLit.currentLongitude,
                    range: DEFAULT_RANGE},
                   function(err, places){

        // find any markers not currently on the map
        var newPlaces = _.filter(places, function(place){
            return(typeof(geoLit.placeMarkers[place._id]) === 'undefined')
        })
// console.log(geoLit.placeMarkers)
        geoLit.addPlacesToMap(newPlaces)

    })
}

geoLit.updateUserMarker = function(){
    // delete existing marker
    if( geoLit.userMarker !== null ){ geoLit.userMarker.setMap(null) }


// asdf asdf asdf
    // set new marker
    var latLang = new google.maps.LatLng(geoLit.currentLatitude + .002,
                                         geoLit.currentLongitude + .002);

    geoLit.userMarker = new google.maps.Marker({
      position: latLang,
      map: geoLit.map,
      title: 'Current Position'
    });

    if( geoLit.mapFollow ){
        geoLit.recenterMap()
    }
}

// recenters map on users current position
geoLit.recenterMap = function(){
    var center = new google.maps.LatLng(geoLit.currentLatitude,
                                        geoLit.currentLongitude);
    geoLit.map.panTo(center);
}

// TODO: add function to check if points should get updated
geoLit.intervalCallback = function(){

    var updatePlaces = true
    geoLit.updatePosition(function(err){

        if( TEST_MOVE ){
            geoLit.currentLatitude += Math.random() * TEST_MAX_DISTANCE
            geoLit.currentLongitude += Math.random() * TEST_MAX_DISTANCE
        }

        if(err){
            console.log(err)
            return
        }
        geoLit.updateUserMarker()
        if( updatePlaces ){
            geoLit.updatePlaces(function(err){
                if( err ){ console.log(err) }
            })
        }
    })
}

module.exports = geoLit