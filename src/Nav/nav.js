import React from 'react';
import './nav.scss';

export default function Nav({
	handleTogglePage,
	handleTogglePageBackToSearch,
	seeMyRecipes,
}) {
	return (
		<div className={'nav'}>
			<div className={'nav-wrapper'}>
				<div>
					<h3 className={'logo'}>La Despensa</h3>
				</div>
				<div className={'nav-menu'}>
					<h1
						style={seeMyRecipes ? { fontWeight: '400' } : { fontWeight: '800' }}
						onClick={handleTogglePageBackToSearch}
					>
						Search
					</h1>
					<h1
						style={seeMyRecipes ? { fontWeight: '800' } : { fontWeight: '400' }}
						onClick={handleTogglePage}
					>
						My Recipes
					</h1>
				</div>
			</div>
		</div>
	);
}
