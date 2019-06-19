var mixBut = document.getElementById("gool");

mixBut.addEventListener("click", Start);

function Start(){
    console.log("Started");
    mixBut.removeEventListener("click", Start);
    mixBut.addEventListener("click", Stop);
    mixBut.textContent = "Stop";
}

function Stop(){
    console.log("Stopped");
    mixBut.removeEventListener("click", Stop);
    mixBut.addEventListener("click", Start);
    mixBut.textContent = "Start";
}



function taskTimerClick() {
    // hide view 
    // show new buttons 
    // pomodoro timer countdown
    // each button has a view
    // hide other buttons 
    // show view // have a way to keep timer running and allow user to still use app 
    // Focus mode locks you 
    taskViewHide()


    pomodoroBtn = document.createElement('button')
    stopWatchBtn = document.createElement('button')
    countdownBtn = document.createElement('button')

    pomodoroBtn.innerHTML = '<i class="far fa-clock"></i> Pomodoro'
    stopWatchBtn.innerHTML = '<i class="fas fa-stopwatch"></i> Stopwatch'
    countdownBtn.innerHTML = '<i class="fas fa-hourglass-start"></i> Countdown'

    pomodoroBtn.classList.add('button', 'button-2')
    stopWatchBtn.classList.add('button', 'button-2')
    countdownBtn.classList.add('button', 'button-2')

    pomodoroBtn.addEventListener('click', showPomodoro)
    stopWatchBtn.addEventListener('click', showStopWatch)
    countdownBtn.addEventListener('click',showCountDown)

    parent = document.querySelector('.tasks__selected-task--info').parentNode

    usersContainer = document.createElement('div')

    editStateBack = document.createElement('button')
    editStateBack.classList.add('button', 'button-1')
    editStateBack.innerHTML = '<i class="fas fa-arrow-left"></i> Back'
    editStateBack.addEventListener('click', () => {


        taskInfoPanel.style.display = "block"
        document.querySelector('.tasks__edit-state--buttons').style.display = "block"

        usersContainer.remove();
    })

    usersContainer.append(pomodoroBtn, stopWatchBtn, countdownBtn, editStateBack)

    parent.before(usersContainer)

}

function showPomodoro() {
    pomodoroBtn.remove()
    stopWatchBtn.remove()
    countdownBtn.remove()

    parent = document.querySelector('.tasks__selected-task--info').parentNode

    let pomodoroTimer = document.createElement('div')
    pomodoroTimer.innerHTML = getPomodoroBlueprint()


    parent.append(pomodoroTimer)

    start = document.querySelector('#pomodoro-start')
  


    start.addEventListener('click', startPomodoroTimerCountDown)
  

}

function showStopWatch() {
    pomodoroBtn.remove()
    stopWatchBtn.remove()
    countdownBtn.remove()

    parent = document.querySelector('.tasks__selected-task--info').parentNode

    let timer = document.createElement('div')
    timer.innerHTML = getStopwatchBluePrint()


    parent.append(timer)

    start = document.querySelector('#timer-start')
    pause = document.querySelector('#timer-pause')
    stop = document.querySelector('#timer-stop')


    start.addEventListener('click', startStopWatchTimer)
    // pause.addEventListener('click',pausePomodoro)
    stop.addEventListener('click', stopTimerCountDown)


    console.log('hello')
}

function showCountDown(){
    pomodoroBtn.remove()
    stopWatchBtn.remove()
    countdownBtn.remove()

    parent = document.querySelector('.tasks__selected-task--info').parentNode

    let timer = document.createElement('div')
    timer.innerHTML = getCountDownBlueprint()


    parent.append(timer)

    start = document.querySelector('#countDown-start')
    pause = document.querySelector('#countDown-pause')
    stop = document.querySelector('#countDown-stop')


    start.addEventListener('click', startCountDownTimerClick)
    // pause.addEventListener('click',pausePomodoro)
    stop.addEventListener('click', stopCountDownTimer)


}

function startStopWatchTimer(){
    timer = document.querySelector('.timers__clock')
    
    timeSpent = 0

    stopwatch = setInterval(()=>{

        timeSpent++
        timer.innerHTML = convertSeconds(timeSpent)

    },1000)
    console.log('goo')
}

function stopStopWatchTimer(){
    clearInterval(stopwatch)
    showToast('Stopwatch Ended', 'notification')
    console.log(parseInt(timeSpent))

    task = getCurrentTaskinData()
    timeStamp = task.timeStamp

    timeStamp.duration.totalTimeWorked += timeSpent
    console.log(timeStamp)
}

function startPomodoroTimerCountDown() {
    timeLeft = document.querySelector('#pomodoroLengthSelect').value
    breakLength = document.querySelector('#pomodoroBreakLengthSelect').value
    maxTime = timeLeft

    timer = document.querySelector('.timers__clock')

    //maybe do a find timestamp function 
    task = getCurrentTaskinData()
    timeStamp = task.timeStamp

    // not sure if we need to call task here can maybe do  it in addTimeWorked

    clock = setInterval(pomodoroClock,1000)

    start.removeEventListener("click", startPomodoroTimerCountDown);
    start.addEventListener("click", stopPomodoroTimerCountDown);
    start.textContent = "Stop";
}

function pomodoroClock(){
    timeLeft = parseInt(timeLeft)
        if (timeLeft > 0) {
            timeLeft--
        } else if (timeLeft === 0) {
            clearInterval(clock)
            startPomodoroBreakTimer(breakLength)
            showToast('Pomodoro Complete', 'success')
            addTimeWorkedtoPomodoro(timeStamp, maxTime, true)
        }

        
        timer.innerHTML = convertSeconds(timeLeft)

       

}

function pausePomodoroTimer() {
    // clear the intervbal 
    // change inner html to unpause
    // change function on click event
    // basically a toggle 
    // not super sure how to get un pause wokring

    /// i guess that can be on the start function 
    start.removeEventListener("click", pausePomodoroTimer);
    start.addEventListener("click",gottaPee)
    start.textContent = "Start";
    clearInterval(clock)
}



function stopPomodoroTimerCountDown() {
    clearInterval(clock)
    time = maxTime - timeLeft
    addTimeWorkedtoPomodoro(timeStamp, time, false)
    // mvc this later stop btn click 
    console.log('There has to be a way to pause setInterval')
    showToast('Pomodoro Stopped', 'notification')

    start.removeEventListener("click", stopPomodoroTimerCountDown);
    timer.innerHTML = "Placeholderr"
    start.addEventListener("click",startPomodoroTimerCountDown)
    start.textContent = "Start";
}

function startPomodoroBreakTimer(breakLength) {
    timeLeft = breakLength
    timer = document.querySelector('.timers__clock')

    breakTimer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--
        } else if (timeLeft === 0) {
            clearInterval(breakTimer)
            showToast('Break Complete', 'success')
            console.log('prompt another ')
        }
        timer.innerHTML = convertSeconds(timeLeft)
    }, 1000)
}

function pausePomodoroBreakTimer(){

}

function startCountDownTimerClick(){


    maxTime = document.querySelector('#countDownLengthSelect').value
    timer = document.querySelector('.timers__clock')


    start.removeEventListener("click", startCountDownTimer);
    start.addEventListener("click", pauseCountDownTimer);
    start.textContent = "Pause";


    startCountDownTimer(maxTime)
}


function startCountDownTimer(time){
    // make it so i can add a value on timer click 
    // like the google stopwatch 
    // this shoudl take in time left to allow a pause button to only
    // call the countodwn 
    timeLeft = parseInt(time)

    countDown = setInterval(()=>{
        if (timeLeft > 0){
            timeLeft--

        } else if (timeLeft === 0){
            clearInterval(countDown)
                showToast('MVC placeholder','notification')
        }
        timer.innerHTML = convertSeconds(timeLeft)

    },1000)


}

function stopCountDownTimer(){
  clearInterval(countDown)

  console.log(maxTime,timeLeft)
  if (timeLeft === 0){
    addToTotalTimeWorked(maxTime)
  } else if (timeLeft > 0){
    addToTotalTimeWorked(timeLeft)

  }

}

function pauseCountDownTimer(){
    clearInterval(countDown)

    start.removeEventListener("click", pauseCountDownTimer);
    start.addEventListener("click", unpauseCountDownTimer);
    start.textContent = "Pause";
}

function unpauseCountDownTimer(){
     startCountDownTimer(timeLeft)
     start.removeEventListener("click", unpauseCountDownTimer);
    start.addEventListener("click", pauseCountDownTimer);
    start.textContent = "Start";
}




function addTimeWorkedtoPomodoro(timeStamp, time, completed) {
    time = parseInt(time)


    if (completed === true) {
        timeStamp.duration.pomodoros.completedPomodoros += 1
    }

    timeStamp.duration.totalTimeWorked += time
    timeStamp.duration.pomodoros.totalTime += time
    // mvc this later so i can call update storage on 
    // stop btn click 
    updateStorage()
}

function addToTotalTimeWorked(time){
    task = getCurrentTaskinData()
    
    time = parseInt(time)
    task.timeStamp.duration.totalTimeWorked += time
    updateProjectTimeWorked()
    updateStorage()

}

function updateProjectTimeWorked(){
    folder = getCurrentProjectFolderinData()

    let projectTime = 0

    folder.tasks.forEach(task =>{
        projectTime += parseInt(task.timeStamp.duration.totalTimeWorked)
    })

    folder.timeStamp.duration.totalTimeWorked = projectTime
}

function getPomodoroBlueprint() {
    blueprint = `   
     <div class="card">
    <div class="timers__clock">Pomdoro</div>
    <button class="button button-1" id = "pomodoro-start">Start</button>
    

    <select name="pomodoroLengthSelect" id="pomodoroLengthSelect" class = "input-select">
    <option value="4">Test</option>
    <option value="600">10:00</option>
    <option value="900">15:00</option>
    <option value="1200">20:00</option>
    <option value="1500">25:00</option>
</select>

    <select name="pomodoroBreakLengthSelect" id="pomodoroBreakLengthSelect" class = "input-select">
    <option value="4">Test</option>
    <option value="300">5:00</option>
    <option value="600">10:00</option>
    <option value="900">15:00</option>
    <option value="1200">20:00</option>
</select>
</div>`

    return blueprint
}

function getStopwatchBluePrint() {
    blueprint = `   
     <div class="card">
    <div class="timers__clock">StopWatch</div>
    <button class="button button-1" id = "timer-start" >Start</button>
    <button class="button button-2" id = "timer-pause">Pause</button>
    <button class="button button-2 lime" id = "timer-stop">Finish</button>
    </div>`

    return blueprint

}

function getCountDownBlueprint() {
    blueprint = `   
     <div class="card">
    <div class="timers__clock">CountDown</div>
    <button class="button button-1" id = "countDown-start">Start</button>
    <button class="button button-2" id = "countDown-stop">Stop</button>

    <select name="countDownLengthSelect" id="countDownLengthSelect" class = "input-select">
    <option value="4">Test</option>
    <option value="600">10:00</option>
    <option value="900">15:00</option>
    <option value="1200">20:00</option>
    <option value="1500">25:00</option>
</select>

</div>`

    return blueprint
}

function convertSeconds(sec) {
    minutes = Math.floor(sec / 60)
    seconds = sec % 60
    return `${minutes}:${seconds}`
}
