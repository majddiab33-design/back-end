const AttractionsModel = require('../models/Attractions');

const getAttractions = async (req, res) => {
    const cus = await AttractionsModel.getAttractions();
    res.status(200).json(cus); 
};

const addAttraction = async (req, res) => {
    const { attr_name, attr_rate, attr_description, attr_image } = req.body;
    const newAttraction = await AttractionsModel.addAttraction(attr_name, attr_rate, attr_description, attr_image);
    res.status(201).json(newAttraction);
};

const getAttractionById = async (req, res) => {
    const { attr_id } = req.params;
    const attraction = await AttractionsModel.getAttractionById(attr_id);
    if (!attraction) {
        return res.status(404).json({ message: "Attraction not found" });
    }
    res.status(200).json(attraction);
}

const getAttractionByName = async (req, res) => {
    const { attr_name } = req.params;
    const attraction = await AttractionsModel.getAttractionByName(attr_name);
    if (!attraction) {
        return res.status(404).json({ message: "Attraction not found" });
    }
    res.status(200).json(attraction);
};

const getAttractionHighRate = async (req, res) => {
    const attraction = await AttractionsModel.getAttractionHighRate();
    if (!attraction) {
        return res.status(404).json({ message: "Attraction with highest rate not found" });
    }
    res.status(200).json(attraction);
};

module.exports = {
    getAttractions,
    addAttraction,
    getAttractionById,
    getAttractionByName,
    getAttractionHighRate
};
