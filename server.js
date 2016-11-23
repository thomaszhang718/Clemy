// dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// use morgan and bodyparser with our app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

// make public a static dir
app.use(express.static('public'));

// set up handlebars default layout and view engine
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// Database configuration with mongoose
//mongoose.connect('mongodb://heroku_w06pvxcw:mn2ditm597pb8ahc80l9snkmk2@ds153657.mlab.com:53657/heroku_w06pvxcw');
mongoose.connect('mongodb://localhost/lemcy');

var db = mongoose.connection;

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});


require('./controllers/main_controller.js')(app);


// set up port for heroku
var PORT = process.env.PORT || 3000;
// listen on port 3000
app.listen(PORT, function() {
  console.log('App running on port 3000!');
});