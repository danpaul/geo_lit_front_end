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
            point.location = [position.longitude, position.latitude]

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