import { JobStatus } from "./JobStatus";

export interface Job {
  id: number;
  clientId: number;
  description: string;
  amount: number;
  paidAmount: number;
  status: JobStatus;
}
