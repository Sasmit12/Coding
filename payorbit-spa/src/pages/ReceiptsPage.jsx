import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Receipts() {
  // Demo receipt data
  const receipts = [
    {
      id: "ABC123",
      date: "05/10/2025",
      sessions: "SESS-0001, SESS-0002",
      amount: "$400",
      status: "Paid",
      modal: {
        mentor: "John Doe",
        hours: 4,
        rate: "$100/hr",
        total: "$400",
      },
    },
    {
      id: "DEF456",
      date: "05/15/2025",
      sessions: "SESS-0003",
      amount: "$200",
      status: "Pending",
      modal: {
        mentor: "John Doe",
        hours: 2,
        rate: "$100/hr",
        total: "$200",
      },
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalReceipt, setModalReceipt] = useState(receipts[0]);

  function showReceiptDetails(receiptId) {
    const receipt = receipts.find((r) => r.id === receiptId);
    setModalReceipt(receipt);
    setModalOpen(true);
  }
  function closeReceiptModal() {
    setModalOpen(false);
  }

  return (
    <>
      <main>
        <section className="dashboard-section" style={{ background: "var(--background-light)" }}>
          <div className="container">
            <div className="dashboard-header" style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 38,
            }}>
              <div>
                <h1 style={{ marginBottom: "0.2em" }}>My Receipts</h1>
                <p style={{ color: "var(--text-color-light)" }}>
                  View and download your payment receipts for completed sessions and payouts.
                </p>
              </div>
              <div className="user-dropdown" style={{ position: "relative" }}>
                <button className="btn btn-outline" id="mentorDropdownBtn">
                  <i className="fas fa-user"></i> Mentor <i className="fas fa-caret-down"></i>
                </button>
              </div>
            </div>
            <div className="dashboard-flex" style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              <div className="main-content" style={{ flex: 2, minWidth: 300 }}>
                <div style={{
                  background: "var(--light-color)",
                  padding: "24px 24px 12px 24px",
                  borderRadius: "var(--border-radius)",
                  boxShadow: "var(--box-shadow)",
                  marginBottom: 28
                }}>
                  <h3 style={{ marginBottom: 14 }}>Receipts List</h3>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "var(--background-darker)" }}>
                          <th style={{ padding: "10px 6px", textAlign: "left", fontWeight: 600 }}>Receipt #</th>
                          <th style={{ padding: "10px 6px", textAlign: "left", fontWeight: 600 }}>Date</th>
                          <th style={{ padding: "10px 6px", textAlign: "left", fontWeight: 600 }}>Session(s)</th>
                          <th style={{ padding: "10px 6px", textAlign: "left", fontWeight: 600 }}>Amount</th>
                          <th style={{ padding: "10px 6px", textAlign: "left", fontWeight: 600 }}>Status</th>
                          <th style={{ padding: "10px 6px", textAlign: "left", fontWeight: 600 }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {receipts.map((r) => (
                          <tr key={r.id}>
                            <td style={{ padding: "8px 6px" }}>{r.id}</td>
                            <td style={{ padding: "8px 6px" }}>{r.date}</td>
                            <td style={{ padding: "8px 6px" }}>{r.sessions}</td>
                            <td style={{ padding: "8px 6px" }}>{r.amount}</td>
                            <td style={{ padding: "8px 6px" }}>
                              <span className={`status-badge ${r.status.toLowerCase()}`}>{r.status}</span>
                            </td>
                            <td style={{ padding: "8px 6px" }}>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => showReceiptDetails(r.id)}
                                data-receipt={r.id}
                              >
                                <i className="fas fa-eye"></i> View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={r.status !== "Paid"}
                                title={r.status !== "Paid" ? "Available after payment" : undefined}
                                style={{ marginLeft: 8 }}
                              >
                                <i className="fas fa-download"></i> PDF
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ marginTop: 18 }}>
                    <Button variant="outline">
                      <i className="fas fa-file-csv"></i> Export CSV
                    </Button>
                  </div>
                </div>
                {/* Receipt Details Modal */}
                {modalOpen && (
                  <div
                    id="receiptModal"
                    className="modal"
                    aria-modal="true"
                    role="dialog"
                    aria-labelledby="modalReceiptId"
                    style={{
                      display: "block",
                      position: "fixed",
                      zIndex: 1000,
                      left: 0,
                      top: 0,
                      width: "100vw",
                      height: "100vh",
                      background: "rgba(0,0,0,0.2)"
                    }}
                  >
                    <div className="modal-content" tabIndex={-1} style={{
                      background: "#fff",
                      margin: "5vh auto",
                      padding: "2rem",
                      borderRadius: "var(--border-radius)",
                      maxWidth: 420,
                      boxShadow: "var(--box-shadow)",
                      position: "relative"
                    }}>
                      <button
                        onClick={closeReceiptModal}
                        className="modal-close"
                        aria-label="Close modal"
                        style={{ position: "absolute", top: 18, right: 18 }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                      <h3>
                        Receipt #<span id="modalReceiptId">{modalReceipt.id}</span>
                      </h3>
                      <p>
                        <strong>Date:</strong>{" "}
                        <span id="modalReceiptDate">{modalReceipt.date}</span>
                      </p>
                      <p>
                        <strong>Mentor:</strong> {modalReceipt.modal.mentor}
                      </p>
                      <p>
                        <strong>Session(s):</strong>{" "}
                        <span id="modalSessionIds">{modalReceipt.sessions}</span>
                      </p>
                      <p>
                        <strong>Hours:</strong>{" "}
                        <span id="modalReceiptHours">{modalReceipt.modal.hours}</span>
                      </p>
                      <p>
                        <strong>Rate:</strong>{" "}
                        <span id="modalReceiptRate">{modalReceipt.modal.rate}</span>
                      </p>
                      <p>
                        <strong>Total:</strong>{" "}
                        <span id="modalReceiptTotal">{modalReceipt.modal.total}</span>
                      </p>
                      <div style={{ marginTop: 18 }}>
                        <Button variant="primary" size="sm">
                          <i className="fas fa-download"></i> Download PDF
                        </Button>
                        <Button variant="outline" size="sm" style={{ marginLeft: 8 }}>
                          <i className="fas fa-envelope"></i> Email
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Sidebar */}
              <div className="dashboard-sidebar" style={{ flex: 1, minWidth: 260 }}>
                <div style={{
                  background: "var(--light-color)",
                  padding: 24,
                  borderRadius: "var(--border-radius)",
                  boxShadow: "var(--box-shadow)",
                  marginBottom: 28
                }}>
                  <h3 style={{ marginBottom: 14 }}>Quick Links</h3>
                  <ul style={{ paddingLeft: 0 }}>
                    <li style={{ marginBottom: 10 }}>
                      <a href="mentor-dashboard.html" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                      </a>
                    </li>
                    <li style={{ marginBottom: 10 }}>
                      <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                        <i className="fas fa-calendar-check"></i> Sessions
                      </a>
                    </li>
                    <li style={{ marginBottom: 10 }}>
                      <a href="receipt.html" className="btn btn-outline active" aria-current="page" style={{ width: "100%", textAlign: "left" }}>
                        <i className="fas fa-file-invoice-dollar"></i> Receipts
                      </a>
                    </li>
                    <li style={{ marginBottom: 10 }}>
                      <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                        <i className="fas fa-user"></i> Profile
                      </a>
                    </li>
                    <li style={{ marginBottom: 10 }}>
                      <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                        <i className="fas fa-comments"></i> Support
                      </a>
                    </li>
                    <li style={{ marginBottom: 10 }}>
                      <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                        <i className="fas fa-headset"></i> Chat with Admin
                      </a>
                    </li>
                  </ul>
                </div>
                <div style={{
                  background: "var(--background-light)",
                  padding: 20,
                  borderRadius: "var(--border-radius)",
                  boxShadow: "var(--box-shadow)"
                }}>
                  <h4 style={{ marginBottom: 10 }}>Need Help?</h4>
                  <p style={{ fontSize: "0.97rem", marginBottom: 12 }}>
                    Contact support or chat with the admin for assistance anytime.
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