import { createProject, saveTask, saveProject, getProjects, deleteProject, deleteTask, updateProject, updateTask } from './utilityfunctions'

import { displayProject } from './project-display.js'
import { taskBarCreator } from './task-display.js'

import './style.css'
import './form-saver.js'
import './project-display.js'
import './task-display.js'
import './task-popup-box.js'
import './delete.js'

displayProject();

// Display task of the first project after loading of the page

const projectName = document.querySelector('#project-name')
const projectDescription = document.querySelector('#project-description')
const taskDisplay = document.querySelector("#task-display");

const projectList = getProjects();

if (projectList){
    const firstProject = projectList[0];

    projectName.innerText = firstProject.title;
    projectDescription.innerText = firstProject.description;

    const firstProjectTasks = firstProject.task;

    if (firstProjectTasks.length !== 0){
        for (let task of firstProjectTasks){
            
            taskDisplay.append(taskBarCreator(task.taskTitle,task.description,task.dueDate,task.priority,task.isDone,firstProject.title))
        }
    }
    else {
            const noTask = document.createElement('div')
            noTask.innerText = "No Task for this Project.";
            noTask.style.textAlign = "center";
            noTask.style.fontWeight = 'normal';

            taskDisplay.append(noTask);
    }

    const firstProjectParagraph = document.querySelector("#projects > p[data-id = '0']");
    firstProjectParagraph.style.fontSize = "clamp(7px,2vw,16px)";
    firstProjectParagraph.style.color = "var(--general-color)";
}