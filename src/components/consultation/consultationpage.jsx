import { useState } from "react";

export default function ConsultationPage() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
  };

  return (
    <div style={{ padding: "30px" }}>

      <h2 style={{ color: "#6f5cff" }}>
        Doctor Consultation
      </h2>

      <p>
        You can chat with a doctor or request a video consultation.
      </p>

      {/* CHAT BOX */}
      <div style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "10px",
        marginTop: "20px"
      }}>

        <h4>💬 Chat with Doctor</h4>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your symptoms..."
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginTop: "10px"
          }}
        />

        <button
          onClick={handleSend}
          style={{
            marginTop: "10px",
            padding: "10px 15px",
            background: "#6f5cff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Send Message
        </button>

        {sent && (
          <p style={{ color: "green", marginTop: "10px" }}>
            ✔ Your request has been sent. A doctor will respond soon.
          </p>
        )}
      </div>

      {/* VIDEO CONSULTATION */}
      <div style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "10px",
        marginTop: "20px"
      }}>

        <h4>🎥 Video Consultation</h4>

        <p>
          Book a video call with a medical professional for faster diagnosis.
        </p>

        <button style={{
          padding: "10px 15px",
          background: "#ff6b6b",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}>
          Book Video Call
        </button>

      </div>

    </div>
  );
}