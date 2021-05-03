require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = require('./utils/globals');
const { dbPopulator } = require('./utils/loaders');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
	logging: false, // set to console.log to see the raw SQL queries
	native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
	.filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

console.log(`${chalk.black.bgGreen(' <STATUS : COMPLETE> ')} The models were created successfully.`);

const { Breed, Temperament } = sequelize.models;

Breed.belongsToMany(Temperament, { through: 'breedxtemperament' });
Temperament.belongsToMany(Breed, { through: 'breedxtemperament' });
console.log(`${chalk.black.bgGreen(' <STATUS : COMPLETE> ')} The relations were created successfully.`);

dbPopulator(Temperament);

module.exports = {
	...sequelize.models,
	conn: sequelize,
};
