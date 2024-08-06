export function createListItem(title, description, dueDate, priority = 'low', notes, checkList = []) {

    return { title, description, dueDate, priority, notes, checkList };
}