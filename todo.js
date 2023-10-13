const inputField = document.getElementById('inputField');
const addBtn = document.getElementById('addTask');
const taskUL = document.querySelector('.tasks');

let totalTasks = 0;

addBtn.addEventListener('click', addTask);
inputField.addEventListener('keypress', (event) => {
  console.log('here');
  if (event.key == 'Enter') {
    console.log('here');
    addTask();
  }
});

function addTask() {
  if (inputField.value == '') {
    return;
  }

  totalTasks++;
  const task = inputField.value;
  const taskElement = document.createElement('li');
  taskElement.className = `taskElement${totalTasks}`;
  taskElement.dataset.taskId = totalTasks;
  taskElement.innerHTML = 
  `<input class="checkbox${totalTasks}" type="checkbox"> 
   <input class="task task${totalTasks}" type="text" value="${task}" disabled="true">
   <button class="edit${totalTasks}">Edit</button>
   <button class="delete${totalTasks}">Delete</button>`;
  taskUL.append(taskElement);

  createEventListenters(taskElement.dataset.taskId);
  inputField.value = '';
}

function createEventListenters(taskID) {
  document.querySelector(`.edit${taskID}`).addEventListener('click', () => {
    const editBtn = document.querySelector(`.edit${taskID}`);
    const task = document.querySelector(`.task${taskID}`);

    if (editBtn.innerHTML == 'Edit') {
      inputField.disabled = true;
      editBtn.innerHTML = 'Save';
      task.disabled = false;
      task.select();
    } else {
      inputField.disabled = false;
      editBtn.innerHTML = 'Edit';
      task.disabled = true;
    }
  });

  document.querySelector(`.task${taskID}`).addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
      const editBtn = document.querySelector(`.edit${taskID}`);
      const task = document.querySelector(`.task${taskID}`);
      inputField.disabled = false;
      editBtn.innerHTML = 'Edit';
      task.disabled = true;
    }
  });

  document.querySelector(`.delete${taskID}`).addEventListener('click', () => {
      const taskElement = document.querySelector(`.taskElement${taskID}`);
      taskElement.remove();
  });
}
