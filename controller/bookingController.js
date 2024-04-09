const tripModel = require("../schema/tripSchema.js");
const bookTripModel = require("../schema/bookingSchema");


const bookTrip = async (req, res)=> {
    try {
        const userJourneyData = req.body;
        const trip = await tripModel.findById(userJourneyData.tripId);
        if (trip.SeatBooked.includes(userJourneyData.reservedSeat)) {
            return res.status(400).json({ message: 'Selected seat is already booked',status:400});
        }
        const newJourney = new bookTripModel(userJourneyData);
        /*Save Booking Data*/
        const data = await newJourney.save();
        
        await tripModel.findOneAndUpdate(
            { _id: userJourneyData.tripId },
            { $push: { SeatBooked: userJourneyData.reservedSeat } }
        );
        
        /*Send response of successful booking*/
        return res.status(200).json({
            message:"Booking successful",
            status:200,
            data:data
        })
    } catch (error) {
        /*Send response if booking is not successful*/
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            const errors = Object.values(error.errors).map(error => error.message);
            return res.status(400).json({ message: errors.join(', ') });
        } else {
            console.log(error)
            // Other types of errors
            return res.status(500).json({
                message:"something went wrong!",
            })
        }
    }
}

module.exports = {bookTrip }