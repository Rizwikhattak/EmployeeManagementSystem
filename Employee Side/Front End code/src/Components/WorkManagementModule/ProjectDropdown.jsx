import React, { useContext, useEffect, useState } from "react";

const ProjectDropdown = ({ onSelect, projects }) => {
  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <div className="project-dropdown">
      <label htmlFor="project-dropdown">Select Project: </label>
      <select id="project-dropdown" onChange={handleChange}>
        <option value="">--Select a project--</option>
        {projects.map((project, index) => (
          <option key={index} value={project.project_name}>
            {project.project_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectDropdown;
