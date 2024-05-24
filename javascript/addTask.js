let tasks = [];
let subtasks = [];
let prio = "urgent";
let url = 'https://jointask-cedc0-default-rtdb.europe-west1.firebasedatabase.app/.json';
let board = "toDo";

function initAddTaskSite() {
    includeHTML();
    loadTasksFromFirebase();
}

async function addTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let category = assignCategory();
    let task = assignTask(title, description, date, category);
    tasks.push(task);
    await saveTasksInFirebase();
    window.location.href = 'board.html';
}

function assignTask(title, description, date, category) {
    return {
        "title": title.value,
        "description": description.value,
        "date": date.value,
        "category": category,
        "priority": prio,
        "subtask": subtasks,
        "board": board
    };
}

function assignCategory() {
    let category = document.getElementById('category');
    if (category.value == "User Story") {
        return category = "userStory.png"
    } else {
        return category = "technicalTask.png";
    }
}

async function saveTasksInFirebase() {
    await fetch(url, {
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tasks)
    });
}

async function loadTasksFromFirebase() {
    let response = await fetch(url);
    tasks = await response.json();
    if (tasks == null) {
        tasks = [];
    }
}

function addSubTask() {
    let subtask = {
        "subtask": document.getElementById('subtask').value,
        "done": false
    };
    subtasks.push(subtask);
    loadSubtasks();
    document.getElementById('subtask').value = '';
}

function loadSubtasks() {
    document.getElementById('addSubTask').innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i]['subtask'];
        document.getElementById('addSubTask').innerHTML += loadSubtaskHTML(i, subtask);
    }
}

function loadSubtaskHTML(i, subtask) {
    return `
    <div class="spaceBetweenSubtaskAndIcons" id="subtask${i}">
    <span>${subtask}</span>
    <span> 
     <img class="subtaskIcon" onclick="editSubtask(${i})" src="./assets/img/editIcon.png" alt="">
     <img class="subtaskIcon" onclick="deleteSubtask(${i})" src="./assets/img/deleteIcon.png" alt="">
     </span>
     </div>
    `;
}

function deleteSubtask(i) {
    subtasks.splice(i, 1);
    loadSubtasks();
}

function editSubtask(i) {
    document.getElementById(`subtask${i}`).innerHTML = `
<input id="changeSubtask${i}" type="text" value="${subtasks[i]['subtask']}">
<span> 
<img class="subtaskIcon" onclick="deleteSubtask(${i})" src="./assets/img/deleteIcon.png" alt="">
<img class="subtaskIcon" onclick="saveChangeSubtask(${i})" src="./assets/img/checkIcon.png" alt="">
</span>
`;
}

function saveChangeSubtask(i) {
    subtasks[i]['subtask'] = document.getElementById(`changeSubtask${i}`).value;
    loadSubtasks();
}

function resetSubTask() {
    subtasks = [];
    document.getElementById('addSubTask').innerHTML = "";
}

function changePrioToUrgent() {
    document.getElementById('urgent').src = './assets/img/activeUrgentPriority.png';
    document.getElementById('medium').src = './assets/img/mediumPriority.png';
    document.getElementById('low').src = './assets/img/lowPriority.png';
    document.getElementById('urgent').parentElement.classList.add('urgentPriority');
    document.getElementById("medium").parentElement.classList.remove('mediumPriority');
    document.getElementById('low').parentElement.classList.remove('lowPriority');
    prio = "urgent";
}

function changePrioToMedium() {
    document.getElementById("urgent").src = './assets/img/urgentPriority.png';
    document.getElementById("medium").src = './assets/img/activeMediumPriority.png';
    document.getElementById("low").src = './assets/img/lowPriority.png';
    document.getElementById("urgent").parentElement.classList.remove('urgentPriority');
    document.getElementById("medium").parentElement.classList.add('mediumPriority');
    document.getElementById("low").parentElement.classList.remove('lowPriority');
    prio = "medium";

}

function changePrioToLow() {
    document.getElementById("urgent").src = './assets/img/urgentPriority.png';
    document.getElementById("medium").src = './assets/img/MediumPriority.png';
    document.getElementById("low").src = './assets/img/activeLowPriority.png';
    document.getElementById("urgent").parentElement.classList.remove('urgentPriority');
    document.getElementById("medium").parentElement.classList.remove('mediumPriority');
    document.getElementById("low").parentElement.classList.add('lowPriority');
    prio = "low";
}

function showContacts() {
    document.getElementById('addContact').innerHTML = '';
    let search = document.getElementById('assignContact').value;
    search = search.toLowerCase();
    for (let i = 0; i < allContacts.length; i++) {

        const contact = allContacts[i];
        let name = contact['name'];
        if (name.toLowerCase().includes(search)) {
            document.getElementById('addContact').innerHTML += `
            <div>${name}</div>
        `;
        }
    }
}