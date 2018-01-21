var express = require('express');
var app = express();

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

var length = Object.keys(cities).length; //find the length of the object, needs global scope


app.get('/cities', function(request, response) {
    // var cities = ['Providence', 'New Orleans', 'Omaha', 'Chicago', 'San Francisco', 'New York City', 'Seattle', 'Boston'];
    //add a query string parameter
    if (request.query.limit > 0 && request.query.limit < length) { //only slice if limit request is within the object length
        var sliced = Object.keys(cities).slice(0, request.query.limit); //must use Object.keys for slice() to work
        response.json(sliced);
    }
    else if (request.query.limit > length) { //bad request error if limit exceeds object length
        response.status(400).json('Your request exceeds the object length');
    }
    else {
        response.json(Object.keys(cities)); //use Object.keys() to only show city names
    }
});

//middleware function to normalize city name input
app.param('state', function(request, response, next) {
    var name = request.params.state;
    var cityName = name[0].toUpperCase() + name.slice(1).toLowerCase(); //changes newOrleans to Neworleans, adjust later to create camelCase or accomodate spaces
    request.cityName = cityName; //allows access from other routes in app
    next();
});


//Use dynamic route to return state, 200 success code
app.get('/cities/:state', function(request, response) {
    var state = cities[request.cityName];
    if (!state) { //return an error if no state is available
        response.status(404).json('No entry found for ' + request.params.state);
    }
    else {
        response.json(state);
    }
});

app.use(express.static('public')); //middleware to link all files in public folder to browser call

app.listen(process.env.PORT, function() {
    console.log('Listening on env.PORT');
});
