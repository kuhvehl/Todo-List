export function addProjectList(projectNames) {
    const projectList = document.getElementById('project-list');

    projectNames.forEach(projectName => {
        const newProject = document.createElement('div');
        newProject.classList.add('project');

        const projectLink = document.createElement('a');
        projectLink.textContent = projectName;
        newProject.appendChild(projectLink);

        const editIcon = document.createElement('img');
        editIcon.src = '../src/square-edit-outline.svg';
        editIcon.alt = 'SVG Image';
        editIcon.width = 15;
        editIcon.height = 15;
        editIcon.classList.add('svg-hover');
        newProject.appendChild(editIcon);

        projectList.appendChild(newProject);
    });
}

export function showProjectForm() {
    const projectForm = document.getElementById('projectForm');
    projectForm.style.display = 'grid';
}