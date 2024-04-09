const mongoose = require('mongoose');

// Define schema
const tripsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  from: {
    type: String,
    required: [true, 'From location is required']
  },
  to: {
    type: String,
    required: [true, 'To location is required']
  },
  busOwnerID: {
    type: Number,
    required: [true, 'Bus owner ID is required']
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  EndTime: {
    type: Date,
    required: [true, 'End time is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  SeatBooked: {
    type: [String]
  },
  bus_no: {
    type: String,
    required: [true, 'Bus number is required']
  },
  animeties_list: {
    type: [String],
    validate: {
      validator: function(value) {
        return value.length > 0; 
      },
      message: 'At least one amenity must be provided'
    }
  },
  busFare: {
    type: Number,
    required: [true, 'Bus fare is required']
  },
  busName: {
    type: String,
    required: [true, 'Bus name is required']
  }
});

// Create model
const trips = mongoose.model('trips', tripsSchema);

module.exports = trips;
