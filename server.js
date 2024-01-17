// Import packages for different purposes in node.js
const express = require("express");
const app = express();
const {retrieveTikaInformation} = require("./axiosRequest");
const { initializeCollection} = require("./db/database")
const filePath = "C:/Users/katoc/Downloads/important.docx";

// request to tika to send information
app.get("/sendRequest", (req, res) => {
   res.json(retrieveTikaInformation(filePath))
})

// Testing database 
app.get("/database", (req, res) => {
    res.send(initializeCollection())
})

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})