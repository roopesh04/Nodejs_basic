const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    url="https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude="+latitude+"&longitude="+longitude+"&oneobservation=true&app_id=devportal-demo-20180625&app_code=9v2BkviRwi9Ot26kp2IysQ"

    request({url:url,json:true},(error,{body})=>{
         if(error){
            callback("Somthing is going wrong",undefined)
         }else if(body.error){
            callback("NO proper result",undefined)
         }else{
            callback(undefined,{
                place:body.observations.location[0].observation[0].temperature
            })
         }
    })
}

module.exports={
    forecast:forecast
}