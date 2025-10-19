import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Header from './components/Header';        // ← No curly braces
import ProductList from './components/ProductList'; // ← No curly braces  
import Cart from './components/Cart';            // ← No curly braces
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;