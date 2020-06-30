import React from "react";
import ExplorerComponent from "../ApiExplorer";
import "./style.css";

function App() {
  return (
    <div className="App">
      <h1>API Explorer</h1>
      <ExplorerComponent
        title="Add new user"
        url="https://jsonplaceholder.typicode.com/users"
        method="POST"
        body={[
          {
            name: "email",
            type: "email",
            maxlength: 24,
            minlength: 3,
          },
          {
            name: "full-name",
            type: "text",
            placeholder: "John Doe",
            required: true,
          },
          {
            name: "phone",
            type: "tel",
            pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
          },
        ]}
      />
      <ExplorerComponent
        title="Get users"
        url="https://jsonplaceholder.typicode.com/users"
        method="GET"
      />
      {/* <ExplorerComponent
        title="Get all posts"
        url="https://jsonplaceholder.typicode.com/posts"
        method="GET"
      />
      <ExplorerComponent
        title="Create a post"
        url="https://jsonplaceholder.typicode.com/posts"
        method="POST"
        body={[
          {
            name: "post-id",
            type: "number",
            maxlength: 3,
          },
          {
            name: "title",
            type: "text",
            required: true,
            maxlength: 255,
          },
          {
            name: "body",
            type: "text",
            required: true,
          },
        ]}
      /> */}
    </div>
  );
}

export default App;
