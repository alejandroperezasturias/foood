import React, { useState } from "react";
import RecipeList from "./recipeList";
import uuidv4 from "uuid/v4";

function App() {
  return (
    <div>
      <RecipeList recipes={recipeListOfArrays} />
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
