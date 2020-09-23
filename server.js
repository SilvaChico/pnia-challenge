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
    let result = {};
    let validRequest = true;
    let invalidNumber;

    for (let i = 0; i < phoneNumbers.length; i++) {

        const phoneNumber = phoneNumbers[i];

        //Displays error if it is an invalid number
        const sector = await getSector(phoneNumber);

        if (sector === undefined) {
            validRequest = false;
            invalidNumber = phoneNumber;
        }

        //Removes 00 or + from the start of the phone number and blanks
        const normalizedPhoneNumber = phoneNumber.replace(/^00|^\+/, '').trim();

        //Gets the prefix
        const prefix = prefixesArray.filter((prefix) =>
            normalizedPhoneNumber.startsWith(prefix)
        );

        if (prefix === undefined) {
            validRequest = false;
            invalidNumber = phoneNumber;
        }

        console.log(`PhoneNumer: ${phoneNumber} sector: ${sector} prefix: ${prefix}`);

        result[prefix] === undefined ? result[prefix] = {} : true;
        result[prefix][sector] === undefined ?
            (result[prefix][sector] = 1) :
            result[prefix][sector]++;

    }

    console.log(result);

    if (validRequest)
        res.send(result);
    else
        res.status(400).send(`The request contains an invalid number: ${invalidNumber}`);


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