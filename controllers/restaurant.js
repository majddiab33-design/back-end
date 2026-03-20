const restaurantModel = require('../models/restaurant');

const getRestaurant = async (req, res) => {
    const cus = await restaurantModel.getRestaurant();
    res.status(200).json(cus); 
};

const addRestaurant = async (req, res) => {
    const { res_name, res_rate, res_description, res_image } = req.body;
    const newRestaurant = await restaurantModel.addRestaurant(res_name, res_rate, res_description, res_image);
    res.status(201).json(newRestaurant);
};

const getRestaurantById = async (req, res) => {
    const { res_id } = req.params;
    const restaurant = await restaurantModel.getRestaurantById(res_id);
    if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
}

const getRestaurantByName = async (req, res) => {
    const { res_name } = req.params;
    const restaurant = await restaurantModel.getRestaurantByName(res_name);
    if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
};

const getRestaurantHighRate = async (req, res) => {
    const restaurant = await restaurantModel.getRestaurantHighRate();
    if (!restaurant) {
        return res.status(404).json({ message: "Restaurant with highest rate not found" });
    }
    res.status(200).json(restaurant);
};

module.exports = {
    getRestaurant,
    addRestaurant,
    getRestaurantByName,
    getRestaurantById,
    getRestaurantHighRate
};