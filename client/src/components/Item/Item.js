import React from 'react';
import { Link } from 'react-router-dom';

import css from './Item.module.css';
import gen from '../../utils/styles/General.module.css';
import notfound from '../../utils/images/notfound.jpg';

const Item = ({ dog }) => {
	const temperamentsOrganizer = () => {
		let temperamentsList = dog.temperament.map((temperament, index) => {
			return (
				<div key={index} className={css.temperamentBlock}>{temperament}</div>
			);
		});
		return temperamentsList;
	};

	const imageLoader = () => {
		let imageLink = '';
		if (dog.origin === 'apiRequest') {
			if (dog.image) {
				if (dog.image.includes('.com')) {
					imageLink = dog.image;
				} else {
					imageLink = `https://cdn2.thedogapi.com/images/${dog.image}.jpg`;
				}
			} else {
				imageLink = notfound;
			}
		} else {
			imageLink = dog.image;
		}
		return imageLink;
	};

	return (
		<div>
			<div className={css.itemHalf}>
				<Link to={`/dogs/${dog.id}`}>
					<figure className={css.imageContainer}>
						<img
							src={imageLoader()}
							alt={dog.name}
						/>
					</figure>
				</Link>
			</div>
			<div className={`${css.itemHalf} ${css.itemDescription}`}>
				<Link to={`/dogs/${dog.id}`} className={css.itemTitle}>{dog.name} <span className={css.weightTag}>{dog.weight}kg</span></Link>
				<div className={css.temperamentsContainer}>{temperamentsOrganizer()}</div>
				<Link to={`/dogs/${dog.id}`} className={gen.buttonMenu}>View detail</Link>
			</div>
		</div>
	);
};

export default Item;