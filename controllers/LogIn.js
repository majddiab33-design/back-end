const UserModel = require('../models/LogIn');
const jwt = require("jsonwebtoken");

// LOGIN
async function handleLogin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await UserModel.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await UserModel.checkUserCredentials(password, user.user_password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, username: user.user_name },
            process.env.JWT_SECRET || "kiki",
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                email: user.user_email,
                username: user.user_name
            }
        });

    } catch (error) {
        console.error("DB ERROR:", error);
        res.status(500).json({ error: error.message });
    }
}

// SIGNUP
async function createUser(req, res) {
    const { user_email, user_name, user_password } = req.body;

    try {
        const newUser = await UserModel.addUser(user_name, user_password, user_email);

        // Create JWT token
        const token = jwt.sign(
            { id: newUser.id, username: newUser.user_name },
            process.env.JWT_SECRET || "kiki",
            { expiresIn: "1d" }
        );

        res.status(201).json({
            message: "User created successfully",
            token: token,
            user: {
                id: newUser.id,
                email: newUser.user_email,
                username: newUser.user_name
            }
        });

    } catch (error) {
        console.error("DB ERROR:", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createUser,
    handleLogin
};