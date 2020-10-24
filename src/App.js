import React, { useState, useEffect } from 'react';
import RecipeList from './recipeList';
import EditList from './EditList';
import SearchBar from './SearchBar';
// import { v4 as uuidv4 } from "uuid";
import SearchbarAPI from './SearchbarAPi';
import RecipeAPIList from './recipeAPIList';
import DetailsRecipeAPI from './DetailsRecipeAPI';
import Placeholderlist from './Placeholderlist';
import Nav from './nav';
import './recipeAPI.css';
import axios from 'axios';
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes';

// Let's use context
export const RecipeContext = React.createContext();

function App() {
	// NAV
	const [seeMyRecipes, setSeeMyRecipes] = useState(false);

	//  EDITOR
	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState([]);
	const [selectedRecipeID, setselectedRecipeID] = useState();
	const selectedRecipe = recipes.find(
		(recipe) => recipe.id === selectedRecipeID
	);

	// API
	const [query, setQuery] = useState({
		query: '',
		cuisine: '',
		diet: '',
		plate: '',
	});
	const [callAPI, setCallAPI] = useState({
		query: '',
		cuisine: '',
		diet: '',
		plate: '',
		sort: 'meta-score',
		sortDirection: 'desc',
	});
	const [loading, setLoading] = useState('false');
	const [recipesAPI, setRecipesAPI] = useState([]);
	const [idSelectedRecipeAPI, setIDselectedRecipeAPI] = useState();
	const [offSet, setOffset] = useState(0);
	const selectedRecipeAPI = recipesAPI.find(
		(recipe) => recipe.id === idSelectedRecipeAPI
	);

	const numberOfResults = 8;

	// Functions

	// Nav

	function handleSort(sortby) {
		setQuery((prevSort) => {
			return { ...prevSort, sort: sortby };
		});
	}

	function handleSortDirection(sortdirection) {
		setQuery((prevSort) => {
			return { ...prevSort, sortDirection: sortdirection };
		});
	}

	function handleCuisine(cuisine) {
		setQuery((prevQuery) => {
			return { ...prevQuery, cuisine: cuisine };
		});
	}
	function handleDiet(diet) {
		setQuery((prevQuery) => {
			return { ...prevQuery, diet: diet };
		});
	}
	function handlePlate(plate) {
		setQuery((prevQuery) => {
			return { ...prevQuery, plate: plate };
		});
	}

	function handleTogglePage() {
		if (seeMyRecipes === false) {
			setSeeMyRecipes(!seeMyRecipes);
		} else {
			return;
		}
	}

	function handleTogglePageBackToSearch() {
		if (seeMyRecipes === true) {
			setSeeMyRecipes(!seeMyRecipes);
		}
	}

	// API

	function handleOffset() {
		setOffset((prev) => (prev += 8));
	}
	function handleApiSearch(text) {
		setQuery((prevQuery) => {
			return { ...prevQuery, query: text };
		});
	}

	// This is the button that sets the search
	function handleApiCall(e) {
		setOffset(0);
		setCallAPI(query);
	}

	function handleRecipeSelectIP(id) {
		setIDselectedRecipeAPI(id);
		console.log(id);
	}

	function handleCloseRecipeAPI() {
		setIDselectedRecipeAPI(null);
	}

	function handleAddRecipeAPItoSavedOnes(x) {
		if (recipes.find((recipe) => recipe.id === x)) {
			return;
		} else {
			const recipe = recipesAPI.find((recipe) => recipe.id === x);
			const newRecipe = {
				id: recipe.id,
				vegan: recipe.vegan,
				vegetarian: recipe.vegetarian,
				veryHealthy: recipe.veryHealthy,
				veryPopular: recipe.veryPopular,
				image: recipe.image,
				score: recipe.spoonacularScore,
				name: recipe.title,
				time: recipe.readyInMinutes,
				servings: recipe.servings,
				instructions: recipe.analyzedInstructions[0].steps,
				ingredients: recipe.extendedIngredients,
			};
			setRecipes([...recipes, newRecipe]);
		}
	}

	// Editor
	function handleSearch(searchQuery) {
		let fileterdRecipesIDS = [];
		const fileterdRecipes = recipes.filter(
			(recipe) =>
				recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				recipe.ingredients.some((ingredient) => {
					let check = ingredient.name
						.toLowerCase()
						.includes(searchQuery.toLowerCase());
					return check;
				})
		);

		fileterdRecipes.forEach((recipe) => {
			fileterdRecipesIDS.push(recipe['id']);
		});
		setSearch(fileterdRecipesIDS);
	}

	function handleRecipeChange(id, recipe) {
		const newRecipes = [...recipes];
		const index = newRecipes.findIndex((r) => r.id === id);
		// We take the same recipe from the newRecipes array and make it equal to the object we
		// are passing in.
		newRecipes[index] = recipe;
		// Set recipes to the new array with modified recipes

		setRecipes(newRecipes);
	}

	function handleRecipeSelect(id) {
		setselectedRecipeID(id);
	}

	function handleCloseRecipeEdit() {
		setselectedRecipeID(null);
	}

	function handleRecipeDelete(id) {
		if (selectedRecipeID != null && selectedRecipeID === id) {
			setselectedRecipeID(null);
		}
		setRecipes(recipes.filter((recipe) => recipe.id !== id));
	}

	// Use effect work in order

	useEffect(() => {
		const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (recipeJSON !== null) {
			setRecipes(JSON.parse(recipeJSON));
		}
	}, []);

	// Api Call

	useEffect(() => {
		let cancel;
		setLoading(true);
		axios({
			method: 'GET',
			url:
				'https://api.spoonacular.com/recipes/complexSearch?apiKey=0ca5b73430174b75ba4618802210117f',
			params: {
				cuisine: callAPI.cuisine,
				diet: callAPI.diet,
				type: callAPI.plate,
				query: callAPI.query,
				ignorePantry: true,
				number: numberOfResults,
				addRecipeInformation: true,
				instructionsRequired: true,
				fillIngredients: true,
				sort: callAPI.sort,
				sortDirection: callAPI.sortDirection,
				offset: offSet,
				cancelToken: new axios.CancelToken((c) => (cancel = c)),
			},
		})
			.then((response) => {
				if (offSet > 0) {
					let flatarr = response.data.results.flat(Infinity);
					setRecipesAPI((prevState) => {
						return [...prevState, flatarr].flat(Infinity);
					});
					setLoading(false);
				} else {
					setRecipesAPI(response.data.results);
					setLoading(false);
				}
			})
			.catch((e) => {
				if (axios.isCancel(e)) {
					console.log(e);
					return;
				}
			});
		return () => {
			cancel();
		};
	}, [callAPI, offSet]);

	useEffect(() => {
		// When load set the search equal to all the recipes pulled from LocalStorage
		if (selectedRecipeID == null) {
			let fileterdRecipesIDS = [];
			recipes.forEach((recipe) => {
				fileterdRecipesIDS.push(recipe['id']);
			});
			setSearch(fileterdRecipesIDS);
		}
	}, [recipes, selectedRecipeID]);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
	}, [recipes]);

	// Context
	const recipeContextValue = {
		handleRecipeDelete,
		handleRecipeSelect,
		handleCloseRecipeEdit,
		handleRecipeChange,
		recipeListOfArrays,
		handleRecipeSelectIP,
		handleCloseRecipeAPI,
		handleAddRecipeAPItoSavedOnes,
		selectedRecipeAPI,
		recipes,
		handleCuisine,
		handleDiet,
		handlePlate,
		handleSort,
		handleSortDirection,
	};

	return (
		<div>
			{!selectedRecipeID || !selectedRecipeID ? (
				<Nav
					handleTogglePage={handleTogglePage}
					handleTogglePageBackToSearch={handleTogglePageBackToSearch}
					seeMyRecipes={seeMyRecipes}
				/>
			) : (
				<></>
			)}
			{!seeMyRecipes && (
				<div>
					<RecipeContext.Provider value={recipeContextValue}>
						{selectedRecipeAPI && (
							<DetailsRecipeAPI recipe={selectedRecipeAPI} />
						)}
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
					</RecipeContext.Provider>
				</div>
			)}
			{seeMyRecipes && (
				<div>
					<SearchBar
						handleSearch={handleSearch}
						selectedRecipe={selectedRecipe}
					/>
					<div className={'main-app'}>
						<RecipeContext.Provider value={recipeContextValue}>
							{!selectedRecipeID && (
								<RecipeList
									recipes={recipes}
									search={search}
									// selectedRecipe={selectedRecipe}
								/>
							)}
							{selectedRecipe && <EditList recipe={selectedRecipe} />}
						</RecipeContext.Provider>
					</div>
					)
				</div>
			)}
		</div>
	);
}

const recipeListOfArrays = [
	{
		id: 0,
		image:
			'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
		name: 'paprikas',
		time: 'h1 45',
		servings: 3,
		instructions: [{ step: 1 }, { step: 1 }, { step: 0 }, { step: 0 }],
		ingredients: [
			{ id: 0, name: 'peper', amount: '2kus' },
			{ id: 1, name: 'potatoes', amount: '2kus' },
		],
	},
];
export default App;
