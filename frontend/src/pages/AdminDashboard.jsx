import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './AdminDashboard.css';

const EMPTY_PROJECT = { title:'', description:'', tech_stack:'', live_url:'', github_url:'', image_url:'', featured: false };
const EMPTY_SKILL   = { name:'', category:'', level: 80 };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills]     = useState([]);
  const [messages, setMessages] = useState([]);
  const [projectForm, setProjectForm] = useState(EMPTY_PROJECT);
  const [skillForm, setSkillForm]     = useState(EMPTY_SKILL);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { navigate('/admin/login'); return; }
    loadAll();
  }, []);

  async function loadAll() {
    const [p, s, m] = await Promise.all([
      api.get('/projects'), api.get('/skills'), api.get('/contact'),
    ]);
    setProjects(p.data); setSkills(s.data); setMessages(m.data);
  }

  const logout = () => { localStorage.removeItem('admin_token'); navigate('/admin/login'); };
  const flash  = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  // ── Projects ──────────────────────────────────────────
  const saveProject = async e => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/projects/${editId}`, projectForm);
        flash('Project updated!');
      } else {
        await api.post('/projects', projectForm);
        flash('Project added!');
      }
      setProjectForm(EMPTY_PROJECT); setEditId(null);
      loadAll();
    } catch { flash('Error saving project'); }
  };
  const deleteProject = async id => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`); loadAll();
  };
  const editProject = (p) => {
    setProjectForm(p); setEditId(p.id); setTab('projects');
    window.scrollTo({top:0,behavior:'smooth'});
  };

  // ── Skills ────────────────────────────────────────────
  const saveSkill = async e => {
    e.preventDefault();
    try {
      await api.post('/skills', skillForm);
      setSkillForm(EMPTY_SKILL); flash('Skill added!'); loadAll();
    } catch { flash('Error saving skill'); }
  };
  const deleteSkill = async id => { await api.delete(`/skills/${id}`); loadAll(); };

  // ── Messages ──────────────────────────────────────────
  const markRead = async id => { await api.patch(`/contact/${id}/read`); loadAll(); };
  const deleteMsg = async id => { await api.delete(`/contact/${id}`); loadAll(); };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={logout} className="btn btn-outline">Logout</button>
      </div>

      {msg && <div className="flash">{msg}</div>}

      <div className="admin-tabs">
        {['projects','skills','messages'].map(t => (
          <button key={t} className={`tab-btn${tab===t?' active':''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
            {t==='messages' && messages.filter(m=>!m.read_status).length > 0 && (
              <span className="badge">{messages.filter(m=>!m.read_status).length}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── PROJECTS TAB ── */}
      {tab === 'projects' && (
        <div className="tab-content">
          <form className="admin-form" onSubmit={saveProject}>
            <h2>{editId ? 'Edit Project' : 'Add New Project'}</h2>
            <div className="form-row">
              <input placeholder="Title *" value={projectForm.title} onChange={e=>setProjectForm(f=>({...f,title:e.target.value}))} required />
              <input placeholder="Tech stack (comma-separated)" value={projectForm.tech_stack} onChange={e=>setProjectForm(f=>({...f,tech_stack:e.target.value}))} />
            </div>
            <textarea placeholder="Description *" rows={3} value={projectForm.description} onChange={e=>setProjectForm(f=>({...f,description:e.target.value}))} required />
            <div className="form-row">
              <input placeholder="Live URL" value={projectForm.live_url} onChange={e=>setProjectForm(f=>({...f,live_url:e.target.value}))} />
              <input placeholder="GitHub URL" value={projectForm.github_url} onChange={e=>setProjectForm(f=>({...f,github_url:e.target.value}))} />
            </div>
            <input placeholder="Image URL" value={projectForm.image_url} onChange={e=>setProjectForm(f=>({...f,image_url:e.target.value}))} />
            <label className="checkbox-label">
              <input type="checkbox" checked={projectForm.featured} onChange={e=>setProjectForm(f=>({...f,featured:e.target.checked}))} />
              Featured project
            </label>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Add Project'}</button>
              {editId && <button type="button" className="btn btn-outline" onClick={()=>{setEditId(null);setProjectForm(EMPTY_PROJECT)}}>Cancel</button>}
            </div>
          </form>

          <div className="admin-list">
            {projects.map(p => (
              <div key={p.id} className="admin-list-item">
                <div>
                  <strong>{p.title}</strong>
                  {p.featured && <span className="badge ml">Featured</span>}
                  <p>{p.tech_stack}</p>
                </div>
                <div className="item-actions">
                  <button onClick={()=>editProject(p)} className="btn btn-outline">Edit</button>
                  <button onClick={()=>deleteProject(p.id)} className="btn-danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SKILLS TAB ── */}
      {tab === 'skills' && (
        <div className="tab-content">
          <form className="admin-form" onSubmit={saveSkill}>
            <h2>Add Skill</h2>
            <div className="form-row">
              <input placeholder="Skill name *" value={skillForm.name} onChange={e=>setSkillForm(f=>({...f,name:e.target.value}))} required />
              <input placeholder="Category (Frontend / Backend / Tools)" value={skillForm.category} onChange={e=>setSkillForm(f=>({...f,category:e.target.value}))} />
            </div>
            <label className="range-label">
              Proficiency: {skillForm.level}%
              <input type="range" min={10} max={100} value={skillForm.level} onChange={e=>setSkillForm(f=>({...f,level:+e.target.value}))} />
            </label>
            <button type="submit" className="btn btn-primary">Add Skill</button>
          </form>

          <div className="admin-list">
            {skills.map(s => (
              <div key={s.id} className="admin-list-item">
                <div>
                  <strong>{s.name}</strong>
                  <p>{s.category} — {s.level}%</p>
                </div>
                <button onClick={()=>deleteSkill(s.id)} className="btn-danger">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MESSAGES TAB ── */}
      {tab === 'messages' && (
        <div className="tab-content">
          <div className="admin-list">
            {messages.length === 0 && <p className="empty">No messages yet.</p>}
            {messages.map(m => (
              <div key={m.id} className={`admin-list-item message-item${!m.read_status?' unread':''}`}>
                <div>
                  <strong>{m.name} <span className="msg-email">&lt;{m.email}&gt;</span></strong>
                  <p className="msg-text">{m.message}</p>
                  <span className="msg-date">{new Date(m.created_at).toLocaleString()}</span>
                </div>
                <div className="item-actions">
                  {!m.read_status && <button onClick={()=>markRead(m.id)} className="btn btn-outline">Mark read</button>}
                  <button onClick={()=>deleteMsg(m.id)} className="btn-danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
