"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const calculateTotalOwed_1 = require("../utils/calculateTotalOwed");
class JobService {
    jobRepository;
    clientService;
    constructor(jobRepository, clientService) {
        this.jobRepository = jobRepository;
        this.clientService = clientService;
    }
    async getAllJobs() {
        // Returns all jobs
        return this.jobRepository.getAll();
    }
    async getJobById(id) {
        // Returns Job by given id
        return this.jobRepository.getById(id);
    }
    async getJobsByClientId(clientId) {
        // Returns Job by given client id
        return this.jobRepository.geyByClientId(clientId);
    }
    async createJob(clientId, description, amount, paidAmount) {
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
    async deleteJob(id) {
        // Delete a job by given id
        const result = this.jobRepository.delete(id);
        return result;
    }
    async updateJob(id, updates) {
        // Updates job data, can receive partial or full new data
        return this.jobRepository.update(id, updates);
    }
    async calculateJobStatus(amount, paidAmount) {
        // Calculates if job has been paid and assigns appropriate status to job
        return paidAmount >= amount ? "paid" : "pending";
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
