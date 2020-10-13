import React, { useContext } from "react";
import RecipeIngredientAdd from "./recipeIngredientAdd";
import { RecipeContext } from "./App.js";
import { v4 as uuidv4 } from "uuid";
import "./editlist.scss";

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
    console.log(newIngredients[indexIngredient]);
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
    const newIngredient = { id: uuidv4(), name: "", amount: "", unit: "" };
    const newIngredients = [...recipe.ingredients, newIngredient];
    handleChange({ ingredients: newIngredients });
  }

  return (
    <div className="edit-list">
      <div className={"edit-list__component_image"}>
        <img src={recipe.image} alt={recipe.name}></img>
      </div>
      <div className={"edit-list__details-component-wrapper-relative"}>
        <div>
          <button onClick={handleCloseRecipeEdit} className={"bottom-close"}>
            &times;
          </button>
        </div>

        <div className="edit-list__component">
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

        <details className={"details-component__instructions-edit-list"}>
          {/* recipe.instructions.map */}
          <summary>Instructions</summary>
          <ul className={"details-component__instructions__grid"}>
            {recipe.instructions.map((step, index) => {
              return (
                <div key={uuidv4()}>
                  <span>{index + 1} Step</span>
                  <li className={"details-component__instructions__grid__rows"}>
                    {" "}
                    {step.step}
                  </li>
                </div>
              );
            })}
          </ul>
        </details>
        <details className="details-component__ingredients-edit-list">
          <summary>Ingredients</summary>
          <div className={"edit-list--grid"}>
            <div>Name</div>
            <div>Amount</div>
            <div>Unit</div>
            <div></div>
            {recipe.ingredients.map((ingredient) => {
              return (
                <RecipeIngredientAdd
                  ingredient={ingredient}
                  key={ingredient.id}
                  handleIngredientChange={handleIngredientChange}
                  handleDeleteIngredient={handleDeleteIngredient}
                  handleAddIngredient={handleAddIngredient}
                />
              );
            })}
          </div>
          <div className={"add-ingredient-button"}>
            <button onClick={handleAddIngredient}>Add Ingredient</button>
          </div>
        </details>

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
    </div>
  );
}
