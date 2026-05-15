import { ClientService } from "./ClientService";
import { JobService } from "./JobService";

// Initialization of services in the index to work under one instance
export const clientService = new ClientService();

export const jobService = new JobService(clientService);
