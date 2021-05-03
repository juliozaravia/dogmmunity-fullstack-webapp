import React from 'react';
import { Link } from 'react-router-dom';

import gen from '../../utils/styles/General.module.css';
import css from './Welcome.module.css';
import banner from '../../utils/images/doggie.gif';

const Welcome = () => {
	return (
		<section className={gen.outerContainer}>
			<section className={`${css.welcomeContainer} ${css.welcomeLeft}`}>
				<figure className={css.welcomeBlock}>
					<div className={css.Wrapper}>
						<div id={css.tableContainer}>
							<div id={css.tableCell}>
								<h1 className={gen.defaultTextCenter}>
									<span className={css.specialTextLogo}>D</span>ogmmunity
								</h1>
								<img src={banner} alt="Welcome to Dogmmunity" />
							</div>
						</div>
					</div>
				</figure>
			</section>
			<section className={`${css.welcomeContainer} ${css.welcomeRight}`}>
				<div className={css.welcomeBlock}>
					<div className={css.Wrapper}>
						<div id={css.tableContainer}>
							<div id={css.tableCell}>
								<div className={css.welcomeText}>
									<span className={css.specialTextCaption}>Welcome</span> to the largest <span className={css.specialTextCaption}>doge</span> community on the <span className={css.specialTextCaption}>internet</span>.
								</div>
								<div className={`${gen.maximalSeparatorTop}`}>
									<Link className={gen.buttonWelcome} to="/dogs">Jump right in!</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</section>
	);
};

export default Welcome;