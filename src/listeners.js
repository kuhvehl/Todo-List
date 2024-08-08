import { projectsObj } from "./projects";
import { createProject } from "./project";
import { updateDisplay } from "./display";
import { createListItem } from "./listItem";

let taskCloseListening;
let projectCloseListening;
let viewEditTaskIndex;
let currentTask;

let currentIndex;
if (currentIndex === undefined) {
    currentIndex = 0;
}

export function addListeners() {
    const currentProjects = projectsObj.getProjects();
    const currentProject = projectsObj.getProject(currentIndex);

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
            currentProject.deleteTask(e.target.parentElement.dataset.taskIndex);
            updateDisplay(currentProjects, currentIndex);
        })
    }))

    taskCircles.forEach(taskCircle => {
        taskCircle.addEventListener('click', function(e) {
            const task = currentProject.getTask(e.target.parentElement.dataset.taskIndex);
            task.setCompleted();
            updateDisplay(currentProjects, currentIndex);
        })
    })

    function openTaskDialogue() {
        if (viewEditTaskIndex) {
            currentTask = currentProject.getTask(viewEditTaskIndex);
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
                currentProject.updateTask(viewEditTaskIndex, updatedListItem); 
                updateDisplay(currentProjects, currentIndex)
                viewEditTaskIndex = false;
                currentTask = '';
            } else {
                let newListItem = createListItem(newTask, newDueDate, newDescription, newPriority, newNotes);
                currentProject.addTask(newListItem);
                updateDisplay(currentProjects, currentIndex)
                viewEditTaskIndex = false;
                currentTask = '';
            }
        }
        viewEditTaskIndex = false;
        currentTask = '';
    }

    const addProjectButton = document.querySelector('.add-project')
    const deleteProjectButton = document.querySelector('.delete-project');
    const projectDialog = document.querySelector('.project-dialog');
    const projectTitle = document.querySelector('#project-title')
    const projectDivs = document.querySelectorAll('.project')
    addProjectButton.addEventListener('click', openProjectDialogue);

    if (!projectCloseListening) {
        projectDialog.addEventListener('close', closeProjectDialogue);
        projectCloseListening = true;
    }
    
    if (currentProjects.length > 0 && deleteProjectButton !== null) {
        deleteProjectButton.addEventListener('click', function() {
            projectsObj.deleteProject(currentIndex);
            updateDisplay(currentProjects);
        })
    }

    projectDivs.forEach((div) => {
        div.addEventListener('click', function(e) {
            currentIndex = e.target.dataset.projectIndex;
            updateDisplay(currentProjects, e.target.dataset.projectIndex);
        })
    })

    function openProjectDialogue() {
        projectTitle.value = ''
        projectDialog.showModal();
    }

    function closeProjectDialogue() {
        if (projectDialog.returnValue === 'submit') {
            let newProject = createProject(projectTitle.value);
            projectsObj.addProject(newProject);
            currentIndex = currentProjects.length - 1;
            updateDisplay(currentProjects, currentIndex);
        }
    }
}










// this.clearBooks();
// this.displayBooks();