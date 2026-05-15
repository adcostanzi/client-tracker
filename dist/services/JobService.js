"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const NotFoundError_1 = require("../errors/NotFoundError");
const calculateTotalOwed_1 = require("../utils/calculateTotalOwed");
class JobService {
    clientService;
    jobs = [];
    nextId = 1;
    constructor(clientService) {
        this.clientService = clientService;
    }
    async getAllJobs() {
        // Returns all jobs
        return this.jobs;
    }
    async getJobById(id) {
        // Returns Job by given id
        return this.jobs.find((job) => job.id == id);
    }
    async getJobsByClientId(clientId) {
        // Returns Job by given client id
        return this.jobs.filter((job) => job.clientId == clientId);
    }
    async createJob(clientId, description, amount, paidAmount) {
        // Create Job, all paramenters are required
        const client = await this.clientService.getClientById(clientId);
        if (!client) {
            throw new Error("Client not found");
        }
        const newJob = {
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
    async deleteJob(id) {
        // Delete a job by given id
        const originalJobsLength = this.jobs.length;
        this.jobs = this.jobs.filter((job) => job.id !== id);
        return this.jobs.length < originalJobsLength;
    }
    async updateJob(id, updates) {
        // Updates job data, can receive partial or full new data
        const job = this.jobs.find((job) => job.id === id);
        if (!job) {
            throw new NotFoundError_1.NotFoundError("Job not found");
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
    async calculateJobStatus(job) {
        // Calculates if job has been paid and assigns appropriate status to job
        if (job.paidAmount >= job.amount) {
            job.status = "paid";
        }
        else {
            job.status = "pending";
        }
    }
    async calculateClientOwes(clientId) {
        // Calculates amount owed of all jobs of a given client
        const jobs = await this.getJobsByClientId(clientId);
        if (jobs.length === 0) {
            throw new Error("Client not found or does not have any jobs assigned");
        }
        return (0, calculateTotalOwed_1.calculateTotalOwed)(jobs);
    }
}
exports.JobService = JobService;
