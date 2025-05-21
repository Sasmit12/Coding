import { useState } from "react";

export default function SettingsPage() {
  // Example initial settings; in a real app, fetch from API or context
  const [settings, setSettings] = useState({
    platformName: "PayOrbit",
    notificationEmail: "admin@payorbit.com",
    timezone: "UTC",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Replace with save logic (e.g., API call)
    alert("Settings saved! (Demo)");
  }

  return (
    <>
      <main>
        <section className="dashboard-section">
          <div className="container">
            <h1>Settings</h1>
            <form className="settings-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="platformName">Platform Name</label>
                <input
                  type="text"
                  id="platformName"
                  name="platformName"
                  value={settings.platformName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="notificationEmail">Notification Email</label>
                <input
                  type="email"
                  id="notificationEmail"
                  name="notificationEmail"
                  value={settings.notificationEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="timezone">Timezone</label>
                <select
                  id="timezone"
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleChange}
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Save Settings
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