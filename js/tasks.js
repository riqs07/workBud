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

    // Make this a function in UI 
    // also search DOM for textboxID and if it exists dont print another
    textBox = document.createElement('input')
    textBox.id = 'addUserTextBox'
    textBox.classList.add('input-text')
    textBox.placeholder = 'Add a new User'

    textBox.type = 'text'


    // create a disabled class to get rid of animation 
    // not disabled if textbox is has words in it 
    sumbit = document.createElement('button')
    sumbit.classList.add('button','button-1')
    sumbit.innerHTML = 'Submit'
    // sumbit.disabled = true

    cancel = document.createElement('button')
    cancel.classList.add('button','button-1','red')
    cancel.innerHTML = 'Cancel'

    //prob create a class named 'created' and then find and remove all 
    cancel.addEventListener('click',removeCreatedInputs)


    // remove textbox and subit after a delay 
     // add a cancel button that also deletes created inputs
        // sumbit/add is disabled until textbox is typed in 

    sumbit.addEventListener('click',addUserToProjectInData)
  
    projectInfoPanel = document.querySelector('.tasks__project--panel')

    parent = projectInfoPanel.parentNode

    parent.insertBefore(textBox,projectInfoPanel)
    parent.insertBefore(sumbit,projectInfoPanel)
    parent.insertBefore(cancel,projectInfoPanel)
}

function removeCreatedInputs(){
console.log('Inputs Removed')
}

function addUserToProjectInData(){

    newUser =  document.querySelector('#addUserTextBox').value

    if (newUser != ""){
        data.currentProject.users.push(newUser)
        updateData()
        console.log('Placeholder for Inputs Removed function')
        showToast('User Added to project','success')
    } else {
        showToast('Please Enter a value','warning')
    }
    }
  

function addUsersToTasksClick(){
  // rename to user ui 
  // just shows a list of currently assigned users 
  // user ui can assign pic to user
  // assign user to task 
  // remove user from task 
  // prob have an assign user btn that opens up that specific ui
    addUserToTasksUI()

}

function addUserToTasksUI(){

    // maybe hide all other task panel stuff and only have this version 
    // of UI and back button 
    // users should be an object with name and team maybe a way to send message
    // but that would come later with liek backend stuff IDK 
    // add little x mark to user collection item for delete 
    // just have edit btn go back to add and have add open up the select 
    // only show users not currently assigned 

    select = document.createElement('select')
    select.id = 'userList'
    select.classList.add('input-select')

    ul = document.createElement('ul')
    ul.id = 'usersUl'
    ul.classList.add('collection')

    addUser = document.createElement('button')
    addUser.classList.add('button','button-1')
    addUser.innerHTML = 'Edit Users'

    picAssign = document.createElement('button')
    picAssign.classList.add('button','button-1',)
    picAssign.innerHTML = 'Set Picture'

    cancel = document.createElement('button')
    cancel.classList.add('button','button-1',)
    cancel.innerHTML = 'Cancel'

    addUser.addEventListener('click',addUserToTaskInData)


    editStateBack = document.createElement('button')
    editStateBack.classList.add('button','button-1')
    editStateBack.innerHTML = 'Back'
    editStateBack.addEventListener('click',()=>{
        
        // Figure out how to make this REACT lol
        // need to hide the task view and show this one
        // and then the inverse when back is clicked
        // think im close with this visiblity but it would reqiore
        // me to restructure html
        // LINE 203 tasks.js


        // parent.style.visibility = "hidden"
        // taskInfoPanel.style.visibility  = "visible"
    })


    taskInfoPanel = document.querySelector('.tasks__selected-task--info')


    // taskInfoPanel.style.visibility = "hidden"


    anchor = document.querySelector('.anchor' )

    parent = taskInfoPanel.parentNode
    // parent = anchor.parentNode


    parent.insertBefore(select,anchor)
    parent.insertBefore(addUser,anchor)
    parent.insertBefore(picAssign,anchor)
    parent.insertBefore(ul,anchor)
    parent.insertBefore(editStateBack,anchor)



 
    data.currentProject.users.forEach(user =>{
        li = createListItem()

        //get appenmd delete ICON WORKING 
        // remove = createDeleteIcon()

        // li.appendChild(remove)
        li.textContent = user

        document.querySelector('#usersUl').appendChild(li)
    })

    data.currentProject.users.forEach((user)=>{
        document.querySelector('#userList').innerHTML +=
        `<option value="${user}">${user}</option`
    })
  
}

function createDeleteIcon(){

    icon = document.createElement('a')
    icon.innerHTML = '<i class="fas fa-times"></i>'
    icon.className = 'delete icon'
    icon.style.color = 'red'

    return icon
}

function saveHTML(x){
    html = document.querySelector(`.${x}`).innerHTML

    return html
}

function addUserToTaskInData(){
  

    newUser = document.querySelector('#userList').value
   data.currentTask.users.push(newUser)
   showToast('User assigned to Task','success')

   updateData()
  

   
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

function changeTaskProgressClick(){
    select = document.createElement('select')
    sumbit = document.createElement('button')


    backlog = document.createElement('option')
    buffer = document.createElement('option')
    inProgress = document.createElement('option')
    done = document.createElement('option')

    backlog.innerHTML = 'Task Backlog'
    buffer.innerHTML = 'Buffer Zone'
    inProgress.innerHTML = 'In Progress'
    done.innerHTML = 'Done'

    select.appendChild(backlog)
    select.appendChild(buffer)
    select.appendChild(inProgress)
    select.appendChild(done)

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












