const LOCAL_STORAGE_PROJECT_LIST_KEY = 'list.projects'
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'list.selectedProjectId'
export let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_LIST_KEY)) || []
export let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)

export function createProject(name) {
    return { 
        id: Date.now().toString(), 
        name: name, 
        tasks: []
    }
}

export function createTask(name) {
    return { id: Date.now().toString(), name: name, complete: false }
  }

export function save() {
    localStorage.setItem(LOCAL_STORAGE_PROJECT_LIST_KEY, JSON.stringify(projects))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId)
  }