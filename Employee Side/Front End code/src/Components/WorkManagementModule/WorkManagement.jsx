import React, { useState } from "react";
import ProjectDropdown from "./ProjectDropdown";
import EmployeeDropdown from "./EmployeeDropdown";
import ModuleList from "./ModuleList";
import ProgressGraph from "./ProgressGraph";
import "./WorkManagement.css";

const WorkManagement = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Employee1",
      modules: [
        { name: "Module 1", completed: false, percentage: 0 },
        { name: "Module 2", completed: false, percentage: 0 },
        { name: "Module 3", completed: false, percentage: 0 },
      ],
    },
    {
      id: 2,
      name: "Employee2",
      modules: [
        { name: "Module 1", completed: false, percentage: 0 },
        { name: "Module 2", completed: false, percentage: 0 },
        { name: "Module 3", completed: false, percentage: 0 },
      ],
    },
    {
      id: 3,
      name: "Employee3",
      modules: [
        { name: "Module 1", completed: false, percentage: 0 },
        { name: "Module 2", completed: false, percentage: 0 },
        { name: "Module 3", completed: false, percentage: 0 },
      ],
    },
  ]);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleEmployeeSelect = (employeeId) => {
    const employee = employees.find((emp) => emp.id === parseInt(employeeId));
    setSelectedEmployee(employee);
  };

  const handleModuleUpdate = (index, updatedModule) => {
    if (selectedEmployee) {
      const updatedModules = selectedEmployee.modules.map((module, idx) =>
        idx === index ? updatedModule : module
      );

      const updatedEmployee = {
        ...selectedEmployee,
        modules: updatedModules,
      };

      const updatedEmployees = employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      );

      setEmployees(updatedEmployees);
      setSelectedEmployee(updatedEmployee);
    }
  };

  return (
    <div className="work bg-light h-full flex justify-center items-center">
      <div>
        <h1>Work Management</h1>
        <ProjectDropdown onSelect={handleProjectSelect} />
        <EmployeeDropdown
          employees={employees}
          onSelect={handleEmployeeSelect}
        />

        <h2>Selected Project: {selectedProject}</h2>
        {selectedEmployee && (
          <>
            <h2>Employee: {selectedEmployee.name}</h2>
            <ModuleList
              modules={selectedEmployee.modules}
              onModuleUpdate={handleModuleUpdate}
            />
            <ProgressGraph modules={selectedEmployee.modules} />
          </>
        )}
      </div>
    </div>
  );
};

export default WorkManagement;
