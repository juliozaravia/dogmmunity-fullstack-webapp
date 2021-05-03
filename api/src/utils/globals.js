const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, API_KEY } = process.env;

const BASE_URL = "https://api.thedogapi.com/v1";
const BREEDS_URL = "/breeds";
const BREEDS_SEARCH_URL = "/search?q=";

module.exports = {
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_NAME,
	BASE_URL,
	BREEDS_URL,
	BREEDS_SEARCH_URL,
	API_KEY
};