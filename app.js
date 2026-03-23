const express = require('express');
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());


const routes = require('./routes');
app.use('/api', routes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});