

function getTaskStorage() {
    storage = JSON.parse(localStorage.getItem('taskStorage'))
    return storage
}

function getProjectStorage() {
    projectsInStorage = checkProjectStorage()

    let storage

    if (projectsInStorage === true) {
        storage = JSON.parse(localStorage.getItem('projectStorage'))
    } else {
        storage = []

    }
    return storage

}

// function printTaskStorage() {
// // Legacy
//     if (data.currentProject.task !== null) {
//         projectTasks = data.currentProject.tasks


//         projectTasks.forEach(task => {

//             li = createListItem()
//             li.classList.add("tasks__task-list--child")
//             li.id = `${task.id}`
//             li.innerHTML = task.name


//             li.appendChild(checkIcon)

//             taskList.appendChild(li)
//         });
//     } else {
//         console.log('ss')
//     }

// }

function printProjectStorage() {

    isStored = checkProjectStorage()

    if (isStored === true) {

        storage = getProjectStorage();
        storage.forEach(project => {
            li = createListItem()
            li.classList.add("projects__project-list--child")
            li.id = `${project.id}`

            li.innerHTML = project.name

            projectsList.appendChild(li)

            printInAssignSelect(project.name, project.id)
        });
    } else {
        console.log('zz')
    }
}

function checkProjectStorage() {

    isStored = localStorage.getItem('projectStorage')

    if (isStored === null) {
        return false
    } else {
        return true;
    }
}
function storeCurrentProject() {
    // Not super sure how its remembering which is the current project
    // shouldnt be working but will leave alone for now
    // gonna need to go down this rabbit hole and REfractor 
    project = data.currentProject
    project = JSON.stringify(project)
    localStorage.setItem('currentProject', project)
}


function getCurrentProjectFromStorage() {
    project = localStorage.getItem('currentProject')
    project = JSON.parse(project)
    return project
}

function storeTaskInProject(newTask, projectID) {

    projectStorage = JSON.parse(localStorage.projectStorage)

    projectToAssignTo = projectStorage.find(project => {
        return project.id === projectID
    })


    projectToAssignTo.tasks.push(newTask)
    //  index = projectStorage.indexOf(projectToAssignTo)

    // projectStorage[index].tasks.push(newTask)
    localStorage.setItem('projectStorage', JSON.stringify(projectStorage))

}

function storeProject(newProject) {
    let projectStorage

    if (localStorage.getItem('projectStorage') === null) {
        projectStorage = []
        projectStorage.push(newProject)
        localStorage.setItem('projectStorage', JSON.stringify(projectStorage))

    } else {
        projectStorage = JSON.parse(localStorage.getItem('projectStorage'))
        projectStorage.push(newProject)
        localStorage.setItem('projectStorage', JSON.stringify(projectStorage))

    }
}

function updateStorage(){
    localStorage.setItem('projectStorage',JSON.stringify(data.projects))
    localStorage.setItem('users',JSON.stringify(data.users))
}

