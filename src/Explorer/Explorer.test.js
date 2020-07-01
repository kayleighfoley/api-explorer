import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ExplorerComponent from "./";

const testUrl = "/users";
const testGetProps = {
  method: "GET",
  title: "Explorer component with GET request",
  url: testUrl,
};

const testPostProps = {
  method: "POST",
  title: "Explorer component with POST request",
  url: testUrl,
  body: [
    {
      name: "Full name",
      type: "text",
      maxlength: 24,
    },
    {
      name: "Email",
      type: "email",
    },
  ],
};

const server = setupServer(
  rest.get("/users", (req, res, ctx) => {
    return res(ctx.json({}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders an API explorer", () => {
  const { getByText } = render(<ExplorerComponent {...testGetProps} />);
  expect(getByText(testGetProps.title)).toBeInTheDocument();
});

test("renders a Send Request button", () => {
  const { getByText } = render(<ExplorerComponent {...testGetProps} />);
  expect(getByText("Send request")).toBeInTheDocument();
});

test("renders a parameters section for POST methods", () => {
  const { getByText } = render(<ExplorerComponent {...testPostProps} />);
  expect(getByText(testPostProps.title)).toBeInTheDocument();
  expect(getByText("Parameters")).toBeInTheDocument();
});

test("renders a response section after clicking Send request", async () => {
  act(() => {
    render(<ExplorerComponent {...testGetProps} />);
  });

  expect(screen.getByText("Send request")).toBeInTheDocument();

  act(() => {
    fireEvent.click(screen.getByText("Send request"));
  });

  await waitFor(() => screen.getByText("Response"));

  expect(screen.getByText("Response")).toBeInTheDocument();
});

test("renders a Clear response button after clicking Send request", async () => {
  act(() => {
    render(<ExplorerComponent {...testGetProps} />);
  });

  expect(screen.getByText("Send request")).toBeInTheDocument();

  act(() => {
    fireEvent.click(screen.getByText("Send request"));
  });

  await waitFor(() => screen.getByText("Clear response"));

  expect(screen.getByText("Clear response")).toBeInTheDocument();
});

test("clears Response after clicking Clear response button", async () => {
  act(() => {
    render(<ExplorerComponent {...testGetProps} />);
  });

  expect(screen.getByText("Send request")).toBeInTheDocument();

  act(() => {
    fireEvent.click(screen.getByText("Send request"));
  });

  await waitFor(() => screen.getByText("Response"));

  expect(screen.getByText("Response")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Clear response"));
  expect(screen.queryByText("Response")).not.toBeInTheDocument();
});
