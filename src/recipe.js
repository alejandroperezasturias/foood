import React, { useContext } from "react";
import "./recipe.css";
import IngredientsList from "./ingredientsList";
import { RecipeContext } from "./App.js";

export default function Recipe({
  id,
  name,
  time,
  servings,
  instructions,
  ingredients,
}) {
  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);
  return (
    <div className="recipe">
      <div className={"header"}>
        <h3 className={"Title"}>{name}</h3>
        <div className={"buttonSection"}>
          <button
            onClick={() => handleRecipeSelect(id)}
            className={"btn btn--primary mr-1"}
          >
            Edit
          </button>
          <button
            onClick={() => handleRecipeDelete(id)}
            className={"btn btn--danger"}
          >
            Delete
          </button>
        </div>
      </div>
      <div className={"recipe__time"}>
        <span>Cooking Time: </span>
        <span>{time}</span>
      </div>
      <div className={"recipe__servings"}>
        <span>Servings: </span>
        <span>{servings}</span>
      </div>
      <details className={"details-component details-component__instructions"}>
        <summary>Instructions</summary>
        <ul className={"details-component__instructions__grid"}>
          {instructions.map((step, index) => {
            return (
              <div key={step.step}>
                <span>{index + 1} Step</span>
                <li className={"details-component__instructions__grid__rows"}>
                  {step.step}
                </li>
              </div>
            );
          })}
        </ul>
      </details>
      <details className={"details-component details-component__ingredients"}>
        <summary>Ingredients</summary>
        <IngredientsList ingredienst={ingredients} />
      </details>
      ;
    </div>
  );
}
