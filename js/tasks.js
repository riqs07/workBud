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

function deleteThisTask(taskID,folder) {
    
    // taskID = getCurrentTaskID()
    // folder = getCurrentProjectFolderinData()

   index = folder.tasks.findIndex(task => {
       return task.id === taskID
   })

   folder.tasks.splice(index,1)

//    showToast('Task Deleted','success')
//    goBackToTaskList()
//    updateStorage()

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

function addUser(name){
        user = new User(name)

        data.people.push(user)

        // pushing to all will be another funciton where you can add global users
        // gonna leave it for now 
        // Tinker with adding user to own data 
        // and pull from their vs the folder.users
        updateStorage()
        showToast('User Added to project','success')
}

function addUserToProjectInData(user,folder){
    // select froma list 
    // select value id 
    // use to find in users folder 
    // add user to that folder 
         name = document.querySelector('#addUserTextBox').value

        addUser(name)
        folder.users.push(user)
        // pushing to all will be another funciton where you can add global users
        // gonna leave it for now 
        // Tinker with adding user to own data 
        // and pull from their vs the folder.users
        removeCreatedInputs()

        updateStorage()
        removeCreatedInputs()
        showToast('User Added to project','success')
   
    }
  

function addUserToTaskInData(){
    id = document.querySelector('#userList').value

    task = getCurrentTaskinData()
    user = findUser(id)
    
    // grab from all users 
    // folder is placeholder
    //mutate from all users not from folder
    // get better name than shrt

    // for some reason this is always g
    // only updating with one name 
    // its like rewriting the rest of the users 
   


    short = {
        id:task.id,
        name:task.name,
        timeWorked:null
    }

    // add error handling  adn duplicate check 
    // and possibly make into a seperate function
    console.log(short,task,user)


    user.tasks.push(short)
    task.users.push(user)
    
   showToast('User assigned to Task','success')
   updateStorage() 
}

function commentThisProject(folder) {  
    // add btn handler for this function
    // folder = getCurrentProjectFolderinData()
    text = document.querySelector('#new-textbox').value
    folder.comments.push(text)

    // // add a delay or animation 
    // document.querySelector('#new-textbox').remove()
    // document.querySelector('#submit-comment').remove()

    showToast('Comment Added','success')
    updateData()
}

function commentThisTask(task,text) {  
    // task = getCurrentTaskinData()
    // text = document.querySelector('#new-textbox').value
    task.comments.push(text)

    // add a delay or animation 
    // document.querySelector('#new-textbox').remove()
    // document.querySelector('#submit-comment').remove()

    // showToast('Comment Added','success')
    // updateData()
}


function completeThisTask(task,folder) {

    alreadyInArchive = folder.archive.includes(task)

    if (alreadyInArchive === false){
        folder.archive.push(task)
        task.isCompleted = true;
        task.progress = "Done"
        completeThisTaskTimeStamp(task)
      

    } else if (alreadyInArchive = true) {
        showToast('Task has already been completed','warning')
    }


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















 