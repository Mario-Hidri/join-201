let tasks = [];
let subtasks = [];
let prio = "urgent";
let url = 'https://jointask-cedc0-default-rtdb.europe-west1.firebasedatabase.app/.json';
let board = "toDo";
 
function initAddTaskSite(){
    includeHTML();
    loadTasksFromFirebase();
}

async function initBoardSite(){
    includeHTML();
   await loadTasksFromFirebase();
    loadTask()
}

function addTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let category = document.getElementById('category');
    // let subtask = document.getElementById();
    if (category.value == "User Story") {
        category = "userStory.png"
    } else {
        category = "technicalTask.png";
    }

    let task = {
        "title": title.value,
        "description": description.value,
        "date": date.value,
        "category": category,
        "subtask": subtasks,
        "board": board
    }
    tasks.push(task);
    saveTasksInFirebase() ;
}
 
async function saveTasksInFirebase() {
     await fetch(url , {
        method:"PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tasks)
    });
    window.location.href = 'board.html'
}


async function loadTasksFromFirebase(){
    let response =  await fetch(url);

    tasks = await response.json();
    if(tasks[0] == null){
        tasks =[];
    } 
}



function loadTask() {
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let board = task["board"];
        let title = task["title"];
        let description = task["description"];
        let date = task["date"];
        let category = task["category"];
        let subtask = task["subtask"];


        

        document.getElementById(`${board}`).innerHTML += `
        <div draggable="true" ondragstart="startDragging(${i})" class="card">
        <img class="category" src="./assets/img/${category}" alt="">
        <h3>${title}</h3>
        <p>${description}</p>
        </div>
    `;


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
    document.getElementById('urgent').src = './assets/img/activeHighPriority.png';
    document.getElementById('medium').src = './assets/img/mediumPriority.png';
    document.getElementById('low').src = './assets/img/lowPriority.png';
    document.getElementById('urgent').parentElement.classList.add('urgentPriority');
    document.getElementById("medium").parentElement.classList.remove('mediumPriority');
    document.getElementById('low').parentElement.classList.remove('lowPriority');
    prio = "urgent";
}

function changePrioToMedium() {
    document.getElementById("urgent").src = './assets/img/highPriority.png';
    document.getElementById("medium").src = './assets/img/activeMediumPriority.png';
    document.getElementById("low").src = './assets/img/lowPriority.png';
    document.getElementById("urgent").parentElement.classList.remove('urgentPriority');
    document.getElementById("medium").parentElement.classList.add('mediumPriority');
    document.getElementById("low").parentElement.classList.remove('lowPriority');
    prio = "medium";

}

function changePrioToLow() {
    document.getElementById("urgent").src = './assets/img/HighPriority.png';
    document.getElementById("medium").src = './assets/img/MediumPriority.png';
    document.getElementById("low").src = './assets/img/activeLowPriority.png';
    document.getElementById("urgent").parentElement.classList.remove('urgentPriority');
    document.getElementById("medium").parentElement.classList.remove('mediumPriority');
    document.getElementById("low").parentElement.classList.add('lowPriority');
    prio = "low";
}

