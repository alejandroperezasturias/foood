import React, { useState, useContext } from "react";
import { ThemeContext } from "./App";

export default function Counter() {
  console.log("render hooks");
  const [counter, setCounter] = useState(0);
  const style = useContext(ThemeContext);

  return (
    <div>
      <button
        style={{ backgroundColor: style }}
        onClick={() => {
          setCounter((prevCounter) => prevCounter - 1);
        }}
      >
        -
      </button>
      <span>{counter}</span>
      <button
        onClick={() => {
          setCounter((prevCounter) => prevCounter + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
