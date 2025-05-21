// Payment Simulation logic for SPA
// Contains business logic without direct DOM manipulation

/**
 * Calculate payment simulation based on input parameters
 * @param {Object} params - Simulation parameters
 * @param {string} params.mentor - Mentor name
 * @param {number} params.sessions - Number of sessions
 * @param {number} params.hours - Hours per session
 * @param {number} params.rate - Hourly rate
 * @param {number} params.bonus - Bonus amount
 * @returns {Object} Simulation results
 */
function calculatePaymentSimulation({ mentor, sessions, hours, rate, bonus }) {
  // Ensure inputs are properly formatted
  const mentorName = mentor?.trim() || 'Unnamed Mentor';
  const sessionCount = parseInt(sessions) || 1;
  const hoursPerSession = parseFloat(hours) || 0;
  const hourlyRate = parseFloat(rate) || 0;
  const bonusAmount = parseFloat(bonus) || 0;

  // Calculate totals
  const totalHours = sessionCount * hoursPerSession;
  const baseAmount = Math.round(totalHours * hourlyRate);
  const totalPayout = baseAmount + bonusAmount;

  // Return calculated results as an object
  return {
    mentor: mentorName,
    sessions: sessionCount,
    totalHours,
    baseAmount,
    bonus: bonusAmount,
    totalPayout
  };
}

/**
 * Format currency value
 * @param {number} value - Value to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(value) {
  return value.toLocaleString();
}

export {
  calculatePaymentSimulation,
  formatCurrency
};