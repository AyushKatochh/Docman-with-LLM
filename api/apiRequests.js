// apiRequests.js
import axios from "axios";
import fs from "fs"

export async function sendToPythonEndpoint(directoryPath, filePath) {
    try {
        const pythonEndpoint = "http://localhost:8000/store_data";
        
        // Send the path of the directory to the Python API
        const data = {
            path: directoryPath
        };

        const headers = {
            "Content-Type": "application/json"
        };

        const response = await axios.post(pythonEndpoint, data, {
            headers: headers
        });

        console.log("Response from Python endpoint:", response.data);

        // Delete the file after successful response
        fs.unlinkSync(filePath);

        return "Data stored successfully";

    } catch (error) {
        console.error("Error sending data to Python endpoint:", error.message);
        throw new Error("Error sending data to Python endpoint");
    }
}
