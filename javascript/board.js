let currentDraggedElement;


async function initBoardSite() {
  await includeHTML();
  loadActiveUserInitials();
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

function filter() {
  let filter = document.getElementById('search').value;
  filter = filter.toLowerCase();
  loadTasks(filter);
}

function loadTasks(filter) {
  removeAllTask();
  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i]["title"] || ''; // Default-Wert setzen, falls title undefined ist
    title = title.toLowerCase();
    let description = tasks[i]["description"] || ''; // Default-Wert setzen, falls description undefined ist
    description = description.toLowerCase();
    if (!filter || title.includes(filter) || description.includes(filter)) {
      loadTask(i);
    }
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
  let category = task["category"];
  let priority = task["priority"];
  let subtask = task["subtask"] || []; // Default-Wert setzen, falls subtask undefined ist
  let subtaskCount = subtask.length;
  let subtaskCountDone = (subtask.filter(t => t['done'] == true)).length;
  let subtaskDoneInPercent =  ((subtaskCountDone / subtaskCount) * 100); // Vermeidung der Division durch 0
  document.getElementById(`${board}`).innerHTML += loadTaskHTML(i, title, description, category, subtaskCount, subtaskCountDone, subtaskDoneInPercent, priority);
  removeProgressBarIfNoSubtask(i,subtaskCount);
  loadAuthority(i,task);
}

function  removeProgressBarIfNoSubtask(i,subtaskCount){
  if(subtaskCount == 0){
    document.getElementById(`subtasks${i}`).classList.add('d-none');
  }
}

function loadAuthority(i, task){
  let authority = task["authorityForTask"] || [];
  for (let j = 0; j < authority.length; j++) {
      const contact = authority[j];
      const lastNameInitial = contact.split(' ')[1]?.charAt(0) || '';
      document.getElementById(`authorityIcon${i}`).innerHTML += loadAuthorityHTML(contact,lastNameInitial);
  }
}

function loadAuthorityHTML(contact,lastNameInitial){
  return `
  <div class="authorityImageContainer" style="background-color: blue;">
  <span class="initials1">${contact.charAt(0)}</span>
  <span class="initials2">${lastNameInitial}</span>
  </div>
  `;
}

function getCategorySize(category) {
  switch(category) {
      case "technicalTask.png":
          return { width: '144px', height: '27px' };
      case "userStory.png":
          return { width: '113px', height: '27px' };
      // Weitere Kategorien hier hinzufügen
      default:
          return { width: '144px', height: '27px' }; // Default-Größe
  }
}

function getPrioritySize(priority) {
  switch(priority) {
      case 'urgent':
          return { width: '17px', height: '12px' };
      case 'medium':
          return { width: '17px', height: '6.7px' };
      case 'low':
          return { width: '17px', height: '12px' };
      default:
          return { width: '17px', height: '12px' }; // Default-Größe
  }
}

function loadTaskHTML(i, title, description, category, subtaskCount, subtaskCountDone, subtaskDoneInPercent, priority) {
    const { width: categoryWidth, height: categoryHeight } = getCategorySize(category);
    const { width: priorityWidth, height: priorityHeight } = getPrioritySize(priority);
    return `
    <div onclick="openTaskDialog(${i})" draggable="true" ondragstart="startDragging(${i})" class="card">
        <img class="categorySmallTask" src="./assets/img/${category}" alt="" style="width: ${categoryWidth}; height: ${categoryHeight};">
        <h3>${title}</h3>
        <p class="openTaskParagraph">${description}</p>
        <div id="subtasks${i}">
        <div  id="progressbar">
            <div style="width:${subtaskDoneInPercent}%"></div>
        </div>
        <div class="subtaskText">${subtaskCountDone}/${subtaskCount}  Subtasks</div>
        </div>
        <div class="ContactsAndPriorityContainer">
            <div class="authorityIcon" id="authorityIcon${i}"></div> 
            <img class="priorityImgOnBigTask" src="./assets/img/${priority}Priority.png" alt="" style="width: ${priorityWidth}; height: ${priorityHeight};">
        </div>
    </div>
    `;
}



function loadPlaceholderForSectionWithNoTask() {
  loadPlaceholderForToDoSectionIfNoTask();
  loadPlaceholderForInProgressSectionIfNoTask();
  loadPlaceholderForAwaitFeedbackSectionIfNoTask();
  loadPlaceholderForDoneSectionIfNoTask();
}

function loadPlaceholderForToDoSectionIfNoTask(){
  let toDoTask = tasks.filter(element => element['board'] == 'toDo');
  if (toDoTask.length == 0) {
    document.getElementById('toDo').innerHTML = loadNoTaskPlaceholderHTML(' to Do');
  }
}

function loadPlaceholderForInProgressSectionIfNoTask(){
  let inProgressTask = tasks.filter(element => element['board'] == 'inProgress');
  if (inProgressTask.length == 0) {
    document.getElementById('inProgress').innerHTML = loadNoTaskPlaceholderHTML(' in Progress');
  }
}

function loadPlaceholderForAwaitFeedbackSectionIfNoTask(){
  let awaitFeedbackTask = tasks.filter(element => element['board'] == 'awaitFeedback');
  if (awaitFeedbackTask.length == 0) {
    document.getElementById('awaitFeedback').innerHTML = loadNoTaskPlaceholderHTML(' await Feedback');
  }
}

function loadPlaceholderForDoneSectionIfNoTask(){
  let doneTask = tasks.filter(element => element['board'] == 'done');
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
  document.getElementById('addTaskOnBoardSite').innerHTML = `
  <div class="containeraddTaskInBoardSize" w3-include-html="./assets/templates/addTask.html"></div>
  `;
  includeHTML();
  document.getElementById('addTaskOnBoardSite').classList.remove('d-noneAddTask');
  board = "toDo";
}

function addTaskOnInProgress() {
  document.getElementById('addTaskOnBoardSite').innerHTML = `
  <div class="containeraddTaskInBoardSize" w3-include-html="./assets/templates/addTask.html"></div>
  `;
  includeHTML();
  document.getElementById('addTaskOnBoardSite').classList.remove('d-noneAddTask');
  board = "inProgress";
}

function addTaskOnAwaitFeedback() {
  document.getElementById('addTaskOnBoardSite').innerHTML = `
  <div class="containeraddTaskInBoardSize" w3-include-html="./assets/templates/addTask.html"></div>
  `;
  includeHTML();
  document.getElementById('addTaskOnBoardSite').classList.remove('d-noneAddTask');
  board = "awaitFeedback";
}

function removeAddTaskDialog() {
  document.getElementById('addTaskOnBoardSite').classList.add('d-noneAddTask');
  document.getElementById('addTaskOnBoardSite').innerHTML = '';
  reset();
}

function openTaskDialog(i) {
  let task = tasks[i];
  let title = task["title"];
  let description = task["description"];
  let date = task["date"].replace(/-/g, '/');
  let category = task["category"];
  let priority = task["priority"];
  document.getElementById('containerOpenTaskInBoardSize').innerHTML = loadTaskDialogHTML(title, description, date, category, priority, i);
  loadSubtasksOnBigTask(i, task);
  document.getElementById('openTaskOnBoardSite').classList.remove('d-noneAddTask');
  loadContactsOnBigTask(i, task);
}

function loadTaskDialogHTML(title, description, date, category, priority, i) {
  return `
<div class="categoryandexitbuttoncontainer">
<img class="categoryOnBigTask" src="./assets/img/${category}" alt="">
<img class="exitButtonBigTask" onclick="closeTask()" src="./assets/img/crossIcon.png" alt="">
</div>

<h2 class="titleOnBigTask">${title}</h2>
<p class="paragraphOnBigTask">${description}</p>
 
    <div class="dateBigTaskContainer">
    <span class="spanDateBigTask">Due date:</span>
    <span>${date}</span>
    </div>

    <div class="priorityBigTaskContainer">
    <span class="spanBigTaskPriorityText">Priority:</span>
    <span class="priorityBigTaskSmallContainer">${priority} <img class="priorityImgOnBigTask" src="./assets/img/${priority}Priority.png" alt=""></span>
     </div>
     
    <div class="contactBigTaskContainer">
    <span class="spanTextBigTask">Assigned To:</span>
    <div class="contactsBigTask" id="contactAtBigTask"> 
        
    </div>
    </div>
 
 
    <div class="subtaskBigTaskContainer">
    <span class="subtaskTextBigTask">Subtask:</span>
    <div class="subtaskcontactsContainer" id="loadSubtasksOnBigTask"></div>
    </div> 
 
<div class="buttonsBigTaskContainer">
<span class="buttonsGapBigTask" onclick="deleteTask(${i})"><img class="iconDeleteBigTask" src="./assets/img/deleteIcon.png" alt="">Delete</span> 
<span class="buttonsGapBigTask" onclick="editTask(${i})"><img class="iconEditBigTask" src="./assets/img/editIcon.png" alt="">Edit</span>
<div>
`;
}

function loadContactsOnBigTask(taskNumber, task) {
  let authority = task["authorityForTask"] || [];
  document.getElementById('contactAtBigTask').innerHTML = '';
  for (let j = 0; j < authority.length; j++) {
    const contact = authority[j];
    const lastNameInitial = contact.split(' ')[1]?.charAt(0) || '';
    document.getElementById(`contactAtBigTask`).innerHTML +=  loadContactOnBigTaskHTML(contact, lastNameInitial);

  }
}

function loadContactOnBigTaskHTML(contact, lastNameInitial){
 return  `
    <div class="verticalCenter">
    <div class="image_container" style="background-color: blue;">
    <span class="initials1">${contact.charAt(0)}</span>
    <span class="initials2">${lastNameInitial}</span>
    </div>
    <div>${contact}</div>
    </div>
    `;
}

function loadSubtasksOnBigTask(taskNumber, task) {
  let subtasks = task["subtask"] || []; // Default-Wert setzen, falls subtask undefined ist
  document.getElementById('loadSubtasksOnBigTask').innerHTML = ''; // Sicherstellen, dass das Element leer ist, bevor Subtasks hinzugefügt werden
  for (let j = 0; j < subtasks.length; j++) {
    let subtask = subtasks[j];
    let checkbox = assignCheckbox(subtask);
    document.getElementById('loadSubtasksOnBigTask').innerHTML += loadSubtaskOnBigTaskHTML(taskNumber, j, subtask, checkbox);
  }
}

function assignCheckbox(subtask){
  if (subtask["done"]) {
    return checkbox = './assets/img/checkboxDone.png';
  } else {
   return  checkbox = './assets/img/checkboxToDo.png';
  }
}

function loadSubtaskOnBigTaskHTML(taskNumber, subtaskNumber, subtask, checkbox) {
  return `
<div><img id="subtask${subtaskNumber}" onclick="changeCheckbox(${taskNumber},${subtaskNumber})" class="iconOnBigTask" src="${checkbox}" alt="">${subtask["subtask"]}</div>
`;
}

function changeCheckbox(taskNumber, subtaskNumber) {
  if (tasks[taskNumber]["subtask"][subtaskNumber]["done"] == true) {
    tasks[taskNumber]["subtask"][subtaskNumber]["done"] = false;
    document.getElementById(`subtask${subtaskNumber}`).src = './assets/img/checkboxToDo.png';
  } else {
    tasks[taskNumber]["subtask"][subtaskNumber]["done"] = true;
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
  document.getElementById('containerOpenTaskInBoardSize').innerHTML = '';
  loadTasks();
}

function editTask(i) {
  let task = tasks[i];
  let title = task['title'];
  let description = task['description'];
  let date = task['date']; 
  document.getElementById('containerOpenTaskInBoardSize').innerHTML =  loadEditTaskHTML(i,title,description,date);
  loadPriority(i, task);
  subtasks = task['subtask'] || [];
  loadSubtasks();
  assignAuthority(task);
  removeAddContactSection();
}

function loadEditTaskHTML(i,title,description,date){
  return `
  <img class="exitButtonBigTask" onclick="closeTask()" src="./assets/img/crossIcon.png" alt="">
  <form onsubmit="changeTask(${i}); return false">
    <label for="title">Title<span class="colorRed">*</span></label>
      <div class="fake-input">
        <input required id="title" type="text" value="${title}" placeholder="Enter a Title">
      </div>
    <label for="description">Description</label>
      <div class="fake-textarea">
          <textarea id="description" class="textarea" placeholder="Enter a description">${description}</textarea>
      </div>
      <label for="date">date<span class="colorRed">*</span></label>
         <div class="fake-input">
          <input required id="date" value="${date}" type="date">
          </div>

          <label for="priority">Priority</label>
          <div id="priority" class="distanceBetweenIput"></div>

          <label for="assignContact">Assign to</label>
          <div class="fake-input">
              <input id="assignContact" oninput="showContacts()" placeholder="Select contacts to assign" type="text">
             <div id="contactSection" class="flexbox">  <img onclick="removeAddContactSection()" class="taskIcon" src="./assets/img/extensionIcon.png" alt=""></div>
          </div>
          
          <div id="addContact">

          </div>
          
          <div id="addContactIcon">

          </div> 

          <label for="subtask">Subtasks</label>
                            <div class="fake-input">
                                <input id="subtask" placeholder="Add new subtask">
                                <img onclick="addSubTask()" class="taskIcon" src="./assets/img/addSubTask.png" />
                            </div>
                            <div id="addSubTask">

                            </div>

          
             <button type="submit" class="createButton">OK</button> 
</form> 
  `;
}

function assignAuthority(){
  let authority = task['authorityForTask'] || [];
  for (let i = 0; i < authority.length; i++) {
    const person = authority[i];
    for (let j = 0; j < allContacts.length; j++) {
      if (person == allContacts[j]['name']) {
        allContacts[j]['contactSelect'] = true;
      }
    }
  }
}

function loadPriority(i, task) {
  let priority = task['priority'];
  document.getElementById('priority').innerHTML = loadPriorityUrgentHTML();
  if (priority == 'medium') {
    changePrioToMedium();
  } else if (priority == 'low') {
    changePrioToLow();
  }
}

function loadPriorityUrgentHTML() {
  return `
  <div class="distanceBetweenIput">
                            <button type="button" onclick="changePrioToUrgent()" class="urgentPriority prioButton">
                                <span>Urgent</span>
                                <img id="urgent" class="priorityImage" src="./assets/img/activeUrgentPriority.png"
                                    alt="">
                            </button>
                            <button type="button" onclick="changePrioToMedium()" class="distanceSmall prioButton">
                                <span>Medium</span>
                                <img id="medium" class="priorityImage" src="./assets/img/MediumPriority.png" alt="">
                            </button>
                            <button type="button" onclick="changePrioToLow()" class="distanceSmall prioButton">
                                <span>Low</span>
                                <img id="low" class="priorityImage" src="./assets/img/LowPriority.png" alt="">
                            </button>
  </div>
  `;
}

function changeTask(i) {
  tasks[i]['title'] = document.getElementById('title').value;
  tasks[i]['description'] = document.getElementById('description').value;
  tasks[i]['date'] = document.getElementById('date').value;
  tasks[i]['priority'] = prio;
  tasks[i]['subtask'] = subtasks;
  addPersonToTask();
  tasks[i]['authorityForTask'] = authorityForTask;
  saveTasksInFirebase();
  reset();
  closeTask();
}
// Beschreibe diese Funktion hier:
function reset() {
  subtasks = [];
  for (let i = 0; i < allContacts.length; i++) {
    allContacts[i]['contactSelect'] = false;
  }
  prio = "urgent";
  authorityForTask = [];
}