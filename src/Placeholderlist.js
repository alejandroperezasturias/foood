import React from "react";
import Placeholder from "./placeholder";

export default function Placeholderlist() {
  return (
    <div className={"recipe-API__list"}>
      {Array.apply(null, Array(8)).map((x, i) => (
        <Placeholder key={i} />
      ))}
    </div>
  );
}
