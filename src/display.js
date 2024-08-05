export function updateProjectsDisplay(projects) {
    const projectsList = document.querySelector('.projects')

    projects.getTasks().forEach(project => {
        const projectButton = document.createElement('button');
        projectButton.textContent = project;  
        projectsList.appendChild(projectButton);
    }); 
}