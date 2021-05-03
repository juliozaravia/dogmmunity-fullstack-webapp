const INITIAL_STATE = {
	pagination: {
		range: 8,
		selected: 1,
		begin: 0,
		end: 8
	},
	dogs: {
		status: 'empty',
		original: {
			size: 0,
			data: []
		},
		result: {
			size: 0,
			data: []
		}
	},
	foundedDog: {
		status: 'empty',
		data: {}
	},
	createdDog: {
		status: 'empty',
		data: {}
	},
	temperaments: {
		status: 'empty',
		total: 0,
		result: []
	}
}

export default INITIAL_STATE;