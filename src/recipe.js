import React from "react";
import "./recipe.css";
import IngredientsList from "./ingredientsList";

export default function Recipe({
  name,
  time,
  servings,
  instructions,
  ingredients,
}) {
  return (
    <div className="recipe">
      <div className={"header"}>
        <h3 className={"Title"}>{name}</h3>
        <div className={"buttonSection"}>
          <button className={"btn btn--primary mr-1"}>Edit</button>
          <button className={"btn btn--danger"}>Delete</button>
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
      <div className={"recipe__instructions"}>
        <span>Instructions: </span>
        <div className={"recipe__value--indented"}>{instructions}</div>
      </div>
      <div className={"recipe__ingredients"}>
        <span>Ingredients: </span>
        <div className={"recipe__value--indented"}>
          <IngredientsList ingredienst={ingredients} />
        </div>
      </div>
    </div>
  );
}
