const express = require("express");
const app = express();
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//Load prefixes file when server starts
let prefixesArray;
fs.readFile("resorces/prefixes.txt", "utf8", function(err, data) {
    if (err) {
        return console.log(err);
    }
    const fileArray = data.split("\n");

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

    //checks if object is empty
    if (Object.entries(phoneNumbers).length == 0)
        validRequest = false;

    for (let i = 0; i < phoneNumbers.length; i++) {
        const phoneNumber = phoneNumbers[i];

        //Logs error if it is an invalid number
        const sector = await getSector(phoneNumber);
        //in case the is no sector, the phonenumber is discarded
        if (typeof sector === "undefined") continue;

        //Removes 00 or + from the start of the phone number and blanks
        const normalizedPhoneNumber = phoneNumber.trim().replace(/^00|^\+/, "");

        //Gets the prefix
        const prefix = prefixesArray.filter((prefix) =>
            normalizedPhoneNumber.startsWith(prefix)
        );
        //in case there is no matching prefix
        if (prefix.length === 0) {
            console.log(`Phonenumber: ${phoneNumber} does not have a matching prefix`);
            continue;
        }

        console.log(
            `Phonenumber: ${phoneNumber} sector: ${sector} prefix: ${prefix}`
        );

        result[prefix] = result[prefix] || {};
        typeof result[prefix][sector] === "undefined" ?
            (result[prefix][sector] = 1) :
            result[prefix][sector]++;
    }

    //checks if result is empty
    if (Object.entries(result).length == 0)
        validRequest = false;

    if (validRequest) {
        console.log(`Result: ${JSON.stringify(result)}`);
        res.send(result);
    } else
        res.status(400).send(`Bad Request`);


});


//Business sector API request
async function getSector(phoneNumber) {

    try {
        const response = await axios.get(`https://challenge-business-sector-api.meza.talkdeskstg.com/sector/${phoneNumber}`);
        return response.data.sector;
    } catch (error) {
        console.log(`Phonenumber: ${phoneNumber} is not valid`);
    }

}

exports.getSector = getSector;

app.listen(process.env.PORT || 3000, () => console.log('Server running on port 3000 '));