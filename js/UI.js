function selectTask(e) {

    if (e.target.classList.contains("tasks__task-list--child")) {


        data.currentTask = e.target.id
        folder = getCurrentProjectFolderinData()

        selectedTaskInData = folder.tasks.find(task => {
            return task.id === data.currentTask
        })

        showTask(selectedTaskInData)

    }
}



function kanbanCardClick(e){

    if (e.target.classList.contains("kanban-card")) {

        taskID = e.target.id
        projectID = getCurrentProjectID()
        task = findTaskInProjectFolder(taskID,projectID)

        data.currentTask = task.id
        showTask(task)

    }
    
}

function kanbanUsersHover(e){
    if (e.target.parentElement.classList.contains("user-hover")) {
        e.target.parentElement.classList.add('tooltip')
        taskID = e.target.parentElement.parentElement.id
        projectID = getCurrentProjectID()

        task = findTaskInProjectFolder(taskID,projectID)

        // add another event listenr which deletes this when not hover
        // in html it just gets added over and over and over again
        // evem though its not visable 
        

        list = document.createElement('ul')

        task.users.forEach(user =>{
            li = document.createElement('li')
            li.textContent = user.name
            list.appendChild(li)
        })
       
        list.classList.add('tooltiptext')
        e.target.parentElement.append(list)
    }
}

function kanbanCommentClick(e){
    if (e.target.parentElement.classList.contains("comment-click")) {
        taskID = e.target.parentElement.parentElement.id
        projectID = getCurrentProjectID()
        task = findTaskInProjectFolder(taskID,projectID)

        textBox = document.createElement('input')
        textBox.id = 'addCommentTextBox'
        textBox.classList.add('input-text')  
        textBox.type = 'text'
    
        sumbit = document.createElement('button')
        sumbit.classList.add('button', 'button-1','kbCsubmit')
        sumbit.innerHTML = 'Submit'
        // submit.addEventListener('click',()=>{
        //     foo(task)
        // })
        

        //place holder append as i need to figure out how its gonna show
        // thinking a modal but IDK yet thats a UI UX decision i have yet to make
        console.log('See MVC note 6-1')
        document.querySelector('#anchor').append(textBox,sumbit)

    }
}




function foo(task){
    x = document.querySelector('.kbCsubmit').value
    console.log(x)
    commentThisTask(task,x)
}

function kanbanCalenderHover(e){
    if (e.target.parentElement.classList.contains("calender-hover")) {
        e.target.parentElement.classList.add('tooltip')
        taskID = e.target.parentElement.parentElement.id
        projectID = getCurrentProjectID()

        task = findTaskInProjectFolder(taskID,projectID)

        // add another event listenr which deletes this when not hover
        // in html it just gets added over and over and over again
        // evem though its not visable 

        let list = document.createElement('div');

        // find a way to convert date string
        list.textContent =`Due on ${task.dueDate}`
        
        list.classList.add('tooltiptext')
        e.target.parentElement.append(list)

    }
}
function selectProject(e) {

    if (e.target.classList.contains("projects__project-list--child")) {

        data.currentProject = e.target.id

        folder = getCurrentProjectFolderinData()
        
        storeCurrentProject()
        showProject(folder)

    }
}

function printInAssignSelect(name, id) {
    document.querySelector('.tasks__task-list--assign ').innerHTML +=
        `<option value="${id}">${name}</option>
    `
}


function showToast(text, type) {

    let color

    switch (type) {
        case 'success':
            color = 'green'

            break;

        case 'warning':
            color = 'red';
            break;
    }


    // add a fade in animation 

    toastContainer = document.createElement('div')
    toastText = document.createTextNode(text)

    toastText.color = "#eee"
    toastContainer.classList.add('toast-container', `${color}`)
    toastContainer.appendChild(toastText)

    setTimeout(() => {
        // add a fade out amimation 
        toastContainer.style.display = "none"
        console.log('Add Fade in/out animation to showToast()')
        // 
    }, 5000)

    document.querySelector('.toast-anchor').appendChild(toastContainer)
}

function showTask(task) {
    document.querySelector('.tasks__edit-state--buttons').style.display = "block";
    taskList.style.display = "none"
    document.querySelector('.tasks__selected-task--panel').style.display = "block"


    document.querySelector('.tasks__selected-task--title').innerHTML = `<h1>${task.name} </h1>`


    let color
    let importanceColor
    let urgencyColor

    switch (task.diffuculty) {
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

   
    if (task.importance === 'important'){
        importanceColor = 'blueText'
    } else {
        importanceColor = 'greenText'
    }
    
   
    if (task.urgency === 'urgent'){
        urgencyColor = 'redText'
    } else {
        urgencyColor = 'greenText'
    }
    
    /// Convert Due Date Time info to local String 
    component = `<ul class="collection">
    <li class="collection-child">This is a <span class = ${color}>${task.diffuculty}</span> task! </li>
    <li class="collection-child">${task.pomodoros.totalTime} mins worked</li>
    <li class="collection-child">Kanban Zone: ${task.progress}</li>
    <li class="collection-child">This task is <span class = '${importanceColor}'>${task.importance}</span> and <span class = ${urgencyColor}>${task.urgency}</span> </li>
    <li class="collection-child">Created on ${task.timeStamp.created.date}  </li>
    <li class="collection-child">Due on ${task.dueDate} </li>
   
</ul>`

    // Get it to show a new li if task is completed
    // basiclly the component is also the ul so probs need to change that
//  if (task.isCompleted === true){
//      component += `  <li class="collection-child">Completed on ${task.timeStamp.completed.date} </li>`
//  }

    document.querySelector('.tasks__selected-task--info').innerHTML = component

}

function showProject() {

    if (data.currentProject === null) {
        console.log('current project is null coming from showProject()')
    } else {

        taskList.innerHTML = ""
        folder = getCurrentProjectFolderinData()

        document.querySelector('#projectName').innerHTML = `<h3>${folder.name} </h3>`
       
        folder.tasks.forEach(task => {
            li = createListItem()
            li.classList.add("tasks__task-list--child")
            li.id = task.id
            li.innerHTML = task.name


            if (task.progress == 'In Progress') {
                li.style.borderBottom = "solid 2px #8B1F61"

            } else if (task.progress === 'Done') {
                li.style.borderBottom = "solid 2px #67bb6b"
            } else {
                li.style.borderBottom = "solid 2px #64b4f6" 
            }
            taskList.appendChild(li)
        })
    }

    //see update 1 


}

function createKanbanBoard() {
    let a = []
    let b = []
    let c = []
    let d = []

    folder = getCurrentProjectFolderinData()

    folder.tasks.forEach((task) => {

        switch (task.progress) {
            case 'Task Backlog':
                a.push(task)
                break;

            case 'Buffer Zone':
                b.push(task)
                break;

            case 'In Progress':
                c.push(task)
                break;

            case 'Done':
                d.push(task)
                break;
        }

    })


    todo = document.querySelector('.kanban__todo-collection')
    buffer = document.querySelector('.kanban__buffer-collection')
    progress = document.querySelector('.kanban__progress-collection')
    done = document.querySelector('.kanban__done-collection')


    placeTasksintoKanban(a, todo)
    placeTasksintoKanban(b, buffer)
    placeTasksintoKanban(c, progress)
    placeTasksintoKanban(d, done)
}


function placeTasksintoKanban(array, column) {
    array.forEach(task => {
        comments = createCommentIcon()
        users = createUsersIcon()
        calender = createCalenderIcon()

        li = document.createElement('li')
        li.className = 'kanban-card'
        li.id = task.id


        li.innerHTML = task.name
       li.append(users,comments,calender)
        column.append(li)
    })
}


function createEisenhowerMatrix(){
    let urgent = []
    let notUrgent = []


    let q1 = []
    let q2 = []
    let q3 = []
    let q4 = []

    folder = getCurrentProjectFolderinData()


    folder.tasks.forEach( task => {

        switch (task.urgency) {
            case 'not urgent':
            urgent.push(task)
            break;

            case 'urgent':
            notUrgent.push(task)
            break;
        }

    })


    urgent.forEach(task =>{
        switch (task.importance) {
            case 'not important':
                q1.push(task)
                break;

            case 'important':
                q2.push(task)
                break;

        }  
    })

    notUrgent.forEach(task =>{
        switch (task.importance) {
            case 'not important':
                q3.push(task)
                break;

            case 'important':
                q4.push(task)
                break;

        }  
    })

    quadrant1 = document.querySelector('.matrix-1')
    quadrant2 = document.querySelector('.matrix-2')
    quadrant3 = document.querySelector('.matrix-3')
    quadrant4 = document.querySelector('.matrix-4')

    placeTasksintoMatrix(q1,quadrant1)
    placeTasksintoMatrix(q2,quadrant2)
    placeTasksintoMatrix(q3,quadrant3)
    placeTasksintoMatrix(q4,quadrant4)
}


function placeTasksintoMatrix(array,quadrant){
    ul = document.createElement('ul')
    ul.classList.add('collection')
    array.forEach(task => {
        
        li = createListItem()
        li.classList.add('matrixCard') 
        li.id = task.id 
        li.innerHTML = task.name

        ul.append(li)
        quadrant.append(ul)
    })
}




function addUsersUI() {

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
    sumbit.classList.add('button', 'button-1')
    sumbit.innerHTML = 'Submit'
    // sumbit.disabled = true

    cancel = document.createElement('button')
    cancel.classList.add('button', 'button-1', 'red')
    cancel.innerHTML = 'Cancel'

    //prob create a class named 'created' and then find and remove all 
    cancel.addEventListener('click', removeCreatedInputs)


    // remove textbox and subit after a delay 
    // add a cancel button that also deletes created inputs
    // sumbit/add is disabled until textbox is typed in 

    sumbit.addEventListener('click', () =>{
        name = document.querySelector('#addUserTextBox').value
        if (name != ""){
            addUser(name)
        } else {
            showToast('Please Enter a value','warning')
        }
    })

    projectInfoPanel = document.querySelector('.tasks__project--panel')

    parent = projectInfoPanel.parentNode

    parent.insertBefore(textBox, projectInfoPanel)
    parent.insertBefore(sumbit, projectInfoPanel)
    parent.insertBefore(cancel, projectInfoPanel)
}
function addUserToTasksUI(){
    // TIDY UP this function man its UGLY 

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
    addUser.innerHTML = 'Add Users'
    // open up select of project users 

    // think pic assign should be at project level and not task level 
    // if i can figure out how to get icon working prob wont even need 
    // edit but i can do an edit state type deal like in the calorie tracker

    // picAssign = document.createElement('button')
    // picAssign.classList.add('button','button-2',)
    // picAssign.innerHTML = 'Set Picture'

    // cancel = document.createElement('button')
    // cancel.classList.add('button','button-1',)
    // cancel.innerHTML = 'Cancel'

    addUser.addEventListener('click',addUsersToTasksSumbit)


    editStateBack = document.createElement('button')
    editStateBack.classList.add('button','button-1')
    editStateBack.innerHTML = '<i class="fas fa-arrow-left"></i> Back'
    editStateBack.addEventListener('click',()=>{
        
        // Figure out how to make this REACT lol
        // need to hide the task view and show this one
        // and then the inverse when back is clicked
        // think im close with this visiblity but it would reqiore
        // me to restructure html
        // LINE 203 tasks.js

        // Make the current view into a dive so i can just select that
        // rather than the buttons and the task info panel 

        taskInfoPanel.style.display  = "block"
        document.querySelector('.tasks__edit-state--buttons').style.display = "block"

        usersContainer.remove();
    })


    taskInfoPanel = document.querySelector('.tasks__selected-task--info')
    taskInfoPanel.style.display = "none"


    parent = taskInfoPanel.parentNode
    document.querySelector('.tasks__edit-state--buttons').style.display = "none"

    usersContainer = document.createElement('div')

    usersContainer.append(ul,addUser,editStateBack,select)

     parent.before(usersContainer)

 
    data.people.forEach(user =>{
        li = createListItem()

        //get appenmd delete ICON WORKING 
       // from here make user clickable and show their info 
       // somehow make these selectbale IDK how that would work 
        li.textContent = user.name

        document.querySelector('#usersUl').appendChild(li)
    })


    // Not sure what im going to need select for but whatever
    data.people.forEach((user)=>{
        document.querySelector('#userList').innerHTML +=
        `<option value="${user.id}">${user.name}</option`
    })
  
}

function changeTaskProgressUI(){
    select = document.createElement('select')
    sumbit = document.createElement('button')

    //want to make the submit inro like cards or something 
    // as there are only 4 options 
    
    backlog = document.createElement('option')
    buffer = document.createElement('option')
    inProgress = document.createElement('option')
    done = document.createElement('option')

    backlog.innerHTML = 'Task Backlog'
    buffer.innerHTML = 'Buffer Zone'
    inProgress.innerHTML = 'In Progress'
    done.innerHTML = 'Done'

    select.append(backlog,buffer,inProgress,done)
   

    select.id = 'progress-select'
    select.className = 'input-select'

    sumbit.innerHTML = 'Submit'
    sumbit.id = 'submit-progress'
    sumbit.classList = 'button button-1'

    sumbit.addEventListener('click',changeTaskProgressSubmit)

    taskInfoPanel = document.querySelector('.tasks__selected-task--info')

    parent = taskInfoPanel.parentNode

    parent.insertBefore(select,taskInfoPanel)
    parent.insertBefore(sumbit,taskInfoPanel)
}
function moveThisTaskUI(){

    taskInfoPanel = document.querySelector('.tasks__selected-task--info')


    sumbit = document.createElement('button')
    sumbit.classList.add('button','button-1')
    sumbit.textContent = 'Submit'
    sumbit.addEventListener('click',moveThisTaskSubmit)

    //THis is making it throw and ERROR IDK 
    // submit.addEventListener('click',migrateThisTask)
    // submit.id = 'migrate-btn'


    select = document.createElement('select')
    select.id = 'projectList'
    select.classList.add('input-select')
    
    parent = taskInfoPanel.parentNode
    parent.append(select,sumbit)

     data.projects.forEach(project =>{
        document.querySelector('#projectList').innerHTML +=
        `<option value="${project.id}">${project.name}</option`
    })

  

}

function createInputsForComment() {
    // MOVE TO UI 
    textBox = document.createElement('textarea')
    sumbit = document.createElement('button')

    textBox.id = 'new-textbox'
    textBox.className = 'input-textArea'
    // Something funky is going on with CSS HOVER 
    // Unify all the created Elements so i can have
    // one set of functions to get their values
    // and also limit the amount of created ones 

    sumbit.innerHTML = 'Submit'
    sumbit.id = 'submit-comment'
    sumbit.classList = 'button button-1'

    sumbit.addEventListener('click', commentTaskSubmit)

    taskInfoPanel = document.querySelector('.tasks__selected-task--info')

    parent = taskInfoPanel.parentNode

    parent.insertBefore(textBox, taskInfoPanel)
    parent.insertBefore(sumbit, taskInfoPanel)

}


function createListItem() {
    li = document.createElement('li')
    li.className = 'collection-child'
    return li
}


function createCommentIcon() {

    // add event listner so small textbox shows up to add task
    icon = document.createElement('a')
    icon.innerHTML = '<i class="far fa-comments"></i>'
    icon.classList.add('icon', 'comment-click') 
    icon.style.color = '#232b2b'

    return icon
}
function createCalenderIcon() {

    icon = document.createElement('a')
    icon.innerHTML = '<i class="fas fa-calendar-week"></i>'
    icon.classList.add('icon', 'calender-hover') 
    icon.style.color = '#232b2b'

    return icon
}

function createUsersIcon() {
    // add an on hover event listner to show users 
    // or have the user pics show 
    icon = document.createElement('a')
    icon.innerHTML = '<i class="fas fa-users"></i>'
    icon.classList.add('icon', 'user-hover') 
    icon.style.color = '#232b2b'

    return icon
}

function createDeleteIcon() {

    icon = document.createElement('a')
    icon.innerHTML = '<i class="fas fa-times"></i>'
    icon.className = 'delete icon'
    icon.style.color = 'red'

    return icon
}


function goBackToTaskList() {
    taskList.style.display = "block"
    document.querySelector('.tasks__selected-task--panel').style.display = "none"

    data.currentTask = null
    showProject()
}