import React, { useState, useEffect } from 'react';
import Nav from './Nav/nav';
import axios from 'axios';
import SignUp from './auth/signUp';
import LogIn from './auth/logIn';
import ApiSearchLandingPage from './Spoonacular_API/ApiSearchLandingPage';
import RecipesLandingPage from './Recipes_User/RecipesLandingPage';
import PrivateRoute from './PrivateRoute';
import UserDashboard from './User_Dashboard/userDashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Let's use context
export const RecipeContext = React.createContext();

function App() {
	// AUTh
	const [user, Setuser] = useState('');
	function handleSetuser(x) {
		Setuser(x);
	}

	function handleLogOut() {
		Setuser('');
	}

	//  EDITOR
	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState([]);
	const [selectedRecipeID, setselectedRecipeID] = useState();
	const [visibilityAdded, setVisibilityAdded] = useState(false);
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

	async function handleAddRecipeAPItoSavedOnes(x) {
		// Check if the recipe is already added
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

			// Add to the BackEnd
			try {
				axios({
					method: 'POST',
					url: 'http://localhost:4001/recipes',
					data: newRecipe,
					headers: { 'auth-token': user },
				});
			} catch (err) {
				console.log(err);
			}
		}
	}
	// Editor

	function handleSaveChangesAPI() {
		try {
			const updatedRecipe = {
				id: selectedRecipe.id,
				vegan: selectedRecipe.vegan,
				vegetarian: selectedRecipe.vegetarian,
				veryHealthy: selectedRecipe.veryHealthy,
				veryPopular: selectedRecipe.veryPopular,
				image: selectedRecipe.image,
				score: selectedRecipe.score,
				name: selectedRecipe.name,
				time: selectedRecipe.time,
				servings: selectedRecipe.servings,
				instructions: selectedRecipe.instructions,
				ingredients: selectedRecipe.ingredients,
			};
			axios({
				method: 'PUT',
				url: 'http://localhost:4001/recipes',
				data: updatedRecipe,
				headers: { 'auth-token': user },
			});
			setselectedRecipeID(null);
			handleVisibility();
		} catch (err) {
			console.log(err);
		}
	}

	const handleVisibility = () => {
		setVisibilityAdded(!visibilityAdded);
	};

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
		try {
			axios({
				method: 'DELETE',
				url: 'http://localhost:4001/recipes',
				data: {
					id: id,
				},
				headers: { 'auth-token': user },
			});
		} catch (ERR) {
			console.log(ERR);
		}
		setRecipes(recipes.filter((recipe) => recipe.id !== id));
	}

	// Use effect work in order

	useEffect(() => {
		try {
			setLoading(true);
			axios({
				method: 'GET',
				url: 'http://localhost:4001/recipes',
				data: {
					userID: user,
				},
				headers: { 'auth-token': user },
			}).then((response) => {
				setRecipes(response.data);
				setLoading(false);
			});
		} catch (ERR) {}
	}, [user]);

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
					handleApiSearch('');
				} else {
					setRecipesAPI(response.data.results);
					setLoading(false);
					handleApiSearch('');
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
	}, [callAPI, offSet, user]);

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

	// Context
	const recipeContextValue = {
		handleRecipeDelete,
		handleRecipeSelect,
		handleCloseRecipeEdit,
		handleRecipeChange,
		handleRecipeSelectIP,
		handleCloseRecipeAPI,
		handleAddRecipeAPItoSavedOnes,
		selectedRecipe,
		selectedRecipeAPI,
		selectedRecipeID,
		recipes,
		handleVisibility,
		visibilityAdded,
		handleCuisine,
		handleDiet,
		handlePlate,
		handleSort,
		handleSortDirection,
		handleSaveChangesAPI,
		recipesAPI,
		handleApiCall,
		handleApiSearch,
		handleOffset,
		search,
		handleSearch,
		handleSetuser,
		user,
		handleLogOut,
		setQuery,
		loading,
	};

	return (
		<div>
			<Router>
				<RecipeContext.Provider value={recipeContextValue}>
					{!selectedRecipeID && !idSelectedRecipeAPI ? (
						<PrivateRoute component={Nav} />
					) : (
						<></>
					)}
					<Switch>
						<PrivateRoute
							path="/findRecipes"
							component={ApiSearchLandingPage}
						/>
						<PrivateRoute path="/myRecipes" component={RecipesLandingPage} />
						<PrivateRoute path="/dashboard" component={UserDashboard} />
						<Route path="/signUp" component={SignUp} />
						<Route path="/logIn" component={LogIn} />
					</Switch>
				</RecipeContext.Provider>
			</Router>
		</div>
	);
}
export default App;
