import './style.css';
import { createProject } from './project';
import { updateProjectsDisplay } from './display';
import { createListItem } from './listItem';

const testProject = createProject('test project');
const anotherTestProject = createProject('test project');
const testTask = createListItem('test task', 'testing things out', 'tomorrow', 'high', 'keep testing!', ['do a test', 'do another test']);
const anotherTestTask = createListItem('another test task', 'testing things out', 'tomorrow', 'high', 'keep testing!', ['do a test', 'do another test']);


console.log(testTask);
console.log(testProject);

testProject.addTask(testTask);
testProject.addTask(anotherTestTask);
console.log(testProject.getTasks());

updateProjectsDisplay([testProject, anotherTestProject], 0);
