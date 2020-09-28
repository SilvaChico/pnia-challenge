const normalizePhoneNumber = require("./normalize-phone-num");

//Gets the prefix
function getPrefix(phoneNumber, prefixesArray) {
    const notMatching = "Not matching";
    const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);
    const prefix = prefixesArray.filter((prefix) =>
        normalizedPhoneNumber.startsWith(prefix)
    );
    if (prefix.length === 0) {
        console.log(
            `Phonenumber: ${phoneNumber} does not have a matching prefix`
        );
        return notMatching;
    }
    return prefix[0];
}

module.exports = getPrefix;