// Receipt details functionality for SPA
// Contains business logic without direct DOM manipulation

// Sample receipt data - in a real app, this might come from an API
const receiptData = {
  "ABC123": {
    id: "ABC123",
    date: "05/10/2025",
    sessionIds: ["SESS-0001", "SESS-0002"],
    hours: 4,
    rate: "$100/hr",
    total: "$400"
  },
  "DEF456": {
    id: "DEF456",
    date: "05/15/2025",
    sessionIds: ["SESS-0003"],
    hours: 2,
    rate: "$100/hr",
    total: "$200"
  }
};

/**
 * Get receipt details by ID
 * @param {string} receiptId - The ID of the receipt to retrieve
 * @returns {Object|null} Receipt data object or null if not found
 */
function getReceiptDetails(receiptId) {
  return receiptData[receiptId] || null;
}

/**
 * Get all receipts
 * @returns {Object} All receipt data
 */
function getAllReceipts() {
  return receiptData;
}

export {
  getReceiptDetails,
  getAllReceipts
};