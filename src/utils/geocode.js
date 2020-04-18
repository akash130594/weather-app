const request = require('request');
const geocode = (address, callback) => {
    //const weatherUrl = "http://api.weatherstack.com/current?access_key=b3ee7d4d4195e35669afbc53353df4a3&query="+ encodeURIComponent(address)+ "&units=f";
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWthc2gwMDA0IiwiYSI6ImNrOHg0cW9rYTA2Mm8zZnRhNmJ0cm52OWUifQ.0BOMkJaIiGZ5xaqAEAFwqQ&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            console.log("tada1");
            callback('Unable to connect geocode',undefined);
        } else if(body.error) {
            console.log("tada2");
            callback('Input Undefined',undefined);
        } else if(body.features.length === 0){
            console.log("tada3");
            callback('Input Value is incorrect',undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1], 
                location: body.features[0].place_name
            })
        }
    })
};

module.exports = geocode;