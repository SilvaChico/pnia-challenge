const axios = require("axios");
const notValid = 'Not valid';
//Business sector API request
async function getSector(phoneNumber) {
    try {
        const response = await axios.get(
            `https://challenge-business-sector-api.meza.talkdeskstg.com/sector/${phoneNumber}`
        );
        return response.data.sector;
    } catch (error) {
        console.log(`Phonenumber: ${phoneNumber} is not valid`);
        return notValid;
    }
}

module.exports = getSector;