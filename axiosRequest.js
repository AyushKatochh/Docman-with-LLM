const axios  = require("axios");

const retrieveTikaInformation = async () => {
    try {
        const response = await axios.get("http://localhost:9998/");
        console.log(response.data);
    } catch (error){
        console.error(error);
    }
}

module.exports = {
    retrieveTikaInformation
}
