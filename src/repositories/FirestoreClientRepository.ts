import { db } from "../firebase/firebaseAdmin";
import { Client } from "../models/Client";
import { ClientRepository } from "./ClientRepository";

export class FirestoreClientRepository implements ClientRepository {
  // Repository that handles the connections from the app to the Firestore db
  private collection = db.collection("clients");

  async getAll(): Promise<Client[]> {
    // Function to retrieve all clients from the collection
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Client, "id">),
    }));
  }

  async getById(id: string): Promise<Client | undefined> {
    // Function to retrieve specific client from the collection by Id
    const doc = await this.collection.doc(id).get();

    if (!doc.exists) {
      return undefined;
    }

    return {
      id: id,
      ...(doc.data() as Omit<Client, "id">),
    };
  }

  async create(client: Omit<Client, "id">): Promise<Client> {
    // Function to create new client in the db
    const reference = await this.collection.add(client);

    return {
      id: reference.id,
      ...client,
    };
  }

  async update(
    id: string,
    updates: Partial<Omit<Client, "id">>,
  ): Promise<Client | undefined> {
    // Function to update client in the db (can take one or multiple update fields)
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return undefined;
    }
    await docRef.update(updates);

    const updateDoc = await docRef.get();

    return {
      id: updateDoc.id,
      ...(updateDoc.data() as Omit<Client, "id">),
    };
  }

  async delete(id: string): Promise<boolean> {
    // Deletes a specific client by id
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return false;
    }

    await docRef.delete();
    return true;
  }
}
