import React, { useContext, useEffect, useState } from "react";
import ProjectDropdown from "./ProjectDropdown";
import ModuleDropdown from "./ModuleDropdown";
import ModuleList from "./ModuleList";
import ProgressGraph from "./ProgressGraph";
import "./WorkManagement.css";
import { AuthContext } from "../../AuthContext";
const WorkManagement = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedModule, setSelectedModule] = useState(null);
  const [projects, setProjects] = useState([]);
  const [modules, setModules] = useState([]);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost/cafevista/Modules/getAssignedProjects.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const handleProjectSelect = (project) => {
    const specificProject = projects.find(
      (curr) => project == curr.project_name
    );
    setSelectedProject(specificProject);
    console.log("IDSSSS :", specificProject.id, userId);
    fetch("http://localhost/cafevista/Modules/getProjectModules.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: specificProject.id,
        employee_id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Modules :", data);
        setModules(data);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  };

  const handleModuleSelect = (moduleId) => {
    const module = modules.find((mod) => {
      return mod.id == moduleId;
    });
    setSelectedModule(module);
  };

  const handleModuleUpdate = (index, updatedModule) => {
    if (selectedModule) {
      // const updatedModules = selectedModule.modules.map((module, idx) =>
      //   idx === index ? updatedModule : module
      // );

      // const updatedEmployee = {
      //   ...selectedModule,
      //   modules: updatedModules,
      // };

      const updatedModules = modules.map((mod) =>
        mod.id === updatedModule.id ? updatedModule : mod
      );

      setModules(updatedModules);
      setSelectedModule(updatedModule);
    }
  };

  const handleProgressUpdate = (percentage) => {
    if (selectedModule) {
      console.log(
        "Project ID",
        selectedProject.id,
        "Module Id",
        selectedModule.id
      );

      fetch("http://localhost/cafevista/Modules/updateModuleProgress.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: selectedProject.id,
          module_id: selectedModule.id,
          progress_percentage: percentage,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("success");
        })
        .catch((error) => console.error("Error fetching reviews:", error));
    }
  };

  return (
    <div className="work bg-light h-full flex justify-center items-center">
      <div>
        <h1>Work Management</h1>
        <ProjectDropdown onSelect={handleProjectSelect} projects={projects} />
        <ModuleDropdown modules={modules} onSelect={handleModuleSelect} />

        <h2>Selected Project: {selectedProject.project_name}</h2>
        {selectedModule && (
          <>
            <h2>Module: {selectedModule.title}</h2>

            <ModuleList
              module={selectedModule}
              onModuleUpdate={handleModuleUpdate}
              handleProgressUpdate={handleProgressUpdate}
            />
            <ProgressGraph module={selectedModule} />
          </>
        )}
      </div>
    </div>
  );
};

export default WorkManagement;
