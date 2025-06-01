import {
  FaUserShield,
  FaWallet,
  FaCalendarAlt,
  FaComments,
  FaChartLine,
  FaShieldAlt,
  FaCogs,
  FaCloudUploadAlt,
} from "react-icons/fa";

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header">
          <h2>PayOrbit Features</h2>
          <p>
            Discover the robust capabilities that make PayOrbit a seamless, secure, and efficient platform for mentors and administrators.
          </p>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaUserShield />
            </div>
            <h3>Secure Authentication</h3>
            <p>
              Multi-method login and signup options with secure password handling, Google/Facebook social sign-in, and role-based access for administrators and mentors.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaWallet />
            </div>
            <h3>Automated Payments</h3>
            <p>
              Streamlined payment management with automated payout scheduling, payment history tracking, and transparent audit trails.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaCalendarAlt />
            </div>
            <h3>Session Scheduling</h3>
            <p>
              Easy calendar integration and scheduling tools for managing mentorship sessions, reminders, and attendance logs.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaComments />
            </div>
            <h3>Real-Time Communication</h3>
            <p>
              Built-in chat system for instant, secure messaging between mentors and mentees, supporting file sharing and resource links.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaChartLine />
            </div>
            <h3>Analytics & Reports</h3>
            <p>
              Comprehensive dashboards and downloadable reports for monitoring payouts, session activity, and overall platform usage.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3>Audit & Compliance</h3>
            <p>
              Detailed action logs and compliance tools to ensure transparency and accountability for every platform interaction.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaCogs />
            </div>
            <h3>Customizable Settings</h3>
            <p>
              Flexible user and organization settings for notifications, payout preferences, session durations, and more.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaCloudUploadAlt />
            </div>
            <h3>Cloud-Based & Responsive</h3>
            <p>
              Access PayOrbit anytime, anywhere, on any device, with fast, cloud-hosted infrastructure and a responsive user interface.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}