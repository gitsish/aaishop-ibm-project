// src/TestProducts.jsx
import React from 'react';
import products from './data/products.mjs'; // adjust path if needed

export default function TestProducts() {
  console.log('✅ Products:', products.length);
  
  return (
    <div
      style={{
        padding: 20,
        minHeight: '100vh',       // ✅ force visible area
        background: '#fafafa',
        outline: '2px dashed orange',
      }}
    >
      <h1 style={{ marginBottom: 12 }}>TestProducts — count: {products.length}</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
          minHeight: '200px',
        }}
      >
        {products.slice(0, 12).map((p) => (
          <div
            key={p.id}
            style={{
              border: '1px solid #ccc',
              padding: 12,
              borderRadius: 6,
              background: '#fff',
              height: 'auto',              // ✅ prevent collapse
            }}
          >
            <img
              src={p.images?.[0]}
              alt={p.name}
              style={{
                width: '100%',
                height: 180,
                objectFit: 'cover',
                borderRadius: 6,
                background: '#ddd',
              }}
              onError={(e) => (e.target.style.background = 'red')} // visualize broken image
            />
            <h3 style={{ margin: '8px 0' }}>{p.name}</h3>
            <div>₹{p.price}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{p.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
