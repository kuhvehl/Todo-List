// import './style.css';

// const projectsContainer = document.querySelector('[data-projects]')
// const newProjectForm = document.querySelector('[data-new-project-form]')
// const newProjectInput = document.querySelector('[data-new-project-input]')
// const deleteProjectButton = document.querySelector('[data-delete-project-button]')
// const todoListDisplayContainer = document.querySelector('[todo-list-display-container]')
// const projectTitleElement = document.querySelector('[project-list-title]')
// const taskCountElement = document.querySelector('[data-task-count]')
// const tasksContainer = document.querySelector('[data-tasks]')
// const taskTemplate = document.getElementById('task-template')
// const newTaskForm = document.querySelector('[data-new-task-form]')
// const newTaskInput = document.querySelector('[data-new-task-input]')
// const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')

// const LOCAL_STORAGE_PROJECT_KEY = 'project.lists'
// const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'project.selectedListId'
// let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || []
// let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)

// projectsContainer.addEventListener('click', e => {
//   if (e.target.tagName.toLowerCase() === 'li') {
//     selectedListId = e.target.dataset.listId
//     saveAndRender()
//   }
// })

// tasksContainer.addEventListener('click', e => {
//   if (e.target.tagName.toLowerCase() === 'input') {
//     const selectedList = lists.find(list => list.id === selectedListId)
//     const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
//     selectedTask.complete = e.target.checked
//     save()
//     renderTaskCount(selectedList)
//   }
// })

// clearCompleteTasksButton.addEventListener('click', e => {
//   const selectedList = lists.find(list => list.id === selectedListId)
//   selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
//   saveAndRender()
// })

// deleteProjectButton.addEventListener('click', e => {
//   lists = lists.filter(list => list.id !== selectedListId)
//   selectedListId = null
//   saveAndRender()
// })

// newProjectForm.addEventListener('submit', e => {
//   e.preventDefault()
//   const listName = newProjectInput.value
//   if (listName == null || listName === '') return
//   const list = createList(listName)
//   newProjectInput.value = null
//   lists.push(list)
//   saveAndRender()
// })

// newTaskForm.addEventListener('submit', e => {
//   e.preventDefault()
//   const taskName = newTaskInput.value
//   if (taskName == null || taskName === '') return
//   const task = createTask(taskName)
//   newTaskInput.value = null
//   const selectedList = lists.find(list => list.id === selectedListId)
//   selectedList.tasks.push(task)
//   saveAndRender()
// })

// function createList(name) {
//   return { id: Date.now().toString(), name: name, tasks: [] }
// }

// function createTask(name) {
//   return { id: Date.now().toString(), name: name, complete: false }
// }

// function saveAndRender() {
//   save()
//   render()
// }

// function save() {
//   localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(lists))
//   localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedListId)
// }

/*function render() {
  clearElement(projectsContainer)
  renderLists()

  const selectedList = lists.find(list => list.id === selectedListId)
  if (selectedListId == null) {
    todoListDisplayContainer.style.display = 'none'
  } else {
    todoListDisplayContainer.style.display = ''
    projectTitleElement.innerText = selectedList.name
    renderTaskCount(selectedList)
    clearElement(tasksContainer)
    renderTasks(selectedList)
  }
}*/

/*function renderTasks(selectedList) {
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true)
    const checkbox = taskElement.querySelector('input')
    checkbox.id = task.id
    checkbox.checked = task.complete
    const label = taskElement.querySelector('label')
    label.htmlFor = task.id
    label.append(task.name)
    tasksContainer.appendChild(taskElement)
  })
}*/

// function renderTaskCount(selectedList) {
//   const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length
//   const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
//   taskCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
// }

// function renderLists() {
//   lists.forEach(list => {
//     const listElement = document.createElement('li')
//     listElement.dataset.listId = list.id
//     listElement.classList.add("project-name")
//     listElement.innerText = list.name
//     if (list.id === selectedListId) {
//       listElement.classList.add('active-project')
//     }
//     projectsContainer.appendChild(listElement)
//   })
// }

// function clearElement(element) {
//   while (element.firstChild) {
//     element.removeChild(element.firstChild)
//   }
// }

// render()