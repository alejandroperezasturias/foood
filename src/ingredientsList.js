import React from "react";
import Ingredient from "./ingredient";

export default function IngredientsList({ ingredienst }) {
  return (
    <div className={"ingredient-grid"}>
      {ingredienst.map((ingredient) => {
        return <Ingredient key={ingredient.id} {...ingredient} />;
      })}
    </div>
  );
}
