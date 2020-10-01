import React, { useContext } from "react";
import RecipeIngredientAdd from "./recipeIngredientAdd";
import { RecipeContext } from "./App.js";
import { v4 as uuidv4 } from "uuid";

export default function EditList({ recipe }) {
  const { handleCloseRecipeEdit, handleRecipeChange } = useContext(
    RecipeContext
  );

  function handleChange(changes) {
    //   What handleRecipeChange does is to take a new dict. Inside this
    // dict we will find the same keys but the ...changes will override ...recipe values
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients];
    const indexIngredient = newIngredients.findIndex((r) => r.id === id);
    newIngredients[indexIngredient] = ingredient;
    handleChange({ ingredients: newIngredients });
  }

  function handleDeleteIngredient(id) {
    handleChange({
      ingredients: recipe.ingredients.filter(
        (ingredient) => ingredient.id !== id
      ),
    });
  }

  function handleAddIngredient() {
    const newIngredient = { id: uuidv4(), name: "", amount: "" };
    const newIngredients = [...recipe.ingredients, newIngredient];
    handleChange({ ingredients: newIngredients });
  }

  return (
    <div className="edit-list">
      <div>
        <button onClick={handleCloseRecipeEdit} className={"btn btn--close"}>
          &times;
        </button>
      </div>
      <form>
        <div className="edit-list__component ">
          <label htmlFor="name">Name</label>
          <input
            value={recipe.name}
            name="name"
            id="name"
            required
            type="text"
            onChange={(e) => {
              handleChange({ name: e.target.value });
            }}
          ></input>
        </div>
        <div className="edit-list__component">
          <label htmlFor="cook-time">Cook Time</label>
          <input
            value={recipe.time}
            name="cook-time"
            required
            type="text"
            onChange={(e) => {
              handleChange({ time: e.target.value });
            }}
          ></input>
        </div>
        <div className="edit-list__component">
          <label htmlFor="servings">Servings</label>
          <input
            value={recipe.servings}
            name="servings"
            required
            type="number"
            onChange={(e) => {
              handleChange({ servings: parseInt(e.target.value) || "" });
            }}
          ></input>
        </div>
        <div className="edit-list__component">
          <label htmlFor="text">Instructions</label>
          <textarea
            type="textarea"
            className={"messageInput"}
            placeholder="Type something if you want..."
            rows="5"
            name="text"
            value={recipe.instructions}
            onChange={(e) => {
              handleChange({ instructions: e.target.value });
            }}
          />
        </div>
      </form>
      <br />
      <h3>Ingredients</h3>
      <div className="edit-list__component edit-list--grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map((ingredient) => {
          return (
            <RecipeIngredientAdd
              ingredient={ingredient}
              key={ingredient.id}
              handleIngredientChange={handleIngredientChange}
              handleDeleteIngredient={handleDeleteIngredient}
            />
          );
        })}
      </div>
      <div>
        <button onClick={handleAddIngredient} className="btn btn--add">
          Add Ingredients
        </button>
      </div>
      <div>
        <button
          onClick={handleCloseRecipeEdit}
          className="btn btn--save"
          type="submit"
        >
          Save
        </button>
      </div>
    </div>
  );
}
