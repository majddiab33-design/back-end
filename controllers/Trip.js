const TripModel = require('../models/Trip');

const getTrips = async (req, res) => {
    const cus = await TripModel.getTrip();
    res.status(200).json(cus); 
};

const addTrip = async (req, res) => {
    const { trip_name, trip_rate, trip_description, trip_image } = req.body;
    const newTrip = await TripModel.addTrip(trip_name, trip_rate, trip_description, trip_image);
    res.status(201).json(newTrip);
};


const getTripById = async (req, res) => {
    const { trip_id } = req.params;
    const trip = await TripModel.getTripById(trip_id);
    if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(trip);
}

const getTripByName = async (req, res) => {
    const { trip_name } = req.params;
    const trip = await TripModel.getTripByName(trip_name);
    if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(trip);
};

const getTripHighRate = async (req, res) => {
    const trip = await TripModel.getTripHighRate();
    if (!trip) {
        return res.status(404).json({ message: "Trip with highest rate not found" });
    }
    res.status(200).json(trip);
};

module.exports = {
    getTrips,
    addTrip,
    getTripById,
    getTripByName,
    getTripHighRate
};