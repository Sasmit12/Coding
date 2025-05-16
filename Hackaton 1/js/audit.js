// js/audit.js

// Export Audit table as CSV
document.addEventListener('DOMContentLoaded', function () {
    // Find the Export CSV button
    const exportBtn = Array.from(document.querySelectorAll('.btn.btn-outline'))
        .find(btn => btn.textContent.includes('Export CSV'));
    const table = document.querySelector('.audit-table');

    if (exportBtn && table) {
        exportBtn.addEventListener('click', function () {
            let csv = [];
            // Get table headers
            let headers = Array.from(table.querySelectorAll('thead th')).map(th => th.innerText.trim());
            csv.push(headers.join(','));

            // Get table rows
            table.querySelectorAll('tbody tr').forEach(row => {
                let rowData = [];
                row.querySelectorAll('td').forEach(cell => {
                    // Remove inner HTML tags and commas
                    let text = cell.innerText.replace(/,/g, '');
                    rowData.push(text);
                });
                csv.push(rowData.join(','));
            });

            // Create and trigger download
            let csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csv.join('\n'));
            let link = document.createElement('a');
            link.href = csvContent;
            link.download = 'audit-logs.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // (Optional) Admin dropdown: toggle menu logic (add menu in HTML if needed)
    const adminDropdownBtn = document.getElementById('adminDropdownBtn');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    if (adminDropdownBtn && userDropdownMenu) {
        adminDropdownBtn.addEventListener('click', function () {
            userDropdownMenu.classList.toggle('show');
        });
        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!adminDropdownBtn.contains(e.target) && !userDropdownMenu.contains(e.target)) {
                userDropdownMenu.classList.remove('show');
            }
        });
    }
});