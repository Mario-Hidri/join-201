let currentDraggedElement;

async function initBoardSite() {
  includeHTML();
  await loadTasksFromFirebase();
  loadTasks();
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(id) {
  tasks[currentDraggedElement]['board'] = id;
  loadTasks();
 await saveTasksInFirebase();
}

function loadTasks() {
  removeAllTask();
  for (let i = 0; i < tasks.length; i++) {
    loadTask(i);
  }
  loadPlaceholderForSectionWithNoTask();
}

function removeAllTask() {
  document.getElementById('toDo').innerHTML = '';
  document.getElementById('inProgress').innerHTML = '';
  document.getElementById('awaitFeedback').innerHTML = '';
  document.getElementById('done').innerHTML = '';
}

function loadTask(i) {
  const task = tasks[i];
  let board = task["board"];
  let title = task["title"];
  let description = task["description"];
  let date = task["date"];
  let category = task["category"];
  document.getElementById(`${board}`).innerHTML += loadTaskHTML(i, title, description, category);
}

function loadTaskHTML(i, title, description, category) {
  return `
  <div onclick="openTaskDialog(${i})" draggable="true" ondragstart="startDragging(${i})" class="card">
  <img class="categorySmallTask" src="./assets/img/${category}" alt="">
  <h3>${title}</h3>
  <p>${description}</p>
  </div>
`;
}

function loadPlaceholderForSectionWithNoTask() {
  let toDoTask = tasks.filter(element => element['board'] == 'toDo');
  let inProgressTask = tasks.filter(element => element['board'] == 'inProgress');
  let awaitFeedbackTask = tasks.filter(element => element['board'] == 'awaitFeedback');
  let doneTask = tasks.filter(element => element['board'] == 'done');
  if (toDoTask.length == 0) {
    document.getElementById('toDo').innerHTML = loadNoTaskPlaceholderHTML(' to Do');
  }
  if (inProgressTask.length == 0) {
    document.getElementById('inProgress').innerHTML = loadNoTaskPlaceholderHTML(' in Progress');
  }
  if (awaitFeedbackTask.length == 0) {
    document.getElementById('awaitFeedback').innerHTML = loadNoTaskPlaceholderHTML(' await Feedback');
  }
  if (doneTask.length == 0) {
    document.getElementById('done').innerHTML = loadNoTaskPlaceholderHTML(' Done');
  }
}

function loadNoTaskPlaceholderHTML(section) {
  return `<div class="noTask">
        <span>  No tasks ${section}  </span>
          </div>`
}


function addTaskOnToDo() {
  document.getElementById('addTaskOnBoardSite').classList.remove('d-noneAddTask');
  board = "toDo";
}

function addTaskOnInProgress() {
  document.getElementById('addTaskOnBoardSite').classList.remove('d-noneAddTask');
  board = "inProgress";
}

function addTaskOnAwaitFeedback() {
  document.getElementById('addTaskOnBoardSite').classList.remove('d-noneAddTask');
  board = "awaitFeedback";
}

function removeAddTaskDialog() {
  document.getElementById('addTaskOnBoardSite').classList.add('d-noneAddTask');
  document.getElementById('title').value = "";
  document.getElementById('description').value = "";
  document.getElementById('date').value = "";
  document.getElementById('subtask').value = "";
  subtasks = [];
  document.getElementById('addSubTask').innerHTML = "";
}

function openTaskDialog(i) {
  let task = tasks[i];
  let title = task["title"];
  let description = task["description"];
  let date = task["date"].replace(/-/g, '/');
  let category = task["category"];
  let priority = task["priority"];
  document.getElementById('containerOpenTaskInBoardSize').innerHTML = loadTaskDialogHTML(title, description, date, category, priority, i);
  loadSubtasksOnBigTask(i,task);
  document.getElementById('openTaskOnBoardSite').classList.remove('d-noneAddTask');
}

function loadTaskDialogHTML(title, description, date, category, priority, i) {
  return `
<div class="spaceBetween">
<img class="categoryOnBigTask" src="./assets/img/${category}" alt="">
<img class="iconOnBigTask" onclick="closeTask()" src="./assets/img/crossIcon.png" alt="">
</div>

<h2 class="titleOnBigTask">${title}</h2>
<p>${description}</p>
 
    <div>
    <span>Due date:</span>
    <span>${date}</span>
    </div>

    <div>
    <span>Priority:</span>
    <span>${priority} <img class="priorityImgOnBigTask" src="./assets/img/${priority}Priority.png" alt=""></span>
     </div>
     
    <div>Assigned To:
    <ul> 
        <li>Name1</li>
        <li>Name2</li>
    </ul>
    </div>
 
 
    <div>
    Subtask:
    <ul id="loadSubtasksOnBigTask"></ul>
    </div> 
 
<div>
<span onclick="deleteTask(${i})"><img class="iconOnBigTask" src="./assets/img/deleteIcon.png" alt="">Delete</span> 
<span onclick="editTask(${i})"><img class="iconOnBigTask" src="./assets/img/editIcon.png" alt="">Edit</span>
<div>
`;
}

function loadSubtasksOnBigTask(taskNumber,task) {
  let subtasks = task["subtask"];
  for (let j = 0; j < subtasks.length; j++) {
    let subtask = subtasks[j];
    let checkbox;
    if(subtask["done"]){
      checkbox = './assets/img/checkboxDone.png';
    }else{
      checkbox = './assets/img/checkboxToDo.png';
    }

    document.getElementById('loadSubtasksOnBigTask').innerHTML += loadSubtaskOnBigTaskHTML(taskNumber,j,subtask,checkbox);

  }
}

function loadSubtaskOnBigTaskHTML(taskNumber,subtaskNumber,subtask,checkbox){
return`
<li><img id="subtask${subtaskNumber}" onclick="changeCheckbox(${taskNumber},${subtaskNumber},${subtask["done"]})" class="iconOnBigTask" src="${checkbox}" alt="">${subtask["subtask"]}</li>
`;
}

function changeCheckbox(taskNumber,subtaskNumber,subtask){ 
  if(subtask){
    tasks[taskNumber]["subtask"][subtaskNumber]["done"] =false;
    document.getElementById(`subtask${subtaskNumber}`).src = './assets/img/checkboxToDo.png';
}else{
  tasks[taskNumber]["subtask"][subtaskNumber]["done"] =true;
  document.getElementById(`subtask${subtaskNumber}`).src = './assets/img/checkboxDone.png';
}
saveTasksInFirebase();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  document.getElementById('openTaskOnBoardSite').classList.add('d-noneAddTask');
  loadTasks();
  saveTasksInFirebase();
}

function closeTask() {
  document.getElementById('openTaskOnBoardSite').classList.add('d-noneAddTask');
}

function editTask() {

}