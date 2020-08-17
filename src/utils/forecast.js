const request=require('request')

const forecast =(lat,lon,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&%20exclude=hourly,minutely,daily&appid=4054719e5beec9bb42bd77774eee32a3&units=metric'
    request({url,json:true},(error,{body})=>{
       if(error){
          callback('Unable to connect with weather service!',undefined)
       }else if(body.cod){
            callback('unable to find location!',undefined)
       }     
       else{
             
          callback(undefined,'Today is '+body.current.weather[0].description+'.Current temperature is '+body.current.temp)
       }    
  })
  
 }

 module.exports=forecast