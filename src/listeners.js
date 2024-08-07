import { projectsObj } from "./projects";
import { createProject } from "./project";
import { updateDisplay } from "./display";
import { createListItem } from "./listItem";

export function addListeners() {
    const addTaskButton = document.querySelector('.add-task')
    const newTask = document.querySelector('.task-dialog');
    const taskTitle = document.querySelector('#title');
    const due = document.querySelector('#due');
    addTaskButton.addEventListener('click', openTaskDialogue);

    const addProjectButton = document.querySelector('.add-project')
    const projectDialog = document.querySelector('.project-dialog');
    const projectTitle = document.querySelector('#project-title')
    const projectDivs = document.querySelectorAll('.project')
    addProjectButton.addEventListener('click', openProjectDialogue);
    projectDialog.addEventListener('close', closeProjectDialogue);

    let currentIndex;

    projectDivs.forEach((div) => {
        div.addEventListener('click', function(e) {
            currentIndex = e.target.dataset.projectIndex;
            console.log(currentIndex);
            projectDialog.removeEventListener('close', closeProjectDialogue);
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
            projectDialog.removeEventListener('close', closeProjectDialogue);
            updateDisplay((projectsObj.getProjects()), currentIndex);
        }
    }

    function openTaskDialogue() {
        taskTitle.value = ''
        due.value = ''
        newTask.showModal();
    }
    
    function closeDialog() {
        if (newTask.returnValue === 'submit') {
            const newTask = title.value;
            const newDueDate = due.value;
    
            const newListItem = createListItem(newTask, newDueDate);

            updateProjectsDisplay([testProject, anotherTestProject], 0)
        }
    }
}










// this.clearBooks();
// this.displayBooks();