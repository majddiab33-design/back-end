const express = require('express');
const router = express.Router();
const Attractions = require('../controllers/Attractions');

router.get('/', Attractions.getAttractions);
router.post('/add', Attractions.addAttraction);
router.get('/highRate', Attractions.getAttractionHighRate);

router.get('/:attr_name', Attractions.getAttractionByName);
router.get('/itemId/:attr_id', Attractions.getAttractionById);


module.exports = router;