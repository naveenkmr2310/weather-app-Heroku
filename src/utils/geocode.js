const request=require('request')

const geocode=(address,callback)=>{
    const gURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmF2ZWVua21yMjMxMCIsImEiOiJja2NqZnozNGsxaW15MndwMGIwMml0MzZzIn0.kL35hEk-VmnN4u84kJpgAg&limit=1'
    request({ url: gURL, json: true }, (error, response) => {
        if(error){
            callback('Unable to connect',undefined)
        }else if(response.body.features.length===0){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports=geocode