const { Client } = require('pg');
const express = require('express')
require("dotenv").config();
const app = express()
const PORT = process.env.PORT || 5000;
const routes = require('./routes');
const cors = require("cors");
const cookieParser = require("cookie-parser");


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

