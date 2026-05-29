import { Job } from "../models/Job";

export interface JobRepository {
  getAll(): Promise<Job[]>;
  getById(id: string): Promise<Job | undefined>;
  geyByClientId(clientId: string): Promise<Job[]>;
  create(job: Omit<Job, "id">): Promise<Job>;
  update(
    id: string,
    updates: Partial<Omit<Job, "id">>,
  ): Promise<Job | undefined>;
  delete(id: string): Promise<boolean>;
}
