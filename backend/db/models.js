const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String }
}, { timestamps: true });

const emailSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    sentAt: { type: Number, required: true },
    replied: { type: Boolean, default: false },
    responses: [Number],
    deliveryStatus: {
        type: String,
        enum: ['delivered', 'failed'],
    }
});

const Client = mongoose.model('Client', clientSchema);
const Email = mongoose.model('Email', emailSchema);

module.exports = { Client, Email };