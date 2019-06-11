function getSelectors(){

    tasksNameInput = document.querySelector('.tasks__name-input')
    //rename to importance when i have more time 
    prioritySelect = document.querySelector('.tasks__select-priority')
    urgencySelect = document.querySelector('.tasks__select-urgency')
    difficultySelect = document.querySelector('.tasks__difficulty-priority')
    
    taskAddBtn = document.querySelector('#tasks__add')
    taskList = document.querySelector('.tasks__task-list')
    taskDatePicker = document.querySelector('.tasks__date-picker')
    
    
    projectsNameInput = document.querySelector('.projects__name-input')
    projectsList = document.querySelector('.projects__project-list')
    projectsAddBtn = document.querySelector('#projects__add')
    projectsDatePicker = document.querySelector('.projects__date-picker')
    projectsAssignBtn = document.querySelector('#projectAssignBtn')
    
    
    projectsAssignBtn.addEventListener('click',addUsersClick)
    
    document.querySelector('.tasks__edit-state--buttons').style.display = "none"
    
    taskEditBtn = document.querySelector('#tasks__edit')
    taskDeleteBtn = document.querySelector('#tasks__delete')
    taskAssignBtn = document.querySelector('#tasks__assign')
    taskCommentBtn = document.querySelector('#tasks__comment')
    taskPomodoroBtn = document.querySelector('#tasks__pomodoroBtn')
    taskCompleteBtn = document.querySelector('#tasks__complete')
    taskBackBtn = document.querySelector('#tasks__back')
    taskProgressBtn = document.querySelector('#tasks__progress')
    taskMoveBtn = document.querySelector('#tasks__move')

    document.querySelector('#createKanbanBtn').addEventListener('click',createKanbanBoard)
    document.querySelector('#createMatrix').addEventListener('click',createEisenhowerMatrix)

    
    
    taskEditBtn.addEventListener('click', editThisTask)
    taskDeleteBtn.addEventListener('click', deleteTaskClick)
    taskMoveBtn.addEventListener('click', moveThisTaskUI)
    taskAssignBtn.addEventListener('click', addUserToTasksUI)
    taskCommentBtn.addEventListener('click', createInputsForComment)
    taskPomodoroBtn.addEventListener('click',taskTimerClick)
    taskCompleteBtn.addEventListener('click', completeThisTaskClick)
    taskBackBtn.addEventListener('click',goBackToTaskList)
    taskProgressBtn.addEventListener('click',changeTaskProgressUI)
    



    document.body.addEventListener('click', selectTask);
    document.body.addEventListener('click', selectProject);




    document.body.addEventListener('click', kanbanCardClick);
    document.body.addEventListener('mouseover', kanbanUsersHover);
    document.body.addEventListener('click', kanbanCommentClick);
    document.body.addEventListener('mouseover', kanbanCalenderHover);

    
    
    taskAddBtn.addEventListener('click', addTasks)
    projectsAddBtn.addEventListener('click', addProjects)
}

function taskTimerClick(){
    console.log('goo')
    // hide view 
    // show new buttons 
    // pomodoro timer countdown
    // each button has a view
    // hide other buttons 
    // show view // have a way to keep timer running and allow user to still use app 
    // Focus mode locks you 
    taskViewHide()
    pomodoroBtn = document.createElement('button')
    timerBtn = document.createElement('button')
    countdownBtn = document.createElement('button')

    pomodoroBtn.textContent = 'Pomodoro'
    timerBtn.textContent = 'Timer'
    countdownBtn.textContent = 'countdown'

    pomodoroBtn.classList.add('button','button-2')
    timerBtn.classList.add('button','button-2')
    countdownBtn.classList.add('button','button-2')

    pomodoroBtn.addEventListener('click',startPomodoro)
    // timerBtn.addEventListener('click',startTimer)
    // countdownBtn.addEventListener('click',startCountdown)

    parent = document.querySelector('.tasks__selected-task--info').parentNode

    usersContainer = document.createElement('div')

    usersContainer.append(pomodoroBtn,timerBtn,countdownBtn)

     parent.before(usersContainer)






}

function startPomodoro(){
   pomodoroBtn.remove()
   timerBtn.remove()
   countdownBtn.remove()

   parent = document.querySelector('.tasks__selected-task--info').parentNode

   let pomodoroTimer = document.createElement('div')
   pomodoroTimer.innerHTML = getPomodoroBlueprint()

   
   parent.append(pomodoroTimer)

   start = document.querySelector('#pomodoro-start')
   pause = document.querySelector('#pomodoro-pause')
   reset = document.querySelector('#pomodoro-reset')
   
   
start.addEventListener('click',startPomodoroTimer)
// pause.addEventListener('click',pausePomodoro)
// reset.addEventListener('click',resetPomodoro)

}

function startPomodoroTimer(){
    lengthSelect = document.querySelector('#pomodoroLengthSelect')
    breakLengthSelect = document.querySelector('#pomodoroBreakLengthSelect').value

    totalTime = lengthSelect.value
    timer = document.querySelector('.pomodoro__timer')


    clock = setInterval(()=>{
        
        if (totalTime > 0){
            totalTime--
            console.log(totalTime)
        } else if (totalTime === 0){
            // clearInterval(this.pomodoroCountDownTimer)
            // startBreak()
            showToast('Pomodoro Complete','success')

        }
    
         
      timer.innerHTML = convertSeconds(totalTime)

    },1000)


    }

    function beginClock(){
        timer = document.querySelector('.pomodoro__timer')
      
        if (totalTime > 0){
            totalTime--
        } else if (totalTime === 0){
            // clearInterval(this.pomodoroCountDownTimer)
            // startBreak()
        }
    
      timer.innerHTML = totalTime
    }

    function convertSeconds(sec){
        minutes = Math.floor(sec / 60)
        seconds = sec % 60
        return `${minutes}:${seconds}`
    }


function getPomodoroBlueprint(){
    timerBlueprint = `   
     <div class="card">
    <div class="pomodoro__timer">xxx</div>
    <button class="button button-1" id = "pomodoro-start">Start</button>
    <button class="button button-2" id = "pomodoro-pause">Pause</button>
    <button class="button button-2" id = "pomodoro-reset">Reset</button>

    <select name="pomodoroLengthSelect" id="pomodoroLengthSelect">
    <option value="4">Test</option>
    <option value="600">10:00</option>
    <option value="900">15:00</option>
    <option value="1200">20:00</option>
    <option value="1500">25:00</option>
</select>

    <select name="pomodoroBreakLengthSelect" id="pomodoroBreakLengthSelect">
    <option value="4">Test</option>
    <option value="300">5:00</option>
    <option value="600">10:00</option>
    <option value="900">15:00</option>
    <option value="1200">20:00</option>
</select>
</div>`

return timerBlueprint
}

function taskViewHide(){
    taskInfoPanel = document.querySelector('.tasks__selected-task--info')
    taskInfoPanel.style.display = "none"
    document.querySelector('.tasks__edit-state--buttons').style.display = "none"
}

function  taskViewShow(){
    taskInfoPanel = document.querySelector('.tasks__selected-task--info')
    taskInfoPanel.style.display = "block"
    document.querySelector('.tasks__edit-state--buttons').style.display = "block"
    }

function init() {
    getSelectors()
    data.projects = getProjectStorage();
    data.currentProject = getCurrentProjectFromStorage()
    data.people = getUserStorage()
    showProject()
    printProjectStorage()
}


function addUsersClick(){
    //okay if this function just calls another function 
    // then just have click event attached to that one
    // will leave it here for now 
     addUsersUI()
}


function addUsersToTasksSumbit(){
    // rename to user ui 
    // just shows a list of currently assigned users 
    // user ui can assign pic to user
    // assign user to task 
    // remove user from task 
    // prob have an assign user btn that opens up that specific ui
  
    id = document.querySelector('#userList').value
    user = findUser(id)
    task = getCurrentTaskinData()

    short = {
        id:task.id,
        name:task.name,
        timeWorked:null
    }

    // add error handling adn duplicate check 
    // and possibly make into a seperate function


    user.tasks.push(short)
    task.users.push(user)
    
   showToast('User assigned to Task','success')
   updateStorage() 
    
  }


  function moveThisTaskSubmit(){
   destinationFolderID = document.querySelector('#projectList').value
   destinationFolder = findProjectInData(destinationFolderID)
  
   currentFolder = getCurrentProjectFolderinData()


   taskID = getCurrentTaskID()
   task = getCurrentTaskinData()

    // could even have an add task function which takes in 
    // folder and task 
   destinationFolder.tasks.push(task)


   deleteThisTask(taskID,currentFolder)

   goBackToTaskList()
   showToast('Task Moved','success')
   updateStorage()

  }

  function commentProjectClick(){
    folder = getCurrentProjectFolderinData()
    commentThisProject(folder)
      // add a delay or animation 
      // A UI  Function
      document.querySelector('#new-textbox').remove()
      document.querySelector('#submit-comment').remove()
      //
      showToast('Comment Added','success')
      updateData()

  }

  function commentTaskSubmit(){
    task = getCurrentTaskinData()
    text = document.querySelector('#new-textbox').value

    commentThisTask(task,text)
   
    // Move to a UI function 
    document.querySelector('#new-textbox').remove()
    document.querySelector('#submit-comment').remove()

    showToast('Comment Added','success')
    updateStorage()

  }


  function deleteTaskClick(){
    taskID = getCurrentTaskID()
    folder = getCurrentProjectFolderinData()

    deleteThisTask(taskID,folder)

   showToast('Task Deleted','success')
   goBackToTaskList()
   updateStorage()

  }

function completeThisTaskClick(){
    task = getCurrentTaskinData()
    folder = getCurrentProjectFolderinData()

    completeThisTask(task,folder)
    showToast('Task Completed','success')
    updateStorage()

}

function changeTaskProgressSubmit(){

    task = getCurrentTaskinData()
    
    select = document.querySelector('#progress-select')
    sumbit = document.querySelector('#submit-progress')

    newProgress = select.value

    if (newProgress === "Done"){
        completeThisTask()
    } else {
        task.progress = newProgress
        updateStorage()
        showToast('Progress Updated','success')
    
    }

    // setInterval(()=>{
    //     select.remove()
    //     sumbit.remove()
    // },400) 
  

}

document.addEventListener('DOMContentLoaded', init, false);

