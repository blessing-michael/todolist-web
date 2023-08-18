import './style.css';

const tasks = [
  { desc: 'I have to read a book', completed: false, index: 1 },
  { desc: 'I will clean my room', completed: true, index: 2 },
  { desc: 'I will cook lunch at 10', completed: false, index: 3 },
];

function renderTasks() {
  const mytodoList = document.getElementById('todo-list');
  mytodoList.innerHTML = '';

  tasks
    .sort((a, b) => a.index - b.index)
    .forEach((task) => {
      const listItem = document.createElement('li');
      listItem.textContent = task.desc;
      listItem.classList.add(task.completed ? 'completed' : 'pending');
      mytodoList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', renderTasks);
