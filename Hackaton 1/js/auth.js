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

    // ----- SOCIAL SIGNUP (Google/Facebook) -----
    // Helper: After social sign-up, collect role and save profile
    function askRoleAndSaveProfile(user, provider) {
        let role = prompt("Please enter your role (admin or mentor):", "mentor");
        while (role !== "admin" && role !== "mentor") {
            role = prompt("Invalid input. Please enter either 'admin' or 'mentor':", "mentor");
        }
        // Save user profile in Firestore
        return firebase.firestore().collection('users').doc(user.uid).set({
            name: user.displayName || "",
            email: user.email,
            role: role,
            provider: provider,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    // Google Sign Up
    const googleSignUpBtn = document.getElementById('googleSignUpBtn');
    if (googleSignUpBtn) {
        googleSignUpBtn.addEventListener('click', function () {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => {
                    const user = result.user;
                    // Check if user profile exists; if not, ask for role and save
                    return firebase.firestore().collection('users').doc(user.uid).get()
                        .then(doc => {
                            if (!doc.exists) {
                                return askRoleAndSaveProfile(user, "google");
                            }
                        })
                        .then(() => {
                            alert('Sign up with Google successful! Redirecting...');
                            window.location.href = 'dashboard.html';
                        });
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }

    // Facebook Sign Up
    const facebookSignUpBtn = document.getElementById('facebookSignUpBtn');
    if (facebookSignUpBtn) {
        facebookSignUpBtn.addEventListener('click', function () {
            const provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => {
                    const user = result.user;
                    // Check if user profile exists; if not, ask for role and save
                    return firebase.firestore().collection('users').doc(user.uid).get()
                        .then(doc => {
                            if (!doc.exists) {
                                return askRoleAndSaveProfile(user, "facebook");
                            }
                        })
                        .then(() => {
                            alert('Sign up with Facebook successful! Redirecting...');
                            window.location.href = 'dashboard.html';
                        });
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }

    // ----- SOCIAL LOGIN (Google/Facebook) -----
    // Social login for login page (just login, no role prompt)
    const googleSignInBtn = document.getElementById('googleSignInBtn');
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', function () {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => {
                    window.location.href = 'dashboard.html';
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }

    const facebookSignInBtn = document.getElementById('facebookSignInBtn');
    if (facebookSignInBtn) {
        facebookSignInBtn.addEventListener('click', function () {
            const provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => {
                    window.location.href = 'dashboard.html';
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }

    // ----- LOGOUT FUNCTION (for dashboard, not used here) -----
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            firebase.auth().signOut().then(() => window.location.href = 'login.html');
        });
    }
});