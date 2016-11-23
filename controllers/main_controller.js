var express = require('express');
var router = express.Router();
/*var Cookies = require('cookies');
var jwt = require('jsonwebtoken'); 
var path = require('path');
var moment = require('moment');*/


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// And we bring in our schema models
var Reservation = require('../models/Reservation.js');
var SoloOrder = require('../models/SoloOrder.js');
var User = require('../models/User.js');

module.exports = function(app){

	// Simple index route
	app.get('/', function(req, res) {
	  //render home.handlebars
	  res.render('index');
	});

	// Simple index route
	app.get('/home', function(req, res) {
	  //render home.handlebars
	  res.render('home');
	});


/*	// login a user
	app.post('/login', function(req, res){

		console.log("got to login")


	});*/

	app.post('/login',
	    passport.authenticate('local-signup', {
	        successRedirect: '/home',
	        failureRedirect: '/',
	        failureFlash: true
	    })
	);








	// create a new user
	app.post('/createUser', function(req, res){

		console.log("got to create user")

		// create a new user and pass the req.body to the entry.
		var newUser = new User(req.body);

		console.log(req.body)

		// and save the new note the db
		newUser.save(function(err, doc){
			// log any errors
			if(err){
				console.log(err);
			}
			// otherwise
			else {
				//send doc, which is the data of the new note
				res.send(doc);
			}
		});
	});

/*
	app.post('/login', passport.authenticate('local'), function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.render('home');
	});*/







}