import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminOrders.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null;

  useEffect(() => {
    if (!token) navigate('/admin/login');
    else loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  async function loadOrders() {
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch('/api/orders', { headers });
      if (!res.ok) throw new Error('Failed to load orders');
      const data = await res.json();
      setOrders(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Update failed');
      await loadOrders();
    } catch (e) {
      setError(e.message);
    }
  }

  async function delOrder(id) {
    if (!confirm('Delete order?')) return;
    try {
      const headers = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE', headers });
      if (!res.ok) throw new Error('Delete failed');
      await loadOrders();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="admin-orders">
      <h2>Admin — Orders</h2>
      {error && <div className="admin-error">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td className="mono">{o._id}</td>
                <td>{o.customer?.name || '-'}<br/><small>{o.customer?.email || ''}</small></td>
                <td>
                  <ul className="order-items">
                    {(o.items || []).map((it, i) => (
                      <li key={i}>{it.title} x{it.quantity} — ${it.price}</li>
                    ))}
                  </ul>
                </td>
                <td>${o.total?.toFixed(2)}</td>
                <td>{o.status}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td className="actions">
                  <button onClick={() => updateStatus(o._id, 'processing')}>Processing</button>
                  <button onClick={() => updateStatus(o._id, 'shipped')}>Shipped</button>
                  <button onClick={() => updateStatus(o._id, 'delivered')}>Delivered</button>
                  <button onClick={() => updateStatus(o._id, 'cancelled')}>Cancel</button>
                  <button className="danger" onClick={() => delOrder(o._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
