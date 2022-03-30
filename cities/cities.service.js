const NotFoundError = require('../common/errors/not-found.error');
const citiesRepository = require('./cities.repository');
module.exports = {
    async getCityData(zipCode) {
        try {
            const cities = await citiesRepository.getCityDataByZipCode(zipCode);
            const country = (cities).country;
            const city = (cities).places[0]["place name"];
            const abbr = (cities).places[0]["state abbreviation"];
            const res = "" + city + ", " + abbr + ", " + country;
            return res;
        }
        catch (err) {
            throw new NotFoundError(`City with zipcode = ${zipCode} is not found!`);
        }
    }
}