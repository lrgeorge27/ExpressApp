var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.send('Hello World');
});

app.get('/name', function(request, response) {
    var name = "Lauren George";
    response.send(name);
});

app.get('/redirect', function(request, response) {
    // var redirect = "Surprise, I've moved!";
    response.redirect(301, '/surprise');
});

app.get('/date', function(request, response) {
    var date = new Date().toDateString();
    response.send(date);

});

app.listen(process.env.PORT, function() {
    console.log('Listening on env.PORT');
});
