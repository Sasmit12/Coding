// src/js/audit.js

/**
 * Validate signup form fields.
 * @param {Object} formData - { name, email, password, confirmPassword, role }
 * @returns {string|null} - Error message if invalid, otherwise null.
 */
export function validateSignup(formData) {
  const { name, email, password, confirmPassword, role } = formData;
  if (!name || !email || !password || !confirmPassword || !role) {
    return 'Please fill in all fields.';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match!';
  }
  return null;
}

/**
 * Create a new user with email and password and save extra data to Firestore.
 * @param {Object} firebase - Firebase instance (should have auth and firestore).
 * @param {Object} formData - { name, email, password, role }
 * @returns {Promise}
 */
export async function signupUser(firebase, formData) {
  const { name, email, password, role } = formData;
  const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
  const user = userCredential.user;
  await firebase.firestore().collection('users').doc(user.uid).set({
    name,
    email,
    role,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  return user;
}

/**
 * Validate login form.
 * @param {string} email
 * @param {string} password
 * @returns {string|null}
 */
export function validateLogin(email, password) {
  if (!email || !password) {
    return 'Please enter both email and password.';
  }
  return null;
}

/**
 * Log in user with email and password.
 * @param {Object} firebase - Firebase instance.
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export async function loginUser(firebase, email, password) {
  const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
  return userCredential.user;
}

/**
 * Log out the current user.
 * @param {Object} firebase - Firebase instance.
 * @returns {Promise}
 */
export function logoutUser(firebase) {
  return firebase.auth().signOut();
}

// ----- Password toggle and social login are handled in React components UI -----