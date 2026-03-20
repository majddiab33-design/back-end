const express = require('express');
const router = express.Router();
const Restaurant = require('../controllers/restaurant');

router.get('/', Restaurant.getRestaurant);
router.get('/highRate', Restaurant.getRestaurantHighRate);
router.post('/add', Restaurant.addRestaurant);

router.get('/itemId/:res_id', Restaurant.getRestaurantById);
router.get('/:res_name', Restaurant.getRestaurantByName);


module.exports = router;