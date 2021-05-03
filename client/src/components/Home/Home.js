import React from 'react';

import Control from '../Control/Control';
import List from '../List/List';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';

import css from './Home.module.css';
import gen from '../../utils/styles/General.module.css';

const Home = () => {
	return (
		<main>
			<section className={`${gen.outerContainer} ${gen.blockSeparator}`}>
				<section className={`${gen.innerContainer} ${gen.minimalPadding}`}>
					<div className={`${css.control} ${css.controlLeft}`}>
						<Search />
					</div>
					<div className={`${css.control} ${css.controlRight}`}>
						<Control />
					</div>
				</section>
			</section>
			<section className={`${gen.outerContainer} ${gen.blockSeparator} ${gen.backgroundGrey}`}>
				<section className={`${gen.innerContainer} ${gen.normalPadding}`}>
					<List />
				</section>
			</section>
			<section className={gen.outerContainer}>
				<section className={`${gen.innerContainer} ${gen.normalPadding}`}>
					<Pagination />
				</section>
			</section>
		</main>
	);
};

export default Home;