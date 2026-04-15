const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Stripe setup - uses environment variable from .env file
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = 'http://localhost:3000';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'silkisland-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 days
}));

// Data storage
const dataPath = path.join(__dirname, 'data.json');
let users = [];
let orders = [];

// Load data
try {
  if (fs.existsSync(dataPath)) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    users = data.users || [];
    orders = data.orders || [];
  }
} catch (e) {
  console.log('No existing data, creating default admin');
}

// Create default admin if no users
if (users.length === 0) {
  users.push({
    id: 1,
    name: 'Admin',
    email: 'admin@silkisland.ro',
    password: 'admin123',
    phone: '',
    address: '',
    isAdmin: true,
    createdAt: new Date().toISOString()
  });
  saveData();
}

function saveData() {
  fs.writeFileSync(dataPath, JSON.stringify({ users, orders }, null, 2));
}

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// AUTH ROUTES

// Register
app.post('/api/register', (req, res) => {
  const { name, email, password, phone, address } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    phone: phone || '',
    address: address || '',
    isAdmin: false,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveData();
  
  res.json({ success: true, user: { id: newUser.id, name, email, isAdmin: false } });
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  
  req.session.userId = user.id;
  req.session.isAdmin = user.isAdmin;
  
  res.json({ 
    success: true, 
    user: { 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      isAdmin: user.isAdmin 
    } 
  });
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Get current user
app.get('/api/user', (req, res) => {
  if (!req.session.userId) {
    return res.json({ user: null });
  }
  
  const user = users.find(u => u.id === req.session.userId);
  if (!user) {
    return res.json({ user: null });
  }
  
  res.json({ 
    user: { 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin 
    } 
  });
});

// Update user profile
app.put('/api/user', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  
  const { name, phone, address } = req.body;
  const user = users.find(u => u.id === req.session.userId);
  
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (address) user.address = address;
  
  saveData();
  res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, phone: user.phone, address: user.address } });
});

// Get user orders
app.get('/api/orders', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  
  const userOrders = orders.filter(o => o.userId === req.session.userId);
  res.json({ orders: userOrders });
});

// CART ROUTES

app.post('/api/cart/save', (req, res) => {
  const { cart } = req.body;
  if (!req.session.cart) req.session.cart = [];
  req.session.cart = cart;
  res.json({ success: true });
});

app.get('/api/cart/load', (req, res) => {
  res.json({ cart: req.session.cart || [] });
});

// CHECKOUT

aapp.post('/api/checkout', (req, res) => {
  const { cart, customerInfo, paymentMethod } = req.body;
  const orderId = 'ORD-' + Date.now();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const order = {
    id: orderId,
    userId: req.session.userId || null,
    customerInfo,
    cart,
    paymentMethod: paymentMethod || 'cash',
    total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.push(order);
  saveData();
  
  req.session.cart = [];
  
  res.json({ 
    success: true, 
    orderId: orderId,
    message: 'Comanda a fost plasată! Veți plăti cash la livrare.'
  });
});

// PRODUCT MANAGEMENT ROUTES
let serverProducts = [];
const productsPath = path.join(__dirname, 'products.json');

// Load products from file
try {
  if (fs.existsSync(productsPath)) {
    const fileData = fs.readFileSync(productsPath, 'utf8');
    serverProducts = JSON.parse(fileData);
    console.log('Loaded', serverProducts.length, 'products from file');
  }
} catch (e) {
  console.log('Error loading products:', e.message);
}

// If no products loaded, use defaults
if (serverProducts.length === 0) {
  serverProducts = [
    { id: 1, name: "Isis Silk Robe", price: 289.99, category: "Lingerie", image: "/images/product1.jpg", sizes: ["S", "M", "L", "XL"], colors: ["Black", "Gold", "Midnight Blue", "Rose"] },
    { id: 2, name: "Cleopatra's Milk Bath", price: 149.99, category: "Bath Stuff", image: "/images/product2.jpg", sizes: ["250ml", "500ml", "1000ml"], colors: ["Original", "Rose"] },
    { id: 3, name: "Roman Bath Salts", price: 89.99, category: "Bath Stuff", image: "/images/product3.jpg", sizes: ["200g", "500g", "1kg"], colors: ["Rose", "Lavender", "Gold"] },
    { id: 4, name: "Golden Anointing Oil", price: 129.99, category: "Bath Stuff", image: "/images/product4.jpg", sizes: ["30ml", "50ml", "100ml"], colors: ["Gold", "Midnight Blue"] },
    { id: 5, name: "Nefertiti Lace Set", price: 349.99, category: "Lingerie", image: "/images/product5.jpg", sizes: ["S", "M", "L"], colors: ["Black", "Rose", "Gold"] }
  ];
  saveProducts();
  console.log('Using default products');
}

function saveProducts() {
  try {
    fs.writeFileSync(productsPath, JSON.stringify(serverProducts, null, 2));
    console.log('Products saved to file. Count:', serverProducts.length);
  } catch (e) {
    console.error('Failed to save products:', e.message);
  }
}

// Public API
app.get('/api/products', (req, res) => {
  res.json(serverProducts);
});

// Admin APIs
app.get('/api/admin/products', (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json(serverProducts);
});

app.post('/api/admin/products', (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { name, price, category, image, sizes, colors } = req.body;
  const newId = serverProducts.length > 0 ? Math.max(...serverProducts.map(p => p.id)) + 1 : 1;
  
  const newProduct = { id: newId, name, price: parseFloat(price), category, image, sizes, colors };
  serverProducts.push(newProduct);
  saveProducts();
  
  console.log('Product added. New ID:', newId);
  res.json({ success: true, product: newProduct });
});

app.put('/api/admin/products/:id', (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const id = parseInt(req.params.id);
  const { name, price, category, image, sizes, colors } = req.body;
  
  const index = serverProducts.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  serverProducts[index] = { id, name, price: parseFloat(price), category, image, sizes, colors };
  saveProducts();
  
  res.json({ success: true, product: serverProducts[index] });
});

app.delete('/api/admin/products/:id', (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const id = parseInt(req.params.id);
  serverProducts = serverProducts.filter(p => p.id !== id);
  saveProducts();
  
  res.json({ success: true });
});

// Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { cart, customerInfo } = req.body;
    
    const line_items = cart.map(item => ({
      price_data: {
        currency: 'ron',
        product_data: {
          name: item.name,
          description: `${item.size} / ${item.color}`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/checkout.html?session_id={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url: `${YOUR_DOMAIN}/checkout.html?status=cancel`,
      customer_email: customerInfo.email,
      metadata: {
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_address: customerInfo.address,
      },
      shipping_address_collection: {
        allowed_countries: ['RO'],
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n𓃀 SilkIsland Server Running 𓃀`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`\nFeatures:`);
  console.log(`✅ User accounts (Register/Login)`);
  console.log(`✅ Admin panel at /admin/dashboard.html`);
  console.log(`✅ Admin login: admin@silkisland.ro / admin123`);
  console.log(`✅ Checkout with Cash on Delivery & Bank Transfer`);
  console.log(`✅ Stripe payments:`, process.env.STRIPE_SECRET_KEY ? 'ENABLED' : 'DISABLED');
});