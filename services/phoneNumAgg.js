const getSector = require("./getBusinessSector.js");

async function phoneNumAgg(phoneNumbers, prefixesArray) {

    let result = {};
    let validRequest = true;
    const notValid = "Not valid";

    //checks if object is empty
    if (Object.entries(phoneNumbers).length == 0) validRequest = false;

    for (let i = 0; i < phoneNumbers.length; i++) {
        const phoneNumber = phoneNumbers[i];

        //Logs error if it is an invalid number
        const sector = await getSector(phoneNumber);
        //in case the sector is not valid, the phonenumber is discarded
        if ("Not valid".localeCompare(sector) == 0) continue;

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
    if (Object.entries(result).length == 0) validRequest = false;

    if (validRequest)
        return result;
    else
        return notValid;

}

module.exports = phoneNumAgg;