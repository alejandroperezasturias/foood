import React from 'react';
import './nav.scss';
import { Link } from 'react-router-dom';

export default function Nav() {
	return (
		<div className={'nav'}>
			<div className={'nav-wrapper'}>
				<div className={'logo-wrapper'}>
					<h3 className={'logo'}>La Despensa</h3>
				</div>
				<div className={'nav-menu'}>
					<Link
						to={'/findRecipes'}
						style={{ textDecoration: 'none' }}
						className={'search-component'}
					>
						<h1>Search</h1>
					</Link>
					<Link
						to={'/myRecipes'}
						style={{ textDecoration: 'none' }}
						className={'my-recipes-component'}
					>
						<h1>My Recipes</h1>
					</Link>
					<Link
						to={'/dashboard'}
						style={{ textDecoration: 'none' }}
						className={'image-component'}
					>
						<img
							className="avatar-image-chosen"
							src="https://images.unsplash.com/photo-1600813390845-f35b9d49931a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=80"
							alt="user"
						></img>
						<h1>My User</h1>
					</Link>
				</div>
			</div>
		</div>
	);
}
