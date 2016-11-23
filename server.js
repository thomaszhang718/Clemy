// dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');

//NOT SURE IF I NEED THESE, COPY PASTED FROM TUTORIAL
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');






// use morgan and bodyparser with our app
app.use(logger('dev'));
app.use(cookieParser()); // read cookies (needed for auth)
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

app.use(session({ secret: 'ilovecoding' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


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
require('./config/passport')(passport); // pass passport for configuration

// set up port for heroku
var PORT = process.env.PORT || 3000;
// listen on port 3000
app.listen(PORT, function() {
  console.log('App running on port 3000!');
});