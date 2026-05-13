"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const clients = await services_1.clientService.getAllClients();
    return res.json(clients);
});
router.get("/:id", async (req, res) => {
    const clientId = Number(req.params.id);
    const client = await services_1.clientService.getClientById(clientId);
    if (!client) {
        return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
});
router.post("/", async (req, res) => {
    const { name, phone, email } = req.body;
    try {
        const newClient = await services_1.clientService.createClient(name, phone, email);
        res.status(201).json(newClient);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error while trying to create client ${error}` });
    }
});
router.patch("/:id", async (req, res) => {
    const { name, phone, email } = req.body;
    const clientId = Number(req.params.id);
    try {
        const updatedClient = await services_1.clientService.updateClient(clientId, {
            name,
            phone,
            email,
        });
        if (!updatedClient) {
            res
                .status(404)
                .json({ message: `No client with id ${clientId} was found!` });
        }
        res.status(200).json(updatedClient);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error while trying to update client ${error}` });
    }
});
router.delete("/:id", async (req, res) => {
    const clientId = Number(req.params.id);
    const result = await services_1.clientService.deleteClient(clientId);
    if (result) {
        return res.status(200).json({ message: "Client successfully deleted!" });
    }
    else {
        return res
            .status(500)
            .json({ message: "Unable to delete. Missing or incorrect client id" });
    }
});
exports.default = router;
