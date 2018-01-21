var express = require('express');
var app = express();

// app.get('/', function(request, response) {
//     response.send('Hello World');
// });

// app.get('/name', function(request, response) {
//     var name = "Lauren George";
//     response.send(name);
// });

// app.get('/redirect', function(request, response) {
//     // var redirect = "Surprise, I've moved!";
//     response.redirect(301, '/surprise');
// });

// app.get('/date', function(request, response) {
//     var date = new Date().toDateString();
//     response.send(date);

// });

app.get('/cities', function(request, response) {
    var cities = ['Providence', 'New Orleans', 'Omaha', 'Chicago'];
    response.json(cities);
});
// app.get('/', function(request, response) {
//     response.sendFile(__dirname + '/public/index.html'); //links index.html file from public folder but not client.js
// });

app.use(express.static('public')); //middleware to link all files in public folder to browser call

app.listen(process.env.PORT, function() {
    console.log('Listening on env.PORT');
});
