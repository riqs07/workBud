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

