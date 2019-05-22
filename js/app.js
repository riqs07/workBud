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
    taskProgressBtn = document.querySelector('#tasks__progress')

    document.querySelector('#createKanbanBtn').addEventListener('click',createKanbanBoard)
    
    
    taskEditBtn.addEventListener('click', editThisTask)
    taskDeleteBtn.addEventListener('click', deleteThisTask)
    taskAssignBtn.addEventListener('click', assignThisTask)
    taskCommentBtn.addEventListener('click', createInputsForComment)
    // taskPomodoroBtn.addEventListener('click',showPomodoroUI)
    taskCompleteBtn.addEventListener('click', completeThisTask)
    taskBackBtn.addEventListener('click',goBackToTaskList)
    taskProgressBtn.addEventListener('click',changeTaskProgress)
    
    document.body.addEventListener('click', selectTask);
    document.body.addEventListener('click', selectProject);
    
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


document.addEventListener('DOMContentLoaded', init, false);