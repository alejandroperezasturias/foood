import React from "react";

export default function Ingredient({ name, amount, src }) {
  return (
    <>
      <li className={"details-component__ingredients__grid__rows"}> {name}</li>
    </>
  );
}
