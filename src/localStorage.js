import { projectsObj } from "./projects";
import { createProject, projectObj } from "./project";
import { listObj } from "./listItem";

export function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function getFromLocalStorage() {
  const localProjects = JSON.parse(localStorage.getItem('todos'));

  if (!localStorage.getItem('todos') || ((localProjects.projects.length) === 0)) {
    const defaultProject = createProject('Default Project');
    projectsObj.addProject(defaultProject);
    return projectsObj;
  }

  localProjects.getProjects = projectsObj.getProjects;
  localProjects.getProject = projectsObj.getProject;
  localProjects.deleteProject = projectsObj.deleteProject;
  localProjects.addProject = projectsObj.addProject;

  localProjects.projects.forEach((project) => {
    project.addTask = projectObj.addTask;
    project.getTasks = projectObj.getTasks;
    project.getTask = projectObj.getTask;
    project.updateTask = projectObj.updateTask;
    project.deleteTask = projectObj.deleteTask;

    project.tasks.forEach((task) => {
      task.getCompleted = listObj.getCompleted;
      task.setCompleted = listObj.setCompleted;
    })

  })

  return localProjects;
}