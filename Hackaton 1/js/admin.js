// js/admin.js

// Upload Sessions CSV (demo only)
document.addEventListener('DOMContentLoaded', function() {
    const uploadSessionsForm = document.getElementById('uploadSessionsForm');
    if (uploadSessionsForm) {
        uploadSessionsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fileInput = document.getElementById('sessionsFile');
            if (!fileInput.files.length) {
                alert('Please select a CSV file.');
                return;
            }
            alert('File uploaded! (Demo - Implement real upload)');
            fileInput.value = '';
        });
    }

    // Accessible admin dropdown menu
    const dropdownBtn = document.getElementById('adminDropdownBtn');
    const dropdownMenu = document.getElementById('adminDropdownMenu');
    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener('click', function() {
            const expanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
            dropdownBtn.setAttribute('aria-expanded', !expanded);
            dropdownMenu.hidden = expanded;
            if (!expanded) {
                dropdownMenu.focus();
            }
        });
        dropdownMenu.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdownMenu.hidden = true;
                dropdownBtn.setAttribute('aria-expanded', false);
                dropdownBtn.focus();
            }
        });
    }

    // ---- Admin Session Review Logic ----
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = "login.html";
            return;
        }
        // Optionally check if user is admin here

        // Load all sessions
        const tableBody = document.getElementById('allSessionsTable');
        firebase.firestore().collection('sessions')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                let html = '';
                let mentorSet = new Set();
                let sessionCount = 0;
                let pendingCount = 0;
                let totalPayouts = 0;
                const earningPerMinute = 10; // EXAMPLE: $10 per minute

                snapshot.forEach(doc => {
                    const s = doc.data();
                    mentorSet.add(s.mentorId);
                    sessionCount++;
                    if (s.status === "pending") pendingCount++;
                    if (s.status === "approved") totalPayouts += (s.duration || 0) * earningPerMinute;
                    html += `<tr>
                        <td>${s.mentorName || ''}</td>
                        <td>${s.date || ''}</td>
                        <td>${s.topic || ''}</td>
                        <td>${s.duration ? `${s.duration} min` : ''}</td>
                        <td><span class="status-badge ${s.status}">${s.status ? s.status.charAt(0).toUpperCase() + s.status.slice(1) : ''}</span></td>
                        <td>
                            <button onclick="approveSession('${doc.id}')" class="btn btn-outline" style="margin-right:4px">Approve</button>
                            <button onclick="rejectSession('${doc.id}')" class="btn btn-outline">Reject</button>
                        </td>
                    </tr>`;
                });
                tableBody.innerHTML = html || `<tr><td colspan="6">No sessions found.</td></tr>`;

                // Update metrics
                document.getElementById('mentorCount').textContent = mentorSet.size;
                document.getElementById('sessionCount').textContent = sessionCount;
                document.getElementById('pendingApprovals').textContent = pendingCount;
                document.getElementById('totalPayouts').innerHTML = `&#36;${totalPayouts.toLocaleString()}`;
            });
    });
});

// Approve/reject handlers (must be global for inline HTML onclick)
function approveSession(sessionId) {
    firebase.firestore().collection('sessions').doc(sessionId).update({
        status: "approved"
    }).then(() => {
        document.getElementById('adminSessionStatus').textContent = "Session approved!";
    }).catch(err => {
        document.getElementById('adminSessionStatus').textContent = "Error: " + err.message;
    });
}

function rejectSession(sessionId) {
    firebase.firestore().collection('sessions').doc(sessionId).update({
        status: "rejected"
    }).then(() => {
        document.getElementById('adminSessionStatus').textContent = "Session rejected!";
    }).catch(err => {
        document.getElementById('adminSessionStatus').textContent = "Error: " + err.message;
    });
}