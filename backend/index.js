const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db/config.js");
const dotenv = require("dotenv");
const clientRouter = require("./routes/clientRoutes.js");
const emailRouter = require('./routes/emailRoutes.js');

dotenv.config();

const app = express();

connectDB();

// middleware 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/clients', clientRouter);
app.use('/email', emailRouter);

// PORT activation
const PORT = process.env.PORT;
app.listen(PORT, (port, err) => {
    console.log("Server Live ", PORT);
})