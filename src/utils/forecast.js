const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const weatherStackAccessKey = "5547496fa28182cfef25879926e5ca1c"
    const url = `http://api.weatherstack.com/current?access_key=${weatherStackAccessKey}&query=${longitude},${latitude}&units=m`

    // request({ url, json: true }, (error, response) => {
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            // const temp = response.body.current.temperature
            // const feelsLike = response.body.current.feelslike
            console.log("BODY", body)
            const { temperature: temp, feelslike: feelsLike } = body.current
            callback(undefined, `Current weather: ${body.current.weather_descriptions[0]}. It is currently ${temp} degrees out. It feels like ${feelsLike} degrees.`)
        }
    })
}

module.exports = forecast