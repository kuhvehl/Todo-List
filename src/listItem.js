export function createListItem(title, description, dueDate, priority = 'low', notes, checkList = []) {

    return { title, dueDate, description, priority, notes, checkList };
}