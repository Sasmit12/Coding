// Upload New Session CSV (demo only)
document.addEventListener('DOMContentLoaded', function() {
    const uploadSessionForm = document.getElementById('uploadSessionForm');
    if (uploadSessionForm) {
        uploadSessionForm.addEventListener('submit', function(e) {
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