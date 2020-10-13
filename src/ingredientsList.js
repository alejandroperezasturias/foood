import React from "react";
import Ingredient from "./ingredient";
import { v4 as uuidv4 } from "uuid";
export default function IngredientsList({ ingredienst }) {
  return (
    <div className={"ingredient-grid"}>
      {ingredienst.map((ingredient) => {
        return <Ingredient key={uuidv4()} {...ingredient} />;
      })}
    </div>
  );
}
