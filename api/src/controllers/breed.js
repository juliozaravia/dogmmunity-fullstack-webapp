const Sequelize = require('sequelize');
const axios = require('axios');
const { v4: uuid } = require('uuid');
const Op = Sequelize.Op;
const chalk = require('chalk');

const { Breed, Temperament } = require('../db');
const { BASE_URL, BREEDS_URL, BREEDS_SEARCH_URL } = require('../utils/globals');

const getAllBreeds = (req, res, next) => {
	let breedApiContainer;
	let breedDbContainer;
	let imageControl = false;
	if (req.query.name) {
		let breedRequested = req.query.name.toLowerCase();
		breedApiContainer = axios.get(`${BASE_URL}${BREEDS_URL}${BREEDS_SEARCH_URL}${breedRequested}`)
		breedDbContainer = Breed.findAll({
			where: {
				name: {
					[Op.like]: '%' + breedRequested.replace(/%20/g, ' ') + '%'
				},
			},
			include: { model: Temperament }
		});
		imageControl = true;
	} else {
		breedApiContainer = axios.get(`${BASE_URL}${BREEDS_URL}`)
		breedDbContainer = Breed.findAll({
			include: { model: Temperament }
		});
	}

	Promise.all([breedApiContainer, breedDbContainer])
		.then((response) => {
			let [breedApiResponse, breedDbResponse] = response;

			let processedBreedApiResponse = breedApiResponse.data.map((breed) => {
				let temperamentsContainer = [];
				if (breed.temperament) {
					let splittedTemperaments = breed.temperament.split(',');
					temperamentsContainer = splittedTemperaments.map((temperament) => {
						if (temperament.charAt(0) === ' ') {
							temperament = temperament.substring(1);
						}
						return temperament.toLowerCase();
					});
				}

				let splittedWeight = breed.weight.metric.split(' ');
				let processedWeight = 0;
				if (splittedWeight.length > 1) {
					let firstWeight = Number(splittedWeight[0]) || 0;
					let secondWeight = Number(splittedWeight[2]) || 0;
					processedWeight = Math.floor((Number(secondWeight) + Number(firstWeight)) / 2);
				} else {
					processedWeight = splittedWeight[0] || 0;
				}

				let imageProperty = '';
				if (imageControl) {
					imageProperty = breed.reference_image_id;
				} else {
					imageProperty = breed.image.url;
				}

				return {
					id: breed.id,
					name: breed.name.toLowerCase(),
					weight: processedWeight,
					height: breed.height.metric,
					life_span: breed.life_span,
					image: imageProperty,
					origin: 'apiRequest',
					temperament: temperamentsContainer
				}
			});

			let processedBreedDbResponse = breedDbResponse.map((breed) => {
				let temperamentsContainer = breed.dataValues.temperaments.map((temperament) => {
					return temperament.dataValues.name;
				});

				return {
					id: breed.dataValues.id,
					name: breed.dataValues.name.toLowerCase(),
					weight: breed.dataValues.weight,
					height: breed.dataValues.height,
					life_span: breed.dataValues.life_span,
					image: breed.dataValues.image,
					origin: 'dbRequest',
					temperament: temperamentsContainer
				}
			});

			console.log(`${chalk.black.bgGreen(' <STATUS : COMPLETE> ')} The request was successfully completed [GET /breed].`);
			return res.status(200).json(processedBreedDbResponse.concat(processedBreedApiResponse));
		}).catch((err) => next(err));
};

const addBreed = (req, res, next) => {
	const id = uuid();
	const breedFromBody = { ...req.body, id };

	let createdBreed;
	Breed.findOrCreate({
		where: {
			name: breedFromBody.name.toLowerCase()
		},
		defaults: {
			id: breedFromBody.id,
			weight: breedFromBody.weight,
			height: breedFromBody.height,
			life_span: breedFromBody.life_span,
			image: breedFromBody.image,
			origin: breedFromBody.origin
		}
	}).then((createdBreedArray) => {
		createdBreed = createdBreedArray[0];
		breedFromBody.temperament.forEach((temperament) => {
			createdBreed.addTemperament(temperament)
		});
		console.log(`${chalk.black.bgGreen(' <STATUS : COMPLETE> ')} The request was successfully completed [POST /breed].`);
		res.status(200).send(createdBreed);
	}).catch((err) => next(err));
};

const getBreedById = (req, res, next) => {
	let givenID = req.params.id;
	let foundedBreed;
	let processedBreed;

	breedApiContainer = axios.get(`${BASE_URL}${BREEDS_URL}`);
	breedApiContainer.then((breed) => {
		for (let index = 0; index < breed.data.length; index++) {
			if (`${breed.data[index].id}` === givenID) {
				foundedBreed = breed.data[index];
				break;
			}
		}

		if (foundedBreed) {
			let temperamentsContainer = [];
			if (foundedBreed.temperament) {
				let splittedTemperaments = foundedBreed.temperament.split(',');
				temperamentsContainer = splittedTemperaments.map((temperament) => {
					if (temperament.charAt(0) === ' ') {
						temperament = temperament.substring(1);
					}
					return temperament;
				});
			}

			let splittedWeight = foundedBreed.weight.metric.split(' ');
			let processedWeight = 0;
			if (splittedWeight.length > 1) {
				let firstWeight = Number(splittedWeight[0]) || 0;
				let secondWeight = Number(splittedWeight[2]) || 0;
				processedWeight = Math.floor((Number(secondWeight) + Number(firstWeight)) / 2);
			} else {
				processedWeight = splittedWeight[0] || 0;
			}

			processedBreed = {
				id: foundedBreed.id,
				name: foundedBreed.name,
				weight: processedWeight,
				height: foundedBreed.height.metric,
				life_span: foundedBreed.life_span,
				image: foundedBreed.reference_image_id,
				origin: 'apiRequest',
				temperament: temperamentsContainer
			}

			console.log(`${chalk.black.bgGreen(' <STATUS : COMPLETE> ')} The request was successfully completed [GET /breed <byID>].`);
			res.status(200).json(processedBreed);
		} else {
			Breed.findByPk(givenID,
				{ include: { model: Temperament } })
				.then((breed) => {
					foundedBreed = breed.dataValues;
					let temperamentsContainer = foundedBreed.temperaments.map((temperament) => {
						return temperament.dataValues.name;
					});

					processedBreed = {
						id: foundedBreed.id,
						name: foundedBreed.name,
						weight: foundedBreed.weight,
						height: foundedBreed.height,
						life_span: foundedBreed.life_span,
						description: foundedBreed.description,
						image: foundedBreed.image,
						origin: foundedBreed.origin,
						temperament: temperamentsContainer
					}

					console.log(`${chalk.black.bgGreen(' <STATUS : COMPLETE> ')} The request was successfully completed [GET /breed <byID>].`);
					res.status(200).json(processedBreed);
				}).catch((err) => next(err));
		}
	}).catch((err) => next(err));
};

module.exports = {
	getAllBreeds,
	getBreedById,
	addBreed
}