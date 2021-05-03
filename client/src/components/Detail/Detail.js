import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchDogById } from '../../actions';

import css from './Detail.module.css';
import gen from '../../utils/styles/General.module.css';
import dogPetting from '../../utils/images/dogpet.jpg';

const Detail = ({ dog, match, fetchDogById }) => {
	const [verificationID, setVerificationID] = useState('');

	useEffect(() => {
		fetchDogById(match.params.id);
		setVerificationID(dog.data.id);
	}, [match.params.id]);

	const temperamentFormatter = () => {
		let temperamentsList = []

		if (dog.data.temperament) {
			temperamentsList = dog.data.temperament.map((temperament, index) => {
				return (
					<div key={index} className={css.temperamentBlock}>{temperament}</div>
				);
			});
		} else {
			temperamentsList.push('Loading...');
		}
		return temperamentsList;
	};

	return (
		<div>
			<section className={`${gen.outerContainer} ${gen.blockSeparator}`}>
				<section className={`${gen.innerContainer} ${gen.subMinimalPadding}`}>
					<Link to={`/dogs`} className={gen.breadcrumbsLink}>Home</Link> &rarr; {dog.data.id === verificationID ? 'Loading...' : dog.data.name}
				</section>
			</section>
			<section className={`${gen.outerContainer} ${gen.blockSeparator} ${dog.data.id === verificationID ? gen.showBlock : gen.hiddenBlock}`}>
				<section className={`${gen.innerContainer} ${gen.subMinimalPadding}`}>
					<div className={gen.loadingBlock}>Loading...</div>
				</section>
			</section>
			<section className={`${gen.outerContainer} ${dog.data.id === verificationID ? gen.hiddenBlock : gen.showBlock}`}>
				<section className={`${gen.innerContainer} ${gen.normalPadding}`}>
					<div className={css.itemHalf}>
						<figure className={css.imageContainer}>
							<img
								src={dog.data.origin === 'apiRequest' ? `https://cdn2.thedogapi.com/images/${dog.data.image}.jpg` : dog.data.image}
								alt={dog.data.name}
							/>
						</figure>
					</div>
					<div className={`${css.itemHalf} ${css.itemDescription}`}>
						<div className={css.detailTitle}>{dog.data.name}</div>
						<div className={gen.normalSeparatorTop}>
							<table className={css.detailTable}>
								<tbody>
									<tr>
										<td className={css.columnTitle}>
											<span className={css.colorAqua}>&mdash;</span> Weight
									</td>
										<td className={css.columnDescription}>{dog.data.weight} kg average</td>
									</tr>
									<tr>
										<td className={css.columnTitle}>
											<span className={css.colorAqua}>&mdash;</span> Height
									</td>
										<td className={css.columnDescription}>{dog.data.height} cm at the withers</td>
									</tr>
									<tr>
										<td className={`${css.columnTitle} ${css.finalRow}`}>
											<span className={css.colorAqua}>&mdash;</span> Life Span
									</td>
										<td className={`${css.columnDescription} ${css.finalRow}`}>{dog.data.life_span} average life span </td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className={gen.normalSeparatorTop}>
							<div>
								<span className={gen.specialLabel}>Associated temperaments:</span>
							</div>
							<div className={gen.minimalSeparatorTop}>
								{temperamentFormatter()}
							</div>
						</div>
					</div>
					<figure className={css.imageFooterRight}><img src={dogPetting} alt="Dogmunnity!" /></figure>
				</section>
			</section>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		dog: state.foundedDogReducer.foundedDog
	}
};

const mapDispatchToProps = { fetchDogById };

export default connect(mapStateToProps, mapDispatchToProps)(Detail);