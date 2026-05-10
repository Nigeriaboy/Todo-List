import { displayProject } from './project-display.js'
import { getProjects, markDone, markUnDone } from './utilityfunctions.js';

const projectListContainer = document.querySelector('#projects');
const projectName = document.querySelector('#project-name')
const projectDescription = document.querySelector('#project-description')
const taskDisplay = document.querySelector("#task-display");

export function taskBarCreator(title,description,date,prior,isDone,projectTitle){
                const taskDiv = document.createElement('div');
                const taskTitle = document.createElement("p");
                const taskDescription = document.createElement('p');
                const dueDate = document.createElement('p')
                const openBtn = document.createElement('p');
                const priority = document.createElement('p');
                const done = document.createElement('p');

                openBtn.dataset.projectTitle = projectTitle;
                openBtn.dataset.taskTitle = title;

                done.dataset.projectTitle = projectTitle;
                done.dataset.taskTitle = title

                openBtn.className = "open";
                taskTitle.className = "task-name";
                taskDescription.className = "description";
                priority.style.color = `var(--${prior}-priority`

                taskTitle.innerText = title;
                taskDescription.innerText = description;
                dueDate.innerText = date;
                openBtn.innerText = "^";
                priority.innerText = prior.toUpperCase();

                // put line-through on the task if 'done'
                if (isDone){
                    done.innerText = 'UnDone';
                    done.className = "done";
                    done.style.textDecoration = "line-through";
                    taskTitle.style.textDecoration = "line-through";
                    taskDescription.style.textDecoration = "line-through";
                    dueDate.style.textDecoration = "line-through";
                    priority.style.textDecoration = "line-through";
                }
                else{
                    done.innerText = 'Done';
                    done.className = "done";
                }
                

                taskDiv.style.borderLeft = `solid var(--${prior}-priority)`
                taskDiv.append(taskTitle, taskDescription, dueDate, openBtn, priority, done);

                return taskDiv;
}

// Targets clicked project from the left bar in other to show it's available tasks.
projectListContainer.addEventListener('click', (e) => {
    const projectParagraph = document.querySelectorAll("#left-side-bar > #projects > p");
    const clickedProject = e.target.closest('.project-paragraph');

    if (!clickedProject) return false; // Return false if none of the project is clicked

    // It will give all the project-paragraph their initial size and color before applying the desired design to our clicked project-paragraph
    projectParagraph.forEach(paragraph => {
        paragraph.style.fontSize = "clamp(6px,2vw,15px)";
        paragraph.style.color = "white";
    });

    projectName.innerHTML = clickedProject.textContent;

    // Desired design for our clicked project-paragraph
    clickedProject.style.fontSize = "clamp(7px,2vw,16px)";
    clickedProject.style.color = "var(--general-color)";

    const projects = getProjects();
    for (let project of projects){
        if (project.title === clickedProject.textContent){
            projectDescription.innerText = project.description;
            const projectTask = project.task; // Array of tasks


            // If the clicked project has no Task
            if (projectTask.length === 0){
                const noTask = document.createElement('div')
                noTask.innerText = "No Task for this Project.";
                noTask.style.textAlign = "center";
                noTask.style.fontWeight = 'normal';

                taskDisplay.innerHTML = '';
                taskDisplay.append(noTask);

            }
            else {
                taskDisplay.innerHTML = '';

                for (let task of projectTask){
                    const taskDiv = taskBarCreator(task.taskTitle,task.description,task.dueDate,task.priority,task.isDone,project.title);
                    taskDisplay.append(taskDiv);
                }
            }


        }
    }

})

// put line of stroke on the task when 'done' is clicked
taskDisplay.addEventListener('click', (e) => {
    const clickedBtn = e.target.closest(".done");

    if (!clickedBtn) return;

    if (clickedBtn.textContent === 'UnDone'){
        markUnDone(clickedBtn.dataset.projectTitle, clickedBtn.dataset.taskTitle);
    }
    else{
        markDone(clickedBtn.dataset.projectTitle, clickedBtn.dataset.taskTitle);
    }


    // Re-update the screen 
    taskDisplay.innerHTML = '';
    const projectList = getProjects();
        
    for (let project of projectList){
        if (project.title === clickedBtn.dataset.projectTitle){
            const taskList = project.task;

            for (let task of taskList){
                const taskDiv = taskBarCreator(task.taskTitle,task.description,task.dueDate,task.priority,task.isDone,project.title);
                taskDisplay.append(taskDiv);
            }
        }
    }

})


