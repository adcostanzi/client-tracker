"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
class ClientService {
    clientRepository;
    jobRepository;
    constructor(clientRepository, jobRepository) {
        this.clientRepository = clientRepository;
        this.jobRepository = jobRepository;
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
        const deleted = await this.clientRepository.delete(id);
        if (!deleted) {
            return false;
        }
        // Cascade: remove every job linked to this client
        await this.jobRepository.deleteByClientId(id);
        return true;
    }
    async updateClient(id, updates) {
        return this.clientRepository.update(id, updates);
    }
}
exports.ClientService = ClientService;
