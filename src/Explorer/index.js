import React, { useState, useReducer, useRef } from "react";
import ExplorerInput from "../ExplorerInput";
import "./style.css";

export default function ExplorerComponent({ title, url, method, body }) {
  const [expanded, setExpanded] = useState(false);
  const [response, setResponse] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const formEl = useRef(null);

  // Initialize state of every given body input field
  // using useReducer, as number of input fields is unknown
  const inputNames = {};
  if (body) {
    body.forEach((inputObj) => (inputNames[inputObj.name] = ""));
  }
  const [formInputs, setFormInputs] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    inputNames
  );

  function toggleExplorerExpansion() {
    setExpanded(!expanded);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormInputs({ [name]: value });
    event.target.classList.remove("invalid");
  };

  // Check validity of all input fields
  function validateRequest(event) {
    let valid = true;
    if (body) {
      formEl.current.querySelectorAll("input").forEach((inputEl) => {
        if (!inputEl.validity.valid) {
          valid = false;
          inputEl.classList.add("invalid");
        }
      });
    }
    if (valid) submitRequest(event);
  }

  function submitRequest(event) {
    event.preventDefault();

    const options =
      method === "POST" || method === "PUT"
        ? {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formInputs),
          }
        : {
            method,
            headers: {
              "Content-Type": "application/json",
            },
          };

    fetch(url, options)
      .then((response) => {
        setResponse(response);
        return response.json();
      })
      .then((data) => setResponseData(JSON.stringify(data, undefined, 2)))
      .catch((error) => {
        console.error("There was a problem fulfilling this request", error);
      });
  }

  function clearRequest() {
    setResponse(null);
    for (const [name] of Object.entries(formInputs)) {
      setFormInputs({ [name]: "" });
    }
  }

  return (
    <div className={`explorer ${expanded && "explorer--expanded"}`}>
      <h3
        className="explorer__heading"
        onClick={toggleExplorerExpansion}
        tabIndex={0}
      >
        <span
          className={`explorer__method explorer__method--${method.toLowerCase()}`}
        >
          {method}
        </span>
        <span className="explorer__title">{title}</span>
      </h3>

      <div className="explorer__content">
        <div className="explorer__request-url">
          <code>URL</code>
          <code>{url}</code>
        </div>

        {body && (
          <>
            <form className="explorer__section" ref={formEl}>
              <h4 className="explorer__section-header">Parameters</h4>
              <div className="explorer__section-name">Name</div>
              <div className="explorer__section-description">Details</div>

              <p className="explorer__request-param-name">body</p>
              <div className="explorer__request-param-value">
                {body.map((obj, index) => {
                  return (
                    <ExplorerInput
                      key={index}
                      inputObj={obj}
                      onChange={handleInputChange}
                      value={formInputs[obj.name]}
                    />
                  );
                })}
              </div>
            </form>
          </>
        )}

        <div className="explorer__actions">
          <button onClick={validateRequest} type="submit">
            Send request
          </button>
          {response && (
            <button onClick={clearRequest} className="btn-secondary">
              Clear response
            </button>
          )}
        </div>

        {response && (
          <>
            <div className="explorer__section">
              <h4 className="explorer__section-header">Response</h4>
              <div className="explorer__section-name">Code</div>
              <div className="explorer__section-description">Details</div>

              <div className="explorer__response-status">
                {response.status}
                <br />
                {response.statusText}
              </div>
              <div className="explorer__response-body">
                <div>Response body</div>
                <pre>{responseData}</pre>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
