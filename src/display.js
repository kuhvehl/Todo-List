import { addListeners } from "./listeners";
import { format } from "date-fns";


export function updateDisplay(projects, index) {
    const projectsDisplay = document.querySelector('.projects');
    const tasksDisplay = document.querySelector('.tasks');

    projectsDisplay.innerHTML = '';
    tasksDisplay.innerHTML = '';''


    projects.forEach((project, projectIndex) => {
        const projectButton = document.createElement('div');
        const projectTitle = document.createElement('div');
        projectTitle.dataset.projectIndex = projectIndex;
        projectTitle.textContent = project.title; 
        projectButton.dataset.projectIndex = projectIndex;

        projectButton.appendChild(projectTitle);

        if (index == projectIndex) {
            projectButton.classList.add('current-project', 'project');
            const deleteEditDiv = document.createElement('div');
            const deleteProject = document.createElement('div');
            const editProject = document.createElement('div');

            
            deleteEditDiv.classList.add('delete-edit');
            deleteProject.classList.add('delete-project');
            editProject.classList.add('edit-project')

            deleteProject.textContent = 'Delete';
            editProject.textContent = 'Edit';
            editProject.dataset.projectIndex = projectIndex;

            deleteEditDiv.appendChild(editProject);
            deleteEditDiv.appendChild(deleteProject);
            projectButton.appendChild(deleteEditDiv);

        } else {
            projectButton.classList.add('project');
        }
        projectsDisplay.appendChild(projectButton);
    })

    if (index !== undefined) {
    projects[index].getTasks().forEach((task, taskIndex) => {
        const taskDiv = document.createElement('div');
        const taskCircle = document.createElement('div');
        const taskTitle = document.createElement('div');
        const dueDate = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        
        taskDiv.classList.add('task');
        taskCircle.classList.add('circle');
        if (task.getCompleted()) {
            taskCircle.classList.add('completed');
            taskCircle.textContent = '✓';
            taskTitle.classList.add('completed');
        }
        editButton.classList.add('edit-task');
        deleteButton.classList.add('delete-task');
        taskDiv.dataset.taskIndex = taskIndex;

        taskTitle.textContent = task.title;
        if (task.dueDate) {
            dueDate.textContent = `Due ${format(new Date(task.dueDate.replace(/-/g, '/')), "MM/dd/yyyy")}`;
        }
        editButton.textContent = 'View/Edit';
        deleteButton.textContent = 'Delete';

        taskDiv.appendChild(taskCircle);
        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(dueDate);
        taskDiv.appendChild(editButton);
        taskDiv.appendChild(deleteButton);
        tasksDisplay.appendChild(taskDiv);
    });
}

    addListeners();
}