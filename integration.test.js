const axios = require('axios');

describe("Integration tests", () => {

    it("Makes a valid request to the API", async() => {
        const request = ["+1983248", "00138 2355", "+147 8192", "+4439877"];
        const expectedResult = {
            1: { Technology: 2, Clothing: 1 },
            44: { Banking: 1 },
        };

        let result = await axios
            .post("http://localhost:3000/aggregate", request);

        expect(result.data).toEqual(expectedResult);
        expect(result.status).toEqual(200);
    });

    it("Makes a request to the API with an invalid number", async() => {
        const request = ["+1983248", "00138invalid", "+147 8192", "+4439877"];
        const expectedResult = {
            1: { Technology: 1, Clothing: 1 },
            44: { Banking: 1 },
        };

        let result = await axios.post("http://localhost:3000/aggregate", request);

        expect(result.data).toEqual(expectedResult);
        expect(result.status).toEqual(200);
    });

    it("Makes a request to the API with one non existing prefix", async() => {
        const request = ["+1983248", "99999999", "+147 8192", "+4439877"];
        const expectedResult = {
            1: { Technology: 1, Clothing: 1 },
            44: { Banking: 1 },
        };

        let result = await axios.post("http://localhost:3000/aggregate", request);

        expect(result.data).toEqual(expectedResult);
        expect(result.status).toEqual(200);
    });

    it("Makes a request to the API without data", async() => {
        try {
            let result = await axios.post("http://localhost:3000/aggregate");
            expect(result.status).toEqual(400);
        } catch (error) {
            expect(error.response.status).toEqual(400);
        }

    });

    it("Makes a request to the API to a different endpoint", async() => {
        try {
            let result = await axios.post("http://localhost:3000/notValid");
            expect(result.status).toEqual(404);
        } catch (error) {
            expect(error.response.status).toEqual(404);
        }
    });

    it("Makes a valid request to the API with repeated phonenumbers", async() => {
        const request = ["+1983248", "001382355", "001382355", "001382355"];
        const expectedResult = {
            1: { Technology: 4 }
        };

        let result = await axios.post("http://localhost:3000/aggregate", request);

        expect(result.data).toEqual(expectedResult);
        expect(result.status).toEqual(200);
    });

    it("Makes a request to the API with an empty array", async() => {
        const request = [];
        try {
            let result = await axios.post("http://localhost:3000/aggregate", request);
            expect(result.status).toEqual(400);
        } catch (error) {
            expect(error.response.status).toEqual(400);
        }
    });

    it("Makes a request to the API with just one invalid number", async() => {
        const request = ['abc'];
        try {
            let result = await axios.post("http://localhost:3000/aggregate", request);
            expect(result.status).toEqual(400);
        } catch (error) {
            expect(error.response.status).toEqual(400);
        }
    });

    it("Makes a request to the API with several invalid numbers", async() => {
        const request = ["abc", "99999999"];
        try {
            let result = await axios.post("http://localhost:3000/aggregate", request);
            expect(result.status).toEqual(400);
        } catch (error) {
            expect(error.response.status).toEqual(400);
        }
    });

});