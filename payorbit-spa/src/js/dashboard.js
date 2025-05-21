// src/js/simulation.js

/**
 * Get the mentor's name by user ID from Firestore.
 * @param {object} db - Firestore instance.
 * @param {string} uid - User ID.
 * @returns {Promise<string>} - Resolves to mentor's name.
 */
export async function getMentorName(db, uid) {
  const doc = await db.collection('users').doc(uid).get();
  if (!doc.exists) {
    throw new Error('User profile not found!');
  }
  return doc.data().name;
}

/**
 * Add a new session to Firestore.
 * @param {object} db - Firestore instance.
 * @param {object} session - { mentorId, mentorName, date, topic, duration }
 * @returns {Promise}
 */
export function addSession(db, session) {
  return db.collection('sessions').add({
    ...session,
    status: "pending", // default status
    createdAt: db.constructor.FieldValue
      ? db.constructor.FieldValue.serverTimestamp()
      : (window.firebase ? window.firebase.firestore.FieldValue.serverTimestamp() : null)
  });
}