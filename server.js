import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is working! Use /products to fetch eBay data.");
});

// Products route (example: iPhone search)
app.get("/products", async (req, res) => {
  try {
    const response = await fetch("https://api.ebay.com/buy/browse/v1/item_summary/search?q=iphone", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.EBAY_TOKEN}`, // eBay OAuth token yaha lagega
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
