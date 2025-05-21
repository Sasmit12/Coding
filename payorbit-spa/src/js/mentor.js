// src/js/mentor.js

/**
 * Validate the mentor session form.
 * @param {Object} formData - { date, topic, duration }
 * @returns {string|null} - Error message if invalid, otherwise null.
 */
export function validateMentorSessionForm(formData) {
  const { date, topic, duration } = formData;
  if (!date || !topic || !duration || Number(duration) <= 0) {
    return "Please fill in all fields with valid data.";
  }
  return null;
}

/**
 * Add a new session to Firestore.
 * @param {object} db - Firestore instance.
 * @param {object} session - { mentorId, mentorName, date, topic, duration }
 * @returns {Promise}
 */
export function addMentorSession(db, session) {
  return db.collection('sessions').add({
    ...session,
    status: "pending",
    createdAt: (db.constructor.FieldValue
      ? db.constructor.FieldValue.serverTimestamp()
      : (window.firebase ? window.firebase.firestore.FieldValue.serverTimestamp() : null))
  });
}

/**
 * Calculate mentor session statistics.
 * @param {Array} sessions - Array of session objects from Firestore.
 * @param {number} earningPerMinute - Earning per minute for approved sessions.
 * @returns {{
 *   total: number,
 *   pending: number,
 *   approved: number,
 *   earnings: number
 * }}
 */
export function computeMentorSessionStats(sessions, earningPerMinute = 10) {
  let total = 0, pending = 0, approved = 0, earnings = 0;
  sessions.forEach(s => {
    total++;
    if (s.status === "pending") pending++;
    if (s.status === "approved") {
      approved++;
      earnings += (s.duration || 0) * earningPerMinute;
    }
  });
  return { total, pending, approved, earnings };
}

/**
 * Convert session data to CSV string.
 * @param {Array} sessions - Array of session objects (with id, date, topic, duration, status).
 * @returns {string} - CSV string.
 */
export function sessionsToCSV(sessions) {
  if (!sessions.length) return "";
  const headers = ["ID", "Date", "Topic", "Duration", "Status"];
  const rows = sessions.map(s =>
    [s.id, s.date, s.topic, `${s.duration} min`, s.status.charAt(0).toUpperCase() + s.status.slice(1)]
      .map(val => (typeof val === "string" ? val.replace(/,/g, "") : val))
      .join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

/**
 * Download a CSV string as a file in the browser.
 * @param {string} csvContent - The CSV data string.
 * @param {string} filename - The filename for download.
 */
export function downloadCSV(csvContent, filename = "my-sessions.csv") {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Handle fake session CSV upload (demo only).
 * @returns {string}
 */
export function handleSessionCSVUploadDemo() {
  return "Session file uploaded! (Demo - Implement real upload)";
}

/**
 * Logout the user.
 * @param {object} firebase - The Firebase instance.
 * @returns {Promise}
 */
export function logout(firebase) {
  return firebase.auth().signOut();
}