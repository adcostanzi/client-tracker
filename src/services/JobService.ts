import { ClientService } from "./ClientService";
import { Job } from "../models/Job";
import { NotFoundError } from "../errors/NotFoundError";
import { calculateTotalOwed } from "../utils/calculateTotalOwed";
import { JobRepository } from "../repositories/JobRepository";

export class JobService {
  constructor(
    private jobRepository: JobRepository,
    private clientService: ClientService,
  ) {}

  async getAllJobs(): Promise<Job[]> {
    // Returns all jobs
    return this.jobRepository.getAll();
  }

  async getJobById(id: string): Promise<Job | undefined> {
    // Returns Job by given id
    return this.jobRepository.getById(id);
  }

  async getJobsByClientId(clientId: string): Promise<Job[]> {
    // Returns Job by given client id
    return this.jobRepository.geyByClientId(clientId);
  }

  async createJob(
    clientId: string,
    description: string,
    amount: number,
    paidAmount: number,
  ): Promise<Job> {
    // Create Job, all paramenters are required
    const client = await this.clientService.getClientById(clientId);

    if (!client) {
      throw new Error("Client not found");
    }
    const status = await this.calculateJobStatus(amount, paidAmount);

    return this.jobRepository.create({
      clientId,
      description,
      amount,
      paidAmount,
      status,
    });
  }

  async deleteJob(id: string): Promise<boolean> {
    // Delete a job by given id
    const result = this.jobRepository.delete(id);
    return result;
  }

  async updateJob(
    id: string,
    updates: {
      clientId?: string;
      description?: string;
      amount?: number;
      paidAmount?: number;
    },
  ): Promise<Job | undefined> {
    // Updates job data, can receive partial or full new data
    const finalUpdates: Partial<Omit<Job, "id">> = { ...updates };

    // If amount or paidAmount changed, recalculate the status. Merge with the
    // existing job so a partial update (e.g. only paidAmount) still computes
    // against the correct values.
    if (updates.amount !== undefined || updates.paidAmount !== undefined) {
      const existing = await this.jobRepository.getById(id);

      if (!existing) {
        return undefined;
      }

      const amount = updates.amount ?? existing.amount;
      const paidAmount = updates.paidAmount ?? existing.paidAmount;

      finalUpdates.status = await this.calculateJobStatus(amount, paidAmount);
    }

    return this.jobRepository.update(id, finalUpdates);
  }

  async calculateJobStatus(amount: number, paidAmount: number) {
    // Calculates if job has been paid and assigns appropriate status to job
    return paidAmount >= amount ? "paid" : "pending";
  }

  async calculateClientOwes(clientId: string): Promise<number> {
    // Calculates amount owed of all jobs of a given client
    const jobs = await this.getJobsByClientId(clientId);

    if (jobs.length === 0) {
      return 0;
    }

    return calculateTotalOwed(jobs);
  }
}
