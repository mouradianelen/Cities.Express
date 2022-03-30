const axios = require('axios');

module.exports = {
    async getCityDataByZipCode(zipCode) {
        const res = await axios.get(`https://api.zippopotam.us/us/${zipCode}`);
        return res.data;
    }
}
