function addTasks() {

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
  
    taskID = getCurrentTaskID()

   index = data.currentProject.tasks.findIndex(task => {
       return task.id === taskID
   })

   data.currentProject.tasks.splice(index,1)

   updateData()

}

function migrateThisTask() {

    destinationFolderID = document.querySelector('.tasks__task-list--assign').value
    destinationProjectFolder = findProjectInData(destinationFolderID)

    destinationProjectFolder.tasks.push(data.currentTask)

    //save to local Storage

    deleteThisTask()
    showToast('Task Assigned','success')

 }

function addUsersToProjectClick(){
    //okay if this function just calls another function 
    // then just have click event attached to that one
    // will leave it here for now 
     addUsersToProjectUI()
}


function addUsersToProjectUI(){
    textBox = document.createElement('input')
    textBox.id = 'addUserTextBox'
    textBox.type = 'text'

    sumbit = document.createElement('button')

    sumbit.innerHTML = 'Submit'


    sumbit.addEventListener('click',addUserToProjectInData)

    /// think error is occuring here as tasks panel isnt a thing until
    // a task is selected fix later 
    taskInfoPanel = document.querySelector('.tasks__selected-task--info')

    parent = taskInfoPanel.parentNode

    parent.insertBefore(textBox,taskInfoPanel)
    parent.insertBefore(sumbit,taskInfoPanel)
}

function addUserToProjectInData(){

    newUser =  document.querySelector('#addUserTextBox').value

    if (newUser != ""){
        data.currentProject.users.push(newUser)
        updateData()
        showToast('User Added to project','success')
    } else {
        showToast('Please Enter a value','warning')
    }
    }
  

function addUsersToTasksClick(){
  
    addUserToTasksUI()

}

function addUserToTasksUI(){

  if (data.currentProject.users.length == 0){
      showToast('Please Add Users to the Project','warning')
  } else {

    select = document.createElement('select')
    select.id = 'userList'
    sumbit = document.createElement('button')
    sumbit.innerHTML = 'Submit'
    sumbit.addEventListener('click',addUserToTaskInData)


    taskInfoPanel = document.querySelector('.tasks__selected-task--info')

    parent = taskInfoPanel.parentNode



    data.currentProject.users.forEach((user)=>{
        document.querySelector('#userList').innerHTML +=
        `<option value="${user}">${user}</option`
    })
  }
}

function addUserToTaskInData(){
  

    newUser = document.querySelector('#userList').value
   data.currentTask.users.push(newUser)
   showToast('User assigned to Task','success')

  

   
}

function commentThisTask() {  

    text = document.querySelector('#new-textbox').value
    data.currentTask.comments.push(text)

    document.querySelector('#new-textbox').remove()
    document.querySelector('#submit-comment').remove()

    //save to local Storage
    showToast('Comment Added','success')

    updateData()
}


function createInputsForComment(){
    textBox = document.createElement('textarea')
    sumbit = document.createElement('button')

    textBox.id = 'new-textbox'

    sumbit.innerHTML = 'Submit'
    sumbit.id = 'submit-comment'
    sumbit.classList = 'button button-1'

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
    sumbit.classList = 'button button-1'

    sumbit.addEventListener('click',submitChangeTaskProgress)

    taskInfoPanel = document.querySelector('.tasks__selected-task--info')

    parent = taskInfoPanel.parentNode

    parent.insertBefore(select,taskInfoPanel)
    parent.insertBefore(sumbit,taskInfoPanel)
}

function submitChangeTaskProgress(){
   newProgress = document.querySelector('#progress-select').value
   data.currentTask.progress = newProgress

   updateData()
   showToast('Progress Updated','success')


}












