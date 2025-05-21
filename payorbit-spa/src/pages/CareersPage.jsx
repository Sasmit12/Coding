export default function CareersPage() {
  return (
    <main>
      <section className="dashboard-section" style={{ background: "var(--background-light)" }}>
        <div className="container">
          <h1>Careers at PayOrbit</h1>
          <p style={{ maxWidth: 700, margin: "18px 0" }}>
            Want to work with a passionate team building the future of EdTech payments? We're always looking for talented engineers, designers, educators, and problem-solvers.
          </p>
          <h3>Open Positions</h3>
          <ul>
            <li>Frontend Developer (React)</li>
            <li>Backend Developer (Node.js, Firebase)</li>
            <li>Customer Success Specialist</li>
            <li>Content Writer (EdTech focus)</li>
          </ul>
          <p>
            Interested? Email us at <a href="mailto:careers@payorbit.com">careers@payorbit.com</a> with your CV and tell us how you can contribute to PayOrbit!
          </p>
        </div>
      </section>
    </main>
  );
}