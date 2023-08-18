import './style.css';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = (desc) => {
  const newTask = {
    desc,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  saveTasksToLocalStorage();
};

const deleteTask = (taskIndex) => {
  tasks.splice(taskIndex, 1);
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
  saveTasksToLocalStorage();
};

const editTask = (taskIndex, newDesc) => {
  tasks[taskIndex].desc = newDesc;
  saveTasksToLocalStorage();
};

const tickCompleted = (taskIndex) => {
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  saveTasksToLocalStorage();
};

const filterList = (y) => {
  if (y) {
    if (y.length >= 3) {
      return y;
    }
    alert('Please ensure you enter more than 3 words');
    return false;
  }
  return false;
};

const updateDisplayUI = () => {
  const list = document.getElementById('list');
  list.innerHTML = '';
  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('my-4', 'py-4', 'shadow', 'list-group-item');
    listItem.id = `list${task.index}`;

    const showListItem = `
      <div class="row  list-div">
        <div class="col-2">
          <input class="" type="checkbox" id="check${task.index}" ${task.completed ? 'checked' : ''}>
        </div>
        <div class="col-4">
          <span class="h4 ${task.completed ? 'text-decoration-line-through' : ''}" id="text${task.index}">${task.desc}</span>
        </div>
        <div class="col-3">
          <button class="btn btn-secondary" data-action="delete" data-task-index="${task.index - 1}">Delete</button>
          <button class="btn btn-secondary" data-action="edit" data-task-index="${task.index - 1}">Edit</button>
        </div>
      </div>
    `;

    listItem.innerHTML = showListItem;
    list.appendChild(listItem);
  });
};

const addToList = () => {
  const input = document.getElementById('inputText');
  const inputText = filterList(input.value);
  if (inputText) {
    addTask(inputText);
    updateDisplayUI();
    input.value = '';
  }
};

const deleteList = (taskIndex) => {
  const deleteConfirmCheck = window.confirm(`Are you sure you want to delete ${tasks[taskIndex].desc}`);
  if (deleteConfirmCheck) {
    deleteTask(taskIndex);
    updateDisplayUI();
  } else {
    console.log('cancelled');
  }
};

const editList = (taskIndex) => {
  const currentText = tasks[taskIndex].desc;
  const newText = prompt('Are you sure you want to Change list?', currentText);
  if (filterList(newText)) {
    editTask(taskIndex, newText);
    updateDisplayUI();
  }
};
const clearTickedTasks = () => {
  for (let i = tasks.length - 1; i >= 0; i -= 1) {
    if (tasks[i].completed) {
      deleteTask(i);
    }
  }
  saveTasksToLocalStorage();
  updateDisplayUI();
};

const addButton = document.getElementById('addBtn');
const listDisplay = document.getElementById('list');
addButton.addEventListener('click', addToList);

listDisplay.addEventListener('click', (event) => {
  const { target } = event;
  if (target.matches('[data-action="delete"]')) {
    const taskIndex = parseInt(target.getAttribute('data-task-index'), 10);
    deleteList(taskIndex);
  } else if (target.matches('[data-action="edit"]')) {
    const taskIndex = parseInt(target.getAttribute('data-task-index'), 10);
    editList(taskIndex);
  } else if (target.matches('[type="checkbox"]')) {
    const taskIndex = parseInt(target.id.replace('check', ''), 10) - 1;
    tickCompleted(taskIndex);
    saveTasksToLocalStorage();
    updateDisplayUI();
  }
});

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearTickedTasks);
listitem.addEventListener('click', deleteme)

updateDisplayUI();
