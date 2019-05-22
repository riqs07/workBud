
class Task {
    constructor(name, priority, diffuculty, dueDate) {

        let d = new Date();

        this.id = createUniqueID()
        this.name = name
        this.priority = priority
        this.diffuculty = diffuculty
        this.dueDate = dueDate
        this.users = []

        this.timeStamp = {
            date: d.toLocaleDateString(),
            time: d.toLocaleTimeString(),
            day: d.getDay(),
            month: d.getMonth()
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
        this.completedTasks = []
        this.comments = []
        this.pomodoros = {
            totalTime: null,
            totalPomdoros: null
        }
        this.users = []
        this.timeStamp = {
            date: d.toLocaleDateString(),
            time: d.toLocaleTimeString(),
            day: d.getDay(),
            month: d.getMonth()
        }

    }
}

data = {
    unAssignedTasks: [],
    projects: [],
    currentTask: null,
    currentProject: null
}