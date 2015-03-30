(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// npm run watch-js
// python -m SimpleHTTPServer 8080

var TEST_USER_ID = 111

/*******************************************************************************

                    SETUP

*******************************************************************************/

var MAP_ID = 'map-canvas'

var geoLit = require('./lib/geo_lit')
var place = require('./lib/place')

geoLit.init(MAP_ID, function(err){
    if( err ){ console.log(err) }
    else{
        console.log('map initialzed')
    }
})

/*******************************************************************************

                    EVENTS

*******************************************************************************/

$(document).ready(function(){

    $('.js-add-place').click(function(e){

        geoLit.getPosition(function(err, position){

            var point = {}
            point.title = $('.js-add-place-form').find("[name='title']").val()
            point.user = TEST_USER_ID
            point.location = position

            place.add(point, function(err){
                if( err ){
                    console.log(err)
                    return
                }
                console.log('success')
            })
        })
    })
})
},{"./lib/geo_lit":2,"./lib/place":3}],2:[function(require,module,exports){
var geoLit = {}

/*******************************************************************************

                    DATA

*******************************************************************************/

var TEST_MOVE = false
var TEST_MAX_DISTANCE = 0.1

geoLit.map = null
geoLit.currentLatitude = null
geoLit.currentLongitude = null
geoLit.mapFollow = true
geoLit.intervalId = null
geoLit.intervalTime = 1000 * 5 //10 seconds
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

geoLit.intervalCallback = function(){
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
    })
}

module.exports = geoLit
},{}],3:[function(require,module,exports){
var place = {}
var config = require('../../config.js')

place.add = function(positionData, callbackIn){

    $.ajax({
        type: "POST",
        url: config.geoLitEndpoint + '/position',
        data: positionData,
        success: function(data){
            console.log(data)
        },
        error: function(err){
            console.log(err)
        },
        dataType: 'JSON'
    });

}

module.exports = place
},{"../../config.js":4}],4:[function(require,module,exports){
var config = {}

config.geoLitEndpoint = 'http://localhost:3000'

module.exports = config
},{}]},{},[1]);
