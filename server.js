// server.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath function
import { retrieveTikaInformation } from "./api/axiosRequest.js";
import { sendToPythonEndpoint } from "./api/apiRequests.js";

const __filename = fileURLToPath(import.meta.url); // Convert import.meta.url to file path
const __dirname = path.dirname(__filename); // Obtain directory name from file path

const app = express();

app.get("/database", async (req, res) => {
    try {
        // Get the directory path for the "/Downloads" folder
        const downloadsDirectory = "C:/Users/katoc/Downloads";

        // Get a list of files in the directory
        const files = fs.readdirSync(downloadsDirectory);

        // Find the first DOCX file in the directory
        let docxFilePath = null;
        for (const file of files) {
            if (file.endsWith(".docx")) {
                docxFilePath = path.join(downloadsDirectory, file);
                break;
            }
        }

        if (!docxFilePath) {
            res.status(404).send("No DOCX files found in the /Downloads directory");
            return;
        }

        // Parse the DOCX file using Apache Tika
        const txtFilePath = await retrieveTikaInformation(docxFilePath);

        // Get the directory path for the "/database" folder
        const databaseDirectory = path.join(__dirname, "database");

        // Send the path of the "/database" directory and the path of the parsed text file to the Python endpoint
        const message = await sendToPythonEndpoint(databaseDirectory, txtFilePath);
        console.log(message);
        res.status(200).send(message);

    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
