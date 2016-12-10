// dependencies
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var configDB = require('./config/database.js');

// Database Configuration ===============================================================
mongoose.connect(configDB.url); // Database configuration with mongoose

var db = mongoose.connection;

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});


// Express & PassportJS Configuration ===============================================================

require('./config/passport')(passport); // pass passport for configuration


// use morgan and bodyparser with our app
app.use(morgan('dev'));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
  extended: true
}));

// make public a static dir
app.use(express.static('public'));

// set up handlebars default layout and view engine
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// required for passport
app.use(session({ secret: 'ilovecoding' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



// routes ======================================================================
//require('./app/routes.js')(app, passport); //REMOVE I THINK
require('./controllers/main_controller.js')(app, passport); // load our routes and pass in our app and fully configured passport


// launch ======================================================================
app.listen(PORT, function() { // listen on port
  console.log('App running on port ' + PORT); 
});














