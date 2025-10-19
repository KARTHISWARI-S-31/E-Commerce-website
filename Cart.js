import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartQty } from '../actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Remove item from cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // Update item quantity
  const updateCartHandler = (id, qty) => {
    dispatch(updateCartQty(id, Number(qty)));
  };

  // Calculate total price
  const getCartSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  };

  // Calculate total items
  const getCartItemsCount = () => {
    return cartItems.reduce((acc, item) => acc + item.qty, 0);
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart!</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <Link to={`/product/${item._id}`} className="item-name">
                    {item.name}
                  </Link>
                  <p className="item-price">${item.price}</p>
                </div>

                <div className="item-quantity">
                  <select 
                    value={item.qty} 
                    onChange={(e) => updateCartHandler(item._id, e.target.value)}
                  >
                    {[...Array(item.countInStock).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="item-total">
                  ${(item.price * item.qty).toFixed(2)}
                </div>

                <div className="item-remove">
                  <button 
                    onClick={() => removeFromCartHandler(item._id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Items ({getCartItemsCount()}):</span>
              <span>${getCartSubtotal()}</span>
            </div>
            <div className="summary-item">
              <span>Shipping:</span>
              <span>$0.00</span>
            </div>
            <div className="summary-item">
              <span>Tax:</span>
              <span>$0.00</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>${getCartSubtotal()}</span>
            </div>
            
            <div className="checkout-buttons">
              <Link to="/checkout" className="btn btn-primary btn-block">
                Proceed to Checkout
              </Link>
              <Link to="/products" className="btn btn-secondary btn-block">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;