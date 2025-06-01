import { db } from "./firebase";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

// Add a document to a Firestore collection
export const addDocument = (col, data) =>
  addDoc(collection(db, col), { ...data, createdAt: serverTimestamp() });

// Get a single document from a collection
export const getDocument = async (col, id) => {
  const docRef = doc(db, col, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Get all documents from a collection
export const getDocuments = async (col) => {
  const snap = await getDocs(collection(db, col));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update a document in a collection
export const updateDocument = (col, id, updates) =>
  updateDoc(doc(db, col, id), { ...updates, updatedAt: serverTimestamp() });

// Delete a document from a collection
export const deleteDocument = (col, id) =>
  deleteDoc(doc(db, col, id));