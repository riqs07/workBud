function addTasks() {
    console.log('hell')

    if (tasksNameInput.value === "") {
        showToast('Please Enter a Value', 'warning')
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
    showToast('Project Added','success')

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

function addUsersToProjectClick(){
       // works but sample projects dont have updated structure
    // obvs have UI pop and show an input or maybe a select of options
    // 
    
    /// Show add option in UI
    addUsersToProjectUI()
    showToast('User added to Project','success')

}


function addUsersToProjectUI(){
    textBox = document.createElement('input')
    textBox.id = 'addUserTextBox'
    textBox.type = 'text'

    sumbit = document.createElement('button')

    sumbit.innerHTML = 'Submit'


    sumbit.addEventListener('click',addUserToProjectInData)

    taskInfoPanel = document.querySelector('.tasks__selected-task--info')

    parent = taskInfoPanel.parentNode

    parent.insertBefore(textBox,taskInfoPanel)
    parent.insertBefore(sumbit,taskInfoPanel)
}

function addUserToProjectInData(projectFolder){

    id = data.currentProject.id

   projectFolder = findProjectInData(id)
   
   newUser =  document.querySelector('#addUserTextBox').value

    projectFolder.users.push(newUser)

    console.log(projectFolder)
}

function addUsersToTasksClick(){
    projectID = data.currentProject.id
    taskID = data.currentTask.id

    taskToMutate = findTaskInProjectFolder(taskID,projectID)
    addUserToTasksUI()
    showToast('User added to Task','success')

}

function addUserToTasksUI(){

    
    select = document.createElement('select')
    select.id = 'userList'
    sumbit = document.createElement('button')
    sumbit.innerHTML = 'Submit'
    sumbit.addEventListener('click',addUserToTaskInData)

    taskID = data.currentTask.id
    projectID = data.currentProject.id

    projectFolder = findProjectInData(projectID)
    task = findTaskInProjectFolder(taskID,projectID)

    taskInfoPanel = document.querySelector('.tasks__selected-task--info')

  

   


    parent = taskInfoPanel.parentNode

    parent.insertBefore(select,taskInfoPanel)
    parent.insertBefore(sumbit,taskInfoPanel)

    projectFolder.users.forEach((user)=>{
        document.querySelector('#userList').innerHTML +=
        `<option value="${user}">${user}</option`
    })
}

function addUserToTaskInData(){
    taskID = data.currentTask.id
    projectID = data.currentProject.id

    projectFolder = findProjectInData(projectID)
    task = findTaskInProjectFolder(taskID,projectID)

   x = document.querySelector('#userList').value

    console.log(x)

  

   
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

function changeTaskProgress(){
    select = document.createElement('select')
    sumbit = document.createElement('button')


    a = document.createElement('option')
    b = document.createElement('option')
    c = document.createElement('option')
    d = document.createElement('option')

    a.innerHTML = 'Task Backlog'
    b.innerHTML = 'Buffer Zone'
    c.innerHTML = 'In Progress'
    d.innerHTML = 'Done'

    select.appendChild(a)
    select.appendChild(b)
    select.appendChild(c)
    select.appendChild(d)


    select.id = 'progress-select'

    sumbit.innerHTML = 'Submit'
    sumbit.id = 'submit-progress'
    sumbit.classList = 'btn green'

    sumbit.addEventListener('click',submitChangeTaskProgress)

    taskInfoPanel = document.querySelector('.tasks__selected-task--info')

    parent = taskInfoPanel.parentNode

    parent.insertBefore(select,taskInfoPanel)
    parent.insertBefore(sumbit,taskInfoPanel)
}

function submitChangeTaskProgress(){
   newProgress = document.querySelector('#progress-select').value

    taskID = data.currentTask.id
    projectID = data.currentProject.id

    

    // taskInCP.progress = newProgress
   data.currentTask.progress = newProgress
   taskInData = findTaskInProjectFolder(taskID,projectID)

// make a change to the current project it updates inside of the data structure 
// and then updates in local stoage 
// so change current task then replace CT new info into CP and then update structrre

// so like 4 things need to update and i think i can make this update function into one
// thing so that way i dont have to go threw this shit every single time. 

  taskINCurrentProject = data.currentProject.tasks.find((task =>{
        return task.id = taskID
   }))
   
   taskINCurrentProject.progress = data.currentTask.progress

   taskInData.progress = taskINCurrentProject.progress
   showToast('Progress Updated','success')
   updateStorage()

// save to local storage so it can be read for other functions once it leaves current Task. 
// prob read storage by ID and then make that item it storage equal to the current Task 
// re write the task view so it updates on click
}














