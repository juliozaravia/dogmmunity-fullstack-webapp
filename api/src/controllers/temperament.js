const { Temperament } = require('../db');
const chalk = require('chalk');

const getAllTemperaments = (req, res, next) => {
	Temperament.findAll().then((temperaments) => {
		processedTemperaments = temperaments.map((temperament) => {
			return {
				id: temperament.dataValues.id,
				name: temperament.dataValues.name
			}
		});
		console.log(`${chalk.black.bgGreen(' <STATUS : COMPLETE> ')} The request was successfully completed [GET /temperaments].`);
		res.status(200).json(processedTemperaments);
	}).catch((err) => next(err));
};

module.exports = {
	getAllTemperaments
}