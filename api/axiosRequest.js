// axiosRequest.js

import axios from "axios";
import fs from "fs";
import { getContentHeaders } from "./contentHeaders.js";

export const retrieveTikaInformation = async (filePath) => {
    try {
        // Read File Content
        const fileContent = fs.readFileSync(filePath);

        // Set up the headers
        const headers = getContentHeaders(filePath);

        const response = await axios.put("http://localhost:9998/tika", fileContent, {
            headers,
        });

        // Extract text from Tika response
        const parsedText = response.data;

        // Create a directory named "database" if it doesn't exist
        const directoryPath = "./database";
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }

        // Write parsed text to a .txt file
        const txtFilePath = `${directoryPath}/parsed_text.txt`;
        fs.writeFileSync(txtFilePath, parsedText);

        console.log(`Parsed text saved to: ${parsedText}`);

        return txtFilePath;
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
};
