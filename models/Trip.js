const postgres = require('../config/postgres');

async function getTrip() {

    resualt = await postgres.query('SELECT trip_id , trip_name, trip_rate, trip_open, trip_image FROM trip');
    return resualt.rows;
}

async function addTrip(trip_name, trip_rate, trip_description, trip_image) {
    resualt = await postgres.query('INSERT INTO trip (trip_name, trip_rate, trip_description, trip_image) VALUES ($1, $2, $3, $4) RETURNING *', [trip_name, trip_rate, trip_description, trip_image]);
    return resualt.rows[0];
}

async function getTripById(trip_id) {
    trip_id = Number(trip_id);
    const result = await postgres.query('SELECT trip_id, trip_name, trip_rate, trip_open, trip_image, trip_description FROM trip WHERE trip_id = $1', [trip_id]);
    return result.rows[0];
}

async function getTripByName(trip_name) {

    const result = await postgres.query('SELECT trip_id, trip_name, trip_rate, trip_open, trip_image, trip_description FROM trip WHERE trip_name = $1', [trip_name]);
    return result.rows[0];
}

async function getTripHighRate(trip_rate) {

    const result = await postgres.query('SELECT trip_id, trip_name, trip_rate, trip_open, trip_image, trip_description FROM trip ORDER BY trip_rate DESC LIMIT 1');
    return result.rows[0];
}

module.exports = {
    getTrip,
    addTrip,
    getTripByName,
    getTripById,
    getTripHighRate
};