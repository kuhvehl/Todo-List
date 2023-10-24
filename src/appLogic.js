const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'selectedProjectId'
const LOCAL_STORAGE_PROJECTS_KEY = 'projects'

export let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)
export let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY));

export function saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId)
}

export class Task {
    constructor(task, description, due, priority, notes) {
        this.id = Date.now().toString()
        this.Task = task;
        this.Description = description;
        this.Due = due;
        this.Priority = priority;
        this.Notes = notes;
    }
}

class Project {
    constructor(name) {
        this.id = Date.now().toString()
        this.name = name;
        this.tasks = [];
    }
    
    addTask(task, description, due, priority, notes, subtasks = []) {
        const newTask = new Task(task, description, due, priority, notes, subtasks);
        this.tasks.push(newTask);
        saveProjectsToLocalStorage();
        return this;
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId)
        saveProjectsToLocalStorage();
        return this
    }
}

export function createProject(name) {
    const newProject = new Project(name);
    return newProject
}

export function deleteProject(projectToDelete) {
    projects = projects.filter(project => project.id !== projectToDelete.id)
}