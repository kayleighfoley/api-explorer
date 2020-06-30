import React from "react";
import ReactDOM from "react-dom";
import ApiExplorerInput from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ApiExplorerInput inputObj={{ name: "test input" }} />, div);
});
