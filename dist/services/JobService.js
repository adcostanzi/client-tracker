"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const _1 = require(".");
const NotFoundError_1 = require("../errors/NotFoundError");
const calculateTotalOwed_1 = require("../utils/calculateTotalOwed");
class JobService {
    jobs = [];
    nextId = 1;
    async getAllJobs() {
        return this.jobs;
    }
    async getJobById(id) {
        return this.jobs.find((job) => job.id == id);
    }
    async getJobsByClientId(clientId) {
        return this.jobs.filter((job) => job.clientId == clientId);
    }
    async createJob(clientId, description, amount, paidAmount) {
        const client = await _1.clientService.getClientById(clientId);
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
        const originalJobsLength = this.jobs.length;
        this.jobs = this.jobs.filter((job) => job.id !== id);
        return this.jobs.length < originalJobsLength;
    }
    async updateJob(id, updates) {
        const job = this.jobs.find((job) => job.id === id);
        if (!job) {
            throw new NotFoundError_1.NotFoundError("Job not found");
        }
        if (updates.clientId !== undefined) {
            const client = await _1.clientService.getClientById(updates.clientId);
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
        if (job.paidAmount >= job.amount) {
            job.status = "paid";
        }
        else {
            job.status = "pending";
        }
    }
    async calculateClientOwes(clientId) {
        const jobs = await this.getJobsByClientId(clientId);
        if (jobs.length === 0) {
            throw new Error("Client not found or does not have any jobs assigned");
        }
        return (0, calculateTotalOwed_1.calculateTotalOwed)(jobs);
    }
}
exports.JobService = JobService;
