// require mongoose
var mongoose = require('mongoose');
// create Schema class
var Schema = mongoose.Schema;

// Create SoloOrder schema
var SoloOrderSchema = new Schema({
  // creating required fields
  orderDate: {
    type:Date,
    required:true
  },
  orderPickupTime: {
    type:String,
    required:true
  },
  orderName: {
      type:String,
      required:true
  },
  orderAddress: {
      type:String,
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

// Create the SoloOrder model with the SoloOrderSchema
var SoloOrder = mongoose.model('SoloOrder', SoloOrderSchema);

// export the model
module.exports = SoloOrder;