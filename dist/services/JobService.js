"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
class JobService {
    jobs = [];
    nextId = 1;
    async getAllJobs() {
        return this.jobs;
    }
    async getJobById(id) {
        return this.jobs.find((job) => job.id == id);
    }
    async getJobByClientId(clientId) {
        return this.jobs.filter((job) => job.clientId == clientId);
    }
    async createJob(clientId, description, amount, paidAmount) {
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
}
exports.JobService = JobService;
