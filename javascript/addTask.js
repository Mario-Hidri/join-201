let tasks = [];
let subtasks = [];
let prio = "urgent";
function addTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let priority;
    let category = document.getElementById('category');
    // let subtask = document.getElementById();
    if(category.value =="User Story"){
        category="userStory.png";
    }else{
        category="technicalTask.png";
    }
    let task = {
        "title": title.value,
        "description": description.value,
        "date": date.value,
        "category": category,
        "subtask": subtasks,
        "board": "toDo"
    }
    tasks.push(task);
    loadTask();
}

function loadTask() {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let board = task["board"];
        let titel = task["titel"];
        let description = task["description"];
        let date = task["date"];
        let category = task["category"];
        let  btask = task["subtask"];


        document.getElementById(`${board}`).innerHTML = `
    
        <div class="card">
        <img src="./assets/img/${category}" alt="">
        <h3>${titel}</h3>
        <p>${description}</p>
        </div>
    `;
        if(category=="User Story"){

        }

    }
}

function loadTaskHTML() {

}

function addSubTask() {
    let subtask = document.getElementById('subtask');
    subtasks.push(subtask.value);
    document.getElementById('addSubTask').innerHTML += `<li>${subtask.value}</li>`;
    subtask.value = '';
}

function changePrioToUrgent() {
    document.getElementById("urgent").scr = "./assets/img/activeHighPriority.png";
    document.getElementById("medium").scr = "./assets/img/MediumPriority.png";
    document.getElementById("low").scr = "./assets/img/lowPriority.png";
    document.getElementById("urgent").parentElement.classList.add('urgentPriority');
    document.getElementById("medium").parentElement.classList.remove('mediumPriority');
    document.getElementById("low").parentElement.classList.remove('lowPriority');
    prio = "urgent";
}

function changePrioToMedium() {
    document.getElementById("urgent").scr = "./assets/img/HighPriority.png";
    document.getElementById("medium").scr = "./assets/img/activeMediumPriority.png";
    document.getElementById("low").scr = "./assets/img/lowPriority.png";
    document.getElementById("urgent").parentElement.classList.remove('urgentPriority');
    document.getElementById("medium").parentElement.classList.add('mediumPriority');
    document.getElementById("low").parentElement.classList.remove('lowPriority');
    prio = "medium";

}

function changePrioToLow() {
    document.getElementById("urgent").scr = "./assets/img/HighPriority.png";
    document.getElementById("medium").scr = "./assets/img/MediumPriority.png";
    document.getElementById("low").scr = "./assets/img/activeLowPriority.png";
    document.getElementById("urgent").parentElement.classList.remove('urgentPriority');
    document.getElementById("medium").parentElement.classList.remove('mediumPriority');
    document.getElementById("low").parentElement.classList.add('lowPriority');
    prio = "low";
}

