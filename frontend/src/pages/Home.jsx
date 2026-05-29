import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './Home.css';

export default function Home() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get('/skills').then(r => setSkills(r.data)).catch(() => {});
  }, []);

  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <main className="home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="container">
          <span className="hero-tag">Available for work ✦</span>
          <h1 className="hero-title">
            Building digital<br />
            <span className="gradient-text">experiences</span><br />
            that matter.
          </h1>
          <p className="hero-sub">
           Final year student & full-stack developer passionate
about building real-world web applications.
          </p>
          <div className="hero-btns">
            <Link to="/projects" className="btn btn-primary">View Projects →</Link>
            <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="skills-section">
        <div className="container">
          <h2 className="section-title">Skills &amp; Technologies</h2>
          {categories.map(cat => (
            <div key={cat} className="skill-category">
              <h3>{cat}</h3>
              <div className="skill-grid">
                {skills.filter(s => s.category === cat).map(s => (
                  <div key={s.id} className="skill-card">
                    <div className="skill-name">{s.name}</div>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{ width: `${s.level}%` }} />
                    </div>
                    <span className="skill-pct">{s.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {skills.length === 0 && <p className="empty">Loading skills…</p>}
        </div>
      </section>
    </main>
  );
}
