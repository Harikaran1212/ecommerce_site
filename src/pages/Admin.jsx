import { Link, useNavigate } from 'react-router-dom';
import './Admin.css';

export default function Admin() {
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null;

  function logout() {
    sessionStorage.removeItem('admin_token');
    navigate('/admin/login');
  }

  return (
    <div className="admin-page-root">
      <h2>Admin Dashboard</h2>
      <div className="admin-links">
        <Link to="/admin/orders">Orders Management</Link>
        <Link to="/admin">Products Management</Link>
      </div>
      <p>Use the links above to manage products and orders.</p>
      {!token ? (
        <p><Link to="/admin/login">Login to access admin</Link></p>
      ) : (
        <p><button onClick={logout}>Logout</button></p>
      )}
    </div>
  );
}
