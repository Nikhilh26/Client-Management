const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;