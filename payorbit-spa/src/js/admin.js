// src/js/admin.js

/**
 * Compute summary metrics for sessions.
 * @param {Array} sessions - Array of session objects from Firestore.
 * @param {number} earningPerMinute - The earning per minute for approved sessions.
 * @returns {{
 *   mentorCount: number,
 *   sessionCount: number,
 *   pendingCount: number,
 *   totalPayouts: number
 * }}
 */
export function computeSessionMetrics(sessions, earningPerMinute = 10) {
  const mentorSet = new Set();
  let sessionCount = 0;
  let pendingCount = 0;
  let totalPayouts = 0;

  sessions.forEach(s => {
    mentorSet.add(s.mentorId);
    sessionCount++;
    if (s.status === "pending") pendingCount++;
    if (s.status === "approved") totalPayouts += (s.duration || 0) * earningPerMinute;
  });

  return {
    mentorCount: mentorSet.size,
    sessionCount,
    pendingCount,
    totalPayouts
  };
}

/**
 * Approve a session.
 * @param {string} sessionId - Firestore document ID.
 * @param {object} db - Firestore instance.
 * @returns {Promise}
 */
export function approveSession(sessionId, db) {
  return db.collection('sessions').doc(sessionId).update({
    status: "approved"
  });
}

/**
 * Reject a session.
 * @param {string} sessionId - Firestore document ID.
 * @param {object} db - Firestore instance.
 * @returns {Promise}
 */
export function rejectSession(sessionId, db) {
  return db.collection('sessions').doc(sessionId).update({
    status: "rejected"
  });
}

/**
 * (Demo) Parse Sessions CSV.
 * @param {File} _file - The uploaded CSV file.
 * @returns {Promise<Array>} - Resolves to an array of session objects.
 */
export function parseSessionsCSV(_file) {
  // Implement CSV parsing logic here (e.g., with PapaParse)
  // For now, return a resolved promise (demo)
  return Promise.resolve([]);
}