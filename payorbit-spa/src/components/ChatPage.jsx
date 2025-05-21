import { useState, useRef, useEffect } from "react";

const initialMessages = [
  {
    from: "support",
    avatar: "/assets/avatar-support.png",
    text: "Hello! How can I help you today?",
  },
  {
    from: "user",
    avatar: "/assets/avatar-mentor.jpg",
    text: "Hi, I have a question about my recent payout.",
  },
  {
    from: "support",
    avatar: "/assets/avatar-support.png",
    text: "Sure! Please provide your session ID or details.",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(e) {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages([
      ...messages,
      {
        from: "user",
        avatar: "/assets/avatar-mentor.jpg",
        text: input,
      },
    ]);
    setInput("");
  }

  return (
    <section className="dashboard-section" style={{ background: "var(--background-light)" }}>
      <div className="container">
        <div
          className="dashboard-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 38,
          }}
        >
          <div>
            <h1 style={{ marginBottom: "0.2em" }}>Chat with Support</h1>
            <p style={{ color: "var(--text-color-light)" }}>
              Get real-time help from the PayOrbit team or your admin.
            </p>
          </div>
          <div className="user-dropdown" style={{ position: "relative" }}>
            <button className="btn btn-outline" id="mentorDropdownBtn">
              <i className="fas fa-user"></i> Mentor <i className="fas fa-caret-down"></i>
            </button>
          </div>
        </div>
        <div className="dashboard-flex" style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
          {/* Main Chat Content */}
          <div className="main-content" style={{ flex: 2, minWidth: 300 }}>
            <div
              style={{
                background: "var(--light-color)",
                padding: 24,
                borderRadius: "var(--border-radius)",
                boxShadow: "var(--box-shadow)",
                marginBottom: 28,
              }}
            >
              <h3 style={{ marginBottom: 14 }}>Support Chat</h3>
              <div className="chat-area" id="chatArea" style={{ marginBottom: 18 }}>
                {messages.map((msg, idx) => (
                  <div
                    className={`chat-message${msg.from === "user" ? " sent" : ""}`}
                    key={idx}
                  >
                    <img className="avatar" src={msg.avatar} alt={msg.from === "user" ? "You" : "Support"} />
                    <div className="chat-bubble">{msg.text}</div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <form
                className="chat-input-area"
                id="chatInputForm"
                autoComplete="off"
                onSubmit={handleSend}
              >
                <input
                  type="text"
                  id="chatInput"
                  placeholder="Type your message..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-paper-plane"></i> Send
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  title="Attach file"
                  tabIndex={-1}
                  disabled
                  style={{ opacity: 0.7, cursor: "not-allowed" }}
                >
                  <i className="fas fa-paperclip"></i>
                </button>
              </form>
            </div>
          </div>
          {/* Sidebar */}
          <div className="dashboard-sidebar" style={{ flex: 1, minWidth: 260 }}>
            <div
              style={{
                background: "var(--light-color)",
                padding: 24,
                borderRadius: "var(--border-radius)",
                boxShadow: "var(--box-shadow)",
                marginBottom: 28,
              }}
            >
              <h3 style={{ marginBottom: 14 }}>Contacts</h3>
              <ul style={{ paddingLeft: 0 }}>
                <li style={{ marginBottom: 10 }}>
                  <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                    <i className="fas fa-user-shield"></i> Support Team
                  </a>
                </li>
                <li style={{ marginBottom: 10 }}>
                  <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                    <i className="fas fa-user-cog"></i> Admin
                  </a>
                </li>
                <li style={{ marginBottom: 10 }}>
                  <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                    <i className="fas fa-user"></i> Jane (Mentor)
                  </a>
                </li>
                <li style={{ marginBottom: 10 }}>
                  <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                    <i className="fas fa-plus"></i> New Chat
                  </a>
                </li>
              </ul>
            </div>
            <div
              style={{
                background: "var(--background-light)",
                padding: 20,
                borderRadius: "var(--border-radius)",
                boxShadow: "var(--box-shadow)",
              }}
            >
              <h4 style={{ marginBottom: 10 }}>Recent</h4>
              <p style={{ fontSize: "0.97rem", marginBottom: 12 }}>
                Support: Hello! How can I help you today?
              </p>
              <p style={{ fontSize: "0.97rem", marginBottom: 12 }}>
                You: I have a question about my recent payout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}