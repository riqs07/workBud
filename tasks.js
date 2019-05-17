

class Task {
    constructor(name, priority, diffuculty, dueDate) {

        let d = new Date();

        this.id = createUniqueID()
        this.name = name
        this.priority = priority
        this.diffuculty = diffuculty
        this.dueDate = dueDate
        this.users = []

        this.timeStamp = {
            date: d.toLocaleDateString(),
            time: d.toLocaleTimeString(),
            day: d.getDay(),
            month: d.getMonth()
        }
        this.pomodoros = {
            totalTime: 0,
            totalPomodoros: 0,
        }
        this.isCompleted = false;
        this.progress = 0;
        this.comments = []
    }
}

class Project {
    constructor(name, dueDate) {
        let d = new Date();

        this.id = createUniqueID()
        this.name = name
        this.dueDate = dueDate
        this.tasks = []
        this.completedTasks = []
        this.comments = []
        this.pomodoros = {
            totalTime: null,
            totalPomdoros: null
        }
        this.users = []
        this.timeStamp = {
            date: d.toLocaleDateString(),
            time: d.toLocaleTimeString(),
            day: d.getDay(),
            month: d.getMonth()
        }

    }
}

data = {
    unAssignedTasks: [],
    projects: [],
    currentTask: null,
    currentProject: null
}

function getSelectors(){

    tasksNameInput = document.querySelector('.tasks__name-input')
    prioritySelect = document.querySelector('.tasks__select-priority')
    difficultySelect = document.querySelector('.tasks__difficulty-priority')
    taskAddBtn = document.querySelector('#tasks__add')
    taskList = document.querySelector('.tasks__task-list')
    taskDatePicker = document.querySelector('.tasks__date-picker')
    
    
    projectsNameInput = document.querySelector('.projects__name-input')
    projectsList = document.querySelector('.projects__project-list')
    projectsAddBtn = document.querySelector('#projects__add')
    projectsDatePicker = document.querySelector('.projects__date-picker')
    
    
    
    
    document.querySelector('.tasks__edit-state--buttons').style.display = "none"
    
    taskEditBtn = document.querySelector('#tasks__edit')
    taskDeleteBtn = document.querySelector('#tasks__delete')
    taskAssignBtn = document.querySelector('#tasks__assign')
    taskCommentBtn = document.querySelector('#tasks__comment')
    taskPomodoroBtn = document.querySelector('#tasks__pomodoroBtn')
    taskCompleteBtn = document.querySelector('#tasks__complete')
    taskBackBtn = document.querySelector('#tasks__back')
    
    taskEditBtn.addEventListener('click', editThisTask)
    taskDeleteBtn.addEventListener('click', deleteThisTask)
    taskAssignBtn.addEventListener('click', assignThisTask)
    taskCommentBtn.addEventListener('click', createInputsForComment)
    taskPomodoroBtn.addEventListener('click',showPomodoroUI)
    taskCompleteBtn.addEventListener('click', completeThisTask)
    taskBackBtn.addEventListener('click',goBackToTaskList)
    
    document.body.addEventListener('click', quickCompleteTask);
    document.body.addEventListener('click', selectTask);
    document.body.addEventListener('click', selectProject);
    
    taskAddBtn.addEventListener('click', addTasks)
    projectsAddBtn.addEventListener('click', addProjects)
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


function editThisTask() {
    document.querySelector('.tasks__selected-task--title').innerHTML = `<input type="text" name="" id="" placeholder =${data.currentTask.name}>`
}

function deleteThisTask() {
  
    taskID = data.currentTask.id
    projectID = data.currentProject.id

    projectFolder = findProjectInData(projectID)

    taskToDelete = findTaskInProjectFolder(taskID,projectFolder)

    index = projectFolder.tasks.indexOf(taskToDelete)

    projectFolder.tasks.splice(index,1)
   

    
    data.currentTask = null
    // Delete in local storage()
    // Reset To not edit state reset()
}

function assignThisTask() {

    destinationFolderID = document.querySelector('.tasks__task-list--assign').value
    destinationProjectFolder = findProjectInData(destinationFolderID)

    destinationProjectFolder.tasks.push(data.currentTask)

    //save to local Storage

    deleteThisTask()
    showToast('Task Assigned','success')
 }

function addUsersToProject(){
    projectID = data.currentProject.id
    projectFolder = findProjectInData(projectID)

    console.log(projectFolder)
    // works but sample projects dont have updated structure
    // obvs have UI pop and show an input or maybe a select of options
    
    projectFolder.users.push('Bob')
    showToast('User added to Project','success')

}
function addUsersToTasks(){
    projectID = data.currentProject.id
    taskID = data.currentTask.id

    console.log(projectID,taskID)
    taskToMutate = findTaskInProjectFolder(taskID,projectID)
    console.log(taskToMutate)
    taskToMutate.users.push('bob')
    showToast('User added to Task','success')

}

function commentThisTask() {  

    text = document.querySelector('#new-textbox').value
   
    data.currentTask.comments.push(text)

    taskID = data.currentTask.id
    projectID = data.currentProject.id

    projectFolder = findProjectInData(projectID)

    taskToMutate = findTaskInProjectFolder(taskID,projectFolder)

    index = projectFolder.tasks.indexOf(taskToMutate)

    projectFolder.tasks[index] = data.currentTask

    // add a delay 

    document.querySelector('#new-textbox').remove()
    document.querySelector('#submit-comment').remove()

    //save to local Storage
    showToast('Comment Added','success')


}

function showPomodoroUI(){

    // pomodoro = new Pomodoro;

    // pomodoro.startPomodoroX();

//     tomato = new Pomodoro;
//     tomato.showPomodoro();



//    pomodoro = data.currentTask.pomodoros


//    pomodoro.totalTime += 1
//    pomodoro.totalPomodoros += 1



    
}






function createInputsForComment(){
    textBox = document.createElement('textarea')
    sumbit = document.createElement('button')

    textBox.id = 'new-textbox'

    sumbit.innerHTML = 'Submit'
    sumbit.id = 'submit-comment'
    sumbit.classList = 'btn green'

    sumbit.addEventListener('click',commentThisTask)

    taskInfoPanel = document.querySelector('.tasks__selected-task--info')

    parent = taskInfoPanel.parentNode

    parent.insertBefore(textBox,taskInfoPanel)
    parent.insertBefore(sumbit,taskInfoPanel)

}

function completeThisTask() {
   
    taskID = data.currentTask.id
    projectID = data.currentProject.id

    projectFolder = findProjectInData(projectID)

    taskToMutate = findTaskInProjectFolder(taskID,projectFolder)

    index = projectFolder.tasks.indexOf(taskToMutate)

    projectFolder.tasks[index].isCompleted = true

    projectFolder.completedTasks.push(projectFolder.tasks[index])

    // Somehow Mark the time of completion 
    //Save in storage

    showToast('Task Completed','success')

}


function goBackToTaskList(){
    taskList.style.display = "block"
    document.querySelector('.tasks__selected-task--panel').style.display ="none"

    showProject()
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


function addTasks() {

    if (tasksNameInput.value === "") {
        showToast('Please Enter a Value', 'error')
    } else {


        task = getTaskValues()
        li = createListItem()

        li.id = `${task.id}`
        li.innerHTML = `${task.name}`

        li.appendChild(checkIcon)
        taskList.appendChild(li)


        userAssignedProjectID = document.querySelector('.tasks__task-list--assign').value


        projectInData = findProjectInData(userAssignedProjectID)
        console.log(projectInData, userAssignedProjectID)

        projectInData.tasks.push(task)
        storeTaskInProject(task, projectInData.id)

        tasksNameInput.value = ''
        showToast('Task Added')

    }


}

function addProjects() {
    project = getProjectValues()
    li = createListItem()

    li.id = `${project.id}`
    li.innerHTML = `${project.name}`

    projectsList.appendChild(li)

    data.projects.push(project)
    storeProject(project)


    projectsNameInput.value = ''
    showToast('Project Added')

}

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

function printTaskStorage() {

    if (data.currentProject.task !== null) {
        projectTasks = data.currentProject.tasks


        projectTasks.forEach(task => {

            li = createListItem()
            li.classList.add("tasks__task-list--child")
            li.id = `${task.id}`
            li.innerHTML = task.name


            li.appendChild(checkIcon)

            taskList.appendChild(li)
        });
    } else {
        console.log('ss')
    }

}

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

function printInAssignSelect(name, id) {
    document.querySelector('.tasks__task-list--assign ').innerHTML +=
        `<option value="${id}">${name}</option>
    `
}

function createListItem() {
    li = document.createElement('li')
    li.className = 'collection-child'


    // No idea why append check icon append child needs to on function and not here
    checkIcon = document.createElement('a')
    checkIcon.innerHTML = ` <i class="fas fa-check"></i>`
    checkIcon.className = 'check-icon'
    checkIcon.style.color = "green"


    return li
}


function quickCompleteTask(e) {
    if (e.target.parentElement.classList.contains('check-icon')) {
        li = e.target.parentElement.parentElement
        li.style.backgroundColor = 'green'

        string = li.id
        array = string.split('-')
        index = array[1]

        data.unAssignedTasks[index].isCompleted = true

        console.log(array[1])
    }
}

function selectTask(e) {
   
    if (e.target.classList.contains("tasks__task-list--child")) {
        selectedTaskID = e.target.id
       

       selectedTask = data.currentProject.tasks.find(task =>{
            return task.id === selectedTaskID
        })
        data.currentTask = selectedTask
        showTask(data.currentTask)
    }
}

function selectProject(e) {

    if (e.target.classList.contains("projects__project-list--child")) {

        selectedProjectID = e.target.id
        selectedProject = findProjectInData(selectedProjectID)
        data.currentProject = selectedProject
        storeCurrentProject()
        showProject()

    }
}

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


function storeCurrentProject() {
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


function showToast(x, y) {
    console.log(x, y)
}

function showTask(task) {
    document.querySelector('.tasks__edit-state--buttons').style.display = "block";
    taskList.style.display = "none"
    document.querySelector('.tasks__selected-task--panel').style.display ="block"


    document.querySelector('.tasks__selected-task--title').innerHTML = `<h1>${task.name} </h1>`
    

    let color
    switch (task.diffuculty){
        case ('easy'):
        color = 'greenText'
        break;
        case ('medium'):
        color = 'blueText'
        break;
        case ('hard'):
        color = 'redText'
        break;
    }

    /// Convert Due Date Time info to local String 
    component = `<ul class="collection">
    <li class="collection-child">This is a <span class = ${color}>${task.diffuculty}</span> task! </li>
    <li class="collection-child">${task.pomodoros.totalTime} Total Time</li>
    <li class="collection-child">${task.progress}% Done</li>
    <li class="collection-child">${task.priority} priority </li>
    <li class="collection-child">Created on ${task.timeStamp.date}  </li>
    <li class="collection-child">Due on ${task.dueDate} </li>
   
</ul>`

    document.querySelector('.tasks__selected-task--info').innerHTML = component

}

function showProject() {

    if (data.currentProject === null) {
        console.log('zzz')
    } else {

        project = data.currentProject
        taskList.innerHTML = ""
        document.querySelector('.projects__selected-task--title').innerHTML = `<h3>${project.name} </h3>`
        document.querySelector('#projectName').innerHTML = `<h3>${project.name} </h3>`


        const tasks = project.tasks.concat(project.completedTasks)

        tasks.forEach(task =>{ 
             li = createListItem()
            li.classList.add("tasks__task-list--child")
            li.id = task.id
            li.innerHTML = task.name          

            if(task.isCompleted === false){
                li.style.borderBottom = "solid 2px #64b4f6"

            } else if (task.isCompleted === true){
                li.style.borderBottom = "solid 2px #67bb6b"
                console.log('foo')

            }
            taskList.appendChild(li)})

        // project.tasks.forEach(task => {
        //     li = createListItem()
        //     li.classList.add("tasks__task-list--child")
        //     li.id = task.id
        //     li.innerHTML = task.name          

        //     if(task.isCompleted === false){
        //         li.style.borderBottom = "solid 2px #64b4f6"

        //     } else if (task.isCompleted === true){
        //         li.style.borderBottom = "solid 2px #67bb6b"

        //     }
        //     // li.appendChild(checkIcon)
        //     taskList.appendChild(li)
        // })

        // project.completedTasks.forEach(task =>{
        //     if(task.isCompleted === true){
        //         li = createListItem()
        //     li.classList.add("tasks__task-list--child")
        //     li.id = task.id
        //     li.innerHTML = task.name
        //         li.style.borderBottom = "solid 2px #67bb6b"
        //         taskList.appendChild(li)
        //     }
        // })

    }

    //see update 1 


}


function init() {
    getSelectors()

    data.projects = getProjectStorage();
    data.currentProject = getCurrentProjectFromStorage()
    showProject()
    printProjectStorage()
}

function kanban(){
    let a = []
    let b = []
    let c = []
    let d = []
    


    projects = data.projects

    data.projects.forEach((project)=>{
        // FOR EACH PROJECT
        // GO INTO FOLDER AND SEARCH ALL TASK
        // TASKS ARE THEN SORTED BASED ON PROGRESS
        // USE SWITCH WITH FOR EACH INSTEAD OF FIND
    
        project.tasks.forEach((task)=>{
            switch (task.progress){
                case 1:
                a.push(task)
                break;

                case 2:
                b.push(task)
                break;

                case 3:
                c.push(task)
                break;

                case 4:
                d.push(task)
                break;
            }

            
        })

    })

    console.log(a)
}

init()
