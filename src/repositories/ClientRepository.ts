import { ClientRequest } from "node:http";
import { Client } from "../models/Client";

// ClientRepository is the "middleware" between the clientService and any repository that might handle clients.
// This repo was setup using a repository based architecture to prepare future migrations to other cloud storage provider if needed

export interface ClientRepository {
  getAll(): Promise<Client[]>;
  getById(id: string): Promise<Client | undefined>;
  create(client: Omit<Client, "id">): Promise<Client>;
  update(
    id: string,
    updates: Partial<Omit<Client, "id">>,
  ): Promise<Client | undefined>;
  delete(id: string): Promise<boolean>;
}
