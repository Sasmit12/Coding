// js/mentor.js

document.addEventListener('DOMContentLoaded', function () {
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            firebase.auth().signOut().then(() => window.location.href = 'login.html');
        });
    }

    // Auth check and mentor session logic
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = "login.html";
            return;
        }

        // Get mentor's name for session logging
        firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
            if (!doc.exists) {
                alert('User profile not found!');
                return;
            }
            const mentorName = doc.data().name;

            // Log Session Form
            const sessionForm = document.getElementById('sessionForm');
            const sessionStatus = document.getElementById('sessionStatus');
            if (sessionForm) {
                sessionForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const date = document.getElementById('session-date').value;
                    const topic = document.getElementById('session-topic').value.trim();
                    const duration = Number(document.getElementById('session-duration').value);

                    if (!date || !topic || !duration || duration <= 0) {
                        sessionStatus.textContent = "Please fill in all fields with valid data.";
                        return;
                    }

                    firebase.firestore().collection('sessions').add({
                        mentorId: user.uid,
                        mentorName: mentorName,
                        date: date,
                        duration: duration,
                        topic: topic,
                        status: "pending",
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        sessionStatus.textContent = "Session logged for review!";
                        sessionForm.reset();
                    }).catch(err => {
                        sessionStatus.textContent = "Error logging session: " + err.message;
                    });
                });
            }

            // Load mentor's sessions and fill table + metrics
            const sessionsTable = document.getElementById('sessionsTable');
            const totalSessions = document.getElementById('totalSessions');
            const pendingSessions = document.getElementById('pendingSessions');
            const approvedSessions = document.getElementById('approvedSessions');
            const totalEarnings = document.getElementById('totalEarnings');
            // Set your earning rate per session or per minute
            const earningPerMinute = 10; // EXAMPLE: $10 per minute

            firebase.firestore().collection('sessions')
                .where('mentorId', '==', user.uid)
                .orderBy('createdAt', 'desc')
                .onSnapshot(snapshot => {
                    let html = '';
                    let total = 0, pending = 0, approved = 0, earnings = 0;
                    snapshot.forEach(doc => {
                        const s = doc.data();
                        total++;
                        if (s.status === "pending") pending++;
                        if (s.status === "approved") {
                            approved++;
                            earnings += (s.duration || 0) * earningPerMinute;
                        }
                        html += `<tr>
                            <td>${doc.id}</td>
                            <td>${s.date}</td>
                            <td>${s.topic}</td>
                            <td>${s.duration} min</td>
                            <td><span class="status-badge ${s.status}">${s.status.charAt(0).toUpperCase() + s.status.slice(1)}</span></td>
                        </tr>`;
                    });
                    sessionsTable.innerHTML = html || `<tr><td colspan="5">No sessions logged yet.</td></tr>`;
                    if (totalSessions) totalSessions.textContent = total;
                    if (pendingSessions) pendingSessions.textContent = pending;
                    if (approvedSessions) approvedSessions.textContent = approved;
                    if (totalEarnings) totalEarnings.innerHTML = `&#36;${earnings.toLocaleString()}`;
                });
        });
    });

    // Export Sessions Table as CSV
    const exportBtn = document.getElementById('exportSessionsBtn');
    const table = document.querySelector('.table-responsive table');
    if (exportBtn && table) {
        exportBtn.addEventListener('click', function () {
            let csv = [];
            // Headers
            const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.innerText.trim());
            csv.push(headers.join(','));
            // Rows
            table.querySelectorAll('tbody tr').forEach(row => {
                let rowData = [];
                row.querySelectorAll('td').forEach(cell => {
                    let text = cell.innerText.replace(/,/g, ''); // Remove commas in data
                    rowData.push(text);
                });
                csv.push(rowData.join(','));
            });
            // Download
            let csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csv.join('\n'));
            let link = document.createElement('a');
            link.href = csvContent;
            link.download = 'my-sessions.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Upload Session CSV (demo)
    const uploadForm = document.getElementById('uploadSessionForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const fileInput = document.getElementById('newSessionFile');
            if (!fileInput.files.length) {
                alert('Please select a CSV file.');
                return;
            }
            alert('Session file uploaded! (Demo - Implement real upload)');
            fileInput.value = '';
        });
    }
});