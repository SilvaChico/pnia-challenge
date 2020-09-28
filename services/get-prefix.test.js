const getPrefix = require("./get-prefix.js");

describe("Unit tests for get prefix for a number that starts with +", () => {
    it("Gets correct prefix", () => {
        const prefixesArray = ['12', '14', '44'];
        let prefix = getPrefix("+147 8192", prefixesArray);
        expect(prefix).toEqual("14");
    });

    it("Gets correct prefix for a normalized number", () => {
        const prefixesArray = ["12", "14", "44"];
        let prefix = getPrefix("447 8192", prefixesArray);
        expect(prefix).toEqual("44");
    });

    it("Does not find a matching prefix", () => {
        const prefixesArray = ["12", "14", "44"];
        let prefix = getPrefix("00117 8192", prefixesArray);
        expect(prefix).toEqual("Not matching");
    });

});