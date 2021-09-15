const request=require('request');

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=01d7afa7d85e20b7b5220f6d094587e8&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude);
    request({url,json:true},(err, {body})=>{
        if(err) {
            callback("Unable to connect to weatherstack",undefined);
        }else if(body.error) {
            callback("Error: " + body.error.info,undefined);
        }else {
            callback(undefined,"The current temperature is "+body.current.temperature+" but it feels like "+body.current.feelslike); 
        }
    })
}

module.exports = forecast;