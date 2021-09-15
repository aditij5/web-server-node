const request=require('request');


const geoCode=(address, callback) => {
    const url='http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWRpdGlqOTkiLCJhIjoiY2t0amZqcmFvMWJkMzJvcGVxcHdpMDZyNSJ9.GEvR4zdnWs92apax9HFROQ&limit=1'
    request({url,json:true},(err, {body}) => {
        //console.log(err);
        //console.log(body);
        if(err){
            callback("Unable to connect to the server",undefined);
        }else if(body.features.length==0){
            callback("Unable to find the place! Try a different search string",undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geoCode;