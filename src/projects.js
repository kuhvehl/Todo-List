export function createProjectsObj() {
    const projects = [];

    function getProjects() {
        return this.projects;
    }
    
    function getProject(i) {
        return this.projects[i];
    }

    function addProject(project) {
        this.projects.push(project);
    }

    function deleteProject (i) {
        this.projects.splice(i, 1);
    }

    function updateProject (i, updatedProject) {
        projects.splice(i, 1, updatedProject);
    }

    return { getProjects, getProject, addProject, deleteProject, updateProject, projects };
};

export const projectsObj = createProjectsObj();
