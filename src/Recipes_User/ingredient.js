import React from "react";

export default function Ingredient({ name, amount, unit }) {
  return (
    <>
      <span> {name}</span>
      <span>{amount}</span>
      <span>{unit}</span>
    </>
  );
}
