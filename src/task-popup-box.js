import { getProjects } from "./utilityfunctions";
import { differenceInCalendarDays } from "date-fns";

// Show full information of a Task when the Open-button is clicked

export function getRemainingDays(dueDate){

    const today = new Date();

    const remainingDays = differenceInCalendarDays(dueDate, today);

    if (remainingDays > 1){
        return (`Remaining ${remainingDays} days.`);
    }
    else if(remainingDays === 1){
        return (`Remaining a day.`);
    }
    else if(remainingDays === 0){
        return (`Due today.`)
    }
    else{
        return(`Overdue since ${Math.abs(remainingDays)} days ago.`)
    }
}

export function taskPopUpDisplayer(projectTitle, taskTitle){
    
    const openBtn = document.querySelector(".open");
    const taskInfoPopUpContainer = document.createElement("div");
    const container = document.createElement("div");
    const body = document.querySelector("body");
    taskInfoPopUpContainer.className = "taskInfoPopUpContainer";

    // Remove all the elements with classname 'taskInfoPopUpContainer' if existed
    const elements = document.querySelectorAll('.taskInfoPopUpContainer')
    if (elements){
        elements.forEach(e => e.remove())
    }

    taskInfoPopUpContainer.style.display = "flex";
    taskInfoPopUpContainer.style.backdropFilter = "blur(3px)";
    taskInfoPopUpContainer.style.background = "rgba(0, 0, 0, 0.5)";

    const projectList = getProjects();

    for (let project of projectList){
        if (projectTitle === project.title){
            const taskList = project.task;

            for (let task of taskList){
                if (task.taskTitle === taskTitle) {
                    const taskInfo = task;
                    const taskContainer = document.createElement("div");
                    taskContainer.id = "task-container";

                    const leftSide = document.createElement("div");
                    leftSide.id = "left"
                    const title = document.createElement("div");
                    title.className = "task-title";
                    const description = document.createElement("div");
                    description.className = "task-description";
                    const dueDate = document.createElement("div");
                    dueDate.className = "task-due-date";
                    const closeBtn = document.createElement("p");
                    closeBtn.className = "closeBtn";

                    const rightSide = document.createElement("div");
                    rightSide.id = "right"

                    const priority = document.createElement("div");
                    priority.className = "task-priority";

                    const editBtn = document.createElement("div");
                    editBtn.className = "task-edit";
                    
                    const deleteBtn = document.createElement("div");
                    deleteBtn.className = "task-delete";

                    // left-side stuff
                    title.innerText = taskInfo.taskTitle.toUpperCase();
                    description.innerHTML = `<span>DESCRIPTION:</span> ${taskInfo.description}`;
                    dueDate.innerHTML = `<span>DUE-DATE:</span> ${taskInfo.dueDate}, ${getRemainingDays(taskInfo.dueDate)}`;
                    closeBtn.innerText = "CLOSE";

                    // close the task-info-pop-up when clicked
                    closeBtn.addEventListener("click", () => {
                        taskInfoPopUpContainer.innerHTML = "";
                        taskInfoPopUpContainer.style.display = 'none';
                    })

                    // right-side stuff
                    priority.innerText = taskInfo.priority.toUpperCase();
                    priority.style.background = `var(--${taskInfo.priority}-priority)`
                    editBtn.innerHTML = `<svg data-task-title='${task.taskTitle}' data-project-title='${projectTitle}' class='edit-svg' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="rgb(9, 236, 236)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="rgb(9, 236, 236)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> </g> </g> </g> </g></svg>`;


                    deleteBtn.innerHTML = `<svg fill="rgb(9, 236, 236)" data-task-title='${task.taskTitle}' data-project-title='${projectTitle}'  class='delete-svg' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="rgb(9, 236, 236)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g></svg>`;


                    leftSide.append(title,description,dueDate,closeBtn);
                    rightSide.append(priority,editBtn,deleteBtn);
                    taskContainer.append(leftSide, rightSide);
                    taskInfoPopUpContainer.append(taskContainer);
                    break;
                }
            }


        }
    }

    body.append(taskInfoPopUpContainer);
}


const taskBar = document.querySelector("#task-display");

taskBar.addEventListener('click', (e) => {
    const clickedOpenBtn = e.target.closest(".open");

    if (!clickedOpenBtn) return false; // Return false if none of the project is clicked



    const projectTitle = clickedOpenBtn.dataset.projectTitle;
    const taskTitle = clickedOpenBtn.dataset.taskTitle;

    taskPopUpDisplayer(projectTitle, taskTitle);
})
