// require mongoose
var mongoose = require('mongoose');
// create Schema class
var Schema = mongoose.Schema;

// Create Reservation schema
var ReservationSchema = new Schema({
  // creating required fields
  reservationDate: {
    type:Date,
    required:true
  },
  reservationTime: {
    type:String,
    required:true
  },
  reservationName: {
      type:String,
      required:true
  },
  partySize: {
      type:Number,
      required:true
  },
  agreedToTerms: {
      type:Boolean,
      required:true
  },
  orderItems: {
      type:Array,
      required:true
  }
});

// Create the Reservation model with the ReservationSchema
var Reservation = mongoose.model('Reservation', ReservationSchema);

// export the model
module.exports = Reservation;