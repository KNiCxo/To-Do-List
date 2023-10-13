// Task Input Field, "Add" button, and Task UL elements
const inputField = document.getElementById('inputField');
const addBtn = document.getElementById('addTask');
const taskUL = document.querySelector('.tasks');

// Tracks total tasks that have been created
let totalTasks = 0;

// Adds task to list from input field if "Add" button is clicked or "Enter" key is pressed
addBtn.addEventListener('click', addTask);
inputField.addEventListener('keypress', (event) => {
  if (event.key == 'Enter') {
    addTask();
  }
});

// Adds task to list
function addTask() {
  // If input field is empty, there is no task to be added
  if (inputField.value == '') {
    return;
  }

  // Increase task count and store input as a string
  totalTasks++;
  const task = inputField.value;

  // Creates "li" element with a unique class name and taskID
  const taskElement = document.createElement('li');
  taskElement.className = `taskElement${totalTasks}`;
  taskElement.dataset.taskId = totalTasks;

  // "li" contains checkbox, input element for task, and an "Edit" and "Delete" button all with unique class names
  taskElement.innerHTML = 
  `<input class="checkbox${totalTasks}" type="checkbox"> 
   <input class="task task${totalTasks}" type="text" value="${task}" disabled="true">
   <button class="edit${totalTasks}">Edit</button>
   <button class="delete${totalTasks}">Delete</button>`;

  // Appends to end of Task UL, creates event listeners for task element and clears input field
  taskUL.append(taskElement);
  createEventListenters(taskElement.dataset.taskId);
  inputField.value = '';
}

// Creates event listeners for task input element and for "Edit" and "Delete" buttons
function createEventListenters(taskID) {

  // Edits/Saves task when clicked
  document.querySelector(`.edit${taskID}`).addEventListener('click', () => {
    // Gets correct "Edit" button and task input element
    const editBtn = document.querySelector(`.edit${taskID}`);
    const task = document.querySelector(`.task${taskID}`);

    // If button says "Edit", disable input field, change to "Save", enable task input editing, and select all task text
    // Else, enable input field, change to "Edit", and disable task input editing
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

  // Saves task input when "Enter" is pressed
  document.querySelector(`.task${taskID}`).addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
      const editBtn = document.querySelector(`.edit${taskID}`);
      const task = document.querySelector(`.task${taskID}`);

      inputField.disabled = false;
      editBtn.innerHTML = 'Edit';
      task.disabled = true;
    }
  });

  // Deletes task element when clicked
  document.querySelector(`.delete${taskID}`).addEventListener('click', () => {
      const taskElement = document.querySelector(`.taskElement${taskID}`);
      taskElement.remove();
  });
}
