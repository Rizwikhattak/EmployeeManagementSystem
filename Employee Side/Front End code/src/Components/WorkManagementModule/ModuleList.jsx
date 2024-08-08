import React from 'react';

const ModuleList = ({ modules, onModuleUpdate }) => {
  const handleCheckboxChange = (index) => {
    const updatedModule = { ...modules[index], completed: !modules[index].completed };
    onModuleUpdate(index, updatedModule);
  };

  const handlePercentageChange = (index, event) => {
    const updatedModule = { ...modules[index], percentage: parseInt(event.target.value) || 0 };
    onModuleUpdate(index, updatedModule);
  };

  return (
    <div className="module-list">
      <h3>Module List</h3>
      {modules.map((module, index) => (
        <div key={index} className="module-item">
          <input
            type="checkbox"
            checked={module.completed}
            onChange={() => handleCheckboxChange(index)}
          />
          <label>{module.name}</label>
          <input
            type="number"
            min="0"
            max="100"
            value={module.percentage}
            onChange={(event) => handlePercentageChange(index, event)}
            className="percentage-input"
          />
          <span>% Completion</span>
        </div>
      ))}
    </div>
  );
};

export default ModuleList;
