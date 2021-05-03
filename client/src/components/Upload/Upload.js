import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAllTemperaments, sendDogToDb } from '../../actions';

import css from './Upload.module.css';
import gen from '../../utils/styles/General.module.css';
import lateral from '../../utils/images/petting.jpg';

const Upload = ({ createdDog, temperaments, fetchAllTemperaments, sendDogToDb }) => {
	useEffect(() => {
		fetchAllTemperaments();
	}, []);

	const [formData, setFormData] = useState({
		name: '',
		weight: '',
		height: '',
		life_span: '',
		image: '',
		origin: 'dbRequest',
		temperament: []
	});

	const [tempList, setTempList] = useState([]);
	const [isHidden, setIsHidden] = useState(true);

	const tempRef = useRef();

	const temperamentsLoader = () => {
		let processedTemperaments = temperaments.result.map((temperament) => {
			let formattedTempName = `${temperament.name.charAt(0).toUpperCase()}${temperament.name.slice(1)}`;
			return (
				<option key={temperament.id} value={temperament.id}>{formattedTempName}</option>
			);
		});
		processedTemperaments.unshift(<option key="SYT" value="SYT">Select temperament</option>);
		return processedTemperaments;
	};

	const stateUpdater = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		let key = name.substring(4, name.length);
		let auxData = {};

		if (key === 'temperament') {
			if (value !== 'SYT' && !formData.temperament.includes(value)) {
				auxData[key] = [...formData.temperament, value]

				setTempList([
					...tempList,
					{
						id: value,
						name: event.target[event.target.selectedIndex].text
					}
				]);

				setFormData({ ...formData, ...auxData });
			}
		} else {
			auxData[key] = value;
			setFormData({ ...formData, ...auxData });
		}
	};

	const selectedTemperamentRemover = (event) => {
		event.preventDefault();
		let selectedTemperamentID = event.target.getAttribute('href');
		let filteredTempList = tempList.filter((temperament) => temperament.id !== selectedTemperamentID);
		setTempList([...filteredTempList]);
		let filteredFormData = formData.temperament.filter((temperamentID) => temperamentID !== selectedTemperamentID);
		setFormData({
			...formData,
			temperament: [...filteredFormData]
		})
	};

	const selectedTemperamentLoader = () => {
		let formattedTemperaments = [];
		if (tempList.length !== 0) {
			formattedTemperaments = tempList.map((temperament) => {
				return (
					<a key={temperament.id} href={temperament.id} onClick={selectedTemperamentRemover} className={css.temperamentBlock}>
						{temperament.name} &times;
					</a>
				);
			});
		} else {
			formattedTemperaments.push('NoTemperamentsSelected');
		}
		return formattedTemperaments;
	};

	const blockHider = (event) => {
		event.preventDefault();
		setIsHidden(true);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		sendDogToDb(formData);
		setFormData({
			name: '',
			weight: '',
			height: '',
			life_span: '',
			image: '',
			origin: 'dbRequest',
			temperament: []
		});
		setTempList([]);
		tempRef.current.value = 'SYT';
		setIsHidden(false);
	};

	return (
		<div>
			<section className={`${gen.outerContainer}`}>
				<section className={`${gen.innerContainer} ${gen.subMinimalPadding}`}>
					<Link to={`/dogs`} className={gen.breadcrumbsLink}>Home</Link> &rarr; Create dog breed
				</section>
			</section>
			<section className={`${gen.outerContainer} ${gen.blockSeparator}`}>
				<section className={`${gen.innerContainer} ${gen.normalPadding}`}>
					<div className={css.itemHalf}>
						<figure className={css.welcomeBlock}>
							<img src={lateral} alt="Welcome to Dogmunnity" />
						</figure>
					</div>
					<div className={`${css.itemHalf} ${css.itemDescription}`}>
						<div className={css.formTitle}>Create doge</div>
						<div className={gen.normalSeparatorTop}>
							<form onSubmit={submitHandler}>
								<div>
									<div className={css.labelCreate}>
										<label htmlFor="dog_name" className={css.labelForm}><span className={css.colorAqua}>&mdash;</span> &nbsp;Name:</label>
									</div>
									<div className={css.inputCreate}>
										<input type="text" id="dog_name" name="dog_name" onChange={stateUpdater} value={formData.name} className={css.inputForm} placeholder="Enter the name here" required />
									</div>
								</div>
								<div className={gen.normalSeparatorTop}>
									<div className={css.labelCreate}>
										<label htmlFor="dog_weight" className={css.labelForm}><span className={css.colorAqua}>&mdash;</span> &nbsp;Weight:</label>
									</div>
									<div className={css.inputCreate}>
										<input type="text" id="dog_weight" name="dog_weight" onChange={stateUpdater} value={formData.weight} className={css.inputForm} placeholder="Enter the weight here" required />
									</div>
								</div>
								<div className={gen.normalSeparatorTop}>
									<div className={css.labelCreate}>
										<label htmlFor="dog_height" className={css.labelForm}><span className={css.colorAqua}>&mdash;</span> &nbsp;Height:</label>
									</div>
									<div className={css.inputCreate}>
										<input type="text" id="dog_height" name="dog_height" onChange={stateUpdater} value={formData.height} className={css.inputForm} placeholder="Enter the height here" required />
									</div>
								</div>
								<div className={gen.normalSeparatorTop}>
									<div className={css.labelCreate}>
										<label htmlFor="dog_life_span" className={css.labelForm}><span className={css.colorAqua}>&mdash;</span> &nbsp;Life span:</label>
									</div>
									<div className={css.inputCreate}>
										<input type="text" id="dog_life_span" name="dog_life_span" onChange={stateUpdater} value={formData.life_span} className={css.inputForm} placeholder="Enter the life span here" required />
									</div>
								</div>
								<div className={gen.normalSeparatorTop}>
									<div className={css.labelCreate}>
										<label htmlFor="dog_image" className={css.labelForm}><span className={css.colorAqua}>&mdash;</span> &nbsp;Image URL:</label>
									</div>
									<div className={css.inputCreate}>
										<input type="text" id="dog_image" name="dog_image" onChange={stateUpdater} value={formData.image} className={css.inputForm} placeholder="Enter the image URL here" required />
									</div>
								</div>
								<div className={gen.normalSeparatorTop}>
									<div className={css.labelCreate}>
										<label htmlFor="dog_temperament" className={css.labelForm}><span className={css.colorAqua}>&mdash;</span> &nbsp;Temperaments:</label>
									</div>
									<div className={css.inputCreate}>
										<select ref={tempRef} id="dog_temperament" name="dog_temperament" onChange={stateUpdater} className={gen.selector} required>
											{temperamentsLoader()}
										</select>
									</div>
								</div>
								<div className={tempList.length ? gen.normalSeparatorTop : gen.hiddenBlock}>
									{selectedTemperamentLoader()}
								</div>
								<div className={gen.maximalSeparatorTop}>
									<button type="submit" id="sendButton" name="sendButton" className={gen.buttonSubmit}>Create</button>
								</div>
								<a href={"StatusMessage"} className={isHidden ? css.hiddenBlock : css.okStatusMessage} onClick={blockHider}>
									The dog breed was created successfully! &nbsp; &times;
								</a>
							</form>
						</div>
					</div>
				</section>
			</section>
		</div >
	);
};

const mapStateToProps = (state) => {
	return {
		createdDog: state.createdDogReducer.createdDog,
		temperaments: state.temperamentsReducer.temperaments
	};
};

const mapDispatchToProps = { fetchAllTemperaments, sendDogToDb };

export default connect(mapStateToProps, mapDispatchToProps)(Upload);