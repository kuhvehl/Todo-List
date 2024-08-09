export function createListItem(title, dueDate, description, priority = 'low', notes, completed = false) {    
    
    function setCompleted() {
        this.completed = !this.completed;
    }

    function getCompleted() {
        return this.completed;
    }

    return { title, dueDate, description, priority, notes, completed, getCompleted, setCompleted };
}

export const listObj = createListItem()