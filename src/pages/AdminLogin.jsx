import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      sessionStorage.setItem('admin_token', data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      {error && <div className="admin-error">{error}</div>}
      <form onSubmit={submit} className="admin-login-form">
        <label>Username<input value={username} onChange={e=>setUsername(e.target.value)} required/></label>
        <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
