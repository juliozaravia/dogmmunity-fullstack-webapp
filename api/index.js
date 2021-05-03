const chalk = require('chalk');

const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
	console.log(`${chalk.black.bgGreen(' <STATUS : COMPLETE> ')} Server started and running successfully.`);
	server.listen(3001, () => {
		console.log(`${chalk.black.bgGreen(' <STATUS : COMPLETE> ')} Server listening on port 3001.`);
	});
});
