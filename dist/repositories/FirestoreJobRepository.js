"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreJobRepository = void 0;
const firebaseAdmin_1 = require("../firebase/firebaseAdmin");
class FirestoreJobRepository {
    // Repository that handles the connections from the app to the Firestore db
    collection = firebaseAdmin_1.db.collection("jobs");
    async getAll() {
        // Function to retrieve all jobs from the collection
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    }
    async getById(id) {
        // Function to retrieve specific job from the collection by Id
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return undefined;
        }
        return {
            id: id,
            ...doc.data(),
        };
    }
    async geyByClientId(clientId) {
        // Retrieves all jobs from the collection with a specific clientId
        const snapshot = await this.collection
            .where("clientId", "==", clientId)
            .get();
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    }
    async create(job) {
        // Creates a job in the collection
        const reference = await this.collection.add(job);
        return {
            id: reference.id,
            ...job,
        };
    }
    async update(id, updates) {
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
            ...updatedDoc.data(),
        };
    }
    async delete(id) {
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
exports.FirestoreJobRepository = FirestoreJobRepository;
