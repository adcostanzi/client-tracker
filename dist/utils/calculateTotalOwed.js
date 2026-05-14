"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalOwed = calculateTotalOwed;
function calculateTotalOwed(jobs, index = 0) {
    if (index >= jobs.length) {
        return 0;
    }
    const currentJob = jobs[index];
    const amountOwedInCurrentJob = currentJob.amount - currentJob.paidAmount;
    return amountOwedInCurrentJob + calculateTotalOwed(jobs, index + 1);
}
