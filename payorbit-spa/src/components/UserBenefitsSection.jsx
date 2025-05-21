import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

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
                <FaCheckCircle /> Reduce administrative overhead
              </li>
              <li>
                <FaCheckCircle /> Eliminate payment errors
              </li>
              <li>
                <FaCheckCircle /> Gain financial visibility
              </li>
              <li>
                <FaCheckCircle /> Generate accurate reports
              </li>
              <li>
                <FaCheckCircle /> Improve mentor satisfaction
              </li>
            </ul>
            <Link to="/signup?role=admin" className="btn btn-primary">
              Admin Sign Up
            </Link>
          </div>
          <div className="benefit-col mentor-benefits">
            <div className="section-header">
              <h2>For Mentors</h2>
              <p>Focus on teaching, not payment tracking</p>
            </div>
            <ul className="benefits-list">
              <li>
                <FaCheckCircle /> Track your sessions easily
              </li>
              <li>
                <FaCheckCircle /> Monitor payment status
              </li>
              <li>
                <FaCheckCircle /> Download payment receipts
              </li>
              <li>
                <FaCheckCircle /> Communicate with admin directly
              </li>
              <li>
                <FaCheckCircle /> Access your history anytime
              </li>
            </ul>
            <Link to="/signup?role=mentor" className="btn btn-primary">
              Mentor Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}