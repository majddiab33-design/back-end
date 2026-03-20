const postgres = require('../config/postgres');

async function getRestaurant() {

    resualt = await postgres.query('SELECT res_id , res_name, res_rate, res_open, res_image FROM restaurants');
    return resualt.rows;
}

async function addRestaurant(res_name, res_rate, res_description, res_image) {

    resualt = await postgres.query('INSERT INTO restaurants (res_name, res_rate, res_description, res_image) VALUES ($1, $2, $3, $4) RETURNING *', [res_name, res_rate, res_description, res_image]);
    return resualt.rows[0];
}

async function getRestaurantById(res_id) {
    res_id = Number(res_id);
    const result = await postgres.query('SELECT res_id, res_name, res_rate, res_open, res_image, res_description FROM restaurants WHERE res_id = $1', [res_id]);
    return result.rows[0];
}

async function getRestaurantByName(res_name) {

    const result = await postgres.query('SELECT res_id, res_name, res_rate, res_open, res_image, res_description FROM restaurants WHERE res_name = $1', [res_name]);
    return result.rows[0];
}

async function getRestaurantHighRate(res_rate) {

    const result = await postgres.query('SELECT res_id, res_name, res_rate, res_open, res_image, res_description FROM restaurants ORDER BY res_rate DESC LIMIT 1');
    return result.rows[0];
}

module.exports = {
    getRestaurant,
    addRestaurant,
    getRestaurantByName,
    getRestaurantById,
    getRestaurantHighRate
};