import { useState } from "react";

export default function SimulationPage() {
  const [form, setForm] = useState({
    mentorName: "",
    sessionCount: 1,
    hoursPerSession: 1,
    rate: 1000,
    bonus: 0,
  });
  const [result, setResult] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "mentorName" ? value : parseFloat(value),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const totalHours = form.sessionCount * form.hoursPerSession;
    const baseAmount = totalHours * form.rate;
    const totalPayout = baseAmount + form.bonus;
    setResult({
      mentor: form.mentorName,
      sessions: form.sessionCount,
      hours: totalHours,
      base: baseAmount,
      bonus: form.bonus,
      total: totalPayout,
    });
  }

  function handleClose() {
    setResult(null);
  }

  return (
    <>
      <main>
        <section className="dashboard-section" style={{ background: "var(--background-light)" }}>
          <div className="container">
            <div
              className="dashboard-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 38,
              }}
            >
              <div>
                <h1 style={{ marginBottom: "0.2em" }}>Payment Simulation</h1>
                <p style={{ color: "var(--text-color-light)" }}>
                  Estimate session payouts and simulate mentor earnings before processing real transactions.
                </p>
              </div>
              <div className="user-dropdown" style={{ position: "relative" }}>
                <button className="btn btn-outline" id="adminDropdownBtn">
                  <i className="fas fa-user-shield"></i> Admin <i className="fas fa-caret-down"></i>
                </button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              <div style={{ flex: 2, minWidth: 300 }}>
                <div
                  style={{
                    background: "var(--light-color)",
                    padding: "32px 28px 28px 28px",
                    borderRadius: "var(--border-radius)",
                    boxShadow: "var(--box-shadow)",
                  }}
                >
                  <h3 style={{ marginBottom: 18 }}>Simulate a Payment</h3>
                  <form id="simulationForm" style={{ marginBottom: 18 }} onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="mentorName">
                        <i className="fas fa-user"></i> Mentor Name
                      </label>
                      <input
                        type="text"
                        id="mentorName"
                        name="mentorName"
                        placeholder="e.g. Jane Doe"
                        value={form.mentorName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sessionCount">
                        <i className="fas fa-layer-group"></i> Number of Sessions
                      </label>
                      <input
                        type="number"
                        id="sessionCount"
                        name="sessionCount"
                        value={form.sessionCount}
                        min={1}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="hoursPerSession">
                        <i className="fas fa-clock"></i> Hours per Session
                      </label>
                      <input
                        type="number"
                        id="hoursPerSession"
                        name="hoursPerSession"
                        value={form.hoursPerSession}
                        min={0.5}
                        step={0.5}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="rate">
                        <i className="fas fa-rupee-sign"></i> Rate per Hour (₹)
                      </label>
                      <input
                        type="number"
                        id="rate"
                        name="rate"
                        value={form.rate}
                        min={100}
                        step={50}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bonus">
                        <i className="fas fa-gift"></i> Bonus/Adjustment (₹)
                      </label>
                      <input
                        type="number"
                        id="bonus"
                        name="bonus"
                        value={form.bonus}
                        step={50}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-large">
                      Simulate
                    </button>
                  </form>
                  {result && (
                    <div
                      id="simulationResult"
                      style={{
                        background: "var(--background-darker)",
                        padding: "22px 18px",
                        marginTop: 14,
                        borderRadius: "var(--border-radius)",
                      }}
                    >
                      <h4 style={{ marginBottom: 10 }}>Simulation Result</h4>
                      <p>
                        <strong>Mentor:</strong> <span>{result.mentor}</span>
                      </p>
                      <p>
                        <strong>Total Sessions:</strong> <span>{result.sessions}</span>
                      </p>
                      <p>
                        <strong>Total Hours:</strong> <span>{result.hours}</span>
                      </p>
                      <p>
                        <strong>Base Amount:</strong> ₹<span>{result.base}</span>
                      </p>
                      <p>
                        <strong>Bonus/Adjustment:</strong> ₹<span>{result.bonus}</span>
                      </p>
                      <p>
                        <strong>
                          <span style={{ color: "var(--primary-color)", fontSize: "1.2em" }}>
                            Total Payout: ₹<span>{result.total}</span>
                          </span>
                        </strong>
                      </p>
                      <button className="btn btn-outline" onClick={handleClose}>
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="dashboard-sidebar" style={{ flex: 1, minWidth: 260 }}>
                <div
                  style={{
                    background: "var(--light-color)",
                    padding: 24,
                    borderRadius: "var(--border-radius)",
                    boxShadow: "var(--box-shadow)",
                    marginBottom: 28,
                  }}
                >
                  <h3 style={{ marginBottom: 14 }}>Simulation Tools</h3>
                  <ul style={{ paddingLeft: 0 }}>
                    <li style={{ marginBottom: 10 }}>
                      <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                        <i className="fas fa-users"></i> Select Mentor
                      </a>
                    </li>
                    <li style={{ marginBottom: 10 }}>
                      <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                        <i className="fas fa-layer-group"></i> Bulk Simulation
                      </a>
                    </li>
                    <li style={{ marginBottom: 10 }}>
                      <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                        <i className="fas fa-history"></i> Simulation History
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  style={{
                    background: "var(--background-light)",
                    padding: 20,
                    borderRadius: "var(--border-radius)",
                    boxShadow: "var(--box-shadow)",
                  }}
                >
                  <h4 style={{ marginBottom: 10 }}>Why Simulate?</h4>
                  <p style={{ fontSize: "0.97rem", marginBottom: 12 }}>
                    Simulate payouts and bonuses before processing to ensure correct calculations and fairness for every
                    mentor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <div className="footer-bottom">
            <p>&copy; 2025 PayOrbit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}