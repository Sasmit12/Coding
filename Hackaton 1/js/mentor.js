// js/mentor.js

document.addEventListener('DOMContentLoaded', function () {
    // Export Sessions Table as CSV
    const exportBtn = Array.from(document.querySelectorAll('.btn.btn-outline')).find(btn => btn.textContent.includes('Export CSV'));
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
                    let text = cell.innerText.replace(/,/g, '');
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

    // (Optional) Add Session button (demo)
    const addBtn = Array.from(document.querySelectorAll('.btn.btn-outline')).find(btn => btn.textContent.includes('Add Session'));
    if (addBtn) {
        addBtn.addEventListener('click', function () {
            alert('Add Session functionality not implemented in this demo.');
        });
    }
});