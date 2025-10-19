import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}>
      <img 
        src={product.image} 
        alt={product.name}
        style={{ width: '100%', height: '12rem', objectFit: 'cover' }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x300/6b7280/ffffff?text=Image+Error';
        }}
      />
      <div style={{ padding: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
          {product.name}
        </h3>
        <p style={{ 
          color: '#4b5563', 
          fontSize: '0.875rem', 
          marginBottom: '0.75rem',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {product.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>
            ${product.price}
          </span>
          <span style={{
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            borderRadius: '9999px',
            backgroundColor: product.stock > 10 ? '#dcfce7' : '#fef3c7',
            color: product.stock > 10 ? '#166534' : '#92400e'
          }}>
            {product.stock} in stock
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          style={{
            width: '100%',
            backgroundColor: product.stock === 0 ? '#9ca3af' : '#2563eb',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;