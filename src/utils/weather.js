const request = require('request');

const forecast = (latitide, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b3ee7d4d4195e35669afbc53353df4a3&query=' + encodeURIComponent('-' + latitide + ',' + longitude) + '&units=f';
    request({url, json: true}, (error, {body}) => {
        console.log(body);
        if(error) {
            callback('Unable to connect weather stack',undefined);
        } else if (body.length === 0) {
            callback('Input Undefined',undefined);
        } else if (body.error) {
            callback('Input Undefined',undefined);
        } else {
            callback(undefined, "Current Temperature: " + body.current.temperature + " The Possiblility of Rain is: " + body.current.precip
                + "Time Zone Used is "+ body.location.timezone_id)
        }
    })
};

module.exports = forecast;