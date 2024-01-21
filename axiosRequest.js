// axiosRequest.js

import axios  from "axios";
import fs from "fs";
import {getContentHeaders} from "./contentHeaders.js";


export  const retrieveTikaInformation = async (filePath) => {
    try {
        // Read File Content
        const fileContent = fs.readFileSync(filePath);

        // Set up the headers
        const headers = getContentHeaders(filePath);

        const response = await axios.put("http://localhost:9998/tika", fileContent, {
            headers,
        });

        console.log(`Tika server response:\n${response.data}`);
    
        return response.data;
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
};

