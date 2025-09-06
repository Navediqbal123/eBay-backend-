//// server.js ////
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const EBAY_TOKEN = process.env.EBAY_TOKEN; // Render -> Environment -> Add Secret

app.use(cors());
app.use(express.json());

// ---- Static sample products (use products.json if chaho) ----
let products = [
  { id: 1, name: "Sample Product 1", price: 499, image: "https://picsum.photos/seed/p1/400/300", url: "https://example.com/p1" },
  { id: 2, name: "Sample Product 2", price: 999, image: "https://picsum.photos/seed/p2/400/300", url: "https://example.com/p2" }
];

// Health
app.get('/', (_, res) => res.json({ ok: true }));

// Fetch local products (Add Product / Admin Product ke liye)
app.get('/fetch-products', (_, res) => res.json(products));

// Add product (admin)
app.post('/add-product', (req, res) => {
  const p = req.body || {};
  p.id = products.length + 1;
  products.push(p);
  res.json({ message: 'added', product: p });
});

// (Optional) eBay proxy: ?q=iphone  (EBAY_TOKEN required)
app.get('/fetch-ebay', async (req, res) => {
  try {
    if (!EBAY_TOKEN) return res.status(400).json({ error: 'EBAY_TOKEN missing' });
    const q = encodeURIComponent(req.query.q || 'phone');
    const r = await fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${q}`, {
      headers: { 'Authorization': `Bearer ${EBAY_TOKEN}`, 'Content-Type': 'application/json' }
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

//// package.json ////
{
  "name": "product-backend",
  "version": "1.0.0",
  "main": "server.js",
  "type": "commonjs",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "node-fetch": "^2.7.0"
  }
}

//// products.json (optional) ////
[
  { "id": 1, "name": "Product A", "price": 199, "image": "https://picsum.photos/seed/a/400/300", "url": "https://example.com/a" },
  { "id": 2, "name": "Product B", "price": 299, "image": "https://picsum.photos/seed/b/400/300", "url": "https://example.com/b" }
]
