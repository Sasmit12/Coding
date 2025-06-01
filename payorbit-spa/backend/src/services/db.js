import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

export const collections = {
  MENTORS: 'mentors',
  SESSIONS: 'sessions',
  PAYOUTS: 'payouts',
  RECEIPTS: 'receipts',
  CHATS: 'chats',
  AUDIT_LOGS: 'auditLogs',
};

// Create a new document and return with Firestore-generated ID
export const createDocument = async (collection, data) => {
  const docRef = await db.collection(collection).add({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return { id: docRef.id, ...data };
};

// Update document by ID, set updatedAt
export const updateDocument = async (collection, id, data) => {
  await db.collection(collection).doc(id).update({
    ...data,
    updatedAt: new Date(),
  });
  return { id, ...data };
};

// Get a document by ID
export const getDocument = async (collection, id) => {
  const doc = await db.collection(collection).doc(id).get();
  if (!doc.exists) {
    return null;
  }
  return { id: doc.id, ...doc.data() };
};

// Query documents in a collection with optional filters
export const queryDocuments = async (collection, queries = []) => {
  let ref = db.collection(collection);
  queries.forEach(({ field, operator, value }) => {
    ref = ref.where(field, operator, value);
  });
  const snapshot = await ref.get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Delete a document by ID
export const deleteDocument = async (collection, id) => {
  await db.collection(collection).doc(id).delete();
  return { id };
};

// Create an audit log entry
export const createAuditLog = async (action, userId, details) => {
  return await createDocument(collections.AUDIT_LOGS, {
    action,
    userId,
    details,
    timestamp: new Date(),
  });
};