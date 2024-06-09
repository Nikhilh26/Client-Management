const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String }
}, { timestamps: true });

// There will be 15(5x3) 
// To be worked on
const responseSchema = new mongoose.Schema({
    questionNumber: { type: Number, required: true },
    answer: { type: Number, enum: [1, 2, 3, 4, 5], required: true }
});

const emailSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    emailContent: { type: String, required: true },
    sentAt: { type: Number, required: true },
    replied: { type: Boolean, default: false },
    responses: [responseSchema]
});

const Client = mongoose.model('Client', clientSchema);
const Email = mongoose.model('Email', emailSchema);

module.exports = { Client, Email };