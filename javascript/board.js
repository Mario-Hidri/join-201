let currentDraggedElement;

async function initBoardSite(){
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

   function moveTo(id){
  tasks[currentDraggedElement]['board'] = id;
  loadTasks(); 
 }

 function addTaskOnToDo(){
  document.getElementById('addTaskOnBoardSite').classList.remove('d-noneAddTask');
  board = "toDo";
 }

 function addTaskOnInProgress(){
  document.getElementById('addTaskOnBoardSite').classList.remove('d-noneAddTask');
  board = "inProgress";
 }

 function addTaskOnAwaitFeedback(){
  document.getElementById('addTaskOnBoardSite').classList.remove('d-noneAddTask');
  board = "awaitFeedback";
 }

 function removeAddTaskDialog(){
  document.getElementById('addTaskOnBoardSite').classList.add('d-noneAddTask');
  document.getElementById('title').value="";
  document.getElementById('description').value="";
  document.getElementById('date').value="";
  document.getElementById('subtask').value="";
  subtasks = [];
  document.getElementById('addSubTask').innerHTML ="";
 }

 function openTaskDialog(i){
  let task = tasks[i];
  let board = task["board"];
  let title = task["title"];
  let description = task["description"];
  let date = task["date"];
  let category = task["category"];
  let subtask = task["subtask"];
  document.getElementById('containerOpenTaskInBoardSize').innerHTML ='';

  document.getElementById('openTaskOnBoardSite').classList.remove('d-noneAddTask');
 }
  

   