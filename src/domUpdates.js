import { projects, selectedProjectId, createProject, createTask, save } from "./appLogic"

const newProjectForm = document.querySelector('[data-new-project-form]')
const newProjectInput = document.querySelector('[data-new-project-input]')
const projectsContainer = document.querySelector('[data-projects]')
const deleteProjectButton = document.querySelector('[data-delete-project-button]')
const todoListDisplayContainer = document.querySelector('[todo-list-display-container]')
const projectTitleElement = document.querySelector('[project-list-title]')
const taskCountElement = document.querySelector('[data-task-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function renderProjects() {
    projects.forEach(project => {
        const projectToRender = document.createElement('li')
        projectToRender.dataset.projectId = project.id
        projectToRender.classList.add("project-name")
        projectToRender.innerText = project.name
        if (project.id === selectedProjectId) {
            projectToRender.classList.add('active-project')
          }
        projectsContainer.appendChild(projectToRender)
    })
}

export function render() {
    clearElement(projectsContainer)
    renderProjects()

    const selectedProject = projects.find(project => project.id === selectedProjectId)
    if (selectedProjectId == null) {
      todoListDisplayContainer.style.display = 'none'
    } else {
      todoListDisplayContainer.style.display = ''
      projectTitleElement.innerText = selectedProject.name
      renderTaskCount(selectedProject)
      clearElement(tasksContainer)
      renderTasks(selectedProject)
    }
  }

function saveAndRender() {
    save()
    render()
  }

projectsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedProjectId = e.target.dataset.projectId
        saveAndRender();
    }
})

newProjectForm.addEventListener('submit', e => {
    e.preventDefault()
    const projectName = newProjectInput.value
    if (projectName == null || projectName === '') return
    const project = createProject(projectName)
    newProjectInput.value = null
    projects.push(project)
    saveAndRender()
  })

  deleteProjectButton.addEventListener('click', e => {
    projects = projects.filter(project => project.id !== selectedProjectId)
    selectedProjectId = null
    saveAndRender()
  })




  function renderTasks(selectedProject) {
    selectedProject.tasks.forEach(task => {
      const taskElement = document.importNode(taskTemplate.content, true)
      const checkbox = taskElement.querySelector('input')
      checkbox.id = task.id
      checkbox.checked = task.complete
      const label = taskElement.querySelector('label')
      label.htmlFor = task.id
      label.append(task.name)
      tasksContainer.appendChild(taskElement)
    })
  }

  newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = newTaskInput.value
    if (taskName == null || taskName === '') return
    const task = createTask(taskName)
    newTaskInput.value = null
    const selectedProject = projects.find(project => project.id === selectedProjectId)
    selectedProject.tasks.push(task)
    saveAndRender()
  })

  function renderTaskCount(selectedProject) {
    const incompleteTaskCount = selectedProject.tasks.filter(task => !task.complete).length
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
    taskCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
  }

  tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
      const selectedProject = projects.find(project => project.id === selectedProjectId)
      const selectedTask = selectedProject.tasks.find(task => task.id === e.target.id)
      selectedTask.complete = e.target.checked
      save()
      renderTaskCount(selectedProject)
    }
  })

  clearCompleteTasksButton.addEventListener('click', e => {
    const selectedProject = projects.find(project => project.id === selectedProjectId)
    selectedProject.tasks = selectedProject.tasks.filter(task => !task.complete)
    saveAndRender()
  })
