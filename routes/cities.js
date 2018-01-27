/* global app */

var express = require('express');
// var app = express();
var router = express.Router(); //returns router instance, mounted as middleware
var bodyParser = require('body-parser'); //parsing depends on middleware not shipped with Express
var parseUrlEncoded = bodyParser.urlencoded({ extended: false }); //forces use of the native querystring Node library

var cities = {
    'Providence': 'Rhode Island',
    'Omaha': 'Nebraska',
    'Chicago': 'Illinois',
    'Seattle': 'Washington',
    'Boston': 'Massachusetts',
    'Denver': 'Colorado',
    'Tulsa': 'Oklahoma',
    // 'Neworleans': 'Louisiana',
    // 'Sanfrancisco': 'California',
    // 'Newyorkcity': 'New York'
};
// var length = Object.keys(cities).length; //find the length of the object, needs global scope

//Extract routes to modules
router.route('/') //root path relaive to path where it is mounted
    // app.route('/cities')
    .get(function(request, response) {
        //add a query string parameter
        if (request.query.limit > 0 && request.query.limit < Object.keys(cities).length) { //only slice if limit request is within the object length
            var sliced = Object.keys(cities).slice(0, request.query.limit); //must use Object.keys for slice() to work
            response.json(sliced);
        }
        else if (request.query.limit > Object.keys(cities).length) { //bad request error if limit exceeds object length
            response.status(400).json('Your request exceeds the object length');
        }
        else {
            response.json(Object.keys(cities)); //use Object.keys() to only show city names
        }
    })
    .post(parseUrlEncoded, function(request, response) { //routes can take multiple handlers as arguments and call them sequentially
        var newCity = request.body;
        cities[newCity.addCity] = newCity.state;
        response.status(201).json(newCity.addCity);
    });

//Use dynamic route to return state, 200 success code
router.route('/:state')
    .all(function(request, response, next) {
        var name = request.params.state;
        var cityName = name[0].toUpperCase() + name.slice(1).toLowerCase(); //changes newOrleans to Neworleans, adjust later to create camelCase or accomodate spaces
        request.cityName = cityName; //allows access from other routes in app
        next();
    }) //needs to come before sub-routes for add and delete to work

    // app.route('/cities/:state')
    .get(function(request, response) {
        var state = cities[request.cityName];
        if (!state) { //return an error if no state is available
            response.status(404).json('No entry found for ' + request.params.state);
            // console.log("app.get 404");
        }
        else {
            response.json(state);
        }
    })
    .delete(function(request, response) {
        delete cities[request.cityName]; //removes entry from object
        response.sendStatus(200); //used when we don't set a response body
    });


// router.route('/:addCity')
//middleware function to normalize city name input
// .all(function(request, response, next) { //delete works without this but only after an addition
//     var name = request.params.state;
//     var cityName = name[0].toUpperCase() + name.slice(1).toLowerCase(); //changes newOrleans to Neworleans, adjust later to create camelCase or accomodate spaces
//     request.cityName = cityName; //allows access from other routes in app
//     next();
// }) //needs to come before sub-routes for add and delete to work

// app.route('/cities/:addCity')
// .delete(function(request, response) {
//     delete cities[request.cityName]; //removes entry from object
//     response.sendStatus(200); //used when we don't set a response body
// });

module.exports = router;
