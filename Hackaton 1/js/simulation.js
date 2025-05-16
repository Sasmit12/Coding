// Payment Simulation logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simulationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Get values
            const mentor = document.getElementById('mentorName').value.trim();
            const sessions = parseInt(document.getElementById('sessionCount').value) || 1;
            const hours = parseFloat(document.getElementById('hoursPerSession').value) || 0;
            const rate = parseFloat(document.getElementById('rate').value) || 0;
            const bonus = parseFloat(document.getElementById('bonus').value) || 0;

            // Calculate totals
            const totalHours = sessions * hours;
            const baseAmount = Math.round(totalHours * rate);
            const totalPayout = baseAmount + bonus;

            // Display results
            document.getElementById('resultMentor').textContent = mentor;
            document.getElementById('resultSessions').textContent = sessions;
            document.getElementById('resultHours').textContent = totalHours;
            document.getElementById('resultBase').textContent = baseAmount;
            document.getElementById('resultBonus').textContent = bonus;
            document.getElementById('resultTotal').textContent = totalPayout;
            document.getElementById('simulationResult').style.display = 'block';
        });
    }
});