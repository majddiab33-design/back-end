const { Client } = require('pg');
const express = require('express')
require("dotenv").config();
const app = express()
const PORT = process.env.PORT || 5000;
const routes = require('./routes');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => {
    console.log("Connected to Neon");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("DB connection error:", err));


app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",   // your Next.js frontend
  credentials: true                  // allow cookies
}));
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

