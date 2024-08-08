export function createListItem(title, dueDate, description, priority = 'low', notes, completed = false) {
    function setCompleted() {
        completed ? completed = false : completed = true;
    }

    function getCompleted() {
        return completed;
    }

    return { title, dueDate, description, priority, notes, getCompleted, setCompleted };
}