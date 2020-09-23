const express = require("express");
const app = express();
const axios = require("axios");
const fs = require("fs");

app.use(express.json());

let prefixesArray = [];

//Load prefixes file
fs.readFile("resorces/prefixes.txt", "utf8", function(err, data) {

    if (err) {
        return console.log(err);
    }
    const fileArray = data.split('\n');

    //removes empty lines
    prefixesArray = fileArray.filter(function(str) {
        return /\S/.test(str);
    });

});

//aggregate endpoint
app.post("/aggregate", async(req, res) => {

    const phoneNumbers = req.body;
    let result = '';

    for (let i = 0; i < phoneNumbers.length; i++) {

        const phoneNumber = phoneNumbers[i];

        //Displays error if it is an invalid number
        const sector = await getSector(phoneNumber);

        const normalizedPhoneNumber = phoneNumber.replace(/^00|^\+/, '').trim();
        console.log(normalizedPhoneNumber);
        const prefix = prefixesArray.filter((prefix) =>
            normalizedPhoneNumber.startsWith(prefix)
        );

        result += `*** ${phoneNumber} sector: ${sector} prefix: ${prefix}`;
    }

    console.log(result);

    res.send(result);

});

//Business sector API request
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