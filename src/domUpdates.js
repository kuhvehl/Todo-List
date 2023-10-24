import { createProject, projects, selectedProjectId, saveProjectsToLocalStorage, deleteProject, Task } from "./appLogic";

const projectsDiv = document.querySelector('.projects')
const tasksDiv = document.querySelector('.tasks')
const newProjectForm = document.getElementById('new-project-form')
const newProjectInput = document.getElementById('newProject')
const deleteButton = document.querySelector('.delete-project')
const addTaskForm = document.getElementById('addTaskForm');





















/*
export function displayTaskDetails(selectedProject, selectedTask) {
    const project = projects.find(proj => proj.name === selectedProject);
    if (project) {
        const task = project.tasks.find(t => t.Task === selectedTask);
        if (task) {
            tasksDiv.innerHTML = '';
            const taskDetailsDiv = document.createElement('div');
            taskDetailsDiv.classList.add('task-details');
            for (const key in task) {
                const detailItem = document.createElement('p');
                detailItem.textContent = `${key}: ${task[key]}`;
                taskDetailsDiv.appendChild(detailItem);
            }
            tasksDiv.appendChild(taskDetailsDiv);
        }
    }
}



export function deleteAndDisplayTasks (selectedProject, taskId) {
    const project = projects.find(proj => proj.name === selectedProject);
    project.deleteTask(taskId);
    displayTasks(project);
}*/

