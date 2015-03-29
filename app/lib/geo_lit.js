var geoLit = {}

/*******************************************************************************

                    DATA

*******************************************************************************/

geoLit.map = null
geoLit.currentLatitude = null
geoLit.currentLongitude = null
geoLit.intervalId = null
geoLit.intervalTime = 1000 * 10 //10 seconds
// geoLit.intervalTime = 1000 //10 seconds
geoLit.mapId = null
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

geoLit.updateUserMarker = function(){

    // delete existing marker
    if( geoLit.userMarker !== null ){ geoLit.userMarker.setMap(null) }

    // set new marker
    var latLang = new google.maps.LatLng(geoLit.currentLatitude,
                                         geoLit.currentLongitude);

    geoLit.userMarker = new google.maps.Marker({
      position: latLang,
      map: geoLit.map,
      title: 'Current Position'
    });
}

geoLit.intervalCallback = function(){
console.log(geoLit.currentLatitude + ", " + geoLit.currentLongitude)
    geoLit.updatePosition(function(err){
        if(err){
            console.log(err)
            return
        }
        geoLit.updateUserMarker
    })
}

module.exports = geoLit