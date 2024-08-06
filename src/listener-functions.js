import { projectsObj } from "./projects";
import { createProject } from "./project";
import { updateProjectsDisplay } from "./display";

export function addListeners() {
    const addTaskButton = document.querySelector('.add-task')
    const newTask = document.querySelector('.task-dialog');
    const taskTitle = document.querySelector('#title');
    const due = document.querySelector('#due');
    addTaskButton.addEventListener('click', openTaskDialogue);

    const addProjectButton = document.querySelector('.add-project')
    const projectDialog = document.querySelector('.project-dialog');
    const projectTitle = document.querySelector('#project-title')
    addProjectButton.addEventListener('click', openProjectDialogue);
    projectDialog.addEventListener('close', closeProjectDialogue);

    function openProjectDialogue() {
        projectTitle.value = ''
        projectDialog.showModal();
    }

    function closeProjectDialogue() {
        if (projectDialog.returnValue === 'submit') {
            projectsObj.addProject(createProject(projectTitle.value));
            updateProjectsDisplay(projectsObj, projectsObj.getProjects().length - 1);
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