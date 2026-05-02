"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.message) newErrors.message = "Message is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <>
      <style>{`

        .contact-section {
          background: #0a0a0f;
          padding: 100px 20px;
          display: flex;
          justify-content: center;
          font-family: Inter, sans-serif;
        }

        .contact-container {
          width: 100%;
          max-width: 720px;
        }

        .contact-title {
          font-size: 42px;
          font-weight: 600;
          color: #f8fafc;
          margin-bottom: 10px;
        }

        .contact-sub {
          color: rgba(248,250,252,0.6);
          margin-bottom: 40px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          color: rgba(248,250,252,0.7);
        }

        .input,
        .textarea {
          width: 100%;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          background: #111118;
          color: #fff;
          font-size: 15px;
          transition: border 0.2s, box-shadow 0.2s;
        }

        .input:focus,
        .textarea:focus {
          outline: none;
          border-color: #7c3aed;
          box-shadow: 0 0 0 2px rgba(124,58,237,0.2);
        }

        .textarea {
          min-height: 140px;
          resize: vertical;
        }

        .error {
          color: #f87171;
          font-size: 13px;
          margin-top: 6px;
        }

        .submit-btn {
          margin-top: 20px;
          padding: 14px 28px;
          border-radius: 10px;
          border: none;
          background: #7c3aed;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .submit-btn:hover {
          background: #a855f7;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success {
          text-align: center;
          padding: 60px 20px;
        }

        .success h2 {
          color: #22c55e;
          font-size: 32px;
          margin-bottom: 10px;
        }

        .success p {
          color: rgba(248,250,252,0.6);
        }

      `}</style>

      <section className="contact-section" id="contact">
        <div className="contact-container">

          {sent ? (
            <div className="success">
              <h2>Message Sent Successfully</h2>
              <p>Thank you for reaching out. I will get back to you soon.</p>
            </div>
          ) : (
            <>
              <h2 className="contact-title">
                Start a Conversation
              </h2>

              <p className="contact-sub">
                Have a project, internship opportunity, or question?
                Feel free to send a message.
              </p>

              <div className="form-group">
                <label className="label">Full Name</label>
                <input
                  className="input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
                {errors.name && (
                  <div className="error">{errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label className="label">Email Address</label>
                <input
                  className="input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <div className="error">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label className="label">Subject</label>
                <input
                  className="input"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                />
              </div>

              <div className="form-group">
                <label className="label">Message</label>
                <textarea
                  className="textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                />
                {errors.message && (
                  <div className="error">{errors.message}</div>
                )}
              </div>

              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </>
          )}

        </div>
      </section>
    </>
  );
}