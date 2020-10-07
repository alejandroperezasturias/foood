import React, { useState } from "react";
import RecipeAPI from "./recipeAPI";

export default function RecipeAPIList({ apiRecipes, handleOffset, loading }) {
  return (
    <>
      <div className={"recipe-API__list"}>
        {apiRecipes.map((recipe) => {
          return <RecipeAPI key={recipe.id} recipe={recipe} />;
        })}
        {!loading && (
          <button
            className={"recipe-API__list__More-Button"}
            onClick={handleOffset}
          >
            More Results
          </button>
        )}
      </div>
    </>
  );
}
