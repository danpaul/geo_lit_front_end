var place = {}
var config = require('../../config.js')

place.add = function(userId, title, positionObject, callbackIn){

    $.ajax({
        type: "POST",
        url: config.geoLitEndpoint + '/position',
        data: {test: 'foo'},
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