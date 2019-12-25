// The path to the public folder can't be a relative one and needs to be an absolute path
const path = require('path')
const express = require('express')
const hbs = require('hbs')


// A new express app
const app = express()

// Define path for config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Express app looks at the public index.html so we no longer use the express root 
// app.get('', (req,res) => {
//     res.send('<h1>Hello World!</h1>')
// })


// This is for the templating. 'view engine' must match exactly otherwise express won't know about it
//  The below line sets the handlebars
// SETUP handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// SETUP static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})
const port = 3000
app.listen(port, () => {
    console.log(`Starting The server ${port}`)
})