const express = require('express')
const router = express.Router()
const busController = require("../controller/BusConroller")
const bookingController = require("../controller/bookingController")

router.post("/add_trip", busController.addTrip)
router.get("/get_trip", busController.getTrip)
router.post("/book_trip", bookingController.bookTrip);
router.get("/filter_trip", busController.filterTrips);


router.get('/filter_date_trips', busController.filterByDate);
// router.get('/test', function (req, res, next) {
// 	console.log("Router Working");
// 	res.end();
// })

module.exports = router