import React from "react";
import Recipe from "./recipe";
// import { RecipeContext } from "./App.js";

export default function RecipeList({ recipes, search }) {
  // const { handleRecipeAdd } = useContext(RecipeContext);

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
        {/* {!selectedRecipe && (
          <button onClick={handleRecipeAdd} className={"button-primary"}>
            Add New Recipe
          </button>
        )} */}
      </div>
    </>
  );
}
