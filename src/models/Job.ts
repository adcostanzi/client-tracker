import { JobStatus } from "./JobStatus";

export interface Job {
  id: string;
  clientId: string;
  description: string;
  amount: number;
  paidAmount: number;
  status: JobStatus;
}
