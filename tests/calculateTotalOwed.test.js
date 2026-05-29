"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateTotalOwed_1 = require("../src/utils/calculateTotalOwed");
describe("calculateTotalOwed", () => {
  test("returns 0 when there are no jobs", () => {
    const jobs = [];
    const result = (0, calculateTotalOwed_1.calculateTotalOwed)(jobs);
    expect(result).toBe(0);
  });
  test("calculate the total owed from multiple jobs", () => {
    const jobs = [
      {
        id: "job1",
        clientId: "client1",
        description: "Oil change",
        amount: 100,
        paidAmount: 40,
        status: "pending",
      },
      {
        id: "job2",
        clientId: "client1",
        description: "Brake Repair",
        amount: 300,
        paidAmount: 100,
        status: "pending",
      },
    ];
    const result = (0, calculateTotalOwed_1.calculateTotalOwed)(jobs);
    expect(result).toBe(260);
  });
  test("calculation returns negative amount (credit) if overpaid", () => {
    const jobs = [
      {
        id: "job1",
        clientId: "client1",
        description: "Oil change",
        amount: 100,
        paidAmount: 140,
        status: "pending",
      },
      {
        id: "job2",
        clientId: "client1",
        description: "Brake Repair",
        amount: 300,
        paidAmount: 300,
        status: "pending",
      },
    ];
    const result = (0, calculateTotalOwed_1.calculateTotalOwed)(jobs);
    expect(result).toBe(-40);
  });
});
