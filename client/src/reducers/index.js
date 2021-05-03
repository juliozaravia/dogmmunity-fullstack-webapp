import { combineReducers } from 'redux';

import INITIAL_STATE from '../globals/initialState';
import * as TYPE from '../globals/actionTypes';

const fetchAllDogsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TYPE.FETCH_ALL_DOGS:
			return {
				...state,
				dogs: {
					status: 'original',
					original: {
						size: action.payload.length,
						data: action.payload
					},
					result: {
						size: action.payload.length,
						data: action.payload
					}
				}
			}
		default:
			return state;
	}
};

const fetchDogByIdReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TYPE.FETCH_DOG_BY_ID:
			return {
				...state,
				foundedDog: {
					status: 'founded',
					data: action.payload
				}
			}
		default:
			return state;
	}
};

const fetchAllTemperamentsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TYPE.FETCH_ALL_TEMPERAMENTS:
			return {
				...state,
				temperaments: {
					status: 'filled',
					total: action.payload.length,
					result: action.payload
				}
			}
		default:
			return state;
	}
};

const updateDogsContainerReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TYPE.UPDATE_DOGS_CONTAINER:
			return {
				...state,
				dogs: {
					...state.dogs,
					status: 'filtered',
					result: {
						size: action.payload.length,
						data: action.payload
					}
				}
			}
		default:
			return state;
	}
};

const sendDogToDbReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TYPE.SEND_DOG_TO_DB:
			return {
				...state,
				createdDog: {
					status: 'created',
					data: action.payload
				}
			}
		default:
			return state;
	}
};

const paginationUpdaterReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TYPE.SELECT_PAGE:
			return {
				...state,
				pagination: {
					range: action.payload.range,
					selected: action.payload.page,
					begin: action.payload.begin,
					end: action.payload.end
				}
			};
		default:
			return state;
	}
};

export default combineReducers({
	dogsReducer: fetchAllDogsReducer,
	foundedDogReducer: fetchDogByIdReducer,
	createdDogReducer: sendDogToDbReducer,
	temperamentsReducer: fetchAllTemperamentsReducer,
	updateDogsReducer: updateDogsContainerReducer,
	paginationReducer: paginationUpdaterReducer,
});