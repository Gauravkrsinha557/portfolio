import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './AdminLogin.css';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('admin_token', data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Admin Login</h1>
        <p>Restricted area — portfolio owner only.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={form.password} onChange={e => setForm(f=>({...f,password:e.target.value}))} required />
          </div>
          {error && <div className="alert alert-error">{error}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading} style={{width:'100%',justifyContent:'center'}}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
