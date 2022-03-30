const rewire = require("rewire");
const citiesService = rewire('../cities/cities.service');
const faker = require("faker");
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const spies = require('chai-spies');
const NotFoundError = require('../common/errors/not-found.error');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const citiesRepository = require("../cities/cities.repository");
chai.use(spies);

describe('Should return the string', () => {
    it("Correct case", async () => {
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

        const expectedAnswer = await "" + stubValue.places[0]["place name"] + ", " +
            stubValue.places[0]["state abbreviation"] + ", " + stubValue.country;

        sinon.stub(citiesRepository, 'getCityDataByZipCode').returns(stubValue);
        const data = await citiesService.getCityData();

        expect(data).to.equal(expectedAnswer);
    });
    it("Should throw an error", async () => {
        const stubValue1 =
            {};
        sinon.stub(citiesRepository, 'getCityDataByZipCode').returns(stubValue1);
        expect(citiesService.getCityData()).to.be.rejectedWith(NotFoundError);
    });
    afterEach(() => {
        citiesRepository.getCityDataByZipCode.restore();
    });

})
