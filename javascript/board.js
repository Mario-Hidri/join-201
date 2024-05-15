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

   