import React from 'react';

import css from './Footer.module.css';
import gen from '../../utils/styles/General.module.css';

const Footer = () => {
	return (
		<section className={`${gen.outerContainer} ${gen.backgroundBlue}`}>
			<section className={`${gen.innerContainer} ${gen.subMinimalPadding} ${gen.defaultTextCenter}`}>
				Made with love <span className={css.specialIcon}>&#9829;</span> by <a className={css.footerLink} href="https://github.com/juliozaravia?tab=repositories" target="_blank" rel="noreferrer">Julio Zaravia</a>. Very, very late at night.
			</section>
		</section>
	);
};

export default Footer;