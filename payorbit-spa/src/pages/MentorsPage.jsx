export default function MentorsPage() {
  // Sample mentor data; replace with dynamic data as needed
  const mentors = [
    {
      name: "Jane Mentor",
      email: "jane.mentor@email.com",
      expertise: "UI/UX Design",
      status: "Active",
    },
    {
      name: "John Mentor",
      email: "john.mentor@email.com",
      expertise: "Web Development",
      status: "Inactive",
    },
    // Add more mentors as needed
  ];

  return (
    <>
      <main>
        <section className="dashboard-section">
          <div className="container">
            <h1>Mentors</h1>
            <p>List of all mentors registered on PayOrbit.</p>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Expertise</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mentors.map((mentor, idx) => (
                    <tr key={idx}>
                      <td>{mentor.name}</td>
                      <td>{mentor.email}</td>
                      <td>{mentor.expertise}</td>
                      <td>
                        <span className={`badge badge-${mentor.status.toLowerCase()}`}>
                          {mentor.status}
                        </span>
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