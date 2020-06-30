import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import ApiExplorer from "./";

const testProps = {
  method: "GET",
  title: "Explorer component test",
};

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ApiExplorer {...testProps} />, div);
});

test("renders a Send Request button", () => {
  const { getByText } = render(<ApiExplorer {...testProps} />);
  expect(getByText("Send request")).toBeInTheDocument();
});
