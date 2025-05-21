export default function PayoutsPage() {
  // Example payouts data; replace with dynamic data as needed
  const payouts = [
    {
      date: "2025-05-16",
      mentor: "Jane Mentor",
      amount: "$100",
      status: "Paid",
      hasReceipt: true,
    },
    {
      date: "2025-05-10",
      mentor: "John Mentor",
      amount: "$80",
      status: "Pending",
      hasReceipt: false,
    },
    // Add more rows as needed
  ];

  return (
    <>
      <main>
        <section className="dashboard-section">
          <div className="container">
            <h1>Payouts</h1>
            <p>Manage and track payout requests to mentors.</p>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Mentor</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((payout, idx) => (
                    <tr key={idx}>
                      <td>{payout.date}</td>
                      <td>{payout.mentor}</td>
                      <td>{payout.amount}</td>
                      <td>
                        <span className={`badge badge-${payout.status.toLowerCase()}`}>
                          {payout.status}
                        </span>
                      </td>
                      <td>
                        {payout.hasReceipt ? (
                          <button className="btn btn-outline btn-small">
                            Receipt
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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