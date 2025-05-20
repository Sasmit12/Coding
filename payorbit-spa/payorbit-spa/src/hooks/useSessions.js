import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function useSessions(userId) {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, "sessions"), where("mentorId", "==", userId));
    const unsub = onSnapshot(q, (snapshot) => {
      setSessions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [userId]);
  return sessions;
}