var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// And we bring in our schema models
var Reservation = require('../models/Reservation.js');
var SoloOrder = require('../models/SoloOrder.js');
var User = require('../models/User.js');



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

    app.post('/createUser', passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/fail', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/checkEmail', function(req, res) {

        User.findOne({ 'local.email' :  req.body.email }, function(err, user) {
            if (user == null) {
                //send true if email is available
                res.send(true)
            }
            else {
                //send false if email already exists in database
                res.send(false)
            }
        })
    });


    //Route for restaurant
    app.get('/restaurants/:restName', isLoggedIn, function(req, res) {
        var restaurantName = req.params.restName;
        res.render("./restaurants/" + restaurantName);
    });




    //Route for making reservation
    app.post('/restaurants/:restName/makeReservation', isLoggedIn, function(req, res) {
        var restaurantName = req.params.restName;

        var newReservation = new Reservation();

        newReservation.reservationDate =  req.body.reservationDate;
        newReservation.reservationTime = req.body.reservationTime;
        newReservation.reservationName = req.body.reservationName;
        newReservation.telephone = req.body.phoneNumber;
        newReservation.email = req.user.local.email;
        newReservation.partySize = req.body.partySize;
        newReservation.agreedToTerms = req.body.agreedToTerms;
        newReservation.specialRequest = req.body.specialRequest;

        //console.log(newReservation);

        // save the reservation to DB
        newReservation.save(function(err, newReservation) {
            if (err)
                throw err;
        });

        //Create url for redirect
        var orderURL = "/restaurants/" + restaurantName + "/addOrder/" + newReservation._id;

        res.send(orderURL);
    });

    app.get('/restaurants/:restName/addOrder/:reservationID', isLoggedIn, function(req, res) {
        var restaurantName = req.params.restName;
        var reservationID = req.params.reservationID;

        res.render('addOrder');
    });

    app.post('/AddItemsToDB/:reservationID', isLoggedIn, function(req, res) {
        var reservationID = req.params.reservationID;

        var insertData = {
            orderItems: req.body.data
        }

        Reservation.findOneAndUpdate({_id: reservationID}, insertData, {new:true}, function(err, doc) {
            if(err){
                console.log("Something wrong when updating data!");
            }
            //console.log(doc);
            res.send(true);
        });
    });

    app.post('/confirmOrder', isLoggedIn, function(req, res) {

        //console.log("got to confirm order");

        var insertData = {
            orderSubtotal: req.body.subtotal,
            orderTax: req.body.totalTax,
            orderTotal: req.body.totalPrice
        }

        Reservation.findOneAndUpdate({_id: req.body.reservationID}, insertData, {new:true}, function(err, doc) {
            if(err){
                console.log("Something wrong when updating data!");
            }
            //console.log(doc);
            var nextURL = "/paymentPage/" + req.body.reservationID;
            res.send(nextURL);
        });
    });

    app.get('/paymentPage/:reservationID', isLoggedIn, function(req, res) {
        var reservationID = req.params.reservationID;

        Reservation.findOne({_id: reservationID}, function(err, doc) {
            if(err){
                console.log("Something wrong when updating data!");
            }
            //console.log(doc);
            res.render('confirmationPage');
        });
    });







    app.get('/myAccount', isLoggedIn, function(req, res) {
        res.render('myAccount');
    })



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