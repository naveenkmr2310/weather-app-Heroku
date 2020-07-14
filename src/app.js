const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT||3000

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'/templates/views')
const partialsPath=path.join(__dirname,'/templates/partials')

//setup handlebars engine and views path
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


// app.get('',(req,res)=>{
//   res.send('<h1>Welcome to express</h1>')
// })   
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Naveen Kumar'
    })
})

// app.get('/about',(req,res)=>{
//     res.send('<h1>welcome to weather forecast</h1>')
// })
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Weather App',
        name:'Naveen Kumar'
    })
})
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'naveen',
//         number:8754567203
//     },{
//         name:'kumar',
//         number:8564765435
//     }])
// })
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'this is the user guide for the Weather App. Please refer the documentation for furthur reference',
        title:'Weather App - Help guide',
        name:'Naveen Kumar'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'Enter the address for finding the forecast'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error: error
            })        
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error: error
                })   
            }
            res.send({
                location,
                latitude,
                longitude,
                weatherDescription:forecastData.description,
                currentTemp:forecastData.currentTemp,
                feelsLike:forecastData.feelsLike
            })

        })
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Naveen Kumar',
        errorMessage:'Help article not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Naveen Kumar',
        errorMessage:'Page not Found'
    })
})
app.listen(port,()=>{
    console.log('listening to port '+port)
})