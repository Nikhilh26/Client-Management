const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db/config.js");
const dotenv = require("dotenv");
const { validateToken } = require('./middleware/authMiddleware.js');
const clientRouter = require("./routes/clientRoutes.js");

dotenv.config();

const app = express();

connectDB();

// middleware 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(validateToken);

app.use('/clients', clientRouter);

// PORT activation
const PORT = process.env.PORT;
app.listen(PORT, (port, err) => {
    console.log("Server Live ", PORT);
})