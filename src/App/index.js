import React from "react";
import ExplorerComponent from "../Explorer";
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
    </div>
  );
}

export default App;
