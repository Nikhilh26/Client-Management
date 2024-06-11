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

let timer = 1718094655;

app.use('/clients', clientRouter);
app.use('/email', emailRouter);
// PORT activation
const PORT = process.env.PORT;
app.listen(PORT, (port, err) => {
    console.log("Server Live ", PORT);
})

// app.use('/test', async (req, res) => {
//     try {
//         const unrepliedEmails = await Email.find({ replied: false, userId: 'user_2hP5Ah7m4Sb2UJVJgoWfxDxJR8i' });

//         const getMaxField = await Email.aggregate([
//             {
//                 $match: {
//                     userId: 'user_2hP5Ah7m4Sb2UJVJgoWfxDxJR8i'
//                 }
//             }, {
//                 $group: {
//                     _id: null,
//                     maxSentAt: { $max: "$sentAt" }
//                 }
//             }
//         ])
//         const maxValue = getMaxField[0].maxSentAt;
//         const recentEmails = await Email.aggregate([
//             {
//                 $match: {
//                     userId: 'user_2hP5Ah7m4Sb2UJVJgoWfxDxJR8i',
//                     sentAt: maxValue
//                 }
//             }
//         ])

//         console.log(recentEmails);
//         const combinedEmails = [...unrepliedEmails, ...recentEmails];

//         const uniqueEmailsMap = new Map();

//         combinedEmails.forEach(email => {
//             const id = email._id.toString()
//             if (!uniqueEmailsMap.has(email._id.toString())) {
//                 uniqueEmailsMap.set(email._id.toString(), email);
//             }
//         });

//         const uniqueEmails = Array.from(uniqueEmailsMap.values());

//         res.status(200).json({
//             success: true,
//             uniqueEmails
//         });
//     } catch (error) {
//         console.log(error)
//         return res.json({
//             success: false
//         })
//     }
// })

// app.get('/', async (req, res) => {
//     const response = await Email.insertMany([
//         {
//             userId: 'user_2hP5Ah7m4Sb2UJVJgoWfxDxJR8i',
//             sentAt: timer,
//             replied: false,
//             clientId: '666418de6c9451a9ff5144a8'
//         }
//     ])
//     // const response = await Email.updateMany({ clientId: '666729b2e717dcf8fdb8f581' }, { $set: { replied: true, responses: [0, 1, 2, 3, 3, 3, 3, 1, 4, 2, 0, 0, 4, 4, 1] } })
//     // const response = await Email.deleteMany({ clientId: '666729b2e717dcf8fdb8f581' });
//     return res.json({
//         response
//     })
// })