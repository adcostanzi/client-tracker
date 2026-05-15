import { ClientService } from "./ClientService";
import { Job } from "../models/Job";
import { NotFoundError } from "../errors/NotFoundError";
import { calculateTotalOwed } from "../utils/calculateTotalOwed";

export class JobService {
  private jobs: Job[] = [];
  private nextId = 1;

  constructor(private clientService: ClientService) {}

  async getAllJobs(): Promise<Job[]> {
    return this.jobs;
  }

  async getJobById(id: number): Promise<Job | undefined> {
    return this.jobs.find((job) => job.id == id);
  }

  async getJobsByClientId(clientId: Number): Promise<Job[]> {
    return this.jobs.filter((job) => job.clientId == clientId);
  }

  async createJob(
    clientId: number,
    description: string,
    amount: number,
    paidAmount: number,
  ): Promise<Job> {
    const client = await this.clientService.getClientById(clientId);

    if (!client) {
      throw new Error("Client not found");
    }
    const newJob: Job = {
      id: this.nextId++,
      clientId,
      description,
      amount,
      paidAmount,
      status: paidAmount >= amount ? "paid" : "pending",
    };

    this.jobs.push(newJob);
    return newJob;
  }

  async deleteJob(id: number): Promise<boolean> {
    const originalJobsLength = this.jobs.length;

    this.jobs = this.jobs.filter((job) => job.id !== id);

    return this.jobs.length < originalJobsLength;
  }

  async updateJob(
    id: number,
    updates: {
      clientId?: number;
      description?: string;
      amount?: number;
      paidAmount?: number;
    },
  ): Promise<Job> {
    const job = this.jobs.find((job) => job.id === id);

    if (!job) {
      throw new NotFoundError("Job not found");
    }

    if (updates.clientId !== undefined) {
      const client = await this.clientService.getClientById(updates.clientId);

      if (!client) {
        throw new Error("Client not found");
      }

      job.clientId = updates.clientId;
    }
    if (updates.description !== undefined) {
      job.description = updates.description;
    }
    if (updates.amount !== undefined) {
      job.amount = updates.amount;
    }
    if (updates.paidAmount !== undefined) {
      job.paidAmount = updates.paidAmount;
    }

    await this.calculateJobStatus(job);

    return job;
  }

  async calculateJobStatus(job: Job) {
    if (job.paidAmount >= job.amount) {
      job.status = "paid";
    } else {
      job.status = "pending";
    }
  }

  async calculateClientOwes(clientId: Number): Promise<number> {
    const jobs = await this.getJobsByClientId(clientId);

    if (jobs.length === 0) {
      throw new Error("Client not found or does not have any jobs assigned");
    }

    return calculateTotalOwed(jobs);
  }
}
