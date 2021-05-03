import dogApi from '../apis/dogApi';
import * as TYPE from '../globals/actionTypes';

export const fetchAllDogs = (breed) => {
	return async (dispatch) => {
		const { data } = await dogApi.get(`/dogs?name=${breed}`);
		dispatch({
			type: TYPE.FETCH_ALL_DOGS,
			payload: data
		});
	};
};

export const fetchDogById = (id) => {
	return async (dispatch) => {
		const { data } = await dogApi.get(`/dogs/${id}`);
		dispatch({
			type: TYPE.FETCH_DOG_BY_ID,
			payload: data
		});
	};
};

export const fetchAllTemperaments = () => {
	return async (dispatch) => {
		const { data } = await dogApi.get('/temperaments');
		dispatch({
			type: TYPE.FETCH_ALL_TEMPERAMENTS,
			payload: data
		});
	};
};

export const updateDogsContainer = (data) => {
	return async (dispatch) => {
		dispatch({
			type: TYPE.UPDATE_DOGS_CONTAINER,
			payload: data
		});
	};
};

export const sendDogToDb = (dog) => {
	return async (dispatch) => {
		const { data } = await dogApi.post('/dogs', dog);
		dispatch({
			type: TYPE.SEND_DOG_TO_DB,
			payload: data
		});
	}
};

export const paginationUpdater = (page, begin, end) => {
	return {
		type: TYPE.SELECT_PAGE,
		payload: {
			range: 8,
			page,
			begin,
			end
		}
	};
};