"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobService = exports.clientService = void 0;
const FirestoreClientRepository_1 = require("../repositories/FirestoreClientRepository");
const FirestoreJobRepository_1 = require("../repositories/FirestoreJobRepository");
const ClientService_1 = require("./ClientService");
const JobService_1 = require("./JobService");
const clientRepository = new FirestoreClientRepository_1.FirestoreClientRepository();
const jobRepository = new FirestoreJobRepository_1.FirestoreJobRepository();
// Initialization of services in the index to work under one instance
exports.clientService = new ClientService_1.ClientService(clientRepository, jobRepository);
exports.jobService = new JobService_1.JobService(jobRepository, exports.clientService);
