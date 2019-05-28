function findProjectInData(ProjectID) {
    projectInData = data.projects.find(project => {
        return ProjectID === project.id
    })
    return projectInData
}

function findTaskInProjectFolder(taskID,projectID){
    project = findProjectInData(projectID)
    taskInData = project.tasks.find(task => {
        return taskID === task.id
    })
    return taskInData
}



function getCurrentProjectFolderinData(){
    id = getCurrentProjectID()
    folder = findProjectInData(id)
    return folder
}

function getCurrentTaskinData(){
    taskID = getCurrentTaskID()
    projectID = getCurrentProjectID()

    task = findTaskInProjectFolder(taskID,projectID)
    return task;
}

function getTaskValues() {
    name = tasksNameInput.value
    priority = prioritySelect.value
    diffuculty = difficultySelect.value
    dueDate = taskDatePicker.value

    const newTask = new Task(name, priority, diffuculty, dueDate)
    return newTask
}

function getProjectValues() {
    name = projectsNameInput.value
    dueDate = projectsDatePicker.value

    const newProject = new Project(name, dueDate)
    return newProject

}

function createUniqueID() {
    let letters = "ABCDEFGHJKMNPQRSTUXY";
    let numbers = "123456789"

    let text = "";
    let nums = ""
    for (let i = 0; i < 3; i++) {
        text += letters.charAt(Math.floor(Math.random() * letters.length));
        nums += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    id = `${text}-${nums}`
    return id;

}
function createUniqueUserID() {
    let letters = "ABCDEFGHJKMNPQRSTUXY";
    let numbers = "123456789"

    let text = "";
    let nums = ""
    for (let i = 0; i < 2; i++) {
        text += letters.charAt(Math.floor(Math.random() * letters.length));
        nums += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    id = `${text}-${nums}`
    return id;

}

function getCurrentProjectID(){
    id = data.currentProject
    return id 
}
function getCurrentTaskID(){
    id = data.currentTask
    return id
}

function findTaskinCurentProject(taskID){
    taskInCurrentProject = data.currentProject.tasks.find(task =>{
        return taskID = task.id
    })

    return taskInCurrentProject
}

function updateData(){
   
    // if (data.currentTask !== null){
    //     taskInData = getCurrentTaskinData()

    //     // IDK if this is a soulution but i will leave it how I had it 
    //     // Issue is that for changeProgress in particular
    //     // data is updating in current task but not current project 
    //     // kanban is pulling from current project
    //     // so i dont know if i should make kanban ID match and then pull from 
    //     // main data or what b/c the currents are how most fumctions are centered around 
    //     // LINE 79 data.js
    //     Object.assign(taskInData,data.currentTask)

    // }

    
    // projectFolder = getCurrentProjectFolderinData()
    // Object.assign(projectFolder,data.currentProject)

    // // localStorage.setItem('projectStorage',JSON.stringify(data.projects))
    // console.log(JSON.parse(localStorage.getItem('projectStorage')))
}


function updateTaskinData(){
   // get current task and rewrite version of current task in current project
   // then get versionm of current project in data and rewrite 
   // then update data storage 
    // only rewrite task if current task in null
    // allows for function to be called 

    projectID = getCurrentProjectID()

    if (data.currentTask !== null){
        taskID = getCurrentTaskID()

       task = findTaskinCurentProject(taskID)

        updatedTask = data.currentTask

        console.log(task.progress,updatedTask.progres)

       Object.assign(task,updatedTask)
       console.log(task.progres,updatedTask.progres)

    }

    // projectFolder = findProjectInData(projectID)

    // Object.assign(projectFolder,data.currentProject)
    // updateStorage()

}

