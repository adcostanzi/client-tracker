"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
class ClientService {
    clientRepository;
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async getAllClients() {
        // Returns all clients
        return this.clientRepository.getAll();
    }
    async getClientById(id) {
        // Returns client by given id or undefined
        return this.clientRepository.getById(id);
    }
    async createClient(name, phone, email) {
        return this.clientRepository.create({
            name,
            phone,
            email,
        });
    }
    async deleteClient(id) {
        // Deletes a client by given id
        return this.clientRepository.delete(id);
    }
    async updateClient(id, updates) {
        return this.clientRepository.update(id, updates);
    }
}
exports.ClientService = ClientService;
