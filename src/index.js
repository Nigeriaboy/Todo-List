import { createProject, saveTask, saveProject, getProjects, deleteProject, deleteTask, updateProject, updateTask } from './utilityfunctions'

// -----------------------------

const project1 = createProject("hello","this is just the beginning");
const project2 = createProject("hello2","this is just the beginning (part 2)");
const project3 = createProject("hello3","this is just the beginning (part 3)");
const project4 = createProject("hello4","this is just the beginning (part 4)");

saveProject(project1);
saveProject(project2);
saveProject(project3);
saveProject(project4);

//saveTask("hello","subhello", "subhello description", "31-12-25");
//saveTask("hello2","subhello2", "subhello2 description", "31-12-26");
saveTask("hello2","subhello", "subhello2 description", "31-12-26");
saveTask("hello2","subhello3", "subhello2 description", "31-12-26"); 


const projects = getProjects();
console.log(`Projects length: ${projects.length}`)

projects.forEach(project => {
    
    console.log(`Project Title: '${project.title}', Project Description: '${project.description}'`)
    console.log(`Task length: ${project.task.length}`)

    if (project.task.length > 0){
        console.log(`Task Title: '${project.task[0].taskTitle}', Task Description: '${project.task[0].description}', Due-Date: '${project.task[0].dueDate}'`)
    }

});

deleteTask("hello2","subhello2")
deleteTask('hello', 'subhello')

//deleteProject("hello");
//deleteProject("hello2");
//deleteProject("hello3");
//deleteProject("hello4");
