import React, { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import '../styles/dashboard.css';

function SweetTable({ token, role }) {

  // ===== STATE =====
  const [sweets, setSweets] = useState([]);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // ===== API CALLS =====
  async function loadSweets() {
    const data = await apiRequest('/sweets', 'GET', null, token);
    setSweets(data);
  }

  async function searchSweets() {
    const params = new URLSearchParams();

    if (search) params.append('name', search);
    if (categoryFilter) params.append('category', categoryFilter);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);

    if ([...params].length === 0) {
      loadSweets();
      return;
    }

    const data = await apiRequest(
      `/sweets/search?${params.toString()}`,
      'GET',
      null,
      token
    );

    setSweets(data);
  }

  async function addSweet() {
    if (!name || !category || !price || !quantity) {
      alert("All fields required");
      return;
    }

    await apiRequest(
      '/sweets',
      'POST',
      {
        name,
        category,
        price: Number(price),
        quantity: Number(quantity)
      },
      token
    );

    setName('');
    setCategory('');
    setPrice('');
    setQuantity('');
    loadSweets();
  }

  async function purchaseSweet(id) {
    await apiRequest(`/sweets/${id}/purchase`, 'POST', null, token);
    loadSweets();
  }

  async function deleteSweet(id) {
    await apiRequest(`/sweets/${id}`, 'DELETE', null, token);
    loadSweets();
  }

  useEffect(() => {
    loadSweets();
  }, []);

  // ===== UI =====
  return (
    <div className="dashboard">

      <h2 className="title">Sweets Inventory</h2>

      {/* 🔍 SEARCH */}
      <div className="search-box">
        <input
          placeholder="Product Name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <input
          placeholder="Category"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min ₹"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max ₹"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />

        <button className="btn search" onClick={searchSweets}>Search</button>
        <button className="btn reset" onClick={loadSweets}>Reset</button>
      </div>

      {/* 👑 ADMIN ADD */}
      {role === 'admin' && (
        <div className="admin-box">
          <h3>Add New Sweet</h3>
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
          <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
          <button className="btn add" onClick={addSweet}>Add Sweet</button>
        </div>
      )}

      {/* 📋 TABLE */}
      <table className="sweet-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {sweets.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.category}</td>
              <td>₹{s.price}</td>
              <td>{s.quantity}</td>
              <td>
                <button
                  className="btn purchase"
                  disabled={s.quantity === 0}
                  onClick={() => purchaseSweet(s.id)}
                >
                  Purchase
                </button>

                {role === 'admin' && (
                  <button
                    className="btn delete"
                    onClick={() => deleteSweet(s.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default SweetTable;
