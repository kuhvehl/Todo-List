import './style.css';
import { createProject } from './project';
import { updateProjectsDisplay } from './display';

const testProject = createProject('test project');

console.log(testProject.name);

testProject.addTask('test task');
console.log(testProject.getTasks());
console.log(testProject.getTasks());

updateProjectsDisplay(testProject);
