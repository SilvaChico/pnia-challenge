const normalizePhoneNum = require("./normalize-phone-num");

describe("Unit tests for get prefix for a number that starts with +", () => {
    it("Normalizes a number starting with +", () => {
        let prefix = normalizePhoneNum("+1478192");
        expect(prefix).toEqual("1478192");
    });

    it("Normalizes a number starting with 00", () => {
        let prefix = normalizePhoneNum("001478192");
        expect(prefix).toEqual("1478192");
    });

    it("Normalizes a number starting with 00 with several spaces", () => {
        let prefix = normalizePhoneNum("00 147 819 2");
        expect(prefix).toEqual("1478192");
    });

});