import { addListeners } from "./listeners";

export function updateDisplay(projects, index) {
    const projectsDisplay = document.querySelector('.projects');
    const tasksDisplay = document.querySelector('.tasks');

    // console.log(currentProjectsObj);

    projectsDisplay.innerHTML = '';
    tasksDisplay.innerHTML = '';

    projects.forEach((project, projectIndex) => {
        const projectButton = document.createElement('div');
        projectButton.dataset.projectIndex = projectIndex;
        if (index == projectIndex) {
            projectButton.classList.add('current-project', 'project');
        } else {
            projectButton.classList.add('project');
        }
        projectButton.textContent = project.title;  
        projectsDisplay.appendChild(projectButton);
    })
    
    projects[index].getTasks().forEach(task => {
        const taskDiv = document.createElement('div');
        const taskCircle = document.createElement('div');
        const taskTitle = document.createElement('div');
        const dueDate = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        
        taskDiv.classList.add('task');
        taskCircle.classList.add('circle');
        editButton.classList.add('edit');
        deleteButton.classList.add('delete');

        taskTitle.textContent = task.title;
        dueDate.textContent = `Due ${task.dueDate}`;
        editButton.textContent = 'View/Edit';
        deleteButton.textContent = 'Delete';

        taskDiv.appendChild(taskCircle);
        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(dueDate);
        taskDiv.appendChild(editButton);
        taskDiv.appendChild(deleteButton);
        tasksDisplay.appendChild(taskDiv);
    });

    addListeners();
}