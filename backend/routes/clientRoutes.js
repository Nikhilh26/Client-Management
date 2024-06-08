const express = require("express");
const { getAllClients, createClient, updateClientById, deleteClientById } = require("../controllers/clientControllers");
const clientRouter = express.Router();

clientRouter.get('/', getAllClients);

clientRouter.post('/', createClient);

clientRouter.put('/:id', updateClientById);

clientRouter.delete('/:id', deleteClientById);

module.exports = clientRouter;