import { Router } from "express";
import { clientService } from "../services";
import { Client } from "../models/Client";

const router = Router();

// GET ALL CLIENTS path: /clients/
router.get("/", async (req, res) => {
  const clients = await clientService.getAllClients();
  return res.json(clients);
});

// GET CLIENT path: /clients/:id
router.get("/:id", async (req, res) => {
  const clientId = Number(req.params.id);
  const client = await clientService.getClientById(clientId);
  if (!client) {
    return res.status(404).json({ message: "Client not found" });
  }
  res.json(client);
});

// CREATE CLIENT path: /clients/
router.post("/", async (req, res) => {
  const { name, phone, email } = req.body;

  try {
    const newClient = await clientService.createClient(name, phone, email);

    res.status(201).json(newClient);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while trying to create client ${error}` });
  }
});

// UPDATE CLIENT path: /clients/:id
router.patch("/:id", async (req, res) => {
  const { name, phone, email } = req.body;
  const clientId = Number(req.params.id);

  try {
    const updatedClient = await clientService.updateClient(clientId, {
      name,
      phone,
      email,
    });

    if (!updatedClient) {
      return res
        .status(404)
        .json({ message: `No client with id ${clientId} was found!` });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while trying to update client ${error}` });
  }
});

// DELETE CLIENT path: /clients/:id
router.delete("/:id", async (req, res) => {
  const clientId = Number(req.params.id);

  const result = await clientService.deleteClient(clientId);

  if (result) {
    return res.status(200).json({ message: "Client successfully deleted!" });
  } else {
    return res
      .status(500)
      .json({ message: "Unable to delete. Missing or incorrect client id" });
  }
});

export default router;
