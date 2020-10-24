import React from 'react';
import RecipeAPI from './recipeAPI';
import './recipeAPIList.scss';

export default function RecipeAPIList({ apiRecipes, handleOffset, loading }) {
	return (
		<>
			{apiRecipes.length > 0 ? (
				<div>
					<div className={'recipe-API__list'}>
						<div className="recipe-API__list__recipes">
							{apiRecipes.map((recipe) => {
								return <RecipeAPI key={recipe.id} recipe={recipe} />;
							})}
						</div>
					</div>
					<div className="recipe-API__list__More-Button__wrapper">
						{!loading && (
							<button
								className={'recipe-API__list__More-Button'}
								onClick={handleOffset}
							>
								More Results
							</button>
						)}
					</div>
				</div>
			) : (
				<div className={'recipe-API__list no-recipes-message'}>
					<h3>
						Uppps, it looks like you are looking for something too sepecific.
						Please, modify your search.
					</h3>
				</div>
			)}
		</>
	);
}
