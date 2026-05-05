export function createProject(title, description){
    return {
        title,
        description,
        task: [],
    };
}

export function saveProject(project){
    const projects = JSON.parse(localStorage.getItem("projects")  || '[]'); // Projects are saved inside array for easy later access

    // Return false if the project title has been used before
    for (let i = 0; projects.length > i; i++){
        if (project.title === projects[i].title){
            alert("Project name used before.")
            return false;
        }
    }

    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects))

    return true;
}

export function saveTask(projectTitle, taskTitle, description, dueDate, priority){
    const projects = JSON.parse(localStorage.getItem("projects") || '[]');
    const task = {
        taskTitle,
        description,
        dueDate,
        priority,
        isDone: false,
    }

    /**
    // Save the task under its specific project
    for (let project of projects){
        if (project.title === projectTitle){

            // Check if task Title has been used before
            for (let existingTask of project.task){
                if (existingTask.taskTitle === taskTitle){
                    return false;
                }
            }
            project.task.push(task);
            localStorage.setItem("projects", JSON.stringify(projects));
            return true;
        }
    } */

    // Save the task under its specific project
    for (let project of projects){
        if (project.title === projectTitle){

            // Check if task Title has been used before
            for (let existingTask of project.task){
                if (existingTask.taskTitle === taskTitle){
                    alert("Task name used before.")
                    return false;
                }
            }
            project.task.push(task);
            localStorage.setItem("projects", JSON.stringify(projects));
            return true;
        }
    }


    return false;
}

export function getProjects(){
    return JSON.parse(localStorage.getItem("projects")  || '[]')
}


export function deleteProject(projectTitle){
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');

    // Creates a new array excluding the project with the given projecTitle
    let newProjects = projects.filter(project => project.title !== projectTitle);

    if (newProjects.length < projects.length){
        localStorage.setItem('projects', JSON.stringify(newProjects));
        return true;
    }

    return false;
}

export function deleteTask(projectTitle, taskTitle){
    const projects = JSON.parse(localStorage.getItem("projects") || '[]')

    for (let project of projects){
        if (project.title === projectTitle){

            let newTasks = project.task.filter(task => task.taskTitle !== taskTitle)

            if (newTasks.length < project.task.length){
                project.task = newTasks;
                localStorage.setItem('projects', JSON.stringify(projects));
                
                return true;
            }
        }
    }

    return false;
}

export function updateProject(oldProjectTitle, newProjectTitle, newProjectDescription) {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Find the project to update
    const projectIndex = projects.findIndex(project => project.title === oldProjectTitle);
    if (projectIndex === -1) {
        return false; // Old project not found
    }
    
    // Check if new title is already used by another project
    const titleExists = projects.some(project => project.title === newProjectTitle && project.title !== oldProjectTitle);
    if (titleExists) {
        return false; // New title already in use
    }
    
    // Update the project
    projects[projectIndex].title = newProjectTitle;
    projects[projectIndex].description = newProjectDescription;
    localStorage.setItem('projects', JSON.stringify(projects));
    
    return true;
}

export function updateTask(projectTitle, oldTaskTitle, newTaskTitle, newDescription, newDueDate, newPriority) {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Find the project
    const project = projects.find(p => p.title === projectTitle);
    if (!project) {
        return false; // Project not found
    }
    
    // Find the task to update
    const taskIndex = project.task.findIndex(task => task.taskTitle === oldTaskTitle);
    if (taskIndex === -1) {
        return false; // Task not found
    }
    
    // Check if new task title is already used in this project (by another task)
    const titleExists = project.task.some(task => task.taskTitle === newTaskTitle && task.taskTitle !== oldTaskTitle);
    if (titleExists) {
        return false; // New title already in use in this project
    }
    
    // Update the task
    project.task[taskIndex].taskTitle = newTaskTitle;
    project.task[taskIndex].description = newDescription;
    project.task[taskIndex].dueDate = newDueDate;
    project.task[taskIndex].priority = newPriority;
    localStorage.setItem('projects', JSON.stringify(projects));
    
    return true;
}


export function markDone(projectTitle,taskTitle){
    const projectList = getProjects();

    for (let project of projectList){
        if(project.title === projectTitle){
            const taskList = project.task;

            for (let task of taskList){
                if(task.taskTitle === taskTitle){
                    task.isDone = true;

                    // Update the task "isDone" as "true" in the localStorage.
                    localStorage.setItem('projects', JSON.stringify(projectList));
                    
                    return;
                }
            }
        }
    }
}

export function markUnDone(projectTitle,taskTitle){
    const projectList = getProjects();

    for (let project of projectList){
        if(project.title === projectTitle){
            const taskList = project.task;

            for (let task of taskList){
                if(task.taskTitle === taskTitle){
                    task.isDone = false;
        
                    // Update the task "isDone" as "false" in the localStorage.
                    localStorage.setItem('projects', JSON.stringify(projectList));
                    
                    return;
                }
            }
        }
    }
}
