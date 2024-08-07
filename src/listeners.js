import { projectsObj } from "./projects";
import { createProject } from "./project";
import { updateDisplay } from "./display";
import { createListItem } from "./listItem";

let taskCloseListening;
let projectCloseListening;
let viewEditTaskIndex;


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

    addTaskButton.addEventListener('click', openTaskDialogue);

    if (!taskCloseListening) {
        newTaskDialog.addEventListener('close', closeTaskDialog);
        taskCloseListening = true;
    }
    
    editTaskButtons.forEach((editButton => {
        editButton.addEventListener('click', function(e) {
            console.log(e.target.dataset.taskIndex);
            viewEditTaskIndex = e.target.dataset.taskIndex;
            openTaskDialogue();
        })
    }))

    deleteTaskButtons.forEach((deleteButton => {
        deleteButton.addEventListener('click', function(e) {
            projectsObj.getProject(currentIndex).deleteTask(e.target.dataset.taskIndex);
            updateDisplay((projectsObj.getProjects()), currentIndex);
        })
    }))

    taskCircles.forEach(taskCircle => {
        taskCircle.addEventListener('click', function(e) {
            const task = projectsObj.getProject(currentIndex).getTask(e.target.dataset.taskIndex);
            task.setCompleted();
            updateDisplay((projectsObj.getProjects()), currentIndex);
        })
    })

    function openTaskDialogue() {
        if (viewEditTaskIndex) {
            const currentTask = projectsObj.getProject(currentIndex).getTask(viewEditTaskIndex);
            taskTitle.value = currentTask.title;
            due.value = currentTask.dueDate;
            newTaskDialog.showModal();
        } else {
        taskTitle.value = ''
        due.value = ''
        newTaskDialog.showModal();
    }
    }
    
    function closeTaskDialog() {
        if (newTaskDialog.returnValue === 'submit') {
            let newTask = title.value;
            let newDueDate = due.value;
            let newListItem = createListItem(newTask, newDueDate);
            console.log(viewEditTaskIndex);
            if (viewEditTaskIndex) {
                projectsObj.getProject(currentIndex).updateTask(viewEditTaskIndex, newListItem); 
                updateDisplay((projectsObj.getProjects()), currentIndex)
                viewEditTaskIndex = false;
            } else {
                projectsObj.getProject(currentIndex).addTask(newListItem);
                updateDisplay((projectsObj.getProjects()), currentIndex)
            }
        }
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
    
    if (projectsObj.getProjects().length > 0 && deleteProjectButton !== null) {
        deleteProjectButton.addEventListener('click', function() {
            projectsObj.deleteProject(currentIndex);
            updateDisplay((projectsObj.getProjects()));
        })
    }

    projectDivs.forEach((div) => {
        div.addEventListener('click', function(e) {
            currentIndex = e.target.dataset.projectIndex;
            updateDisplay((projectsObj.getProjects()), e.target.dataset.projectIndex);
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
            currentIndex = projectsObj.getProjects().length - 1;
            updateDisplay((projectsObj.getProjects()), currentIndex);
        }
    }
}










// this.clearBooks();
// this.displayBooks();