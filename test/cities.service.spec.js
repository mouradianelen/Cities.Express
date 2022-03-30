const rewire = require("rewire");
const citiesService = rewire('../cities/cities.service');
const faker = require("faker");
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const spies = require('chai-spies');
const NotFoundError = require('../common/errors/not-found.error');

const citiesRepository = require("../cities/cities.repository");
chai.use(spies);
chai.use(expect);

describe('Should return the string',  () =>{
    it("Correct case",  async () => {
        const stubValue =
        {
            "post code": 94105,
            "country": faker.address.country(),
            "country abbreviation": faker.lorem.word(),
            "places":
                [{
                    "place name": faker.address.city(),
                    "longitude": faker.random.number(),
                    "state": faker.random.locale(),
                    "state abbreviation": faker.lorem.word(),
                    "latitude": faker.random.number()
                }]
        };

        const expectedAnswer = await ""+stubValue.places[0]["place name"]+", "+
        stubValue.places[0]["state abbreviation"]+", "+stubValue.country;
        console.log(expectedAnswer);
        console.log("----------------");
        sinon.stub(citiesRepository,'getCityDataByZipCode').returns(stubValue);
        const data = await citiesService.getCityData();
        console.log(data);
        
        expect(data).to.equal(expectedAnswer);
     });
     it("Should throw an error",  async () => {
        const stubValue1 =
        {
            "post code": 94105,
            "country": faker.address.country(),
            "country abbreviation": faker.lorem.word(),
            "places":
                [{
                    "incorrectprop": faker.address.city(),
                    "longitude": faker.random.number(),
                    "state": faker.random.locale(),
                    "state abbreviation": faker.lorem.word(),
                    "latitude": faker.random.number()
                }]
        };

        
        console.log("----------------");
        const spy = sinon.stub(citiesRepository,'getCityDataByZipCode').returns(stubValue1);
        
        await expect(citiesService.getCityData()).to.throw(NotFoundError);
     });
     afterEach(() => {
        citiesRepository.getCityDataByZipCode.restore();
    });

})
