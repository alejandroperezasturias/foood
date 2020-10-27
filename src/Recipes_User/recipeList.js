import React from 'react';
import Recipe from './recipe';

export default function RecipeList({ recipes, search }) {
	return (
		<>
			<div className="recipeList">
				{recipes.map((recipe) => {
					if (search.includes(recipe.id)) {
						return <Recipe key={recipe.id} {...recipe} />;
					} else {
						return null;
					}
				})}
			</div>
		</>
	);
}
