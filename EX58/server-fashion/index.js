const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// Middleware
app.use(morgan('combined'));
app.use(cors({
  origin: ['http://localhost:4001'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoURL = 'mongodb://localhost:27017/FashionData';

mongoose.connect(mongoURL)
  .then(() => console.log('Connected to MongoDB: FashionData'))
  .catch(err => console.error('MongoDB connection error:', err));

// Fashion Schema
const fashionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  style: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
});

// Fashion Model
const Fashion = mongoose.model('Fashion', fashionSchema);

// User Schema (Exercise 61)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// ==================== REST API Endpoints ====================

// ==================== Cookies Programming (Exercise 60) ====================
app.get('/create-cookie', cors({ origin: true, credentials: true }), (req, res) => {
  res.cookie('username', 'tranduythanh');
  res.cookie('password', '123456');

  const account = {
    username: 'tranduythanh',
    password: '123456'
  };
  res.cookie('account', account);

  // Expires after 360000 ms from the time it is set.
  res.cookie('infor_limit1', 'I am limited Cookie - way 1', { expire: 360000 + Date.now() });
  res.cookie('infor_limit2', 'I am limited Cookie - way 2', { maxAge: 360000 });

  res.send('cookies are created');
});

app.get('/read-cookie', cors({ origin: true, credentials: true }), (req, res) => {
  const username = req.cookies.username;
  const password = req.cookies.password;
  const account = req.cookies.account;

  let infor = '';
  infor += 'username = ' + username + '<br/>';
  infor += 'password = ' + password + '<br/>';

  if (account != null) {
    infor += 'account.username = ' + account.username + '<br/>';
    infor += 'account.password = ' + account.password + '<br/>';
  }

  res.send(infor);
});

app.get('/clear-cookie', cors({ origin: true, credentials: true }), (req, res) => {
  res.clearCookie('account');
  res.send('[account] Cookie is removed');
});

// ==================== Login with Cookies (Exercise 61) ====================
app.post('/login', cors({ origin: true, credentials: true }), async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.cookie('login', { username: user.username, password: user.password }, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/login-cookie', cors({ origin: true, credentials: true }), (req, res) => {
  const login = req.cookies.login;
  res.json(login || null);
});

// 1. API returns all Fashion sorted by creation date descending
app.get('/api/fashions', async (req, res) => {
  try {
    const fashions = await Fashion.find().sort({ createdDate: -1 });
    res.json(fashions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. API to filter Fashion by Style
app.get('/api/fashions/style/:style', async (req, res) => {
  try {
    const { style } = req.params;
    const fashions = await Fashion.find({ style: style }).sort({ createdDate: -1 });
    res.json(fashions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. API returns a Fashion based on ObjectId
app.get('/api/fashions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fashion = await Fashion.findById(id);
    if (!fashion) {
      return res.status(404).json({ message: 'Fashion not found' });
    }
    res.json(fashion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. API to add a new Fashion
app.post('/api/fashions', async (req, res) => {
  try {
    const { title, details, thumbnail, style } = req.body;
    const newFashion = new Fashion({
      title,
      details,
      thumbnail,
      style,
      createdDate: new Date()
    });
    const savedFashion = await newFashion.save();
    res.status(201).json(savedFashion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. API to edit a Fashion
app.put('/api/fashions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, details, thumbnail, style } = req.body;
    const updatedFashion = await Fashion.findByIdAndUpdate(
      id,
      { title, details, thumbnail, style },
      { new: true }
    );
    if (!updatedFashion) {
      return res.status(404).json({ message: 'Fashion not found' });
    }
    res.json(updatedFashion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. API to delete a Fashion based on id
app.delete('/api/fashions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFashion = await Fashion.findByIdAndDelete(id);
    if (!deletedFashion) {
      return res.status(404).json({ message: 'Fashion not found' });
    }
    res.json({ message: 'Fashion deleted successfully', deletedFashion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. API to get all unique styles
app.get('/api/styles', async (req, res) => {
  try {
    const styles = await Fashion.distinct('style');
    res.json(styles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== Seed Data ====================
const seedData = async () => {
  try {
    const count = await Fashion.countDocuments();
    if (count === 0) {
      const sampleFashions = [
        // Style: Casual
        { title: 'Casual Summer Dress', details: '<p>A beautiful summer dress perfect for casual outings. Made with breathable fabric.</p>', thumbnail: 'https://picsum.photos/seed/casual1/300/400', style: 'Casual', createdDate: new Date('2024-01-15') },
        { title: 'Denim Jacket', details: '<p>Classic denim jacket for a stylish casual look. Perfect for layering.</p>', thumbnail: 'https://picsum.photos/seed/casual2/300/400', style: 'Casual', createdDate: new Date('2024-01-20') },
        { title: 'White T-Shirt', details: '<p>Essential white t-shirt for everyday wear. Pure cotton comfort.</p>', thumbnail: 'https://picsum.photos/seed/casual3/300/400', style: 'Casual', createdDate: new Date('2024-01-25') },
        { title: 'Comfortable Sneakers', details: '<p>Trendy sneakers for maximum comfort. Great for walking.</p>', thumbnail: 'https://picsum.photos/seed/casual4/300/400', style: 'Casual', createdDate: new Date('2024-02-01') },
        
        // Style: Formal
        { title: 'Business Suit', details: '<p>Elegant business suit for professional occasions. Tailored fit.</p>', thumbnail: 'https://picsum.photos/seed/formal1/300/400', style: 'Formal', createdDate: new Date('2024-02-05') },
        { title: 'Evening Gown', details: '<p>Stunning evening gown for special events. Luxurious fabric.</p>', thumbnail: 'https://picsum.photos/seed/formal2/300/400', style: 'Formal', createdDate: new Date('2024-02-10') },
        { title: 'Dress Shirt', details: '<p>Crisp dress shirt for formal wear. Wrinkle-free material.</p>', thumbnail: 'https://picsum.photos/seed/formal3/300/400', style: 'Formal', createdDate: new Date('2024-02-15') },
        { title: 'Leather Oxfords', details: '<p>Classic leather shoes for formal events. Handcrafted.</p>', thumbnail: 'https://picsum.photos/seed/formal4/300/400', style: 'Formal', createdDate: new Date('2024-02-20') },
        
        // Style: Sporty
        { title: 'Running Jacket', details: '<p>Lightweight running jacket for workouts. Water-resistant.</p>', thumbnail: 'https://picsum.photos/seed/sporty1/300/400', style: 'Sporty', createdDate: new Date('2024-03-01') },
        { title: 'Yoga Pants', details: '<p>Flexible yoga pants for comfortable workouts. Stretchable fabric.</p>', thumbnail: 'https://picsum.photos/seed/sporty2/300/400', style: 'Sporty', createdDate: new Date('2024-03-05') },
        { title: 'Athletic Shorts', details: '<p>Breathable athletic shorts for gym and sports. Quick-dry.</p>', thumbnail: 'https://picsum.photos/seed/sporty3/300/400', style: 'Sporty', createdDate: new Date('2024-03-10') },
        { title: 'Sports Bra', details: '<p>Supportive sports bra for high-impact activities. Comfortable fit.</p>', thumbnail: 'https://picsum.photos/seed/sporty4/300/400', style: 'Sporty', createdDate: new Date('2024-03-15') },
        { title: 'Training Shoes', details: '<p>Professional training shoes for gym workouts. Excellent grip.</p>', thumbnail: 'https://picsum.photos/seed/sporty5/300/400', style: 'Sporty', createdDate: new Date('2024-03-20') }
      ];
      
      await Fashion.insertMany(sampleFashions);
      console.log('Sample data seeded successfully!');
    } else {
      console.log('Database already has data, skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

// Seed data on startup
seedData();

const seedUsers = async () => {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      await User.insertMany([
        { username: 'admin', password: '123' },
        { username: 'tranduythanh', password: '123456' }
      ]);
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

seedUsers();

// Start Server
app.listen(port, () => {
  console.log(`Server-fashion is running on http://localhost:${port}`);
});
