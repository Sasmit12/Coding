import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Upload a file to Firebase Storage
export const uploadFile = async (path, file) => {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};

// Get download URL for a file in Storage
export const getFileUrl = (path) => {
  const fileRef = ref(storage, path);
  return getDownloadURL(fileRef);
};

// Delete a file from Storage
export const deleteFile = (path) => {
  const fileRef = ref(storage, path);
  return deleteObject(fileRef);
};