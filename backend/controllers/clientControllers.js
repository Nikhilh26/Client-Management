const Client = require('../db/models');

const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find({ userId: req.userId });
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const createClient = async (req, res) => {
    try {
        const newClient = new Client({ ...req.body, userId: req.userId });
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateClientById = async (req, res) => {
    try {
        const updatedClient = await Client.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true }
        );
        if (!updatedClient) return res.status(404).json({ success: false, message: 'Client not found' });
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const deleteClientById = async (req, res) => {
    try {
        const deletedClient = await Client.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!deletedClient) return res.status(404).json({ success: false, message: 'Client not found' });
        res.status(200).json({ success: true, message: 'Client deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getAllClients,
    createClient,
    updateClientById,
    deleteClientById
};