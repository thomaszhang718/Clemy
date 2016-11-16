// require mongoose
var mongoose = require('mongoose');
// create Schema class
var Schema = mongoose.Schema;

// Create User schema
var UserSchema = new Schema({
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

// Create the User model with the UserSchema
var User = mongoose.model('User', UserSchema);

// export the model
module.exports = User;