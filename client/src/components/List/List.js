import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchAllDogs } from '../../actions';
import Item from '../Item/Item';

import css from './List.module.css';
import gen from '../../utils/styles/General.module.css';

const List = ({ dogs, pagination, fetchAllDogs }) => {
	useEffect(() => {
		fetchAllDogs('');
	}, []);

	const dogsLoader = () => {
		let filteredDogs = dogs.result.data.slice(pagination.begin, pagination.end);
		let processedDogs = filteredDogs.map((dog) => {
			return (
				<li key={dog.id} className={css.listItem}>
					<Item key={dog.id} dog={dog} />
				</li>
			);
		});
		return processedDogs;
	};

	return (
		<div>
			<div className={css.dogCounter}>{dogs.result.size} dog breeds found</div>
			<div className={`${css.emptySearch} ${gen.normalSeparatorTop} ${dogs.result.size ? gen.hiddenBlock : gen.showBlock}`}>
				No results for your search. Please try another search term.
			</div>
			<ul className={css.listList}>{dogsLoader()}</ul>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		dogs: state.updateDogsReducer.dogs.status === 'filtered' ? state.updateDogsReducer.dogs : state.dogsReducer.dogs,
		pagination: state.paginationReducer.pagination,
	}
};

const mapDispatchToProps = { fetchAllDogs };

export default connect(mapStateToProps, mapDispatchToProps)(List);