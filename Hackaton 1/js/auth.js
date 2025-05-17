// Ensure Firebase SDKs and firebaseConfig.js are loaded before this file

document.addEventListener('DOMContentLoaded', function() {
    // ----- Password Show/Hide Toggle -----
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                this.setAttribute('aria-label', 'Hide password');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                this.setAttribute('aria-label', 'Show password');
            }
        });
    });

    // ----- Login -----
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    const uid = userCredential.user.uid;
                    return firebase.firestore().collection('users').doc(uid).get();
                })
                .then(doc => {
                    if (doc.exists) {
                        const role = doc.data().role;
                        if (role === 'admin') {
                            window.location.href = 'admin-dashboard.html';
                        } else {
                            window.location.href = 'dashboard.html';
                        }
                    } else {
                        window.location.href = 'dashboard.html';
                    }
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }

    // ----- Signup -----
    // Pre-fill role if present in URL (e.g. signup.html?role=mentor)
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role');
    if (roleParam && document.getElementById('role')) {
        document.getElementById('role').value = roleParam;
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
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
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                    const user = userCredential.user;
                    // Save user profile and role to Firestore
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
});