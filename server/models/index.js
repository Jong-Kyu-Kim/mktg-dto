const Schema = require('mongoose').Schema;
const dto = require('./dto');

module.exports = {
  user: new Schema({
    _id: Schema.Types.ObjectId,
    id: String,
    password: String,
    dept: String,
    name: String
  }),
  ...dto
}