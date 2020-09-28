const getSector = require("./get-business-sector.js");
const getPrefix = require("./get-prefix");

async function aggPhoneNum(phoneNumbers, prefixesArray) {

    let result = {};
    let validRequest = true;
    const notValid = "Not valid";
    const notMatching = "Not matching";

    //checks if object is empty
    if (Object.entries(phoneNumbers).length == 0) validRequest = false;

    for (let i = 0; i < phoneNumbers.length; i++) {
        const phoneNumber = phoneNumbers[i];

        const sector = await getSector(phoneNumber);
        if (notValid.localeCompare(sector) == 0) continue;

        const prefix = getPrefix(phoneNumber, prefixesArray);
        if (notMatching.localeCompare(prefix) == 0) continue;

        console.info(
            `Phonenumber: ${phoneNumber} sector: ${sector} prefix: ${prefix}`
        );
        //Initialize if undefined
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

module.exports = aggPhoneNum;