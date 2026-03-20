const postgres = require('../config/postgres');
const bcrypt = require('bcrypt');

// יצירת Hash לסיסמה
async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// בדיקת סיסמה בזמן Login
async function checkUserCredentials(password, storedHash) {
    return await bcrypt.compare(password, storedHash);
}

// שליפת משתמש לפי אימייל
async function getUserByEmail(email) {
    const result = await postgres.query(
        'SELECT * FROM users WHERE user_email = $1',
        [email]
    );
    return result.rows[0];
}

// הוספת משתמש חדש
async function addUser(username, password, email) {
    // בדיקה אם המשתמש כבר קיים
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(password);

    const result = await postgres.query(
        'INSERT INTO users (user_email, user_name, user_password) VALUES ($1, $2, $3) RETURNING *',
        [email, username, hashedPassword]
    );

    return result.rows[0];
}

module.exports = {
    addUser,
    checkUserCredentials,
    getUserByEmail
};