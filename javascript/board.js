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

function moveTo(id) {
  tasks[currentDraggedElement]['board'] = id;
  loadTasks();
  saveTasksInFirebase();
}

function loadTasks() {
  removeAllTask();
  for (let i = 0; i < tasks.length; i++) {
    loadTask(i);
  }
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
  let subtask = task["subtask"];
  document.getElementById(`${board}`).innerHTML += loadTaskHTML(i, title, description, category);
}

function loadTaskHTML(i, title, description, category) {
  return `
  <div onclick="openTaskDialog(${i})" draggable="true" ondragstart="startDragging(${i})" class="card">
  <img class="category" src="./assets/img/${category}" alt="">
  <h3>${title}</h3>
  <p>${description}</p>
  </div>
`;
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
  let subtask = task["subtask"];
  let priority = task["priority"];

  document.getElementById('containerOpenTaskInBoardSize').innerHTML = `
  <div>
  <img class="category" src="./assets/img/${category}" alt="">
  <span>X <span>
  </div>
  <h3>${title}</h3>
  <p>${description}</p>
  <table>
  <tr>
      <td>Due date:</td>
      <td>${date}</td>
  </tr>
  <tr>
      <td>Priority</td>
      <td>${priority} <img src="./assets/img/${priority}Priority.png" alt=""></td>
  </tr>
  <tr>
      <td>Assigned To:
      <ul> 
          <li>Name1</li>
          <li>Name2</li>
      </ul>
      </td>
  </tr>
  <tr>
      <td>Subtask:
      <ul> 
      <li>Name1</li>
      <li>Name2</li>
  </ul>
      </td> 
  </tr>
</table>
  `;

  document.getElementById('openTaskOnBoardSite').classList.remove('d-noneAddTask');
}


