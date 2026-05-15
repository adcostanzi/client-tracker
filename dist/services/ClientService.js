"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
class ClientService {
    clients = [];
    nextId = 1;
    async getAllClients() {
        // Returns all clients
        return this.clients;
    }
    async getClientById(id) {
        // Returns client by given id or undefined
        return this.clients.find((client) => client.id == id);
    }
    async createClient(name, phone, email) {
        // Creates a new client and pushes it to the client list. Only name is a required field
        const newClient = {
            id: this.nextId++,
            name,
            phone,
            email,
        };
        this.clients.push(newClient);
        return newClient;
    }
    async deleteClient(id) {
        // Deletes a client by given id
        const originalListLength = this.clients.length;
        this.clients = this.clients.filter((client) => client.id !== id);
        return this.clients.length < originalListLength;
    }
    async updateClient(id, updates) {
        // Updates client data, can receive partial or full new data
        const client = this.clients.find((client) => client.id == id);
        if (!client) {
            return undefined;
        }
        if (updates.name !== undefined) {
            client.name = updates.name;
        }
        if (updates.phone !== undefined) {
            client.phone = updates.phone;
        }
        if (updates.email !== undefined) {
            client.email = updates.email;
        }
        return client;
    }
}
exports.ClientService = ClientService;
