const express = require('express');
const router = express.Router();
const Trip = require('../controllers/Trip');

router.get('/', Trip.getTrips);
router.post('/add', Trip.addTrip);
router.get('/highRate', Trip.getTripHighRate);

router.get('/:trip_name', Trip.getTripByName);
router.get('/itemId/:trip_id', Trip.getTripById);


module.exports = router;