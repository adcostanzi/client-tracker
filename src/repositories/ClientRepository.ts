import { ClientRequest } from "node:http";
import { Client } from "../models/Client";

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
