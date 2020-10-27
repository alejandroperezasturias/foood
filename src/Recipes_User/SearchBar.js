import React from "react";

export default function SearchBar({ handleSearch, selectedRecipe }) {
  return (
    <div
      className={"searchbar-my-recipes__wrapper"}
      style={selectedRecipe == null ? { opacity: "1" } : { opacity: "0" }}
    >
      <input
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        className={"searchbar-my-recipes"}
        placeholder={"Search Recipes"}
      ></input>
    </div>
  );
}
