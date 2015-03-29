(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// npm run watch-js
// python -m SimpleHTTPServer 8080

/*******************************************************************************

                    

*******************************************************************************/

var MAP_ID = 'map-canvas'

var geoLit = require('./lib/geo_lit')

geoLit.init(MAP_ID, function(err){
    if( err ){ console.log(err) }
    else{
        console.log('map initialzed')
    }
})
},{"./lib/geo_lit":2}],2:[function(require,module,exports){
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
},{}]},{},[1]);
