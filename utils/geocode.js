const request=require('request')


const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoicml0aWt0aGFwYXIiLCJhIjoiY2tkc2NkZzJ4MTFlMjJxbXM1cGt4ZGYyZyJ9.2lrHpGqI4jMEv0RS_S7q-w&limit=1'
       request({url,json:true},(error,{body}={})=>{
          if(error){
             callback('unable to connect to location services!',undefined)
          }else if(body.features.length===0){
             callback('error in finding location',undefined)
          }else{
             callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
             })
          }
 
       })
 }
 
 module.exports = geocode
