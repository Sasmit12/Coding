export default function UserBenefitsSection() {
  return (
    <section className="user-benefits">
      <div className="container">
        <div className="benefits-grid">
          <div className="benefit-col admin-benefits">
            <div className="section-header">
              <h2>For Administrators</h2>
              <p>Take control of your payment operations</p>
            </div>
            <ul className="benefits-list">
              <li>
                <i className="fas fa-check-circle"></i> Reduce administrative overhead
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Eliminate payment errors
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Gain financial visibility
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Generate accurate reports
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Improve mentor satisfaction
              </li>
            </ul>
            <a href="/signup?role=admin" className="btn btn-primary">
              Admin Sign Up
            </a>
          </div>
          <div className="benefit-col mentor-benefits">
            <div className="section-header">
              <h2>For Mentors</h2>
              <p>Focus on teaching, not payment tracking</p>
            </div>
            <ul className="benefits-list">
              <li>
                <i className="fas fa-check-circle"></i> Track your sessions easily
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Monitor payment status
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Download payment receipts
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Communicate with admin directly
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Access your history anytime
              </li>
            </ul>
            <a href="/signup?role=mentor" className="btn btn-primary">
              Mentor Sign Up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}