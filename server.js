const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Simple products data
const products = [
  {
    _id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    image: "/images/headphones.jpg",
    description: "Quality wireless headphones"
  },
  {
    _id: 2, 
    name: "Smart Watch",
    price: 199.99,
    image: "/images/watch.jpg",
    description: "Track your fitness"
  },
  {
    _id: 3,
    name: "Cotton T-Shirt", 
    price: 24.99,
    image: "/images/tshirt.jpg",
    description: "Comfortable t-shirt"
  }
];

// Only 2 routes needed
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});