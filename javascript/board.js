let currentDraggedElement;

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

   function moveTo(id){
  tasks[currentDraggedElement]['board'] = id;
  loadTask(); 
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
  

   