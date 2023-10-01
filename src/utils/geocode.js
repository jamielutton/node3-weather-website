const request = require('request')

const geocode = (address, callback) => {
    const weatherStackAccessKey = "5547496fa28182cfef25879926e5ca1c"
    const url = `http://api.weatherstack.com/current?access_key=${weatherStackAccessKey}&query=${address}&units=m`

    // request({ url, json: true }, (error, response) => {
    request({ url, json: true }, (error, { body }) => {
        console.log("BODY", body)
        if (error) {
            callback('Unable to connect to location services!') // optional second arg
        } else if (body.error) {
            callback('Unable to find location. try another search.')
        } else {
            callback(undefined, {
                latitude: body.location.lat,
                longitude: body.location.lon,
                location: body.location.name
            })
        }
    })
}

module.exports = geocode