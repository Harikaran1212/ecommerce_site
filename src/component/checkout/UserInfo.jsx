import React, { useState } from "react";
import { useCartActions } from "../../store/Store";
import { useCart } from "../../store/Store";
import "./UserInfo.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import fetchFromApi from "../../utils/fetchFromApi";

function UserInfo() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const { emptyCart } = useCartActions();
  const cart = useCart();
  let navigate = useNavigate();

  async function checkoutHandler() {
    if (cart.length < 1) {
      toast.error('Your shopping list is Empty');
      return;
    }

    let totalPrice = cart.reduce((acc, cur) => acc + cur.qty * cur.price, 0);
    if (totalPrice < 1) {
      toast.error('Cannot process order value of zero(0).');
      return;
    }

    const items = cart.map(p => ({
      product: p._id || p.id || null,
      title: p.title,
      quantity: p.qty,
      price: p.price
    }));

    const customer = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      address: `${address}, ${city}`.trim()
    };

    try {
      const res = await fetchFromApi('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer })
      });
      // success
      emptyCart();
      toast.success('Order placed successfully');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order: ' + (err.message || 'Unknown'));
    }
  }

  return (
    <div className="user-info_container">
      <div className="contact-info_container">
        <h3>Contact Information</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="shipping-address_container">
        <h3>Shipping Address</h3>
        <div className="shipping-address_wrapper">
          <input
            type="text"
            placeholder="First name"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="checkout-btn" onClick={checkoutHandler}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
