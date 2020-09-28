//Removes 00 or + from the start of the phone number and blanks
function nomalizePhoneNum(phoneNumber) {
    return phoneNumber.replace(/\s/g, "").replace(/^00|^\+/, "");
}

module.exports = nomalizePhoneNum;