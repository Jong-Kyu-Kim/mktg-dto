const Schema = require('mongoose').Schema;

module.exports = {
  results: new Schema({
    _id: Schema.Types.ObjectId,

    // common
    date: Date,
    type: String,
    category: String,
    subcategory: String,
    title: String,
    // label detail 

    // activity
    reference: String,
    url: String,
    product: Array,    
    remark: String,
    roi: Boolean,

    // effect    
    value: Number,

    // inboundg
    region: String,
    country: String,
    rep: String,
    remark2: String,

  }, {
    versionKey: false // __v
  }),  
}