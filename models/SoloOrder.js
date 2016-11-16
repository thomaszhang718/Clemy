// require mongoose
var mongoose = require('mongoose');
// create Schema class
var Schema = mongoose.Schema;

// Create SoloOrder schema
var SoloOrderSchema = new Schema({
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

// Create the SoloOrder model with the SoloOrderSchema
var SoloOrder = mongoose.model('SoloOrder', SoloOrderSchema);

// export the model
module.exports = SoloOrder;