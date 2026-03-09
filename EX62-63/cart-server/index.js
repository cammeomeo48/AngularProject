const express = require('express');
const app = express();
const port = 4004;
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

// Middleware
app.use(cors({
    origin: ['http://localhost:4005'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration (Exercise 62)
app.use(session({
    secret: 'Shh, its a secret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to false for HTTP localhost
        maxAge: 1000 * 60 * 60 * 24 // 1 day session
    }
}));

// MongoDB Connection
const mongoURL = 'mongodb://localhost:27017/FashionData';

mongoose.connect(mongoURL)
    .then(() => console.log('Connected to MongoDB: FashionData (cart-server)'))
    .catch(err => console.error('MongoDB connection error:', err));

// Product Schema (Exercise 63)
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: '' },
    description: { type: String, default: '' }
});

const Product = mongoose.model('Product', productSchema);

// ==================== Exercise 62 API ====================
app.get('/contact', (req, res) => {
    if (req.session.visited) {
        req.session.visited++;
        res.send(`You visited this page ${req.session.visited} times`);
    } else {
        req.session.visited = 1;
        res.send('Welcome to this page for the first time!');
    }
});

// ==================== Exercise 63 APIs (Shopping Cart) ====================

// 1. Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get current cart from session memory
app.get('/cart', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    res.json(req.session.cart);
});

// 3. Add to cart
app.post('/cart', async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Check if product already exists in cart stringified JSON
        const existingIndex = req.session.cart.findIndex(item => item._id === product._id.toString());

        if (existingIndex >= 0) {
            req.session.cart[existingIndex].quantity += 1;
        } else {
            req.session.cart.push({
                _id: product._id.toString(),
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        res.json({ message: 'Added to cart', cart: req.session.cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Update cart item quantity
app.put('/cart/:id', (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!req.session.cart) {
        return res.status(400).json({ message: 'Cart is empty' });
    }

    const existingIndex = req.session.cart.findIndex(item => item._id === id);
    if (existingIndex >= 0) {
        if (quantity <= 0) {
            // Remove if 0 or less
            req.session.cart.splice(existingIndex, 1);
        } else {
            req.session.cart[existingIndex].quantity = quantity;
        }
        res.json({ message: 'Cart updated', cart: req.session.cart });
    } else {
        res.status(404).json({ message: 'Item not in cart' });
    }
});

// 5. Delete from cart
app.delete('/cart/:id', (req, res) => {
    const { id } = req.params;

    if (!req.session.cart) {
        return res.status(400).json({ message: 'Cart is empty' });
    }

    const existingIndex = req.session.cart.findIndex(item => item._id === id);
    if (existingIndex >= 0) {
        req.session.cart.splice(existingIndex, 1);
        res.json({ message: 'Item removed', cart: req.session.cart });
    } else {
        res.status(404).json({ message: 'Item not in cart' });
    }
});

// ==================== Seed Data ====================
const seedData = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            const sampleProducts = [
                { title: 'MacBook Pro 16"', price: 2499, image: 'https://picsum.photos/seed/mbp/400/300', description: 'Powerful laptop for professionals.' },
                { title: 'iPhone 15 Pro', price: 999, image: 'https://picsum.photos/seed/ip15/400/300', description: 'The latest flagship smartphone.' },
                { title: 'AirPods Max', price: 549, image: 'https://picsum.photos/seed/airmax/400/300', description: 'Over-ear noise cancelling headphones.' },
                { title: 'iPad Pro', price: 1099, image: 'https://picsum.photos/seed/ipad/400/300', description: '12.9" liquid retina display.' },
                { title: 'Apple Watch Ultra', price: 799, image: 'https://picsum.photos/seed/watch/400/300', description: 'Rugged smartwatch for extreme sports.' },
                { title: 'Sony A7 IV', price: 2498, image: 'https://picsum.photos/seed/sony/400/300', description: 'Full-frame mirrorless camera.' }
            ];
            await Product.insertMany(sampleProducts);
            console.log('Sample products seeded successfully!');
        }
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};
seedData();

// Start Server
app.listen(port, () => {
    console.log(`Cart Server is running on http://localhost:${port}`);
});
