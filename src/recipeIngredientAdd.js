import React from "react";

export default function RecipeIngredientAdd({
  ingredient,
  handleIngredientChange,
  handleDeleteIngredient,
}) {
  function handleChange(changes) {
    //   What handleRecipeChange does is to take a new dict. Inside this
    // dict we will find the same keys but the ...changes will override ...recipe values
    handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
  }

  function handleDelete() {
    handleDeleteIngredient(ingredient.id);
  }

  return (
    <>
      <input
        onChange={(e) => {
          handleChange({ name: String(e.target.value) });
        }}
        value={ingredient.name}
        type="text"
      ></input>
      <input
        onChange={(e) => {
          handleChange({ amount: parseInt(e.target.value) || "" });
        }}
        value={ingredient.amount}
        type="number"
      ></input>
      <input
        onChange={(e) => {
          handleChange({ unit: e.target.value });
        }}
        value={ingredient.unit}
        type="text"
      ></input>
      <button onClick={handleDelete} className={"btn--danger"}>
        &times;
      </button>
    </>
  );
}
