// Modal accessibility and receipt details for Receipts page
let lastFocusedElement = null;

function showReceiptDetails(receiptId) {
    // For demo, just show static info; in real app, populate modal with receipt data
    document.getElementById('modalReceiptId').textContent = receiptId;
    if (receiptId === "ABC123") {
        document.getElementById('modalReceiptDate').textContent = "05/10/2025";
        document.getElementById('modalSessionIds').textContent = "SESS-0001, SESS-0002";
        document.getElementById('modalReceiptHours').textContent = "4";
        document.getElementById('modalReceiptRate').textContent = "$100/hr";
        document.getElementById('modalReceiptTotal').textContent = "$400";
    } else if (receiptId === "DEF456") {
        document.getElementById('modalReceiptDate').textContent = "05/15/2025";
        document.getElementById('modalSessionIds').textContent = "SESS-0003";
        document.getElementById('modalReceiptHours').textContent = "2";
        document.getElementById('modalReceiptRate').textContent = "$100/hr";
        document.getElementById('modalReceiptTotal').textContent = "$200";
    }
    const modal = document.getElementById('receiptModal');
    modal.style.display = "flex";
    lastFocusedElement = document.activeElement;
    // Focus first button in modal
    setTimeout(() => {
        const firstBtn = modal.querySelector('button, [tabindex="0"]');
        if (firstBtn) firstBtn.focus();
    }, 10);
    // Trap focus inside modal
    document.addEventListener('keydown', trapFocus);
}

function closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    modal.style.display = "none";
    document.removeEventListener('keydown', trapFocus);
    if (lastFocusedElement) lastFocusedElement.focus();
}

// Trap focus inside modal
function trapFocus(e) {
    const modal = document.getElementById('receiptModal');
    if (modal.style.display !== "flex") return;
    const focusableEls = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            }
        } else {
            if (document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        }
    } else if (e.key === 'Escape') {
        closeReceiptModal();
    }
}

// Close modal on outside click
window.addEventListener('click', function(e){
    const modal = document.getElementById('receiptModal');
    if (modal && e.target === modal) {
        closeReceiptModal();
    }
});