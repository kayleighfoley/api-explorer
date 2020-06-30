import React from "react";
import ReactDOM from "react-dom";
import ExplorerInput from ".";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExplorerInput inputObj={{ name: "test input" }} />, div);
});
