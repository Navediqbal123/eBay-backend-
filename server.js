import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS enable (sab domains allowed)
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is working! Use /products to fetch eBay data.");
});

// ✅ eBay Products fetch route
app.get("/products", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.ebay.com/buy/browse/v1/item_summary/search?q=shoes",
      {
        headers: {
          "Authorization": `Bearer ${process.env.EBAY_API_KEY}`, // <- yaha tumhara eBay token env me hoga
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from eBay API");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Error fetching product data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
