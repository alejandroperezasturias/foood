import React from 'react';
import './nav.scss';
import { Link } from 'react-router-dom';

export default function Nav() {
	return (
		<div className={'nav'}>
			<div className={'nav-wrapper'}>
				<div>
					<h3 className={'logo'}>La Despensa</h3>
				</div>
				<div className={'nav-menu'}>
					<Link to={'/findRecipes'} style={{ textDecoration: 'none' }}>
						<h1>Search</h1>
					</Link>
					<Link to={'/myRecipes'} style={{ textDecoration: 'none' }}>
						<h1>My Recipes</h1>
					</Link>
					<Link to={'/dashboard'} style={{ textDecoration: 'none' }}>
						<h1>My User</h1>
					</Link>
				</div>
			</div>
		</div>
	);
}
