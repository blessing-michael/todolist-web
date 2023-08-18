
const updateTaskStat = (task) => {
    const taskElement = document.getElementById(task.id);
    if (taskElement) {
      if (task.completed) {
        taskElement.classList.add('completed');
      } else {
        taskElement.classList.remove('completed');
      }
    }
  };
  
  export default updateTaskStat;