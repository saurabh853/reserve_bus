const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define schema
const bookingSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trips',
        required: [true, 'Trip ID is required']
    },
    user_name: {
        type: String,
        required: true
    },
    ticketToken: {
        type: String,
        unique: true
    },
    ticketStatus: {
        type: Boolean,
        default: true
    },
    coupon:{
        type: String
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    from: {
        type: String,
        required: [true, 'From location is required']
    },
    to: {
        type: String,
        required: [true, 'To location is required']
    },
    paidAmount: {
        type: Number,
        required: [true, 'Paid amount is required']
    },
    discount:{
        type: String,
    },
    busName: {
        type: String,
        required: [true, 'Bus name is required']
    },
    reservedSeat:{
        type: [String],
        validate: {
        validator: function(value) {
            return value.length > 0;
        },
        message: 'At least one seat must be provided'
        }
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
});

bookingSchema.pre('save', function(next) {
    // Generate a unique ticket token using uuid
    if (!this.ticketToken) {
        this.ticketToken = uuidv4();
    }
    next();
});

// Create model
const Bookings = mongoose.model('bookings', bookingSchema);

module.exports = Bookings;
