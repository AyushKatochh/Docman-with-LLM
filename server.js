// Import packages for different purposes in node.js
const express = require("express");
const app = express();
const {retrieveTikaInformation} = require("./axiosRequest");


// request to tika to send information
app.get("/sendRequest", (req, res) => {
   res.json(retrieveTikaInformation())
})

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})