import { getProjects, createProject, saveProject, saveTask } from "./utilityfunctions";



    // Show options under the Add button

    const addBtn = document.getElementById("addbtn");
    const options = document.getElementById("options");

    options.style.display = 'none'; // Initialize to ensure it's hidden

    addBtn.addEventListener('click', () => {
        if (options.style.display === 'none') options.style.display = 'block';
        else options.style.display = 'none'
            
    })



    // Change content of the homepage depending on the option chosen

    const addProjectBtn = document.getElementById("addprojectbtn");
    const addTaskBtn = document.getElementById("addtaskbtn");
    const main = document.querySelector("main")

    addProjectBtn.addEventListener('click', () => {
        options.style.display = 'none'
        main.innerHTML = '';
        main.innerHTML = `
            <div id="container">
                <div id="projects-container">
                    <div class="caption"> ADD PROJECT</div>
                    <div id="project-form-container">
                        <form action="">
                            <label for="project-title">Project Title:</label>
                            <input type="text" name="project-title" id="project-title" required>

                            <label for="project-description">Project Description:</label>
                            <input type="text" name="project-description" id="project-description" required>

                            <input type="submit" value="Add Project" id="project-submit" required>
                        </form>
                    </div>
                </div>
            </div>
        `

        // Saving Project
        const projectSubmitBtn = document.getElementById('project-submit')

        projectSubmitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            
            const projectTitle = document.getElementById('project-title');
            const projectDescription = document.getElementById('project-description');

            if (projectTitle.value && projectDescription.value){
                const newProject = createProject(projectTitle.value,projectDescription.value);
                saveProject(newProject);


                // Empty the input boxes
                projectTitle.value = ''; 
                projectDescription.value = '';
                alert("Project Saved Successfully!");
            }
            else{
                alert("No box should be left empty!!!");
            }

        })

    })

    addTaskBtn.addEventListener('click', () => {
        options.style.display = 'none'
        main.innerHTML = '';
        main.innerHTML = `
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

                            <label for="task-project-title">Save under these projects:</label>
                            <select name="task-project-title" id="task-project-title">

                            </select>

                            <input type="submit" value="Add Task" id="task-submit">
                        </form>
                    </div>
                </div>
            </div>
        `

        const taskBtn = document.getElementById('task-btn');
        const taskFormContainer = document.getElementById('task-form-container');
        const taskProjectTitle = document.getElementById('task-project-title');
        const projects = getProjects();

        // Gives me list of available projects
        projects.forEach(project => {
            taskProjectTitle.innerHTML += `<option value="${project.title}">${project.title}</option>`
        });

        // Saving Tasks
        const taskSubmitBtn = document.getElementById("task-submit")

        taskSubmitBtn.addEventListener('click', (event) => {
            event.preventDefault();

            const taskTitle = document.getElementById("task-title");
            const taskDescription = document.getElementById("task-description");
            const dueDate = document.getElementById("due-date");
            const priority = document.getElementById("priority");
            const projectTitle = document.getElementById("task-project-title")

            if (taskTitle.value && taskDescription.value && dueDate.value && priority.value && projectTitle.value){
                saveTask(projectTitle.value,taskTitle.value,taskDescription.value,dueDate.value,priority.value);
                
                // Empty the input boxes
                taskTitle.value = '';
                taskDescription.value = '';
                dueDate.value = '';
                priority.value = '';
                projectTitle.value = '';

                alert("Task Saved Successfully!");
            }
            else{
                alert("No box should be left empty!!!");
            }

        })
    

    })









