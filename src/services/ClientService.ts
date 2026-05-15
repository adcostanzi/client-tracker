import { Client } from "../models/Client";

export class ClientService {
  private clients: Client[] = [];
  private nextId = 1;

  async getAllClients(): Promise<Client[]> {
    // Returns all clients
    return this.clients;
  }

  async getClientById(id: number): Promise<Client | undefined> {
    // Returns client by given id or undefined
    return this.clients.find((client) => client.id == id);
  }

  async createClient(
    name: string,
    phone?: string,
    email?: string,
  ): Promise<Client> {
    // Creates a new client and pushes it to the client list. Only name is a required field
    const newClient: Client = {
      id: this.nextId++,
      name,
      phone,
      email,
    };
    this.clients.push(newClient);
    return newClient;
  }

  async deleteClient(id: number): Promise<boolean> {
    // Deletes a client by given id
    const originalListLength = this.clients.length;

    this.clients = this.clients.filter((client) => client.id !== id);

    return this.clients.length < originalListLength;
  }

  async updateClient(
    id: number,
    updates: { name?: string; phone?: string; email?: string },
  ): Promise<Client | undefined> {
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
