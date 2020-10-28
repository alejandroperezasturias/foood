import React, { useContext } from 'react';
import RecipeAPIList from './recipeAPIList';
import SearchbarAPI from './SearchBar/SearchbarAPi';
import DetailsRecipeAPI from './DetailsRecipeAPI';
import { RecipeContext } from '../App.js';
import Placeholderlist from '../Placeholder_Folder/Placeholderlist';
import './recipeAPI.css';

export default function ApiSearchLandingPage() {
	const {
		selectedRecipeAPI,
		handleApiSearch,
		handleApiCall,
		recipesAPI,
		handleOffset,
		loading,
	} = useContext(RecipeContext);

	return (
		<div>
			{selectedRecipeAPI && <DetailsRecipeAPI recipe={selectedRecipeAPI} />}
			{!selectedRecipeAPI && (
				<SearchbarAPI
					handleApiSearch={handleApiSearch}
					handleApiCall={handleApiCall}
				/>
			)}
			{!selectedRecipeAPI && !loading && (
				<RecipeAPIList
					apiRecipes={recipesAPI}
					handleOffset={handleOffset}
					loading={loading}
				/>
			)}
			{loading && <Placeholderlist />}
		</div>
	);
}
