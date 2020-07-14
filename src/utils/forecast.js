const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const wUrl='http://api.weatherstack.com/current?access_key=1318243caf3ba4244f6a8ed7c398258d&query='+latitude+','+longitude
    request({url:wUrl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect',undefined)
        }else if(response.body.error){
            callback('Please specify a valid location identifier using the query parameter',undefined)
        }else{
            callback(undefined,{
                description:response.body.current.weather_descriptions[0],
                currentTemp:response.body.current.temperature,
                feelsLike:response.body.current.feelslike
            })
        }
    })
}

module.exports=forecast