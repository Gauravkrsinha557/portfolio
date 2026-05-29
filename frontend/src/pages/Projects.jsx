import { useEffect, useState } from 'react';
import api from '../api';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects')
      .then(r => setProjects(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="projects-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Projects</h1>
          <p className="page-sub">A collection of things I've built.</p>
        </div>

        {loading && <p className="empty">Loading projects…</p>}

        <div className="projects-grid">
          {projects.map(p => (
            <article key={p.id} className={`project-card${p.featured ? ' featured' : ''}`}>
              {p.image_url && (
                <div className="project-img">
                  <img src={p.image_url} alt={p.title} />
                </div>
              )}
              <div className="project-body">
                {p.featured && <span className="featured-badge">Featured</span>}
                <h2>{p.title}</h2>
                <p>{p.description}</p>
                {p.tech_stack && (
                  <div className="tech-tags">
                    {p.tech_stack.split(',').map(t => (
                      <span key={t.trim()} className="tech-tag">{t.trim()}</span>
                    ))}
                  </div>
                )}
                <div className="project-links">
                  {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" className="btn btn-primary">Live Demo →</a>}
                  {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>}
                </div>
              </div>
            </article>
          ))}
        </div>

        {!loading && projects.length === 0 && (
          <p className="empty">No projects yet. Check back soon!</p>
        )}
      </div>
    </main>
  );
}
