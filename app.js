var express = require('express');
var app = express();


app.use(express.static('public')); //middleware to link all files in public folder to browser call
var cities = require('./routes/cities');
app.use('/cities', cities); //mount router in particular root url



//middleware function to normalize city name input
// app.param('state', function(request, response, next) {
            //     var name = request.params.state;
            //     var cityName = name[0].toUpperCase() + name.slice(1).toLowerCase(); //changes newOrleans to Neworleans, adjust later to create camelCase or accomodate spaces
            //     request.cityName = cityName; //allows access from other routes in app
            //     next();
            // }); //needs to come before sub-routes for add and delete to work






app.listen(process.env.PORT, function() {
    console.log('Listening on env.PORT');
});
