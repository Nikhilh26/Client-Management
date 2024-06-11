const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String }
}, { timestamps: true });

// There will be 15(5x3) question 
// question Number is between 0 to 14 
// const responseSchema = new mongoose.Schema({
//     questionNumber: { type: Number },
//     answer: { type: Number, enum: [1, 2, 3, 4, 5] }
// });

const emailSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    sentAt: { type: Number, required: true },
    replied: { type: Boolean, default: false },
    responses: [Number]
});

const Client = mongoose.model('Client', clientSchema);
const Email = mongoose.model('Email', emailSchema);

module.exports = { Client, Email };