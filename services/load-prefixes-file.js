const fs = require("fs");
const error = "Error, file not found";

//Load prefixes file when server starts
//TODO filepath, fileName
const loadPrefixesFile = (filePathName) => {

    try {
        const data = fs.readFileSync(filePathName, "utf8");
        const fileArray = data.split("\n");
        //removes empty lines
        const prefixesArray = fileArray.filter(function(str) {
            return /\S/.test(str);
        });

        console.log(`Done loading the prefixes file`);
        return prefixesArray;

    } catch (err) {
        return error;
    }

};

module.exports = loadPrefixesFile;