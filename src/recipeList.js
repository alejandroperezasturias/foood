import React from "react";
import Recipe from "./recipe";

export default function RecipeList({ recipes }) {
  return (
    <>
      <div className="recipeList">
        {recipes.map((recipe) => {
          return <Recipe key={recipe.id} {...recipe} />;
        })}
        <button className={"button-primary"}>Add New Recipe</button>
      </div>
    </>
  );
}
