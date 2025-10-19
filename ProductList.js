import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use relative URL (thanks to proxy in package.json)
      const apiUrl = `/api/products${selectedCategory ? `?category=${selectedCategory}` : ''}`;
      console.log('🔄 Fetching from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('❌ Fetch error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'sports', label: 'Sports' },
    { value: 'home', label: 'Home' },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0' }}>
        <div style={{ fontSize: '1.125rem' }}>Loading products from server...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
        <div style={{ color: '#ef4444', marginBottom: '1rem' }}>
          Connection Error: {error}
        </div>
        <div style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem' }}>
          Make sure the backend server is running on port 5000
        </div>
        <button 
          onClick={fetchProducts}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer'
          }}
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      {!error && (
        <div style={{ 
          background: '#d1fae5', 
          border: '1px solid #a7f3d0',
          color: '#065f46',
          padding: '1rem', 
          borderRadius: '0.5rem',
          marginBottom: '1rem'
        }}>
          ✅ Connected to backend - Showing {products.length} products
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="category" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '300px',
            padding: '0.5rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            backgroundColor: 'white'
          }}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem 0', color: '#6b7280' }}>
          No products found in this category.
        </div>
      )}
    </div>
  );
};

export default ProductList;