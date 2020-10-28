import React, { useContext } from 'react';
import { RecipeContext } from '../App';
import RecipeList from './recipeList';
import EditList from './EditList';
import SearchBar from './SearchBar';
import Saved from './saved';

export default function RecipesLandingPage() {
	const {
		handleSearch,
		selectedRecipe,
		recipes,
		search,
		selectedRecipeID,
	} = useContext(RecipeContext);
	return (
		<div>
			<SearchBar handleSearch={handleSearch} selectedRecipe={selectedRecipe} />
			<div className={'main-app'}>
				{!selectedRecipeID && (
					<RecipeList
						recipes={recipes}
						search={search}
						// selectedRecipe={selectedRecipe}
					/>
				)}
				{selectedRecipe && <EditList recipe={selectedRecipe} />}
				<Saved />
			</div>
			)
		</div>
	);
}
