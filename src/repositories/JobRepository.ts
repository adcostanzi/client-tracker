import { Job } from "../models/Job";

// JobRepository is the "middleware" between the jobService and any repository that might handle clients.
// This repo was setup using a repository based architecture to prepare future migrations to other cloud storage provider if needed

export interface JobRepository {
  getAll(): Promise<Job[]>;
  getById(id: string): Promise<Job | undefined>;
  geyByClientId(clientId: string): Promise<Job[]>;
  deleteByClientId(clientId: string): Promise<number>;
  create(job: Omit<Job, "id">): Promise<Job>;
  update(
    id: string,
    updates: Partial<Omit<Job, "id">>,
  ): Promise<Job | undefined>;
  delete(id: string): Promise<boolean>;
}
