"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreClientRepository = void 0;
const firebaseAdmin_1 = require("../firebase/firebaseAdmin");
class FirestoreClientRepository {
    collection = firebaseAdmin_1.db.collection("clients");
    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    }
    async getById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return undefined;
        }
        return {
            id: id,
            ...doc.data(),
        };
    }
    async create(client) {
        const reference = await this.collection.add(client);
        return {
            id: reference.id,
            ...client,
        };
    }
    async update(id, updates) {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return undefined;
        }
        await docRef.update(updates);
        const updateDoc = await docRef.get();
        return {
            id: updateDoc.id,
            ...updateDoc.data(),
        };
    }
    async delete(id) {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return false;
        }
        await docRef.delete();
        return true;
    }
}
exports.FirestoreClientRepository = FirestoreClientRepository;
