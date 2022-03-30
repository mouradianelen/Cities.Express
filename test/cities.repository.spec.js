const chai = require("chai");
const axios = require("axios");
const citiesRepository = require('../cities/cities.repository');
const sinon = require("sinon");
const spies = require('chai-spies');
chai.use(spies);
describe('get city', function () {
    it("Get city", () => {
        const spy = sinon.stub(citiesRepository, 'getCityDataByZipCode').resolves({ zipCode: 19807 });
        spy.callsFake(() => {
            sinon.assert.calledOnceWithExactly(spy); 
            done();
        })
    });
    after(() => {
        citiesRepository.getCityDataByZipCode.restore();
    });

})
