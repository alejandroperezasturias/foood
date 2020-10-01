import React from "react";

export default function SearcharAPI({
  handleApiSearch,
  //   handleApiSearchButton,
}) {
  return (
    <div className={"SearchbarAPI__Wrapper"}>
      <input
        onChange={(e) => handleApiSearch(e.target.value)}
        className={"SearchbarAPI__Main-Input"}
        type="text"
      ></input>
      <button className={"SearchbarAPI__Main-btn"}>Search</button>
    </div>
  );
}
