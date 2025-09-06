const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// eBay API se products fetch karne wala function
app.get('/products', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.sandbox.ebay.com/buy/feed/v1_beta/item_summary?q=iphone&limit=10',
      {
        headers: {
          'Authorization': `Bearer ${process.env.EBAY_TOKEN}`,
          'X-EBAY-API-KEY': process.env.EBAY_CLIENT_ID
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server start karo
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));