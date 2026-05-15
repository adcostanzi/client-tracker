import { Job } from "../src/models/Job";
import { calculateTotalOwed } from "../src/utils/calculateTotalOwed";

describe("calculateTotalOwed", () => {
  test("returns 0 when there are no jobs", () => {
    const jobs: Job[] = [];
    const result = calculateTotalOwed(jobs);

    expect(result).toBe(0);
  });

  test("calculate the total owed from multiple jobs", () => {
    const jobs: Job[] = [
      {
        id: 1,
        clientId: 1,
        description: "Oil change",
        amount: 100,
        paidAmount: 40,
        status: "pending",
      },
      {
        id: 2,
        clientId: 1,
        description: "Brake Repair",
        amount: 300,
        paidAmount: 100,
        status: "pending",
      },
    ];

    const result = calculateTotalOwed(jobs);

    expect(result).toBe(260);
  });

  test("calculation returns negative amount (credit) if overpaid", () => {
    const jobs: Job[] = [
      {
        id: 1,
        clientId: 1,
        description: "Oil change",
        amount: 100,
        paidAmount: 140,
        status: "pending",
      },
      {
        id: 2,
        clientId: 1,
        description: "Brake Repair",
        amount: 300,
        paidAmount: 300,
        status: "pending",
      },
    ];

    const result = calculateTotalOwed(jobs);

    expect(result).toBe(-40);
  });
});
