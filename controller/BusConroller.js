const tripModel = require("../schema/tripSchema.js");
const cityModel = require("../schema/citySchema");

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
        if(!startDate || !endDate){
            throw new Error('Please enter start date and end date!'); 
        }
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
        console.error( error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

const filterTrips = async (req,res)=>{
    try {
        // Parse user-specified parameters from the request
        const { from, to, date, arrival, departure, startRating, endRating, operators } = req.query;

        // Construct query object based on user-specified parameters
        const query = {};
        if (from){
            query.from = from;
        } 
        if (to){
            query.to = to;
        } 
        if (date){
            query.date = date;
        } 
        if (arrival){
            query.arrival = arrival;
        } 
        if (departure){
            query.departure = departure;
        } 
        if (startRating){
            query.startRating = { $gte: startRating };
        } 
        if (endRating){
            query.endRating = { $lte: endRating };
        } 
        if (operators){
            query.operators = { $in: operators };
        } 

        // Query the database for trip details matching the specified parameters
        const trips = await tripModel.find(query);
        
        // Return trip details as response
        if(trips.length===0){
            res.status(200).json({
                message: "No trip found",
                data: trips
            });
            
        }
        res.status(200).json({
            message: "Trip details retrieved successfully",
            data: trips
        });
    } catch (error) {
        // Handle errors
        console.error('Error fetching trips:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

const getAllCities = async (req, res) => {
    try {
        /*Fetch all cities Data*/
        const data = await  cityModel.find({});
       
    } catch (error) {
        console.log(error)
        /*Send response if fetching cities is not successful*/
        return res.status(500).json({
            message:"Something went wrong!",
        })
    }
}

module.exports = { addTrip, getTrip,filterByDate,filterTrips,getAllCities }