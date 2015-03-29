var geoLit = {}

/*******************************************************************************

                    DATA

*******************************************************************************/

geoLit.map
geoLit.currentLatitude
geoLit.currentLongitude
geoLit.mapId
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

geoLit.updatePosition = function(callbackIn){
    navigator.geolocation.getCurrentPosition(function(position){
        geoLit.currentLatitude = position.coords.latitude
        geoLit.currentLongitude = position.coords.longitude
        callbackIn()
    }, callbackIn)
}

geoLit.init = function(mapId, callbackIn){
    geoLit.mapId = mapId
    google.maps.event.addDomListener(window, 'load', function(){
        geoLit.updatePosition(function(err){
            if( err ){ callbackIn(err) }
            else{
                geoLit.createMap()
                callbackIn()
            }
        })
    })
}

module.exports = geoLit