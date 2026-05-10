import {deleteTask, deleteProject, getProjects } from "./utilityfunctions.js";
import { taskBarCreator} from "./task-display.js";

document.body.addEventListener('click', (e) => {
    const deleteSvg = e.target.closest('#task-container .delete-svg');

    if (!deleteSvg) return false; // return false if no svg button is clicked.

    const container = document.createElement('div');
    container.id = "container";
    container.style.height = '50px';
    container.style.width = 'fit-content';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center'
    container.style.gap = '10px';
    container.style.textAlign = 'center';

    const paragraph = document.createElement('p')
    paragraph.innerText = "Are you sure you wanna delete this task? ";

    const yes = document.createElement('p');
    yes.className = 'yesbtn';
    yes.innerText = "YES";
    yes.style.backgroundColor = 'var(--primary-color)';
    yes.style.color = 'black';
    yes.style.fontWeight = 'bold';
    yes.style.padding = '7px';

    const no = document.createElement('p');
    no.className = 'nobtn';
    no.innerText = "NO";
    no.style.backgroundColor = 'red';
    no.style.color = 'white';
    no.style.fontWeight = 'bold';
    no.style.padding = '7px';

    const body = document.querySelector('body');
    const formContainer = document.createElement('div')
    formContainer.id = "form-container";
    formContainer.style.display = 'flex';
    formContainer.style.background = "rgba(0, 0, 0, 0.5)"
    formContainer.style.backdropFilter = 'blur(3px)'


    container.append(paragraph, yes, no);
    formContainer.append(container);
    body.appendChild(formContainer);

    yes.addEventListener('click', () => {
        const projectTitle = deleteSvg.dataset.projectTitle;
        const taskTitle = deleteSvg.dataset.taskTitle;

        const taskInfoPopUpContainer = document.querySelector('.taskInfoPopUpContainer');

        deleteTask(projectTitle, taskTitle);
        
        taskInfoPopUpContainer.innerHTML = '';
        taskInfoPopUpContainer.style.display = 'none';

        formContainer.innerHTML = '';
        formContainer.style.display = 'none';

        // Dynamically update the task-display after deletion of a task
        const taskDisplay = document.querySelector('#task-display');

        const projectList = getProjects();

        if (projectList){
            for (let project of projectList){
                if (project.title === projectTitle){
                    const taskList = project.task;

                    // Clear the taskDisplay container before populating it with left tasks
                    taskDisplay.innerHTML = '';

                    if (taskList.length !== 0){
                        for (let task of taskList){

                            taskDisplay.append(taskBarCreator(task.taskTitle,task.description, task.dueDate, task.priority, task.isDone, projectTitle))
                        }
                    }
                    else{
                        const noTask = document.createElement('div')
                        noTask.innerText = "No Task for this Project.";
                        noTask.style.textAlign = "center";
                        noTask.style.fontWeight = 'normal';

                        taskDisplay.append(noTask);
                    }
                }
            }
        }

    })

    no.addEventListener('click', () => {

        formContainer.innerHTML = '';
        formContainer.style.display = 'none';
    })
})