"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
class ClientService {
    clients = [];
    nextId = 1;
    async getAllClients() {
        return this.clients;
    }
    async getClientById(id) {
        return this.clients.find((client) => client.id == id);
    }
    async createClient(name, phone, email) {
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
        const originalListLength = this.clients.length;
        this.clients = this.clients.filter((client) => client.id !== id);
        return this.clients.length < originalListLength;
    }
}
exports.ClientService = ClientService;
