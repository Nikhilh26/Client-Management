const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db/config.js");
const dotenv = require("dotenv");
const clientRouter = require("./routes/clientRoutes.js");
const emailRouter = require('./routes/emailRoutes.js');
const { Email } = require('./db/models.js');

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


// app.get('/test', async (req, res) => {
//     try {
//         const emails = await Email.find({ deliveryStatus: "sent" });

//         await Promise.all(emails.map(async (element) => {
//             element.deliveryStatus = "delivered"
//             await element.save()
//         }))

//         console.log('All documents updated successfully');
//         return res.status(200).json({
//             success: true
//         })
//     } catch (error) {
//         console.error('Error updating documents:', error);
//         return res.status(501).json({
//             success: false
//         })
//     }

// })