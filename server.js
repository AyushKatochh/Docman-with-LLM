// server.js
import express from "express";
import { retrieveTikaInformation } from "./axiosRequest.js";
import fs from "fs";
const app = express();

// Initialize Embedder and Collection on /database route
app.get("/database", async (req, res) => {
    try {
        const filePath = "C:/Users/katoc/Downloads/important.docx";

        // Retrieve parsed text using Tika
        const txtFilePath = await retrieveTikaInformation(filePath);

        // Send parsed text file path to client
        res.status(200).send(txtFilePath);
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
