import React from "react";

export default function SearchBar({ handleSearch, selectedRecipe }) {
  return (
    <div style={selectedRecipe == null ? { opacity: "1" } : { opacity: "0" }}>
      <input onChange={(e) => handleSearch(e.target.value)} type="text"></input>
    </div>
  );
}
