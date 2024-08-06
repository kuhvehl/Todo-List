import './style.css';
import { createProject } from './project';
import { updateProjectsDisplay } from './display';
import { createListItem } from './listItem';

const testProject = createProject('test project');
const anotherTestProject = createProject('test project');
const testTask = createListItem('test task', 'testing things out', 'tomorrow', 'high', 'keep testing!', ['do a test', 'do another test']);
const anotherTestTask = createListItem('another test task', 'testing things out', 'tomorrow', 'high', 'keep testing!', ['do a test', 'do another test']);

testProject.addTask(testTask);
testProject.addTask(anotherTestTask);

updateProjectsDisplay([testProject, anotherTestProject], 0);
