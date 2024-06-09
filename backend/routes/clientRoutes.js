const express = require("express");
const { getAllClients, createClient, updateClientById, deleteClientById } = require("../controllers/clientControllers");
const { validateToken } = require("../middleware/authMiddleware");
const clientRouter = express.Router();

// middleware that only lets logged in users access route 
clientRouter.use(validateToken);

clientRouter.get('/', getAllClients);

clientRouter.post('/', createClient);

clientRouter.put('/:id', updateClientById);

clientRouter.delete('/:id', deleteClientById);

module.exports = clientRouter;