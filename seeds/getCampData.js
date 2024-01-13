const fs = require("fs");
const path = require('path');
const dotenv = require('dotenv');
const {getStateName} = require('./stateLookup.js')

dotenv.config();

const apiUrl = 'https://developer.nps.gov/api/v1/campgrounds';
const apiKey = process.env.NPS_KEY;
const limit = 10;

const url = `${apiUrl}?limit=${limit.toString()}&api_key=${apiKey}`;

const options = {
    method: 'GET'
};

fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let array = [];
        for (let x = 0; x < limit; x++){
            const camp = data.data[x];
            if (camp.addresses.length && camp.fees.length){
                const campObj = {
                    name: camp.name,
                    latitude: Number(camp.latitude),
                    longitude: Number(camp.longitude),
                    city: camp.addresses[0].city,
                    state: getStateName(camp.addresses[0].stateCode),
                    price: Number(camp.fees[0].cost),
                    description: camp.description,
                };
                array.push(campObj);
            }
        }

        // converting the JSON object to a string
        const campData = `module.exports = ${JSON.stringify(array, undefined, 2)};`;
        // writing the JSON string content to a file
        fs.writeFile(path.join(__dirname, 'campData.js'), campData, (error) => {
            // throwing the error in case of a writing problem
            if (error) {
                // logging the error
                console.error(error);
                throw error;
            }
            console.log("data.json written correctly");
        });
    })
    .catch(error => {
        console.error('Error:', error);
});