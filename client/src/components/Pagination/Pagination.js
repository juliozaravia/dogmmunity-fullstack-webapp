import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { paginationUpdater } from '../../actions';

import css from './Pagination.module.css';
import dogJump from '../../utils/images/dogjump.jpg';
import dogPetting from '../../utils/images/dogpet.jpg';

const Pagination = ({ dogs, filteredDogs, pagination, paginationUpdater }) => {
	const [position, setPosition] = useState({ begin: 1, end: 8 });

	useEffect(() => {
		setPosition({ begin: 1, end: 8 });
	}, [filteredDogs]);

	const paginationHandler = (event) => {
		event.preventDefault();
		let clickedPage = event.target.getAttribute('href');
		let end = pagination.range * clickedPage;
		let begin = end - pagination.range;
		paginationUpdater(clickedPage, begin, end);
	};

	const navigationHandler = (event) => {
		event.preventDefault();

		let value = event.target.getAttribute('href');
		if (value === 'moveBackward') {
			setPosition({
				begin: position.begin - pagination.range,
				end: position.end - pagination.range
			});
		} else if (value === 'moveForward') {
			setPosition({
				begin: position.begin + pagination.range,
				end: position.end + pagination.range
			});
		}
	};

	const paginationLoader = () => {
		let numberOfPages = Math.ceil(dogs.result.size / pagination.range);
		let processedPagination = [];
		for (let index = position.begin; index <= position.end; index++) {
			if (index <= numberOfPages) {
				let linkClass = `${css.pageLink}`;
				if (Number(pagination.selected) === index) {
					linkClass = `${css.pageLinkSelected} ${css.pageLink}`;
				}
				processedPagination.push(
					<li key={index} className={css.pageItem}>
						<a onClick={paginationHandler}
							href={index}
							className={linkClass}>
							{index}
						</a>
					</li>
				);
			}
		}

		if (position.begin > 1) {
			processedPagination.unshift(
				<li key={'moveBackward'} className={css.pageItem}>
					<a onClick={navigationHandler} href={'moveBackward'} className={css.pageLink}>Less</a>
				</li>);
		}

		if (position.end <= numberOfPages) {
			processedPagination.push(
				<li key={'moveForward'} className={css.pageItem}>
					<a onClick={navigationHandler} href={'moveForward'} className={css.pageLink}>More</a>
				</li>);
		}

		return processedPagination;
	};

	return (
		<div className={css.paginationPosition}>
			<figure className={css.imageFooterLeft}><img src={dogJump} alt="Dogmunnity!" /></figure>
			<figure className={css.imageFooterRight}><img src={dogPetting} alt="Dogmunnity!" /></figure>
			<ul className={css.pageList}>
				{paginationLoader()}
			</ul>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		dogs: state.updateDogsReducer.dogs.status === 'filtered' ? state.updateDogsReducer.dogs : state.dogsReducer.dogs,
		pagination: state.paginationReducer.pagination,
		filteredDogs: state.updateDogsReducer.dogs,
	}
};
const mapDispatchToProps = { paginationUpdater }

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);