const express = require('express');
const router = express.Router();

const Restaurant = require('./restaurant');
const Attractions = require('./attraction');
const Trips = require('./trips');
const LogIn = require('./LogIn');
const authRoutes = require("./auth");

router.use("/connect", (req, res) => {
    res.json("connected");
});

router.use("/auth", authRoutes);
router.use('/restaurant', Restaurant);
router.use('/attraction', Attractions);
router.use('/trip',Trips);
router.use('/login', LogIn);

module.exports = router;
