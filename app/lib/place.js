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


place.findNear = function(positionData, callbackIn){

    $.ajax({
        type: "GET",
        url: config.geoLitEndpoint + '/positions-near',
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