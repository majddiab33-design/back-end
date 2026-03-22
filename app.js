const { Client } = require('pg');
const express = require('express')
require("dotenv").config();
const cors = require("cors");
const app = express()


app.use(cors({
  origin: [
    "https://client-hzznakmce-majddiab33-9273s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


const PORT = process.env.PORT || 5000;
const routes = require('./routes');
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

