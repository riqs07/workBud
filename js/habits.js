function addNewHabit(){
    newHabit = new Habit('Read for 15 mins','low')
    sample.habits.push(newHabit)

}

function updateScore(){

    score = null
    sample.habits.forEach((habit) =>{
        switch (habit.priority){
            case 'low':
            score += 5
            break;
            case 'med':
            score += 10
            break;
            case 'high':
            score += 15
            break;
        }

    })

    sample.weekScore = score
}

function showHabits(){
    sample.habits.forEach(habit =>{
        
    })
}
sample = {
    habits:[],
    weekScore:null,
    monthScore:null,

}