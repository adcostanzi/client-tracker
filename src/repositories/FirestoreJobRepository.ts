import { db } from "../firebase/firebaseAdmin";
import { Job } from "../models/Job";
import { JobRepository } from "./JobRepository";

export class FirestoreJobRepository implements JobRepository {
  // Repository that handles the connections from the app to the Firestore db
  private collection = db.collection("jobs");

  async getAll(): Promise<Job[]> {
    // Function to retrieve all jobs from the collection
    const snapshot = await this.collection.get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Job, "id">),
    }));
  }

  async getById(id: string): Promise<Job | undefined> {
    // Function to retrieve specific job from the collection by Id
    const doc = await this.collection.doc(id).get();

    if (!doc.exists) {
      return undefined;
    }

    return {
      id: id,
      ...(doc.data() as Omit<Job, "id">),
    };
  }

  async geyByClientId(clientId: string): Promise<Job[]> {
    // Retrieves all jobs from the collection with a specific clientId
    const snapshot = await this.collection
      .where("clientId", "==", clientId)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Job, "id">),
    }));
  }

  async create(job: Omit<Job, "id">): Promise<Job> {
    // Creates a job in the collection
    const reference = await this.collection.add(job);

    return {
      id: reference.id,
      ...job,
    };
  }

  async update(
    id: string,
    updates: Partial<Omit<Job, "id">>,
  ): Promise<Job | undefined> {
    // Updates a job (can take one or multiple fields)
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return undefined;
    }

    await docRef.update(updates);

    const updatedDoc = await docRef.get();

    return {
      id: updatedDoc.id,
      ...(updatedDoc.data() as Omit<Job, "id">),
    };
  }

  async delete(id: string): Promise<boolean> {
    // Deletes job in collection by id
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return false;
    }

    await docRef.delete();
    return true;
  }
}
