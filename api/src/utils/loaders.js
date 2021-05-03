const axios = require('axios');
const { v4: uuid } = require('uuid');
const chalk = require('chalk');

const { BASE_URL, BREEDS_URL } = require('./globals');

const dbPopulator = (modelTemperament) => {
	const breedContainer = axios.get(`${BASE_URL}${BREEDS_URL}`);

	breedContainer.then((result) => {
		let mixedTemperaments = result.data.map((breed) => {
			if (breed.temperament) {
				return breed.temperament;
			}
		});

		let individualTemperaments = [];
		mixedTemperaments.forEach((temperamentString) => {
			if (temperamentString) {
				let temperamentContainer = temperamentString.split(',');
				temperamentContainer.forEach((temperament) => {
					if (temperament.charAt(0) === ' ') {
						temperament = temperament.substring(1);
					}
					individualTemperaments.push(temperament.toLowerCase());
				});

			}
		});

		let filteredTemperaments = [...new Set(individualTemperaments)];
		let processedTemperaments = filteredTemperaments.map((temperamentName) => {
			let id = uuid();
			return {
				id,
				name: temperamentName
			}
		});
		return modelTemperament.bulkCreate(processedTemperaments);
	}).then((createdTemperaments) => {
		console.log(`${chalk.black.bgGreen(' <STATUS : COMPLETE> ')} ${createdTemperaments.length} records were successfully inserted into the TEMPERAMENTS TABLE.`);
	}).catch((err) => console.log(err));
};

module.exports = {
	dbPopulator
};