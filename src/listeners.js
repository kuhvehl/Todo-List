import { createProject } from "./project";
import { updateDisplay } from "./display";
import { createListItem } from "./listItem";
import { addToLocalStorage } from "./localStorage";
import { projectsStart as projectsObj } from ".";



let taskCloseListening;
let projectCloseListening;
let editProject
let viewEditTaskIndex;
let currentTask;

let currentIndex;
if (currentIndex === undefined) {
    currentIndex = 0;
}

export function addListeners() {
    const addTaskButton = document.querySelector('.add-task')
    const newTaskDialog = document.querySelector('.task-dialog');
    const taskCircles = document.querySelectorAll('.circle');
    const editTaskButtons = document.querySelectorAll('.edit-task')
    const deleteTaskButtons = document.querySelectorAll('.delete-task')
    const taskTitle = document.querySelector('#title');
    const due = document.querySelector('#due');
    const description = document.querySelector('#description');
    const priority = document.querySelectorAll('input[name="priority');
    const notes = document.querySelector('#notes');
    addTaskButton.addEventListener('click', openTaskDialogue);

    if (!taskCloseListening) {
        newTaskDialog.addEventListener('close', closeTaskDialog);
        taskCloseListening = true;
    }
    
    editTaskButtons.forEach((editButton => {
        editButton.addEventListener('click', function(e) {
            viewEditTaskIndex = e.target.parentElement.dataset.taskIndex;
            openTaskDialogue();
        })
    }))

    deleteTaskButtons.forEach((deleteButton => {
        deleteButton.addEventListener('click', function(e) {
            projectsObj.getProject(currentIndex).deleteTask(e.target.parentElement.dataset.taskIndex);
            addToLocalStorage(projectsObj);
            updateDisplay(projectsObj.getProjects(), currentIndex);
        })
    }))

    taskCircles.forEach(taskCircle => {
        taskCircle.addEventListener('click', function(e) {
            const task = projectsObj.getProject(currentIndex).getTask(e.target.parentElement.dataset.taskIndex);
            task.setCompleted();
            addToLocalStorage(projectsObj);
            updateDisplay(projectsObj.getProjects(), currentIndex);
        })
    })

    function openTaskDialogue() {
        if (viewEditTaskIndex) {
            currentTask = projectsObj.getProject(currentIndex).getTask(viewEditTaskIndex);
            taskTitle.value = currentTask.title;
            due.value = currentTask.dueDate;
            description.value = currentTask.description;
            priority.forEach(priority => {
                if (priority.value === currentTask.priority) {
                    priority.checked = true;
                } else {
                    priority.checked = false;
                }
            })
            notes.value = currentTask.notes;
            newTaskDialog.showModal();
        } else {
            taskTitle.value = ''
            due.value = ''
            description.value = '';
            priority.forEach(priority => {
                if (priority.value === 'low') {
                    priority.checked = true;
                } else {
                    priority.checked = false;
                }
            })
            notes.value = '';
            newTaskDialog.showModal();
        }
    }
    
    function closeTaskDialog() {
        if (newTaskDialog.returnValue === 'submit') {
            let newTask = title.value;
            let newDueDate = due.value;
            let newDescription = description.value;
            let newPriority = document.querySelector('input[name="priority"]:checked').value;
            let newNotes = notes.value;

            if (viewEditTaskIndex) {
                let completed = currentTask.getCompleted();
                let updatedListItem = createListItem(newTask, newDueDate, newDescription, newPriority, newNotes, completed);
                projectsObj.getProject(currentIndex).updateTask(viewEditTaskIndex, updatedListItem);
                addToLocalStorage(projectsObj); 
                updateDisplay(projectsObj.getProjects(), currentIndex)
                viewEditTaskIndex = false;
                currentTask = '';
            } else {
                let newListItem = createListItem(newTask, newDueDate, newDescription, newPriority, newNotes);
                projectsObj.getProject(currentIndex).addTask(newListItem);
                addToLocalStorage(projectsObj);
                updateDisplay(projectsObj.getProjects(), currentIndex)
                viewEditTaskIndex = false;
                currentTask = '';
            }
        }
        viewEditTaskIndex = false;
        currentTask = '';
    }

    const addProjectButton = document.querySelector('.add-project')
    const deleteProjectButton = document.querySelector('.delete-project');
    const editProjectButton = document.querySelector('.edit-project');
    const projectDialog = document.querySelector('.project-dialog');
    const projectTitle = document.querySelector('#project-title')
    const projectDivs = document.querySelectorAll('.project')
    addProjectButton.addEventListener('click', openProjectDialogue);

    if (!projectCloseListening) {
        projectDialog.addEventListener('close', closeProjectDialogue);
        projectCloseListening = true;
    }
    
    if (projectsObj.getProjects().length > 0 && deleteProjectButton !== null) {
        deleteProjectButton.addEventListener('click', function() {
            projectsObj.deleteProject(currentIndex);
            addToLocalStorage(projectsObj);
            updateDisplay(projectsObj.getProjects());
        })
    }

    if (projectsObj.getProjects().length > 0 && editProjectButton !== null) {
        editProjectButton.addEventListener('click', function(e) {
            e.stopPropagation();
            editProject = e.target.dataset.projectIndex;
            addToLocalStorage(projectsObj);
            updateDisplay(projectsObj.getProjects(), currentIndex);
            openProjectDialogue();
        })
    }

    projectDivs.forEach((div) => {
        div.addEventListener('click', function(e) {
            currentIndex = Number(e.target.dataset.projectIndex);
            addToLocalStorage(projectsObj);
            updateDisplay(projectsObj.getProjects(), currentIndex);
        })
    })

    function openProjectDialogue() {
        if (editProject) {
            projectTitle.value = projectsObj.getProject(currentIndex).title;
            projectDialog.showModal();
        } else {
            projectTitle.value = ''
            projectDialog.showModal();
        }
    }

    function closeProjectDialogue() {
        if (projectDialog.returnValue === 'submit') {
            const newProjectTitle = projectTitle.value;
            if (editProject) {
                projectsObj.projects[currentIndex].title = newProjectTitle;
                addToLocalStorage(projectsObj);
                updateDisplay(projectsObj.getProjects(), currentIndex);
                editProject = false
            } else {
                let newProject = createProject(newProjectTitle);
                projectsObj.addProject(newProject);
                currentIndex = projectsObj.getProjects().length - 1;
                addToLocalStorage(projectsObj);
                updateDisplay(projectsObj.getProjects(), currentIndex);
            }
            editProject = false;    
        }
    }
}