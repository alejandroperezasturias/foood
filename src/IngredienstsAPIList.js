import React from "react";
import IngredientAPI from "./IngredientAPI";

export default function IngredienstsAPIList({ ingredients }) {
  return (
    <ul className={"details-component__ingredients__grid"}>
      {ingredients.map((ingredient) => {
        return (
          <IngredientAPI key={ingredient.original} name={ingredient.original} />
        );
      })}
    </ul>
  );
}
