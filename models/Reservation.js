// require mongoose
var mongoose = require('mongoose');
// create Schema class
var Schema = mongoose.Schema;

// Create Reservation schema
var ReservationSchema = new Schema({
  // title is required
  title: {
    type:String,
    required:true
  },
  // date is required
  date: {
    type:String,
    required:true
  },
  // url is required
  url: {
      type:String,
      required:true
  }
});

// Create the Reservation model with the ReservationSchema
var Reservation = mongoose.model('Reservation', ReservationSchema);

// export the model
module.exports = Reservation;