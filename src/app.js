const express=require('express');
const path=require('path');
const hbs=require('hbs');
const geoCode=require('./utils/geoCode');
const forecast=require('./utils/forecast');


const app=express();

//Defining paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const partialsPath=path.join(__dirname,'../views/partials')
const viewsPath=path.join(__dirname,'../views')

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res)=> {
    res.render('index',{
        title:"WEATHER",
        name:"Aditij"
    })
})

app.get('/help', (req, res)=> {
    res.render('help',{
        title:"HELP PAGE",
        name:"Aditij"
    })
})

app.get('/about', (req, res)=> {
    res.render('about',{
        title:"ABOUT PAGE",
        name:"Aditij"
    })
})

app.get('/weather', (req, res)=> {
    if(!req.query.address){
        res.send({
            error:"Must provide address"
        })
    }else{
       geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error});
            }
            else{
                forecast(latitude,longitude,(err,data)=>{
                    if(err){
                        return res.send({error});
                    }else{
                        res.send({
                            address:req.query.address,
                            location:location,
                            forecast:data
                        })
                    }
                })
            }
        })
    }
})

app.get('/help/*', (req, res)=> {
    res.render('error',{
        title:400,
        errorMessage:"Help article not found"
    })
})

app.get('*', (req, res)=> {
    res.render('error',{
        title:400,
        errorMessage:"Page not found"
    })
})

app.listen(3000,()=>{
    console.log("listening on port 3000")
})