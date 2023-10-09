const inputField = document.getElementById('inputField');
const addBtn = document.getElementById('addTask');
const taskDiv = document.querySelector('.taskDiv');

addBtn.addEventListener('click', addTask);

function addTask() {
  const task = inputField.value;
  console.log(task);
}

