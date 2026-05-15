import { clientService } from "../src/services";
import { ClientService } from "../src/services/ClientService";

describe("ClientService", () => {
  test("creates a client", async () => {
    const clientService = new ClientService();
    const client = await clientService.createClient(
      "John Doe",
      "204-222-2222",
      "johnybgood@back2future.com",
    );
    expect(client.id).toBe(1);
    expect(client.name).toBe("John Doe");
    expect(client.phone).toBe("204-222-2222");
    expect(client.email).toBe("johnybgood@back2future.com");
  });

  test("returns all clients", async () => {
    const clientService = new ClientService();

    await clientService.createClient("John Doe");
    await clientService.createClient("Jane Doe");

    const clients = await clientService.getAllClients();
    expect(clients.length).toBe(2);
  });

  test("returns undefined when client doesnt exists", async () => {
    const clientService = new ClientService();
    const client = await clientService.getClientById(123);

    expect(client).toBeUndefined();
  });
});
