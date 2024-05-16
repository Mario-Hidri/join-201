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
 }

 function addTaskOnInProgress(){
  document.getElementById('addTaskOnBoardSite').classList.remove('d-noneAddTask');
 }

 function addTaskOnAwaitFeedback(){
  document.getElementById('addTaskOnBoardSite').classList.remove('d-noneAddTask');
 }
  

   