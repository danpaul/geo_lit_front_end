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