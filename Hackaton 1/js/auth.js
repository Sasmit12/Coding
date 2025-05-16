// Password visibility toggle
document.addEventListener('DOMContentLoaded', function() {
    const togglePwd = document.querySelector('.toggle-password');
    if (togglePwd) {
        togglePwd.addEventListener('click', function() {
            const pwdInput = document.getElementById('password');
            const icon = this.querySelector('i');
            if (pwdInput.type === 'password') {
                pwdInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                this.setAttribute('aria-label', 'Hide password');
            } else {
                pwdInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                this.setAttribute('aria-label', 'Show password');
            }
        });
    }

    // Simple login handling (demo)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Replace this with real authentication
            alert('Login successful! (Demo - Implement authentication)');
            window.location.href = 'index.html';
        });
    }
});

// Signup page logic: role selection, password visibility, basic validation
document.addEventListener('DOMContentLoaded', function() {
    // Role selection from URL param
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role');
    if (roleParam) {
        document.getElementById('role').value = roleParam;
    }

    // Password visibility toggles for both password and confirm password
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

    // Simple signup form validation and demo handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const pwd = document.getElementById('password').value;
            const cpwd = document.getElementById('confirm-password').value;
            if (pwd !== cpwd) {
                alert('Passwords do not match!');
                return;
            }
            // Replace with real backend signup logic
            alert('Sign up successful! (Demo - Implement real signup)');
            window.location.href = 'index.html';
        });
    }
});