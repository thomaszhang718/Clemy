var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// And we bring in our schema models
var Reservation = require('../models/Reservation.js');
var SoloOrder = require('../models/SoloOrder.js');

module.exports = function(app){

	// Simple index route
	app.get('/', function(req, res) {
	    //render index.handlebars
	    res.render('index');
	});

    // 
    app.get('/userLogin', function(req, res, next) {

        passport.authenticate('local-login', function(err, user, info) {

            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send(info);
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }

                if (user.local.group === "user") {
                    console.log("IS USER");
                    return res.send({ valid: true });
                }

                return res.send(info);
            });
        })(req, res, next);
    });

    app.get('/restLogin', function(req, res, next) {

        passport.authenticate('local-login', function(err, user, info) {

            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send(info);
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }

                if (user.local.group === "restaurant") {
                    console.log("IS RESTAURANT");
                    return res.send({ valid: true });
                }

                return res.send(info);
            });
        })(req, res, next);
    });



/*    app.post('/createUser', function(req, res, next) {

        passport.authenticate('local-signup', function(err, user, info) {

            console.log("HERE")
            console.log(user)

            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send(info);
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }

                if (user.local.group === "restaurant") {
                    console.log("IS RESTAURANT");
                    return res.send({ valid: true });
                }

                return res.send(info);
            });
        })(req, res, next);
    });*/




    app.post('/createUser', passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/fail' // redirect back to the signup page if there is an error
    }));












    // =====================================
    // HOME SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/home', isLoggedIn, function(req, res) {

        res.render('home', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/restHome', isLoggedIn, function(req, res) {

        res.render('restHome', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}