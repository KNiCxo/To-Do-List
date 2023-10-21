// Task Input Field, "Add" button, and Task UL elements
const inputField = document.getElementById('inputField');
const addBtn = document.getElementById('addTask');
const taskUL = document.querySelector('.tasks');

// Tracks total tasks that have been created
let totalTasks = JSON.parse(localStorage.getItem('totalTasks'));
if (!totalTasks) {
  totalTasks = 0;
}

// Stores tasks in an array to be saved
let taskArr = JSON.parse(localStorage.getItem('taskArr'));
if (!taskArr) {
  taskArr = [];
}

// Flag to track if a task input element is being edited
let isEditing = false;

// Adds task to list from input field if "Add" button is clicked or "Enter" key is pressed
addBtn.addEventListener('click', addTask);
inputField.addEventListener('keypress', (event) => {
  if (event.key == 'Enter') {
    addTask();
  }
});

// Draws saved tasks on to the screen
drawTasks();

// Displays all tasks stored in array on to the screen
function drawTasks() {
  taskArr.forEach((task) => {
    // Creates "li" element with a unique class name and taskID
    const taskElement = document.createElement('li');
    taskElement.className = `taskElement${task.taskID}`;
    taskElement.dataset.taskId = task.taskID;

    // "li" contains checkbox, input element for task, and an "Edit" and "Delete" button all with unique class names
    taskElement.innerHTML = 
    `<input class="checkbox checkbox${task.taskID}" type="checkbox"> 
     <input class="task task${task.taskID}" type="text" value="${task.taskText}" disabled="true">
     <button class="edit edit${task.taskID}">Edit</button>
     <button class="delete delete${task.taskID}">Delete</button>`;
    
    // Appends to end of Task UL, hides "Edit" and "Delete" buttons, and creates event listeners for task element
    taskUL.append(taskElement);
    document.querySelector(`.edit${taskElement.dataset.taskId}`).style.visibility = 'hidden';
    document.querySelector(`.delete${taskElement.dataset.taskId}`).style.visibility = 'hidden';
    createEventListenters(taskElement.dataset.taskId);

    // Marks task as completed if necessary
    if (task.taskCompleted) {
      document.querySelector(`.checkbox${task.taskID}`).checked = true;
      document.querySelector(`.task${task.taskID}`).classList.add('taskComplete');
    }
  })
}

// Adds task to list
function addTask() {
  // If input field is empty, there is no task to be added
  if (inputField.value == '') {
    return;
  }

  // Increase task count and store input as a string
  totalTasks++;
  localStorage.setItem('totalTasks', JSON.stringify(totalTasks));
  const task = inputField.value;

  // Creates "li" element with a unique class name and taskID
  const taskElement = document.createElement('li');
  taskElement.className = `taskElement${totalTasks}`;
  taskElement.dataset.taskId = totalTasks;

  // "li" contains checkbox, input element for task, and an "Edit" and "Delete" button all with unique class names
  taskElement.innerHTML = 
  `<input class="checkbox checkbox${totalTasks}" type="checkbox"> 
   <input class="task task${totalTasks}" type="text" value="${task}" disabled="true">
   <button class="edit edit${totalTasks}">Edit</button>
   <button class="delete delete${totalTasks}">Delete</button>`;

  // Appends to end of Task UL, hides "Edit" and "Delete" buttons, creates event listeners for task element, and clears input field
  taskUL.append(taskElement);
  document.querySelector(`.edit${taskElement.dataset.taskId}`).style.visibility = 'hidden';
  document.querySelector(`.delete${taskElement.dataset.taskId}`).style.visibility = 'hidden';
  createEventListenters(taskElement.dataset.taskId);
  inputField.value = '';

  // Pushes task and taskID into array
  const taskText = task;
  const taskID = totalTasks;
  const taskCompleted = false;
  taskArr.push({
    taskText,
    taskID,
    taskCompleted
  });
  localStorage.setItem('taskArr', JSON.stringify(taskArr));
}

// Creates event listeners for task "li" element, task input element and for "Edit" and "Delete" buttons
function createEventListenters(taskID) {
  // Displays "Edit" and "Delete" buttons if element is hovered over
  document.querySelector(`.taskElement${taskID}`).addEventListener('mouseover', (event) => {
    hover(event, isEditing, taskID);
  });

  // Hides "Edit" and "Delete" buttons if element is not hovered over
  document.querySelector(`.taskElement${taskID}`).addEventListener('mouseout', (event) => {
    hover(event, isEditing, taskID);
  });

  // Marks task as complete or incomplete when clicked
  document.querySelector(`.checkbox${taskID}`).addEventListener('click', () => {
    completeTask(taskID);
  });

  // Edits/Saves task when clicked
  document.querySelector(`.edit${taskID}`).addEventListener('click', () => {
    editTask(taskID);
  });

  // Saves task input when "Enter" is pressed
  document.querySelector(`.task${taskID}`).addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
      editTask(taskID);
    }
  });

  // Deletes task element when clicked
  document.querySelector(`.delete${taskID}`).addEventListener('click', () => {
    deleteTask(taskID);
  });

}

// Shows or hides "Edit" and "Delete" buttons depending on event type
function hover(event, isEditing, taskID) {
  if (!isEditing) {
    document.querySelector(`.edit${taskID}`).style.visibility = (event.type === 'mouseover') ? 'visible' : 'hidden';
    document.querySelector(`.delete${taskID}`).style.visibility = (event.type === 'mouseover') ? 'visible' : 'hidden';
  }
}

// Greys out task and crosses it out
function completeTask(taskID) {
  const checkbox = document.querySelector(`.checkbox${taskID}`);
  const task = document.querySelector(`.task${taskID}`);

  if (checkbox.checked) {
    task.classList.add('taskComplete');
  } else {
    task.classList.remove('taskComplete');
  }

  // Make changes to task in array
  taskArr.forEach((index) => {
    if (index.taskID == taskID) {
      index.taskCompleted = checkbox.checked;
    }
  });
  localStorage.setItem('taskArr', JSON.stringify(taskArr));
}

// Function to edit or save a task
function editTask(taskID) {
  // Gets correct "Edit" button and task input element
  const editBtn = document.querySelector(`.edit${taskID}`);
  const task = document.querySelector(`.task${taskID}`);

  // If button says "Edit", disable input field, change to "Save", enable task input editing, and select all task text
  // Else, enable input field, change to "Edit", and disable task input editing
  if (editBtn.innerHTML == 'Edit') {
    isEditing = true;
    inputField.disabled = true;
    editBtn.innerHTML = 'Save';
    task.disabled = false;
    task.select();
  } else {
    // This prevents highlight from remaining after saving (Couldn't find a better solution)
    const temp = task.value;
    task.value = '';
    task.value = temp;

    // Make changes to task in array
    taskArr.forEach((index) => {
      if (index.taskID == taskID) {
        index.taskText = task.value
      }
    });
    localStorage.setItem('taskArr', JSON.stringify(taskArr));

    isEditing = false;
    inputField.disabled = false;
    editBtn.innerHTML = 'Edit';
    task.disabled = true;
  }
}

// Function to delete a task element
function deleteTask(taskID) {
  const taskElement = document.querySelector(`.taskElement${taskID}`);
  taskElement.remove();

  for (let i = 0; i < taskArr.length; i++) {
    if (taskArr[i].taskID == taskID) {
      taskArr.splice(i, 1);
    }
  }
  localStorage.setItem('taskArr', JSON.stringify(taskArr));
}