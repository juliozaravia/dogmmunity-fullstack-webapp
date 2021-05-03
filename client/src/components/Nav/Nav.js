import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import css from './Nav.module.css';
import gen from '../../utils/styles/General.module.css';

const Nav = () => {
	return (
		<header className={gen.outerContainer}>
			<nav className={`${css.menu} ${gen.innerContainer}`}>
				<div className={`${css.menuBlock} ${css.menuBlockLogo}`}>
					<Link className={css.logoLink} to="/">
						<h2>
							<span className={css.specialTextLogo}>D</span>ogmmunity
						</h2>
					</Link>
				</div>
				<div className={`${css.menuBlock} ${css.menuBlockNavigation}`}>
					<ul className={css.menuList}>
						<li className={css.menuItem}>
							<NavLink className={gen.buttonMenu} activeClassName={css.activeMenu} to="/dogs">Home</NavLink>
						</li>
						<li className={css.menuItem}>
							<NavLink className={gen.buttonMenu} activeClassName={css.activeMenu} to="/upload">Create</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Nav;