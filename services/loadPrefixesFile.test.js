const loadPrefixes = require("./loadPrefixesFile.js");

describe("Unit tests for load prefixes ", () => {

    it("Loads the prefixes file correctly", () => {
        let result = loadPrefixes("resources/prefixes.txt");
        expect(result.length).toEqual(900005);
        //expect(typeof result).toEqual("Array");
    });

    it("Loads and non existing file", () => {
        let result = loadPrefixes("resources/prefixes1.txt");
        expect(result).toEqual("Error, file not found");
    });
});