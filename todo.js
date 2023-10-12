const inputField = document.getElementById('inputField');
const addBtn = document.getElementById('addTask');
const taskUL = document.querySelector('.tasks');

let totalTasks = 0;

addBtn.addEventListener('click', addTask);

function createEventListenters(taskID) {
  
}

function addTask() {
  if (inputField.value == '') {
    return;
  }

  totalTasks++;
  const task = inputField.value;
  const taskElement = document.createElement('li');
  taskElement.className = `task${totalTasks}`;
  task.dataset.taskID = totalTasks;
  taskElement.innerHTML = 
  `<input class="checkbox${totalTasks}" type="checkbox"> 
   ${task} 
   <button class="edit${totalTasks}">Edit</button> 
   <button class="delete${totalTasks}">Delete</button>`;
  taskUL.append(taskElement);

  createEventListenters(task.dataset.taskID);

  inputField.value = '';
}

