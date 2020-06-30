import React from "react";

import { reactAttributeMap } from "../helpers/reactAttributes";
import "./style.css";

export default function ApiExplorerInput({ inputObj, onChange, value }) {
  // converts any input attributes from lowercase to camelCase for React props
  function convertInputAttributes(obj) {
    const newObj = {};
    for (const [attr, value] of Object.entries(obj)) {
      const reactAttr = reactAttributeMap[attr];
      newObj[reactAttr] = value;
    }
    return newObj;
  }

  return (
    <div className="explorer__input">
      <label
        htmlFor={inputObj.name}
        className={`explorer__input-label ${
          inputObj.required && "explorer__input-label--required"
        }`}
      >
        {inputObj.name.replace("-", " ")}
      </label>
      <input
        className="explorer__input-field"
        value={value}
        onChange={onChange}
        {...convertInputAttributes(inputObj)}
      />
    </div>
  );
}
