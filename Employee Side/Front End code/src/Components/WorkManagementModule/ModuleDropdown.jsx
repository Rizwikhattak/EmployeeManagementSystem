import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
const ModuleDropdown = ({ modules, onSelect }) => {
  const { userId } = useContext(AuthContext);
  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <div className="employee-dropdown">
      <label htmlFor="employee-dropdown">Select Module: </label>
      <select id="employee-dropdown" onChange={handleChange}>
        <option value="">--Select Module--</option>
        {modules.map((module, index) => (
          <option key={index} value={module.id}>
            {module.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModuleDropdown;
