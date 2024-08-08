import React from 'react';

const EmployeeDropdown = ({ employees, onSelect }) => {
  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <div className="employee-dropdown">
      <label htmlFor="employee-dropdown">Select Employee: </label>
      <select id="employee-dropdown" onChange={handleChange}>
        <option value="">--Select an employee--</option>
        {employees.map((employee, index) => (
          <option key={index} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EmployeeDropdown;
