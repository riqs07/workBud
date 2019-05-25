function selectTask(e) {
   
    if (e.target.classList.contains("tasks__task-list--child")) {
        selectedTaskID = e.target.id
       projectID = getCurrentProjectID()
       projectFolder = findProjectInData(projectID)

       selectedTaskInData = projectFolder.tasks.find(task =>{
            return task.id === selectedTaskID
        })

        data.currentTask = selectedTaskInData
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

function printInAssignSelect(name, id) {
    document.querySelector('.tasks__task-list--assign ').innerHTML +=
        `<option value="${id}">${name}</option>
    `
}


function showToast(text,type) {

    let color

    switch (type){
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
    toastContainer.classList.add('toast-container',`${color}`)
    toastContainer.appendChild(toastText)

    setTimeout(()=>{
        // add a fade out amimation 
        toastContainer.style.display = "none"
        console.log('Add Fade in/out animation to showToast()')
        // 
    },5000)

    document.querySelector('.toast-anchor').appendChild(toastContainer)
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
    <li class="collection-child">${task.pomodoros.totalTime} mins worked</li>
    <li class="collection-child">Kanban Zone: ${task.progress}</li>
    <li class="collection-child">${task.priority} priority </li>
    <li class="collection-child">Created on ${task.timeStamp.date}  </li>
    <li class="collection-child">Due on ${task.dueDate} </li>
   
</ul>`

    document.querySelector('.tasks__selected-task--info').innerHTML = component

}

function showProject() {

    if (data.currentProject === null) {
        console.log('current project is null coming from showProject()')
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
            }
            taskList.appendChild(li)})
            }

    //see update 1 


}
function createKanbanBoard(){


    let a = []
    let b = []
    let c = []
    let d = []

    projectID = getCurrentProjectID()

    projectFolder = getCurrentProjectFolderinData()
    console.log(projectFolder)

    projectFolder.tasks.forEach((task)=>{
    
        switch (task.progress){
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

 
    placeTasksintoKanban(a,todo)
    placeTasksintoKanban(b,buffer)
    placeTasksintoKanban(c,progress)
    placeTasksintoKanban(d,done)
    }


function placeTasksintoKanban(array,column){
    array.forEach((task)=>{

        li = createListItem()
        li.innerHTML = task.name
        column.appendChild(li)
    })
}

function createListItem() {
    li = document.createElement('li')
    li.className = 'collection-child'
    return li
}
