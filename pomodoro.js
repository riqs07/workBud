class Pomodorox {
    constructor(){
        this.taskTimeLeft = ""
        this.breakTimeLeft = ""
    }

getUISelctors(){
    this.timer = document.querySelector('.pomodoro__timer')

    this.start = document.querySelector('#pomodoro-start')
    this.pause = document.querySelector('#pomodoro-pause')
    this.reset = document.querySelector('#pomodoro-reset')
    
    
this.start.addEventListener('click',this.start)
this.pause.addEventListener('click',this.pause)
this.reset.addEventListener('click',this.reset)

}

startPomodoroX(){
    // this.lengthSelect = document.querySelector('#pomodoroLengthSelect')
    // this.breakLengthSelect = document.querySelector('#pomodoroBreakLengthSelect')
   
    // this.startPomodoro= setInterval(this.startTaskTimer,1000)
console.log('foo')
}    


goBack(){

}


startTaskTimer(){
    
    if (this.taskTimeLeft > 0){
        this.taskTimeLeft--
    } else if (this.taskTimeLeft === 0){
        clearInterval(this.pomodoroCountDownTimer)
        startBreak()
    }

    this.timer.innerHTML = convertSeconds(this.taskTimeLeft)
}

startBreakTime(){
    this.pomodoroBreakTimer = setInterval(this.startBreakTimer,1000)
}


startBreakTimer(){
    if (this.breakTimeLeft > 0 ){
        this.breakTimeLeft--
    } else if (this.breakTimeLeft === 0){
        clearInterval(this.pomodoroBreakTimer)
        startPomodoroCountDown();
    }
    this.timer.innerHTML = this.convertSeconds(breakTimeLeft)

}

// function getLengthValues(){
//     this.pomodoroTimeLeft = LengthSelect.value;
//     this.breakTimeLeft = BreakLengthSelect.value
// }


// function startPomdoro(){
//     this.getLengthValues()
//    this.pomodoroCountDownTimer = setInterval(this,startPomodoroCountDown,1000)
// }


pauseTimer(){
  
clearInterval(this.startTaskTimer)
      
}  
// function resetTimer(){
//     clearInterval(pomodoroCountDownTimer)
//     taskTimeLeft = 90
//     timer.innerHTML = taskTimeLeft
// }





convertSeconds(sec){
    this.minutes = Math.floor(this.sec / 60)
    this.seconds = sec % 60
    return `${minutes}:${seconds}`
}
}


class Pomodoro{
    constructor(){
        this.taskTimeLeft = ""
        this.breakTimeLeft = ""
        this.view = document.querySelector('#anchor')
    }
    showPomodoro(){
        this.blueprint = this.getPomodoroBlueprint()
        this.view.innerHTML = this.blueprint
        this.getUISelctors()
    }

    hidePomodoro(){
        this.view.innerHTML = 'Whaterver the fuck'
        console.log('foo')
    }

    getUISelctors(){
        // this.timer = document.querySelector('.pomodoro__timer')
    
        this.start = document.querySelector('#pomodoro-start')
        this.pause = document.querySelector('#pomodoro-pause')
        this.reset = document.querySelector('#pomodoro-reset')
        
        this.lengthSelect = document.querySelector('#pomodoroLengthSelect')
        this.breakLengthSelect = document.querySelector('#pomodoroBreakLengthSelect')
        
        
    this.start.addEventListener('click',this.startTaskTime)
    this.pause.addEventListener('click',this.pauseTimer)
    this.reset.addEventListener('click',this.reset)
    
    }

    getPomodoroBlueprint(){
        this.timerBlueprint = `   
         <div class="card">
        <div class="pomodoro__timer">xxx</div>
        <button class="btn green" id = "pomodoro-start">Start</button>
        <button class="btn red" id = "pomodoro-pause">Pause</button>
        <button class="btn blue" id = "pomodoro-reset">Reset</button>
        <button class="btn red" id = "pomodoro-back" onClick = "console.log('test')">foo</button>

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

    return this.timerBlueprint
    }

    startTaskTime(){
        console.log(this.lengthSelectValue,'goo')
        this.taskTimeLeft = this.lengthSelect.value
        this.foo = setInterval(this.startTaskTimer,1000)
    }
    
    startTaskTimer(){
        this.timer = document.querySelector('.pomodoro__timer')
        console.log(this.taskTimeLeft)

        if (this.taskTimeLeft > 0){
            this.taskTimeLeft--
            console.log('foop')

        } else if (this.taskTimeLeft === 0){
            // clearInterval(this.pomodoroCountDownTimer)
            // startBreak()

            console.log('foop')
        }
    
      this.timer.innerHTML = this.taskTimeLeft
    }
    
    startBreakTime(){
        this.pomodoroBreakTimer = setInterval(this.startBreakTimer,1000)
    }
    
    
    startBreakTimer(){
        if (this.breakTimeLeft > 0 ){
            this.breakTimeLeft--
        } else if (this.breakTimeLeft === 0){
            clearInterval(this.pomodoroBreakTimer)
            startPomodoroCountDown();
        }
        this.timer.innerHTML = this.convertSeconds(breakTimeLeft)
    
    }
             
    
    convertSeconds(sec){
        this.minutes = Math.floor(this.sec / 60)
        this.seconds = this.sec % 60
        return `${this.minutes}:${this.seconds}`
    }

    pauseTimer(){
        console.log('goodnight')
       }
       
       resetTimer(){
       
       }
       
       
}
