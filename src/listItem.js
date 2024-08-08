export function createListItem(title, dueDate, completed = false, description, priority = 'low', notes, checkList = []) {
    function setCompleted() {
        completed ? completed = false : completed = true;
    }

    function getCompleted() {
        return completed;
    }

    return { title, dueDate, description, priority, notes, getCompleted, setCompleted };
}