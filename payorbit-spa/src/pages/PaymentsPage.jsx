import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Payments() {
  const [payments] = useState([
    {
      date: "2025-05-15",
      session: "Jane Doe",
      amount: "$100",
      status: "Paid",
      receipt: true,
    },
    {
      date: "2025-05-10",
      session: "John Smith",
      amount: "$80",
      status: "Pending",
      receipt: false,
    },
    {
      date: "2025-05-01",
      session: "Alice Lee",
      amount: "$120",
      status: "Paid",
      receipt: true,
    },
  ]);

  return (
    <>
      <main>
        <section className="dashboard-section">
          <div className="container">
            <h1>My Payments</h1>
            <p>Track your payment history and request payouts.</p>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Session</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, idx) => (
                    <tr key={idx}>
                      <td>{payment.date}</td>
                      <td>{payment.session}</td>
                      <td>{payment.amount}</td>
                      <td>
                        <span className={`badge badge-${payment.status.toLowerCase()}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td>
                        {payment.receipt ? (
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button className="btn btn-primary mt-4">Request Payout</Button>
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