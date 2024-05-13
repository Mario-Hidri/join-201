let tasks = [];
let subtasks =[];
let prio ="urgent";
function addTask(){
    let titel = document.getElementById(titel);
    let description = document.getElementById(description);
    let date = document.getElementById(date);
    let priority;
    let category = document.getElementById(date);
   // let subtask = document.getElementById();
   let task = {
    "titel":titel,
    "description":description,
    "date":date,
    "category":category,
    "subtask":subtasks
   }
     tasks.push(task);
}


function loadTaskHTML(){

}

function addSubTask(){
 let subtask = document.getElementById('subtask');
 subtasks.push(subtask.value);
 document.getElementById('addSubTask').innerHTML += `<li>${subtask.value}</li>`;
 subtask.value ='';
}

function changePrioToUrgent(){
    document.getElementById("urgent").scr = "./assets/img/activeHighPriority.png";
    document.getElementById("medium").scr = "./assets/img/MediumPriority.png";
    document.getElementById("low").scr = "./assets/img/lowPriority.png";
    document.getElementById("urgent").parentElement.classList.add('urgentPriority');
    document.getElementById("medium").parentElement.classList.remove('mediumPriority');
    document.getElementById("low").parentElement.classList.remove('lowPriority');
    prio ="urgent";
}

function changePrioToMedium(){
    document.getElementById("urgent").scr = "./assets/img/HighPriority.png";
    document.getElementById("medium").scr = "./assets/img/activeMediumPriority.png";
    document.getElementById("low").scr = "./assets/img/lowPriority.png";
    document.getElementById("urgent").parentElement.classList.remove('urgentPriority');
    document.getElementById("medium").parentElement.classList.add('mediumPriority');
    document.getElementById("low").parentElement.classList.remove('lowPriority');
    prio ="medium";
    
}

function changePrioToLow(){
    document.getElementById("urgent").scr = "./assets/img/HighPriority.png";
    document.getElementById("medium").scr = "./assets/img/MediumPriority.png";
    document.getElementById("low").scr = "./assets/img/activeLowPriority.png";
    document.getElementById("urgent").parentElement.classList.remove('urgentPriority');
    document.getElementById("medium").parentElement.classList.remove('mediumPriority');
    document.getElementById("low").parentElement.classList.add('lowPriority');
    prio ="low";
}

