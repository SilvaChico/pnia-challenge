/*** @jest-environment node*/

const getSector = require("./getBusinessSector");

describe("Unit tests for get business sector ", () => {

    it("Gets correct bussiness sector", async() => {
        let sector = await getSector("+147 8192");
        expect(sector).toEqual("Clothing");
        //expect(typeof result).toEqual("Array");
    });

    it("Gets invalid bussiness sector", async() => {
        let sector = await getSector("*JKDKB");
        expect(sector).toEqual("Not valid");
    });

});