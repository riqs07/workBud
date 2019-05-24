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


radioCards = document.getElementsByClassName('radio-card')
goo = document.querySelector('.radio-card-container')
goo.addEventListener('click',foo)

function foo(e){
    console.log(e.target)
    if (e.target.classList.contains('radio-card')){

        if(radioCards.classList.contains('selected')){
            radioCards.classList.remove('selected')
            console.log('goo')
        }


        e.target.classList.add('selected')

    }
}