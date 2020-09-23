const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());


app.post("/aggregate", async(req, res) => {

    const phoneNumbers = req.body;
    let result = '';

    for (let i = 0; i < phoneNumbers.length; i++) {
        const phoneNumber = phoneNumbers[i];
        const sector = await getSector(phoneNumber);
        result += `*** ${phoneNumber} sector: ${sector}`;
    }

    console.log(result);

    res.send(result);

});


async function getSector(phoneNumber) {

    try {
        const response = await axios.get(`https://challenge-business-sector-api.meza.talkdeskstg.com/sector/${phoneNumber}`);
        console.log(response.data);
        return response.data.sector;
    } catch (error) {
        console.error(error);
    }

}


app.listen(3000, () => console.log('Server running on port 3000 '));