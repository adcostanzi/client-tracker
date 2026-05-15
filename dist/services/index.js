"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobService = exports.clientService = void 0;
const ClientService_1 = require("./ClientService");
const JobService_1 = require("./JobService");
// Initialization of services in the index to work under one instance
exports.clientService = new ClientService_1.ClientService();
exports.jobService = new JobService_1.JobService(exports.clientService);
