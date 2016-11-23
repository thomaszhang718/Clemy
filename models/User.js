// require mongoose
var mongoose = require('mongoose');
// create Schema class
var Schema = mongoose.Schema;

// Create User schema
var UserSchema = new Schema({
  // creating required fields
  username: {
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
  },
  firstName: {
    type:String,
    required:true
  },
  lastName: {
      type:String,
      required:true
  },
  password: {
      type:String,
      required:true    
  },
  accountType: {
      type:String,
      required:true
  },
  createDate: {
      type:Date,
      required:true
  }
});

// Create the User model with the UserSchema
var User = mongoose.model('User', UserSchema);

// export the model
module.exports = User;