import { projectsObj } from "./projects";
import { createProject } from "./project";
import { updateDisplay } from "./display";
import { createListItem } from "./listItem";

let taskCloseListening;
let projectCloseListening;

let currentIndex;
if (!currentIndex) {
    currentIndex = 0;
}

export function addListeners() {
    const addTaskButton = document.querySelector('.add-task')
    const newTaskDialog = document.querySelector('.task-dialog');
    const taskTitle = document.querySelector('#title');
    const due = document.querySelector('#due');
    addTaskButton.addEventListener('click', openTaskDialogue);
    if (!taskCloseListening) {
        newTaskDialog.addEventListener('close', closeTaskDialog);
        taskCloseListening = true;
    }


    const addProjectButton = document.querySelector('.add-project')
    const projectDialog = document.querySelector('.project-dialog');
    const projectTitle = document.querySelector('#project-title')
    const projectDivs = document.querySelectorAll('.project')
    addProjectButton.addEventListener('click', openProjectDialogue);

    if (!projectCloseListening) {
        projectDialog.addEventListener('close', closeProjectDialogue);
        projectCloseListening = true;
    }

    projectDivs.forEach((div) => {
        div.addEventListener('click', function(e) {
            currentIndex = e.target.dataset.projectIndex;
            console.log(currentIndex);
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
            console.log(currentIndex)
            updateDisplay((projectsObj.getProjects()), currentIndex);
        }
    }

    function openTaskDialogue() {
        taskTitle.value = ''
        due.value = ''
        newTaskDialog.showModal();
    }
    
    function closeTaskDialog() {
        if (newTaskDialog.returnValue === 'submit') {
            let newTask = title.value;
            let newDueDate = due.value;
            let newListItem = createListItem(newTask, newDueDate);
            console.log(currentIndex);
            console.log(projectsObj.getProject(0));
            projectsObj.getProject(currentIndex).addTask(newListItem);
            updateDisplay((projectsObj.getProjects()), currentIndex)
        }
    }
}










// this.clearBooks();
// this.displayBooks();