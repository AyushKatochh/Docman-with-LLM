// server.js
import express from "express";
import axios from "axios";

const app = express();

async function sendToPythonEndpoint(data, res) {
    try {
        const pythonEndpoint = "http://localhost:8000/store_data";
        
        const headers = {
            "Content-Type": "application/json"
        };

        const response = await axios.post(pythonEndpoint, data, {
            headers: headers
        });

        console.log("Response from Python endpoint:", response.data);
        res.status(200).send("Data stored successfully");

    } catch (error) {
        console.error("Error sending data to Python endpoint:", error.message);
        res.status(500).send("Error sending data to Python endpoint");
    }
}

app.get("/database", async (req, res) => {
    try {
        const data = {
            path: "C:/Users/katoc/Downloads/docman-with-llm/database"
        };

        await sendToPythonEndpoint(data, res);

    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
