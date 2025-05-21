import { useState } from "react";

export default function ProfilePage() {
  // Example initial profile data; in a real app, fetch from API or context
  const [profile, setProfile] = useState({
    mentorName: "Alex Mentor",
    mentorEmail: "alex.mentor@email.com",
    mentorBio: "Passionate about mentoring and helping others grow in their careers.",
    mentorExpertise: "Data Science, Python, Career Guidance",
  });

  // Example of save handler, replace with real logic as needed
  function handleChange(e) {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Replace with API save logic
    alert("Profile saved! (Demo)");
  }

  return (
    <>
      <main>
        <section className="dashboard-section">
          <div className="container">
            <h1>My Profile</h1>
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="mentorName">Name</label>
                <input
                  type="text"
                  id="mentorName"
                  name="mentorName"
                  value={profile.mentorName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mentorEmail">Email</label>
                <input
                  type="email"
                  id="mentorEmail"
                  name="mentorEmail"
                  value={profile.mentorEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mentorBio">Bio</label>
                <textarea
                  id="mentorBio"
                  name="mentorBio"
                  rows={4}
                  value={profile.mentorBio}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mentorExpertise">Expertise</label>
                <input
                  type="text"
                  id="mentorExpertise"
                  name="mentorExpertise"
                  value={profile.mentorExpertise}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
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