const axios = require("axios");
const fs = require("fs");

const filePath = "C:/Users/katoc/Downloads/important.docx";

const retrieveTikaInformation = async (filePath) => {
    try {
        // Read File Content
        const fileContent = fs.readFileSync(filePath, 'base64');

        // Set up the headers
        const headers = {
            'Content-Type': 'application/octet-stream',
            'Accept': 'text/plain',
            'Content-Disposition': 'attachment; filename="important.docx"', // Set the filename explicitly
        };

        const response = await axios.put("http://localhost:9998/tika", Buffer.from(fileContent, 'base64'), {
            headers,
        });

        console.log(`Tika server response:\n${response.data}`);
    } catch (error) {
        console.error("Error:", error.message);
    }
};


module.exports = {
    retrieveTikaInformation,
};
