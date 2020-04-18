const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/weather')

//Define path for express config
const publicDir = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, '../templates/partials');



const app = express();


//Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);



app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.render('index',{
        title: "This is my Title",
        name: "Akash",
        footer: "Created by Akash Sharma"
    });
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: "About Me",
        details: "Akash Sharma",
        footer: "Created by Akash Sharma"
    });
})

app.get('/help', (req, res) => {
    res.render('help',{
        forecast: "rainy",
        location: "New Delhi",
        title: "Help",
        footer: "Created by Akash Sharma"
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide an address"
        }); 
    }
    const location = req.query.address; 
    
    geocode(location, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            }); 
        }

        forecast(latitude, longitude, (error, data) => {
            if(error) {
                return res.send({
                    error
                }); 
            }

            return res.send({
                forecast: data,
                location,
                address: location
            }); 
        })

    })
    
})

app.get('*',(req, res) => {
    res.render('404',{
        title: "404",
        message: "No Page Found",
        name: "Akash Sharma",
        footer: "Created by Akash Sharma"
    });
})

app.listen(3000,() => {
    console.log("Started Server");
})

