const express = require("express");
const { getAllClients, createClient, updateClientById, deleteClientById } = require("../controllers/clientControllers");
const clientRouter = express.Router();

clientRouter.get('/', getAllClients);

clientRouter.post('/', createClient);

clientRouter.put('/', updateClientById);

clientRouter.delete('/', deleteClientById);

module.exports = clientRouter;