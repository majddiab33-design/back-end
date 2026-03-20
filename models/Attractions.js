const postgres = require('../config/postgres');

async function getAttractions() {

    resualt = await postgres.query('SELECT attr_id , attr_name, attr_rate, attr_open, attr_image FROM attraction');
    return resualt.rows;
}

async function addAttraction(attr_name, attr_rate, attr_description, attr_image) {
    resualt = await postgres.query('INSERT INTO attraction (attr_name, attr_rate, attr_description, attr_image) VALUES ($1, $2, $3, $4) RETURNING *', [attr_name, attr_rate, attr_description, attr_image]);
    return resualt.rows[0];
}

async function getAttractionById(attr_id) {
    attr_id = Number(attr_id);
    const result = await postgres.query('SELECT attr_id, attr_name, attr_rate, attr_open, attr_image, attr_description FROM attraction WHERE attr_id = $1', [attr_id]);
    return result.rows[0];
}

async function getAttractionByName(attr_name) {

    const result = await postgres.query('SELECT attr_id, attr_name, attr_rate, attr_open, attr_image, attr_description FROM attraction WHERE attr_name = $1', [attr_name]);
    return result.rows[0];
}

async function getAttractionHighRate(attr_rate) {

    const result = await postgres.query('SELECT attr_id, attr_name, attr_rate, attr_open, attr_image, attr_description FROM attraction ORDER BY attr_rate DESC LIMIT 1');
    return result.rows[0];
}

module.exports = {
    getAttractions,
    addAttraction,
    getAttractionByName,
    getAttractionById,
    getAttractionHighRate
};