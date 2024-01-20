// server.js
import express from "express";
const app = express();
import { retrieveTikaInformation }   from "./axiosRequest.js";
import { initializeEmbedding } from "./db/database.js";

const filePath = "C:/Users/katoc/Downloads/important.docx";

// Request to Tika to send information
app.get("/sendRequest", (req, res) => {
  res.json(retrieveTikaInformation(filePath));
});

// Initialize Embedder and Collection on /database route
app.get("/database", async (req, res) => {
  try {
    await initializeEmbedding();

    res.status(200).send("Embedding initialized successfully");
  } catch (error) {
    console.log("Error Initializing embedding:", error.message);
    res.status(500).send("Internal Server Error")
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
