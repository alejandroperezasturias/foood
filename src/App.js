import React, { useState } from "react";
import Counter from "./component";

export const ThemeContext = React.createContext();

function App() {
  console.log("render app");
  const [theme, setTheme] = useState("red");

  function changeTheme() {
    setTheme((previousTheme) => (previousTheme === "red" ? "blue" : "red"));
  }

  return (
    <ThemeContext.Provider value={theme}>
      <Counter />
      <button onClick={changeTheme}>Let's change Background</button>
    </ThemeContext.Provider>
  );
}

export default App;
