import './style.css';
import { createProject } from './project';

const testProject = createProject('test project');

console.log(testProject.name);

testProject.addTask('test task');
console.log(testProject.getTasks());
testProject.deleteTask(0);
console.log(testProject.getTasks());
