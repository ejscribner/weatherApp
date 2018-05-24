const request = require('request');

var geocodeAddress = (address, resolve, reject) => {
    return new Promise((resolve,  reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyA6-Xft5ORz1_Njq3LflinjELMw2DnHkIs`,
            json: true,
        }, (error, response, body) => {
            if (error) {
                reject('Unable to Connect to Server');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to Find Address');
            } else if ((body.status === 'OK')) {
                resolve({
                    address: body.results[0].formatted_address,
                    lattitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng,
                });
            }
        });
    })
};


geocodeAddress('18015').then((location) => {
    console.log(JSON.stringify(location,undefined,2)); 
}, (errorMessage) => {
    console.log(errorMessage);
});