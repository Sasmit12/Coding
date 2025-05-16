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
});

// Accessible admin dropdown menu
document.addEventListener('DOMContentLoaded', function() {
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
});