export function createProject (name) {
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

    return { name, addTask, getTasks, getTask, deleteTask };
}