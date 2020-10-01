import React, { useState, useEffect } from "react";
import RecipeList from "./recipeList";
import EditList from "./EditList";
import SearchBar from "./SearchBar";
import { v4 as uuidv4 } from "uuid";
import SearchbarAPI from "./SearchbarAPi";
import FindRecipes from "./findRecipes";
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

  const { loading, apiRecipes } = FindRecipes(query);
  console.log(apiRecipes);
  // Functions

  function handleApiSearch(text) {
    setQuery(text);
  }

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
  };

  return (
    <div>
      <div>
        <SearchbarAPI handleApiSearch={handleApiSearch} />
        {/* {apiRecipes.map((recipe) => {
          return <div key={recipe.id}>{recipe.title}</div>;
        })} */}
      </div>
      {false && (
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
      )}
    </div>
  );
}

const recipeListOfArrays = [
  {
    id: 0,
    name: "paprikas",
    time: "h1 45",
    servings: 3,
    instructions: "1111\n22222\n33333333",
    ingredients: [
      { id: 0, name: "peper", amount: "2kus" },
      { id: 1, name: "potatoes", amount: "2kus" },
    ],
  },
  {
    id: 1,
    name: "tortilla",
    time: "h1 45",
    servings: 3,
    instructions: `1111\n 22222\n 33333333`,
    ingredients: [
      { id: 0, name: "peper", amount: "2kus" },
      { id: 1, name: "potatoes", amount: "2kus" },
    ],
  },
];
export default App;
