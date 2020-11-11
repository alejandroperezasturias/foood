import React, { useContext } from 'react';
// import './nav.scss';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../App';

export default function Nav() {
	const { userEmoji } = useContext(RecipeContext);
	return (
		<div className={'nav bg-accent-blue'}>
			<div className={'nav-wrapper'}>
				<div className={'logo-wrapper'}>
					<h3 className={'logo logo-nav'}>La Despensa</h3>
				</div>
				<div className={'nav-menu bg-accent-blue'}>
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
							src={userEmoji}
							alt="user"
						></img>
						<h1>My User</h1>
					</Link>
				</div>
			</div>
		</div>
	);
}
