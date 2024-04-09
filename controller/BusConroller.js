const tripModel = require("../schema/tripSchema.js");
const bookTripModel = require("../schema/bookingSchema");

const addTrip = async (req, res) => {
    try {
        const journeyData = req.body; // Assuming request body contains the data
        const newJourney = new tripModel(journeyData); // Create a new document using
        /*Save trip Data*/
        const data = await newJourney.save();

        /*Send response of successful creating a trip*/
        return res.status(200).json({
            message:"Trip created successfully",
            status:200,
            data:data
        })
    } catch (error) {
        /*Send response if creating a trip is not successful*/
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            const errors = Object.values(error.errors).map(error => error.message);
            return res.status(400).json({ message: errors.join(', ') });
        } else {
            // Other types of errors
            return res.status(500).json({
                message:"something went wrong!",
            })
        }
    }
}

const getTrip = async (req, res) => {
    try {
        /* find last 50 trips*/
         const trips = await tripModel.find().sort({ createdAt: -1 }).limit(50);
        if (trips===undefined || trips.length === 0) {
            /* if no trip found then print this message*/
            return res.status(200).json({
                message:"No previous trip found!",
                status:200,
            })    
        }
        
        /* have any trips then print this message*/
        return res.status(200).json({
            message:"Trips fetched successfully",
            status:200,
            data:trips
        })
        
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({
            message:"something went wrong!",
            status:500,
            data:{}
        })
    }
}

const filterByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        /*Query the trips collection to find all trip details associated with the specified date*/
        const trips = await tripModel.find({
            date: {
                $gte: new Date(startDate),  
                $lte: new Date(endDate)  
            }
        });


        return res.status(200).json({
            message: "Trip details retrieved successfully",
            data: trips
        });
    } catch (error) {
        console.error("Error retrieving trip details:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
module.exports = { addTrip, getTrip,filterByDate }