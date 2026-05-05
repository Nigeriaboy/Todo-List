import { getProjects, createProject, saveProject, saveTask, updateTask } from "./utilityfunctions";
import { displayProject } from "./project-display.js";
import { taskBarCreator } from "./task-display.js";
import { format } from "date-fns";
import { taskPopUpDisplayer } from "./task-popup-box.js";


export function displayTaskForm(){
    const body = document.querySelector('body');
    const formContainer = document.createElement('div')
    formContainer.id = "form-container"

    formContainer.style.display = 'flex';
    formContainer.style.background = "rgba(0, 0, 0, 0.5)"
    formContainer.style.backdropFilter = 'blur(3px)'
    formContainer.innerHTML = `
        <div id="container">
            <div id="task-container">
                <div class="caption"> ADD TASK</div>
                 <div id="task-form-container">
                    <form action="">
                        <label for="task-title">Task Title:</label>
                        <input type="text" name="task-title" id="task-title">

                        <label for="task-description">Description:</label>
                        <input type="text" name="task-description" id="task-description">

                        <label for="due-date">Due Date:</label>
                        <input type="date" name="due-date" id="due-date">

                        <label for="priority">Priority:</label>
                        <select name="priority" id="priority">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>

                        <div id='cancel-add-container'>
                            <input type='button' value= "Cancel" class='cancel-btn'>
                            <input type="submit" value="Add Task" id="task-submit" required>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `
    body.appendChild(formContainer)

    // cancel button
    const cancelBtn = document.querySelector(".cancel-btn");

    cancelBtn.addEventListener('click', () => {
        formContainer.innerHTML = '';
        formContainer.style.display = 'none';
    })

    const taskDisplay = document.querySelector("#task-display");

    // Disable past date from being selectable
    const dueDate = document.querySelector("#due-date");
    const today = format(new Date(), "yyyy-MM-dd");
    dueDate.setAttribute("min", today);

    // Make the calender input "read-only" so that date can only be chosen with calender picker
    dueDate.addEventListener('keydown', (e) => {
        e.preventDefault();
    })


    // Saving Tasks
    const taskSubmitBtn = document.getElementById("task-submit")

    taskSubmitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const taskTitle = document.getElementById("task-title");
        const taskDescription = document.getElementById("task-description");
        const dueDate = document.getElementById("due-date");
        const priority = document.getElementById("priority");
        const projectTitle = document.getElementById("project-name");

        if (taskTitle.value && taskDescription.value && dueDate.value && priority.value){
            saveTask(projectTitle.textContent,taskTitle.value,taskDescription.value,dueDate.value,priority.value);
                
            // Dynamically update the task-displayer after successfully adding a new task
            taskDisplay.append(taskBarCreator(taskTitle.value,taskDescription.value,dueDate.value,priority.value,false))

            // Empty the input boxes
            taskTitle.value = '';
            taskDescription.value = '';
            dueDate.value = '';
            priority.value = '';

            alert("Task Saved Successfully!");
        }
        else{
            alert("No box should be left empty!!!");
        }

        // Exit from form
        formContainer.innerHTML = '';
        formContainer.style.display = 'none';

    })    
}

export function displayProjectForm(){

    const body = document.querySelector('body')
    const formContainer = document.createElement('div')
    formContainer.id = "form-container"

    formContainer.style.display = 'flex';
        formContainer.style.background = "rgba(0, 0, 0, 0.5)"
        formContainer.style.backdropFilter = 'blur(3px)'
        formContainer.innerHTML = `
            <div id="container" style='height: 320px'>
                <div id="projects-container">
                    <div class="caption"> ADD PROJECT</div>
                    <div id="project-form-container">
                        <form action="">
                            <label for="project-title">Project Title:</label>
                            <input type="text" name="project-title" class="project-title" required>

                            <label for="project-description">Project Description:</label>
                            <input type="text" name="project-description" class="project-description" required>

                            <div id='cancel-add-container'>
                                <input type='button' value= "Cancel" class="cancel-btn">
                                <input type="submit" value="Add Project" id="project-submit" required>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `

        body.appendChild(formContainer)

        // cancel button
        const cancelBtn = document.querySelector(".cancel-btn");

        cancelBtn.addEventListener('click', () => {
            formContainer.innerHTML = '';
            formContainer.style.display = 'none';
        })

        // Saving Project
        const projectSubmitBtn = document.getElementById('project-submit')

        projectSubmitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            
            const projectTitle = document.querySelector('.project-title');
            const projectDescription = document.querySelector('.project-description');

            if (projectTitle.value && projectDescription.value){
                const newProject = createProject(projectTitle.value,projectDescription.value);
                if (saveProject(newProject)){
                    alert("Project Saved Successfully!");
                }


                // Empty the input boxes
                projectTitle.value = ''; 
                projectDescription.value = '';

                // Dynamically updates the Project Display
                displayProject();
            }
            else{
                alert("No box should be left empty!!!");
            }

            // Exit from form
            formContainer.innerHTML = '';
            formContainer.style.display = 'none';

        })
}

export function displayTaskEditForm(projectTitle, oldTaskTitle){
    const body = document.querySelector('body');
    const formContainer = document.createElement('div')
    formContainer.id = "form-container";

    // Gets information about the task
    const projectList = getProjects();
    let oldTaskDescription;
    let oldDueDate;
    let isDone;

    for (let project of projectList){
        if(project.title === projectTitle){
            let taskList = project.task;
            for (let task of taskList){
                if (task.taskTitle === oldTaskTitle){
                    oldTaskDescription = task.description;
                    oldDueDate = task.dueDate;
                    isDone = task.isDone;

                    break;
                }
            }
        }
    }


    formContainer.style.display = 'flex';
    formContainer.style.background = "rgba(0, 0, 0, 0.5)"
    formContainer.style.backdropFilter = 'blur(3px)'
    formContainer.innerHTML = `
        <div id="container">
            <div id="task-container">
                <div class="caption"> EDIT TASK</div>
                 <div id="task-form-container">
                    <form action="">
                        <label for="task-title">Task Title:</label>
                        <input type="text" value='${oldTaskTitle}' name="task-title" id="task-title">

                        <label for="task-description">Description:</label>
                        <input type="text" value='${oldTaskDescription}'  name="task-description" id="task-description">

                        <label for="due-date">Due Date:</label>
                        <input type="date" value='${oldDueDate}' name="due-date" id="due-date">

                        <label for="priority">Priority:</label>
                        <select name="priority" id="priority">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>

                        <div id='cancel-add-container'>
                            <input type='button' value= "Cancel" class='cancel-btn'>
                            <input type="submit" value="Save Task" id="task-submit" required>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `
    body.appendChild(formContainer)

    // cancel button
    const cancelBtn = document.querySelector(".cancel-btn");

    cancelBtn.addEventListener('click', () => {
        formContainer.innerHTML = '';
        formContainer.style.display = 'none';
    })

    const taskDisplay = document.querySelector("#task-display");

    // Disable past date from being selectable
    const dueDate = document.querySelector("#due-date");
    const today = format(new Date(), "yyyy-MM-dd");
    dueDate.setAttribute("min", today);

    // Make the calender input "read-only" so that date can only be chosen with calender picker
    dueDate.addEventListener('keydown', (e) => {
        e.preventDefault();
    })


    // Saving Tasks
    const taskSubmitBtn = document.getElementById("task-submit")

    taskSubmitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const newTaskTitle = document.getElementById("task-title");
        const newTaskDescription = document.getElementById("task-description");
        const newDueDate = document.getElementById("due-date");
        const newPriority = document.getElementById("priority");

        if (newTaskTitle.value && newTaskDescription.value && newDueDate.value && newPriority.value){
            updateTask(projectTitle,oldTaskTitle,newTaskTitle.value,newTaskDescription.value,newDueDate.value, newPriority.value);
                
            // Dynamically update the task-popup-displayer after successfully editing a task
            taskPopUpDisplayer(projectTitle, newTaskTitle.value);

            const taskDisplay = document.querySelector("#task-display");
            const projectList = getProjects();
            taskDisplay.innerHTML = '';
            
            for (let project of projectList){
                if (project.title === projectTitle){
                    let taskList = project.task;
                    for (let task of taskList){
                        let taskDiv = taskBarCreator(task.taskTitle,task.description,task.dueDate,task.priority,task.isDone,project.title);

                        taskDisplay.append(taskDiv);
                    }
                }
            }



            // Empty the input boxes
            newTaskTitle.value = '';
            newTaskDescription.value = '';
            newDueDate.value = '';
            newPriority.value = '';

            alert("Task Saved Successfully!");
        }
        else{
            alert("No box should be left empty!!!");
        }

        // Exit from form
        formContainer.innerHTML = '';
        formContainer.style.display = 'none';

    })    
}

// Change content of the homepage depending on the option chosen

const addProjectBtn = document.querySelector("#addprojectbtn > p");

addProjectBtn.addEventListener('click', () => {
    displayProjectForm();

})

const addTaskBtn = document.querySelector("#addtaskbtn > p");

addTaskBtn.addEventListener('click', () => {
    displayTaskForm();

})

// display the 'Edit-task-form'.
document.body.addEventListener('click', (e) => {
    const editSvg = e.target.closest('#task-container .edit-svg');

    if (!editSvg) return false; // return false if no svg button is clicked.

    const projectTitle = editSvg.dataset.projectTitle;
    const oldTaskTitle = editSvg.dataset.taskTitle;

    displayTaskEditForm(projectTitle,oldTaskTitle);
})

