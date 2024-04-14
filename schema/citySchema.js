const mongoose = require('mongoose');

const state_district = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  state: {
    type: String,
    required: true
  },
  districts: {
    type: [String],
    required: true
  }
});

const City = mongoose.model('state_district', state_district);

module.exports = City;
