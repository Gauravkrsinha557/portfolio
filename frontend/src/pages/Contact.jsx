import { useState } from 'react';
import api from '../api';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await api.post('/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-sub">Have a project in mind? Let's talk.</p>
        </div>

        <div className="contact-layout">
          <div className="contact-info">
            <div className="info-item">
              <span className="info-icon">✉</span>
              <div>
                <h3>Email</h3>
                <p>gauravsinha9182@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💼</span>
              <div>
                <h3>GitHub</h3>
                <p>github.com/Gauravkrsinha557
</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🔗</span>
              <div>
                <h3>LinkedIn</h3>
                <p>linkedin.com/in/www.linkedin.com/in/gaurav-kumar-50aa58321</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text" name="name" value={form.name}
                onChange={handleChange} placeholder="Your name" required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="your@email.com" required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message" value={form.message}
                onChange={handleChange} placeholder="Tell me about your project…"
                rows={6} required
              />
            </div>

            {status === 'success' && (
              <div className="alert alert-success">Message sent! I'll get back to you soon.</div>
            )}
            {status === 'error' && (
              <div className="alert alert-error">Something went wrong. Please try again.</div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending…' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
