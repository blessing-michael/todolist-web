import './style.css';

import {
  clearCompleted,
  addTasktoList,
} from './add.js';
import updateTaskStat from './interaction.js';

let tasks = [];

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const showTasks = (tasks) => {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  tasks.forEach((task) => {
    const listdis = document.createElement('li');
    listdis.className = 'task-itemlist';

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      listdis.className = task.completed ? 'task-itemlist completed' : 'task-itemlist';
      updateLocalStorage();
      updateTaskStat(task);
    });

    const label = document.createElement('label');
    const descriptionSpan = document.createElement('span');
    descriptionSpan.innerText = task.description;

    const editInput = document.createElement('input');
    editInput.setAttribute('type', 'text');
    editInput.className = 'edit-input';
    editInput.style.display = 'none';
    editInput.value = task.description;
    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        descriptionSpan.innerText = editInput.value.trim();
        task.description = editInput.value.trim();
        editInput.style.display = 'none';
        descriptionSpan.style.display = 'inline';
        updateLocalStorage();
      }
    });

    label.appendChild(descriptionSpan);
    label.appendChild(editInput);

    label.addEventListener('click', () => {
      descriptionSpan.style.display = 'none';
      editInput.style.display = 'inline';
      editInput.focus();
    });

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash delete-icon';
    deleteIcon.style.display = 'none';

    deleteIcon.addEventListener('click', () => {
      const taskIndex = tasks.findIndex((t) => t.id === task.id);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        updateLocalStorage();
        showTasks(tasks);
      }
    });

    const ellipIcon = document.createElement('i');
    ellipIcon.className = 'fas fa-ellipsis-v ellipsis-icon';
    ellipIcon.addEventListener('click', () => {
      deleteIcon.style.display = 'inline';
      ellipIcon.style.display = 'none';
    });

    listdis.appendChild(checkbox);
    listdis.appendChild(label);
    listdis.appendChild(ellipIcon);
    listdis.appendChild(deleteIcon);
    todoList.appendChild(listdis);
  });
};

const reloadTasks = () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    showTasks(tasks);
  }
};

const refreshIcon = document.getElementById('refresh-icon');
refreshIcon.addEventListener('click', () => {
  showTasks(tasks);
});

const addIcon = document.getElementById('add-icon');
addIcon.addEventListener('click', () => {
  const taskInput = document.getElementById('task-input');
  const description = taskInput.value.trim();
  if (description) {
    tasks = addTasktoList(tasks, description);
    taskInput.value = '';
    updateLocalStorage();
    showTasks(tasks);
  }
});

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
  tasks = clearCompleted(tasks);
  updateLocalStorage();
  showTasks(tasks);
});

window.addEventListener('load', reloadTasks);

showTasks(tasks);