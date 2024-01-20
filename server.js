// server.js
const express = require("express");
const app = express();
const { retrieveTikaInformation } = require("./axiosRequest");
const { ChromaClient } = require('chromadb');
const { initializeEmbedder } = require("./db/database");

const filePath = "C:/Users/katoc/Downloads/important.docx";

// Initialize ChromaClient
const client = new ChromaClient({
  // Add your ChromaDB configuration here
});

// Request to Tika to send information
app.get("/sendRequest", (req, res) => {
  res.json(retrieveTikaInformation(filePath));
});

// Initialize Embedder and Collection on /database route
app.get("/database", async (req, res) => {
  try {
    const { embedder, embeddings, collection } = await initializeEmbedder(client);

    // Use 'embedder', 'embeddings', and 'collection' as needed
    console.log(embeddings);

    res.send("Embedder and Collection initialized successfully");
  } catch (error) {
    console.error("Error initializing Embedder and Collection:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
