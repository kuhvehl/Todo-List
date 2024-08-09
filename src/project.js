export function createProject(projectTitle) {
    let title = projectTitle;
    
    const tasks = [];

    function getTasks() {
        return this.tasks;
    }
    
    function getTask(i) {
        return this.tasks[i];
    }

    function addTask(task) {
        this.tasks.push(task);
    }

    function deleteTask (i) {
        this.tasks.splice(i, 1);
    }

    function updateTask (i, updatedTask) {
        this.tasks.splice(i, 1, updatedTask);
    }

    function setTitle (newTitle) {
        title = newTitle;
    }

    return { addTask, getTasks, getTask, deleteTask, updateTask, setTitle, title, tasks };
}

export const projectObj = createProject();
