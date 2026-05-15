import { Job } from "../models/Job";

export function calculateTotalOwed(jobs: Job[], index = 0): number {
  // Recursive function that will return total owed from a job list.
  if (index >= jobs.length) {
    return 0;
  }

  const currentJob = jobs[index];
  const amountOwedInCurrentJob = currentJob.amount - currentJob.paidAmount;

  return amountOwedInCurrentJob + calculateTotalOwed(jobs, index + 1);
}
