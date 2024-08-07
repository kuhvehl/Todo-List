import './style.css';
import { updateDisplay } from './display';
import { projectsObj } from './projects';

updateDisplay(projectsObj.getProjects(), 0);
