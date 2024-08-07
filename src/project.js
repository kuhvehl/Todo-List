export function createProject(title) {
    const tasks = [];

    function getTasks() {
        return tasks;
    }
    
    function getTask(i) {
        return tasks[i];
    }

    function addTask(task) {
        tasks.push(task);
    }

    function deleteTask (i) {
        tasks.splice(i, 1);
    }

    function updateTask (i, updatedTask) {
        tasks.splice(i, 1, updatedTask);
    }

    return { title, addTask, getTasks, getTask, deleteTask, updateTask };
}