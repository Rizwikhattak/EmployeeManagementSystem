import React, { useState } from "react";

const ModuleList = ({ module, onModuleUpdate, handleProgressUpdate }) => {
  const [percentage, setPercentage] = useState(0);
  const handleCheckboxChange = (index) => {
    const updatedModule = {
      ...module[index],
      completed: !module[index].completed,
    };
    onModuleUpdate(index, updatedModule);
  };

  const handlePercentageChange = (index, event) => {
    setPercentage(event.target.value);
    const updatedModule = {
      ...module,
      progress_percentage: parseInt(event.target.value) || 0,
    };
    onModuleUpdate(index, updatedModule);
  };

  return (
    <div className="module-list">
      <div className="module-item">
        {/* <input
          type="checkbox"
          checked={module.completed}
          onChange={() => handleCheckboxChange(index)}
        /> */}
        <label>{module.title}</label>
        <input
          type="number"
          min="0"
          max="100"
          value={module.progress_percentage}
          onChange={(event) => handlePercentageChange(module.id, event)}
          className="percentage-input"
        />
        <span className="px-2">% Completion</span>
        <span>
          <button
            className="btn btn-primary"
            onClick={() => handleProgressUpdate(percentage)}
          >
            Update
          </button>
        </span>
      </div>
    </div>
  );
};

export default ModuleList;
