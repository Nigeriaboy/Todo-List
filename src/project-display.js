import { getProjects } from "./utilityfunctions";


export function displayProject(){ 
    const projectsList = getProjects();
    const projectsContainer = document.querySelector('#projects')

    // Clear the projects Element and re-update it
    projectsContainer.innerHTML = '';
    let counter =  0;

    for (let project of projectsList){
        const projectParagraph = document.createElement('p');
        projectParagraph.className = "project-paragraph";
        projectParagraph.dataset.id = counter;
        projectParagraph.innerText = project.title;

        projectsContainer.appendChild(projectParagraph);
        counter++;
    }


}
