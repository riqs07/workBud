function addTasks() {
// need to update with updateData() but 
    // dont want to mess up whole app lol
    // create a function so the selects update automagically
    if (tasksNameInput.value === "") {
        showToast('Please Enter a Value', 'warning')
    } else {


        task = getTaskValues()
        li = createListItem()

        li.id = `${task.id}`
        li.innerHTML = `${task.name}`

        taskList.appendChild(li)

        userAssignedProjectID = document.querySelector('.tasks__task-list--assign').value

        projectInData = findProjectInData(userAssignedProjectID)

        projectInData.tasks.push(task)
        storeTaskInProject(task, projectInData.id)

        tasksNameInput.value = ''
        showToast('Task Added','success')

    }


}

function addProjects() {

    // need to update with updateData() but 
    // dont want to mess up whole app lol
    // add some error handling 
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
    task = getCurrentTaskinData()

    document.querySelector('.tasks__selected-task--title').innerHTML = 
    `<input type="text" name="" id="" placeholder =${task.name}>`
}

function deleteThisTask() {
    
    taskID = getCurrentTaskID()
    folder = getCurrentProjectFolderinData()

   index = folder.tasks.findIndex(task => {
       return task.id === taskID
   })

   folder.tasks.splice(index,1)

   showToast('Task Deleted','success')
   goBackToTaskList()
   updateStorage()

}


function migrateThisTask() {

    destinationFolderID = document.querySelector('#projectList').value
    folder = findProjectInData(destinationFolderID)

    task = getCurrentTaskinData()
    folder.tasks.push(task)

    deleteThisTask()
    updateStorage()
    showToast('Task Assigned','success')

 }

function removeCreatedInputs(){
console.log('Placeholder for Inputs Removed')
}

function addUserToProjectInData(){

    name = document.querySelector('#addUserTextBox').value

    folder = getCurrentProjectFolderinData()

    if (name != ""){
        user = new User(name)

        folder.users.push(user)
        updateStorage()
        removeCreatedInputs()
        showToast('User Added to project','success')
    } else {
        showToast('Please Enter a value','warning')
    }
    }
  

function addUserToTaskInData(){
    newUser = document.querySelector('#userList').value
    task = getCurrentTaskinData()
    task.users.push(newUser)
   showToast('User assigned to Task','success')
   updateStorage() 
}

function commentThisProject() {  
    // add btn handler for this function
    folder = getCurrentProjectFolderinData()
    text = document.querySelector('#new-textbox').value
    folder.comments.push(text)

    // add a delay or animation 
    document.querySelector('#new-textbox').remove()
    document.querySelector('#submit-comment').remove()

    showToast('Comment Added','success')
    updateData()
}

function commentThisTask() {  
    task = getCurrentTaskinData()
    text = document.querySelector('#new-textbox').value
    task.comments.push(text)

    // add a delay or animation 
    document.querySelector('#new-textbox').remove()
    document.querySelector('#submit-comment').remove()

    showToast('Comment Added','success')
    updateData()
}


function completeThisTask() {
   
    task = getCurrentTaskinData()
    folder = getCurrentProjectFolderinData()

    task.isCompleted = true;
    task.progress = "Done"

    // archive isnt set up yet but this will push into it 
    completeThisTaskTimeStamp()

   folder.archive.push(task)
    showToast('Task Completed','success')

}

function completeThisTaskTimeStamp(task){

    let d = new Date;

    date = d.toLocaleDateString()
    time = d.toLocaleTimeString(),
    day = d.getDay(),
    month = d.getMonth()

   
   task.timeStamp.completed.date = date
   task.timeStamp.completed.time = time
   task.timeStamp.completed.day = day
   task.timeStamp.completed.month = month
}


function submitChangeTaskProgress(){

    task = getCurrentTaskinData()
    
    select = document.querySelector('#progress-select')
    sumbit = document.querySelector('#submit-progress')

    newProgress = select.value

    // setInterval(()=>{
    //     select.remove()
    //     sumbit.remove()
    // },400) 
   
    task.progress = newProgress
    updateStorage()
    showToast('Progress Updated','success')


}












