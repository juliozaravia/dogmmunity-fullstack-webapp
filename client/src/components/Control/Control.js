import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import { fetchAllTemperaments, updateDogsContainer, paginationUpdater } from '../../actions';

import css from './Control.module.css';
import gen from '../../utils/styles/General.module.css';

const Control = ({
	originalDogs,
	filteredDogs,
	temperaments,
	pagination,
	fetchAllTemperaments,
	updateDogsContainer,
	paginationUpdater
}) => {
	const [controlState, setControlState] = useState({
		tempList: false,
		alphaList: false,
		weightList: false
	});

	const tempRef = useRef();
	const alphaRef = useRef();
	const weightRef = useRef();

	useEffect(() => {
		fetchAllTemperaments();

		let dogListContainer = originalDogs.original;
		if (controlState.tempList || controlState.alphaList || controlState.weightList) {
			dogListContainer = filteredDogs.result;
		}

		let numberOfPages = Math.ceil(dogListContainer.size / pagination.range);
		if (pagination.selected > numberOfPages) {
			paginationUpdater(1, 0, 8);
		}
	}, [filteredDogs]);

	const temperamentsLoader = () => {
		let processedTemperaments = temperaments.result.map((temperament) => {
			let formattedTempName = `${temperament.name.charAt(0).toUpperCase()}${temperament.name.slice(1)}`;
			return (
				<option key={temperament.id} value={temperament.name}>
					{formattedTempName}
				</option>
			);
		});
		processedTemperaments.unshift(<option key="SYT" value="SYT">Select option</option>);
		return processedTemperaments;
	};

	const temperamentOrganizer = (event) => {
		event.preventDefault();
		alphaRef.current.value = 'SYAO';
		weightRef.current.value = 'SYWO';
		let value = event.target.value;
		let filteredDogList;
		setControlState({ ...controlState, alphaList: false, weightList: false });

		if (value === 'SYT') {
			setControlState({ ...controlState, tempList: false });
			let dogListContainer = originalDogs.original.data;
			filteredDogList = dogListContainer;
		} else {
			setControlState({ ...controlState, tempList: true });
			let dogListContainer = originalDogs.original.data;
			filteredDogList = dogListContainer.filter((dog) => dog.temperament.includes(value));
		}
		updateDogsContainer(filteredDogList);
	};

	const alphabeticOrganizer = (event) => {
		event.preventDefault();
		weightRef.current.value = 'SYWO';

		let value = event.target.value;
		if (value === 'SYAO') {
			setControlState({ ...controlState, alphaList: false });
		} else {
			setControlState({ ...controlState, alphaList: true });
			let dogListContainer = originalDogs.original.data;
			if (controlState.tempList || controlState.weightList) {
				dogListContainer = filteredDogs.result.data;
			}
			let orderedDogList = dogListContainer.sort((firstItem, secondItem) => {
				if (value === 'ASC') {
					if (firstItem.name < secondItem.name) return -1;
					if (firstItem.name > secondItem.name) return 1;
				} else if (value === 'DSC') {
					if (firstItem.name < secondItem.name) return 1;
					if (firstItem.name > secondItem.name) return -1;
				}
				return 0;
			});
			updateDogsContainer(orderedDogList);
		}
	};

	const weightOrganizer = (event) => {
		event.preventDefault();
		alphaRef.current.value = 'SYAO';

		let value = event.target.value;
		if (value === 'SYWO') {
			setControlState({ ...controlState, weightList: false });
		} else {
			setControlState({ ...controlState, weightList: true });
			let dogListContainer = originalDogs.original.data;
			if (controlState.tempList || controlState.alphaList) {
				dogListContainer = filteredDogs.result.data;
			}
			let orderedDogList = dogListContainer.sort((firstItem, secondItem) => {
				if (value === 'ASC') {
					if (firstItem.weight < secondItem.weight) return -1;
					if (firstItem.weight > secondItem.weight) return 1;
				} else if (value === 'DSC') {
					if (firstItem.weight < secondItem.weight) return 1;
					if (firstItem.weight > secondItem.weight) return -1;
				}
				return 0;
			});
			updateDogsContainer(orderedDogList);
		}
	};

	return (
		<ul className={css.controlList}>
			<li className={`${css.controlItem} ${css.controlPrincipal}`}>
				<div>
					<label htmlFor="idTempList" className={gen.inputLabel}><span className={gen.specialLabel}>Filter by</span> dog temperament:</label>
				</div>
				<div>
					<select ref={tempRef} id="idTempList" onChange={temperamentOrganizer} className={gen.selector} >
						{temperamentsLoader()}
					</select>
				</div>
			</li>
			<li className={`${css.controlItem} ${css.controlSecondary}`}>
				<div>
					<label htmlFor="idAlphaList" className={gen.inputLabel}><span className={gen.specialLabel}>Filter by</span> alphabetic order:</label>
				</div>
				<div>
					<select ref={alphaRef} id="idAlphaList" onChange={alphabeticOrganizer} className={gen.selector} >
						<option value='SYAO'>Select order</option>
						<option value='ASC'>A to Z</option>
						<option value='DSC'>Z to A</option>
					</select>
				</div>
			</li>
			<li className={`${css.controlItem} ${css.controlSecondary}`}>
				<div>
					<label htmlFor="idWeightList" className={gen.inputLabel}><span className={gen.specialLabel}>Filter by</span> weight:</label>
				</div>
				<div>
					<select ref={weightRef} id="idWeightList" onChange={weightOrganizer} className={gen.selector} >
						<option value='SYWO'>Select order</option>
						<option value='DSC'>Higher to lower</option>
						<option value='ASC'>Lower to higher</option>
					</select>
				</div>
			</li>
		</ul>
	);
};

const mapsStateToProps = (state) => {
	return {
		filteredDogs: state.updateDogsReducer.dogs,
		originalDogs: state.dogsReducer.dogs,
		temperaments: state.temperamentsReducer.temperaments,
		pagination: state.paginationReducer.pagination
	}
};

const mapDispatchToProps = {
	fetchAllTemperaments, updateDogsContainer, paginationUpdater
};

export default connect(mapsStateToProps, mapDispatchToProps)(Control);