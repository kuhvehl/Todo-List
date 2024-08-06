export function updateProjectsDisplay(projects, index) {
    const projectsList = document.querySelector('.projects');
    const tasksList = document.querySelector('.tasks');


    projects.forEach(project => {
        const projectButton = document.createElement('div');
        projectButton.textContent = project.title;  
        projectsList.appendChild(projectButton);
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
        taskTitle.textContent = task.title;
        dueDate.textContent = `Due ${task.dueDate}`;
        editButton.textContent = 'View/Edit';
        deleteButton.textContent = 'Delete';

        taskDiv.appendChild(taskCircle);
        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(dueDate);
        taskDiv.appendChild(editButton);
        taskDiv.appendChild(deleteButton);
        tasksList.appendChild(taskDiv);
    });





    console.log(projects[index].getTasks());
}