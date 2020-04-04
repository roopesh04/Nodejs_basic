const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')

const app=express()
const port=process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engin and viwes location
app.set('view engine','hbs')
app.set('views',viewPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialPath)

//Setup static directer to serve
app.get('',(req,res)=>(
    res.render('index',{
        title:'Weather app',
        name:"Roopesh"
    })
))

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:"Roopesh"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"Nothing",
        title:'Help',
        name:'Roopesh'
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide the address"
        })
    }
    else {
        geocode.geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
            if (error) {
                return res.send({
                    error:"Unable to find the location"
                })
            }
    
            forecast.forecast(latitude, longitude, (error,forecast) => {
                if (error) {
                    return res.send(error)
                }
                const weather_status="The themperature is "+forecast.place
                return res.send({
                    forecast:weather_status,
                    location:req.query.address,
                    address:location
                })
                
            })
        })
    }
    // res.send({
    //     forecast:"It is snowing",
    //     place:req.query.address,
    //     address:req.query.address
    // }) 
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Roopesh",
        helpText:"Help arcticle is not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Roopesh",
        errorMessage:"Page not found"
    })
})

app.listen(port,()=>{
    console.log("Server is up on the port "+port)
})
