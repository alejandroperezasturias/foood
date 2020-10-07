import React, { useState, useEffect } from "react";
import RecipeList from "./recipeList";
import EditList from "./EditList";
import SearchBar from "./SearchBar";
import { v4 as uuidv4 } from "uuid";
import SearchbarAPI from "./SearchbarAPi";
import RecipeAPIList from "./recipeAPIList";
import DetailsRecipeAPI from "./DetailsRecipeAPI";
import Placeholderlist from "./Placeholderlist";

import axios from "axios";

const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

// Let's use context
export const RecipeContext = React.createContext();

function App() {
  const [recipes, setRecipes] = useState(recipeListOfArrays);
  const [search, setSearch] = useState([]);
  const [selectedRecipeID, setselectedRecipeID] = useState();
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeID
  );

  // API
  const [query, setQuery] = useState("tofu");
  const [callAPI, setCallAPI] = useState("tofu");
  const [loading, setLoading] = useState("false");
  const [recipesAPI, setRecipesAPI] = useState([]);
  const [idSelectedRecipeAPI, setIDselectedRecipeAPI] = useState();
  const [offSet, setOffset] = useState(0);
  const selectedRecipeAPI = recipesAPI.find(
    (recipe) => recipe.id === idSelectedRecipeAPI
  );
  const numberOfResults = 8;

  useEffect(() => {
    console.log(numberOfResults);
  }, [numberOfResults]);
  // Functions

  // API

  function handleOffset() {
    setOffset((prev) => (prev += 8));
  }
  function handleApiSearch(text) {
    setQuery(text);
  }

  function handleApiCall(e) {
    setCallAPI(query);
    console.log(callAPI);
  }

  function handleRecipeSelectIP(id) {
    setIDselectedRecipeAPI(id);
    console.log(id);
  }

  function handleCloseRecipeAPI() {
    setIDselectedRecipeAPI(null);
  }

  function handleAddRecipeAPItoSavedOnes(x) {
    const recipe = recipesAPI.find((recipe) => recipe.id === x);
    const newRecipe = {
      id: recipe.id,
      name: recipe.title,
      time: recipe.readyInMinutes,
      servings: recipe.servings,
      instructions: recipe.analyzedInstructions[0].steps,
      ingredients: recipe.extendedIngredients,
    };
    console.log(newRecipe);
    setRecipes([...recipes, newRecipe]);
  }

  // Editor
  function handleSearch(searchQuery) {
    let fileterdRecipesIDS = [];
    const fileterdRecipes = recipes.filter((recipe) =>
      recipe.name.includes(searchQuery)
    );
    fileterdRecipes.forEach((recipe) => {
      fileterdRecipesIDS.push(recipe["id"]);
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

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      time: "",
      servings: 1,
      instructions: "",
      ingredients: [
        { id: uuidv4(), name: "", amount: "" },
        { id: uuidv4(), name: "", amount: "" },
      ],
    };
    setselectedRecipeID(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
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

  useEffect(() => {
    let cancel;
    setLoading(true);
    axios({
      method: "GET",
      url:
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=0ca5b73430174b75ba4618802210117f",
      params: {
        query: callAPI,
        ignorePantry: true,
        number: numberOfResults,
        addRecipeInformation: true,
        instructionsRequired: true,
        fillIngredients: true,
        sort: "meta-score",
        sortDirection: "desc",
        offset: offSet,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      },
    })
      .then((response) => {
        setRecipesAPI([...recipesAPI, ...response.data.results]);
        console.log(response.data.results);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          console.log("axios caught");
          return;
        }
      });
    return () => {
      console.log("unmounting");
      cancel();
    };
  }, [callAPI, offSet]);

  useEffect(() => {
    // When load set the search equal to all the recipes pulled from LocalStorage
    if (selectedRecipeID == null) {
      let fileterdRecipesIDS = [];
      recipes.forEach((recipe) => {
        fileterdRecipesIDS.push(recipe["id"]);
      });
      setSearch(fileterdRecipesIDS);
    } else if (selectedRecipeID) {
      // When add New Recipe. Pass only that id to the search
      setSearch([...search, ...selectedRecipeID]);
    }
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  // Context
  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleCloseRecipeEdit,
    handleRecipeChange,
    recipeListOfArrays,
    handleRecipeSelectIP,
    handleCloseRecipeAPI,
    handleAddRecipeAPItoSavedOnes,
    selectedRecipeAPI,
  };

  return (
    <div>
      <div>
        <RecipeContext.Provider value={recipeContextValue}>
          {selectedRecipeAPI && <DetailsRecipeAPI recipe={selectedRecipeAPI} />}
          {!selectedRecipeAPI && (
            <SearchbarAPI
              handleApiSearch={handleApiSearch}
              handleApiCall={handleApiCall}
            />
          )}
          {!selectedRecipeAPI && (
            <RecipeAPIList
              apiRecipes={recipesAPI}
              handleOffset={handleOffset}
              loading={loading}
            />
          )}
          {loading && <Placeholderlist numberOfResults={numberOfResults} />}
        </RecipeContext.Provider>
      </div>
      {/* I need to make sure to do not let the program add recipes when the filter is active */}
      <div>
        <SearchBar
          handleSearch={handleSearch}
          selectedRecipe={selectedRecipe}
        />
        <div className={"main-app"}>
          <RecipeContext.Provider value={recipeContextValue}>
            <RecipeList
              recipes={recipes}
              search={search}
              selectedRecipe={selectedRecipe}
            />
            {selectedRecipe && <EditList recipe={selectedRecipe} />}
          </RecipeContext.Provider>
        </div>
      </div>
      )
    </div>
  );
}

const recipeListOfArrays = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    name: "paprikas",
    time: "h1 45",
    servings: 3,
    instructions: [{ step: 1 }, { step: 1 }, { step: 0 }, { step: 0 }],
    ingredients: [
      { id: 0, name: "peper", amount: "2kus" },
      { id: 1, name: "potatoes", amount: "2kus" },
    ],
  },
];
export default App;
