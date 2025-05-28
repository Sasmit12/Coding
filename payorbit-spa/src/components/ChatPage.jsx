import { useState, useRef, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { 
  FaUser, FaCaretDown, FaPaperPlane, FaPaperclip, 
  FaUserShield, FaUserCog, FaPlus 
} from "react-icons/fa";

// You can remove initialMessages, since messages will load from Firestore

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);

  // Fetch chat messages in real-time from Firestore
  useEffect(() => {
    const q = query(
      collection(db, "chats"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
      setLoading(false);
    }, err => {
      setError("Failed to load messages: " + (err.message || err));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a message and add it to Firestore
  async function handleSend(e) {
    e.preventDefault();
    if (input.trim() === "") return;
    try {
      await addDoc(collection(db, "chats"), {
        from: "user",
        avatar: "/assets/avatar-mentor.jpg",
        text: input,
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch (err) {
      setError("Failed to send message: " + (err.message || err));
    }
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
              <FaUser /> Mentor <FaCaretDown />
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
                {error && (
                  <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
                )}
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      className={`chat-message${msg.from === "user" ? " sent" : ""}`}
                      key={msg.id || idx}
                    >
                      <img className="avatar" src={msg.avatar} alt={msg.from === "user" ? "You" : "Support"} />
                      <div className="chat-bubble">{msg.text}</div>
                    </div>
                  ))
                )}
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
                  aria-label="Type your message"
                />
                <button type="submit" className="btn btn-primary">
                  <FaPaperPlane /> Send
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  title="Attach file"
                  tabIndex={-1}
                  disabled
                  style={{ opacity: 0.7, cursor: "not-allowed" }}
                  aria-disabled="true"
                >
                  <FaPaperclip />
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
                    <FaUserShield /> Support Team
                  </a>
                </li>
                <li style={{ marginBottom: 10 }}>
                  <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                    <FaUserCog /> Admin
                  </a>
                </li>
                <li style={{ marginBottom: 10 }}>
                  <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                    <FaUser /> Jane (Mentor)
                  </a>
                </li>
                <li style={{ marginBottom: 10 }}>
                  <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "left" }}>
                    <FaPlus /> New Chat
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