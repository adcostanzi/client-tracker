import { FirestoreClientRepository } from "../repositories/FirestoreClientRepository";
import { FirestoreJobRepository } from "../repositories/FirestoreJobRepository";
import { ClientService } from "./ClientService";
import { JobService } from "./JobService";

const clientRepository = new FirestoreClientRepository();
const jobRepository = new FirestoreJobRepository();

// Initialization of services in the index to work under one instance
export const clientService = new ClientService(clientRepository);

export const jobService = new JobService(jobRepository, clientService);
