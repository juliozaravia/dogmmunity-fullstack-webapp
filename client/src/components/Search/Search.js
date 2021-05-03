import React, { useState } from 'react';
import { connect } from 'react-redux';

import { fetchAllDogs } from '../../actions';

import css from './Search.module.css';
import gen from '../../utils/styles/General.module.css';

const Search = ({ dogs, fetchAllDogs }) => {
	const [term, setTerm] = useState('');

	const submitHandler = (event) => {
		event.preventDefault();
		fetchAllDogs(term);
	};

	return (
		<div>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor="inputBreed" className={gen.inputLabel}><span className={gen.specialLabel}>Search by</span> dog breed:</label>
				</div>
				<div>
					<input id="inputBreed" name="inputBreed" type="text" value={term} onChange={(e) => setTerm(e.target.value)} className={css.inputSearch} placeholder="Enter the dog breed here" />
					<button type="submit" className={css.buttonSearch}>Search</button>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		dogs: state.dogsReducer.dogs
	}
};

const mapDispatchToProps = { fetchAllDogs };

export default connect(mapStateToProps, mapDispatchToProps)(Search);