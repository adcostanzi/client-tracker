import { clientService } from ".";
import { Job } from "../models/Job";
import { JobStatus } from "../models/JobStatus";

export class JobService {
  private jobs: Job[] = [];
  private nextId = 1;

  async getAllJobs(): Promise<Job[]> {
    return this.jobs;
  }

  async getJobById(id: number): Promise<Job | undefined> {
    return this.jobs.find((job) => job.id == id);
  }

  async getJobByClientId(clientId: number): Promise<Job[]> {
    return this.jobs.filter((job) => job.clientId == clientId);
  }

  async createJob(
    clientId: number,
    description: string,
    amount: number,
    paidAmount: number,
  ): Promise<Job> {
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
  ): Promise<Job | undefined> {
    const job = this.jobs.find((job) => job.id == id);

    if (!job) {
      return undefined;
    }

    if (updates.clientId !== undefined) {
      try {
        const client = await clientService.getClientById(updates.clientId);
        if (!client) {
          return undefined;
        }
        job.clientId = updates.clientId;
      } catch (error) {
        return undefined;
      }
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
}
