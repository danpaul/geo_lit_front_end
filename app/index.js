// npm run watch-js
// python -m SimpleHTTPServer 8080

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
    // console.log('foo')
    $('.js-add-place').click(function(e){
        geoLit.getPosition(function(err, position){
            place.add()
        })
    })
})