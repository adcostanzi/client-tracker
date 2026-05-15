import { NotFoundError } from "../src/errors/NotFoundError";
import { ClientService } from "../src/services/ClientService";
import { JobService } from "../src/services/JobService";

describe("JobService", () => {
  test("creates a job for an existing client", async () => {
    const clientService = new ClientService();
    const jobService = new JobService(clientService);

    const client = await clientService.createClient("John Doe");

    const job = await jobService.createJob(client.id, "break service", 150, 50);

    expect(job.id).toBe(1);
    expect(job.clientId).toBe(1);
    expect(job.description).toBe("break service");
    expect(job.amount).toBe(150);
    expect(job.paidAmount).toBe(50);
    expect(job.status).toBe("pending");
  });

  test("returns Error when creating a job for a non-existing client", async () => {
    const clientService = new ClientService();
    const jobService = new JobService(clientService);

    await expect(
      jobService.createJob(123, "Oil change", 100, 0),
    ).rejects.toThrow(Error);
  });

  test("set job status to paid if conditions apply", async () => {
    const clientService = new ClientService();
    const jobService = new JobService(clientService);

    const client = await clientService.createClient("John Doe");

    const job = await jobService.createJob(
      client.id,
      "break service",
      150,
      150,
    );

    expect(job.status).toBe("paid");
  });
});
