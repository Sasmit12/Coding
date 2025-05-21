import { FaUserCheck, FaWallet, FaCalendarAlt, FaComments, FaShieldAlt } from "react-icons/fa";

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="container">
        <div className="section-header">
          <h2>About PayOrbit</h2>
          <p>
            Empowering mentors and administrators to manage payments, sessions, and collaborations with ease.
          </p>
        </div>
        <div className="about-content">
          <p>
            <strong>PayOrbit</strong> is a comprehensive platform designed to simplify and automate the management of mentor-mentee relationships, payment processing, and session tracking. Built with modern technology, PayOrbit ensures secure, seamless, and efficient operations for organizations and individuals alike.
          </p>
          <h3>Our Mission</h3>
          <p>
            To provide a reliable, transparent, and user-friendly solution for managing online mentorship, ensuring both mentors and mentees have the tools they need to succeed.
          </p>
          <h3>Key Features</h3>
          <ul>
            <li>
              <FaUserCheck /> Secure authentication for all users
            </li>
            <li>
              <FaWallet /> Automated payment and payout systems
            </li>
            <li>
              <FaCalendarAlt /> Session scheduling and tracking
            </li>
            <li>
              <FaComments /> Real-time chat and collaboration
            </li>
            <li>
              <FaShieldAlt /> Robust audit and reporting tools
            </li>
          </ul>
          <h3>Meet the Team</h3>
          <div className="about-team">
            <div className="team-member">
              <img src="/assets/team1.png" alt="Team Member 1" />
              <h4>Sasmit Nakhate</h4>
              <p>Lead Developer</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </div>
      </div>
    </section>
  );
}