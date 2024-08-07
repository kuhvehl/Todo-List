export function createListItem(title, description, dueDate, priority = 'low', notes, checkList = [], completed = false) {
    function setCompleted() {
        completed ? completed = false : completed = true;
    }

    function getCompleted() {
        return completed;
    }
    return { title, dueDate, description, priority, notes, checkList, getCompleted, setCompleted };
}