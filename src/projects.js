import { createProject } from "./project";

export const projectsObj = (function projects() {
    const projects = [];

    function getProjects() {
        return projects;
    }
    
    function getProject(i) {
        return projects[i];
    }

    function addProject(project) {
        projects.push(project);
    }

    function deleteProject (i) {
        projects.splice(i, 1);
    }

    function updateProject (i, updatedProject) {
        projects.splice(i, 1, updatedProject);
    }

    return { getProjects, getProject, addProject, deleteProject, updateProject, projects };
})();

const defaultProject = createProject('Default Project');
projectsObj.addProject(defaultProject);


