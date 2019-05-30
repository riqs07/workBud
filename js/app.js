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
    projectsAssignBtn = document.querySelector('#projectAssignBtn')
    
    
    projectsAssignBtn.addEventListener('click',addUsersToProjectClick)
    
    document.querySelector('.tasks__edit-state--buttons').style.display = "none"
    
    taskEditBtn = document.querySelector('#tasks__edit')
    taskDeleteBtn = document.querySelector('#tasks__delete')
    taskAssignBtn = document.querySelector('#tasks__assign')
    taskCommentBtn = document.querySelector('#tasks__comment')
    taskPomodoroBtn = document.querySelector('#tasks__pomodoroBtn')
    taskCompleteBtn = document.querySelector('#tasks__complete')
    taskBackBtn = document.querySelector('#tasks__back')
    taskProgressBtn = document.querySelector('#tasks__progress')
    taskMigrateBtn = document.querySelector('#tasks__migrate')

    document.querySelector('#createKanbanBtn').addEventListener('click',createKanbanBoard)
    
    
    taskEditBtn.addEventListener('click', editThisTask)
    taskDeleteBtn.addEventListener('click', deleteThisTask)
    taskMigrateBtn.addEventListener('click', migrateThisTaskClick)
    taskAssignBtn.addEventListener('click', addUsersToTasksClick)
    taskCommentBtn.addEventListener('click', createInputsForComment)
    // taskPomodoroBtn.addEventListener('click',showPomodoroUI)
    taskCompleteBtn.addEventListener('click', completeThisTask)
    taskBackBtn.addEventListener('click',goBackToTaskList)
    taskProgressBtn.addEventListener('click',changeTaskProgressUI)
    



    document.body.addEventListener('click', selectTask);
    document.body.addEventListener('click', selectProject);




    document.body.addEventListener('click', kanbanCardClick);
    document.body.addEventListener('mouseover', kanbanUsersHover);
    
    taskAddBtn.addEventListener('click', addTasks)
    projectsAddBtn.addEventListener('click', addProjects)
}



function init() {
    getSelectors()
    data.projects = getProjectStorage();
    data.currentProject = getCurrentProjectFromStorage()
    showProject()
    printProjectStorage()
}


function addUsersToProjectClick(){
    //okay if this function just calls another function 
    // then just have click event attached to that one
    // will leave it here for now 
     addUsersToProjectUI()
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

  function migrateThisTaskClick(){
      migrateThisTaskUI()
  }

document.addEventListener('DOMContentLoaded', init, false);

