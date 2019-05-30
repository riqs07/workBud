data = {
    users: [],
    projects: [],
    currentTask: null,
    currentProject: null
}


class Task {
    constructor(name, priority, diffuculty, dueDate) {

        let d = new Date();

        this.id = createUniqueID()
        this.name = name
        this.priority = priority
        this.urgency = null
        this.diffuculty = diffuculty
        this.dueDate = dueDate
        this.users = []

        this.timeStamp = {

            created:{
                date: d.toLocaleDateString(),
            time: d.toLocaleTimeString(),
            day: d.getDay(),
            month: d.getMonth()
        },
         completed: {
            date: null,
            time: null,
            day: null,
            month: null
        }
    }
        this.pomodoros = {
            totalTime: 0,
            totalPomodoros: 0,
        }
        this.isCompleted = false;
        this.progress = 'Task Backlog';
        this.comments = []
    }
}

class Project {
    constructor(name, dueDate) {
        let d = new Date();

        this.id = createUniqueID()
        this.name = name
        this.dueDate = dueDate
        this.tasks = []
        this.archive = []
        this.comments = []
        this.pomodoros = {
            totalTime: null,
            totalPomdoros: null
        }
        this.users = []
        this.timeStamp = {
            created:{
                date: d.toLocaleDateString(),
                time: d.toLocaleTimeString(),
                day: d.getDay(),
                month: d.getMonth()
            },
            completed: {
                date: null,
                time: null,
                day: null,
                month: null
            }
        }

    }
}


class Habit {
    constructor(name, priority){
        let d = new Date();
        
        this.name = name;
        this.id = createUniqueID();
        this.priority = priority;
        this.daysInARow = 0;


        this.timeStamp = {
            date: d.toLocaleDateString(),
            time: d.toLocaleTimeString(),
            day: d.getDay(),
            month: d.getMonth()
        }
    }
}

class User {
    constructor(name){
        this.id = createUniqueUserID()
        this.name = name;
        this.team = null;
        this.email = `${name}@workBud.com`
        this.handle = `@${name}`;
        this.tasks = [];
        
        // splice array by space so handle isnt weird if user enters first and last name
        // maybe get space and insert a hyphen
    
    }
}
    