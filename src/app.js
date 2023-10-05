const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Start express
const app = express()
const port = process.env.PORT || 3000

// Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const VIEWS_PATH = path.join(__dirname, '../templates/views')
const PARTIALS_PATH = path.join(__dirname, '../templates/partials')

// Configure views
app.set('view engine', 'hbs')
app.set('views', VIEWS_PATH)
hbs.registerPartials(PARTIALS_PATH)

// Setup static directory for express to use
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jamie Lutton'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jamie Lutton'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'How to solve differential equations',
        name: 'Jamie Lutton'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
    // res.send({
    //     forecast: {
    //         temp: 21,
    //         conditions: 'overcast'
    //     },
    //     location: 'Lisburn',
    //     address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({products: []})
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jamie Lutton',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jamie Lutton',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})