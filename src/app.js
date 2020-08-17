const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

const publicDirectory=path.join(__dirname,'../public')
const partialspath=path.join(__dirname,'/partials')

//setup handlebar engine
app.set('view engine','hbs')
hbs.registerPartials(partialspath)


//setup static directory to serve
app.use(express.static(publicDirectory))


app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Ritik Thapar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ritik Thapar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'This is some helpful text.',
        name:'Ritik Thapar'   
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
     geocode(req.query.address,(error,{latitude,longitude,location }={})=>{
             if(error){
                 return res.send({error})
             }
             forecast(latitude,longitude,(error,forecastdata)=>{
                 if(error){
                     return res.send({error})
                 }
                 res.send({
                     forecast:forecastdata,
                     location,
                     address:req.query.address
                 })
             })
     })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        message:'Help article not Found',
        name:'Ritik Thapar',
        title:'404'   
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        message:'Page not Found',
        name:'Ritik Thapar',
        title:'404'
        
    })
})

app.listen(3000,()=>{
    console.log('server is up port 3000')
})