// Ensure Firebase is loaded and initialized via firebaseConfig.js before this file

document.addEventListener('DOMContentLoaded', function () {
    // ----- Password Show/Hide Toggle -----
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function () {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.querySelector('i').classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                this.querySelector('i').classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // ----- SIGNUP -----
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const role = document.getElementById('role').value;

            if (!name || !email || !password || !confirmPassword || !role) {
                alert('Please fill in all fields.');
                return;
            }
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            // Create user with email and password
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                    const user = userCredential.user;
                    // Save name and role in Firestore under "users" collection
                    return firebase.firestore().collection('users').doc(user.uid).set({
                        name, email, role, createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                })
                .then(() => {
                    alert('Sign up successful! You can now log in.');
                    window.location.href = 'login.html';
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }

    // ----- LOGIN -----
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    // Optionally check user role here and redirect accordingly
                    window.location.href = 'dashboard.html';
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }

    // ----- SOCIAL LOGINS (optional, not implemented) -----
    // You can implement Google and Facebook auth here with Firebase Auth Providers.
    // for Google:
        document.querySelector('.social-btn.google')

    // ----- LOGOUT FUNCTION (for dashboard, not used here) -----
    // Add this to dashboard.js if needed
     document.getElementById('logoutBtn').addEventListener('click', () => {
         firebase.auth().signOut().then(() => window.location.href = 'login.html');
     });
});