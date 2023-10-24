import './style.css';

//APP LOGIC & STORAGE
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'selectedProjectId'
const LOCAL_STORAGE_PROJECTS_KEY = 'projects'
const LOCAL_STORAGE_SELECTED_TASK_ID_KEY = 'selectedTaskId'

let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY)) || [];
let selectedTaskId = localStorage.getItem(LOCAL_STORAGE_SELECTED_TASK_ID_KEY)


function saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId)
    localStorage.setItem(LOCAL_STORAGE_SELECTED_TASK_ID_KEY, selectedTaskId)
}

class Task {
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
    
    addTask(task, description, due, priority, notes) {
        const newTask = new Task(task, description, due, priority, notes);
        this.tasks.push(newTask);
        saveProjectsToLocalStorage();
        return this;
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        saveProjectsToLocalStorage();
    }

    getSelectedTask(taskId) {
        return this.tasks.find(task => task.id == taskId);
    }
}

function createProject(name) {
    const newProject = new Project(name);
    return newProject;
}

function createAndSaveProject(name) {
    projects.push(createProject(name));
    saveProjectsToLocalStorage();
}

function getSpecificProject(projectId) {
    const specificProject = projects.find(project => project.id == projectId);
    if (specificProject) {
        return Object.assign(new Project(), specificProject);
    }
}

function deleteProject(projectId) {
    projects = projects.filter(project => project.id != projectId)
    saveProjectsToLocalStorage();
}

function getSelectedProject(projectId) {
    const selectedProject = projects.find(project => project.id == projectId);
    if (selectedProject) {
        return Object.assign(new Project(), selectedProject);
    }
}

function replaceSelectedProject(newProject) {
    projects = projects.map(project => {
        if (project.id === selectedProjectId) {
            return newProject;
        }
        return project;
    });
    saveProjectsToLocalStorage();
}

//DOM UPDATES
const projectsDiv = document.querySelector('.projects')
const tasksDiv = document.querySelector('.tasks')
const newProjectForm = document.getElementById('new-project-form')
const newProjectInput = document.getElementById('newProject')
const deleteButton = document.querySelector('.delete-project')
const addTaskForm = document.getElementById('addTaskForm')
const deleteTask = document.querySelector('.delete-task')

const taskFormHeading = document.createElement('h2');
taskFormHeading.textContent = "Edit Task Info";
taskFormHeading.classList.add('taskFormHeading');


const editTaskForm = document.createElement('form');
editTaskForm.id = 'editTaskForm';

const taskNameLabel = createLabel('taskName', 'Task Name:');
const taskNameInput = createInput('text', 'taskName');

const taskDescriptionLabel = createLabel('taskDescription', 'Task Description:');
const taskDescriptionInput = createInput('text', 'taskDescription');

const taskDueDateLabel = createLabel('taskDueDate', 'Due Date:');
const taskDueDateInput = createInput('date', 'taskDueDate');

const taskPriorityLabel = createLabel('taskPriority', 'Priority:');
const taskPriorityInput = createSelect('taskPriority', ['High', 'Normal', 'Low']);

const taskNotesLabel = createLabel('taskNotes', 'Notes:');
const taskNotesInput = createTextarea('taskNotes');

const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.textContent = 'Close / Submit Edits';
submitButton.classList.add('submit-edits');


function saveAndRender() {
    saveProjectsToLocalStorage();
    render();
}

function render() {
    displayProjects();
    displayTasks();
}

//--PROJECTS
function displayProjects() {
    projectsDiv.innerHTML = '';
    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        const projectName = document.createElement('h3');
        projectName.textContent = project.name;
        projectName.dataset.projectId = project.id
        projectDiv.appendChild(projectName);
        if (project.id === selectedProjectId) {
            projectDiv.classList.add('selected-project')
        }
        projectsDiv.appendChild(projectDiv);
    });
}

newProjectForm.addEventListener('submit', e => {
    e.preventDefault();
    const projectName = newProjectInput.value;
    if (projectName == null || projectName.trim() === '') {
      return;
    }

    createAndSaveProject(projectName)
    newProjectInput.value = '';
    displayProjects();
});

projectsDiv.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'h3') {
        selectedProjectId = e.target.dataset.projectId
    }
    saveAndRender();
})

deleteButton.addEventListener('click', e => {
    deleteProject(selectedProjectId);
    selectedProjectId = "";
    render();
})


//--TASKS
function displayTasks() {
    tasksDiv.innerHTML = '';
    const selectedProject = getSelectedProject(selectedProjectId);
    const label = document.querySelector('.label')

    if (selectedProject) {
    label.textContent = `${selectedProject.name} to-do items:`
    } else {
        return
    }

    selectedProject.tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        const taskName = document.createElement('h3');
        taskName.textContent = task.Task;
        taskName.dataset.taskId = task.id;
       
        if (task.Priority == "High") {
            taskName.classList.add("high");
        } else if (task.Priority == "Normal") {
            taskName.classList.add("normal")
        } else {
            taskName.classList.add("low");
        }
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-task');
        deleteButton.textContent = "Delete";
        deleteButton.dataset.taskId = task.id;
        const editButton = document.createElement('button');
        editButton.textContent = "Edit/View Details";
        editButton.classList.add('edit-task');
        editButton.dataset.taskId = task.id;
        const dueDate = document.createElement('div');
        dueDate.textContent = task.Due;
        taskDiv.appendChild(taskName);
        taskDiv.appendChild(dueDate);
        taskDiv.appendChild(editButton);
        taskDiv.appendChild(deleteButton);
        tasksDiv.appendChild(taskDiv);

    });
}

addTaskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const selectedProject = getSelectedProject(selectedProjectId);

    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskNotes = document.getElementById('taskNotes').value;

    if (selectedProject) {
        selectedProject.addTask(taskName, taskDescription, taskDueDate, taskPriority, taskNotes);
    } else {
        return;
    }
    render();
    addTaskForm.reset();
  });

tasksDiv.addEventListener('click', e => {
    if (e.target.classList.contains('delete-task')) {
        selectedTaskId = e.target.dataset.taskId;
        const selectedProject = getSelectedProject(selectedProjectId);
        selectedProject.deleteTask(selectedTaskId);
        replaceSelectedProject(selectedProject);
        render();
    } else if (e.target.classList.contains('edit-task')) {
        selectedTaskId = e.target.dataset.taskId;
        populateForm();
        showEditTaskForm();
    } else if (e.target.classList.contains('submit-edits')) {
        e.preventDefault();
        const selectedProject = getSelectedProject(selectedProjectId);
        const selectedTask = selectedProject.getSelectedTask(selectedTaskId);
           
        if (selectedTask) {
            selectedTask.id = selectedTaskId;
            selectedTask.Task = taskNameInput.value;
            selectedTask.Description = taskDescriptionInput.value;
            selectedTask.Due = taskDueDateInput.value;
            selectedTask.Priority = taskPriorityInput.value;
            selectedTask.Notes = taskNotesInput.value;
        
            saveProjectsToLocalStorage();
        }
        editTaskForm.reset();
        tasksDiv.innerHTML = '';
        render();
    }
});

function populateForm() {
    const selectedProject = getSelectedProject(selectedProjectId);
    const selectedTask = selectedProject.getSelectedTask(selectedTaskId);

    if (selectedTask) {
        taskNameInput.value = selectedTask.Task;
        taskDescriptionInput.value = selectedTask.Description;
        taskDueDateInput.value = selectedTask.Due;
        taskPriorityInput.value = selectedTask.Priority;
        taskNotesInput.value = selectedTask.Notes;
    }
}

function showEditTaskForm() {
    tasksDiv.innerHTML = '';
    editTaskForm.appendChild(taskFormHeading);
    editTaskForm.appendChild(taskNameLabel);
    editTaskForm.appendChild(taskNameInput);
    editTaskForm.appendChild(taskDescriptionLabel);
    editTaskForm.appendChild(taskDescriptionInput);
    editTaskForm.appendChild(taskDueDateLabel);
    editTaskForm.appendChild(taskDueDateInput);
    editTaskForm.appendChild(taskPriorityLabel);
    editTaskForm.appendChild(taskPriorityInput);
    editTaskForm.appendChild(taskNotesLabel);
    editTaskForm.appendChild(taskNotesInput);
    editTaskForm.appendChild(submitButton);

    tasksDiv.appendChild(editTaskForm);

    populateForm();
}

  function createLabel(forId, text) {
    const label = document.createElement('label');
    label.for = forId;
    label.textContent = text;
    return label;
  }
  
  function createInput(type, id) {
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = id;
    return input;
  }
  
  function createSelect(id, options) {
    const select = document.createElement('select');
    select.id = id;
    select.name = id;
  
    options.forEach(optionText => {
      const option = document.createElement('option');
      option.value = optionText;
      option.textContent = optionText;
      select.appendChild(option);
    });
  
    return select;
  }
  
  function createTextarea(id) {
    const textarea = document.createElement('textarea');
    textarea.id = id;
    textarea.name = id;
    return textarea;
  }

render();
