const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true,
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}&key=AIzaSyA6-Xft5ORz1_Njq3LflinjELMw2DnHkIs`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var long = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/03cbb8e18e0af5e56a409de096e2fbe1/${lat},${long}`;
    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl).then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
    });
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connec to API servers');
    } else {
        console.log(e.message);
    }
});