const express = require("express");
const app = express();
const cors = require("cors");
const aggPhoneNum = require("./services/aggregate-phone-num.js");

app.use(express.json());
app.use(cors());

//load prefixes file
const prefixesFilePath = "resources/prefixes.txt";
const loadPrefixes = require("./services/load-prefixes-file.js");
const prefixesArray = loadPrefixes(prefixesFilePath);

//aggregate endpoint
app.post("/aggregate", async(req, res) => {
    //gets phone number array from request
    const phoneNumbers = req.body;

    const result = await aggPhoneNum(phoneNumbers, prefixesArray);

    if ("Not valid".localeCompare(result) == 0)
        res.status(400).send(`Bad Request`);
    else {
        console.log(`Result: ${JSON.stringify(result)}`);
        res.send(result);;
    }


});

app.listen(process.env.PORT || 3000, () =>
    console.log("Server running...")
);