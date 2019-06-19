var ctx = document.getElementById('myChart');

function addData(chart, label, data) {


    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function doughnutTaskTimeWorked(folder){
    folder.tasks.forEach(task => {
        time = task.timeStamp.duration.totalTimeWorked 
        addData(myChart,task.name,time)
    })
}

function doughnutProjectTimeWorked(folder){
    folder.tasks.forEach(task => {
        time = task.timeStamp.duration.totalTimeWorked 
        addData(myChart,task.name,time)
    })
}



var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            label: 'Time',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

