import './style.css';
import { updateDisplay } from './display';
import { getFromLocalStorage } from './localStorage';
import { addListeners } from './listeners';

export const projectsStart = getFromLocalStorage()

if (projectsStart.getProjects().length > 0) {
updateDisplay(projectsStart.getProjects(), 0);
} else {
    addListeners();
}

