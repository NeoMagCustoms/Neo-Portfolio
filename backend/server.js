const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'emma-portfolio-jwt-secret-2024';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}${ext}`);
  }
});

const upload = multer({ storage });

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/artworks', async (req, res) => {
  try {
    const artworksPath = path.join(__dirname, 'content', 'artworks.json');
    const data = await fs.readFile(artworksPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.json({ artworks: [] });
  }
});

app.post('/api/artworks', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, category, available } = req.body;
    const artworksPath = path.join(__dirname, 'content', 'artworks.json');

    let artworks = { artworks: [] };
    try {
      const data = await fs.readFile(artworksPath, 'utf8');
      artworks = JSON.parse(data);
    } catch (error) {
      console.log('Creating new artworks file');
    }

    const newArtwork = {
      id: Date.now().toString(),
      title,
      description,
      price: parseFloat(price) || 0,
      category,
      available: available === 'true',
      image: req.file ? `/uploads/${req.file.filename}` : null,
      createdAt: new Date().toISOString()
    };

    artworks.artworks.push(newArtwork);
    await fs.writeFile(artworksPath, JSON.stringify(artworks, null, 2));

    res.json(newArtwork);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/artworks/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, available } = req.body;
    const artworksPath = path.join(__dirname, 'content', 'artworks.json');

    const data = await fs.readFile(artworksPath, 'utf8');
    const artworks = JSON.parse(data);

    const artworkIndex = artworks.artworks.findIndex(a => a.id === id);
    if (artworkIndex === -1) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    const updatedArtwork = {
      ...artworks.artworks[artworkIndex],
      title,
      description,
      price: parseFloat(price) || 0,
      category,
      available: available === 'true',
      updatedAt: new Date().toISOString()
    };

    if (req.file) {
      updatedArtwork.image = `/uploads/${req.file.filename}`;
    }

    artworks.artworks[artworkIndex] = updatedArtwork;
    await fs.writeFile(artworksPath, JSON.stringify(artworks, null, 2));

    res.json(updatedArtwork);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/artworks/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const artworksPath = path.join(__dirname, 'content', 'artworks.json');

    const data = await fs.readFile(artworksPath, 'utf8');
    const artworks = JSON.parse(data);

    artworks.artworks = artworks.artworks.filter(a => a.id !== id);
    await fs.writeFile(artworksPath, JSON.stringify(artworks, null, 2));

    res.json({ message: 'Artwork deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const postsPath = path.join(__dirname, 'content', 'posts.json');
    const data = await fs.readFile(postsPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.json({ posts: [] });
  }
});

app.post('/api/posts', authenticateToken, async (req, res) => {
  try {
    const { title, content, excerpt } = req.body;
    const postsPath = path.join(__dirname, 'content', 'posts.json');

    let posts = { posts: [] };
    try {
      const data = await fs.readFile(postsPath, 'utf8');
      posts = JSON.parse(data);
    } catch (error) {
      console.log('Creating new posts file');
    }

    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      excerpt,
      createdAt: new Date().toISOString(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };

    posts.posts.push(newPost);
    await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));

    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});