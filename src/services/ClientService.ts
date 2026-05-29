import { Client } from "../models/Client";
import { ClientRepository } from "../repositories/ClientRepository";

export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async getAllClients(): Promise<Client[]> {
    // Returns all clients
    return this.clientRepository.getAll();
  }

  async getClientById(id: string): Promise<Client | undefined> {
    // Returns client by given id or undefined
    return this.clientRepository.getById(id);
  }

  async createClient(
    name: string,
    phone?: string,
    email?: string,
  ): Promise<Client> {
    return this.clientRepository.create({
      name,
      phone,
      email,
    });
  }

  async deleteClient(id: string): Promise<boolean> {
    // Deletes a client by given id
    return this.clientRepository.delete(id);
  }

  async updateClient(
    id: string,
    updates: { name?: string; phone?: string; email?: string },
  ): Promise<Client | undefined> {
    return this.clientRepository.update(id, updates);
  }
}
